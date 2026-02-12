import React, { useState } from 'react'; 
import { 
  Layout, AlertTriangle, Users, ClipboardCheck, Search, 
  RefreshCw, HelpCircle, Database, Save, Activity, 
  CheckCircle2, ChevronRight, FileText, HeartPulse, 
  Stethoscope, Clock, BarChart3, MessageSquare, ShieldAlert,
  Thermometer, UserMinus, Star, Box 
} from 'lucide-react';

export default function App() {
  const [aba, setAba] = useState('dashboard');
  const [registros, setRegistros] = useState([]);
  
  const [abaInterna, setSubAba] = useState('inventario'); 

  // --- LOGICA DE BANCO DE DADOS ---
  const aoSalvar = (e, tipo) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dados = Object.fromEntries(formData);
    
    // Adiciona metadados de segurança
    const novoRegistro = { 
      ...dados, 
      tipo, 
      id: `NQSP-${Date.now()}`, 
      dataHora: new Date().toLocaleString(),
      usuario: "Administrador NQSP", // Simulação de usuário logado
      unidade: "UPA Coruripe 24h"
    };

    setRegistros([novoRegistro, ...registros]);
    alert(`Protocolo ${novoRegistro.id} gerado com sucesso!`);
    e.target.reset();
  };

  const Menu = ({ id, icon: Icon, label, cor = "text-slate-500" }) => (
    <button 
      onClick={() => setAba(id)} 
      className={`w-full flex items-center justify-between p-3.5 transition-all ${
        aba === id ? 'bg-blue-600/10 border-l-4 border-blue-500 text-white' : 'hover:bg-white/5 text-slate-400'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} className={aba === id ? 'text-blue-400' : cor} />
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
    </button>
  );

  return (
    <div className="flex h-screen bg-[#F1F5F9] overflow-hidden font-sans text-slate-700">
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#0F172A] text-slate-300 flex flex-col shadow-2xl z-50">
        <div className="p-8 bg-[#020617] flex flex-col items-center border-b border-slate-800">
          <div className="w-12 h-12 bg-blue-600 rounded-xl mb-3 flex items-center justify-center shadow-lg">
            <Activity size={28} className="text-white" />
          </div>
          <span className="text-white font-black tracking-tighter text-xl uppercase italic">NQSP <span className="text-blue-500">UPA</span></span>
        </div>
        
        <nav className="flex-1 mt-4 overflow-y-auto">
          <Menu id="dashboard" icon={BarChart3} label="BI & Dashboards" />
          <Menu id="banco" icon={Database} label="Central de Dados" />

          <div className="px-6 py-4 text-[9px] font-black text-slate-600 uppercase tracking-[3px]">Segurança</div>
          <Menu id="gestaoRiscos" icon={ShieldAlert} label="Gestão de Riscos" />
          <Menu id="cincoPorques" icon={HelpCircle} label="Ishikawa (Causa Raiz)" />

          <div className="px-6 py-4 text-[9px] font-black text-slate-600 uppercase tracking-[3px]">Operacional</div>
          <Menu id="protocolos" icon={Clock} label="Protocolos (IAM/AVC)" />
          <Menu id="satisfacao" icon={Star} label="Pesquisa NPS" />
          <Menu id="gestaoQualidade" icon={BarChart3} label="Gestão de Processos" />
          <Menu id="humanizacao" icon={HeartPulse} label="Humanização & NPS" />
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-10">
        
        {/* HEADER */}
        <header className="mb-10">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
            {aba === 'gestaoRiscos' ? 'MAPA DE RISCOS' : 
             aba === 'protocolos' ? 'PROTOCOLOS CLÍNICOS' :  
             aba === 'satisfacao' ? 'QUALIDADE & NPS' : aba.toUpperCase()}
          </h1>
        </header>

        {/* --- FORMULÁRIOS DETALHADOS --- */}

        {/* 1. GESTÃO DE RISCOS (COMPLETO) */}
        {aba === 'gestaoRiscos' && (
  <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
    {/* Cabeçalho Estilo Foto */}
    <div className="bg-white rounded-xl shadow-2xl border overflow-hidden">
      <div className="bg-[#1a5d40] p-6 text-white border-b-4 border-red-500 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-black uppercase italic tracking-tighter text-white">Gestão de Risco & Segurança do Paciente</h2>
          <p className="text-green-200 text-[10px] font-bold uppercase tracking-[3px]">Padrão ONA / Ministério da Saúde</p>
        </div>
        <ShieldAlert size={32} className="text-white" />
      </div>

      {/* Navegação Interna (Subpastas) */}
      <div className="flex bg-slate-100 border-b overflow-x-auto">
        {['inventario', 'plano_acao', 'notificacao_ea', 'metas_internacionais'].map((sub) => (
          <button
            key={sub}
            onClick={() => setSubAba(sub)} // Certifique-se de criar [subAba, setSubAba] no seu useState superior
            className={`px-6 py-4 text-[10px] font-black uppercase italic transition-all border-r ${
              (abaInterna || 'inventario') === sub ? 'bg-white text-red-600 border-b-4 border-b-red-600' : 'text-slate-500 hover:bg-slate-200'
            }`}
          >
            {sub.replace('_', ' ')}
          </button>
        ))}
      </div>

      <form onSubmit={(e) => aoSalvar(e, `Risco - ${abaInterna}`)} className="p-10 space-y-8 font-black italic uppercase text-[10px]">
        
        {/* SUB-ABA 1: INVENTÁRIO (MAPEAMENTO) */}
        {(abaInterna === 'inventario' || !abaInterna) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-left">
            <div className="col-span-2 bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
              <label className="text-red-700">Identificação do Risco (Descrição Clara do Perigo)</label>
              <input name="problema" className="w-full bg-white border p-3 rounded mt-2 text-sm" placeholder="Ex: Queda de paciente da maca na Sala Vermelha" required />
            </div>
            <div>
              <label>Tipo de Risco</label>
              <select name="tipo_risco" className="w-full border-b-2 p-3 bg-slate-50 mt-1">
                <option>Biológico</option><option>Químico</option><option>Físico</option><option>Ergonômico</option><option>Administrativo</option><option>Infraestrutura</option>
              </select>
            </div>
            <div>
              <label>Setor / Processo Afetado</label>
              <select name="setor" className="w-full border-b-2 p-3 bg-slate-50 mt-1">
                <option>Acolhimento</option><option>Triagem</option><option>Sala Vermelha</option><option>Medicação</option><option>Observação</option>
              </select>
            </div>
            <div className="col-span-2 p-4 bg-slate-900 rounded-xl text-white">
              <p className="mb-4 text-orange-400">Avaliação da Matriz de Risco (Probabilidade x Impacto)</p>
              <div className="grid grid-cols-2 gap-4">
                <select name="gravidade" className="bg-slate-800 p-3 rounded border border-slate-700">
                  <option value="Baixo">Baixo</option><option value="Médio">Médio</option><option value="Alto">Alto</option><option value="Crítico">Crítico</option>
                </select>
                <div className="flex items-center gap-2 text-[9px] text-slate-400 italic font-normal">
                  * Crítico: Risco de Óbito ou Dano Permanente
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUB-ABA 2: PLANO DE AÇÃO */}
        {abaInterna === 'plano_acao' && (
          <div className="space-y-6 animate-in slide-in-from-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border-2 border-green-100 rounded-xl">
                <label className="text-green-700">Medidas Preventivas (Barreiras)</label>
                <textarea name="preventiva" className="w-full h-24 mt-2 p-3 bg-green-50/50 rounded" placeholder="Ações para evitar o risco..."></textarea>
              </div>
              <div className="p-4 border-2 border-orange-100 rounded-xl">
                <label className="text-orange-700">Medidas Corretivas (Mitigação)</label>
                <textarea name="corretiva" className="w-full h-24 mt-2 p-3 bg-orange-50/50 rounded" placeholder="Caso ocorra, o que faremos?"></textarea>
              </div>
              <div>
                <label>Responsável Técnico</label>
                <input name="responsavel" className="w-full border-b-2 p-3" placeholder="Nome do Executor" />
              </div>
              <div>
                <label>Prazo Limite</label>
                <input name="prazo" type="date" className="w-full border-b-2 p-3" />
              </div>
            </div>
          </div>
        )}

        {/* SUB-ABA 3: MONITORAMENTO (EVENTOS ADVERSOS) */}
        {abaInterna === 'notificacao_ea' && (
          <div className="space-y-6 animate-in slide-in-from-left">
            <div className="bg-slate-800 p-6 rounded-xl text-white">
              <label className="text-blue-400">Classificação da Notificação</label>
              <div className="flex gap-6 mt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="classe_evento" value="EA" /> Evento Adverso
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="classe_evento" value="NearMiss" /> Near Miss (Quase Falha)
                </label>
              </div>
            </div>
            <textarea name="problema" className="w-full h-32 p-4 border-2 rounded-xl" placeholder="Relato detalhado do incidente..."></textarea>
          </div>
        )}

        {/* SUB-ABA 4: 6 METAS INTERNACIONAIS */}
        {abaInterna === 'metas_internacionais' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-left">
            {[
              '1. Identificação Correta do Paciente',
              '2. Comunicação Efetiva',
              '3. Segurança em Medicamentos',
              '4. Cirurgia / Procedimento Seguro',
              '5. Higiene das Mãos',
              '6. Prevenção de Quedas e LPP'
            ].map(meta => (
              <div key={meta} className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm">
                <span className="text-slate-700">{meta}</span>
                <input type="checkbox" name={`meta_${meta[0]}`} className="w-5 h-5 accent-green-600" />
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between border-t pt-8">
          <div className="text-[9px] text-slate-400">
            Assinado Digitalmente por: <br/> **COORDENAÇÃO DE QUALIDADE NQSP**
          </div>
          <button type="submit" className="bg-red-600 text-white px-12 py-5 rounded-2xl font-black hover:bg-slate-900 transition-all shadow-xl">
            Protocolar no Inventário de Riscos
          </button>
        </div>
      </form>
    </div>
  </div>
)}

{aba === 'cincoPorques' && (
  <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
    <div className="bg-white rounded-xl shadow-2xl border overflow-hidden">
      {/* Cabeçalho Profissional */}
      <div className="bg-slate-900 p-8 text-white border-b-4 border-orange-500 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Análise de Causa Raiz - Espinha de Peixe</h2>
          <p className="text-orange-400 text-[10px] font-bold uppercase tracking-[3px] mt-1">Diretrizes ONA / MS / ANVISA</p>
        </div>
        <div className="text-right">
          <span className="block text-[10px] font-black text-slate-500 uppercase">Documento Interno</span>
          <span className="bg-orange-500/20 text-orange-500 px-3 py-1 rounded text-[10px] font-black italic border border-orange-500/50">NQSP-ISH-2026</span>
        </div>
      </div>

      <form onSubmit={(e) => aoSalvar(e, 'Análise Ishikawa')} className="p-10 space-y-12 font-black italic uppercase text-[10px]">
        
        {/* 1. O PROBLEMA (CABEÇA DO PEIXE) */}
        <div className="relative p-8 bg-slate-50 border-2 border-slate-200 rounded-3xl shadow-inner">
          <div className="absolute -top-4 left-6 bg-slate-900 text-white px-4 py-1 rounded-full text-[9px]">O PROBLEMA (EFEITO)</div>
          <input 
            name="problema" 
            className="w-full bg-transparent border-b-4 border-slate-900 p-4 text-2xl font-black text-slate-800 outline-none placeholder:text-slate-300"
            placeholder="EX: ALTA TAXA DE INFECÇÃO NA SALA DE PROCEDIMENTOS"
            required 
          />
        </div>

        {/* 2. OS 6Ms (ESTRUTURA TÉCNICA) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { m: 'Mão de Obra', icon: Users, desc: 'Treinamento, fadiga, comunicação, desvio de protocolo.' },
            { m: 'Método', icon: ClipboardCheck, desc: 'Fluxos, Manchester, protocolos MS desatualizados.' },
            { m: 'Material', icon: Box, desc: 'Insumos vencidos, falta de medicamentos, esterilização.' },
            { m: 'Máquina', icon: Activity, desc: 'Equipamentos quebrados, falta de calibração/manutenção.' },
            { m: 'Medida', icon: BarChart3, desc: 'KPIs não monitorados, subnotificação de EA.' },
            { m: 'Meio Ambiente', icon: Layout, desc: 'Lotação, iluminação, ruído, contaminação cruzada.' }
          ].map((item) => (
            <div key={item.m} className="group hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-2 mb-2 text-blue-600">
                <item.icon size={16} />
                <label className="tracking-widest">{item.m}</label>
              </div>
              <textarea 
                name={item.m.toLowerCase()}
                className="w-full h-32 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-[11px] font-bold outline-none focus:border-blue-500 focus:bg-white shadow-sm transition-all italic"
                placeholder={item.desc}
              />
            </div>
          ))}
        </div>

        {/* 3. SEGURANÇA DO PACIENTE (METAS IMPACTADAS) */}
        <div className="bg-blue-50 p-8 rounded-3xl border-2 border-blue-100">
          <h3 className="text-blue-700 mb-6 flex items-center gap-2">
            <ShieldAlert size={18} /> Metas Internacionais Impactadas
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'Identificação do Paciente', 'Comunicação Efetiva', 'Segurança Medicamentosa',
              'Cirurgia Segura', 'Higiene das Mãos', 'Prevenção de Quedas/LPP'
            ].map(meta => (
              <label key={meta} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors">
                <input type="checkbox" name="metas_impactadas" value={meta} className="w-4 h-4 accent-blue-600" />
                <span className="text-[9px] text-slate-600 leading-tight">{meta}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 4. PLANO DE AÇÃO (5W2H SIMPLIFICADO) */}
        <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-orange-400 mb-6 flex items-center gap-2">
              <CheckCircle2 size={18} /> Plano de Ação (Tratamento da Causa Raiz)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-slate-400 block mb-1">O QUE SERÁ FEITO? (Ação Corretiva)</label>
                  <textarea name="acao_corretiva" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm focus:border-orange-500 outline-none" required />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">POR QUE? (Justificativa ONA)</label>
                  <input name="por_que" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 block mb-1">QUEM? (Responsável)</label>
                    <input name="quem" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">QUANDO? (Prazo)</label>
                    <input name="quando" type="date" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">COMO? (Método de Execução)</label>
                  <textarea name="como" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm h-14" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTÃO DE SALVAMENTO */}
        <button type="submit" className="w-full bg-orange-600 text-white py-6 rounded-3xl font-black shadow-xl hover:bg-orange-700 transition-all uppercase italic tracking-[6px] text-sm flex items-center justify-center gap-4">
          <Save size={24} /> Protocolar Investigação de Incidente
        </button>
      </form>
    </div>
  </div>
)}
        {/* 2. PROTOCOLOS IAM/AVC (TIME-TRACKING) */}
       {aba === 'protocolos' && (
  <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
    <div className="bg-white rounded-xl shadow-2xl border overflow-hidden">
      {/* HEADER DINÂMICO */}
      <div className="bg-[#1e40af] p-8 text-white border-b-4 border-blue-900 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter italic">Eficiência Operacional & Qualidade</h2>
          <p className="text-blue-200 text-[10px] font-bold uppercase tracking-[3px] mt-1">Nível ONA: Segurança, Gestão e Excelência</p>
        </div>
        <Activity size={32} className="text-blue-300" />
      </div>

      {/* SUB-NAVEGAÇÃO OPERACIONAL */}
      <div className="flex bg-slate-100 border-b overflow-x-auto">
        {[
          { id: 'fluxo', label: 'Fluxo e Acesso', icon: RefreshCw },
          { id: 'clinico', label: 'Protocolos Clínicos (POP)', icon: Stethoscope },
          { id: 'indicadores', label: 'Indicadores (Gestão à Vista)', icon: BarChart3 },
          { id: 'recursos', label: 'Recursos e Pessoas', icon: Users }
        ].map((sub) => (
          <button
            key={sub.id}
            onClick={() => setSubAba(sub.id)}
            className={`px-6 py-4 flex items-center gap-2 text-[10px] font-black uppercase italic transition-all border-r ${
              (abaInterna || 'fluxo') === sub.id ? 'bg-white text-blue-700 border-b-4 border-b-blue-700' : 'text-slate-500 hover:bg-slate-200'
            }`}
          >
            <sub.icon size={14} /> {sub.label}
          </button>
        ))}
      </div>

      <form onSubmit={(e) => aoSalvar(e, `Operacional - ${abaInterna}`)} className="p-10 space-y-8 font-black italic uppercase text-[10px]">
        
        {/* 1. FLUXO DE ATENDIMENTO E ACESSO */}
        {(abaInterna === 'fluxo' || !abaInterna) && (
          <div className="space-y-6 animate-in slide-in-from-right">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-blue-600">
                <label>Mapeamento de Acesso</label>
                <select name="etapa_fluxo" className="w-full border-b-2 p-3 bg-transparent mt-2">
                  <option>Recepção &rarr; Triagem</option>
<option>Triagem &rarr; Atendimento Médico</option>
<option>Atendimento &rarr; Sala de Medicação</option>
<option>Observação &rarr; Alta/Transferência</option>
                </select>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-orange-500">
                <label>Classificação de Risco (Manchester)</label>
                <select name="cor_manchester" className="w-full border-b-2 p-3 bg-transparent mt-2 font-black">
                  <option className="text-red-600">VERMELHO (Emergência Imediata)</option>
                  <option className="text-orange-600">LARANJA (Muito Urgente - 10min)</option>
                  <option className="text-yellow-600">AMARELO (Urgente - 60min)</option>
                  <option className="text-green-600">VERDE (Pouco Urgente - 120min)</option>
                  <option className="text-blue-600">AZUL (Não Urgente - 240min)</option>
                </select>
              </div>
            </div>
            <textarea name="problema" className="w-full h-24 p-4 border-2 rounded-xl" placeholder="Observações sobre gargalos no fluxo ou rastreabilidade..."></textarea>
          </div>
        )}

        {/* 2. PROTOCOLOS CLÍNICOS PADRONIZADOS (POPs) */}
        {abaInterna === 'clinico' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right">
            <div className="col-span-2 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <label className="text-blue-800">Protocolo Clínico Ativado (POP)</label>
              <select name="protocolo_ativo" className="w-full bg-transparent border-b-2 border-blue-400 p-3 mt-2 font-black">
                <option>Dor Torácica / IAM</option>
                <option>Suspeita de AVC</option>
                <option>Protocolo de Sepse</option>
                <option>Manejo de Trauma Grave</option>
                <option>Crise Hipertensiva / Diabética</option>
              </select>
            </div>
            <div>
              <label>Adesão ao Protocolo (%)</label>
              <input name="adesao_pop" type="number" className="w-full border-b-2 p-3" placeholder="Ex: 100" />
            </div>
            <div>
              <label>Tempo Porta-Conduta (Minutos)</label>
              <input name="tempo_conduta" type="number" className="w-full border-b-2 p-3" placeholder="Tempo total em min" />
            </div>
          </div>
        )}

        {/* 3. INDICADORES DE DESEMPENHO (GESTÃO À VISTA) */}
        {abaInterna === 'indicadores' && (
          <div className="space-y-8 animate-in slide-in-from-right">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 p-6 rounded-2xl text-white">
                <label className="text-slate-400">Tempo Médio Espera (TME)</label>
                <input name="tme" className="w-full bg-transparent border-b border-slate-700 p-2 text-xl" placeholder="Ex: 45 min" />
              </div>
              <div className="bg-slate-900 p-6 rounded-2xl text-white">
                <label className="text-slate-400">Giro de Leito</label>
                <input name="giro_leito" className="w-full bg-transparent border-b border-slate-700 p-2 text-xl" placeholder="Ex: 4.2" />
              </div>
              <div className="bg-slate-900 p-6 rounded-2xl text-white">
                <label className="text-slate-400">Taxa de Mortalidade</label>
                <input name="mortalidade" className="w-full bg-transparent border-b border-slate-700 p-2 text-xl" placeholder="Ex: 0.8%" />
              </div>
            </div>
            <div className="p-6 bg-white border-2 rounded-2xl">
              <label className="text-blue-600 mb-4 block">Análise de Performance (PDCA)</label>
              <textarea name="analise_pdca" className="w-full h-20 p-3 bg-slate-50 rounded" placeholder="Planejar, Executar, Verificar, Agir..."></textarea>
            </div>
          </div>
        )}

        {/* 4. GESTÃO DE PESSOAS E RECURSOS */}
        {abaInterna === 'recursos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-right">
            <div className="space-y-4">
              <label className="text-slate-400">Educação Continuada / Treinamentos</label>
              <input name="tema_treinamento" className="w-full border-b-2 p-3" placeholder="Tema do Treinamento Mensal" />
              <input name="participantes" type="number" className="w-full border-b-2 p-3" placeholder="Nº de Colaboradores Treinados" />
            </div>
            <div className="p-6 bg-orange-50 rounded-2xl border border-orange-200">
              <label className="text-orange-800">Plano de Contingência (Superlotação)</label>
              <div className="flex flex-col gap-3 mt-4">
                <label className="flex items-center gap-2"><input type="checkbox" name="contingencia_equipe" /> Reforço de Equipe Ativado</label>
                <label className="flex items-center gap-2"><input type="checkbox" name="contingencia_leitos" /> Remanejamento de Leitos</label>
              </div>
            </div>
          </div>
        )}

        {/* BOTÃO FINAL */}
        <div className="flex items-center justify-between border-t pt-10">
          <div className="flex gap-4">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[8px]">Rastreabilidade: OK</span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[8px]">Conformidade ONA: OK</span>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-16 py-6 rounded-3xl font-black shadow-xl hover:bg-slate-900 transition-all uppercase italic tracking-[5px] text-xs">
            Salvar Registro Operacional
          </button>
        </div>
      </form>
    </div>
  </div>
)}

        {/* 4. PESQUISA NPS (SATISFAÇÃO) */}
        {aba === 'satisfacao' && (
          <div className="max-w-4xl mx-auto bg-white rounded-[40px] shadow-2xl border overflow-hidden animate-in fade-in">
            <div className="bg-green-600 p-8 text-white">
              <h2 className="text-2xl font-black uppercase italic">Pesquisa de Satisfação (NPS)</h2>
            </div>
            <form onSubmit={(e) => aoSalvar(e, 'Pesquisa Satisfação')} className="p-10 space-y-8 font-black italic uppercase text-xs">
              <div className="text-center">
                <label className="text-lg">De 0 a 10, quanto recomendaria a UPA Coruripe?</label>
                <div className="flex justify-between mt-4">
                  {[0,1,2,3,4,5,6,7,8,9,10].map(n => (
                    <label key={n} className="cursor-pointer">
                      <input type="radio" name="nota" value={n} className="hidden peer" required />
                      <div className="w-10 h-10 border flex items-center justify-center rounded-lg peer-checked:bg-green-600 peer-checked:text-white transition-all font-black">
                        {n}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label>Sugestão ou Reclamação</label>
                <textarea name="problema" className="w-full border-2 rounded-2xl p-4 bg-slate-50 mt-2" placeholder="Deixe seu comentário..."></textarea>
              </div>
              <button type="submit" className="w-full bg-green-600 text-white py-6 rounded-3xl uppercase">Salvar Avaliação</button>
            </form>
          </div>
        )}

        {aba === 'gestaoQualidade' && (
  <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
    <div className="bg-white rounded-xl shadow-2xl border overflow-hidden">
      
      {/* HEADER ESTRATÉGICO */}
      <div className="bg-[#0f172a] p-8 text-white border-b-4 border-blue-500 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Gestão de Processos & Qualidade</h2>
          <p className="text-blue-400 text-[10px] font-bold uppercase tracking-[3px] mt-1">Níveis ONA 1, 2 e 3 | Gestão Integrada</p>
        </div>
        <Database size={32} className="text-blue-500" />
      </div>

      {/* SUB-NAVEGAÇÃO DE QUALIDADE */}
      <div className="flex bg-slate-100 border-b overflow-x-auto">
        {[
          { id: 'assistencial', label: 'Indicadores Assistenciais', icon: HeartPulse },
          { id: 'conformidade', label: 'Conformidade e Segurança', icon: ShieldAlert },
          { id: 'administrativo', label: 'Gestão Administrativa', icon: Database },
          { id: 'estrategico', label: 'Planejamento e SWOT', icon: Layout }
        ].map((sub) => (
          <button
            key={sub.id}
            onClick={() => setSubAba(sub.id)}
            className={`px-6 py-4 flex items-center gap-2 text-[10px] font-black uppercase italic transition-all border-r ${
              (abaInterna || 'assistencial') === sub.id ? 'bg-white text-blue-800 border-b-4 border-b-blue-800' : 'text-slate-500 hover:bg-slate-200'
            }`}
          >
            <sub.icon size={14} /> {sub.label}
          </button>
        ))}
      </div>

      <form onSubmit={(e) => aoSalvar(e, `Qualidade - ${abaInterna}`)} className="p-10 space-y-8 font-black italic uppercase text-[10px]">
        
        {/* 1. INDICADORES ASSISTENCIAIS (ONA 1 e 2) */}
        {(abaInterna === 'assistencial' || !abaInterna) && (
          <div className="space-y-6 animate-in slide-in-from-right">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-red-600">
                <label>Adesão Protocolos (IAM/AVC/Sepse) %</label>
                <input name="adesao_protocolo" type="number" className="w-full bg-transparent border-b-2 p-2" placeholder="Ex: 95" />
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-blue-600">
                <label>Tempo Porta-Balão (Minutos)</label>
                <input name="tempo_porta" type="number" className="w-full bg-transparent border-b-2 p-2" />
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-yellow-600">
                <label>Taxa de Reinternação (72h) %</label>
                <input name="taxa_retorno" type="number" className="w-full bg-transparent border-b-2 p-2" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 bg-slate-900 rounded-xl text-white">
                <label className="text-blue-400">Tempo Médio Manchester (Minutos)</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <input name="tempo_vermelho" placeholder="Vermelho" className="bg-slate-800 p-2 rounded text-xs" />
                  <input name="tempo_amarelo" placeholder="Amarelo" className="bg-slate-800 p-2 rounded text-xs" />
                </div>
              </div>
              <div className="p-4 bg-red-900 rounded-xl text-white">
                <label className="text-red-300">Taxa de Mortalidade Mensal (%)</label>
                <input name="mortalidade" className="w-full bg-transparent border-b border-red-500 p-2 text-xl" />
              </div>
            </div>
          </div>
        )}

        {/* 2. CONFORMIDADE E SEGURANÇA (ONA 2/3) */}
        {abaInterna === 'conformidade' && (
          <div className="space-y-6 animate-in slide-in-from-right">
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h3 className="text-blue-800 mb-4">Índice de Conformidade de Prontuários</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['Assinatura/Carimbo', 'Evolução Multiprofissional', 'Classificação Documentada', 'Passagem de Plantão Formal', 'Higiene das Mãos'].map(item => (
                  <label key={item} className="flex items-center gap-2 bg-white p-3 rounded-lg border text-[9px]">
                    <input type="checkbox" name={`conformidade_${item}`} className="accent-blue-600" /> {item}
                  </label>
                ))}
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <label>Auditoria de Prontuário (% de campos completos)</label>
              <input name="perc_conformidade" type="range" className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer mt-4" />
            </div>
          </div>
        )}

        {/* 3. GESTÃO ADMINISTRATIVA E FINANCEIRA */}
        {abaInterna === 'administrativo' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right">
            <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
              <label className="text-red-700">Eficiência de Faturamento</label>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="text-[8px]">Taxa de Glosas (%)</label>
                  <input name="taxa_glosa" className="w-full border-b-2 p-2 bg-transparent" />
                </div>
                <div>
                  <label className="text-[8px]">Tempo Fechamento Conta</label>
                  <input name="tempo_faturamento" className="w-full border-b-2 p-2 bg-transparent" />
                </div>
              </div>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl">
              <label>Giro e Ocupação</label>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <input name="ocupacao_obs" placeholder="Ocupação Observação %" className="border-b-2 p-2 bg-transparent" />
                <input name="rotura_estoque" placeholder="Faltas de Insumos (Qtd)" className="border-b-2 p-2 bg-transparent" />
              </div>
            </div>
          </div>
        )}

        {/* 4. PLANEJAMENTO ESTRATÉGICO (SWOT / 5W2H) */}
        {abaInterna === 'estrategico' && (
          <div className="space-y-8 animate-in slide-in-from-right">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-green-50 border-t-4 border-green-500 rounded shadow-sm">
                <label className="text-green-700">Forças</label>
                <textarea name="swot_forcas" className="w-full bg-transparent text-[9px] h-20"></textarea>
              </div>
              <div className="p-4 bg-red-50 border-t-4 border-red-500 rounded shadow-sm">
                <label className="text-red-700">Fraquezas</label>
                <textarea name="swot_fraquezas" className="w-full bg-transparent text-[9px] h-20"></textarea>
              </div>
              <div className="p-4 bg-blue-50 border-t-4 border-blue-500 rounded shadow-sm">
                <label className="text-blue-700">Oportunidades</label>
                <textarea name="swot_oport" className="w-full bg-transparent text-[9px] h-20"></textarea>
              </div>
              <div className="p-4 bg-orange-50 border-t-4 border-orange-500 rounded shadow-sm">
                <label className="text-orange-700">Ameaças</label>
                <textarea name="swot_ameacas" className="w-full bg-transparent text-[9px] h-20"></textarea>
              </div>
            </div>
            <div className="p-6 bg-slate-900 rounded-2xl text-white">
              <h3 className="text-orange-400 mb-4">Ação Corretiva (Evidência ONA)</h3>
              <textarea name="acao_corretiva_qualidade" className="w-full bg-slate-800 p-4 rounded-xl border border-slate-700" placeholder="Descreva o plano de ação para indicadores fora da meta..."></textarea>
            </div>
          </div>
        )}

        {/* BOTÃO SALVAR */}
        <div className="pt-8 border-t flex justify-between items-center">
          <p className="text-[8px] text-slate-400 italic">Fontes: Manual ONA / Ministério da Saúde / ANVISA</p>
          <button type="submit" className="bg-[#0f172a] text-white px-12 py-5 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl tracking-widest">
            Protocolar Relatório de Qualidade
          </button>
        </div>
      </form>
    </div>
  </div>
)}

{/* ABA HUMANIZAÇÃO */}
{aba === 'humanizacao' && (
  <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
    <div className="bg-white rounded-xl shadow-2xl border overflow-hidden">
      
      {/* HEADER HUMANIZADO */}
      <div className="bg-[#be185d] p-8 text-white border-b-4 border-rose-900 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Humanização & Satisfação do Usuário</h2>
          <p className="text-rose-200 text-[10px] font-bold uppercase tracking-[3px] mt-1">Ouvidoria Ativa SUS / PNH (Política Nacional de Humanização)</p>
        </div>
        <HeartPulse size={32} className="text-rose-300" />
      </div>

      {/* SUB-NAVEGAÇÃO DE HUMANIZAÇÃO */}
      <div className="flex bg-slate-100 border-b overflow-x-auto">
        {[
          { id: 'nps', label: 'Pesquisa de Satisfação (NPS)', icon: Star },
          { id: 'tempos', label: 'Gestão de Fluxo e Espera', icon: Clock },
          { id: 'ouvidoria', label: 'Ouvidoria e Tratativas', icon: MessageSquare },
          { id: 'ambiente', label: 'Ambiente e Acessibilidade', icon: Layout }
        ].map((sub) => (
          <button
            key={sub.id}
            onClick={() => setSubAba(sub.id)}
            className={`px-6 py-4 flex items-center gap-2 text-[10px] font-black uppercase italic transition-all border-r ${
              (abaInterna || 'nps') === sub.id ? 'bg-white text-rose-700 border-b-4 border-b-rose-700' : 'text-slate-500 hover:bg-slate-200'
            }`}
          >
            <sub.icon size={14} /> {sub.label}
          </button>
        ))}
      </div>

      <form onSubmit={(e) => aoSalvar(e, `Humanização - ${abaInterna}`)} className="p-10 space-y-8 font-black italic uppercase text-[10px]">
        
        {/* 1. NPS - NET PROMOTER SCORE */}
        {(abaInterna === 'nps' || !abaInterna) && (
          <div className="space-y-6 animate-in slide-in-from-right">
            <div className="bg-rose-50 p-6 rounded-2xl border-2 border-rose-100 text-center">
              <label className="text-rose-700 text-sm mb-4 block">"O quanto você recomendaria esta UPA a um amigo ou familiar?"</label>
              <div className="flex justify-between max-w-2xl mx-auto gap-2">
                {[...Array(11).keys()].map(n => (
                  <button key={n} type="button" className={`w-10 h-10 rounded-lg font-black border-2 transition-all ${n <= 6 ? 'border-red-200 text-red-600 hover:bg-red-600 hover:text-white' : n <= 8 ? 'border-yellow-200 text-yellow-600 hover:bg-yellow-600 hover:text-white' : 'border-green-200 text-green-600 hover:bg-green-600 hover:text-white'}`}>
                    {n}
                  </button>
                ))}
              </div>
              <div className="flex justify-between max-w-2xl mx-auto mt-2 text-[8px] text-slate-400">
                <span>0 - DETRATORES</span>
                <span>7 - PASSIVOS</span>
                <span>10 - PROMOTORES</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-white border-2 rounded-xl">
                <label className="text-slate-500">Por que você deu essa nota? (Campo Qualitativo)</label>
                <textarea name="motivo_nota" className="w-full h-24 mt-2 p-3 bg-slate-50 rounded outline-none" placeholder="Elogios ou queixas específicas sobre o atendimento humano..."></textarea>
              </div>
              <div className="p-4 bg-slate-900 rounded-xl text-white">
                <label className="text-rose-400">Cálculo de Meta NPS</label>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <input name="qtd_promotores" placeholder="Nº Promotores" className="bg-slate-800 p-2 rounded text-xs" />
                  <input name="qtd_detratores" placeholder="Nº Detratores" className="bg-slate-800 p-2 rounded text-xs" />
                  <div className="col-span-2 text-center border-t border-slate-700 pt-2 text-rose-500 text-lg">ZONA DE EXCELÊNCIA: +75</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. TEMPOS DE ESPERA (GESTÃO DE FLUXO) */}
        {abaInterna === 'tempos' && (
          <div className="space-y-6 animate-in slide-in-from-right">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white font-bold">
              <div className="bg-blue-600 p-6 rounded-2xl shadow-lg">
                <div className="bg-blue-600 p-6 rounded-2xl shadow-lg">
  <label className="text-blue-100 block mb-1">{"Porta -> Classificação"}</label>
  <input name="tempo_porta_triagem" className="bg-blue-500 w-full p-2 rounded border border-blue-400" placeholder="Ex: 8 min" />
  <span className="text-[8px] opacity-70">Meta: {'<'} 10 min</span>
</div>
                <span className="text-[8px] opacity-70">Meta (Amarelo): &lt; 60 min</span>
              </div>
              <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                <label className="text-slate-400 block mb-1">Permanência Total</label>
                <input name="tempo_permanencia" className="bg-slate-700 w-full p-2 rounded border border-slate-600" placeholder="Ex: 4h 20min" />
                <span className="text-[8px] opacity-70">Meta Máxima: 24h</span>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-2 rounded-xl">
              <label>Prioridade em Grupos Especiais (Idosos/Gestantes)</label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2"><input type="checkbox" name="prioridade_ok" /> Atendimento Respeitado</label>
              </div>
            </div>
          </div>
        )}

        {/* 3. OUVIDORIA E TRATATIVAS */}
        {abaInterna === 'ouvidoria' && (
          <div className="space-y-6 animate-in slide-in-from-right">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-slate-900">
                <label className="mb-4 block">Tipo de Manifestação (Fala.BR)</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Elogio', 'Sugestão', 'Reclamação', 'Denúncia', 'Solicitação'].map(tipo => (
                    <label key={tipo} className="flex items-center gap-2 text-[9px]">
                      <input type="radio" name="tipo_manifestacao" value={tipo} /> {tipo}
                    </label>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-rose-50 rounded-2xl border-l-4 border-rose-600">
                <label>Tempo de Resposta (Ouvidoria)</label>
                <input name="tempo_resposta_ouvidoria" className="w-full bg-transparent border-b-2 p-2 mt-2" placeholder="Ex: 3 dias úteis" />
                <span className="text-[8px] text-rose-400">Meta Crítica: &lt; 10 dias</span>
              </div>
            </div>
            <div className="bg-slate-900 p-6 rounded-2xl text-white">
              <h3 className="text-rose-400 mb-4 flex items-center gap-2"><AlertTriangle size={16}/> Análise de Causa Raiz (Tratativa da Queixa)</h3>
              <textarea name="tratativa_ouvidoria" className="w-full bg-slate-800 p-4 rounded-xl border border-slate-700 h-24" placeholder="Descreva a ação corretiva tomada pela gestão para resolver a insatisfação..."></textarea>
            </div>
          </div>
        )}

        {/* 4. AMBIENTE E ACESSIBILIDADE */}
        {abaInterna === 'ambiente' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-right">
            <div className="space-y-4 p-6 bg-slate-50 rounded-2xl">
              <label className="text-slate-600 block mb-4">Checklist de Estrutura (ONA Nível 1)</label>
              {['Limpeza das Áreas Comuns', 'Climatização Adequada', 'Sinalização Visual Clara', 'Assentos Suficientes', 'Bebedouros em Operação'].map(item => (
                <label key={item} className="flex items-center justify-between text-[9px] border-b pb-2">
                  {item} <input type="checkbox" name={`check_${item}`} className="w-4 h-4 accent-rose-600" />
                </label>
              ))}
            </div>
            <div className="p-6 bg-rose-50 rounded-2xl">
              <label className="text-rose-800">Educação e Comportamento da Equipe</label>
              <textarea name="treinamento_humanizacao" className="w-full h-32 mt-4 p-3 bg-white rounded border border-rose-200" placeholder="Registros de treinamento de empatia, comunicação não-violenta e acolhimento..."></textarea>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div className="flex items-center justify-between border-t pt-8">
          <div className="flex gap-4">
            <span className="flex items-center gap-1 text-[8px] text-green-600 font-bold"><CheckCircle2 size={12}/> OUVSUS INTEGRADA</span>
            <span className="flex items-center gap-1 text-[8px] text-blue-600 font-bold"><CheckCircle2 size={12}/> PNH CONFORME</span>
          </div>
          <button type="submit" className="bg-[#be185d] text-white px-16 py-6 rounded-3xl font-black shadow-xl hover:bg-slate-900 transition-all uppercase italic tracking-[5px] text-xs">
            Protocolar Relatório de Humanização
          </button>
        </div>
      </form>
    </div>
  </div>
)}

        {/* CENTRAL DE DADOS (DATABASE SIMULADA) */}
        {aba === 'banco' && (
          <div className="bg-white rounded-[40px] shadow-2xl border overflow-hidden">
             <div className="p-6 bg-slate-50 border-b flex justify-between items-center">
                <span className="font-black uppercase italic text-slate-400">Repositório NQSP - Logs de Auditoria</span>
                <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-[10px] font-black italic">Total: {registros.length} registros</span>
             </div>
             <table className="w-full text-left">
                <thead className="bg-slate-900 text-white text-[10px] uppercase italic">
                   <tr>
                      <th className="p-6">ID Protocolo</th>
                      <th className="p-6">Módulo</th>
                      <th className="p-6">Conteúdo / Descrição</th>
                      <th className="p-6">Data/Hora</th>
                   </tr>
                </thead>
                <tbody className="divide-y font-bold italic text-sm">
                   {registros.map(r => (
                      <tr key={r.id} className="hover:bg-slate-50 transition-all">
                         <td className="p-6 text-blue-600 font-black">{r.id}</td>
                         <td className="p-6"><span className="bg-slate-100 p-1 px-2 rounded-md">{r.tipo}</span></td>
                         <td className="p-6 text-slate-900 uppercase">{r.problema || r.tipo_protocolo || 'Registro Geral'}</td>
                         <td className="p-6 text-slate-400 text-xs">{r.dataHora}</td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        )}

        {/* DASHBOARD BI SIMPLIFICADO */}
        {aba === 'dashboard' && (
  <div className="max-w-7xl mx-auto animate-in fade-in duration-500 space-y-6">
    
    {/* HEADER DO DASHBOARD */}
    <div className="bg-slate-900 p-6 rounded-2xl shadow-2xl border-b-4 border-blue-500 flex justify-between items-end">
      <div>
        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">BI & Gestão à Vista</h2>
        <p className="text-blue-400 text-[10px] font-bold uppercase tracking-[3px]">Monitoramento em Tempo Real - Padrão ONA Nível 1, 2 e 3</p>
      </div>
      <div className="flex gap-4">
        <div className="bg-green-500/10 border border-green-500/50 p-2 rounded text-center">
          <span className="block text-[8px] text-green-500 font-bold">SISTEMA ATIVO</span>
          <span className="text-white font-black text-xs uppercase italic">Sincronizado</span>
        </div>
      </div>
    </div>

    {/* 1. VISUALIZAÇÃO EM TEMPO REAL (CARDS) */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: 'Ocupação Total', val: '88%', color: 'bg-blue-600', icon: Layout, desc: 'Geral da Unidade' },
        { label: 'TME Manchester', val: '12 min', color: 'bg-orange-600', icon: Clock, desc: 'Média de Espera' },
        { label: 'Aguardando Vaga', val: '04', color: 'bg-red-600', icon: UserMinus, desc: 'Pacientes na Pedra' },
        { label: 'NPS Atual', val: '+78', color: 'bg-rose-600', icon: Star, desc: 'Zona de Excelência' }
      ].map((card, i) => (
        <div key={i} className={`${card.color} p-6 rounded-2xl text-white shadow-lg relative overflow-hidden group`}>
          <card.icon className="absolute right-[-10px] bottom-[-10px] opacity-20 group-hover:scale-110 transition-transform" size={80} />
          <p className="text-[10px] font-black uppercase opacity-80 italic">{card.label}</p>
          <h3 className="text-4xl font-black mt-2 italic">{card.val}</h3>
          <p className="text-[9px] mt-2 font-bold opacity-70 uppercase tracking-widest">{card.desc}</p>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* 2. METODOLOGIA PDCA - PLANO DE MELHORIA */}
      <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border overflow-hidden">
        <div className="bg-slate-100 p-4 border-b flex justify-between items-center">
          <span className="font-black italic uppercase text-xs text-slate-700">Ciclo de Melhoria Contínua (PDCA)</span>
          <RefreshCw size={16} className="text-blue-600 animate-spin-slow" />
        </div>
        <div className="p-6 grid grid-cols-2 gap-4">
          <div className="p-4 border-2 border-dashed border-blue-200 rounded-2xl">
            <h4 className="text-blue-700 font-black text-[10px] mb-2 uppercase italic">P - PLANEJAR (5W2H)</h4>
            <ul className="text-[9px] font-bold text-slate-500 space-y-1">
              <li>• CRONOGRAMA DE EDUCAÇÃO PERMANENTE</li>
              <li>• METAS DE QUALIDADE 2026</li>
            </ul>
          </div>
          <div className="p-4 border-2 border-dashed border-green-200 rounded-2xl">
            <h4 className="text-green-700 font-black text-[10px] mb-2 uppercase italic">D - FAZER (EXECUÇÃO)</h4>
            <ul className="text-[9px] font-bold text-slate-500 space-y-1">
              <li>• ADESÃO HIGIENE DAS MÃOS: 92%</li>
              <li>• PROTOCOLO SEPSE APLICADO: OK</li>
            </ul>
          </div>
          <div className="p-4 border-2 border-dashed border-orange-200 rounded-2xl">
            <h4 className="text-orange-700 font-black text-[10px] mb-2 uppercase italic">C - VERIFICAR (AUDITORIA)</h4>
            <ul className="text-[9px] font-bold text-slate-500 space-y-1">
              <li>• AUDITORIA DE PRONTUÁRIOS: 88%</li>
              <li>• CHECKLIST AMBULÂNCIA: DIÁRIO</li>
            </ul>
          </div>
          <div className="p-4 border-2 border-dashed border-red-200 rounded-2xl">
            <h4 className="text-red-700 font-black text-[10px] mb-2 uppercase italic">A - AGIR (MELHORIA)</h4>
            <ul className="text-[9px] font-bold text-slate-500 space-y-1">
              <li>• REVISÃO DE POP APÓS EVENTO</li>
              <li>• PADRONIZAÇÃO DE NOVOS FLUXOS</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. DOCUMENTAÇÃO & POPs (ACESSO RÁPIDO) */}
      <div className="bg-slate-50 rounded-3xl shadow-xl border p-6 space-y-4">
        <h3 className="font-black italic uppercase text-xs text-slate-800 flex items-center gap-2">
          <Search size={16} className="text-blue-600" /> Repositório de POPs (QR)
        </h3>
        <div className="space-y-2">
          {[
            { doc: 'Higienização das Mãos', cod: 'POP-001' },
            { doc: 'Identificação do Paciente', cod: 'POP-002' },
            { doc: 'Prevenção de Quedas', cod: 'POP-003' },
            { doc: 'Medicamentos Alta Vigilância', cod: 'POP-004' }
          ].map((pop, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl border hover:border-blue-500 cursor-pointer transition-all shadow-sm group">
              <div>
                <p className="text-[9px] font-black italic uppercase text-slate-700">{pop.doc}</p>
                <span className="text-[7px] text-slate-400 font-bold">{pop.cod} - VER. 2.0</span>
              </div>
              <div className="bg-slate-100 p-2 rounded group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Database size={14} />
              </div>
            </div>
          ))}
        </div>
        <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-black uppercase italic text-[9px] tracking-widest hover:bg-blue-700 transition-colors">
          Acessar Lista Mestra Completa
        </button>
      </div>

    </div>

    {/* TABELA DE GESTÃO DE LEITOS E FLUXO */}
    <div className="bg-white rounded-3xl shadow-xl border overflow-hidden">
      <div className="bg-blue-600 p-4 text-white font-black italic uppercase text-[10px] tracking-widest">
        Gestão de Fluxo - Monitoramento "Na Pedra" e Transferências
      </div>
      <table className="w-full text-[10px] font-bold uppercase italic">
        <thead className="bg-slate-50 border-b">
          <tr>
            <th className="p-4 text-left">Paciente (Iniciais)</th>
            <th className="p-4 text-left">Classificação</th>
            <th className="p-4 text-left">Permanência</th>
            <th className="p-4 text-left">Status CROSS</th>
            <th className="p-4 text-right">Risco</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          <tr>
            <td className="p-4 text-slate-700">J.M.S (64 ANOS)</td>
            <td className="p-4"><span className="bg-red-600 text-white px-2 py-1 rounded">VERMELHO</span></td>
            <td className="p-4">12H 40MIN</td>
            <td className="p-4 text-orange-600 font-black">AGUARDANDO VAGA</td>
            <td className="p-4 text-right"><AlertTriangle className="inline text-red-500" size={14} /></td>
          </tr>
          <tr className="bg-slate-50/50">
            <td className="p-4 text-slate-700">A.L.O (22 ANOS)</td>
            <td className="p-4"><span className="bg-yellow-500 text-white px-2 py-1 rounded">AMARELO</span></td>
            <td className="p-4">04H 15MIN</td>
            <td className="p-4 text-green-600 font-black">EM OBSERVAÇÃO</td>
            <td className="p-4 text-right"><CheckCircle2 className="inline text-green-500" size={14} /></td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
)}
      </main>
    </div>
  );
}