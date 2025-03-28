import React, { useState } from "react";

function App() {
  const [dados, setDados] = useState({
    custoFixo: 15000,
    custoVariavel: 40,
    tempoPorAtendimento: 60,
    atendimentosMes: 120,
    metaLucro: 10000,
    valorAtual: 200,
    tipoRepasse: "percentual",
    valorRepasse: 50,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: isNaN(value) ? value : parseFloat(value) });
  };

  const horasMes = (dados.tempoPorAtendimento * dados.atendimentosMes) / 60;
  const custoHoraClinica = dados.custoFixo / horasMes;
  const custoPorAtendimento = custoHoraClinica + dados.custoVariavel;
  const lucroPorAtendimento = dados.metaLucro / dados.atendimentosMes;
  const precoIdeal = custoPorAtendimento + lucroPorAtendimento;
  const lucroAtual = dados.valorAtual - custoPorAtendimento;
  const lucroMensalAtual = lucroAtual * dados.atendimentosMes;

  let valorRepasse = 0;
  if (dados.tipoRepasse === "percentual") {
    valorRepasse = (dados.valorRepasse / 100) * dados.valorAtual;
  } else if (dados.tipoRepasse === "fixo") {
    valorRepasse = dados.valorRepasse;
  } else if (dados.tipoRepasse === "diaria") {
    valorRepasse = (dados.valorRepasse * 22) / dados.atendimentosMes;
  }

  const margemClínica = dados.valorAtual - valorRepasse - custoPorAtendimento;
  const margemTotal = ((dados.valorAtual - custoPorAtendimento) / dados.valorAtual) * 100;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <h1>Simulador de Precificação</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {[
          { label: "Custo Fixo Mensal", name: "custoFixo" },
          { label: "Custo Variável por Atendimento", name: "custoVariavel" },
          { label: "Tempo por Atendimento (min)", name: "tempoPorAtendimento" },
          { label: "Atendimentos por Mês", name: "atendimentosMes" },
          { label: "Meta de Lucro Mensal", name: "metaLucro" },
          { label: "Valor Cobrado Hoje", name: "valorAtual" },
          { label: "Tipo de Repasse (percentual, fixo, diaria)", name: "tipoRepasse" },
          { label: "Valor de Repasse", name: "valorRepasse" }
        ].map((input) => (
          <div key={input.name}>
            <label>{input.label}</label>
            <input
              name={input.name}
              type="text"
              value={dados[input.name]}
              onChange={handleChange}
              style={{ width: '100%', padding: 8 }}
            />
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32 }}>
        <h2>Resultados:</h2>
        <p><strong>Custo da Hora Clínica:</strong> R$ {custoHoraClinica.toFixed(2)}</p>
        <p><strong>Custo por Atendimento:</strong> R$ {custoPorAtendimento.toFixed(2)}</p>
        <p><strong>Lucro por Atendimento (Meta):</strong> R$ {lucroPorAtendimento.toFixed(2)}</p>
        <p><strong>Preço Ideal:</strong> R$ {precoIdeal.toFixed(2)}</p>
        <p><strong>Lucro Atual por Atendimento:</strong> R$ {lucroAtual.toFixed(2)}</p>
        <p><strong>Lucro Mensal Estimado:</strong> R$ {lucroMensalAtual.toFixed(2)}</p>
        <p><strong>Valor Repassado:</strong> R$ {valorRepasse.toFixed(2)}</p>
        <p><strong>Margem da Clínica:</strong> R$ {margemClínica.toFixed(2)}</p>
        <p><strong>Margem Total (%):</strong> {margemTotal.toFixed(1)}%</p>
      </div>
    </div>
  );
}

export default App;
