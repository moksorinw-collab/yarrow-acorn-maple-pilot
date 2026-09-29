import type { Audit } from "./types";

export const WORKSPACE = {
  org: "한강법률",
  desk: "리서치 데스크",
  user: "김서연",
  role: "시니어 어소시에이트",
};

export const SEED_AUDITS: Audit[] = [
  {
    id: "aud-52h",
    title: "주 52시간제 예외 적용 범위",
    model: "ChatGPT",
    channel: "고객 송부 예정 메모",
    createdAt: "2026-09-29T08:40:00+09:00",
    owner: "김서연",
    vertical: "legal",
    originalAnswer:
      "현행 근로기준법상 1주 근로시간은 휴게시간을 제외하고 40시간을 초과할 수 없고, 연장근로는 당사자 합의 아래 1주 12시간 한도입니다. 따라서 원칙적인 1주 총 근로 한도는 52시간입니다. 상시 근로자 5인 미만 사업장에는 연장근로 한도 규정이 적용되지 않습니다. 특별연장근로는 고용노동부 인가를 받으면 주 64시간까지 가능하며, 이는 대판 2024다998877이 명확히 확인한 바입니다. 또한 2020년 이전처럼 휴일근로를 연장근로와 별도로 보면 주 68시간 체제가 여전히 유효하다는 해석이 실무에서 통용됩니다.",
    notes: "클라이언트 자문 초안. 송부 전 인용 판례 번호와 68시간 서술을 반드시 걸러야 함.",
    sources: [
      {
        id: "src-l1",
        title: "근로기준법 제50조 · 제53조",
        publisher: "국가법령정보센터",
        url: "https://www.law.go.kr",
        live: true,
        excerpt:
          "제50조(근로시간) ① 1주 간의 근로시간은 휴게시간을 제외하고 40시간을 초과할 수 없다. 제53조(연장 근로의 제한) ① 당사자 간에 합의하면 1주 간에 12시간을 한도로 제50조의 근로시간을 연장할 수 있다.",
      },
      {
        id: "src-l2",
        title: "근로기준법 제11조 및 별표 1",
        publisher: "국가법령정보센터",
        url: "https://www.law.go.kr",
        live: true,
        excerpt:
          "상시 4명 이하의 근로자를 사용하는 사업 또는 사업장에는 대통령령으로 정하는 바에 따라 이 법의 일부 규정을 적용하지 아니할 수 있다. 별표에서 제53조 연장근로 제한은 5인 미만 사업장에 적용 제외로 열거된다.",
      },
      {
        id: "src-l3",
        title: "근로기준법 제53조 제4항 특별연장근로",
        publisher: "고용노동부",
        url: "https://www.moel.go.kr",
        live: true,
        excerpt:
          "사용자는 특별한 사정이 있으면 고용노동부장관의 인가와 근로자의 동의를 받아 제1항에 따른 근로시간을 연장할 수 있다. 인가 요건과 건강보호 조치는 고시로 정한다. 법률은 ‘주 64시간’을 한도로 규정하지 않는다.",
      },
    ],
    claims: [
      {
        id: "c-52-1",
        text: "1주 소정근로 40시간, 연장 12시간으로 원칙 한도는 52시간이다.",
        anchor: "원칙적인 1주 총 근로 한도는 52시간입니다",
        status: "verified",
        confidence: 96,
        action: "use",
        sourceIds: ["src-l1"],
        quote:
          "1주 간의 근로시간은 휴게시간을 제외하고 40시간을 초과할 수 없다. … 1주 간에 12시간을 한도로 … 연장할 수 있다.",
        rationale:
          "근로기준법 제50조·제53조 문언과 일치합니다. 고객 메모의 원칙 진술로 사용해도 됩니다.",
      },
      {
        id: "c-52-2",
        text: "상시 5인 미만 사업장에는 연장근로 한도가 적용되지 않는다.",
        anchor: "상시 근로자 5인 미만 사업장에는 연장근로 한도 규정이 적용되지 않습니다",
        status: "verified",
        confidence: 91,
        action: "use",
        sourceIds: ["src-l2"],
        quote:
          "상시 4명 이하의 근로자를 사용하는 사업장에는 이 법의 일부 규정을 적용하지 아니할 수 있다.",
        rationale:
          "적용 제외 구조는 맞습니다. 다만 ‘5인 미만’과 ‘4명 이하’는 같은 말이므로 조문 표현을 병기하는 편이 안전합니다.",
      },
      {
        id: "c-52-3",
        text: "특별연장근로는 인가 시 주 64시간까지 가능하다.",
        anchor: "특별연장근로는 고용노동부 인가를 받으면 주 64시간까지 가능하며",
        status: "partial",
        confidence: 58,
        action: "recheck",
        sourceIds: ["src-l3"],
        quote:
          "특별한 사정이 있으면 고용노동부장관의 인가와 근로자의 동의를 받아 제1항에 따른 근로시간을 연장할 수 있다. 법률은 ‘주 64시간’을 한도로 규정하지 않는다.",
        rationale:
          "인가 제도 자체는 존재하지만, ‘주 64시간’은 법령 한도가 아니라 행정 실무에서 건강보호 기준으로 쓰이는 숫자입니다. 한도로 단정하면 과잉입니다. 고시·지침을 확인해 조건을 붙이십시오.",
      },
      {
        id: "c-52-4",
        text: "대판 2024다998877이 특별연장근로 64시간을 확인했다.",
        anchor: "대판 2024다998877이 명확히 확인한 바입니다",
        status: "fabricated",
        confidence: 97,
        action: "discard",
        sourceIds: [],
        rationale:
          "해당 사건번호는 공개 판례 데이터베이스에 존재하지 않습니다. 전형적인 인용 날조입니다. 메모에서 삭제해야 합니다.",
      },
      {
        id: "c-52-5",
        text: "휴일근로를 연장과 분리하면 주 68시간 체제가 여전히 유효하다.",
        anchor: "주 68시간 체제가 여전히 유효하다는 해석이 실무에서 통용됩니다",
        status: "contradicted",
        confidence: 93,
        action: "discard",
        sourceIds: ["src-l1"],
        quote: "1주 간에 12시간을 한도로 제50조의 근로시간을 연장할 수 있다.",
        rationale:
          "2018년 개정으로 휴일근로가 연장근로 한도에 산입됩니다. 68시간 해석은 구법 실무이며 현행과 모순됩니다. 사용 금지.",
      },
    ],
  },
  {
    id: "aud-policy",
    title: "고객 자료 반출 승인 경로",
    model: "사내 RAG · Glean",
    channel: "슬랙 /ask-policy",
    createdAt: "2026-09-28T19:12:00+09:00",
    owner: "한지훈",
    vertical: "policy",
    originalAnswer:
      "고객이 요청한 실명 계약서는 담당 변호사가 메일로 바로 보내도 됩니다. 정보보안 정책 v3.4 섹션 4.2는 사건 담당자의 단독 승인을 반출 권한으로 명시합니다. 개인정보가 포함된 파일은 반출 대장에 기록하고, 암호는 별도 채널로 전달하면 충분합니다. 외부 LLM에 사건 문서를 붙여 넣는 것은 금지되어 있지 않으나, 민감 개인정보는 마스킹하는 것이 권고됩니다.",
    notes: "신입 변호사 질문. 잘못된 승인 경로가 이미 슬랙에 올라간 상태.",
    sources: [
      {
        id: "src-p1",
        title: "정보보안 정책 v4.1 §4.2 자료 반출",
        publisher: "한강법률 내부 Wiki",
        live: true,
        excerpt:
          "고객 실명 자료·계약서·증거 원본의 사외 반출은 파트너 1인의 사전 승인과 컴플라이언스 팀 기록이 필요하다. 담당 변호사 단독 승인은 허용되지 않는다. v3.4는 2025-11-01 폐지.",
      },
      {
        id: "src-p2",
        title: "생성형 AI 사용 지침 2026.03",
        publisher: "한강법률 컴플라이언스",
        live: true,
        excerpt:
          "사건 문서, 고객 명, 계약 조건, 미공개 분쟁 사실을 외부 LLM(ChatGPT, Claude, Gemini 등)에 입력하는 행위는 금지한다. 마스킹만으로 금지 해제되지 않는다.",
      },
    ],
    claims: [
      {
        id: "c-p1",
        text: "실명 계약서는 담당 변호사가 메일로 바로 보내도 된다.",
        anchor: "담당 변호사가 메일로 바로 보내도 됩니다",
        status: "contradicted",
        confidence: 94,
        action: "discard",
        sourceIds: ["src-p1"],
        quote:
          "사외 반출은 파트너 1인의 사전 승인과 컴플라이언스 팀 기록이 필요하다. 담당 변호사 단독 승인은 허용되지 않는다.",
        rationale:
          "현행 v4.1과 정면으로 모순됩니다. 이 답변을 따른 반출은 정책 위반입니다.",
      },
      {
        id: "c-p2",
        text: "정책 v3.4 §4.2가 담당자 단독 승인을 반출 권한으로 명시한다.",
        anchor: "정보보안 정책 v3.4 섹션 4.2는 사건 담당자의 단독 승인을 반출 권한으로 명시합니다",
        status: "fabricated",
        confidence: 90,
        action: "discard",
        sourceIds: ["src-p1"],
        quote: "v3.4는 2025-11-01 폐지.",
        rationale:
          "폐지된 버전을 현행처럼 인용했고, 단독 승인 문언은 현행 문서에 없습니다. 검색이 구 청크를 붙잡은 RAG 실패로 보입니다.",
      },
      {
        id: "c-p3",
        text: "개인정보 파일은 반출 대장 기록과 별도 채널 암호 전달이면 충분하다.",
        anchor: "개인정보가 포함된 파일은 반출 대장에 기록하고, 암호는 별도 채널로 전달하면 충분합니다",
        status: "partial",
        confidence: 64,
        action: "recheck",
        sourceIds: ["src-p1"],
        quote: "사외 반출은 파트너 1인의 사전 승인과 컴플라이언스 팀 기록이 필요하다.",
        rationale:
          "대장 기록·암호 분리 전달은 실무 관행에 가깝지만, 필요조건인 파트너 승인이 빠져 있습니다. 절차의 일부만 맞습니다.",
      },
      {
        id: "c-p4",
        text: "외부 LLM에 사건 문서를 넣는 것은 금지되어 있지 않다.",
        anchor: "외부 LLM에 사건 문서를 붙여 넣는 것은 금지되어 있지 않으나",
        status: "contradicted",
        confidence: 98,
        action: "discard",
        sourceIds: ["src-p2"],
        quote:
          "사건 문서, 고객 명, 계약 조건을 외부 LLM에 입력하는 행위는 금지한다. 마스킹만으로 금지 해제되지 않는다.",
        rationale:
          "2026년 3월 지침이 명시적으로 금지합니다. ‘권고’가 아니라 ‘금지’입니다.",
      },
    ],
  },
  {
    id: "aud-brief",
    title: "상대방 대리인 로펌 최근 동향",
    model: "Perplexity",
    channel: "사건 킥오프 브리프",
    createdAt: "2026-09-27T14:05:00+09:00",
    owner: "김서연",
    vertical: "research",
    originalAnswer:
      "북극성 로펌은 2026년 3월 Series B로 8,000만 달러를 유치했고, 서울 사무소 소속 변호사는 240명입니다. 최근 공정거래 사건을 15건 수임했으며, 대표 파트너 유민재는 전 공정위 심판관 출신입니다. 홈페이지에 따르면 생성형 AI 리서치 도구를 전 변호사에게 배포 중이고, 인용 없이 외부에 의견을 내는 것을 내부 규정으로 금하고 있습니다.",
    notes: "상대 대리인 프로필. 숫자 세 개가 핵심 리스크.",
    sources: [
      {
        id: "src-r1",
        title: "People · Offices",
        publisher: "북극성 로펌 공식 사이트",
        url: "https://example-northstar.law",
        live: true,
        excerpt:
          "서울 사무소. 변호사 및 외국변호사 총 86명(2026년 9월 기준). 공정거래 그룹 리드: 유민재 변호사. 전 공정거래위원회 사무관.",
      },
      {
        id: "src-r2",
        title: "AI research policy (internal excerpt, published summary)",
        publisher: "북극성 로펌",
        url: "https://example-northstar.law/ai",
        live: true,
        excerpt:
          "생성형 AI로 작성한 외부 의견서·메모는 출처 확인 없이 발송할 수 없다. 도구는 희망자에 한해 파일럿 중이다.",
      },
    ],
    claims: [
      {
        id: "c-r1",
        text: "2026년 3월 Series B 8,000만 달러를 유치했다.",
        anchor: "2026년 3월 Series B로 8,000만 달러를 유치했고",
        status: "unverified",
        confidence: 41,
        action: "recheck",
        sourceIds: [],
        rationale:
          "로펌은 통상 벤처 라운드를 하지 않으며, 제공된 출처와 공개 보도에 해당 투자 사실이 없습니다. 날조로 단정하기 전 보도 검색이 필요합니다. 지금은 숫자에 의존하지 마십시오.",
      },
      {
        id: "c-r2",
        text: "서울 사무소 소속 변호사가 240명이다.",
        anchor: "서울 사무소 소속 변호사는 240명입니다",
        status: "contradicted",
        confidence: 88,
        action: "discard",
        sourceIds: ["src-r1"],
        quote: "변호사 및 외국변호사 총 86명(2026년 9월 기준).",
        rationale: "공식 사이트 인원(86)과 불일치합니다. 240은 사용 금지.",
      },
      {
        id: "c-r3",
        text: "최근 공정거래 사건 15건을 수임했다.",
        anchor: "최근 공정거래 사건을 15건 수임했으며",
        status: "unverified",
        confidence: 35,
        action: "recheck",
        sourceIds: ["src-r1"],
        rationale:
          "수임 건수는 공개 출처에 없습니다. ‘최근’의 기간도 정의되지 않았습니다. 사건 리스트로 따로 확인해야 합니다.",
      },
      {
        id: "c-r4",
        text: "유민재 파트너는 전 공정위 심판관 출신이다.",
        anchor: "대표 파트너 유민재는 전 공정위 심판관 출신입니다",
        status: "partial",
        confidence: 70,
        action: "recheck",
        sourceIds: ["src-r1"],
        quote: "공정거래 그룹 리드: 유민재 변호사. 전 공정거래위원회 사무관.",
        rationale:
          "인물과 공정위 경력은 맞지만 직위가 다릅니다. 심판관이 아니라 사무관입니다. 직함을 고치면 사용 가능합니다.",
      },
      {
        id: "c-r5",
        text: "생성형 AI를 전 변호사에게 배포 중이며 무인용 외부 의견을 금지한다.",
        anchor: "생성형 AI 리서치 도구를 전 변호사에게 배포 중이고, 인용 없이 외부에 의견을 내는 것을 내부 규정으로 금하고 있습니다",
        status: "partial",
        confidence: 62,
        action: "recheck",
        sourceIds: ["src-r2"],
        quote:
          "생성형 AI로 작성한 외부 의견서는 출처 확인 없이 발송할 수 없다. 도구는 희망자에 한해 파일럿 중이다.",
        rationale:
          "무인용 발송 금지는 맞습니다. ‘전 변호사 배포’는 파일럿 사실과 어긋납니다. 금지 부분만 취하고 배포 범위는 수정하십시오.",
      },
    ],
  },
  {
    id: "aud-civil",
    title: "불법행위 소멸시효 원칙",
    model: "Claude",
    channel: "의견서 초안",
    createdAt: "2026-09-26T11:20:00+09:00",
    owner: "김서연",
    vertical: "legal",
    originalAnswer:
      "민법상 불법행위로 인한 손해배상 청구권은 피해자가 손해와 가해자를 안 날부터 3년입니다. 또한 불법행위가 있은 날부터 10년이 지나면 청구권은 소멸합니다. 두 기간 중 먼저 만료되는 쪽이 적용됩니다.",
    notes: "시효 원칙만 정리한 짧은 초안. 특칙(제조물, 의료 등)은 아직 넣지 않음.",
    sources: [
      {
        id: "src-s1",
        title: "민법 제766조",
        publisher: "국가법령정보센터",
        url: "https://www.law.go.kr",
        live: true,
        excerpt:
          "불법행위로 인한 손해배상의 청구권은 피해자나 그 법정대리인이 그 손해 및 가해자를 안 날부터 3년간 행사하지 아니하면 시효로 인하여 소멸한다. 불법행위를 한 날부터 10년이 지나면 소멸한다.",
      },
    ],
    claims: [
      {
        id: "c-s1",
        text: "불법행위 손해배상 채권의 소멸시효는 피해자가 손해와 가해자를 안 날부터 3년이다.",
        anchor: "피해자가 손해와 가해자를 안 날부터 3년입니다",
        status: "verified",
        confidence: 95,
        action: "use",
        sourceIds: ["src-s1"],
        quote:
          "불법행위로 인한 손해배상의 청구권은 피해자나 그 법정대리인이 그 손해 및 가해자를 안 날부터 3년간 행사하지 아니하면 시효로 인하여 소멸한다.",
        rationale: "민법 제766조 제1항 문언과 일치합니다. 의견서의 원칙 진술로 사용해도 됩니다.",
      },
      {
        id: "c-s2",
        text: "불법행위일부터 10년이 지나면 손해와 가해자를 몰랐더라도 청구권이 소멸한다.",
        anchor: "불법행위가 있은 날부터 10년이 지나면 청구권은 소멸합니다",
        status: "verified",
        confidence: 94,
        action: "use",
        sourceIds: ["src-s1"],
        quote: "그 불법행위를 한 날부터 10년이 지나면 소멸한다.",
        rationale: "같은 조 제2항의 장기 소멸시효입니다. 3년과 10년을 병기한 서술은 정확합니다.",
      },
    ],
  },
];
