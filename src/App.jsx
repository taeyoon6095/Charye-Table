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
  { title: '홍동백서', desc: '붉은 과실은 동쪽, 흰 과실은 서쪽에 둡니다.' },
  { title: '어동육서', desc: '생선은 동쪽, 고기는 서쪽에 둡니다.' },
  { title: '두동미서', desc: '생선 머리는 동쪽, 꼬리는 서쪽을 향하게 둡니다.' },
  { title: '좌포우혜', desc: '포는 왼쪽, 식혜는 오른쪽에 둡니다.' },
]

const tableRows = [
  {
    label: '1열: 신위',
    items: [
      {
        id: 'rice-bowl',
        name: '메(밥)',
        image:
          'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=900&q=80',
        description: '밥은 보통 서쪽에 두고, 짝을 이루는 국은 동쪽에 둡니다. 좌반우갱 원칙의 기본입니다.',
      },
      {
        id: 'soup-bowl',
        name: '갱(국)',
        image:
          'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80',
        description: '맑은 탕이나 국을 함께 올립니다. 밥과 짝으로 배치해 제례의 기본 구성을 맞춥니다.',
      },
      {
        id: 'ritual-wine',
        name: '잔(술)',
        image:
          'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80',
        description: '맑은 술을 올려 예를 표합니다. 잔은 정중앙이 아닌 신위 앞에 단정하게 둡니다.',
      },
    ],
  },
  {
    label: '2열: 어육',
    items: [
      {
        id: 'beef-jeok',
        name: '육적',
        image:
          'https://images.unsplash.com/photo-1529563021893-cc83c992d75d?auto=format&fit=crop&w=900&q=80',
        description: '육류 적은 서쪽에 둡니다. 어동육서 원칙을 따라 생선과 좌우 균형을 맞춥니다.',
      },
      {
        id: 'jeon',
        name: '전류',
        image:
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
        description: '전은 종류별로 간격을 맞춰 담으면 상차림이 정돈되어 보입니다.',
      },
      {
        id: 'fish-jeok',
        name: '어적',
        image:
          'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80',
        description: '생선 요리는 동쪽에 둡니다. 머리와 꼬리 방향은 두동미서 원칙에 맞춰 정합니다.',
      },
    ],
  },
  {
    label: '3열: 탕',
    items: [
      {
        id: 'beef-tang',
        name: '소고기탕',
        image:
          'https://images.unsplash.com/photo-1604908811371-44c6ab6fce7f?auto=format&fit=crop&w=900&q=80',
        description: '육탕은 기름을 걷어 맑게 준비하고, 자극적인 향신료는 줄입니다.',
      },
      {
        id: 'fish-tang',
        name: '어탕',
        image:
          'https://images.unsplash.com/photo-1505253716362-afaea6ce52e6?auto=format&fit=crop&w=900&q=80',
        description: '어탕은 비린내를 줄여 담백하게 준비하는 것이 일반적입니다.',
      },
      {
        id: 'tofu-tang',
        name: '두부탕',
        image:
          'https://images.unsplash.com/photo-1625937286074-9ca519d5d9df?auto=format&fit=crop&w=900&q=80',
        description: '두부탕은 간을 강하게 하지 않고 재료 맛을 살려 배치합니다.',
      },
    ],
  },
  {
    label: '4열: 포·나물',
    items: [
      {
        id: 'po',
        name: '포',
        image:
          'https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?auto=format&fit=crop&w=900&q=80',
        description: '포는 왼쪽에 두는 좌포우혜 원칙을 따릅니다.',
      },
      {
        id: 'namul',
        name: '나물',
        image:
          'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
        description: '나물은 물기를 제거해 깔끔하게 담고, 서로 색이 겹치지 않게 둡니다.',
      },
      {
        id: 'sikhye',
        name: '식혜',
        image:
          'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80',
        description: '식혜는 오른쪽에 배치하는 경우가 많으며 후식류와의 간격을 확보합니다.',
      },
    ],
  },
  {
    label: '5열: 과실',
    items: [
      {
        id: 'jujube',
        name: '대추',
        image:
          'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?auto=format&fit=crop&w=900&q=80',
        description: '말린 대추는 전통적으로 자손 번영을 상징하는 과실로 자주 사용됩니다.',
      },
      {
        id: 'chestnut',
        name: '밤',
        image:
          'https://images.unsplash.com/photo-1603048719539-9ecb4a70e3f2?auto=format&fit=crop&w=900&q=80',
        description: '밤은 껍질 상태를 깔끔하게 맞춰 좌우 균형을 고려해 배치합니다.',
      },
      {
        id: 'pear',
        name: '배',
        image:
          'https://images.unsplash.com/photo-1574226516831-e1dff420e37f?auto=format&fit=crop&w=900&q=80',
        description: '배는 흰 계열 과실로 분류되어 서쪽에 두는 홍동백서 원칙을 따릅니다.',
      },
      {
        id: 'persimmon',
        name: '곶감',
        image:
          'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=900&q=80',
        description: '곶감은 건과류와 함께 묶어 정리하면 5열 구성이 단정해집니다.',
      },
      {
        id: 'apple',
        name: '사과',
        image:
          'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=900&q=80',
        description: '사과는 붉은 과실로 동쪽에 배치합니다. 크기가 비슷한 과실끼리 맞추면 보기 좋습니다.',
      },
    ],
  },
]

const allFoods = tableRows.flatMap((row) =>
  row.items.map((item) => ({
    ...item,
    rowLabel: row.label,
  })),
)

function App() {
  const [regionId, setRegionId] = useState(regions[0].id)
  const [selectedFoodId, setSelectedFoodId] = useState(allFoods[0].id)

  const selectedRegion = useMemo(
    () => regions.find((region) => region.id === regionId),
    [regionId],
  )

  const selectedFood = useMemo(
    () => allFoods.find((food) => food.id === selectedFoodId) ?? allFoods[0],
    [selectedFoodId],
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
        <section className="table-area" aria-label="차례상 배치도">
          <div className="table-header">
            <div>
              <h2>차례상 배치도</h2>
              <p>음식을 클릭하면 설명과 사진이 아래에 표시됩니다.</p>
            </div>
            <span className="axis">서(좌) - 동(우)</span>
          </div>

          <div className="table-surface">
            {tableRows.map((row) => (
              <article key={row.label} className="row-card">
                <p className="row-label">{row.label}</p>
                <div className="foods" data-count={row.items.length}>
                  {row.items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`food ${selectedFoodId === item.id ? 'active' : ''}`}
                      onClick={() => setSelectedFoodId(item.id)}
                    >
                      <img src={item.image} alt={item.name} loading="lazy" />
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <article className="food-detail" aria-live="polite">
            <img src={selectedFood.image} alt={selectedFood.name} loading="lazy" />
            <div>
              <p className="detail-row">{selectedFood.rowLabel}</p>
              <h3>{selectedFood.name}</h3>
              <p>{selectedFood.description}</p>
            </div>
          </article>
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
