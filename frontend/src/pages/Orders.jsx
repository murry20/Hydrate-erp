import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import styles from './Orders.module.css';
import { Plus, Trash2, CheckCircle } from 'lucide-react';

export default function Orders() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);
  const [region, setRegion] = useState('CENTRO');
  
  const [calculation, setCalculation] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      fetch('http://localhost:5000/api/orders/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, region })
      })
      .then(res => res.json())
      .then(setCalculation)
      .catch(console.error);
    } else {
      setCalculation(null);
    }
  }, [items, region]);

  const handleAddItem = () => {
    if (!selectedProduct) return;
    const prod = products.find(p => p.id == selectedProduct);
    if (!prod) return;
    
    setItems(prev => {
      const existing = prev.find(i => i.productId === prod.id);
      if (existing) {
        return prev.map(i => i.productId === prod.id ? { ...i, quantity: i.quantity + Number(quantity) } : i);
      }
      return [...prev, { productId: prod.id, name: prod.name, unitPrice: prod.price, quantity: Number(quantity) }];
    });
    setQuantity(1);
    setSelectedProduct('');
  };

  const handleRemoveItem = (id) => {
    setItems(prev => prev.filter(i => i.productId !== id));
  };

  const handleCheckout = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: 1, items, region })
      });
      if (res.ok) {
        setSuccess(true);
        setItems([]);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Novo Pedido</h1>
      
      {success && (
        <div style={{backgroundColor: 'rgba(16,185,129,0.1)', color: 'var(--success)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px'}}>
          <CheckCircle /> Pedido criado com sucesso!
        </div>
      )}

      <div className={styles.grid}>
        <div>
          <Card style={{marginBottom: '24px'}}>
            <h2 className={styles.sectionTitle}>Dados da Entrega</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px'}}>
              <label style={{fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500}}>Região de Entrega</label>
              <select 
                value={region} 
                onChange={(e) => setRegion(e.target.value)}
                style={{
                  padding: '12px', borderRadius: 'var(--radius-md)', 
                  backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)', outline: 'none', fontFamily: 'inherit'
                }}
              >
                <option value="CENTRO">Centro</option>
                <option value="ZONA_NORTE">Zona Norte</option>
                <option value="ZONA_SUL">Zona Sul</option>
                <option value="ZONA_LESTE">Zona Leste</option>
                <option value="ZONA_OESTE">Zona Oeste</option>
              </select>
            </div>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Adicionar Produtos</h2>
            <div className={styles.productSelect}>
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px', flex: 2}}>
                <label style={{fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500}}>Produto</label>
                <select 
                  value={selectedProduct} 
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  style={{
                    padding: '12px', borderRadius: 'var(--radius-md)', 
                    backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)', outline: 'none', fontFamily: 'inherit'
                  }}
                >
                  <option value="">Selecione...</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} - R$ {p.price.toFixed(2)}</option>
                  ))}
                </select>
              </div>
              <div style={{flex: 1}}>
                <Input 
                  label="Qtd" 
                  type="number" 
                  min="1" 
                  value={quantity} 
                  onChange={(e) => setQuantity(e.target.value)} 
                />
              </div>
              <div style={{flex: '0 0 auto', paddingBottom: '16px'}}>
                <Button onClick={handleAddItem} style={{width: 'auto', padding: '12px'}}><Plus size={20}/></Button>
              </div>
            </div>

            <div style={{marginTop: '32px'}}>
              {items.length === 0 ? (
                <div className={styles.empty}>Nenhum produto adicionado</div>
              ) : (
                items.map(item => (
                  <div key={item.productId} className={styles.orderItem}>
                    <div>
                      <div style={{fontWeight: 500}}>{item.name}</div>
                      <div style={{fontSize: '0.85rem', color: 'var(--text-secondary)'}}>
                        {item.quantity}x R$ {item.unitPrice.toFixed(2)}
                      </div>
                    </div>
                    <button 
                      onClick={() => handleRemoveItem(item.productId)}
                      style={{background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '8px'}}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        <div>
          <Card style={{position: 'sticky', top: '40px'}}>
            <h2 className={styles.sectionTitle}>Resumo do Pedido</h2>
            
            <div className={styles.summaryRow}>
              <span>Subtotal Itens</span>
              <span>R$ {calculation ? calculation.itemsTotal.toFixed(2) : '0.00'}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Taxa de Entrega</span>
              <span>R$ {calculation ? calculation.deliveryFee.toFixed(2) : '0.00'}</span>
            </div>
            
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>R$ {calculation ? calculation.totalAmount.toFixed(2) : '0.00'}</span>
            </div>

            <Button 
              style={{marginTop: '24px'}} 
              disabled={items.length === 0}
              onClick={handleCheckout}
            >
              Finalizar Pedido
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
