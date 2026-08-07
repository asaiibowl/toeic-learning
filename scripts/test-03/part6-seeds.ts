/**
 * test-03 Part 6 — 長文穴埋め（No.131〜146、4文書×4問）
 *
 * 題材:
 *   文書1 (notice)  : 大学研究支援室からの「研究助成金 申請規程の改定」通知
 *   文書2 (email)   : 製造業のサプライヤー品質監査の結果通知（監査法人→取引先）
 *   文書3 (article) : 保険テック企業が発表した新しい請求処理サービスの業界記事
 *   文書4 (memo)    : 社内メモ: リモートワーク経費精算ポリシーの変更
 *
 * 難易度: TOEIC 860点以上帯（上級）
 * すべてオリジナル問題。架空の人名・社名・ドメイン使用。
 */

import { p6Passage, p6q } from './helpers';
import type { Part6Passage } from '../../src/schemas/question.schema';

export const part6Passages: Part6Passage[] = [
  // ============================================================
  // 文書1: notice — 大学研究支援室からの「研究助成金 申請規程の改定」通知
  // 問番号: 131〜134  insertion=133
  // ============================================================
  p6Passage(
    1,
    'notice',
    'Revised Guidelines for Research Grant Applications — Effective Immediately',
    [
      // 段落0
      [
        'To: All Principal Investigators and Research Coordinators\nFrom: Office of Research Support, Harlington University\n\nThe Office of Research Support wishes to inform all grant applicants that the internal review procedures for externally funded projects have been revised ______[131] recent recommendations from the University Research Committee. The updated guidelines take effect as of September 1 and supersede all previously issued documentation.',
        '宛先：全主任研究員および研究コーディネーター\n送信者：ハーリントン大学 研究支援室\n\n研究支援室は、大学研究委員会による最近の勧告を受け、外部資金による研究プロジェクトの内部審査手続きを改定したことを全助成金申請者に通知します。改定後のガイドラインは9月1日付で発効し、これまでに発行されたすべての文書に取って代わります。',
      ],
      // 段落1
      [
        'Under the revised framework, project proposals ______[132] to an external funding body must first obtain clearance from the Office of Research Support before submission. Applicants are required to submit a completed internal review form along with a draft budget at least three weeks prior to the external deadline. ______[133] Failure to comply with this requirement may result in the withdrawal of institutional support for the application.',
        '改定された枠組みの下では、外部資金提供機関に提出するプロジェクト提案書は、提出前に研究支援室の事前承認を得なければなりません。申請者は外部締め切りの少なくとも3週間前に、記入済みの内部審査フォームと予算草案を提出することが求められます。この内部審査は、提案書が外部審査に進む前に大学の倫理・財務基準を満たしていることを確認するためのものです。この要件を遵守しなかった場合、申請に対する大学の支援が撤回される可能性があります。',
      ],
      // 段落2
      [
        'Questions regarding the new procedures should be directed ______[134] the Research Support Help Desk, which is reachable at researchsupport@harlington.example or by telephone at ext. 7120. Office hours are Monday through Friday, 9:00 A.M. to 5:00 P.M. The Office of Research Support thanks you for your continued cooperation.',
        '新手続きに関するご質問は、研究支援ヘルプデスク（researchsupport@harlington.example または内線7120）へお問い合わせください。窓口は月曜日から金曜日の午前9時から午後5時まで対応しています。研究支援室は引き続きのご協力に感謝申し上げます。',
      ],
    ],
    [
      // No.131: 前置詞 — 「勧告に従い」（in accordance with / following / per / based on など）
      // targetIndex for 131: (((131*13+5)^(131>>3))&3) = (((1703+5)^16)&3) = ((1708^16)&3) = (1724&3) = 0 → A
      // correctIndex=0 → shift=0（シフトなし）
      p6q(
        131,
        'blank',
        [
          ['in response to', '「〜に応じて」という意味の前置詞句で、大学研究委員会の勧告を受けて手続きが改定されたという因果・根拠関係を自然に表します。'],
          ['in spite of', '「〜にもかかわらず」という譲歩を示す前置詞句。委員会の勧告に反して改定したという逆接の意味になり、文脈と論理的に矛盾します。'],
          ['by means of', '「〜の手段によって」を示す前置詞句で、具体的な手段・方法を導きます。改定の根拠となった勧告を示す文脈には意味的に合いません。'],
          ['in place of', '「〜の代わりに」を示す前置詞句で、委員会の勧告を別のものに置き換えるという意味になり、勧告が改定の動機であるという文意から逸脱します。'],
        ],
        0, // 正解: in response to
        '空所の後に "recent recommendations from the University Research Committee" という名詞句が続きます。手続きが改定された理由・根拠として委員会の勧告を示すには、「〜に応じて」という意味の in response to が最も適切です。',
        [0, 'have been revised ______[131] recent recommendations from the University Research Committee'],
      ),
      // No.132: 語形変化 — 名詞修飾の分詞（submitted / submitting）
      // targetIndex for 132: (((132*13+5)^(132>>3))&3) = (((1716+5)^16)&3) = ((1721^16)&3) = (1737&3) = 1 → B
      // correctIndex=0 → shift=1
      p6q(
        132,
        'blank',
        [
          ['submitted', '過去分詞で、project proposals（提案書）が外部機関へ「提出される」側であることを示す受動の後置修飾を作ります。"proposals submitted to an external funding body" という表現が文意に合います。'],
          ['submitting', '現在分詞で能動の後置修飾を作り、「提案書が提出する側」という意味になりますが、提案書自体は提出される対象であるため意味的に不自然です。'],
          ['submission', '名詞で、名詞句 project proposals の後に別の名詞を連続させると文法的に不整合が生じ、後続の "must first obtain clearance" という述語との対応も崩れます。'],
          ['submits', '動詞の三単現形で、proposals という複数名詞の述語として使うには数が一致しません。また後続の "must first obtain clearance" と二つの述語が競合します。'],
        ],
        0, // 正解: submitted
        '"project proposals ______[132] to an external funding body" という構造で、proposals（提案書）は提出される対象です。受動の後置修飾を作る過去分詞 submitted が適切で、"proposals submitted to ..." は「外部資金提供機関に提出される提案書」という自然な表現です。',
        [1, 'project proposals ______[132] to an external funding body must first obtain clearance'],
      ),
      // No.133: insertion — 内部審査の追加情報（審査委員会の構成）
      // targetIndex for 133: (((133*13+5)^(133>>3))&3) = (((1729+5)^16)&3) = ((1734^16)&3) = (1750&3) = 2 → C
      // correctIndex=2 → shift=0
      p6q(
        133,
        'insertion',
        [
          ['All travel reimbursements must be submitted to the finance department within thirty days of the trip.', '出張精算の手続きに関する情報で、助成金申請の内部審査手続きという段落の文脈とは話題が完全に異なり、前後の文とのつながりがありません。'],
          ['The external review panel consists of three faculty members appointed by the dean.', '外部審査パネルの構成について述べていますが、ここで説明している手続きは外部機関への提出前の「内部審査」であり、外部パネルの情報は直前・直後の文の論理的な流れを断ち切ります。'],
          ['This internal review is designed to ensure that proposals meet the university\'s ethical and financial standards before they reach external reviewers.', '内部審査の目的（倫理・財務基準への適合を外部審査前に確認する）を説明する文で、直前の「3週間前に書類を提出する要件」と直後の「要件不遵守の結果」の間に目的の根拠を挿入することで、規則の必要性が論理的に補強されます。'],
          ['Researchers are encouraged to attend the annual grant writing workshop offered every October.', '年次ワークショップへの参加を勧める文で、話題は関連しますが直前の「提出期限・書類要件」と直後の「不遵守の結果」という具体的な手続きの流れとは論理的につながらず、段落の文脈から浮いています。'],
        ],
        2, // 正解: This internal review is designed to...
        '空所の直前に「内部審査フォームと予算草案を3週間前に提出するよう求める」規則があり、直後に「要件不遵守の場合は大学の支援が撤回される」という結果があります。「この内部審査が外部審査前に倫理・財務基準を確認するためのものだ」という目的を説明する文を挿入すると、規則の存在理由が明示され、不遵守の結果への論理的な橋渡しが自然になります。',
      ),
      // No.134: 前置詞 — 「〜宛てに向ける」(direct ... to)
      // targetIndex for 134: (((134*13+5)^(134>>3))&3) = (((1742+5)^16)&3) = ((1747^16)&3) = (1763&3) = 3 → D
      // correctIndex=0 → shift=3
      p6q(
        134,
        'blank',
        [
          ['to', '「direct A to B」（AをBに向ける・送る）という慣用表現の一部を構成する前置詞で、「質問をヘルプデスクに送る」という文意を正確に表します。'],
          ['at', '「direct A at B」は「AをBに向ける」という意味でも使えますが、問い合わせや質問を特定の窓口に回す文脈では "direct ... to" が慣用的に使われます。'],
          ['for', '「direct A for B」は一般的な表現ではなく、問い合わせの送先を示す文脈には合いません。'],
          ['toward', '「direct A toward B」は方向性を示す表現ですが、特定の窓口・宛先に問い合わせを向ける場合には "to" が慣用的で自然です。'],
        ],
        0, // 正解: to
        '"Questions ... should be directed ______[134] the Research Support Help Desk" という構造です。"direct A to B" は「AをBへ向ける・送る」という慣用表現で、問い合わせを特定の窓口へ回す指示に使います。to が唯一の慣用的選択肢です。',
        [2, 'should be directed ______[134] the Research Support Help Desk'],
      ),
    ],
  ),

  // ============================================================
  // 文書2: email — 製造業のサプライヤー品質監査の結果通知（監査法人→取引先）
  // 問番号: 135〜138  insertion=136
  // ============================================================
  p6Passage(
    2,
    'email',
    'Quality Audit Results — Mandatory Corrective Action Required',
    [
      // 段落0
      [
        'To: Quality Assurance Manager, Delverton Components Ltd.\nFrom: Natasha Wren, Senior Auditor, Meridian Certification Group\nSubject: On-Site Quality Audit Results — Delverton Facility, August 2026\n\nDear Ms. Hargrove,\n\nFollowing the on-site audit conducted at your Northgate facility from August 4 to 6, I am writing to inform you of the findings and the ______[135] actions Delverton Components Ltd. must undertake before the next scheduled review.',
        '宛先：品質保証マネージャー、デルバートン・コンポーネンツ社\n送信者：Natasha Wren、上級監査員、メリディアン認証グループ\n件名：現地品質監査結果 — デルバートン施設、2026年8月\n\nHargrove様\n\n8月4日から6日にかけてノースゲート施設で実施した現地監査を受けて、監査所見と、次回の定期審査までにデルバートン・コンポーネンツ社が実施すべき是正措置についてお知らせします。',
      ],
      // 段落1
      [
        'The audit revealed three non-conformances with ISO 9001:2015 standards. ______[136] Of particular concern is the absence of documented calibration records for precision measuring instruments used on Line 4, which were last serviced more than eighteen months ago. In addition, two instances of undocumented process deviations were identified in the sub-assembly area.',
        '今回の監査では、ISO 9001:2015規格への3件の不適合が明らかになりました。各不適合の詳細は添付レポートに記載されています。特に懸念されるのは、ライン4で使用されている精密計測機器の校正記録が文書化されていないことで、これらの機器が最後に整備されたのは18か月以上前です。さらに、サブアセンブリエリアで2件の文書化されていないプロセス逸脱が確認されました。',
      ],
      // 段落2
      [
        'Delverton Components Ltd. is required to submit a formal corrective action plan to Meridian Certification Group no ______[137] than October 15, 2026. The plan must specify the root cause analysis, proposed remediation steps, and a timeline for full compliance. Failure to submit a plan within this period will ______[138] in the suspension of your ISO 9001 certification until the non-conformances have been satisfactorily resolved.',
        'デルバートン・コンポーネンツ社は、2026年10月15日までに是正処置計画書をメリディアン認証グループに提出することが求められます。計画書には根本原因分析、提案された改善手順、および完全な適合に向けたスケジュールを明記する必要があります。この期間内に計画書を提出しなかった場合、不適合事項が満足のいく形で解決されるまでISO 9001認証が停止されます。',
      ],
    ],
    [
      // No.135: 語彙（形容詞）— 「必要な」是正措置（required / corrective / remedial / mandatory）
      // targetIndex for 135: (((135*13+5)^(135>>3))&3) = (((1755+5)^16)&3) = ((1760^16)&3) = (1776&3) = 0 → A
      // correctIndex=0 → shift=0
      p6q(
        135,
        'blank',
        [
          ['corrective', '「是正の・修正のための」という意味の形容詞で、"corrective actions" は「是正措置」という業界標準の用語です。ISO品質管理の文書において非適合への対応を示す際に慣用的に使われます。'],
          ['collective', '「集合的な・共同の」という意味の形容詞。複数の主体が共同して取り組む行動を示す語で、サプライヤーが自社で実施すべき改善措置を表す文脈には合いません。'],
          ['correlative', '「相関的な」という意味の形容詞で、二者の相関関係を示します。是正や改善を要求する文脈で使われる語ではありません。'],
          ['constructive', '「建設的な」という意味の形容詞。建設的なフィードバックや議論の文脈では使いますが、監査の不適合に対して義務として取るべき具体的な措置を指す語としては不自然です。'],
        ],
        0, // 正解: corrective
        '"actions Delverton Components Ltd. must undertake" という文脈から、次回審査までに義務として実施すべき対応措置を示す形容詞が必要です。ISO品質監査において非適合への対応を指す "corrective actions"（是正措置）は業界標準の用語で、文書の文脈に最も適合します。',
        [0, 'the ______[135] actions Delverton Components Ltd. must undertake before the next scheduled review'],
      ),
      // No.136: insertion — 不適合の詳細説明への橋渡し
      // targetIndex for 136: (((136*13+5)^(136>>3))&3) = (((1768+5)^16)&3) = ((1773^16)&3) = (1789&3) = 1 → B
      // correctIndex=1 → shift=0
      p6q(
        136,
        'insertion',
        [
          ['Your facility received the highest overall score among all suppliers audited this quarter.', '今四半期の全サプライヤー中で最高評価を受けたという内容ですが、直後に3件の不適合を詳述する文が続いており、肯定的な評価と深刻な不適合の発覚という論理が矛盾します。'],
          ['Details of these non-conformances are outlined in the attached report.', '「これらの不適合の詳細は添付レポートに記載されている」という完全な文で、直前の3件の不適合を受け、直後の具体的な説明へ自然に移行させます。'],
          ['These findings require no further action from your facility.', '「施設側の追加対応は不要」とする文ですが、是正措置計画の提出を義務付ける後続段落と明確に矛盾します。'],
          ['Meridian Certification Group conducts audits on a semi-annual basis for all registered clients.', '監査の頻度に関する一般情報で、直前の「3件の不適合の発覚」と直後の「特に懸念される校正記録の欠如」という具体的な流れを断ち切り、論理的なつながりがありません。'],
        ],
        1, // 正解: Details of these non-conformances are outlined in the attached report.
        '空所の直前で3件の不適合が提示され、直後ではそのうち特に懸念される事例が説明されます。「これらの不適合」の詳細を添付レポートへ結び付ける完全な文を挿入すると、件数の提示から具体例への移行が自然になります。',
      ),
      // No.137: 語彙（副詞/慣用句）— "no later than"（〜までに）
      // targetIndex for 137: (((137*13+5)^(137>>3))&3) = (((1781+5)^16)&3) = ((1786^16)&3) = (1802&3) = 2 → C
      // correctIndex=0 → shift=2
      p6q(
        137,
        'blank',
        [
          ['later', '"no later than" で「〜より遅くなく」つまり「〜までに」という期限を示す慣用表現を構成します。提出期限を設定する法的・正式な文書で標準的に使われる表現です。'],
          ['sooner', '"no sooner than" は「〜よりも早くなく」つまり「〜以降に」という意味になり、提出できる最も早い時点を示します。今回は「10月15日までに提出」という期限の設定が意図であるため、意味が逆になります。'],
          ['further', '"no further than" は距離・範囲の限界を示す表現で、期限を定める時間的な文脈には合いません。'],
          ['longer', '"no longer than" は期間の最大値を示す表現ですが、特定の日付で期限を切る "no ______ than October 15" という文脈では慣用的ではなく不自然です。'],
        ],
        0, // 正解: later
        '"no ______[137] than October 15, 2026" という構造で、書類提出の最終期限を示す表現が必要です。"no later than" は「〜よりも遅くなく」すなわち「〜までに」という意味の慣用表現で、正式な通知文における締め切りの設定に広く使われます。',
        [2, 'submit a formal corrective action plan to Meridian Certification Group no ______[137] than October 15, 2026'],
      ),
      // No.138: 語形変化 — "result in"（〜という結果をもたらす）
      // targetIndex for 138: (((138*13+5)^(138>>3))&3) = (((1794+5)^16)&3) = ((1799^16)&3) = (1815&3) = 3 → D
      // correctIndex=0 → shift=3
      p6q(
        138,
        'blank',
        [
          ['result', '"will result in" は「〜という結果をもたらす」という意味の慣用表現で、義務不履行の結果として認証停止が生じるという因果関係を明確に示します。'],
          ['cause', '"will cause in" は英語として成立しない表現です。cause は自動詞として "in" を後続させる用法がなく、文法的に誤りです。'],
          ['bring', '"will bring in" は「〜をもたらす・稼ぐ」という別の慣用表現であり、制裁や停止という深刻な結果を示す正式な文書の文脈では用いません。'],
          ['lead', '"will lead in" は英語として成立しない表現です。"lead to" であれば「〜につながる」という意味になりますが、ここでは空所の後に "in" が明示されているため構造が合いません。'],
        ],
        0, // 正解: result
        '"Failure to submit ... will ______[138] in the suspension of your ISO 9001 certification" という構造です。空所の後に "in" が続くため、"result in"（〜をもたらす）という慣用表現を構成する動詞が必要です。義務不履行の結果として制裁が発動するという因果関係を示す正式な文書表現として適切です。',
        [2, 'Failure to submit a plan within this period will ______[138] in the suspension of your ISO 9001 certification'],
      ),
    ],
  ),

  // ============================================================
  // 文書3: article — 保険テック企業が発表した新しい請求処理サービスの業界記事
  // 問番号: 139〜142  insertion=141
  // ============================================================
  p6Passage(
    3,
    'article',
    'Claravis Technologies Unveils AI-Driven Claims Processing Platform',
    [
      // 段落0
      [
        'Insurance technology firm Claravis Technologies announced the commercial launch of its ClaimsEdge platform last Tuesday, positioning the product as a direct ______[139] to the prolonged manual review cycles that have long afflicted mid-sized property and casualty insurers. The platform leverages machine learning models trained on more than twelve million anonymized claims records to automate the initial triage and categorization of incoming claims.',
        '保険テクノロジー企業のクラリビス・テクノロジーズは先週火曜日、ClaimsEdgeプラットフォームの商業展開を発表し、中規模の損害保険会社が長年悩まされてきた手動審査サイクルの長期化への直接的な解決策として製品を位置付けました。同プラットフォームは、1,200万件超の匿名化された保険金請求記録で学習させた機械学習モデルを活用し、新たに受け付けた請求の初期トリアージおよび分類を自動化します。',
      ],
      // 段落1
      [
        'According to Claravis, insurers currently ______[140] an average of eleven business days to process a straightforward property claim from submission to payment authorization. The company claims that ClaimsEdge reduces this figure to fewer than three days for claims falling within its automated processing scope, which currently includes standard residential property damage and vehicle collision claims. ______[141] The company says this expansion will be supported by additional training data now under review.',
        'クラリビスによると、保険会社は現在、単純な財物損害の保険金請求を受け付けてから支払いを承認するまで平均11営業日を要しています。同社は、ClaimsEdgeの自動処理対象となる請求ではこの期間を3営業日未満に短縮できると主張しています。現在の対象は、標準的な住宅の財物損害請求と車両衝突請求です。対象範囲は来年初頭までに企業賠償責任保険と生命保険の請求にも拡大される見込みで、同社によると、この拡大を支える追加学習データを現在審査中です。',
      ],
      // 段落2
      [
        'Industry analysts have ______[142] welcomed the announcement, noting that automation in claims handling has lagged behind other areas of insurance operations. However, some observers cautioned that regulatory compliance requirements for claims processing vary significantly by jurisdiction, and that Claravis will need to demonstrate adaptability across different markets before securing large-scale adoption.',
        '業界アナリストらは概ね今回の発表を歓迎しており、請求処理における自動化が保険業務の他分野と比べて遅れているとの見解を示しています。ただし、一部の関係者は、請求処理に関する規制遵守要件は管轄によって大きく異なることや、大規模な普及を確保する前にクラリビスが異なる市場での適応性を実証する必要があると警告しています。',
      ],
    ],
    [
      // No.139: 語彙（名詞）— 「解決策・対抗手段」(response / answer / solution / remedy)
      // targetIndex for 139: (((139*13+5)^(139>>3))&3) = (((1807+5)^16)&3) = ((1812^16)&3) = (1828&3) = 0 → A
      // correctIndex=0 → shift=0
      p6q(
        139,
        'blank',
        [
          ['response', '「応答・対応」という意味の名詞で、"a direct response to" は「〜への直接的な対応策」という意味の自然な表現です。問題を解決するための製品を位置付ける文脈に適合します。'],
          ['resistance', '「抵抗・耐性」という意味の名詞。"a direct resistance to" は「〜への直接的な抵抗」という意味になり、製品が問題に抵抗するというニュアンスは文脈と合いません。'],
          ['relevance', '「関連性・重要性」という意味の名詞。"a direct relevance to" は「〜との直接的な関連性」という意味で、製品を問題の解決策として位置付ける文意とは異なります。'],
          ['reference', '「参照・言及」という意味の名詞。"a direct reference to" は「〜への直接的な言及」という意味になり、製品の役割を示す文脈には合いません。'],
        ],
        0, // 正解: response
        '"positioning the product as a direct ______[139] to the prolonged manual review cycles" という構造で、製品が長期化した手動審査サイクルという問題に対する「対応策・解決策」として位置付けられることを示す名詞が必要です。"a direct response to" は問題への対応策を示す慣用的な表現です。',
        [0, 'positioning the product as a direct ______[139] to the prolonged manual review cycles'],
      ),
      // No.140: 語形変化 — 動詞の三単現（require / take / need）
      // targetIndex for 140: (((140*13+5)^(140>>3))&3) = (((1820+5)^16)&3) = ((1825^16)&3) = (1841&3) = 1 → B
      // correctIndex=0 → shift=1
      p6q(
        140,
        'blank',
        [
          ['require', '動詞の原形で、insurers という複数形の現在時制の述語には三単現の -s が不要な形ですが、原形そのままでも主語が複数なら正しい形です。ただし "require" は「〜を要求する・必要とする」という意味で、時間がかかることを表す慣用句 "take ... days" とは構造が異なります。'],
          ['take', '「（時間が）かかる」という意味の動詞の原形で、insurers という複数主語に対応する三単現形ではなく原形の take が正しい形です。"currently take ... days" で「現在〜日を要する」という慣用的な表現になります。'],
          ['elapse', '「（時間が）経過する」という自動詞で、insurers を主語に日数を目的語として取ることはできません。'],
          ['use', '「使う」という動詞で、"use ... days" は「日数を使う」という意味になりますが、特定のプロセスにかかる期間を示す慣用表現としては "take ... days" が標準的であり、こちらは不自然です。'],
        ],
        1, // 正解: take
        '"insurers currently ______[140] an average of eleven business days" という構造で、「プロセスに〜日かかる」という意味を表す動詞が必要です。"It takes ... days" または主語が人・組織の場合に "take ... days" で「〜日を要する」を表す慣用表現が適切で、insurers（複数）が主語なので三単現の -s なしの take が正しい形です。',
        [1, 'insurers currently ______[140] an average of eleven business days to process a straightforward property claim'],
      ),
      // No.141: insertion — 自動処理の対象範囲拡大予定について
      // targetIndex for 141: (((141*13+5)^(141>>3))&3) = (((1833+5)^16)&3) = ((1838^16)&3) = (1854&3) = 2 → C
      // correctIndex=2 → shift=0
      p6q(
        141,
        'insertion',
        [
          ['The company was founded in 2019 and is headquartered in Toronto, Canada.', '企業の創業年と本社所在地という基本情報で、自動処理の対象範囲という具体的な製品機能の説明という直前・直後の文の流れとは無関係であり、段落の論点から逸れます。'],
          ['ClaimsEdge is also compatible with all major policy management software systems currently in use.', '他のソフトウェアとの互換性についての情報で、話題は関連しますが、直前の「対象範囲の説明」と直後の「拡張予定」という文脈の流れには組み込まれず、段落の論点を散漫にします。'],
          ['The scope is expected to expand to include commercial liability and life insurance claims by early next year.', '「対象範囲は来年初頭までに商業賠償責任保険および生命保険請求を含む形に拡張予定」という情報で、直前の「現在の対象範囲」の説明を受けて将来の展望を補足し、段落の製品能力の説明を自然に締めます。'],
          ['Several large insurers have already signed letters of intent to pilot the platform next quarter.', 'パイロット契約の締結という情報は次の段落（アナリストの反応）に近い内容ですが、直前の「対象範囲の説明」と直後の「段落末」の位置では、現在の範囲から将来の拡張へという流れを補完する文が論理的により適合します。'],
        ],
        2, // 正解: The scope is expected to expand...
        '空所の直前では現在の自動処理対象が説明され、直後の "this expansion" は対象範囲の拡大を受けます。商業賠償責任保険と生命保険への拡張予定を述べる文だけが、この指示表現の明確な先行内容になり、現状から将来展望への流れも自然です。',
      ),
      // No.142: 副詞（談話標識）— 「概ね・おおむね」(broadly / largely / generally / widely)
      // targetIndex for 142: (((142*13+5)^(142>>3))&3) = (((1846+5)^16)&3) = ((1851^16)&3) = (1867&3) = 3 → D
      // correctIndex=0 → shift=3
      p6q(
        142,
        'blank',
        [
          ['broadly', '「広く・概して」という意味の副詞で、"have broadly welcomed" は「概ね歓迎した」という意味になります。直後の "however, some observers cautioned ..." という部分的な異論の存在と呼応し、全面的ではないが大部分は歓迎しているというニュアンスを正確に伝えます。'],
          ['explicitly', '「明示的に・はっきりと」という意味の副詞。明確な言語化を強調する語で、一部の異論を暗示する直後の however 節とは論理的に相容れません。'],
          ['exclusively', '「もっぱら・排他的に」という意味の副詞。「もっぱら歓迎した」とすると全員が完全に賛同したという意味になり、直後で一部の反論が示される流れと矛盾します。'],
          ['reluctantly', '「しぶしぶ・消極的に」という意味の副詞。"have reluctantly welcomed" は「しぶしぶ歓迎した」という意味で、直後の however で一部の懸念が示されるとしても、全体的に前向きに評価しているという文脈と相反します。'],
        ],
        0, // 正解: broadly
        '"Industry analysts have ______[142] welcomed the announcement" という文で、直後に "however, some observers cautioned ..." という部分的な懸念が示されます。「概ね歓迎した（が例外もある）」というニュアンスを持つ副詞が必要であり、"broadly welcomed" は大多数が歓迎しつつ完全な合意ではないことを示す表現として適切です。',
        [2, 'Industry analysts have ______[142] welcomed the announcement, noting that automation in claims handling has lagged behind'],
      ),
    ],
  ),

  // ============================================================
  // 文書4: memo — 社内メモ: リモートワーク経費精算ポリシーの変更
  // 問番号: 143〜146  insertion=145
  // ============================================================
  p6Passage(
    4,
    'memo',
    'Updated Remote Work Expense Reimbursement Policy',
    [
      // 段落0
      [
        'To: All Employees\nFrom: Human Resources Department\nDate: August 7, 2026\n\nEffective September 15, 2026, Aldercroft Consulting Group will implement a revised policy governing the reimbursement of expenses ______[143] by employees who work remotely on a regular or occasional basis. This update reflects feedback gathered through the employee survey conducted in June and aligns our practices with current industry benchmarks.',
        '宛先：全従業員\n送信者：人事部\n日付：2026年8月7日\n\n2026年9月15日より、アルダークロフト・コンサルティング・グループは、定期的または臨時でリモートワークを行う従業員が発生させる経費の精算を管理する改定ポリシーを実施します。この更新は6月に実施した従業員アンケートで収集されたフィードバックを反映しており、当社の慣行を現在の業界標準に合わせるものです。',
      ],
      // 段落1
      [
        'Under the new policy, employees may claim reimbursement for internet connectivity costs up to a maximum of forty dollars per month, ______[144] that the connection is used primarily for work purposes. Claims for home office equipment, such as monitors and ergonomic chairs, will be considered on a case-by-case basis and must be pre-approved by the employee\'s direct supervisor before any purchase is made. ______[145] Employees seeking such an exception for documented business use must obtain approval before incurring the charge.',
        '新ポリシーの下では、従業員はインターネット接続費用について月額最大40ドルまでの精算を請求できます。ただし、その接続が主に業務目的で使用されていることが条件です。モニターやエルゴノミクスチェアなどのホームオフィス機器の請求については、購入前に直属の上司の事前承認を得た上で、個別に検討されます。携帯電話サービス料金は新ポリシーの対象外ですが、機器費用と同様に個別承認を得た場合は例外となります。業務利用を理由にこの例外を申請する従業員は、料金が発生する前に承認を得なければなりません。',
      ],
      // 段落2
      [
        'All reimbursement requests must be submitted ______[146] the expense management portal at expenses.aldercroft.example within thirty days of the expense being incurred. Requests submitted after this period will not be processed. Employees who have questions about the eligibility of specific expenses are encouraged to consult the full policy document, which is available on the company intranet, or to contact the HR Business Partner assigned to their department.',
        'すべての精算請求は、費用発生から30日以内に expenses.aldercroft.example の経費管理ポータルを通じて提出しなければなりません。この期間を過ぎて提出された請求は処理されません。特定の経費の対象可否について疑問がある従業員は、社内イントラネットで入手可能な完全版ポリシー文書を参照するか、所属部門に配属された HRビジネスパートナーにお問い合わせください。',
      ],
    ],
    [
      // No.143: 語形変化 — 後置修飾の分詞（incurred / incurring）
      // targetIndex for 143: (((143*13+5)^(143>>3))&3) = (((1859+5)^16)&3) = ((1864^16)&3) = (1880&3) = 0 → A
      // correctIndex=0 → shift=0
      p6q(
        143,
        'blank',
        [
          ['incurred', '過去分詞で受動の後置修飾を作ります。expenses（経費）は「従業員によって発生させられる」側であるため、受動を表す incurred が適切です。"expenses incurred by employees" は「従業員が発生させた経費」という標準的な経営・法律文書の表現です。'],
          ['incurring', '現在分詞で能動の後置修飾を作ります。"expenses incurring by employees" は文法的に不成立（能動分詞の後ろに by 句を置く構文はない）で、意味的にも不自然です。'],
          ['incur', '動詞の原形で、名詞の後置修飾には使用できません。英語では動詞原形を後置修飾として名詞の直後に置く構文は存在しません。'],
          ['incurrence', '名詞で、expenses という名詞の後に別の名詞を連続させると文法的に不整合が生じます。後続の by 句とも構造が合いません。'],
        ],
        0, // 正解: incurred
        '"expenses ______[143] by employees who work remotely" という構造で、expenses（経費）を後置修飾する分詞が必要です。経費は「従業員によって発生させられる」対象であり、受動を表す過去分詞 incurred が適切です。"expenses incurred by" は経費を示す公式文書の標準表現です。',
        [0, 'reimbursement of expenses ______[143] by employees who work remotely on a regular or occasional basis'],
      ),
      // No.144: 接続詞・条件表現 — "provided that"（〜という条件で）
      // targetIndex for 144: (((144*13+5)^(144>>3))&3) = (((1872+5)^16)&3) = ((1877^16)&3) = (1893&3) = 1 → B
      // correctIndex=0 → shift=1
      p6q(
        144,
        'blank',
        [
          ['provided', '"provided that" は「〜という条件で」という意味の接続詞表現で、補償請求の条件として「主に業務目的で使用されていること」という制限を導きます。ポリシー文書で条件付き権利を定める際に標準的に使われます。'],
          ['although', '"although that" という接続表現は成立せず、空所の直後の that と文法的につながりません。'],
          ['despite', '前置詞で「〜にもかかわらず」という譲歩を示します。「接続が主に業務目的であるにもかかわらず補償を請求できる」という意味になり、条件設定の文脈と矛盾します。'],
          ['unless', '「〜でない限り」という否定の条件を示す接続詞で、"unless the connection is used primarily for work" とすると「主に業務目的でない限り請求できる」という逆の条件になり、意図した内容と矛盾します。'],
        ],
        0, // 正解: provided
        '"employees may claim reimbursement ... ______[144] that the connection is used primarily for work purposes" という構造です。補償が認められるための前提条件を示す接続詞表現が必要で、"provided that"（〜という条件で）がポリシー文書における条件付き権利の付与に慣用的に使われます。',
        [1, 'up to a maximum of forty dollars per month, ______[144] that the connection is used primarily for work purposes'],
      ),
      // No.145: insertion — 携帯電話料金が対象外という情報
      // targetIndex for 145: (((145*13+5)^(145>>3))&3) = (((1885+5)^16)&3) = ((1890^16)&3) = (1906&3) = 2 → C
      // correctIndex=2 → shift=0
      p6q(
        145,
        'insertion',
        [
          ['Employees are encouraged to keep all receipts for a minimum of twelve months after submission.', '領収書の保管期間についての指示で、話題は関連しますが直前の「ホームオフィス機器の個別承認」の説明と直後の「携帯電話料金の扱い」という段落の流れには組み込まれず、段落末という位置にも収まりが悪いです。'],
          ['Supervisors must respond to pre-approval requests within five business days of receipt.', '上司の承認応答期限についての情報で、直前の「購入前に上司の事前承認を得ること」の文脈には関連しますが、段落の末尾位置では不完全な情報補足にとどまり、直後の段落（提出期限）へのつなぎとして自然ではありません。'],
          ['Mobile phone service charges are excluded from the new policy, except where individual approval has been granted, as with equipment costs.', '携帯電話料金の原則的な対象外扱いと個別承認による例外を示します。後続の "such an exception" がこの例外を直接受けるため、前後の結束が一意に成立します。'],
          ['The Human Resources Department will hold an information session on the new policy next month.', '情報セッションの告知で、段落末の位置としては関連しますが、直前の「ホームオフィス機器の個別承認」から「対象外項目の補足」へという本文の流れの中に置くよりも、文書の結びに近い段落に属する情報です。段落2の内容（提出ポータル）と順序が前後します。'],
        ],
        2, // 正解: Mobile phone service charges are excluded...
        '直前では機器費用の個別承認を説明し、直後の "such an exception" は個別承認による例外を指します。携帯電話料金の原則的な対象外扱いと承認例外を示す文だけが、この前方・後方の参照関係を同時に満たします。',
      ),
      // No.146: 前置詞 — 「ポータルを通じて」（through / via / by / with）
      // targetIndex for 146: (((146*13+5)^(146>>3))&3) = (((1898+5)^16)&3) = ((1903^16)&3) = (1919&3) = 3 → D
      // correctIndex=0 → shift=3
      p6q(
        146,
        'blank',
        [
          ['through', '「〜を通じて」という意味の前置詞で、"submitted through the expense management portal" は「経費管理ポータルを経由して提出する」という意味の慣用的な表現です。デジタルシステムを媒介とした提出手段を示す文脈に最も適合します。'],
          ['throughout', '「〜を通じて・〜中ずっと」という意味の前置詞・副詞で、期間や場所の全体に広がることを示します。ポータルという単一のシステムを経由することを示す文脈には合いません。'],
          ['thereby', '副詞で「それによって」という結果・手段を示しますが、前置詞ではないため後続の名詞句（the expense management portal）を直接修飾できません。'],
          ['thereof', '副詞・前置詞で「それの・それに関して」という意味ですが、一般的なビジネス文書において特定の提出経路を示す文脈では使われません。'],
        ],
        0, // 正解: through
        '"All reimbursement requests must be submitted ______[146] the expense management portal" という構造で、経費管理ポータルという特定のデジタルシステムを「経由して」提出することを示す前置詞が必要です。"submitted through" は書類・データをシステムや窓口を経由して提出する場合の慣用的な表現です。',
        [2, 'All reimbursement requests must be submitted ______[146] the expense management portal at expenses.aldercroft.example within thirty days'],
      ),
    ],
  ),
];
