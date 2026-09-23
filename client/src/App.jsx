import AppRoutes from "./routes/AppRoutes";
import SiteHeader from "./components/layout/SiteHeader";
import SiteFooter from "./components/layout/SiteFooter";
import PageTransition from "./components/common/PageTransition";


function App() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main>
        <PageTransition>
          <AppRoutes />
        </PageTransition>
      </main>

      <SiteFooter />
    </div>
  );
}

export default App;
