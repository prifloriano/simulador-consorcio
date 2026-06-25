import { useState, useEffect } from 'react';
import { useConsorcio } from './hooks/useConsorcio';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './App.css'; 

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const {
    valorCredito, setValorCredito,
    prazo, setPrazo,
    taxaAdministracao, setTaxaAdministracao,
    parcelaMensal,
    custoTotal,
    totalTaxas,
    parcelasEvolucao
  } = useConsorcio();

  const [darkMode, setDarkMode] = useState(false);
  const [mostrarTabela, setMostrarTabela] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); 
    return () => clearTimeout(timer);
  }, []);

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const dadosGrafico = [
    { name: 'Valor do Crédito', value: valorCredito },
    { name: 'Custo das Taxas', value: totalTaxas }
  ];
  
  const CORES = ['#0056b3', '#ffc107'];

  if (isLoading) {
    return (
      <div className={`loading-tela ${darkMode ? 'dark' : ''}`}>
        <div className="spinner"></div>
        <h2>Iniciando simulação...</h2>
      </div>
    );
  }

  return (
    <div className={`app-wrapper ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        
        <div className="topo-acoes no-print">
          <button className="btn-secundario" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? 'Modo Claro' : 'Modo Escuro'}
          </button>
          <button className="btn-pdf" onClick={() => window.print()}>
            Salvar Simulação (PDF)
          </button>
        </div>

        <h1>Simulador de Consórcio</h1>
        <p>Simulação Inteligente</p>

        <div className="painel">
          
          <div className="controles no-print">
            <h3>Ajuste sua simulação</h3>
            
            <div className="input-group">
              <label>Valor do Crédito: {formatarMoeda(valorCredito)}</label>
              <input 
                type="range" 
                min="10000" 
                max="500000" 
                step="5000" 
                value={valorCredito} 
                onChange={(e) => setValorCredito(Number(e.target.value))} 
              />
            </div>

            <div className="input-group">
              <label>Prazo: {prazo} meses</label>
              <input 
                type="range" 
                min="12" 
                max="240" 
                step="12" 
                value={prazo} 
                onChange={(e) => setPrazo(Number(e.target.value))} 
              />
            </div>

            <div className="input-group">
              <label>Taxa de Adm (Total): {taxaAdministracao}%</label>
              <input 
                type="range" 
                min="5" 
                max="25" 
                step="0.5" 
                value={taxaAdministracao} 
                onChange={(e) => setTaxaAdministracao(Number(e.target.value))} 
              />
            </div>
          </div>

          <div className="resultados">
            <h3>Resumo do Plano</h3>
            
            <div className="dados-impressao only-print">
              <p><strong>Crédito Solicitado:</strong> {formatarMoeda(valorCredito)}</p>
              <p><strong>Prazo Escolhido:</strong> {prazo} meses</p>
              <p><strong>Taxa de Administração:</strong> {taxaAdministracao}%</p>
            </div>

            <div className="card-destaque">
              <p>Parcela Mensal</p>
              <h2>{formatarMoeda(parcelaMensal)}</h2>
            </div>
            
            <div className="detalhes">
              <p><strong>Custo Total:</strong> {formatarMoeda(custoTotal)}</p>
              <p><strong>Total de Taxas:</strong> {formatarMoeda(totalTaxas)}</p>
            </div>

            <div className="grafico-container">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={dadosGrafico}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {dadosGrafico.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatarMoeda(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <button 
              className="btn-tabela no-print" 
              onClick={() => setMostrarTabela(!mostrarTabela)}
            >
              {mostrarTabela ? 'Ocultar Cronograma' : 'Ver Cronograma de Parcelas'}
            </button>
          </div>
        </div>

        {mostrarTabela && (
          <div className="tabela-container">
            <h3>Evolução Mensal do Saldo</h3>
            <div className="tabela-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Mês</th>
                    <th>Fundo Comum</th>
                    <th>Taxas</th>
                    <th>Total Parcela</th>
                    <th>Saldo Restante</th>
                  </tr>
                </thead>
                <tbody>
                  {parcelasEvolucao.map((p) => (
                    <tr key={p.numero}>
                      <td>{p.numero}º</td>
                      <td>{formatarMoeda(p.parcelaPura)}</td>
                      <td>{formatarMoeda(p.taxas)}</td>
                      <td>{formatarMoeda(p.total)}</td>
                      <td>{formatarMoeda(p.saldoRestante)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;