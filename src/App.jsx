import { useMemo, useState } from 'react'
import './App.css'

const regionalGuides = [
  {
    id: 'seoul-gyeonggi',
    name: '서울·경기',
    tone: '담백하고 균형 잡힌 상차림',
    image: '/regions/seoul-gyeonggi.svg',
    imageAlt: '서울 경기 지역 차례상 대표 이미지',
    highlights: ['배, 사과 중심 과일', '소고기 산적/전', '맑은 탕류'],
    tableTips: [
      '과일은 홀수 개로 맞추고 색을 균형 있게 배치합니다.',
      '전류는 기름기를 충분히 제거해 깔끔하게 담습니다.',
      '탕은 지나치게 자극적이지 않게 간을 맞춥니다.',
    ],
    sampleMenu: ['소고기 산적', '동그랑땡', '대구탕', '배추김치', '약과'],
  },
  {
    id: 'gangwon',
    name: '강원',
    tone: '산나물과 어물을 함께 쓰는 상차림',
    image: '/regions/gangwon.svg',
    imageAlt: '강원 지역 차례상 대표 이미지',
    highlights: ['감자·메밀 활용', '명태/황태', '나물 비중 높음'],
    tableTips: [
      '나물은 들기름 향을 살리되 간은 약하게 맞춥니다.',
      '북어포·황태포는 결을 살려 정갈하게 올립니다.',
      '메밀전은 식기 전에 부드럽게 접어 담습니다.',
    ],
    sampleMenu: ['감자전', '메밀전병', '황태구이', '곤드레나물', '식혜'],
  },
  {
    id: 'chungcheong',
    name: '충청',
    tone: '간이 순하고 부드러운 상차림',
    image: '/regions/chungcheong.svg',
    imageAlt: '충청 지역 차례상 대표 이미지',
    highlights: ['담백한 국물', '절제된 양념', '깔끔한 전류'],
    tableTips: [
      '국물 요리는 맑게 끓여 재료 본연의 맛을 살립니다.',
      '한 접시에 너무 많이 담지 말고 여백을 둡니다.',
      '나물은 수분을 충분히 제거해 쉽게 상하지 않게 합니다.',
    ],
    sampleMenu: ['두부전', '무나물', '쇠고기무국', '조기구이', '유과'],
  },
  {
    id: 'jeolla',
    name: '전라',
    tone: '가짓수가 풍성한 상차림',
    image: '/regions/jeolla.svg',
    imageAlt: '전라 지역 차례상 대표 이미지',
    highlights: ['다양한 전과 나물', '젓갈/해산물 활용', '맛의 대비'],
    tableTips: [
      '가짓수가 많아도 같은 색끼리 겹치지 않게 배치합니다.',
      '짠 반찬은 소량으로 담아 전체 간의 균형을 맞춥니다.',
      '전류는 크기를 비슷하게 맞춰 보기 좋게 정렬합니다.',
    ],
    sampleMenu: ['홍어전', '표고전', '고사리나물', '병어찜', '약식'],
  },
  {
    id: 'gyeongsang',
    name: '경상',
    tone: '해산물 비중이 높은 상차림',
    image: '/regions/gyeongsang.svg',
    imageAlt: '경상 지역 차례상 대표 이미지',
    highlights: ['문어·가자미', '맑은 탕과 구이', '실용적 구성'],
    tableTips: [
      '문어는 얇고 일정하게 썰어 먹기 편하게 둡니다.',
      '생선구이는 머리 방향을 한쪽으로 통일합니다.',
      '탕은 국물보다 건더기 중심으로 올려 제수성을 높입니다.',
    ],
    sampleMenu: ['문어숙회', '가자미구이', '소고기탕국', '시금치나물', '곶감'],
  },
  {
    id: 'jeju',
    name: '제주',
    tone: '지역 식재료 중심의 소박한 상차림',
    image: '/regions/jeju.svg',
    imageAlt: '제주 지역 차례상 대표 이미지',
    highlights: ['옥돔/갈치', '톳·해초', '재료 중심 조리'],
    tableTips: [
      '옥돔은 바삭하게 구워 수분이 생기지 않게 담습니다.',
      '해초류는 물기를 제거해 다른 음식에 번지지 않게 둡니다.',
      '간은 단순하게 하고 재료 맛을 살리는 조리를 우선합니다.',
    ],
    sampleMenu: ['옥돔구이', '갈치조림', '톳무침', '몸국', '한과'],
  },
]

const commonRules = [
  { label: '1열', text: '과일·한과·약과 등 후식류' },
  { label: '2열', text: '나물·김치·식혜 등 부찬' },
  { label: '3열', text: '탕·찌개·국물 요리' },
  { label: '4열', text: '적·전·구이 등 메인 요리' },
  { label: '5열', text: '밥·국·수저 등 기본 식기' },
]

function App() {
  const [selectedRegionId, setSelectedRegionId] = useState(regionalGuides[0].id)

  const selectedRegion = useMemo(
    () => regionalGuides.find((region) => region.id === selectedRegionId),
    [selectedRegionId],
  )

  return (
    <main className="charye-page">
      <header className="hero">
        <p className="eyebrow">명절 준비 가이드</p>
        <h1>지역별 차례상 차리는 방법</h1>
        <p className="subtitle">
          기본 배치 원칙은 유지하고, 지역 식문화에 맞춰 대표 음식을 더하면 더 자연스러운 차례상을 준비할 수 있습니다.
        </p>
      </header>

      <section className="region-section" aria-label="지역 선택">
        <h2>지역 선택</h2>
        <div className="region-tabs" role="tablist" aria-label="차례상 지역별 가이드">
          {regionalGuides.map((region) => (
            <button
              key={region.id}
              type="button"
              role="tab"
              className={`region-tab ${region.id === selectedRegionId ? 'active' : ''}`}
              onClick={() => setSelectedRegionId(region.id)}
              aria-selected={region.id === selectedRegionId}
            >
              {region.name}
            </button>
          ))}
        </div>
      </section>

      <section className="content-grid">
        <article className="panel">
          <h3>차례상 기본 배치</h3>
          <ul>
            {commonRules.map((rule) => (
              <li key={rule.label}>
                <strong>{rule.label}</strong> {rule.text}
              </li>
            ))}
          </ul>
        </article>

        {selectedRegion && (
          <article className="panel emphasis" role="tabpanel" aria-label={`${selectedRegion.name} 가이드`}>
            <h3>{selectedRegion.name} 스타일</h3>
            <p className="region-tone">{selectedRegion.tone}</p>

            <figure className="region-figure">
              <img src={selectedRegion.image} alt={selectedRegion.imageAlt} loading="lazy" />
              <figcaption>{selectedRegion.name} 대표 상차림 이미지</figcaption>
            </figure>

            <h4>대표 포인트</h4>
            <ul>
              {selectedRegion.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h4>상차림 팁</h4>
            <ul>
              {selectedRegion.tableTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>

            <h4>추천 메뉴 예시</h4>
            <div className="menu-chips">
              {selectedRegion.sampleMenu.map((menu) => (
                <span key={menu} className="chip">
                  {menu}
                </span>
              ))}
            </div>
          </article>
        )}
      </section>

      <footer className="notice">
        지역과 가문마다 차례 방식이 다를 수 있으니, 최종 구성은 집안 전통을 우선해 조정하세요.
      </footer>
    </main>
  )
}

export default App
