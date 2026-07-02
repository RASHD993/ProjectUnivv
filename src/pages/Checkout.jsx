import { useState } from 'react';
  import { Link } from 'wouter';
  import { Layout } from '@/components/Layout';
  import { useCart } from '@/context/CartContext';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import { useForm } from 'react-hook-form';
  import { zodResolver } from '@hookform/resolvers/zod';
  import { z } from 'zod';
  import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
  import { CheckCircle2, ArrowLeft } from 'lucide-react';

  const schema = z.object({
    customerName: z.string().min(2, 'Name is required'),
    customerEmail: z.string().email('Invalid email address'),
    address: z.string().min(5, 'Shipping address is required'),
  });

  export default function Checkout() {
    const { items, total, clearCart } = useCart();
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const form = useForm({ resolver: zodResolver(schema), defaultValues: { customerName: '', customerEmail: '', address: '' } });

    const onSubmit = () => {
      setSubmitting(true);
      setTimeout(() => { clearCart(); setSuccess(true); setSubmitting(false); }, 1000);
    };

    if (success) return (
      <Layout>
        <div className="container mx-auto px-4 py-24 max-w-2xl text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-6">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="text-4xl font-serif font-medium mb-4">تأكيد الطلب</h1>
          <p className="text-xl text-muted-foreground mb-8">شكراً لك على مشتريتك. سنرسل لك معلومات التتبع قريبًا.</p>
          <Button size="lg" asChild><Link href="/products">متابعة التسوق</Link></Button>
        </div>
      </Layout>
    );

    if (items.length === 0) return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h2 className="text-2xl font-serif mb-4">سلة التسوق فارغة</h2>
          <Button asChild><Link href="/products"> العودة إلى المتجر</Link></Button>
        </div>
      </Layout>
    );

    return (
      <Layout>
        <div className="bg-muted/30 border-b py-8">
          <div className="container mx-auto px-4 max-w-5xl">
            <Link href="/cart" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> العودة إلى السلة
            </Link>
            <h1 className="text-3xl font-serif font-medium">الدفع</h1>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl font-medium mb-6">معلومات الشحن</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField control={form.control} name="customerName" render={({ field }) => (
                    <FormItem><FormLabel>الاسم الكامل</FormLabel><FormControl><Input placeholder="Jane Doe" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="customerPhone" render={({ field }) => (
                    <FormItem><FormLabel> رقم الهاتف</FormLabel><FormControl><Input type="tel" placeholder="123-456-7890" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem><FormLabel>عنوان الشحن</FormLabel><FormControl><Input placeholder="123 Main St, City, State, ZIP" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <Button type="submit" size="lg" className="w-full text-base h-12 mt-8" disabled={submitting}>
                    {submitting ? 'Processing...' : `اتمام الطلب — $${total.toFixed(2)}`}
                  </Button>
                </form>
              </Form>
            </div>
            <div>
              <div className="bg-card border rounded-2xl p-6 sticky top-24">
                <h2 className="text-xl font-medium mb-6">ملخص الطلب</h2>
                <ul className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                  {items.map(item => (
                    <li key={item.id} className="flex gap-4">
                      <div className="h-16 w-16 rounded bg-muted border overflow-hidden shrink-0">
                        {item.product.imageUrl && <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1 text-sm">
                        <div className="font-medium line-clamp-1">{item.product.name}</div>
                        <div className="text-muted-foreground mt-1">Qty: {item.quantity}</div>
                      </div>
                      <div className="font-medium text-sm">${(item.product.price * item.quantity).toFixed(2)}</div>
                    </li>
                  ))}
                </ul>
                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-muted-foreground text-sm"><span>المجموع الفرعي</span><span>${total.toFixed(2)}</span></div>
                  <div className="flex justify-between text-muted-foreground text-sm"><span>الشحن</span><span>{total >= 50 ? 'مجاني' : 'قيد التقييم'}</span></div>
                  <div className="border-t mt-4 pt-4 flex justify-between font-medium text-lg"><span>الإجمالي</span><span>${total.toFixed(2)}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }