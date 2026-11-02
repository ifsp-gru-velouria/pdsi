import React, { useState, useMemo } from 'react';
import styles from './styles.module.css';

type SignalShape = 'asymmetric' | 'triangle' | 'pulse';
type DomainType = 'continuous' | 'discrete';

export default function TransformationsDemo(): React.ReactElement {
  // Parâmetros da transformação: y(t) = x(alpha * t + beta)
  const [alpha, setAlpha] = useState<number>(1);
  const [beta, setBeta] = useState<number>(0);
  const [isReflected, setIsReflected] = useState<boolean>(false);
  const [shape, setShape] = useState<SignalShape>('asymmetric');
  const [domain, setDomain] = useState<DomainType>('continuous');

  // Coeficiente a efetivo (se refletido, inverte o sinal de alpha)
  const effectiveAlpha = (isReflected ? -1 : 1) * Math.abs(alpha);

  // Dimensões da tela SVG
  const width = 760;
  const height = 300;
  const padding = { top: 30, right: 35, bottom: 45, left: 45 };

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const centerY = padding.top + plotHeight / 2;

  // Faixa do eixo de tempo: t de -6 a +6
  const tMin = -6;
  const tMax = 6;
  const tRange = tMax - tMin;

  const toX = (t: number) => padding.left + ((t - tMin) / tRange) * plotWidth;
  const toY = (val: number) => centerY - val * (plotHeight * 0.42);

  // Função do sinal original x_base(t)
  const baseSignal = (t: number): number => {
    switch (shape) {
      case 'triangle':
        // Triângulo de amplitude 1 entre [-1, 1] (Exemplo do exercício)
        if (Math.abs(t) <= 1) {
          return 1 - Math.abs(t);
        }
        return 0;

      case 'pulse':
        // Pulso suave em sino (Figura 3 - Mudança de escala)
        if (Math.abs(t) <= 2) {
          const bell = Math.exp(-Math.pow(t, 2) / 0.9);
          return bell;
        }
        return 0;

      case 'asymmetric':
      default:
        // Sinal clássico do Oppenheim (Figuras 1 e 2 - Dois picos e assimetria)
        if (t < -3.5 || t > 3.5) return 0;
        const lobe1 = 0.65 * Math.exp(-Math.pow(t + 1.2, 2) / 0.8);
        const lobe2 = 0.95 * Math.exp(-Math.pow(t - 0.2, 2) / 0.35);
        const dip = -0.35 * Math.exp(-Math.pow(t - 1.8, 2) / 0.4);
        return lobe1 + lobe2 + dip;
    }
  };

  // Sinal transformado: y(t) = x(alpha * t + beta)
  const transformedSignal = (t: number): number => {
    const arg = effectiveAlpha * t + beta;
    return baseSignal(arg);
  };

  // 1. Curvas Contínuas
  const originalPath = useMemo(() => {
    const steps = 300;
    const points: string[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = tMin + (i / steps) * tRange;
      const y = baseSignal(t);
      points.push(`${i === 0 ? 'M' : 'L'} ${toX(t).toFixed(1)} ${toY(y).toFixed(1)}`);
    }
    return points.join(' ');
  }, [shape]);

  const transformedPath = useMemo(() => {
    const steps = 300;
    const points: string[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = tMin + (i / steps) * tRange;
      const y = transformedSignal(t);
      points.push(`${i === 0 ? 'M' : 'L'} ${toX(t).toFixed(1)} ${toY(y).toFixed(1)}`);
    }
    return points.join(' ');
  }, [shape, effectiveAlpha, beta]);

  // 2. Amostras Discretas (stems)
  const discreteSamples = useMemo(() => {
    const items: { n: number; origVal: number; transVal: number; x: number; origY: number; transY: number }[] = [];
    for (let n = -6; n <= 6; n++) {
      const orig = baseSignal(n);
      const trans = transformedSignal(n);
      items.push({
        n,
        origVal: orig,
        transVal: trans,
        x: toX(n),
        origY: toY(orig),
        transY: toY(trans),
      });
    }
    return items;
  }, [shape, effectiveAlpha, beta]);

  // Aplica pré-configurações didáticas rápidas
  const applyPreset = (preset: 'delay' | 'advance' | 'reflect' | 'compress' | 'expand' | 'exercise' | 'reset') => {
    switch (preset) {
      case 'delay':
        // x(t - 2): Atraso de 2 s
        setEffective(1, -2, false);
        break;
      case 'advance':
        // x(t + 2): Avanço de 2 s
        setEffective(1, 2, false);
        break;
      case 'reflect':
        // x(-t): Reversão no tempo
        setEffective(1, 0, true);
        break;
      case 'compress':
        // x(2t): Compressão por fator de 2
        setEffective(2, 0, false);
        break;
      case 'expand':
        // x(0.5t): Expansão por fator de 2
        setEffective(0.5, 0, false);
        break;
      case 'exercise':
        // x(2t + 3): Exemplo guiado 2 da aula
        setShape('triangle');
        setEffective(2, 3, false);
        break;
      case 'reset':
      default:
        setEffective(1, 0, false);
        break;
    }
  };

  const setEffective = (newAlpha: number, newBeta: number, newReflect: boolean) => {
    setAlpha(newAlpha);
    setBeta(newBeta);
    setIsReflected(newReflect);
  };

  // Montagem da representação textual da fórmula y(t)
  const formulaText = useMemo(() => {
    const varName = domain === 'continuous' ? 't' : 'n';
    let inner = '';

    const aStr = effectiveAlpha === 1 ? '' : effectiveAlpha === -1 ? '-' : `${effectiveAlpha}`;
    inner += `${aStr}${varName}`;

    if (beta > 0) {
      inner += ` + ${beta}`;
    } else if (beta < 0) {
      inner += ` - ${Math.abs(beta)}`;
    }

    return domain === 'continuous' ? `y(t) = x(${inner})` : `y[n] = x[${inner}]`;
  }, [effectiveAlpha, beta, domain]);

  // Efeito descritivo do que está acontecendo
  const analysisText = useMemo(() => {
    const parts: string[] = [];

    // Reflexão
    if (isReflected) {
      parts.push('🪞 Sinal invertido horizontalmente (reflexão no tempo em relação ao eixo 0).');
    }

    // Escala
    const absA = Math.abs(effectiveAlpha);
    if (absA > 1) {
      parts.push(`⚡ Compressão temporal por um fator de ${absA}x (o sinal fica mais estreito/rápido).`);
    } else if (absA < 1 && absA > 0) {
      parts.push(`🔍 Expansão temporal por um fator de ${(1 / absA).toFixed(1)}x (o sinal fica mais largo/lento).`);
    }

    // Deslocamento
    if (beta > 0) {
      const shiftUnits = (beta / absA).toFixed(1);
      parts.push(`⏪ Avanço temporal: o sinal move-se ${shiftUnits} unidades para a ESQUERDA.`);
    } else if (beta < 0) {
      const shiftUnits = (Math.abs(beta) / absA).toFixed(1);
      parts.push(`⏩ Atraso temporal: o sinal move-se ${shiftUnits} unidades para a DIREITA.`);
    }

    if (parts.length === 0) {
      return 'O sinal transformado coincide perfeitamente com o sinal original de referência.';
    }

    return parts.join(' ');
  }, [effectiveAlpha, beta, isReflected]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>Laboratório Prático: Transformações no Tempo</h3>
          <p className={styles.subtitle}>
            Altere os parâmetros abaixo para observar o deslocamento, reflexão e mudança de escala em tempo real.
          </p>
        </div>

        {/* Seletores de formato e domínio */}
        <div className={styles.topSelectors}>
          <div className={styles.selectorGroup}>
            <span className={styles.selectorLabel}>Domínio:</span>
            <button
              type="button"
              className={`${styles.tabBtn} ${domain === 'continuous' ? styles.tabBtnActive : ''}`}
              onClick={() => setDomain('continuous')}>
              Contínuo x(t)
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${domain === 'discrete' ? styles.tabBtnActive : ''}`}
              onClick={() => setDomain('discrete')}>
              Discreto x[n]
            </button>
          </div>

          <div className={styles.selectorGroup}>
            <span className={styles.selectorLabel}>Sinal base:</span>
            <select
              className={styles.select}
              value={shape}
              onChange={(e) => setShape(e.target.value as SignalShape)}>
              <option value="asymmetric">Assimétrico (Oppenheim)</option>
              <option value="triangle">Triângulo [-1, 1]</option>
              <option value="pulse">Pulso em Sino</option>
            </select>
          </div>
        </div>
      </div>

      {/* Botões de Predefinições Rápidas */}
      <div className={styles.presetsBar}>
        <span className={styles.presetsLabel}>Exemplos Rápidos:</span>
        <button type="button" className={styles.presetBtn} onClick={() => applyPreset('delay')}>
          ⏩ Atraso (t - 2)
        </button>
        <button type="button" className={styles.presetBtn} onClick={() => applyPreset('advance')}>
          ⏪ Avanço (t + 2)
        </button>
        <button type="button" className={styles.presetBtn} onClick={() => applyPreset('reflect')}>
          🪞 Reflexão x(-t)
        </button>
        <button type="button" className={styles.presetBtn} onClick={() => applyPreset('compress')}>
          ⚡ Compressão x(2t)
        </button>
        <button type="button" className={styles.presetBtn} onClick={() => applyPreset('expand')}>
          🔍 Expansão x(0.5t)
        </button>
        <button type="button" className={styles.presetBtnHighlight} onClick={() => applyPreset('exercise')}>
          🎯 Exercício Guiado: x(2t + 3)
        </button>
        <button type="button" className={styles.presetBtnReset} onClick={() => applyPreset('reset')}>
          🔄 Resetar
        </button>
      </div>

      {/* Controles Dinâmicos */}
      <div className={styles.controlsGrid}>
        {/* Deslocamento Beta */}
        <div className={styles.controlCard}>
          <div className={styles.controlHeader}>
            <span className={styles.paramName}>Deslocamento (β):</span>
            <span className={styles.paramValue}>{beta > 0 ? `+${beta}` : beta}</span>
          </div>
          <input
            type="range"
            min="-4"
            max="4"
            step="0.5"
            value={beta}
            onChange={(e) => setBeta(parseFloat(e.target.value))}
            className={styles.slider}
          />
          <span className={styles.controlHint}>
            {beta > 0 ? '← Adiantado (move para esquerda)' : beta < 0 ? '→ Atrasado (move para direita)' : 'Sem deslocamento'}
          </span>
        </div>

        {/* Escala Alpha */}
        <div className={styles.controlCard}>
          <div className={styles.controlHeader}>
            <span className={styles.paramName}>Escala (|α|):</span>
            <span className={styles.paramValue}>{alpha}x</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.25"
            value={alpha}
            onChange={(e) => setAlpha(parseFloat(e.target.value))}
            className={styles.slider}
          />
          <span className={styles.controlHint}>
            {alpha > 1 ? '⚡ Comprimido no tempo' : alpha < 1 ? '🔍 Expandido no tempo' : 'Escala 1:1 original'}
          </span>
        </div>

        {/* Reflexão no Tempo */}
        <div className={styles.controlCard}>
          <div className={styles.controlHeader}>
            <span className={styles.paramName}>Inversão Temporal:</span>
            <span className={styles.paramValue}>{isReflected ? 'Ativa (α < 0)' : 'Desativada'}</span>
          </div>
          <div className={styles.toggleRow}>
            <button
              type="button"
              className={`${styles.toggleBtn} ${isReflected ? styles.toggleBtnActive : ''}`}
              onClick={() => setIsReflected(!isReflected)}>
              {isReflected ? '🪞 Espelhado: x(-t)' : '▶ Normal: x(t)'}
            </button>
          </div>
          <span className={styles.controlHint}>
            {isReflected ? 'Sinal tocado de trás para frente' : 'Sentido temporal progressivo'}
          </span>
        </div>
      </div>

      {/* Caixa de Fórmula e Diagnóstico Dinâmico */}
      <div className={styles.formulaBox}>
        <div className={styles.formulaBadge}>{formulaText}</div>
        <div className={styles.analysisMessage}>{analysisText}</div>
      </div>

      {/* Gráfico Visual */}
      <div className={styles.chartWrapper}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className={styles.svgPlot}
          role="img"
          aria-label="Gráfico de transformação no tempo">
          {/* Fundo e Linhas de Grade */}
          <line
            x1={padding.left}
            y1={centerY}
            x2={width - padding.right}
            y2={centerY}
            stroke="var(--ifm-color-emphasis-300, #ccc)"
            strokeWidth="1.5"
          />
          <line
            x1={toX(0)}
            y1={padding.top}
            x2={toX(0)}
            y2={height - padding.bottom}
            stroke="var(--ifm-color-emphasis-400, #999)"
            strokeWidth="2"
            strokeDasharray="3 3"
          />

          {/* Marcas de t no Eixo Horizontal */}
          {[-6, -4, -2, 0, 2, 4, 6].map((tick) => (
            <g key={tick}>
              <line
                x1={toX(tick)}
                y1={centerY - 4}
                x2={toX(tick)}
                y2={centerY + 4}
                stroke="var(--ifm-color-emphasis-600, #666)"
                strokeWidth="1.5"
              />
              <text
                x={toX(tick)}
                y={centerY + 18}
                textAnchor="middle"
                fontSize="11"
                fill="var(--ifm-font-color-base, #333)"
                opacity={0.8}>
                {tick}
              </text>
            </g>
          ))}

          {/* Legenda do Eixo */}
          <text
            x={width - padding.right + 15}
            y={centerY + 4}
            fontSize="12"
            fontWeight="bold"
            fill="var(--ifm-font-color-base, #333)">
            {domain === 'continuous' ? 't' : 'n'}
          </text>
          <text
            x={toX(0)}
            y={padding.top - 10}
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
            fill="var(--ifm-font-color-base, #333)">
            {domain === 'continuous' ? 'x(t) / y(t)' : 'x[n] / y[n]'}
          </text>

          {/* RENDERIZAÇÃO: DOMÍNIO CONTÍNUO */}
          {domain === 'continuous' && (
            <>
              {/* Sinal Original x(t) (Linha pontilhada cinza) */}
              <path
                d={originalPath}
                fill="none"
                stroke="var(--ifm-color-emphasis-500, #888)"
                strokeWidth="2"
                strokeDasharray="5 4"
                opacity="0.6"
              />

              {/* Sinal Transformado y(t) (Linha sólida colorida primária) */}
              <path
                d={transformedPath}
                fill="none"
                stroke="var(--ifm-color-primary, #2e8555)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}

          {/* RENDERIZAÇÃO: DOMÍNIO DISCRETO (Stems) */}
          {domain === 'discrete' && (
            <>
              {/* Hastes originais pontilhadas */}
              {discreteSamples.map((s) => (
                <g key={`orig-${s.n}`}>
                  <line
                    x1={s.x}
                    y1={centerY}
                    x2={s.x}
                    y2={s.origY}
                    stroke="var(--ifm-color-emphasis-400, #aaa)"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                  <circle cx={s.x} cy={s.origY} r="3" fill="var(--ifm-color-emphasis-500, #888)" />
                </g>
              ))}

              {/* Hastes transformadas sólidas em destaque */}
              {discreteSamples.map((s) => (
                <g key={`trans-${s.n}`}>
                  <line
                    x1={s.x}
                    y1={centerY}
                    x2={s.x}
                    y2={s.transY}
                    stroke="var(--ifm-color-primary, #2e8555)"
                    strokeWidth="2.5"
                  />
                  <circle cx={s.x} cy={s.transY} r="4.5" fill="var(--ifm-color-primary, #2e8555)" />
                </g>
              ))}
            </>
          )}
        </svg>
      </div>

      {/* Legenda do Gráfico */}
      <div className={styles.legendRow}>
        <div className={styles.legendItem}>
          <span className={styles.legendOriginalIndicator}></span>
          <span>Sinal Original <strong>{domain === 'continuous' ? 'x(t)' : 'x[n]'}</strong> (Referência)</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendTransformedIndicator}></span>
          <span>Sinal Transformado <strong>{domain === 'continuous' ? 'y(t)' : 'y[n]'}</strong></span>
        </div>
      </div>
    </div>
  );
}
