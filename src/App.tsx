import { RouterProvider } from "react-router-dom";

import { AccessibilityProvider } from "@/components/Accessibility/AccessibilityContext";
import AccessibilityModal from "@/components/Accessibility/AccessibilityModal";
import { router } from "@/routers/router";

function App() {
  return (
    <AccessibilityProvider>
      <RouterProvider router={router} />
      <AccessibilityModal />
    </AccessibilityProvider>
  );
}

export default App;
