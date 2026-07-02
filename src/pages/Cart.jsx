import { Link } from 'wouter';
  import { Layout } from '@/components/Layout';
  import { useCart } from '@/context/CartContext';
  import { Button } from '@/components/ui/button';
  import { Trash2, ArrowRight, ShoppingBag, Minus, Plus } from 'lucide-react';

  export default function Cart() {
    const { items, total, removeFromCart, updateQuantity } = useCart();

    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <h1 className="text-3xl font-serif font-medium mb-8">سلة التسوق</h1>
          {items.length === 0 ? (
            <div className="text-center py-24 bg-muted/30 rounded-2xl border border-dashed">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4 opacity-50" />
              <h2 className="text-2xl font-serif mb-2">سلة التسوق فارغة</h2>
              <p className="text-muted-foreground mb-8">يبدو أنك لم تقم بإضافة أي شيء بعد.</p>
              <Button size="lg" asChild><Link href="/products">متابعة التسوق</Link></Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-6">
                <ul className="space-y-6">
                  {items.map(item => (
                    <li key={item.id} className="flex gap-4 items-center py-4 border-b">
                      <div className="h-20 w-20 rounded-md overflow-hidden bg-muted shrink-0 border">
                        {item.product.imageUrl
                          ? <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                          : <div className="w-full h-full bg-muted" />
                        }
                      </div>
                      <div className="flex-1">
                        <Link href={`/products/${item.product.id}`} className="font-medium hover:text-primary transition-colors line-clamp-1">{item.product.name}</Link>
                        <div className="text-sm text-muted-foreground mt-1">${item.product.price.toFixed(2)} each</div>
                        <button onClick={() => removeFromCart(item.id)} className="text-sm text-red-500 hover:underline mt-1 flex items-center gap-1">
                          <Trash2 className="h-3 w-3" /> Remove
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center rounded border hover:bg-muted transition-colors">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center rounded border hover:bg-muted transition-colors">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="font-medium w-20 text-right">${(item.product.price * item.quantity).toFixed(2)}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-1">
                <div className="bg-muted/30 rounded-2xl p-6 border">
                  <h2 className="text-lg font-medium mb-4">ملخص الطلب</h2>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-muted-foreground"><span>المجموع الفرعي</span><span>${total.toFixed(2)}</span></div>
                    <div className="flex justify-between text-muted-foreground"><span>الشحن</span><span>{total >= 50 ? 'مجاني' : 'قيد التحديث'}</span></div>
                    <div className="border-t pt-3 flex justify-between font-medium text-lg"><span>الإجمالي</span><span>${total.toFixed(2)}</span></div>
                  </div>
                  <Button size="lg" className="w-full gap-2 text-base h-12" asChild>
                    <Link href="/checkout">متابعة إلى الخروج <ArrowRight className="h-4 w-4" /></Link>
                  </Button>
                  <div className="mt-4 text-center">
                    <Link href="/products" className="text-sm text-muted-foreground hover:underline">متابعة التسوق</Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    );
  }