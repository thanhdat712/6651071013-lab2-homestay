import { HashRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ListPage } from './pages/ListPage';
import { DetailPage } from './pages/DetailPage';
import { PageTransition } from './components/PageTransition';

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-emerald-200 selection:text-emerald-900">
        <Header />
        <main className="flex-1">
          <PageTransition>
            <Routes>
              <Route path="/" element={<ListPage />} />
              <Route path="/item/:id" element={<DetailPage />} />
              <Route path="*" element={<ListPage />} />
            </Routes>
          </PageTransition>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
