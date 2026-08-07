/**
 * test-03 Part 7 単一文書（single）10セット・No.147〜175
 *
 * すべてオリジナル問題。ETS / IIBC 著作物の転載はしない。
 * 人名・社名は架空、メールドメイン・URL は .example。
 */

import { q, passage, messages } from './helpers';
import type { Part7Set } from '../../src/schemas/question.schema';

// ============================================================
// セット1 — email: 建築設計事務所から施主への設計変更承認依頼（No.147–148）
// ============================================================
const s1 = passage(
  't03-s1-email',
  'email',
  'Design Revision Approval Request — Hartwell Residence',
  [
    [
      'Dear Mr. and Mrs. Hartwell, I am writing to request your formal approval of the structural modifications outlined in Revision Set C, which our engineering consultants have determined to be necessary following the geotechnical assessment conducted on March 12.',
      'ハートウェル様ご夫妻、3月12日に実施された地盤調査の結果を受けて、弊社の構造エンジニアが必要と判断した改訂セットCに記載の構造変更について、正式なご承認をお願いするためにご連絡差し上げます。',
    ],
    [
      'The primary change concerns the foundation system: we propose replacing the originally specified shallow spread footings with a driven-pile foundation extending to a depth of twelve metres, which will adequately transfer the building loads to the competent bearing stratum identified below the fill layer. Additionally, the ground-floor slab thickness is to be increased from 150 mm to 225 mm to accommodate the revised load distribution. These amendments will add approximately eight working days to the construction schedule and increase the foundation contract value by $34,800, a figure that has been reviewed and endorsed by your quantity surveyor, Ms. Patricia Obi.',
      '主な変更点は基礎システムに関するものです。当初仕様の浅い直接基礎を、埋め立て層の下に確認された支持力のある地層まで荷重を伝達できる深さ12メートルの打込み杭基礎に変更することを提案します。また、改訂された荷重分散に対応するため、1階スラブの厚さを150ミリから225ミリに増加します。これらの修正により、工期は約8営業日延長され、基礎工事の契約金額は34,800ドル増加します。この金額については、担当数量積算士のパトリシア・オビ氏が確認・承認済みです。',
    ],
    [
      'Kindly review the enclosed drawings—sheets S-04 through S-07 of Revision Set C—and return the signed Client Approval Form by April 4 so that we may place the pile subcontract order without further delay. Should you have any questions or wish to arrange a meeting to discuss the implications of these changes, please do not hesitate to contact me directly at the number below.',
      '同封の図面（改訂セットCのS-04からS-07シート）をご確認のうえ、杭工事の下請発注を遅滞なく進められるよう、4月4日までに署名済みの施主承認書をご返送ください。変更内容の影響について質問がある場合、またはご説明の機会をご希望の場合は、下記番号まで直接ご連絡ください。',
    ],
    [
      'Yours sincerely, Daniel Voss, Principal Architect, Voss & Mercer Design Associates',
      'ダニエル・フォス　主任建築士　フォス＆マーサーデザインアソシエイツ',
    ],
  ],
  { from: 'Daniel Voss, Voss & Mercer Design Associates', to: 'Mr. and Mrs. Hartwell' },
);

// ============================================================
// セット2 — article: 港湾ターミナルの荷役自動化導入（No.149–151）
// ============================================================
const s2 = passage(
  't03-s2-article',
  'article',
  'Automated Cargo Handling Reshapes Port Operations at Kelford Terminal',
  [
    [
      'KELFORD — Kelford Maritime Terminal has become the first facility on the eastern seaboard to deploy a fully integrated automated container-handling system across all three of its deepwater berths, a transition that management says has cut average vessel turnaround time by 31 percent since the system reached full operational capacity in February. [1] The installation, carried out over fourteen months by Dutch logistics-technology firm Portronix B.V., encompasses an array of laser-guided straddle carriers, automated stacking cranes, and a centralised traffic-management platform that coordinates container movements in real time. [2]',
      'ケルフォード — ケルフォード海運ターミナルは、東海岸初の施設として、3つすべての深水バースに完全統合型自動コンテナ荷役システムを導入しました。同システムが2月に本格稼働して以来、平均船舶折り返し時間が31パーセント短縮されたと経営陣は述べています。[1] オランダの物流テクノロジー企業ポートロニクスB.V.が14か月かけて設置したこのシステムは、レーザー誘導式ストラドルキャリア、自動スタッキングクレーン、そしてコンテナの動きをリアルタイムで調整する集中型交通管理プラットフォームで構成されています。[2]',
    ],
    [
      '[3] Critics, however, caution that the productivity gains come at a significant social cost. The Kelford Dockworkers Union reports that 214 of its members have been displaced since the phased rollout began, and union president Angela Mwangi argues that the terminal operator\'s retraining programme—which covers forklift certification and basic data-entry skills—is wholly inadequate preparation for the technical roles that remain. [4] Terminal director Mark Sorensen acknowledges the displacement but contends that the long-term competitiveness of the port, which handles roughly 40 percent of the region\'s container throughput, made modernisation unavoidable.',
      '[3] しかし批判派は、生産性向上が大きな社会的コストを伴うと警告しています。ケルフォード埠頭労働組合によると、段階的導入が始まって以来214名の組合員が職を失っており、組合長のアンジェラ・ムワンギ氏は、ターミナル運営会社の再教育プログラム（フォークリフト資格取得と基本的なデータ入力スキルが対象）は、残存する技術的職種への準備として全く不十分だと主張しています。[4] ターミナル長のマーク・ソーレンセン氏は雇用喪失を認めつつも、地域のコンテナ輸送量の約40パーセントを取り扱うこの港の長期的競争力にとって、近代化は避けられなかったと主張しています。',
    ],
    [
      'A feasibility study commissioned by the Regional Ports Authority and released last week suggests that two further terminals in the region are likely to follow Kelford\'s lead within five years, provided that capital financing conditions remain favourable and pending environmental-impact assessments are resolved without material conditions being imposed.',
      '地域港湾局が発注し先週公表された実現可能性調査によれば、資本調達条件が良好なままであり、審査中の環境影響評価が実質的な条件なしに解決されれば、地域の他の2つのターミナルが5年以内にケルフォードの先例に続く可能性が高いとしています。',
    ],
  ],
  { hasInsertionMarkers: true },
);

// ============================================================
// セット3 — notice: 空港ラウンジ改装に伴う一時利用制限の告知（No.152–154）
// ============================================================
const s3 = passage(
  't03-s3-notice',
  'notice',
  'Temporary Modification of Lounge Access — Concourse D Premier Lounge',
  [
    [
      'Effective June 1 through August 31, access to the Concourse D Premier Lounge will be subject to modified eligibility criteria as a consequence of the scheduled refurbishment of the lounge\'s east wing, which will temporarily reduce usable seating capacity by approximately 60 percent. During this period, access will be restricted to passengers holding a current Skyreach Platinum or Titanium membership, or those travelling in a confirmed business- or first-class cabin on an international itinerary departing from Concourse D.',
      '6月1日から8月31日まで、ラウンジの東翼改装工事によって使用可能な座席が約60パーセント一時的に減少するため、コンコースDプレミアラウンジの利用資格が変更されます。この期間中、利用はスカイリーチプラチナまたはチタニウム会員資格をお持ちの方、またはコンコースDから出発する国際線のビジネスクラスもしくはファーストクラスの確定座席でご搭乗の方に限定されます。',
    ],
    [
      'Passengers who hold Skyreach Gold membership or who access the lounge on a day-pass basis will not be admitted to Concourse D Premier Lounge for the duration of the refurbishment. These guests are encouraged to utilise the Concourse B Horizon Lounge, which offers comparable dining and shower facilities and is accessible via the inter-terminal transit system without the need to re-clear security. Complimentary transit vouchers valid for same-day use are available at the Concourse D information desk.',
      'スカイリーチゴールド会員またはデイパス利用でラウンジを利用される方は、改装期間中はコンコースDプレミアラウンジへのご入場はできません。これらのお客様は、同等のダイニング・シャワー設備を備え、保安検査の再通過なしにターミナル間移動システムでアクセスできるコンコースBホライゾンラウンジのご利用をお勧めします。当日有効の無料交通券はコンコースD案内デスクにてお受け取りください。',
    ],
    [
      'The east wing renovation will introduce twelve additional private sleeping pods, an expanded premium dining area featuring three new cuisine stations, and a dedicated videoconferencing suite equipped with high-definition screens and soundproofed partitions. The fully restored lounge is expected to reopen on September 1, subject to final contractor inspections. We appreciate your understanding and regret any inconvenience this temporary arrangement may cause.',
      '東翼のリノベーションにより、12のプライベート仮眠ポッドの追加、3つの新しい料理ステーションを備えた拡張プレミアムダイニングエリア、高解像度スクリーンと防音パーティションを備えた専用ビデオ会議スイートが設けられます。改修後のラウンジは、最終的な施工業者検査を経て9月1日に再オープンする予定です。この一時的な措置によるご不便をお詫び申し上げ、ご理解に感謝いたします。',
    ],
  ],
);

// ============================================================
// セット4 — online_chat: 法務チームのライセンス契約レビュー（No.155–157）
// ============================================================
const s4 = messages(
  't03-s4-chat',
  'online_chat',
  'Legal Team Chat — Vendor License Agreement Review',
  [
    ['Priya Nair', '9:04 AM', 'Good morning, everyone. I\'ve finished my initial pass through the Dynacor license agreement. There are two clauses I think we need to flag before we give procurement the green light.', 'おはようございます、皆さん。ダイナコアのライセンス契約書の最初の確認が終わりました。調達部門にゴーサインを出す前に確認が必要な条項が2つあります。'],
    ['Tom Eriksson', '9:07 AM', 'Morning, Priya. What are we looking at?', 'おはよう、プリヤ。どんな内容ですか？'],
    ['Priya Nair', '9:09 AM', 'First, clause 8.3 gives Dynacor the right to audit our usage data with only 48 hours\' notice. That\'s far shorter than the 30-day window we accepted in our last three vendor contracts. Second, clause 12 defines "derivative works" so broadly that any internal tool we build on top of their API could be claimed as their intellectual property.', '1つ目、第8.3条でダイナコアは48時間前の通知のみで使用データを監査する権利を持ちます。これは直近3件のベンダー契約で認めた30日間の猶予よりもはるかに短い。2つ目、第12条が「二次的著作物」を非常に広く定義しており、そのAPIを基に構築した社内ツールが同社の知的財産として主張される可能性があります。'],
    ['Reiko Tanaka', '9:12 AM', 'The derivative works issue is the more serious one in my view. I\'ve seen two competitors run into exactly that problem and end up paying licensing fees on tools they built themselves.', '私の見解では、二次的著作物の問題の方が深刻です。まったく同じ問題に直面した競合他社2社が、自社で構築したツールにライセンス料を支払う羽目になった事例を知っています。'],
    ['Tom Eriksson', '9:14 AM', 'Agreed. Can we propose carve-out language that limits the definition to works that incorporate their actual source code rather than merely calling the API?', '同意します。実際のソースコードを組み込んだものに限定し、単にAPIを呼び出すだけの場合は除外するよう定義を絞り込む文言を提案できますか？'],
    ['Priya Nair', '9:17 AM', 'That\'s exactly what I had in mind. I\'ll draft a redline for both clauses and circulate it this afternoon. Reiko, would you be able to review the draft before I send it to Dynacor\'s legal counsel?', 'まさにそれを考えていました。両方の条項の修正案（レッドライン）を作成し、今日の午後に回覧します。レイコ、ダイナコアの法律顧問に送る前にドラフトを確認していただけますか？'],
    ['Reiko Tanaka', '9:19 AM', 'Of course. Ping me when it\'s ready. I\'m in back-to-back meetings until noon, but I\'ll look at it first thing after lunch.', 'もちろんです。準備ができたら連絡してください。午前中は連続した会議がありますが、昼食後すぐに確認します。'],
  ],
);

// ============================================================
// セット5 — letter: 学術誌編集部から研究者への査読依頼レター（No.158–160）
// ============================================================
const s5 = passage(
  't03-s5-letter',
  'letter',
  'Peer Review Invitation — Journal of Applied Organisational Behaviour',
  [
    [
      'Dear Dr. Nakamura, I am writing on behalf of the Editorial Board of the Journal of Applied Organisational Behaviour (JAOB) to invite you to serve as a peer reviewer for a manuscript currently under consideration for publication. The manuscript, submitted under the reference number JAOB-2026-0441, presents empirical findings on the relationship between hybrid work adoption rates and self-reported employee burnout across five industry sectors in Southeast Asia.',
      '中村博士、私はジャーナル・オブ・アプライド・オーガニゼーショナル・ビヘイビア（JAOB）編集委員会を代表して、現在掲載検討中の原稿の査読者としてご参加いただくよう依頼するためにご連絡差し上げます。参照番号JAOB-2026-0441として提出されたこの原稿は、東南アジアの5つの産業セクターにわたるハイブリッドワーク導入率と従業員の自己申告によるバーンアウトの関係に関する実証的知見を提示しています。',
    ],
    [
      'We have identified you as a prospective reviewer based on your recent publications in the domains of occupational well-being measurement and cross-cultural organisational research, and we believe your expertise is particularly well-suited to evaluate both the methodological rigour of the study design and the contextual validity of its conclusions. Given your breadth of knowledge in this area, we are confident you would provide a thorough and constructive assessment.',
      '職業的ウェルビーイング測定および異文化組織研究の分野における最近のご研究に基づき、中村博士を候補査読者として特定いたしました。研究設計の方法論的厳密性と結論の文脈的妥当性の両方を評価するために、博士の専門知識が特に適していると考えております。この分野における幅広い知識をお持ちであることから、徹底的かつ建設的な評価をご提供いただけると確信しています。',
    ],
    [
      'Should you agree to undertake the review, we would request that you submit your evaluation through the JAOB editorial management portal no later than August 29. The review guidelines and a link to the anonymised manuscript will be sent to you upon confirmation of your acceptance. If you anticipate that the timeline presents a difficulty, or if you identify a potential conflict of interest that would preclude your participation, please inform us within five business days so that we may approach an alternative reviewer without undue delay.',
      '査読をお引き受けいただける場合、8月29日までにJAOB編集管理ポータルを通じて評価をご提出いただくようお願いします。査読ガイドラインおよび匿名化された原稿へのリンクは、ご承諾確認後にお送りします。スケジュールに支障をきたす可能性がある場合、またはご参加を妨げる利益相反の可能性がある場合は、代替査読者への打診を遅滞なく行えるよう、5営業日以内にお知らせください。',
    ],
    [
      'We sincerely hope you will be able to contribute to the review process and look forward to your prompt response. Yours faithfully, Professor Helena Brandt, Editor-in-Chief, Journal of Applied Organisational Behaviour',
      '査読プロセスへのご参加をいただけることを切に願い、早急なご回答をお待ちしております。敬具　ヘレナ・ブラント教授　編集長　ジャーナル・オブ・アプライド・オーガニゼーショナル・ビヘイビア',
    ],
  ],
  { from: 'Professor Helena Brandt, Editor-in-Chief, JAOB', to: 'Dr. Nakamura' },
);

// ============================================================
// セット6 — advertisement: 経営幹部向けエグゼクティブ・コーチングプログラム（No.161–163）
// ============================================================
const s6 = passage(
  't03-s6-ad',
  'advertisement',
  'Pinnacle Executive Coaching Programme',
  [
    [
      'The Pinnacle Executive Coaching Programme is an intensive, twelve-month engagement designed exclusively for C-suite leaders and senior vice presidents whose organisations generate annual revenues in excess of fifty million dollars. Participants must currently hold a position that carries direct profit-and-loss accountability and must have completed at least five years of executive-level service prior to enrolment. The programme is limited to sixteen participants per cohort in order to ensure that each individual receives the depth of personalised attention that transformational leadership development demands.',
      'ピナクル・エグゼクティブ・コーチング・プログラムは、年間売上高5000万ドルを超える組織に在籍するCスイート幹部およびシニア・バイスプレジデント専用の、12か月にわたる集中的な研修です。受講者は、直接的な損益責任を担う役職に現在就いており、受講開始前に少なくとも5年間の経営幹部経験があることが条件です。変革型リーダーシップの育成に必要な十分な個別対応を確保するため、各コホートの定員は16名に限定されています。',
    ],
    [
      'Each participant is paired with a dedicated senior coach who brings no fewer than twenty years of boardroom experience across multiple industries. The curriculum encompasses twenty-four one-on-one coaching sessions distributed evenly over the programme year, supplemented by four half-day strategic workshops conducted at our London headquarters. A comprehensive 360-degree leadership assessment tool is administered at the outset and again at the programme\'s midpoint, providing data-driven benchmarks against which each participant\'s progress can be objectively measured. Participants are also granted access to our proprietary digital platform, where they may engage in asynchronous reflection exercises and download curated research briefs between sessions.',
      '各参加者には、複数の業界で20年以上の取締役会経験を持つ専任シニアコーチが付きます。カリキュラムには、12か月のプログラム期間を通じて均等に配置された24回の1対1コーチングセッションが含まれ、ロンドン本部で開催される4回の半日戦略ワークショップがこれを補完します。包括的な360度リーダーシップ評価は開始時と中間時点に実施され、各参加者の進捗を客観的に測定するためのデータに基づく基準を提供します。参加者は独自のデジタルプラットフォームも利用でき、セッション間に非同期の振り返り演習に取り組んだり、厳選された調査報告書をダウンロードしたりできます。',
    ],
    [
      'Applications for the September cohort must be submitted no later than 31 July via the secure online portal at www.pinnaclecoaching.example/apply. Each application requires a current curriculum vitae, a letter of endorsement from the applicant\'s board chair or equivalent governance authority, and a personal statement of no more than five hundred words outlining the specific leadership challenges the applicant seeks to address. Shortlisted candidates will be invited to a thirty-minute preliminary interview conducted by telephone or video conference. For enquiries regarding programme eligibility or the application procedure, please contact our Participant Relations team at enrolments@pinnaclecoaching.example or on +44 20 7946 0382.',
      '9月コホートへの申請は、7月31日までにwww.pinnaclecoaching.example/applyのセキュアなオンラインポータルから提出してください。各申請には、最新の履歴書、申請者の取締役会長または同等のガバナンス機関からの推薦状、および申請者が取り組もうとしている具体的なリーダーシップ課題を概説した500語以内の志望理由書が必要です。書類選考を通過した候補者は、電話またはビデオ会議による30分間の予備面接に招待されます。プログラムの資格や申請手続きに関するお問い合わせは、enrolments@pinnaclecoaching.exampleまたは+44 20 7946 0382にてParticipant Relationsチームにご連絡ください。',
    ],
  ],
);

// ============================================================
// セット7 — receipt: 技術翻訳サービスの領収書（No.164–166）
// ============================================================
const s7 = passage(
  't03-s7-receipt',
  'receipt',
  'LinguaTech Professional Translation Services — Invoice & Receipt',
  [
    [
      'Issued to: Hartwell & Morgenstern LLP, 14 Aldgate Square, London EC3N 1AB. Client Reference: HM-2024-0891. Service Description: Certified translation of one (1) patent specification document from German (source) into English (target), comprising 9,240 source words as verified by the proprietary word-count audit conducted prior to commencement of work. Translation was completed by a subject-matter specialist holding formal qualifications in intellectual property law and a minimum of ten years\' experience in German-to-English patent translation. The completed translation carries LinguaTech\'s Certified Accuracy Seal, which is recognised by the European Patent Office and the Intellectual Property Office of the United Kingdom.',
      '発行先：Hartwell & Morgenstern LLP、14 Aldgate Square、London EC3N 1AB。クライアント参照番号：HM-2024-0891。サービス内容：特許明細書1件のドイツ語（原文）から英語（訳文）への認証翻訳。作業開始前に独自の文字数監査により確認された原文語数は9,240語です。翻訳は、知的財産法の正式な資格を持ち、ドイツ語から英語への特許翻訳において最低10年の経験を有する専門家によって完了されました。完成した翻訳には、欧州特許庁および英国知的財産庁に認められたLinguaTechの認証精度シールが付与されています。',
    ],
    [
      'Fee Breakdown: Base translation fee (9,240 words at £0.18 per word): £1,663.20. Priority processing surcharge (48-hour turnaround, applied at 35% of base fee): £582.12. Terminology consistency review and glossary compilation: £210.00. Notarisation of translator\'s declaration: £75.00. Total amount due: £2,530.32. Payment was received in full on 14 November 2024 by bank transfer. VAT is not applicable to certified legal translation services under the provisions of HMRC Notice 701/57.',
      '料金内訳：基本翻訳料（9,240語 × £0.18/語）：£1,663.20。優先処理追加料金（48時間納期、基本料金の35%）：£582.12。用語整合性レビューおよび用語集作成：£210.00。翻訳者宣言の公証：£75.00。合計請求額：£2,530.32。2024年11月14日に銀行振込にて全額受領済み。認証法律翻訳サービスには、HMRC通知701/57の規定に基づきVATは適用されません。',
    ],
    [
      'Terms and Conditions: In the event that the client identifies a demonstrable error of substance attributable to the translator within ninety days of receipt of the completed document, LinguaTech will undertake a full revision at no additional charge. This guarantee does not extend to stylistic preferences or to alterations requested by a third party following delivery. Refunds will not be issued once work has commenced; however, if LinguaTech is unable to meet the agreed delivery deadline through circumstances within its control, the priority processing surcharge will be waived in full. All source materials submitted to LinguaTech are handled in strict accordance with our Data Processing Agreement, copies of which are available upon request.',
      '利用規約：完成した文書の受領から90日以内に、翻訳者に帰すべき実質的な誤りが確認された場合、LinguaTechは追加料金なしで全面改訂を行います。この保証は、文体上の好みや納品後に第三者から要請された修正には適用されません。作業開始後は返金されません。ただし、LinguaTechの管理下にある事情により合意した納期を守れない場合は、優先処理追加料金が全額免除されます。LinguaTechに提出されたすべての原資料は、当社のデータ処理契約に厳密に従って取り扱われます。コピーはご要望に応じてご提供します。',
    ],
  ],
);

// ============================================================
// セット8 — web_page: 建材サステナビリティ認証FAQページ（No.167–169）
// ============================================================
const s8 = passage(
  't03-s8-web',
  'web_page',
  'GreenBuild Certification Authority — Frequently Asked Questions',
  [
    [
      'Q: What is the GreenBuild Materials Certification, and which organisations are eligible to apply? A: The GreenBuild Materials Certification is an independent third-party accreditation scheme that verifies the environmental performance of construction materials across the full product lifecycle, from raw material extraction through manufacture, distribution, installation, and end-of-life disposal. Eligibility is open to any manufacturer or importer of construction materials that has been trading continuously for a minimum of three years and can demonstrate compliance with the applicable ISO 14001 environmental management standard or its regional equivalent. Distributors and retailers are not eligible to apply directly; certification must be sought by the entity that controls the production process.',
      'Q: GreenBuild建材認証とは何ですか？どの組織が申請資格を持ちますか？A: GreenBuild建材認証は、原材料採掘から製造・流通・施工・廃棄に至る製品ライフサイクル全体にわたって建築材料の環境パフォーマンスを検証する、独立した第三者認定制度です。申請資格は、最低3年間継続して取引を行っており、ISO 14001環境マネジメント規格またはその地域同等規格への準拠を証明できる建築材料の製造業者または輸入業者に開かれています。流通業者や小売業者は直接申請する資格がなく、認証は生産プロセスを管理する主体が申請しなければなりません。',
    ],
    [
      'Q: How long does the certification process take, and what does it cost? A: From the point at which a completed application is received, the standard assessment pathway requires between fourteen and twenty weeks, depending on the complexity of the product range under review and the availability of laboratory test data. Applicants who engage an approved pre-assessment consultant prior to submission may reduce this timeline by up to four weeks. The non-refundable application fee is £1,800 for organisations with annual revenues below £10 million and £3,400 for larger organisations. These fees cover the administrative review and a single site inspection; if a second inspection is required as a result of non-conformances identified during the first visit, an additional fee of £650 will apply. All fees are exclusive of VAT.',
      'Q: 認証プロセスにはどのくらいの時間がかかりますか？費用はどれくらいですか？A: 完全な申請書が受領されてから、標準評価経路では14〜20週間を要します。この期間は、審査対象製品群の複雑さや試験データの入手可能性によって異なります。提出前に認定された事前評価コンサルタントを利用した申請者は、最大4週間短縮できます。年間収益が1000万ポンド未満の組織には£1,800、それ以上の組織には£3,400の返金不可の申請手数料がかかります。この手数料には、行政審査と1回の現地検査が含まれます。最初の訪問で特定された不適合の結果として2回目の検査が必要な場合、追加料金£650が適用されます。すべての料金はVAT別です。',
    ],
    [
      'Q: How long is a GreenBuild certificate valid, and under what circumstances can it be revoked? A: A certificate is valid for three years from the date of issue. During this period, certificate holders are required to submit an annual self-declaration confirming that no material changes have been made to the certified product\'s formulation, manufacturing process, or supply chain. Failure to submit the self-declaration within thirty days of the anniversary date will result in automatic suspension of the certificate. Revocation may also be initiated by the GreenBuild Authority if a post-market surveillance audit reveals evidence of systematic non-compliance or if the certificate holder is found to have provided false or misleading information at any stage of the application or renewal process. Renewal applications must be submitted no later than twelve weeks before the expiry date.',
      'Q: GreenBuild認証の有効期間はどのくらいですか？どのような状況で取り消されますか？A: 証明書は発行日から3年間有効です。この期間中、証明書保有者は、認証された製品の処方・製造プロセス・サプライチェーンに重要な変更が行われていないことを確認する年次自己申告書を提出する必要があります。記念日から30日以内に自己申告書を提出しない場合、証明書は自動的に停止されます。市販後監視監査で組織的な不適合の証拠が明らかになった場合、または証明書保有者が申請や更新プロセスのいずれかの段階で虚偽または誤解を招く情報を提供したことが判明した場合も、GreenBuild機構によって取り消しが開始されることがあります。更新申請は有効期限の12週前までに提出する必要があります。',
    ],
  ],
);

// ============================================================
// セット9 — form: 研究助成審査結果通知フォーム（No.170–172）
// ============================================================
const s9 = passage(
  't03-s9-form',
  'form',
  'Meridian Research Foundation — Grant Assessment Outcome Notification',
  [
    [
      'Applicant Name: Dr. Priya Subramaniam. Affiliated Institution: Department of Computational Linguistics, Westbrook University. Application Reference: MRF-2025-RL-0047. Programme: Frontier Research in Language Technology (Cycle 7). Assessment Outcome: CONDITIONAL AWARD. The Review Panel has determined that the application demonstrates sufficient scientific merit to warrant funding, subject to the conditions set out in the section below. The Panel notes in particular the methodological rigour of the proposed experimental design and the potential for translational impact within the field of low-resource language processing. The awarded amount is GBP 148,000, representing a reduction of GBP 22,000 from the sum originally requested, as the Panel concluded that the budget allocation for conference travel was disproportionate relative to the core research objectives.',
      '申請者名：Priya Subramaniam博士。所属機関：ウェストブルック大学計算言語学科。申請参照番号：MRF-2025-RL-0047。プログラム：言語技術フロンティア研究（サイクル7）。審査結果：条件付き採択。審査委員会は、申請が以下のセクションに記載された条件に従い、資金援助に値する十分な科学的メリットを示していると判断しました。委員会は特に、提案された実験設計の方法論的厳密性と、低リソース言語処理分野における研究成果の実用化可能性を評価しています。採択額はGBP 148,000で、これは当初申請額からGBP 22,000削減されたものです。委員会は学会出張の予算配分が中核的な研究目標に対して不均衡であると判断しました。',
    ],
    [
      'Conditions of Award: (1) The principal investigator must submit a revised budget plan, incorporating the reduced conference travel allocation, for written approval by the Foundation\'s Finance Committee within forty-five days of receipt of this notification. (2) Interim progress reports must be submitted at six-month intervals throughout the project duration, using the standardised reporting template available on the Foundation\'s secure portal. (3) Any expenditure on equipment items individually valued in excess of GBP 5,000 requires prior written approval from the Programme Director and must be accompanied by a minimum of two competitive quotations. (4) All publications arising from this award must acknowledge Meridian Research Foundation funding and must be deposited in an open-access repository within twelve months of acceptance.',
      '採択条件：(1) 主任研究者は、この通知の受領から45日以内に、削減された学会出張費の配分を組み込んだ修正予算計画を、財団の財務委員会による書面承認のために提出する必要があります。(2) プロジェクト期間を通じて、財団のセキュアポータルで入手できる標準化された報告書テンプレートを使用して、6か月ごとに中間進捗報告書を提出する必要があります。(3) 1点あたりGBP 5,000を超える機器への支出には、プログラムディレクターの事前書面承認が必要であり、2件以上の相見積もりを添付しなければなりません。(4) この採択から生まれるすべての出版物は、メリディアン研究財団の資金援助を謝辞に明記し、受理から12か月以内にオープンアクセスリポジトリに登録しなければなりません。',
    ],
    [
      'Appeals Procedure: An applicant who disputes the outcome of the assessment or the conditions attached to an award may submit a formal appeal within twenty-eight days of the date of this notification. Appeals must be submitted in writing to the Foundation\'s Independent Appeals Officer at appeals@meridianresearch.example and must set out the specific grounds on which the decision is contested, with reference to the published assessment criteria. Appeals submitted on the sole grounds of personal dissatisfaction with the outcome, without substantive reference to procedural irregularity or factual error, will not be admitted for review. The Independent Appeals Officer will acknowledge receipt within five working days and will issue a determination within sixty days of the appeal\'s admission.',
      '異議申立手続き：審査結果または採択に付された条件に異議を申し立てる申請者は、この通知の日付から28日以内に正式な異議申立書を提出することができます。異議申立書は財団の独立異議申立オフィサーにappeals@meridianresearch.exampleへ書面で提出しなければならず、公表された審査基準に言及しながら決定に異議を唱える具体的な根拠を明示する必要があります。手続き上の不規則性または事実上の誤りへの実質的な言及なしに、結果への個人的な不満のみを根拠とした異議申立は、審査対象として受け付けられません。独立異議申立オフィサーは5営業日以内に受領を確認し、異議申立の受理から60日以内に判断を下します。',
    ],
  ],
);

// ============================================================
// セット10 — memo: 内部監査部門からのデータガバナンス是正メモ（No.173–175）
// ============================================================
const s10 = passage(
  't03-s10-memo',
  'memo',
  'Internal Memorandum — Data Governance Corrective Action Notice',
  [
    [
      'TO: All Departmental Heads, Regional Operations Directors. FROM: Office of Internal Audit and Compliance, Vantara Group. DATE: 29 October 2025. SUBJECT: Mandatory Corrective Actions Following Q3 Data Governance Audit. This memorandum is issued pursuant to the findings of the third-quarter data governance audit conducted between 1 September and 15 October 2025 across all Vantara Group business units. The audit was commissioned in response to a heightened regulatory environment following the European Data Standards Authority\'s issuance of revised binding guidelines in July of this year. Departmental heads are required to treat the matters identified below as urgent and to ensure full compliance within the timelines specified.',
      '宛先：全部門長、地域業務ディレクター。差出人：ヴァンタラグループ内部監査・コンプライアンス室。日付：2025年10月29日。件名：第3四半期データガバナンス監査後の必須是正措置。この覚書は、2025年9月1日から10月15日にかけて全ヴァンタラグループ事業部門を対象として実施された第3四半期データガバナンス監査の所見に基づき発行されます。本監査は、欧州データ標準局が今年7月に改訂された拘束力のあるガイドラインを発行したことを受けた規制環境の高まりに応答して実施されました。部門長は以下に特定された事項を緊急に扱い、指定された期限内に完全準拠を確保することが求められます。',
    ],
    [
      'The audit identified three categories of non-compliance requiring immediate remediation. First, system access credentials were found to have been shared between individuals in eleven separate instances across four departments, in direct contravention of Vantara\'s Access Control Policy, Version 4.2. Each affected department must conduct an immediate review of all active user accounts, revoke shared credentials without exception, and submit a certified confirmation of completion to the Compliance Office. Second, data retention schedules are not being observed uniformly: records subject to a mandatory three-year retention limit were identified in six departmental archives at ages ranging from four to seven years beyond the required disposal date. Departments holding overdue records must schedule destruction in accordance with the Secure Disposal Protocol and provide documentary evidence of disposal within thirty days. Third, the audit established that client financial data stored on portable devices within the Logistics and Procurement divisions had not been encrypted in accordance with the requirements of Section 7.3 of the Information Security Standard. Encryption must be implemented across all affected devices within fifteen days.',
      '監査では、即時改善を要する3つのカテゴリーの非準拠が確認されました。第一に、ヴァンタラのアクセス制御ポリシーバージョン4.2に直接違反する形で、4部門にわたる11の個別事例でシステムアクセス認証情報が個人間で共有されていたことが判明しました。影響を受けた各部門は、全アクティブユーザーアカウントの即時審査を実施し、例外なく共有認証情報を失効させ、完了の認定確認書をコンプライアンス室に提出する必要があります。第二に、データ保持スケジュールが均一に遵守されていません：3年間の強制保持期限の対象となる記録が、6つの部門アーカイブで必要廃棄日から4〜7年を超えた状態で確認されました。期限超過記録を保有する部門は、セキュア廃棄プロトコルに従って廃棄を予定し、30日以内に廃棄の文書証拠を提出する必要があります。第三に、物流・調達部門内の携帯デバイスに保存されたクライアント財務データが、情報セキュリティ標準第7.3条の要件に従って暗号化されていないことが監査で確認されました。影響を受けるすべてのデバイスに15日以内に暗号化を実装する必要があります。',
    ],
    [
      'All corrective actions must be completed and formally reported to the Compliance Office no later than 28 November 2025. Confirmation of completion must be submitted via the Internal Audit Portal using the Corrective Action Response Form (reference: CARF-DG-2025). Departments that fail to achieve full compliance by the stated deadline will be referred to the Group Executive Committee, which is empowered to impose operational restrictions on non-compliant units pending resolution. Departmental heads who require clarification on any aspect of these requirements are encouraged to schedule a consultation with the assigned Compliance Business Partner for their division prior to 14 November. Please be advised that a follow-up verification audit will be conducted in January 2026 to confirm the adequacy of the remediation measures implemented.',
      'すべての是正措置は、2025年11月28日までに完了し、コンプライアンス室に正式に報告する必要があります。完了の確認は、是正措置対応フォーム（参照：CARF-DG-2025）を使用して内部監査ポータルから提出する必要があります。定められた期限までに完全準拠を達成できなかった部門は、グループ執行委員会に付託されます。同委員会は、解決保留中の非準拠部門に業務制限を課す権限を持っています。これらの要件のいずれかの側面について説明が必要な部門長は、11月14日前に担当部門のコンプライアンス・ビジネス・パートナーとの相談を予定することを推奨します。なお、実施された改善措置の適切性を確認するためのフォローアップ検証監査が2026年1月に実施されることをご承知おきください。',
    ],
  ],
);

// ============================================================
// エクスポート
// ============================================================
export const singleSets: Part7Set[] = [
  // ---- セット1: email（No.147–148） ----
  {
    setType: 'single',
    passages: [s1],
    questions: [
      q(
        147,
        'main_idea',
        'What is the primary purpose of this e-mail?',
        'このメールの主な目的は何ですか。',
        [
          [
            'To inform the client that construction has been completed ahead of schedule',
            '工事完了の事前通知という内容は本文にありません。メールは施工前の変更承認を求める内容です。',
          ],
          [
            'To seek the client\'s authorisation for engineering changes to the foundation design',
            'メール冒頭に「改訂セットCに記載の構造変更について正式なご承認をお願いする」と目的が明示されており、基礎設計の変更承認を求めることが主目的です。',
          ],
          [
            'To provide a final cost summary for the Hartwell Residence project',
            'コスト変更は第2段落で言及されていますが、それはあくまで変更内容の説明の一部であり、「最終コスト概要」を提供することが目的ではありません。',
          ],
          [
            'To introduce a new quantity surveyor who will be overseeing the project',
            '数量積算士のパトリシア・オビ氏はコスト確認者として言及されているにとどまり、紹介が目的ではありません。',
          ],
        ],
        1,
        'メールの冒頭でフォス氏は「改訂セットCに記載の構造変更について正式なご承認をお願いする」と目的を明示しており、本文全体が地盤調査を根拠とした基礎変更の承認依頼に終始しています。',
        [
          ['t03-s1-email', 0, 'I am writing to request your formal approval of the structural modifications outlined in Revision Set C'],
        ],
        {},
      ),
      q(
        148,
        'detail',
        'What does Mr. Voss indicate about the cost increase?',
        'フォス氏はコスト増加について何を示していますか。',
        [
          [
            'It was calculated by Voss & Mercer Design Associates without external verification',
            'コスト増加額はフォス氏の事務所ではなく、施主側の数量積算士によって確認・承認されています。',
          ],
          [
            'It reflects the cost of extending the construction timeline by eight months',
            '工期延長は8「営業日」であり「8か月」ではありません。また、コスト増加は工期延長費用ではなく基礎工事変更に伴うものです。',
          ],
          [
            'It has already been confirmed by the client\'s quantity surveyor',
            '第2段落末尾に「この金額は担当数量積算士のパトリシア・オビ氏が確認・承認済み」と明記されており、施主側の専門家によってすでに検証済みです。',
          ],
          [
            'It is contingent on the results of a second geotechnical assessment',
            '2回目の地盤調査への言及は本文にありません。調査はすでに完了しており、その結果が変更の根拠となっています。',
          ],
        ],
        2,
        '第2段落の末尾に「この金額は担当数量積算士のパトリシア・オビ氏が確認・承認済み（reviewed and endorsed by your quantity surveyor, Ms. Patricia Obi）」と明記されており、コスト増加がすでに施主側の専門家によって検証済みであることが分かります。',
        [
          ['t03-s1-email', 1, 'a figure that has been reviewed and endorsed by your quantity surveyor, Ms. Patricia Obi'],
        ],
        {},
      ),
    ],
  },
  // ---- セット2: article（No.149–151） ----
  {
    setType: 'single',
    passages: [s2],
    questions: [
      q(
        149,
        'insertion',
        'In which position marked [1], [2], [3], or [4] does the following sentence best belong?\n"Port officials note that the new straddle carriers and stacking cranes operated alongside manually controlled equipment during a six-month transition phase."',
        '[1]、[2]、[3]、[4]のどの位置に次の文が最もよく当てはまりますか。\n「港湾当局者によると、新しいストラドルキャリアとスタッキングクレーンは、6か月間の移行期間中、手動制御の設備と並行して稼働していた。」',
        [
          ['[1]', '位置[1]より後で初めて straddle carriers と stacking cranes が具体的に紹介されるため、この位置では挿入文中の機器名が先走ってしまいます。'],
          ['[2]', '位置[2]の直前で straddle carriers と stacking cranes が初めて列挙されます。挿入文の "the new straddle carriers and stacking cranes" がそれらを直接受けるため、参照関係が一意に成立します。'],
          ['[3]', '位置[3]は批判論についての段落の冒頭に当たり、移行の円滑化という肯定的な内容とはトーンが合いません。'],
          ['[4]', '位置[4]は組合長の批判（再教育プログラムへの不満）の後であり、移行プロセスの技術的説明を挿入する文脈として不適切です。'],
        ],
        1,
        '挿入文中の "the new straddle carriers and stacking cranes" は、直前でその2種類の機器を列挙する[2]だけで明確な先行内容を持ちます。設備の紹介から6か月間の並行運用へ進む流れも自然です。',
        [],
        {},
      ),
      q(
        150,
        'detail',
        'According to the article, what concern has the union president raised about the retraining programme?',
        '記事によると、組合長は再教育プログラムについてどのような懸念を示しましたか。',
        [
          [
            'It has been offered to too few displaced workers to make a meaningful difference',
            '再教育プログラムの対象者数については本文に言及がありません。組合長の懸念はプログラムの内容（スキルの不一致）にあります。',
          ],
          [
            'It does not equip participants with skills relevant to the positions that the automation has left intact',
            '組合長は「フォークリフト資格取得と基本的なデータ入力スキルを扱うにとどまり、残存する技術的職種への準備として全く不十分だ」と批判しており、スキルの不一致が懸念の核心です。',
          ],
          [
            'It requires workers to fund their own certification costs without reimbursement',
            '費用負担については本文に記載がなく、これは組合長が述べた懸念ではありません。',
          ],
          [
            'It has been discontinued due to a lack of qualified instructors at the facility',
            '再教育プログラムの中止や指導員不足については本文に記載がありません。',
          ],
        ],
        1,
        '第2段落でムワンギ組合長は「再教育プログラムがフォークリフト資格取得や基本的データ入力スキルを扱うにとどまり、残存する技術的職種への準備として全く不十分だ（wholly inadequate preparation for the technical roles that remain）」と批判しており、スキルの不一致が核心的懸念です。',
        [
          ['t03-s2-article', 1, 'the terminal operator\'s retraining programme—which covers forklift certification and basic data-entry skills—is wholly inadequate preparation for the technical roles that remain'],
        ],
        {},
      ),
      q(
        151,
        'infer',
        'What can be inferred about the two additional terminals mentioned in the final paragraph?',
        '最終段落で言及されている他の2つのターミナルについて何が推測できますか。',
        [
          [
            'They have already secured the capital financing required for automation projects',
            '資本調達が「条件が良好なままであれば」と仮定形で述べられており、すでに確保されているとは読み取れません。',
          ],
          [
            'Their adoption of automation is not yet certain because of unresolved regulatory and financial conditions',
            '最終段落に「資本調達条件が良好なままであり、環境影響評価が実質的条件なしに解決された場合に」追随する可能性があると述べており、両条件が未確定であるため導入は保証されていません。',
          ],
          [
            'They are expected to deploy the same Portronix system that Kelford Terminal uses',
            '同じシステムを導入するとは本文に述べられていません。具体的なシステムの選定については言及がありません。',
          ],
          [
            'They handle a larger volume of container throughput than Kelford Terminal',
            '他ターミナルの取扱量については本文に記載がなく、ケルフォードとの比較もされていません。',
          ],
        ],
        1,
        '最終段落では「資本調達条件が良好なままであり（provided that capital financing conditions remain favourable）、環境影響評価が実質的条件なしに解決された場合に（pending environmental-impact assessments are resolved without material conditions being imposed）」他の2ターミナルが追随する可能性が高いと述べており、両条件が未確定であることから導入は保証されていないと推測できます。',
        [
          ['t03-s2-article', 2, 'provided that capital financing conditions remain favourable and pending environmental-impact assessments are resolved without material conditions being imposed'],
        ],
        {},
      ),
    ],
  },
  // ---- セット3: notice（No.152–154） ----
  {
    setType: 'single',
    passages: [s3],
    questions: [
      q(
        152,
        'detail',
        'Who will be permitted to use the Concourse D Premier Lounge during the refurbishment period?',
        '改装期間中、コンコースDプレミアラウンジの利用が認められるのは誰ですか。',
        [
          [
            'All passengers holding any tier of Skyreach membership, regardless of travel class',
            '第2段落でゴールド会員は明示的に除外されており、すべての会員が利用できるわけではありません。',
          ],
          [
            'Passengers with a day pass who are travelling on domestic routes',
            '第2段落でデイパス利用者は明示的に除外されています。',
          ],
          [
            'Skyreach Platinum or Titanium members, or confirmed business- or first-class international passengers from Concourse D',
            '第1段落に「スカイリーチプラチナまたはチタニウム会員、またはコンコースDから出発する国際線のビジネスもしくはファーストクラス確定座席の乗客に限定される」と明記されています。',
          ],
          [
            'Any international traveller departing from any concourse who holds a Skyreach Gold card',
            'ゴールド会員は第2段落で除外されており、またコンコースD以外からの出発者も対象外です。',
          ],
        ],
        2,
        '第1段落に「access will be restricted to passengers holding a current Skyreach Platinum or Titanium membership, or those travelling in a confirmed business- or first-class cabin on an international itinerary departing from Concourse D」と明記されています。ゴールド会員やデイパス利用者は第2段落で明示的に除外されています。',
        [
          ['t03-s3-notice', 0, 'access will be restricted to passengers holding a current Skyreach Platinum or Titanium membership, or those travelling in a confirmed business- or first-class cabin on an international itinerary departing from Concourse D'],
        ],
        {},
      ),
      q(
        153,
        'infer',
        'What can be inferred about the Concourse B Horizon Lounge?',
        'コンコースBホライゾンラウンジについて何が推測できますか。',
        [
          [
            'It is currently undergoing a renovation similar to that of the Concourse D Premier Lounge',
            'コンコースBホライゾンラウンジが改装中という記述は本文にありません。むしろ代替利用先として紹介されています。',
          ],
          [
            'Passengers can reach it without going through additional security screening',
            '第2段落に「保安検査の再通過なしにターミナル間移動システムでアクセスできる（accessible via the inter-terminal transit system without the need to re-clear security）」と記載されており、追加の保安検査なしにアクセスできます。',
          ],
          [
            'It will receive the sleeping pods and videoconferencing suite removed from Concourse D',
            '第3段落で言及されている仮眠ポッドやビデオ会議スイートはコンコースDの改装後に新設される設備であり、コンコースBに移設されるとは述べられていません。',
          ],
          [
            'It is reserved exclusively for passengers holding Skyreach Platinum status',
             'コンコースBホライゾンラウンジの利用資格については本文に記載がなく、プラチナ専用とは読み取れません。',
          ],
        ],
        1,
        '第2段落に「accessible via the inter-terminal transit system without the need to re-clear security」と記載されており、乗客が追加の保安審査なしにコンコースBホライゾンラウンジに移動できることが推測されます。',
        [
          ['t03-s3-notice', 1, 'accessible via the inter-terminal transit system without the need to re-clear security'],
        ],
        {},
      ),
      q(
        154,
        'synonym',
        'The word "comparable" in paragraph 2 is closest in meaning to',
        '第2段落の "comparable" に意味が最も近いのは次のうちどれですか。',
        [
          [
            'equivalent',
            '「comparable」はここで「（コンコースDプレミアラウンジと）同等の」という意味で使われており、「equivalent（同等の）」が最も近い意味を持ちます。',
          ],
          [
            'superior',
            '「superior」は「より優れた」を意味し、単なる同等性ではなく優位性を示すため意味が異なります。',
          ],
          [
            'affordable',
            '「affordable」は「手頃な価格の」を意味し、設備の質や水準の比較とは関係がありません。',
          ],
          [
            'convenient',
            '「convenient」は「便利な」を意味し、設備の質や水準の同等性とは異なります。',
          ],
        ],
        0,
        '第2段落の「comparable dining and shower facilities（同等のダイニング・シャワー設備）」という文脈において、「comparable」はコンコースDプレミアラウンジと同じ水準の設備を意味しており、「equivalent（同等の）」が最も近い意味を持ちます。「superior（より優れた）」や「affordable（手頃な）」は文脈に合いません。',
        [
          ['t03-s3-notice', 1, 'comparable dining and shower facilities'],
        ],
        { targetWord: 'comparable' },
      ),
    ],
  },
  // ---- セット4: online_chat（No.155–157） ----
  {
    setType: 'single',
    passages: [s4],
    questions: [
      q(
        155,
        'main_idea',
        'What is the main subject of the conversation?',
        'この会話の主な内容は何ですか。',
        [
          [
            'Negotiating a discount on the Dynacor licensing fees with the vendor\'s sales team',
            'ライセンス料の値引き交渉については会話中に一切言及がありません。',
          ],
          [
            'Reviewing and preparing amendments to problematic clauses in a vendor contract',
            'チャット全体を通じて、プリヤ氏がダイナコア契約の2つの問題条項を特定し、トム氏とレイコ氏が修正案文（レッドライン）の作成と確認の段取りを話し合っています。',
          ],
          [
            'Deciding whether to terminate an existing contract with Dynacor over audit violations',
            '契約解除については会話中に言及がなく、チームは契約条項の修正を検討しています。',
          ],
          [
            'Evaluating multiple competing vendors before selecting a new software provider',
            '複数のベンダー評価については会話中に言及がなく、既存のダイナコア契約のレビューが話題です。',
          ],
        ],
        1,
        'チャット全体を通じて、プリヤ氏がダイナコアのライセンス契約の2つの問題条項（監査通知期間と二次的著作物の定義）を特定し、トム氏とレイコ氏が修正案文（レッドライン）の作成と確認の段取りを話し合っています。',
        [
          ['t03-s4-chat', 0, 'There are two clauses I think we need to flag before we give procurement the green light'],
          ['t03-s4-chat', 5, 'I\'ll draft a redline for both clauses and circulate it this afternoon'],
        ],
        {},
      ),
      q(
        156,
        'intention',
        'At 9:12 A.M., why does Ms. Tanaka write, "I\'ve seen two competitors run into exactly that problem and end up paying licensing fees on tools they built themselves"?',
        '午前9時12分に、田中氏が「まったく同じ問題に直面した競合他社2社が、自社で構築したツールにライセンス料を支払う羽目になった事例を知っています」と書いたのはなぜですか。',
        [
          [
            'To suggest that Dynacor has a history of enforcing its intellectual property claims aggressively',
            'ダイナコアの過去の行動については言及がなく、「競合他社2社」の事例を引用する意図は別にあります。',
          ],
          [
            'To underscore the seriousness of the derivative works clause by citing real-world consequences',
            '田中氏の発言は「二次的著作物の問題の方が深刻だ」という意見表明の直後に来ており、競合他社が「自社構築ツールにライセンス料を支払う羽目になった」という具体例を示すことでリスクの重大性を強調しています。',
          ],
          [
            'To propose that the team consult those competitors for advice on contract negotiation',
            '競合他社への相談提案という意図は文脈から読み取れません。',
          ],
          [
            'To argue that the company should withdraw from the agreement entirely rather than seek amendments',
            '田中氏は修正案文の作成に積極的に協力しており、契約からの完全撤退を主張していません。',
          ],
        ],
        1,
        '田中氏の発言は「二次的著作物の問題の方が深刻だ（The derivative works issue is the more serious one in my view）」という意見表明の直後に来ており、競合他社が同じ問題で「自社構築ツールにライセンス料を支払う羽目になった」という具体例で主張を裏付けることで、この条項のリスクの重大性をチームに認識させようとしています。',
        [
          ['t03-s4-chat', 3, 'I\'ve seen two competitors run into exactly that problem and end up paying licensing fees on tools they built themselves'],
        ],
        { intentionTarget: { sender: 'Reiko Tanaka', utteranceEn: 'I\'ve seen two competitors run into exactly that problem and end up paying licensing fees on tools they built themselves.' } },
      ),
      q(
        157,
        'infer',
        'What will most likely happen next?',
        '次に何が起こると考えられますか。',
        [
          [
            'Ms. Nair will send the revised contract clauses directly to Dynacor without further internal review',
            'プリヤ氏は「ダイナコアの法律顧問に送る前に」レイコ氏にレビューを依頼しており、内部レビューなしの直接送付は予定されていません。',
          ],
          [
            'Mr. Eriksson will contact Dynacor\'s legal counsel to request an extension of the review deadline',
            'エリクソン氏がダイナコアの法律顧問に連絡するとは会話中に述べられていません。',
          ],
          [
            'Ms. Nair will prepare amended contract language and share it with Ms. Tanaka for review before it is sent externally',
            'プリヤ氏が「今日の午後にレッドラインを回覧する」と述べ、レイコ氏に「外部送付前に確認してほしい」と依頼しており、レイコ氏が「昼食後すぐに確認する」と承諾しています。',
          ],
          [
            'The team will ask the procurement department to put the Dynacor contract on hold indefinitely',
            '調達部門への無期限保留依頼については会話中に言及がありません。チームは修正案の作成に向けて動いています。',
          ],
        ],
        2,
        'プリヤ氏が「今日の午後にレッドラインを回覧する（circulate it this afternoon）」と述べ、レイコ氏に「ダイナコアの法律顧問に送る前に確認してほしい（would you be able to review the draft before I send it to Dynacor\'s legal counsel）」と依頼しており、レイコ氏が「昼食後すぐに確認する（I\'ll look at it first thing after lunch）」と承諾しています。これらを合わせると、次のステップはレッドライン作成→田中氏によるレビューとなります。',
        [
          ['t03-s4-chat', 5, 'Reiko, would you be able to review the draft before I send it to Dynacor\'s legal counsel?'],
          ['t03-s4-chat', 6, 'I\'ll look at it first thing after lunch'],
        ],
        {},
      ),
    ],
  },
  // ---- セット5: letter（No.158–160） ----
  {
    setType: 'single',
    passages: [s5],
    questions: [
      q(
        158,
        'main_idea',
        'What is the main purpose of this letter?',
        'このレターの主な目的は何ですか。',
        [
          [
            'To notify Dr. Nakamura that a manuscript they submitted has been accepted for publication',
            '中村博士が原稿を提出したという記述はなく、むしろ第三者の原稿の査読者として依頼されています。',
          ],
          [
            'To request that Dr. Nakamura evaluate a research manuscript on behalf of the journal',
            '第1段落の冒頭に「現在掲載検討中の原稿の査読者として参加いただくよう依頼するためにご連絡した」と明記されており、レター全体が査読の依頼とその手続きの説明に充てられています。',
          ],
          [
            'To announce a change in the editorial policies of the JAOB',
            '編集方針の変更については本文に記載がありません。',
          ],
          [
            'To invite Dr. Nakamura to join the Editorial Board of the JAOB as a permanent member',
            '編集委員会への参加依頼ではなく、特定原稿の査読依頼です。',
          ],
        ],
        1,
        '第1段落の冒頭に「現在掲載検討中の原稿の査読者としてご参加いただくよう依頼するためにご連絡差し上げます（I am writing ... to invite you to serve as a peer reviewer for a manuscript currently under consideration for publication）」と明記されており、レター全体が査読の依頼とその手続きの説明に終始しています。',
        [
          ['t03-s5-letter', 0, 'I am writing on behalf of the Editorial Board of the Journal of Applied Organisational Behaviour (JAOB) to invite you to serve as a peer reviewer for a manuscript currently under consideration for publication'],
        ],
        {},
      ),
      q(
        159,
        'detail',
        'According to the letter, why was Dr. Nakamura selected as a prospective reviewer?',
        'レターによると、中村博士が査読者候補として選ばれたのはなぜですか。',
        [
          [
            'They previously served as a guest editor for a special issue of the JAOB',
            'ゲストエディターとしての経歴については本文に記載がありません。',
          ],
          [
            'They are affiliated with an institution in Southeast Asia and have direct regional expertise',
            '東南アジアの機関所属については本文に記載がなく、選定理由ではありません。',
          ],
          [
            'Their published work in occupational well-being and cross-cultural organisational research aligns with the manuscript\'s topics',
            '第2段落に「職業的ウェルビーイング測定および異文化組織研究の分野における最近のご研究に基づき候補者として特定した（identified you as a prospective reviewer based on your recent publications in the domains of occupational well-being measurement and cross-cultural organisational research）」と明記されています。',
          ],
          [
            'They were recommended by the authors of the manuscript under review',
            '著者による推薦については本文に記載がありません。',
          ],
        ],
        2,
        '第2段落に「We have identified you as a prospective reviewer based on your recent publications in the domains of occupational well-being measurement and cross-cultural organisational research」と明記されており、博士の研究実績が選考理由として明示されています。',
        [
          ['t03-s5-letter', 1, 'We have identified you as a prospective reviewer based on your recent publications in the domains of occupational well-being measurement and cross-cultural organisational research'],
        ],
        {},
      ),
      q(
        160,
        'not',
        'According to the letter, which of the following is NOT mentioned as something Dr. Nakamura should do?',
        'レターによると、次のうち中村博士がすべきこととして言及されていないのはどれですか。',
        [
          [
            'Submit their review through the journal\'s online editorial management portal',
            '第3段落に「JAOB編集管理ポータルを通じて評価をご提出いただくようお願いします（submit your evaluation through the JAOB editorial management portal）」と記載されています。',
          ],
          [
            'Notify the editors if a conflict of interest prevents them from participating',
            '第3段落に「利益相反の可能性がある場合は5営業日以内にお知らせください（if you identify a potential conflict of interest ... please inform us within five business days）」と記載されています。',
          ],
          [
            'Contact the manuscript\'s authors directly to clarify any ambiguous sections',
            '著者への直接連絡については本文に一切記載がありません。',
          ],
          [
            'Respond within five business days if they cannot meet the review timeline',
            '第3段落に「スケジュールに支障をきたす可能性がある場合は5営業日以内にお知らせください（please inform us within five business days）」と記載されています。',
          ],
        ],
        2,
        '第3段落には「ポータルを通じて評価を提出する」「スケジュールに支障をきたす場合は5営業日以内に知らせる」「利益相反があれば通知する」と言及されていますが、著者に直接連絡することは一切記載されていません。',
        [
          ['t03-s5-letter', 2, 'we would request that you submit your evaluation through the JAOB editorial management portal no later than August 29'],
          ['t03-s5-letter', 2, 'If you anticipate that the timeline presents a difficulty, or if you identify a potential conflict of interest that would preclude your participation, please inform us within five business days'],
        ],
        {},
      ),
    ],
  },
  // ---- セット6: advertisement（No.161–163） ----
  {
    setType: 'single',
    passages: [s6],
    questions: [
      q(
        161,
        'detail',
        'According to the advertisement, which of the following is a requirement for programme applicants?',
        '広告によると、プログラム申請者の要件として正しいものはどれですか。',
        [
          [
            'They must be a C-suite leader or senior vice president at an organisation with annual revenues exceeding fifty million dollars',
            '第1段落に、年間売上高5000万ドル超の組織に在籍するCスイート幹部またはシニア・バイスプレジデントが対象と明記されています。',
          ],
          [
            'They must have previously participated in a leadership development programme',
            '以前にリーダーシップ開発プログラムに参加した経験については本文に記載がありません。',
          ],
          [
            'They must submit a letter of recommendation from a current client',
            '推薦状はクライアントではなく、取締役会長または同等のガバナンス機関からのものが求められています。',
          ],
          [
            'They must hold a doctoral degree in business administration or a related field',
            '学位要件については本文に一切記載がありません。',
          ],
        ],
        0,
        '第1段落に「C-suite leaders and senior vice presidents whose organisations generate annual revenues in excess of fifty million dollars」と明記されており、年間売上高5000万ドル超の組織に在籍することが資格要件の一つです。推薦状の要件（第3段落）は取締役会長または同等機関からのものであり、クライアントからではありません。',
        [
          ['t03-s6-ad', 0, 'organisations generate annual revenues in excess of fifty million dollars'],
        ],
        {},
      ),
      q(
        162,
        'not',
        'Which of the following is NOT mentioned in the advertisement?',
        '次のうち、広告に記載されていないものはどれですか。',
        [
          [
            'The number of participants accepted into each cohort',
            '第1段落に「limited to sixteen participants per cohort」と定員が明記されています。',
          ],
          [
            'The frequency with which coaching sessions are held',
            '第2段落に「twenty-four one-on-one coaching sessions distributed evenly over the programme year」とあり、年間を通じた回数が示されています。',
          ],
          [
            'The qualifications held by the coaches assigned to participants',
            '第2段落に「no fewer than twenty years of boardroom experience across multiple industries」とコーチの経験が記載されています。',
          ],
          [
            'The criteria used to evaluate personal statements during the selection process',
            '個人陳述書の審査基準については本文中に一切記載がなく、書類選考の評価基準は明示されていません。',
          ],
        ],
        3,
        '定員（第1段落）、セッション数（第2段落）、コーチの資格（第2段落）はすべて言及されています。一方、個人陳述書の審査基準については本文中に記載がなく、書類選考後の予備面接についての言及（第3段落）はあるものの、評価基準そのものは示されていません。',
        [
          ['t03-s6-ad', 0, 'limited to sixteen participants per cohort'],
          ['t03-s6-ad', 1, 'twenty-four one-on-one coaching sessions distributed evenly over the programme year'],
          ['t03-s6-ad', 1, 'no fewer than twenty years of boardroom experience across multiple industries'],
        ],
        {},
      ),
      q(
        163,
        'infer',
        'What can be inferred about the Pinnacle Executive Coaching Programme?',
        'ピナクル・エグゼクティブ・コーチング・プログラムについて推測できることは何ですか。',
        [
          [
            'Candidates who are not selected after interview may reapply in a subsequent cohort',
            '再申請については本文に記載がなく、推論の根拠がありません。',
          ],
          [
            'Participants are expected to engage with programme materials outside of scheduled sessions',
            '第2段落に「asynchronous reflection exercises and download curated research briefs between sessions」とあり、スケジュールされたセッション外での取り組みが想定されています。',
          ],
          [
            'The programme is offered at multiple locations across the United Kingdom',
            '第2段落に「four half-day strategic workshops conducted at our London headquarters」とあり、ロンドン本部のみで研修が実施されることが示されています。',
          ],
          [
            'The 360-degree assessment is conducted solely by the participant\'s direct reports',
            '360度評価の評価者については本文に詳細が記載されておらず、直属部下のみとは読み取れません。',
          ],
        ],
        1,
        '第2段落に「asynchronous reflection exercises and download curated research briefs between sessions」とあることから、参加者はスケジュールされたセッション以外でも教材に取り組むことが期待されていると推論できます。また、「four half-day strategic workshops conducted at our London headquarters」から、ロンドン本部のみでの実施であり複数拠点は否定されます。',
        [
          ['t03-s6-ad', 1, 'asynchronous reflection exercises and download curated research briefs between sessions'],
          ['t03-s6-ad', 1, 'four half-day strategic workshops conducted at our London headquarters'],
        ],
        {},
      ),
    ],
  },
  // ---- セット7: receipt（No.164–166） ----
  {
    setType: 'single',
    passages: [s7],
    questions: [
      q(
        164,
        'detail',
        'What does the receipt indicate about the priority processing surcharge?',
        '領収書は優先処理追加料金について何を示していますか。',
        [
          [
            'It is calculated as a percentage of the base translation fee',
            '第2段落に「Priority processing surcharge (48-hour turnaround, applied at 35% of base fee)」と明記されており、基本翻訳料に対するパーセンテージとして算出されています。',
          ],
          [
            'It is a fixed charge applied regardless of the order value',
            '追加料金は固定額ではなく基本料金の35%として算出されるため、注文金額によって変動します。',
          ],
          [
            'It is refunded if the translation contains any errors',
            '返金条件はエラーではなく、LinguaTechが納期を守れなかった場合に「全額免除（waived in full）」となります。これは返金ではなく免除であり、条件も異なります。',
          ],
          [
            'It covers the cost of the notarisation of the translator\'s declaration',
            '公証費用は別途£75.00として計上されており、優先処理追加料金とは別の項目です。',
          ],
        ],
        0,
        '第2段落の料金内訳に「Priority processing surcharge (48-hour turnaround, applied at 35% of base fee): £582.12」と明記されており、優先処理追加料金は基本翻訳料の35%として計算されています。',
        [
          ['t03-s7-receipt', 1, 'Priority processing surcharge (48-hour turnaround, applied at 35% of base fee)'],
        ],
        {},
      ),
      q(
        165,
        'synonym',
        'The word "demonstrable" in paragraph 3 is closest in meaning to',
        '第3段落の "demonstrable" に最も意味が近いものはどれですか。',
        [
          [
            'verifiable',
            '「demonstrable」は「証明できる、実証可能な」という意味で、文脈上「verifiable（検証可能な）」が最も近い意味です。',
          ],
          [
            'substantial',
            '「substantial」は「相当な、実質的な」を意味し、量や規模を示す点が「demonstrable（証明可能な）」とは異なります。',
          ],
          [
            'predictable',
            '「predictable」は「予測可能な」を意味し、証明可能性とは異なります。',
          ],
          [
            'deliberate',
            '「deliberate」は「意図的な」を意味し、証明可能性とは関係がありません。',
          ],
        ],
        0,
        '第3段落の「a demonstrable error of substance attributable to the translator（翻訳者に帰すべき実質的な誤り）」という文脈で使われており、「客観的に証明できる誤り」を意味しています。「demonstrable」は「実証可能な、証明できる」を意味し、「verifiable（検証可能な）」が最も近い意味を持ちます。',
        [
          ['t03-s7-receipt', 2, 'the client identifies a demonstrable error of substance attributable to the translator'],
        ],
        { targetWord: 'demonstrable' },
      ),
      q(
        166,
        'infer',
        'What can be inferred about LinguaTech\'s refund policy from the receipt?',
        '領収書からLinguaTechの返金ポリシーについて推測できることは何ですか。',
        [
          [
            'A client is entitled to a full refund if the translation is delivered after the agreed deadline',
            '納期遅延の場合は「優先処理追加料金が全額免除（waived in full）」されますが、返金（refund）は行われないと第3段落に明記されています。',
          ],
          [
            'No refund is available once translation work has begun, regardless of the circumstances',
            '第3段落に「Refunds will not be issued once work has commenced」と明記されており、作業開始後の返金（refund）については例外が記載されていません。なお納期遅延時には「優先処理追加料金が全額免除」される規定がありますが、それは返金ではなく料金の不請求であり、本選択肢の「refund」の範囲外です。',
          ],
          [
            'The company provides a full refund if the client is dissatisfied with the stylistic quality of the translation',
            '文体上の好みによる不満は補償対象外と第3段落に明記されており、返金は行われません。',
          ],
          [
            'Clients can cancel an order and receive a refund before the translation work begins',
            '作業開始前の返金については本文に記載がありません。「once work has commenced（作業開始後）」という表現しか言及されていません。',
          ],
        ],
        1,
        '第3段落に「Refunds will not be issued once work has commenced（作業開始後は返金されません）」と明記されています。また、納期遅延時に優先処理追加料金が「免除」されるのは返金ではなく料金の不請求であり、返金ポリシーとは区別されます。',
        [
          ['t03-s7-receipt', 2, 'Refunds will not be issued once work has commenced'],
        ],
        {},
      ),
    ],
  },
  // ---- セット8: web_page（No.167–169） ----
  {
    setType: 'single',
    passages: [s8],
    questions: [
      q(
        167,
        'main_idea',
        'What is the primary purpose of this web page?',
        'このウェブページの主な目的は何ですか。',
        [
          [
            'To explain the eligibility criteria, application process, and certificate management for a building materials accreditation scheme',
            '3つのQ&A形式の段落が、認証の資格条件（第1段落）、申請プロセスと費用（第2段落）、有効期限と取り消し条件（第3段落）をそれぞれ扱っており、建材認証制度の手続き的情報を説明することがページの主目的です。',
          ],
          [
            'To promote the environmental benefits of certified building materials to construction companies',
            '環境的利点の宣伝ではなく、認証制度の手続き的側面の説明が主目的です。',
          ],
          [
            'To compare GreenBuild certification with other sustainability accreditation schemes',
            '他の認証制度との比較については本文に記載がありません。',
          ],
          [
            'To announce changes to the existing certification requirements following a regulatory review',
            '要件の変更告知ではなく、既存の認証制度の仕組みを説明するFAQです。',
          ],
        ],
        0,
        '3つのQ&A形式の段落が、それぞれ認証の概要と資格条件、申請プロセスと費用、有効期限と取り消し条件を扱っています。これら全体を通じて、建材認証制度の手続き的情報を説明することがページの主目的です。',
        [
          ['t03-s8-web', 0, 'The GreenBuild Materials Certification is an independent third-party accreditation scheme'],
          ['t03-s8-web', 1, 'How long does the certification process take, and what does it cost'],
          ['t03-s8-web', 2, 'How long is a GreenBuild certificate valid, and under what circumstances can it be revoked'],
        ],
        {},
      ),
      q(
        168,
        'detail',
        'According to the FAQ, under what condition will an applicant be charged an additional fee of £650?',
        'FAQによると、申請者が£650の追加料金を請求されるのはどのような条件の場合ですか。',
        [
          [
            'If the application is submitted after the published deadline',
            '締切後の申請に対する追加料金については記載がありません。',
          ],
          [
            'If a second site inspection is necessary due to non-conformances found in the first',
            '第2段落に「if a second inspection is required as a result of non-conformances identified during the first visit, an additional fee of £650 will apply」と明記されています。',
          ],
          [
            'If the applicant requests an accelerated assessment pathway',
            '審査期間短縮は事前評価コンサルタント利用で最大4週間短縮できると述べられていますが、£650の追加料金との関連は記載されていません。',
          ],
          [
            'If the organisation\'s annual revenue exceeds £10 million',
            '年間収益が1000万ポンドを超える場合は基本申請手数料が£3,400になりますが、£650の追加料金とは別の話です。',
          ],
        ],
        1,
        '第2段落に「if a second inspection is required as a result of non-conformances identified during the first visit, an additional fee of £650 will apply」と明確に記載されており、最初の現地検査で不適合が発見されて2回目の検査が必要になった場合に追加料金が発生します。',
        [
          ['t03-s8-web', 1, 'if a second inspection is required as a result of non-conformances identified during the first visit, an additional fee of £650 will apply'],
        ],
        {},
      ),
      q(
        169,
        'not',
        'Which of the following is NOT stated in the FAQ?',
        '次のうち、FAQに記載されていないものはどれですか。',
        [
          [
            'Distributors cannot apply for certification directly',
            '第1段落に「Distributors and retailers are not eligible to apply directly」と明記されています。',
          ],
          [
            'A certificate may be suspended if the annual self-declaration is not submitted on time',
            '第3段落に「Failure to submit the self-declaration within thirty days of the anniversary date will result in automatic suspension of the certificate」と記載されています。',
          ],
          [
            'Renewal applications must be received no later than twelve weeks before expiry',
            '第3段落に「Renewal applications must be submitted no later than twelve weeks before the expiry date」と記載されています。',
          ],
          [
            'Applicants may appeal a certification refusal by contacting the scheme\'s founding regulatory body',
            '認証拒否に対する異議申立手続きや設立規制機関への申立については本文に記載がなく、これが本文に言及のない事項です。',
          ],
        ],
        3,
        '流通業者の申請不可（第1段落）、自己申告書未提出による停止（第3段落）、更新申請期限（第3段落）はすべて記載されています。一方、認証拒否に対する異議申立手続きや設立規制機関への申立については本文に記載がなく、これが正解です。',
        [
          ['t03-s8-web', 0, 'Distributors and retailers are not eligible to apply directly'],
          ['t03-s8-web', 2, 'Failure to submit the self-declaration within thirty days of the anniversary date will result in automatic suspension of the certificate'],
          ['t03-s8-web', 2, 'Renewal applications must be submitted no later than twelve weeks before the expiry date'],
        ],
        {},
      ),
    ],
  },
  // ---- セット9: form（No.170–172） ----
  {
    setType: 'single',
    passages: [s9],
    questions: [
      q(
        170,
        'detail',
        'According to the notification form, what must Dr. Subramaniam do within forty-five days of receiving the notification?',
        '通知フォームによると、Subramaniam博士は通知受領から45日以内に何をしなければなりませんか。',
        [
          [
            'Submit the first interim progress report using the standardised template',
            '中間進捗報告書は6か月ごとに提出するものであり、45日以内の要件ではありません。',
          ],
          [
            'Obtain approval for any equipment purchases exceeding GBP 5,000',
            '機器購入の承認は45日以内の条件ではなく、個別の支出が発生する際に求められるものです。',
          ],
          [
            'Provide the Finance Committee with a revised budget incorporating the amended travel allocation',
            '第2段落の採択条件(1)に「submit a revised budget plan, incorporating the reduced conference travel allocation, for written approval by the Foundation\'s Finance Committee within forty-five days」と明記されています。',
          ],
          [
            'Deposit the first research publication in an open-access repository',
            'オープンアクセスリポジトリへの登録は論文受理から12か月以内であり、通知受領から45日以内の要件ではありません。',
          ],
        ],
        2,
        '第2段落の採択条件(1)に「The principal investigator must submit a revised budget plan, incorporating the reduced conference travel allocation, for written approval by the Foundation\'s Finance Committee within forty-five days of receipt of this notification」と明確に記載されています。',
        [
          ['t03-s9-form', 1, 'submit a revised budget plan, incorporating the reduced conference travel allocation, for written approval by the Foundation\'s Finance Committee within forty-five days of receipt of this notification'],
        ],
        {},
      ),
      q(
        171,
        'infer',
        'What can be inferred about the original grant application submitted by Dr. Subramaniam?',
        'Subramaniam博士が提出した当初の助成申請について推測できることは何ですか。',
        [
          [
            'It was rejected by the Review Panel on the basis of insufficient scientific merit',
            '審査結果は「CONDITIONAL AWARD（条件付き採択）」であり、拒否ではありません。第1段落に「demonstrates sufficient scientific merit」と肯定的評価が示されています。',
          ],
          [
            'It requested funding for conference travel that the Review Panel considered excessive relative to the research goals',
            '第1段落に「the budget allocation for conference travel was disproportionate relative to the core research objectives」とあり、当初の学会出張費配分が研究目標に比べて過大と判断されたことが分かります。',
          ],
          [
            'It proposed a research methodology that the Panel found insufficiently rigorous',
            '第1段落に「methodological rigour of the proposed experimental design」と肯定的に評価されており、方法論は高く評価されています。',
          ],
          [
            'It was submitted after the deadline specified in the programme guidelines',
            '期限超過については本文に記載がありません。',
          ],
        ],
        1,
        '第1段落に、採択額が当初申請額からGBP 22,000減額され、その理由として学会出張費の配分が中核的な研究目標に比べて不釣り合いだったと明記されています。したがって、当初申請の学会出張費が過大と評価されたことが分かります。',
        [
          ['t03-s9-form', 0, 'the budget allocation for conference travel was disproportionate relative to the core research objectives'],
        ],
        {},
      ),
      q(
        172,
        'synonym',
        'The word "admitted" in paragraph 3 is closest in meaning to',
        '第3段落の "admitted" に最も意味が近いものはどれですか。',
        [
          [
            'accepted',
            '「admitted」はここでは「（審査対象として）受け付けられる、受理される」という意味で使われており、「accepted（受理される）」が最も近い意味です。',
          ],
          [
            'acknowledged',
            '「acknowledged」は「承認される、認識される」を意味しますが、「admitted」の「正式に受理・受け付け」という手続き的な意味とは微妙に異なります。',
          ],
          [
            'postponed',
            '「postponed」は「延期される」を意味し、文脈に合いません。',
          ],
          [
            'disclosed',
            '「disclosed」は「開示される」を意味し、文脈に合いません。',
          ],
        ],
        0,
        '第3段落の「will not be admitted for review（審査の対象として受け付けられない）」という表現で使われており、「（正式な手続きとして）受理される、受け付けられる」を意味しています。「accepted」が最も近い意味を持ちます。',
        [
          ['t03-s9-form', 2, 'Appeals submitted on the sole grounds of personal dissatisfaction with the outcome, without substantive reference to procedural irregularity or factual error, will not be admitted for review'],
        ],
        { targetWord: 'admitted' },
      ),
    ],
  },
  // ---- セット10: memo（No.173–175） ----
  {
    setType: 'single',
    passages: [s10],
    questions: [
      q(
        173,
        'main_idea',
        'What is the primary purpose of this memorandum?',
        'この覚書の主な目的は何ですか。',
        [
          [
            'To announce the results of an annual performance evaluation of departmental data systems',
            '年次パフォーマンス評価の結果告知ではなく、監査で発見された非準拠事項への対応を求める文書です。',
          ],
          [
            'To instruct department heads to address specific data governance violations identified in an audit',
            '第1〜3段落を通じて、監査で発見された3種類の非準拠事項とその是正措置、期限、未対応時のペナルティが説明されており、是正措置の指示が覚書の主目的です。',
          ],
          [
            'To inform staff of new data protection regulations introduced by European authorities',
            '新規制の周知ではなく、監査結果に基づく是正措置の指示が主目的です。欧州当局への言及は監査実施の背景説明に留まります。',
          ],
          [
            'To request approval from senior management for a revised data security budget',
            '予算承認の依頼については本文に記載がありません。',
          ],
        ],
        1,
        '第1段落で監査の背景を説明した後、第2段落で3つの非準拠事項（認証情報共有・保持期限超過・暗号化未実装）と是正要求を列挙し、第3段落で期限と未対応時のペナルティを示しています。全体として、データガバナンス違反の是正を部門長に指示することが主目的です。',
        [
          ['t03-s10-memo', 0, 'Mandatory Corrective Actions Following Q3 Data Governance Audit'],
          ['t03-s10-memo', 1, 'The audit identified three categories of non-compliance requiring immediate remediation'],
        ],
        {},
      ),
      q(
        174,
        'detail',
        'According to the memorandum, what are the affected departments required to do regarding overdue data records?',
        '覚書によると、期限超過のデータ記録に関して影響を受ける部門は何をする必要がありますか。',
        [
          [
            'Submit a certified list of overdue records to the Compliance Office within fifteen days',
            '15日以内の期限は暗号化実装に関するものであり、データ記録の廃棄証拠提出は30日以内とされています。',
          ],
          [
            'Transfer all overdue records to a centralised archive managed by the Internal Audit team',
            '集中管理アーカイブへの移管については本文に記載がなく、廃棄が求められています。',
          ],
          [
            'Arrange for the destruction of overdue records and supply documentary evidence of disposal within thirty days',
            '第2段落に「Departments holding overdue records must schedule destruction in accordance with the Secure Disposal Protocol and provide documentary evidence of disposal within thirty days」と明記されています。',
          ],
          [
            'Obtain approval from the Group Executive Committee before destroying any retained records',
            '廃棄前の執行委員会承認については本文に記載がなく、執行委員会は未対応部門への制限権限を持つ機関として言及されています。',
          ],
        ],
        2,
        '第2段落に「Departments holding overdue records must schedule destruction in accordance with the Secure Disposal Protocol and provide documentary evidence of disposal within thirty days」と明記されており、セキュア廃棄プロトコルに従った廃棄の予定と30日以内の廃棄証拠の提出が求められています。',
        [
          ['t03-s10-memo', 1, 'Departments holding overdue records must schedule destruction in accordance with the Secure Disposal Protocol and provide documentary evidence of disposal within thirty days'],
        ],
        {},
      ),
      q(
        175,
        'infer',
        'What can be inferred about departments that do not complete the required corrective actions by 28 November 2025?',
        '2025年11月28日までに必要な是正措置を完了しない部門について推測できることは何ですか。',
        [
          [
            'They will be subject to financial penalties imposed by the European Data Standards Authority',
            'ペナルティを課すのはグループ執行委員会であり、欧州データ標準局ではありません。',
          ],
          [
            'They may face restrictions on their operational activities until the issues are resolved',
            '第3段落に「the Group Executive Committee, which is empowered to impose operational restrictions on non-compliant units pending resolution」とあり、解決まで業務制限が課される可能性があることが読み取れます。',
          ],
          [
            'They will be required to undergo an additional audit before the end of the current financial year',
            'フォローアップ監査は2026年1月に全部門を対象として予定されており、未対応部門のみへの追加監査とは異なります。',
          ],
          [
            'They will lose access to the Internal Audit Portal used for submitting compliance reports',
            'ポータルへのアクセス制限については本文に記載がありません。',
          ],
        ],
        1,
        '第3段落に「Departments that fail to achieve full compliance by the stated deadline will be referred to the Group Executive Committee, which is empowered to impose operational restrictions on non-compliant units pending resolution」とあります。これにより、期限までに是正を完了しない部門は解決保留中に業務制限を受ける可能性があると推論できます。',
        [
          ['t03-s10-memo', 2, 'Departments that fail to achieve full compliance by the stated deadline will be referred to the Group Executive Committee, which is empowered to impose operational restrictions on non-compliant units pending resolution'],
        ],
        {},
      ),
    ],
  },
];
