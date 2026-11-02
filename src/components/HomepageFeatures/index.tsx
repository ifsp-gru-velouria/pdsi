import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
  link: string;
  linkText: string;
};

// Ícone representativo de Nivelamento & Fundamentos Matemáticos (Matriz, Somatório, Integral)
function FundamentalsSvg(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle
        cx="100"
        cy="100"
        r="88"
        fill="var(--ifm-color-primary)"
        fillOpacity="0.08"
        stroke="var(--ifm-color-primary)"
        strokeOpacity="0.3"
        strokeWidth="2"
      />
      {/* Prancheta / Quadro de conceitos */}
      <rect
        x="45"
        y="42"
        width="110"
        height="116"
        rx="10"
        fill="var(--ifm-background-color, #ffffff)"
        stroke="var(--ifm-color-primary)"
        strokeWidth="3"
      />
      {/* Detalhe superior */}
      <rect
        x="75"
        y="35"
        width="50"
        height="14"
        rx="4"
        fill="var(--ifm-color-primary)"
      />
      {/* Símbolo de Integral ∫ */}
      <path
        d="M68 70C68 64 73 60 78 60C82 60 84 63 84 66C84 72 74 82 74 95C74 108 64 116 64 124C64 130 68 134 74 134C79 134 82 131 82 127"
        stroke="var(--ifm-color-primary)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Símbolo de Somatório ∑ */}
      <path
        d="M132 66H104L117 84L104 102H132"
        stroke="var(--ifm-color-primary)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Matriz 2x2 simbólica [a b; c d] */}
      <path
        d="M102 114H98V140H102"
        stroke="var(--ifm-color-primary)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M130 114H134V140H130"
        stroke="var(--ifm-color-primary)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="109" cy="122" r="3" fill="var(--ifm-color-primary)" />
      <circle cx="123" cy="122" r="3" fill="var(--ifm-color-primary)" />
      <circle cx="109" cy="132" r="3" fill="var(--ifm-color-primary)" />
      <circle cx="123" cy="132" r="3" fill="var(--ifm-color-primary)" />
    </svg>
  );
}

// Ícone representativo de PDS (Sinal Contínuo vs. Amostrado / Impulsos)
function SignalSvg(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle
        cx="100"
        cy="100"
        r="88"
        fill="var(--ifm-color-primary)"
        fillOpacity="0.08"
        stroke="var(--ifm-color-primary)"
        strokeOpacity="0.3"
        strokeWidth="2"
      />
      {/* Eixo horizontal (tempo) */}
      <line
        x1="32"
        y1="100"
        x2="168"
        y2="100"
        stroke="var(--ifm-color-primary)"
        strokeOpacity="0.4"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      {/* Eixo vertical (amplitude) */}
      <line
        x1="45"
        y1="38"
        x2="45"
        y2="162"
        stroke="var(--ifm-color-primary)"
        strokeOpacity="0.4"
        strokeWidth="2"
      />
      {/* Onda analógica contínua (senóide suave) */}
      <path
        d="M45 100 Q 75 42, 105 100 T 165 100"
        stroke="var(--ifm-color-primary)"
        strokeOpacity="0.35"
        strokeWidth="2"
      />
      {/* Amostras discretas (Stems / impulsos com círculos) */}
      {/* n=0 */}
      <line x1="45" y1="100" x2="45" y2="100" stroke="var(--ifm-color-primary)" strokeWidth="3" />
      <circle cx="45" cy="100" r="4.5" fill="var(--ifm-color-primary)" />
      {/* n=1 */}
      <line x1="65" y1="100" x2="65" y2="65" stroke="var(--ifm-color-primary)" strokeWidth="3" />
      <circle cx="65" cy="65" r="4.5" fill="var(--ifm-color-primary)" />
      {/* n=2 (Pico) */}
      <line x1="85" y1="100" x2="85" y2="56" stroke="var(--ifm-color-primary)" strokeWidth="3" />
      <circle cx="85" cy="56" r="4.5" fill="var(--ifm-color-primary)" />
      {/* n=3 */}
      <line x1="105" y1="100" x2="105" y2="100" stroke="var(--ifm-color-primary)" strokeWidth="3" />
      <circle cx="105" cy="100" r="4.5" fill="var(--ifm-color-primary)" />
      {/* n=4 */}
      <line x1="125" y1="100" x2="125" y2="135" stroke="var(--ifm-color-primary)" strokeWidth="3" />
      <circle cx="125" cy="135" r="4.5" fill="var(--ifm-color-primary)" />
      {/* n=5 (Vale) */}
      <line x1="145" y1="100" x2="145" y2="144" stroke="var(--ifm-color-primary)" strokeWidth="3" />
      <circle cx="145" cy="144" r="4.5" fill="var(--ifm-color-primary)" />
      {/* n=6 */}
      <line x1="165" y1="100" x2="165" y2="100" stroke="var(--ifm-color-primary)" strokeWidth="3" />
      <circle cx="165" cy="100" r="4.5" fill="var(--ifm-color-primary)" />
    </svg>
  );
}

// Ícone representativo de PDI (Grade matricial de pixels e filtro de convolução)
function ImageSvg(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle
        cx="100"
        cy="100"
        r="88"
        fill="var(--ifm-color-primary)"
        fillOpacity="0.08"
        stroke="var(--ifm-color-primary)"
        strokeOpacity="0.3"
        strokeWidth="2"
      />
      {/* Base da imagem / Matriz de pixels */}
      <rect
        x="42"
        y="42"
        width="116"
        height="116"
        rx="8"
        fill="var(--ifm-background-color, #ffffff)"
        stroke="var(--ifm-color-primary)"
        strokeWidth="3"
      />
      {/* Grade de pixels interna 4x4 */}
      <line x1="71" y1="42" x2="71" y2="158" stroke="var(--ifm-color-primary)" strokeOpacity="0.25" strokeWidth="1.5" />
      <line x1="100" y1="42" x2="100" y2="158" stroke="var(--ifm-color-primary)" strokeOpacity="0.25" strokeWidth="1.5" />
      <line x1="129" y1="42" x2="129" y2="158" stroke="var(--ifm-color-primary)" strokeOpacity="0.25" strokeWidth="1.5" />
      <line x1="42" y1="71" x2="158" y2="71" stroke="var(--ifm-color-primary)" strokeOpacity="0.25" strokeWidth="1.5" />
      <line x1="42" y1="100" x2="158" y2="100" stroke="var(--ifm-color-primary)" strokeOpacity="0.25" strokeWidth="1.5" />
      <line x1="42" y1="129" x2="158" y2="129" stroke="var(--ifm-color-primary)" strokeOpacity="0.25" strokeWidth="1.5" />

      {/* Pixels com intensidades variadas (representando tons de cinza / processamento) */}
      <rect x="44" y="44" width="25" height="25" fill="var(--ifm-color-primary)" fillOpacity="0.1" />
      <rect x="73" y="44" width="25" height="25" fill="var(--ifm-color-primary)" fillOpacity="0.3" />
      <rect x="102" y="73" width="25" height="25" fill="var(--ifm-color-primary)" fillOpacity="0.65" />
      <rect x="131" y="102" width="25" height="25" fill="var(--ifm-color-primary)" fillOpacity="0.4" />
      <rect x="44" y="131" width="25" height="25" fill="var(--ifm-color-primary)" fillOpacity="0.2" />

      {/* Máscara de Convolução / Filtro em destaque */}
      <rect
        x="64"
        y="64"
        width="72"
        height="72"
        rx="6"
        fill="var(--ifm-color-primary)"
        fillOpacity="0.15"
        stroke="var(--ifm-color-primary)"
        strokeWidth="2.5"
        strokeDasharray="4 3"
      />
      {/* Ponto focal central do filtro */}
      <circle cx="100" cy="100" r="5" fill="var(--ifm-color-primary)" />
    </svg>
  );
}

const FeatureList: FeatureItem[] = [
  {
    title: 'Nivelamento',
    Svg: FundamentalsSvg,
    description: (
      <>
        Conceitos matemáticos fundamentais para iniciar a matéria.
      </>
    ),
    link: '/docs/category/nivelamento',
    linkText: 'Explorar Nivelamento',
  },
  {
    title: 'Processamento de Sinais (PDS)',
    Svg: SignalSvg,
    description: (
      <>
        Sinais contínuos e discretos, amostragem, Teorema de Nyquist, transformada
        de Fourier e filtragem digital com demonstrações interativas.
      </>
    ),
    link: '/docs/pds/introducao',
    linkText: 'Explorar PDS',
  },
  {
    title: 'Processamento de Imagens (PDI)',
    Svg: ImageSvg,
    description: (
      <>
        Representação matricial bidimensional, transformações de intensidade,
        convolução espacial, filtros de realce e segmentação digital.
      </>
    ),
    link: '/docs/pdi/introducao',
    linkText: 'Explorar PDI',
  },
];

function Feature({title, Svg, description, link, linkText}: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.featureCol)}>
      <div className={styles.featureCard}>
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img" aria-label={title} />
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3">{title}</Heading>
          <p className={styles.featureDescription}>{description}</p>
        </div>
        <div className="text--center">
          <Link className="button button--secondary button--sm" to={link}>
            {linkText} →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
