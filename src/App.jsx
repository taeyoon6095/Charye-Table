import { useMemo, useState } from 'react'
import './App.css'

const regions = [
  {
    id: 'seoul-gyeonggi',
    name: '서울·경기',
    image: '/regions/seoul-gyeonggi.svg',
    summary: '균형 잡힌 구성과 깔끔한 전류가 특징입니다.',
    sample: ['소고기 산적', '동그랑땡', '맑은 탕'],
  },
  {
    id: 'gangwon',
    name: '강원',
    image: '/regions/gangwon.svg',
    summary: '산나물과 어물을 함께 쓰는 담백한 상차림입니다.',
    sample: ['황태구이', '감자전', '곤드레나물'],
  },
  {
    id: 'chungcheong',
    name: '충청',
    image: '/regions/chungcheong.svg',
    summary: '순한 간과 정갈한 담음새를 중시합니다.',
    sample: ['두부전', '무나물', '쇠고기무국'],
  },
  {
    id: 'jeolla',
    name: '전라',
    image: '/regions/jeolla.svg',
    summary: '가짓수가 풍성하고 맛의 대비가 선명합니다.',
    sample: ['홍어전', '표고전', '병어찜'],
  },
  {
    id: 'gyeongsang',
    name: '경상',
    image: '/regions/gyeongsang.svg',
    summary: '해산물 비중이 높은 실용적 구성입니다.',
    sample: ['문어숙회', '가자미구이', '탕국'],
  },
  {
    id: 'jeju',
    name: '제주',
    image: '/regions/jeju.svg',
    summary: '옥돔과 해초 중심의 소박한 구성입니다.',
    sample: ['옥돔구이', '갈치조림', '톳무침'],
  },
]

const principles = [
  {
    title: '홍동백서',
    desc: '붉은 과실은 동쪽, 흰 과실은 서쪽에 둡니다.',
  },
  {
    title: '어동육서',
    desc: '생선은 동쪽, 고기는 서쪽에 둡니다.',
  },
  {
    title: '두동미서',
    desc: '생선 머리는 동쪽, 꼬리는 서쪽을 향하게 둡니다.',
  },
  {
    title: '좌포우혜',
    desc: '포는 왼쪽, 식혜는 오른쪽에 둡니다.',
  },
]

const tableRows = [
  {
    label: '1열: 신위',
    items: [
      { name: '메', hint: '밥은 서쪽, 국은 동쪽(좌반우갱) 원칙을 따릅니다.' },
      { name: '신위', center: true },
      { name: '잔', hint: '청주 또는 약주를 올립니다.' },
    ],
  },
  {
    label: '2열: 어육',
    items: [
      { name: '육적' },
      { name: '전류', hint: '고기/생선 방향을 맞춰 배치합니다.' },
      { name: '어적' },
    ],
  },
  {
    label: '3열: 탕',
    items: [{ name: '탕' }, { name: '탕' }, { name: '탕' }],
  },
  {
    label: '4열: 포·나물',
    items: [
      { name: '포', hint: '좌포우혜 원칙 적용' },
      { name: '나물' },
      { name: '식혜' },
    ],
  },
  {
    label: '5열: 과실',
    items: [
      { name: '대추' },
      { name: '밤' },
      { name: '배', hint: '홍동백서에 맞춰 색 배열을 정리합니다.' },
      { name: '곶감' },
      { name: '사과' },
    ],
  },
]

function App() {
  const [regionId, setRegionId] = useState(regions[0].id)

  const selectedRegion = useMemo(
    () => regions.find((region) => region.id === regionId),
    [regionId],
  )

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">제</div>
          <div>
            <p className="brand-sub">Traditional Memorial Table</p>
            <h1>차례상 가이드</h1>
          </div>
        </div>
        <button type="button" className="print-btn" onClick={() => window.print()}>
          인쇄하기
        </button>
      </header>

      <main className="layout">
        <aside className="steps" aria-label="차례상 단계">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className={`step ${step === 1 ? 'active' : ''}`}>
              {step}
            </div>
          ))}
        </aside>

        <section className="table-area" aria-label="차례상 배치도">
          <div className="table-header">
            <div>
              <h2>차례상 배치도</h2>
              <p>항목에 마우스를 올리면 배치 원칙을 확인할 수 있습니다.</p>
            </div>
            <span className="axis">서(좌) - 동(우)</span>
          </div>

          <div className="table-surface">
            {tableRows.map((row) => (
              <article key={row.label} className="row-card">
                <p className="row-label">{row.label}</p>
                <div className="foods" data-count={row.items.length}>
                  {row.items.map((item) => (
                    <div key={item.name} className={`food ${item.center ? 'center' : ''}`}>
                      <span>{item.name}</span>
                      {item.hint ? <small className="tooltip">{item.hint}</small> : null}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="sidebar">
          <section className="card dark">
            <h3>핵심 원칙</h3>
            <ul>
              {principles.map((rule) => (
                <li key={rule.title}>
                  <strong>{rule.title}</strong>
                  <p>{rule.desc}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="card">
            <h3>지역별 예시</h3>
            <div className="tabs" role="tablist" aria-label="지역 선택">
              {regions.map((region) => (
                <button
                  key={region.id}
                  type="button"
                  className={region.id === regionId ? 'active' : ''}
                  onClick={() => setRegionId(region.id)}
                >
                  {region.name}
                </button>
              ))}
            </div>

            {selectedRegion ? (
              <div className="region-box" role="tabpanel" aria-label={`${selectedRegion.name} 지역 예시`}>
                <img src={selectedRegion.image} alt={`${selectedRegion.name} 차례상 예시`} loading="lazy" />
                <p>{selectedRegion.summary}</p>
                <div className="chips">
                  {selectedRegion.sample.map((food) => (
                    <span key={food}>{food}</span>
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        </aside>
      </main>
    </div>
  )
}

export default App
