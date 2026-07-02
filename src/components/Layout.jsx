import { Link, useLocation } from 'wouter';
  import { ShoppingBag, Search, Home } from 'lucide-react';
  import { useCart } from '@/context/CartContext';
  import { Button } from '@/components/ui/button';

  export function Layout({ children }) {
    const [location] = useLocation();
    const { itemCount } = useCart();

    return (
      <div className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <Link href="/" className="flex items-center gap-2">
                <Home className="h-6 w-6 text-primary" />
                <span className="font-serif font-bold text-xl tracking-tight hidden sm:inline-block" >السوق النزلي</span>
              </Link>
                            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                <Link href="/products" className={`transition-colors hover:text-primary ${location === '/products' ? 'text-primary' : 'text-muted-foreground'}`}>كل المنتجات</Link>
                <Link href="/products?category=kitchen" className="transition-colors hover:text-primary text-muted-foreground">المطبخ</Link>
                <Link href="/products?category=bedroom" className="transition-colors hover:text-primary text-muted-foreground">غرف النوم</Link>
              </nav>
            </div>
             <div className="flex items-center gap-4">
              <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
                <Search className="h-5 w-5" />
              </Link>
              <Link href="/cart" className="relative text-muted-foreground hover:text-primary transition-colors flex items-center">
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-400 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">{itemCount}</span>
                )}
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t bg-muted/30 pt-16 pb-8">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Home className="h-5 w-5 text-primary" />
                <span className="font-serif font-bold text-lg">الأساسيات</span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">متجر الأشياء الأساسية لمنزلك</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">المتجر</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/products?category=kitchen" className="hover:text-primary">المطبخ</Link></li>
                <li><Link href="/products?category=bedroom" className="hover:text-primary">غرف النوم</Link></li>
                <li><Link href="/products?category=lighting" className="hover:text-primary"> الإضاءة</Link></li>
                <li><Link href="/products?category=storage" className="hover:text-primary">التخزين</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">الدعم</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">الشحن والمرتجعات</a></li>
                <li><a href="#" className="hover:text-primary">الأسئلة الشائعة</a></li>
                <li><a href="#" className="hover:text-primary">اتصل بنا</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">النشرة الإخبارية</h3>
              <p className="text-sm text-muted-foreground mb-4">اشترك لتحصل على أحدث العروض والمنتجات.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="عنوان البريد الإلكتروني" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
                <Button size="sm">اشترك</Button>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 mt-16 pt-8 border-t text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} السوق النزلي. جميع الحقوق محفوظة.
          </div>
        </footer>
      </div>
    );
  }