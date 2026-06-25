import { useState, useMemo } from 'react';

export function useConsorcio() {
  const [valorCredito, setValorCredito] = useState(100000);
  const [prazo, setPrazo] = useState(120); 
  const [taxaAdministracao, setTaxaAdministracao] = useState(15); 
  const [fundoReserva, setFundoReserva] = useState(2); 

  const simulacao = useMemo(() => {
    if (prazo === 0) return { parcelaMensal: 0, totalTaxas: 0, custoTotal: 0, parcelasEvolucao: [] };

    const parcelaPura = valorCredito / prazo;
    const valorTaxaAdm = valorCredito * (taxaAdministracao / 100);
    const taxaAdmMensal = valorTaxaAdm / prazo;
    
    const valorFundoReserva = valorCredito * (fundoReserva / 100);
    const fundoReservaMensal = valorFundoReserva / prazo;

    const parcelaMensal = parcelaPura + taxaAdmMensal + fundoReservaMensal;
    const custoTotal = parcelaMensal * prazo;
    const totalTaxas = valorTaxaAdm + valorFundoReserva;

    const parcelasEvolucao = [];
    let saldoDevedor = valorCredito;

    for (let i = 1; i <= prazo; i++) {
      saldoDevedor -= parcelaPura;
      parcelasEvolucao.push({
        numero: i,
        parcelaPura,
        taxas: taxaAdmMensal + fundoReservaMensal,
        total: parcelaMensal,
        saldoRestante: Math.max(0, saldoDevedor)
      });
    }

    return {
      parcelaPura,
      taxaAdmMensal,
      fundoReservaMensal,
      parcelaMensal,
      custoTotal,
      totalTaxas,
      parcelasEvolucao
    };
  }, [valorCredito, prazo, taxaAdministracao, fundoReserva]);

  return {
    valorCredito, setValorCredito,
    prazo, setPrazo,
    taxaAdministracao, setTaxaAdministracao,
    fundoReserva, setFundoReserva,
    ...simulacao
  };
}