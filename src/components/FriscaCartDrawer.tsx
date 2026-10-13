import React from 'react';
import { useFrisca } from '../context/FriscaContext';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export const FriscaCartDrawer: React.FC = () => {
  const {
    lang,
    t,
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
  } = useFrisca();

  if (!isCartOpen) return null;

  const isAr = lang === 'ar';

  const generateWhatsAppOrderLink = () => {
    let orderListText = '';
    cartItems.forEach((item, index) => {
      const name = isAr ? item.nameAr : item.nameEn;
      const sub = (item.priceBHD * item.quantity).toFixed(1);
      orderListText += `\n${index + 1}. ${item.quantity}x ${name} - ${sub} ${t.currency}`;
    });

    const msg = `${t.cart.whatsappGreeting}\n${orderListText}\n\n💵 ${t.cart.whatsappTotal}: ${cartTotal.toFixed(1)} ${t.currency}\n\n${t.cart.whatsappNote}`;

    return `https://wa.me/97339228410?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div
        className={`fixed inset-y-0 ${
          isAr ? 'left-0' : 'right-0'
        } max-w-full flex pl-0 outline-none`}
      >
        <div className="w-screen max-w-md bg-[#1b0609] border-l border-r border-[#481119] text-white shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-[#3b0f15] bg-[#24070c] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#782229] border border-[#9b2c35] flex items-center justify-center text-white">
                <ShoppingBag className="w-5 h-5 text-[#d4a373]" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white font-serif">{t.cart.title}</h2>
                <p className="text-[11px] text-[#e0b4b8]">
                  {cartCount} {t.cart.itemCount}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="px-2 py-1 rounded-lg bg-[#330c12] hover:bg-[#481119] text-[#e0b4b8] hover:text-rose-300 text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  title={t.cart.clearCart}
                >
                  <Trash2 className="w-3 h-3" />
                  <span>{t.cart.clearCart}</span>
                </button>
              )}

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-lg bg-[#2e0910] hover:bg-[#481119] text-[#e0b4b8] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#2a080e] border border-[#52131b] flex items-center justify-center text-[#d4a373]">
                  <ShoppingBag className="w-8 h-8 opacity-70" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">{t.cart.emptyTitle}</h3>
                  <p className="text-xs text-[#e0b4b8] max-w-xs">{t.cart.emptySubtitle}</p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-[#782229] hover:bg-[#912b34] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <span>{t.cart.browseMenuBtn}</span>
                  {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                const name = isAr ? item.nameAr : item.nameEn;
                const subPrice = (item.priceBHD * item.quantity).toFixed(1);

                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-[#24070c] border border-[#481119] flex items-center gap-3 transition-colors hover:border-[#6b1823]"
                  >
                    {/* Item Image */}
                    <img
                      src={item.image}
                      alt={name}
                      className="w-16 h-16 rounded-lg object-cover shrink-0 border border-[#3b0f15]"
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0 space-y-1">
                      {/* Name and Price side-by-side with medium font */}
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-medium text-white truncate">
                          {name}
                        </h4>
                        <span className="text-xs sm:text-sm font-bold text-white shrink-0 whitespace-nowrap">
                          {subPrice} {t.currency}
                        </span>
                      </div>

                      <div className="text-[10px] text-[#e0b4b8]">
                        {item.priceBHD.toFixed(1)} {t.currency} / {isAr ? 'الطبق' : 'dish'}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2 bg-[#170407] rounded-lg border border-[#3b0f15] p-0.5">
                          <button
                            onClick={() => updateCartQuantity(item.id, -1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-[#e0b4b8] hover:text-white hover:bg-[#3d0e15] transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-white px-1.5 font-mono">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, 1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-[#e0b4b8] hover:text-white hover:bg-[#3d0e15] transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 rounded text-[#e0b4b8]/70 hover:text-rose-400 transition-colors cursor-pointer"
                          title="حذف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer / Checkout */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#3b0f15] bg-[#22070c] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[#e0b4b8]">
                  <span>{t.cart.subtotal}</span>
                  <span className="font-mono">{cartTotal.toFixed(1)} {t.currency}</span>
                </div>
                <div className="flex items-center justify-between text-base font-bold text-white pt-2 border-t border-[#3b0f15]">
                  <span>{t.cart.total}</span>
                  <span className="text-[#d4a373] font-mono font-extrabold text-lg">
                    {cartTotal.toFixed(1)} {t.currency}
                  </span>
                </div>
              </div>

              {/* Order via WhatsApp */}
              <a
                href={generateWhatsAppOrderLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 border border-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-emerald-200" />
                <span>{t.cart.orderViaWhatsApp}</span>
              </a>

              <p className="text-[10px] text-center text-[#e0b4b8]/70">
                {isAr
                  ? 'سيتم إرسال تفاصيل الأطباق فوراً لمطعم فريسكا لتجهيز طلبكم'
                  : 'Order items are sent directly to Frisca kitchen for preparation'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
