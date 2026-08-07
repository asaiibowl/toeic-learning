/**
 * テストセット03（上級・TOEIC 860点以上帯）— Part 5（短文穴埋め）シード
 * No.101〜130 の30問。すべてオリジナル問題。
 * 公式問題・市販問題集の文の転載はしない。
 *
 * タグ内訳: vocab×15 / grammar×5 / verb_form×4 / preposition×3 / conjunction×2 / pronoun×1
 */

import { p5q, type Options4 } from './helpers';
import type { Part5Question } from '../../src/schemas/question.schema';

export const part5Questions: Part5Question[] = [
  // No.101 — 語彙（動詞のコロケーション）/ vocab
  p5q(
    101,
    'The underwriters asked the brokerage firm to ______ the policyholder\'s claim before approving any settlement.',
    '保険引受人は、示談を承認する前に保険契約者の請求内容を精査するよう仲介会社に求めました。',
    [
      ['scrutinize', '動詞「精査する・細かく調べる」。scrutinize a claim で「請求内容を詳細に検討する」という自然なコロケーションになります。'],
      ['originate', '動詞「起源を持つ・生み出す」。請求内容を審査する文脈では意味が合いません。'],
      ['consolidate', '動詞「統合する・強化する」。複数のものをまとめる場面で使い、単一の請求書を審査する文脈に合いません。'],
      ['discharge', '動詞「放出する・解放する・履行する」。義務の履行などを表し、請求を精査するという意味にはなりません。'],
    ] as Options4,
    0,
    '保険実務の文脈で、「請求内容を精査する」という意味を持つ動詞のコロケーションを問います。4択はすべて上級ビジネス語彙ですが、claim を目的語に取って「審査・検討」を表せるのは1語に限られます。',
    'vocab',
  ),

  // No.102 — 文法（関係詞節の構造）/ grammar
  p5q(
    102,
    'The intellectual property attorney ______ had drafted the merger agreement will attend the arbitration hearing.',
    '合併契約書を起草した知的財産弁護士が仲裁審問に出席する予定です。',
    [
      ['who', '関係代名詞。先行詞 attorney（人）を受け、後続節の主語として機能します。who had drafted the merger agreement という完全な構造が成立します。'],
      ['whom', '目的格の関係代名詞。後続節に主語が必要ですが、whom の後に主語が欠けた節を置く構造（例: whom the firm had hired）でなければならず、ここでは主語の役割が求められているため合いません。'],
      ['which', '関係代名詞。先行詞が物や事柄の場合に使い、人を指す attorney には使えません。'],
      ['whose', '所有格の関係代名詞。whose の後には名詞が必要ですが（例: whose expertise），ここでは動詞 had drafted が直後に続くため構造的に合いません。'],
    ] as Options4,
    0,
    '先行詞が人（attorney）であり、関係節内で主語の役割を果たす関係代名詞を選ぶ問題です。格（主格・目的格・所有格）と先行詞の種類（人か物か）を同時に判断します。',
    'grammar',
  ),

  // No.103 — 語彙（名詞のコロケーション）/ vocab
  p5q(
    103,
    'The architecture firm submitted a detailed ______ outlining the proposed layout for the municipal library renovation.',
    '建築設計事務所は、市立図書館改修の提案レイアウトを概説した詳細な図面を提出しました。',
    [
      ['blueprint', '名詞「設計図・青写真」。a detailed blueprint for a renovation で「改修のための詳細な設計図」という自然な表現になります。'],
      ['annotation', '名詞「注釈・注記」。文書への補足説明を指し、レイアウトを概説する設計図とは異なります。'],
      ['referendum', '名詞「国民投票」。建築・設計の文脈に合いません。'],
      ['compendium', '名詞「要覧・要約書」。情報をまとめた資料を指しますが、レイアウト図面を表す語としては不自然です。'],
    ] as Options4,
    0,
    '建築設計の文脈で、詳細な提案文書の種類を表す名詞のコロケーションを問います。後続する outlining 以下の内容が、図面・計画書を示すヒントになっています。',
    'vocab',
  ),

  // No.104 — 動詞の形（仮定法過去完了）/ verb_form
  p5q(
    104,
    'Had the shipping company ______ the freight invoice earlier, the goods would have cleared customs without delay.',
    '運送会社がもっと早く貨物請求書を提出していれば、商品は遅延なく通関できていたでしょう。',
    [
      ['submitted', '過去分詞。Had + 主語 + 過去分詞の倒置形で仮定法過去完了の条件節を構成します。「もし提出していたならば」という反事実を正しく表します。'],
      ['submit', '動詞の原形。倒置した仮定法過去完了では助動詞 had の後に過去分詞が必要であり、原形は使えません。'],
      ['submits', '三人称単数現在形。時制が合わず、仮定法の構造にも合いません。'],
      ['submitting', '現在分詞。Had + 主語 + 現在分詞という形は英文法上存在しません。'],
    ] as Options4,
    0,
    '文頭の Had が示す倒置構文（If を省略した仮定法過去完了）を識別し、条件節に入る動詞の形を選ぶ問題です。主節の would have cleared が仮定法過去完了であることも手がかりになります。',
    'verb_form',
  ),

  // No.105 — 語彙（形容詞のコロケーション）/ vocab
  p5q(
    105,
    'The environmental auditor found the company\'s carbon offset records to be independently ______ against source documents and consistent with international reporting standards.',
    '環境監査人は、同社の炭素オフセット記録が原資料と照合して独立に検証可能であり、国際的な報告基準にも適合していると判断しました。',
    [
      ['verifiable', '形容詞「検証可能な」。verifiable against source documents で、記録を原資料と照合して確認できることを正確に表します。'],
      ['provisional', '形容詞「暫定的な」。最終決定前の一時的な状態を示し、監査で正常と判断される記録の性質とは逆の意味合いになります。'],
      ['redundant', '形容詞「冗長な・余剰の」。記録が重複・過剰であるという否定的な意味を持ち、文脈に合いません。'],
      ['plausible', '形容詞「もっともらしい」。plausible against source documents とは言わず、原資料との照合可能性を表せません。'],
    ] as Options4,
    0,
    '環境認証・監査の文脈で、記録の質を表す形容詞を選ぶ問題です。against source documents と結びついて「原資料との照合によって検証できる」という意味になる語を判断します。',
    'vocab',
  ),

  // No.106 — 前置詞（複合前置詞・精密な意味）/ preposition
  p5q(
    106,
    'The board approved the restructuring plan ______ strong objections from several major shareholders.',
    '取締役会は主要株主数名からの強い反対があったにもかかわらず、再編計画を承認しました。',
    [
      ['notwithstanding', '前置詞「〜にもかかわらず」。名詞句の直前に置かれて「〜があるにもかかわらず」を表し、逆接の文意に合います。'],
      ['pending', '前置詞「〜を待つ間・〜が決まるまで」。何かが決定されるまでの保留を示し、逆接の意味はありません。'],
      ['barring', '前置詞「〜がない限り・〜を除いて」。例外的な障害を除外する意味で、ここでは実際に反対があった事実と合いません。'],
      ['pursuant to', '複合前置詞「〜に従って・〜に基づいて」。規則や指示に従うことを示し、反対意見への逆接とは逆方向の意味です。'],
    ] as Options4,
    0,
    '主節（計画承認）と名詞句（株主の反対）の論理関係が逆接であることを把握し、正確な意味の前置詞を選ぶ問題です。4択はすべて上級の複合前置詞・前置詞で、意味の精密さが問われます。',
    'preposition',
  ),

  // No.107 — 語彙（動詞のコロケーション）/ vocab
  p5q(
    107,
    'The academic journal editor asked all corresponding authors to ______ any potential conflicts of interest before peer review.',
    '学術誌の編集長は、査読前に潜在的な利益相反をすべて開示するよう責任著者全員に求めました。',
    [
      ['disclose', '動詞「開示する・公表する」。disclose conflicts of interest で「利益相反を開示する」という学術・法務の定型表現になります。'],
      ['dissolve', '動詞「溶かす・解散する・解消する」。組織や物質を解消する意味で、利益相反を「開示する」意味にはなりません。'],
      ['dispute', '動詞「異議を唱える・議論する」。相手の主張を否定する場合に使い、利益相反を報告する文脈に合いません。'],
      ['designate', '動詞「指定する・任命する」。役職や場所を指定する場面で使い、利益相反を開示する行為を表しません。'],
    ] as Options4,
    0,
    '学術出版・研究倫理の文脈で、conflicts of interest（利益相反）を目的語に取る動詞のコロケーションを問います。4択はいずれも d- で始まる上級語彙で、意味の精密な区別が必要です。',
    'vocab',
  ),

  // No.108 — 文法（倒置構文：否定副詞）/ grammar
  p5q(
    108,
    'Under no circumstances ______ personal data be transferred to third parties without explicit written consent.',
    '明示的な書面による同意なしに、いかなる状況においても個人データを第三者に転送してはなりません。',
    [
      ['should', '助動詞。否定副詞句 Under no circumstances が文頭に置かれると主語と助動詞が倒置します。should personal data be transferred という語順が正しい倒置形です。'],
      ['personal data should', '倒置していない語順。否定副詞句が文頭に来たときは必ず助動詞が主語の前に出る必要があり、この語順は非文法的です。'],
      ['that personal data', '接続詞 that を挿入した形。倒置構文の代わりに名詞節を作ろうとしていますが、Under no circumstances の後に that 節は続きません。'],
      ['does personal data', '助動詞 do を使った倒置。be 動詞・受動態の文では do 系の助動詞ではなく be / have / 法助動詞を倒置させます。'],
    ] as Options4,
    0,
    '否定副詞句（Under no circumstances）が文頭に来たときに起こる主語と助動詞の倒置を問います。データガバナンスの法文調の文体でよく見られる構文です。',
    'grammar',
  ),

  // No.109 — 語彙（名詞の意味区別）/ vocab
  p5q(
    109,
    'The medical device manufacturer was required to obtain regulatory ______ before launching the diagnostic equipment in overseas markets.',
    '医療機器メーカーは、診断機器を海外市場で発売する前に規制当局の承認を取得する必要がありました。',
    [
      ['clearance', '名詞「（規制当局による）承認・認可」。regulatory clearance で「当局の認可」を意味する医療機器規制分野の専門用語です。'],
      ['clause', '名詞「条項・節（文法）」。契約や文書の特定の条文を指し、当局の承認という意味にはなりません。'],
      ['clout', '名詞「影響力・発言力」。非公式な社会的・政治的影響力を指す語で、規制プロセスを表しません。'],
      ['cluster', '名詞「集まり・群れ」。物や人の集団を表し、承認・認可の文脈に合いません。'],
    ] as Options4,
    0,
    '医療機器規制の文脈で、規制当局からの認可を表す名詞を選ぶ問題です。4択はいずれも cl- で始まる語ですが、regulatory と自然に結びつくのは専門用語1語だけです。',
    'vocab',
  ),

  // No.110 — 接続詞（意味の精密な区別）/ conjunction
  p5q(
    110,
    'The data governance committee will finalize the new retention policy ______ all regional compliance officers have submitted their feedback.',
    'データガバナンス委員会は、全地域のコンプライアンス責任者がフィードバックを提出し次第、新しいデータ保持ポリシーを確定します。',
    [
      ['as soon as', '接続詞「〜し次第・〜したらすぐに」。フィードバック提出という条件が満たされた直後にポリシーを確定するという時間的な即時性を正確に表します。'],
      ['in the event that', '接続詞句「〜の場合には（万一〜ならば）」。不確実または想定外の事態を条件とする際に使い、確実に起こる手続きを表す文脈には過剰な不確実性を含意します。'],
      ['even though', '接続詞「〜であるにもかかわらず」。逆接を表し、フィードバック提出後にポリシーを確定するという因果関係と逆の意味になります。'],
      ['inasmuch as', '接続詞「〜であるがゆえに・〜という点では」。理由や限定を示す接続詞で、時間的な順序を表すには使えません。'],
    ] as Options4,
    0,
    '主節（ポリシー確定）と従節（フィードバック提出）の時間的な前後関係と即時性を把握し、正確な意味の接続詞を選ぶ問題です。4択はすべて上位語彙・句であり、微妙なニュアンスの差異が問われます。',
    'conjunction',
  ),

  // No.111 — 語彙（形容詞のコロケーション）/ vocab
  p5q(
    111,
    'The harbor authority issued ______ guidelines for the handling of hazardous cargo aboard container ships.',
    '港湾当局は、コンテナ船上での危険貨物の取り扱いに関する拘束力のあるガイドラインを発行しました。',
    [
      ['binding', '形容詞「法的拘束力のある」。binding guidelines で「遵守義務のある指針」を意味し、当局が発行する規制文書を正確に表します。'],
      ['lenient', '形容詞「寛大な・厳しくない」。hazardous cargo の取り扱い基準として寛大なガイドラインを当局が発行するのは文脈的に不自然です。'],
      ['tentative', '形容詞「暫定的な・仮の」。まだ確定していないことを示し、当局が正式に発行した文書の性質として合いません。'],
      ['cursory', '形容詞「ざっと行う・粗略な」。ガイドラインの内容が大まかで不十分であるという意味になり、安全規制の文脈に合いません。'],
    ] as Options4,
    0,
    '港湾物流・安全規制の文脈で、当局が発行するガイドラインの法的性質を表す形容詞を選ぶ問題です。4択の形容詞はいずれも上級語彙ですが、文脈から正当な意味のものを1つ特定します。',
    'vocab',
  ),

  // No.112 — 動詞の形（完了不定詞と単純不定詞の区別）/ verb_form
  p5q(
    112,
    'According to the public registry, the infrastructure consortium appears ______ all necessary permits for the coastal bridge project by last Friday, well ahead of schedule.',
    '公開登録簿によると、インフラ事業団は海岸橋梁プロジェクトに必要な許可証をすべて先週金曜日までに取得しており、予定を大幅に前倒ししたようです。',
    [
      ['to have secured', '完了不定詞。appears to have secured は、先週金曜日までに完了した許可取得を現在の時点から推量する表現で、by last Friday と整合します。'],
      ['to secure', '単純不定詞。主節と同時または未来の出来事を表すため、過去の期限を示す by last Friday と時制が合いません。'],
      ['securing', '現在分詞。appears securing という形は英文法上使えません。'],
      ['having secured', '独立した完了分詞。主語なしの分詞句として文頭や副詞的に使いますが、appears の補語位置には不定詞形が必要です。'],
    ] as Options4,
    0,
    '知覚・判断動詞 appear の後に来る不定詞の時制を問います。単純不定詞（to V）は主節と同時か未来、完了不定詞（to have Vpp）は主節より前の出来事を表す違いが焦点です。',
    'verb_form',
  ),

  // No.113 — 語彙（動詞のコロケーション）/ vocab
  p5q(
    113,
    'The talent development director urged senior managers to ______ mentoring relationships with high-potential employees across all departments.',
    '人材開発ディレクターは、全部門の将来有望な社員とのメンタリング関係を育むよう上級管理職に強く勧めました。',
    [
      ['foster', '動詞「育てる・促進する」。foster mentoring relationships で「メンタリング関係を育む・構築する」という自然な表現になります。'],
      ['procure', '動詞「調達する・入手する」。物資やサービスを調達する場面で使い、人間関係を育む文脈には合いません。'],
      ['arbitrate', '動詞「仲裁する」。争いを解決する場面で使い、メンタリング関係を構築する文脈に合いません。'],
      ['litigate', '動詞「訴訟を起こす・法廷で争う」。法律用語で、人材開発の文脈に合いません。'],
    ] as Options4,
    0,
    '人材開発・組織学習の文脈で、「関係を育てる・構築する」という意味を持つ動詞を選ぶ問題です。mentoring relationships を目的語に自然に取れる動詞を判断します。',
    'vocab',
  ),

  // No.114 — 前置詞（意味の精密さ）/ preposition
  p5q(
    114,
    'The patent application was filed ______ the inventor\'s behalf by the firm\'s in-house legal counsel.',
    '特許出願は、法務・知財部門の社内弁護士によって発明者の代理として提出されました。',
    [
      ['on', '前置詞。on behalf of で「〜の代わりに・〜の代理として」を表す定型句になります。on the inventor\'s behalf で「発明者の代理として」が正しい表現です。'],
      ['at', '前置詞。at someone\'s behalf という表現は英語には存在しません。'],
      ['for', '前置詞。for の場合は for someone\'s behalf とは言わず、for someone（直接）が通常の表現です。'],
      ['by', '前置詞。by は行為者（代理人）を示す受動態で使い、by the inventor\'s behalf という表現は成立しません。'],
    ] as Options4,
    0,
    '法務・知財の文脈で頻出する on behalf of という定型表現を問います。空所の直後の behalf という名詞に結びつく前置詞を正確に選びます。',
    'preposition',
  ),

  // No.115 — 語彙（名詞のコロケーション）/ vocab
  p5q(
    115,
    'The urban planning committee conducted a thorough ______ of the proposed transit corridor before approving the funding allocation.',
    '都市計画委員会は、資金配分を承認する前に提案された交通回廊の徹底的な実現可能性調査を実施しました。',
    [
      ['feasibility study', '複合名詞「実現可能性調査」。conducted a feasibility study of a proposed project で「提案プロジェクトの実現可能性を調査した」という都市インフラの定型表現です。'],
      ['litigation review', '複合名詞「訴訟レビュー」。法的紛争を検討するプロセスを指し、交通回廊の計画評価とは異なります。'],
      ['equity offering', '複合名詞「株式公開・株式発行」。金融市場の用語で、インフラ計画の評価を表しません。'],
      ['overhead audit', '複合名詞「間接費監査」。経費の内部調査を指し、交通インフラ計画の可否を評価する文脈に合いません。'],
    ] as Options4,
    0,
    '都市インフラ計画の文脈で、プロジェクトの可否を評価する調査の種類を表す名詞句を選ぶ問題です。4択はすべて複合名詞ですが、conduct と自然に結びつくインフラ計画用語を特定します。',
    'vocab',
  ),

  // No.116 — 文法（複合関係詞）/ grammar
  p5q(
    116,
    '______ presents the most comprehensive proposal will be awarded the contract for the new waterfront development project.',
    '最も包括的な提案を提出した者が、新しいウォーターフロント開発プロジェクトの契約を取得します。',
    [
      ['Whoever', '複合関係詞「〜する人は誰でも」。Whoever presents ... will be awarded という構造で、名詞節を主語として作ります。先行詞を含む関係詞の用法で、文法的に正しい構造です。'],
      ['Whomever', '複合関係詞の目的格。関係節内で主語が必要な場合（presents という述語動詞の主語）には目的格 whomever は使えません。'],
      ['Whichever', '複合関係詞「どちら/どれでも」。物や限られた選択肢を指す語で、不特定の提案者を表すこの文脈には適しません。'],
      ['Whatever', '複合関係詞「何でも」。物や事柄を指し、提案を行う主体（人）を表すには合いません。'],
    ] as Options4,
    0,
    '複合関係詞（Whoever / Whomever / Whichever / Whatever）の意味と格の使い分けを問います。主節の主語を担う名詞節を導き、かつ関係節内でも主語として機能できる形を選びます。',
    'grammar',
  ),

  // No.117 — 語彙（動詞のコロケーション）/ vocab
  p5q(
    117,
    'The insurance carrier agreed to ______ the claim only after the policyholder submitted additional documentation.',
    '保険会社は、保険契約者が追加書類を提出した後にのみ、請求を承認することに同意しました。',
    [
      ['indemnify', '動詞「補償する・免責にする」。indemnify a claim ではなく indemnify someone against loss というのが自然な用法で、ここでは文構造が合いません。'],
      ['honor', '動詞「（請求・約束などを）受け入れる・履行する」。honor a claim で「請求を受け入れる」という保険分野の定型コロケーションになります。'],
      ['invoke', '動詞「（権利・規則などを）援用する・発動する」。a law or a right を目的語に取り、claim を承認する意味には合いません。'],
      ['circumvent', '動詞「回避する・迂回する」。規則や障害を意図的に回避する意味で、請求を受け入れることとは逆の意味になります。'],
    ] as Options4,
    1,
    '保険分野で「請求を承認・履行する」という意味を持つ動詞のコロケーションを問います。4択はすべて上級語彙ですが、claim を目的語に「承認・受理」の意味を正確に表せる語を選びます。',
    'vocab',
  ),

  // No.118 — 動詞の形（分詞構文：受動と能動の区別）/ verb_form
  p5q(
    118,
    '______ by the findings of an independent audit, the executive team overhauled the company\'s data retention procedures.',
    '独立した監査の調査結果を受けて、経営陣は会社のデータ保持手続きを全面的に見直しました。',
    [
      ['Prompted', '過去分詞の分詞構文（受動）。「（調査結果に）促されて」という受動の意味になり、主語 executive team が調査結果によって動かされたという文意と合います。'],
      ['Prompting', '現在分詞の分詞構文（能動）。「（調査結果を）促しながら」という能動の意味になり、経営陣が何かを促す側になってしまい文意と逆になります。'],
      ['Having prompted', '完了分詞の能動形。経営陣が何かを促したという意味になり、調査結果によって動かされたという文意と逆です。'],
      ['To be prompted', 'to 不定詞の受動形。目的や意図を表し、「促されるために見直した」という不自然な解釈になります。'],
    ] as Options4,
    0,
    '分詞構文の能動・受動の選択を問います。主節の主語（executive team）が分詞の意味上の主語でもあり、その主語が「促された側」なのか「促した側」なのかを判断します。',
    'verb_form',
  ),

  // No.119 — 語彙（形容詞の意味区別）/ vocab
  p5q(
    119,
    'Participation in the advanced leadership program is ______ to managers who have completed at least two years of service.',
    '高度なリーダーシップ研修への参加は、勤続2年以上の管理職に限定されています。',
    [
      ['confined', '形容詞「限定された・閉じ込められた」。be confined to で「〜に限られる」という制限を表す表現が成立します。'],
      ['inclined', '形容詞「傾向がある」。be inclined to do で「〜する傾向がある」という意味になりますが、後続が名詞句のため構造的に合いません。'],
      ['disposed', '形容詞「傾向がある・配備された」。be disposed to do は「〜する気がある」を意味し、参加対象者を限定する文脈には合いません。'],
      ['affiliated', '形容詞「提携した・関連した」。be affiliated with で「〜と提携している」を意味し、参加制限を表す用法にはなりません。'],
    ] as Options4,
    0,
    '人材開発・研修プログラムの文脈で、参加対象を「限定する」という意味を表す形容詞を選ぶ問題です。4択はすべて be + 形容詞 + to の構文で使われますが、「制限・限定」の意味を持つのは1語です。',
    'vocab',
  ),

  // No.120 — 前置詞（文脈からの意味判断）/ preposition
  p5q(
    120,
    'The contractor must complete all structural inspections ______ accordance with the municipal building code.',
    '請負業者は市の建築基準法に従ってすべての構造検査を完了しなければなりません。',
    [
      ['in', '前置詞。in accordance with で「〜に従って・〜に基づいて」という定型句になります。法規制や手順への準拠を表す際に広く使われます。'],
      ['by', '前置詞。by は期限や手段を示し、by accordance with という表現は英語に存在しません。'],
      ['at', '前置詞。at は場所・時点・状態を示し、at accordance with という表現は使いません。'],
      ['of', '前置詞。of は所属・成分・関係を示し、of accordance with という表現は成立しません。'],
    ] as Options4,
    0,
    '建築設計・都市インフラの文脈で頻出する in accordance with（〜に従って）という慣用表現を問います。空所の直後の accordance という名詞に結びつく前置詞を選びます。',
    'preposition',
  ),

  // No.121 — 語彙（動詞のコロケーション）/ vocab
  p5q(
    121,
    'The editorial board voted to ______ the retraction of three papers after determining that the data had been fabricated.',
    '編集委員会は、データが捏造されていたと判断した後、3本の論文の撤回を正式に承認することを票決しました。',
    [
      ['ratify', '動詞「批准する・正式に承認する」。ratify a decision や ratify a retraction で「（委員会などが正式に）承認する」という意味を表し、投票による正式決定の文脈に合います。'],
      ['waive', '動詞「権利を放棄する・免除する」。権利や要件を意図的に放棄する意味で、撤回を承認する文脈に合いません。'],
      ['rescind', '動詞「取り消す・廃止する」。既存の決定や契約を無効にする意味で、新たに撤回を承認することとは異なります。'],
      ['preclude', '動詞「妨げる・不可能にする」。ある行為を事前に阻止する意味で、承認を表す文脈と逆の意味になります。'],
    ] as Options4,
    0,
    '学術出版・研究倫理の文脈で、委員会が正式に何かを承認・批准する動詞を選ぶ問題です。4択はすべてフォーマルな文書語彙で、細かな意味の違いが判断のポイントになります。',
    'vocab',
  ),

  // No.122 — 文法（仮定法現在・要求の that 節）/ grammar
  p5q(
    122,
    'The compliance officer recommended that the quarterly risk assessment ______ by an external auditor rather than internal staff.',
     'コンプライアンス責任者は、四半期ごとのリスク評価を内部スタッフではなく外部監査人が行うことを勧告しました。',
    [
      ['be conducted', '仮定法現在（原形）の受動態。recommend that S + 原形不定詞 という要求・勧告の that 節では動詞は原形（仮定法現在）を使います。受動の意味も正しく表せています。'],
      ['is conducted', '直説法現在の受動態。要求・勧告の that 節では直説法ではなく仮定法現在（原形）が必要であり、is ではなく be を使わなければなりません。'],
      ['was conducted', '過去時制の受動態。時制が合わず、仮定法現在の規則に反します。'],
      ['will be conducted', '未来時制の受動態。that 節の中に will を入れると時制の一致のルールに反し、仮定法現在（原形）の規則にも合いません。'],
    ] as Options4,
    0,
    'recommend / suggest / insist など要求・勧告を表す動詞の後の that 節では、主語の人称・数にかかわらず動詞を原形（仮定法現在）にするというルールを問います。受動態を伴う場合も原形 be を使います。',
    'grammar',
  ),

  // No.123 — 語彙（名詞のコロケーション）/ vocab
  p5q(
    123,
    'The human resources department circulated a ______ outlining the revised procedures for remote work authorization.',
    '人事部は、リモートワーク承認の改訂手続きを概説した通達を回覧しました。',
    [
      ['memorandum', '名詞「（社内）回覧文書・覚書」。circulated a memorandum で「覚書を回覧した」という組織内コミュニケーションの定型表現になります。'],
      ['manifesto', '名詞「宣言・マニフェスト」。政治・思想的な公開声明を指し、社内手続きの変更を通知する文書としては不適切です。'],
      ['ledger', '名詞「元帳」。財務会計の帳簿を指し、社内通達の文脈に合いません。'],
      ['covenant', '名詞「誓約・契約条款」。宗教的・法的な誓約を指し、社内業務手続きの通知を表す語としては重すぎます。'],
    ] as Options4,
    0,
    '人材開発・人事管理の文脈で、社内手続きを通知する文書の種類を表す名詞を選ぶ問題です。circulated という動詞と outlining 以下の内容から、最も適切な文書名を特定します。',
    'vocab',
  ),

  // No.124 — 代名詞（再帰代名詞と強調用法の区別）/ pronoun
  p5q(
    124,
    'Ms. Vance, the chief architect, ______ reviewed every structural drawing before they were submitted to the city planning office.',
    'ヴァンス主任建築士自身が、すべての構造図面を市の都市計画局に提出する前に確認しました。',
    [
      ['herself', '再帰代名詞・強調用法。主語 Ms. Vance（女性）に対応する herself を主語の直後に置いて「自身が」という強調を加える用法で、文意に合います。'],
      ['themselves', '再帰代名詞の複数形。主語 Ms. Vance は単数・女性であり、複数形の themselves は使えません。'],
      ['oneself', '一般的な再帰代名詞。特定の主語に結びついた強調では、主語に対応する具体的な再帰代名詞（himself / herself）を使うのが自然で、oneself は一般論や不特定の文脈向きです。'],
      ['them', '三人称複数の目的代名詞。主語を強調する用法には再帰代名詞が必要であり、目的代名詞 them は強調の機能を持ちません。'],
    ] as Options4,
    0,
    '主語（単数・女性）を強調する再帰代名詞の強調用法を問います。複数形・一般形との区別、および目的格代名詞との機能的な違いを正確に識別する問題です。',
    'pronoun',
  ),

  // No.125 — 語彙（動詞の語法）/ vocab
  p5q(
    125,
    'The port authority plans to ______ a dedicated berth for LNG-powered vessels as part of the terminal modernization project.',
    '港湾当局は、ターミナル近代化プロジェクトの一環として、LNG燃料船向けの専用バースを設置する計画です。',
    [
      ['commission', '動詞「（施設・設備を）設置・稼働させる」。commission a berth / facility で「バースや施設を正式に稼働させる」という港湾・インフラの定型表現になります。'],
      ['sanction', '動詞「制裁を加える / 公認する」。公認の意味もありますが、具体的な物理施設を「設置・稼働させる」文脈では commission が自然で sanction は不自然です。'],
      ['defer', '動詞「延期する」。計画を先送りする意味で、新設する文脈と逆になります。'],
      ['levy', '動詞「（税や料金を）課す」。課金・徴収の文脈で使い、施設を設置するという意味にはなりません。'],
    ] as Options4,
    0,
    '港湾物流・インフラ整備の文脈で、施設を正式に設置・稼働させる動詞を選ぶ問題です。4択はすべてフォーマルな上級語彙ですが、バースや設備を目的語に「稼働させる」意味を持つのは1語です。',
    'vocab',
  ),

  // No.126 — 動詞の形（態と時制の複合）/ verb_form
  p5q(
    126,
    'By the time the revised building codes take effect, all existing structures in the district ______ for compliance.',
    '改訂された建築基準が施行される頃までに、地区内のすべての既存建造物はコンプライアンス適合の審査を受けているはずです。',
    [
      ['will have been assessed', '未来完了受動態。By the time ... take effect という未来の基準点より前に審査が完了しているという「完了」の意味を、かつ建造物が審査される「受動」の意味を同時に表します。'],
      ['will be assessing', '未来進行形（能動）。建造物が何かを審査する側になってしまい、受動の意味を表せません。'],
      ['have been assessed', '現在完了受動態。By the time ... take effect という未来の文脈では未来時制が必要で、現在完了では時制が合いません。'],
      ['are being assessed', '現在進行受動態。現時点で審査中であることを示し、未来の基準点における完了という文意と合いません。'],
    ] as Options4,
    0,
    '未来完了受動態（will have been + 過去分詞）の使い分けを問います。By the time ... take effect という未来の基準点と、主語が審査される側であるという2つの条件を同時に満たす形を選びます。',
    'verb_form',
  ),

  // No.127 — 語彙（動詞のコロケーション）/ vocab
  p5q(
    127,
    'The insurance regulator issued a directive requiring all carriers to ______ their actuarial models to reflect current mortality data.',
    '保険規制当局は、すべての保険会社が現在の死亡率データを反映するために保険数理モデルを改訂するよう求める指令を発行しました。',
    [
      ['recalibrate', '動詞「再調整する・再較正する」。recalibrate models で「モデルを新しいデータに基づいて再調整する」という金融・保険の専門用語として自然です。'],
      ['embellish', '動詞「飾り立てる・誇張する」。data や model に対して使うと、正確さを失わせる意味になり規制文書の文脈に合いません。'],
      ['abdicate', '動詞「（責任・権位を）放棄する」。責任や地位を手放す場合に使い、モデルを修正する文脈に合いません。'],
      ['interpolate', '動詞「補間する・挿入する」。データを補完する手法を指しますが、既存モデル全体を「新データに合わせて再調整する」という文意ではなく、部分的な計算操作を指す語です。'],
    ] as Options4,
    0,
    '保険・金融規制の文脈で、数理モデルを新しいデータに合わせて「再調整する」動詞を選ぶ問題です。4択はいずれも上級語彙ですが、model を目的語に「更新・調整」の意味を最も正確に表す語を選びます。',
    'vocab',
  ),

  // No.128 — 文法（分詞構文の意味上の主語と絶対分詞構文）/ grammar
  p5q(
    128,
    '______ lapsed, the medical device could no longer be legally sold in any member state.',
    '安全認証の期限が切れたため、その医療機器はもはやどの加盟国でも合法的に販売することができなくなりました。',
    [
      ['The safety certification having', '独立（絶対）分詞構文。分詞の意味上の主語（the safety certification）が主節の主語（the medical device）と異なる場合に使います。Having lapsed は完了分詞で先行して起きた出来事を表します。'],
      ['Having', '完了分詞。分詞の意味上の主語が省略された場合、主節の主語（the medical device）が分詞の主語と見なされますが、デバイス自身が期限切れになるのではなく認証が期限切れになる、というずれが生じます。'],
      ['As the safety certification lapsing', '不完全な接続詞節。lapsing は進行形の現在分詞で、as 節の述語には定形動詞が必要です。'],
      ['The safety certification has', '現在完了の独立節となり、後続の主節とコンマだけでつなぐとコンマスプライスになるため不適切です。'],
    ] as Options4,
    0,
    '絶対分詞構文（独立分詞構文）を問います。主節の主語と分詞の意味上の主語が異なるとき、分詞の前に独自の主語を置く絶対分詞構文が必要です。医療機器規制の文脈で使われています。',
    'grammar',
  ),

  // No.129 — 語彙（形容詞のコロケーション）/ vocab
  p5q(
    129,
    'The arbitration panel reached a ______ decision that both parties accepted without filing an appeal.',
    '仲裁パネルは、双方が不服申立てを行わずに受け入れた最終的な決定を下しました。',
    [
      ['conclusive', '形容詞「決定的な・最終的な」。a conclusive decision で「最終的かつ疑いの余地のない決定」を表し、両者が控訴しなかったという文意に合います。'],
      ['cursory', '形容詞「ざっと行った・粗略な」。不十分な審査を示す否定的な意味で、両者が受け入れた仲裁決定の性質として合いません。'],
      ['tentative', '形容詞「暫定的な」。まだ確定していないことを示し、控訴なしで受け入れられた最終決定とは矛盾します。'],
      ['elusive', '形容詞「捉えにくい・つかみどころのない」。合意を達成しにくい様子を表し、実際に下された決定の性質を表す語としては文脈に合いません。'],
    ] as Options4,
    0,
    '法務・仲裁の文脈で、仲裁決定の性質を表す形容詞を選ぶ問題です。「両者が控訴なく受け入れた」という文脈から、最終性・確定性を意味する語を選びます。',
    'vocab',
  ),

  // No.130 — 接続詞（接続副詞と従属接続詞の区別）/ conjunction
  p5q(
    130,
    'The new data localization requirements are expected to increase operational costs for cloud providers; ______, several firms have already begun revising their service agreements.',
    '新しいデータ所在地要件はクラウドプロバイダーの運営コストを増加させると予想されており、それに応じていくつかの企業はすでにサービス契約の改訂を始めています。',
    [
      ['accordingly', '接続副詞「それに従って・その結果として」。セミコロンで区切られた2文をつなぐ接続副詞として使えます。コストの増加という原因に対して企業が契約を見直し始めるという因果関係を正確に表します。'],
      ['although', '従属接続詞「〜であるにもかかわらず」。従属節を導くため、セミコロン後の独立節の冒頭には置けません。また意味も逆接になり文脈に合いません。'],
      ['lest', '従属接続詞「〜しないように」。否定的な目的を示し、セミコロン後の独立節を導く位置には使えません。'],
      ['inasmuch as', '従属接続詞「〜であるがゆえに」。理由を示す従属節を導くため、セミコロン後の独立節冒頭では構造的に使えません。'],
    ] as Options4,
    0,
    '接続副詞と従属接続詞の構造的な違いを問います。セミコロンで区切られた2つの独立節をつなぐには接続副詞（またはコンマ＋等位接続詞）が必要で、従属接続詞は使えません。また接続副詞の意味的な適切さも判断します。',
    'conjunction',
  ),
];
