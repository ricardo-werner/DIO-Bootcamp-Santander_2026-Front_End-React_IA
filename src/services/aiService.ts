import type { SimulationRecord } from '@/data/simulation'
import { parseCurrency } from '@/utils/currency'

interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: { text: string }[]
    }
  }[]
}

export interface InsightData {
  feasibility: {
    status: 'viable' | 'needs_adjustment' | 'unfeasible'
    content: string
  }
  diagnosis: {
    content: string
  }
  suggestions: {
    items: string[]
  }
  extraIncome: {
    items: string[]
  }
  investment: {
    items: string[]
  }
  motivation: {
    content: string
  }
}

const getApiKey = () => {
  const key = import.meta.env.VITE_GEMINI_API_KEY
  if (!key || key === 'undefined' || key === 'YOUR_GEMINI_API_KEY') {
    return null
  }
  return String(key).trim()
}

const callGeminiAPI = async (prompt: string, apiKey: string) => {
  const models = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-flash-latest']
  let lastError: Error | null = null

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      })

      if (response.ok) {
        return (await response.json()) as GeminiResponse
      }
    } catch (err) {
      lastError = err as Error
    }
  }

  throw lastError || new Error('Falha ao conectar com modelos Gemini')
}

export function generateFallbackInsight(simulation: SimulationRecord): InsightData {
  const income = parseCurrency(simulation.income)
  const expenses = parseCurrency(simulation.expenses)
  const debts = parseCurrency(simulation.debts)
  const goalAmount = parseCurrency(simulation.goalAmount)
  const months = Math.max(1, parseInt(simulation.goalDeadline, 10) || 12)

  const availableMonthly = Math.max(0, income - (expenses + debts))
  const neededMonthly = goalAmount / months
  const gap = availableMonthly - neededMonthly
  const debtRatio = income > 0 ? ((expenses + debts) / income) * 100 : 0

  let status: 'viable' | 'needs_adjustment' | 'unfeasible'
  let feasibilityText: string

  if (gap >= 0) {
    status = 'viable'
    feasibilityText = `Sua meta de R$ ${simulation.goalAmount} em ${months} meses é perfeitamente viável! Você possui R$ ${availableMonthly.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} disponíveis mensalmente, o que cobre o aporte necessário de R$ ${neededMonthly.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês com saldo positivo.`
  } else if (Math.abs(gap) <= (income > 0 ? income * 0.3 : 1000)) {
    status = 'needs_adjustment'
    feasibilityText = `Sua meta de R$ ${simulation.goalAmount} em ${months} meses exige um aporte mensal de R$ ${neededMonthly.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}, enquanto seu saldo livre atual é de R$ ${availableMonthly.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês. Com pequenos ajustes em gastos essenciais ou renda extra, a meta torna-se totalmente realizável.`
  } else {
    status = 'unfeasible'
    feasibilityText = `Atingir R$ ${simulation.goalAmount} no prazo de ${months} meses exige economizar R$ ${neededMonthly.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} por mês, valor acima da sua capacidade atual de R$ ${availableMonthly.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês. Recomendamos estender o prazo para cerca de ${Math.ceil(goalAmount / Math.max(availableMonthly, 100))} meses.`
  }

  return {
    feasibility: {
      status,
      content: feasibilityText,
    },
    diagnosis: {
      content: `Atualmente, ${debtRatio.toFixed(0)}% da sua renda mensal de R$ ${simulation.income} está comprometida com custos essenciais (R$ ${simulation.expenses}) e parcelas de dívidas (R$ ${simulation.debts}). O saldo líquido disponível para investimentos é de R$ ${availableMonthly.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} por mês.`,
    },
    suggestions: {
      items: [
        'Audite assinaturas digitais e serviços recorrentes para economizar de 5% a 10% do orçamento mensal.',
        'Renegocie contratos de internet, telefonia ou serviços para reduzir custos fixos sem perder qualidade.',
        'Estabeleça uma meta semanal de gastos com lazer para manter a economia dentro do planejado.',
      ],
    },
    extraIncome: {
      items: [
        'Ofereça aulas de reforço, consultorias ou mentorias na sua área de expertise profissional.',
        'Desapegue de equipamentos eletrônicos ou móveis sem uso vendendo-os em marketplaces locais.',
        'Realize trabalhos temporários ou freelancers em horários flexíveis nos finais de semana.',
      ],
    },
    investment: {
      items: [
        `Reserva de emergência aplicada em Tesouro Selic ou CDB 100% do CDI com resgate diário.`,
        `Para a meta de ${months} meses, utilize títulos CDB pós-fixados com garantia do FGC.`,
        `Reinvista automaticamente todos os dividendos e rendimentos para acelerar os juros compostos.`,
      ],
    },
    motivation: {
      content: `Seu objetivo "${simulation.goalName}" é plenamente realizável com planejamento e consistência! Siga firme no plano de aportes e comemore cada etapa concluída.`,
    },
  }
}

export const getInsight = async (
  prompt: string,
  simulation?: SimulationRecord,
): Promise<InsightData> => {
  const apiKey = getApiKey()

  if (apiKey) {
    try {
      const response = await callGeminiAPI(prompt, apiKey)
      const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}'
      const cleanJsonText = rawText
        .replace(/^```(?:json)?/gim, '')
        .replace(/```$/gim, '')
        .trim()

      const parsedData = JSON.parse(cleanJsonText) as InsightData
      if (parsedData?.feasibility?.content && parsedData?.diagnosis?.content) {
        return parsedData
      }
    } catch {
      // Fallback gracioso se a requisição à API ou parse JSON falhar
    }
  }

  if (simulation) {
    return generateFallbackInsight(simulation)
  }

  throw new Error('Não foi possível gerar os insights para a simulação.')
}
