import { Switch, Route, Router as WouterRouter } from 'wouter';
  import { Toaster } from '@/components/ui/toaster';
  import { TooltipProvider } from '@/components/ui/tooltip';
  import { CartProvider } from '@/context/CartContext';
  import NotFound from '@/pages/not-found';
  import Home from '@/pages/Home';
  import Products from '@/pages/Products';
  import ProductDetail from '@/pages/ProductDetail';
  import Cart from '@/pages/Cart';
  import Checkout from '@/pages/Checkout';

  function Router() {
    return (
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products" component={Products} />
        <Route path="/products/:id" component={ProductDetail} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  export default function App() {
    return (
      <CartProvider>
        <TooltipProvider>
          <WouterRouter>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </CartProvider>
    );
  }