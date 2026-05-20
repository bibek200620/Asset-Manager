import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Dashboard } from "./pages/Dashboard";
import { Chat } from "./pages/Chat";
import { Analytics } from "./pages/Analytics";
import { Sources } from "./pages/Sources";
import { Team } from "./pages/Team";
import { Workspace } from "./pages/Workspace";
import { Settings } from "./pages/Settings";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/chat" component={Chat} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/sources" component={Sources} />
      <Route path="/team" component={Team} />
      <Route path="/workspace" component={Workspace} />
      <Route path="/settings" component={Settings} />
      <Route component={Dashboard} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
