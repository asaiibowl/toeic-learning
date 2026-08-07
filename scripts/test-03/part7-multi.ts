/**
 * test-03 Part 7 複数文書セット（No.176〜200）生成スクリプト。
 * double 2セット（D1: 176–180, D2: 181–185）+
 * triple 3セット（T1: 186–190, T2: 191–195, T3: 196–200）= 合計25問。
 *
 * 収録するのはすべて本プロジェクト用のオリジナル問題。公式問題の転載はしない。
 */

import { q, passage, messages } from './helpers';
import type { Part7Set } from '../../src/schemas/question.schema';

// ============================================================
// Double D1（No.176–180）
// 市の水質改善インフラ事業記事 ＋ 事業者/住民団体からの意見書レター
// ============================================================

// 記事: 挿入マーカー [1]〜[4] を4か所に配置する
const d1a = passage(
  't03-d1-article',
  'article',
  'City Launches Major Water Infrastructure Overhaul',
  [
    [
      // 第0段落
      'The Kelford City Council has unanimously approved the Clearwater Infrastructure Renewal Project, a $240 million initiative to replace aging water mains and upgrade three municipal treatment facilities across the metropolitan area. [1] The project is financed through a combination of state infrastructure bonds and a federal clean-water grant awarded to the city last November. Work is scheduled to commence in the third quarter of this year and is expected to be completed over a five-year period.',
      'ケルフォード市議会は、老朽化した水道本管の交換と市内3か所の浄水施設を改修するクリアウォーター・インフラ更新事業（2億4000万ドル規模）を全会一致で承認した。[1] この事業は州のインフラ債と昨年11月に市が獲得した連邦クリーンウォーター補助金の組み合わせで資金調達される。工事は今年第3四半期に着工し、5年間かけて完了する予定だ。',
    ],
    [
      // 第1段落
      'The renewal will prioritize districts that currently experience elevated levels of sediment and chlorine residuals in the distribution network. [2] Residents in the Ashburn and Denton neighborhoods will notice service interruptions of up to 72 hours during pipe replacement work, and the city has committed to providing advance notice of at least 14 days before any scheduled outage. A temporary water supply station will be established at Fairfax Park to serve affected households. [3] The city also plans to install smart water meters across all upgraded zones to enable real-time leak detection.',
      '更新工事は、配水網で土砂や残留塩素が基準値を超えている地区を優先的に対象とする。[2] アシュバーンおよびデントン地区の住民は、管の交換工事中に最大72時間の断水を経験する可能性があり、市は予定断水の少なくとも14日前に事前通知を行うことを約束している。影響を受ける世帯へのサービスとして、フェアファックス公園に臨時給水ステーションが設置される。[3] 市はまた、改修ゾーン全域にスマート水道メーターを設置し、リアルタイムの漏水検知を可能にする計画だ。',
    ],
    [
      // 第2段落
      'Community consultation sessions have been held over the past three months, generating largely favorable responses. Some concerns were raised about construction noise near residential areas and the adequacy of compensation for businesses that may lose foot traffic during road closures. [4] City officials stated that a dedicated liaison office will be established to handle business impact claims, and that eligible businesses may apply for a reimbursement of up to $5,000 per month of disruption.',
      '過去3か月間にわたってコミュニティ協議会が開催され、概ね好意的な反応が得られた。住宅地近くの建設騒音や、道路閉鎖中に客足が遠のく可能性のある事業者への補償の十分性について、一部懸念が示された。[4] 市の担当者は、事業者の影響に関する申し立てを処理するための専任連絡窓口が設置され、対象事業者は営業への影響1か月あたり最大5,000ドルの補償を申請できると説明した。',
    ],
  ],
  { hasInsertionMarkers: true },
);

// 意見書レター
const d1b = passage(
  't03-d1-letter',
  'letter',
  'Letter Submitted to the Kelford City Council',
  [
    [
      // 第0段落
      'Dear Members of the Kelford City Council, We write on behalf of the Kelford Traders\' Association to express our measured support for the Clearwater Infrastructure Renewal Project. We acknowledge that the current state of the water distribution network poses long-term risks to public health and that modernization is overdue.',
      'ケルフォード市議会議員各位　ケルフォード商工業者協会を代表して、クリアウォーター・インフラ更新事業への慎重な支持を表明します。現在の配水網の状態が長期的な公衆衛生リスクをもたらしており、近代化が遅れていることは認識しています。',
    ],
    [
      // 第1段落
      'However, we urge the Council to reconsider the proposed compensation ceiling of $5,000 per month for business disruption. Many of our members operate retail and food service establishments whose monthly revenue significantly exceeds this threshold. We request that the ceiling be raised to at least $8,000 per month, or that a sliding-scale formula be applied based on documented average monthly revenue. We also ask that the application process be simplified so that businesses do not require legal assistance to file a claim.',
      'しかし、営業への影響に対する補償上限の月額5,000ドルについて、議会に再考を強く求めます。会員の多くは小売業や飲食業を営んでおり、月間売上高がこの上限を大幅に超えています。上限を少なくとも月額8,000ドルに引き上げるか、文書化された平均月間売上高に基づくスライド式算定方式を適用することを要請します。また、事業者が申請書類作成に法的支援を必要としないよう、申請手続きを簡素化することも求めます。',
    ],
    [
      // 第2段落
      'We further request that road closure schedules in commercial zones be released no fewer than 30 days in advance, rather than the 14-day notice currently proposed for residential areas. The longer lead time would allow businesses to arrange alternative access points and notify their customers well ahead of disruption. We remain committed to working constructively with the city to ensure the project\'s success.',
      'さらに、商業地域における道路閉鎖スケジュールは、住宅地向けに現在提案されている14日前通知ではなく、少なくとも30日前に公表されるよう求めます。期間を長くすることで、事業者は代替アクセスルートを手配し、混乱が生じる十分前に顧客に通知することができます。プロジェクトの成功に向けて市と建設的に協力することを引き続き約束します。',
    ],
  ],
  { from: 'Kelford Traders\' Association', to: 'Kelford City Council' },
);

// ============================================================
// Double D2（No.181–185）
// 特許出願支援サービスの料金・手続きウェブページ ＋ スタートアップからの問い合わせメール
// ============================================================

const d2a = passage(
  't03-d2-web',
  'web_page',
  'PatentBridge — Filing Support Services',
  [
    [
      // 第0段落
      'PatentBridge provides end-to-end patent filing support for inventors and businesses of all sizes. Our licensed patent agents review your invention disclosure, conduct a prior-art search, prepare draft claims and specifications, and coordinate with your chosen national or international patent office. All engagements begin with a free 30-minute consultation.',
      'PatentBridgeは、あらゆる規模の発明者・企業向けに特許出願の包括的サポートを提供しています。当社のライセンス取得済み特許エージェントが発明開示書のレビュー、先行技術調査、請求項および明細書のドラフト作成、お客様が選択した国内外の特許庁との調整を行います。すべての依頼は30分間の無料相談から始まります。',
    ],
    [
      // 第1段落
      'Service Tiers and Fees\n\nEssential Package: Prior-art search + patentability opinion | $1,200 | Delivery: 15 business days\nStandard Package: Essential + full draft patent application | $3,800 | Delivery: 30 business days\nPremium Package: Standard + prosecution support through first office action | $6,500 | Delivery: 45 business days\nInternational Add-on (PCT filing): $2,400 per filing | Added to any package\n\nNote: A 20% discount applies to applicants who have never previously filed a patent application anywhere in the world ("first-time filer" discount). The discount is calculated on the package fee alone; add-on services are billed at their full listed rate. This discount cannot be combined with any other promotional offer. Academic institutions and non-profit organizations qualify for a separate 15% institutional rate.',
      'サービスプランと料金\n\nエッセンシャルパッケージ：先行技術調査＋特許性意見書　1,200ドル　納期：15営業日\nスタンダードパッケージ：エッセンシャル＋完全な特許出願書類ドラフト　3,800ドル　納期：30営業日\nプレミアムパッケージ：スタンダード＋最初の拒絶理由通知までの出願手続き支援　6,500ドル　納期：45営業日\n国際追加オプション（PCT出願）：1出願あたり2,400ドル　（いずれかのパッケージに追加可）\n\n注：世界中のいずれの特許庁にも初めて特許出願する申請者には、20%割引が適用されます（「初回出願者」割引）。割引はパッケージ料金のみを対象に計算され、追加オプションのサービスは定価で請求されます。この割引は他のプロモーション割引と併用できません。学術機関および非営利組織には、別途15%の機関料金が適用されます。',
    ],
    [
      // 第2段落
      'To begin, please complete the Invention Disclosure Form available in the Client Portal and schedule your free consultation. Payment is due in full prior to commencement of work. Invoices are issued in US dollars and are payable by bank transfer or major credit card. Rush processing (50% surcharge) is available for the Essential Package only, reducing the delivery window to 7 business days.',
      'ご依頼を開始するには、クライアントポータルにある発明開示書フォームを記入し、無料相談をご予約ください。お支払いは作業開始前に全額お支払いいただく必要があります。請求書は米ドル建てで、銀行振込または主要クレジットカードでお支払いいただけます。緊急処理（50%割増料金）はエッセンシャルパッケージのみに対応しており、納期を7営業日に短縮できます。',
    ],
  ],
);

const d2b = passage(
  't03-d2-email',
  'email',
  'Patent Filing Inquiry — Novova Technologies',
  [
    [
      // 第0段落
      'Dear PatentBridge Team, I am writing on behalf of Novova Technologies, a software startup incorporated eight months ago. We have developed a proprietary machine-learning algorithm for predictive equipment maintenance and are considering protecting it through a patent. Novova Technologies has never filed a patent application in any jurisdiction, so we believe we qualify for any first-time filer incentive you may offer.',
      'PatentBridgeチーム御中　8か月前に設立したソフトウェアスタートアップ、ノボバ・テクノロジーズを代表してご連絡いたします。予知保全に特化した独自の機械学習アルゴリズムを開発しており、特許によって保護することを検討しています。ノボバ・テクノロジーズはこれまでどの法域でも特許を出願したことがないため、初回出願者向けのインセンティブの対象になると考えています。',
    ],
    [
      // 第1段落
      'We are interested in the Standard Package with the PCT International Add-on, as we intend to seek protection in at least four jurisdictions. Could you confirm the total cost after applying the applicable discount? We also want to understand whether the 30-business-day delivery window for the Standard Package already accounts for the PCT add-on, or whether additional time should be expected. Finally, we note from your website that rush processing reduces the delivery time for one of your packages — could this option be applied to our order if we decide to proceed quickly?',
      'スタンダードパッケージにPCT国際追加オプションを組み合わせた形を希望しています。少なくとも4か国での権利保護を目指しているためです。適用可能な割引を適用した場合の合計費用をご確認いただけますでしょうか。また、スタンダードパッケージの30営業日という納期にPCT追加オプションが含まれているのか、それとも追加の時間が必要になるのかについても確認したいと思います。最後に、ウェブサイトから、緊急処理によっていずれかのパッケージの納期が短縮されると確認しましたが、迅速に進めることにした場合、この選択肢を私どもの注文に適用できますか。',
    ],
    [
      // 第2段落
      'We would appreciate a prompt reply, as we are presenting to investors in approximately six weeks and hope to reference a patent application in progress. Best regards, Lena Sokolov, Head of Operations, Novova Technologies',
      '約6週間後に投資家へのプレゼンを控えており、特許出願手続き中であることに言及したいと考えていますので、迅速なご返答をお願いいたします。敬具　レナ・ソコロフ　オペレーション部長　ノボバ・テクノロジーズ',
    ],
  ],
  { from: 'Lena Sokolov <l.sokolov@novova.example>', to: 'info@patentbridge.example' },
);

// ============================================================
// Triple T1（No.186–190）
// 国際見本市の出展ブース案内広告 ＋ 出展申込メール ＋ 出展料の請求書
// ============================================================

const t1a = passage(
  't03-t1-ad',
  'advertisement',
  'FinovaEx International Trade Fair — Exhibitor Information',
  [
    [
      // 第0段落
      'Join thousands of industry professionals at FinovaEx International Trade Fair, the premier annual showcase for financial technology, payment solutions, and regulatory compliance tools. The fair runs from September 14 to September 16 at the Meridian Convention Center, Harwell City.',
      '金融テクノロジー、決済ソリューション、コンプライアンスツールを紹介する主要な年次展示会「FinovaEx国際見本市」に、業界のプロフェッショナルと共に参加しませんか。見本市はハーウェル市のメリディアン・コンベンションセンターで9月14日から16日まで開催されます。',
    ],
    [
      // 第1段落
      'Booth Packages\n\nStandard Booth (9 m²): $3,600 | Includes: 1 table, 2 chairs, power access, listing in official program\nPremium Booth (18 m²): $6,800 | Includes: 2 tables, 4 chairs, power access, corner placement, logo on event banner, listing in official program\nPlus Package Add-on: Extra networking dinner ticket — $220 per ticket (max 4 per exhibitor)\n\nEarly-bird discount: 15% off any booth package for applications received by July 31. Standard Booths are available on a first-come, first-served basis; Premium Booths are limited to 20 per fair.',
      'ブースパッケージ\n\nスタンダードブース（9㎡）：3,600ドル　内容：テーブル1台、椅子2脚、電源、公式プログラム掲載\nプレミアムブース（18㎡）：6,800ドル　内容：テーブル2台、椅子4脚、電源、コーナー配置、イベントバナーへのロゴ掲載、公式プログラム掲載\nプラスパッケージ追加オプション：交流ディナー追加チケット　1枚220ドル（出展者1社あたり最大4枚）\n\nアーリーバード割引：7月31日までに申し込んだ場合、任意のブースパッケージが15%オフ。スタンダードブースは先着順。プレミアムブースは見本市ごとに20社限定。',
    ],
    [
      // 第2段落
      'Setup day is September 13 (no access before 8:00 A.M.; all booths must be ready by 6:00 P.M.). Teardown must be completed by noon on September 17. All exhibitors must hold valid commercial liability insurance with a minimum coverage of $1,000,000 and provide proof of insurance at least 10 days before the fair opens. Payment in full is required within 14 days of invoice issuance; unpaid invoices will result in forfeiture of the booth reservation.',
      '設営日は9月13日です（午前8時以前の入場不可。全ブースは午後6時までに設営完了のこと）。撤収は9月17日の正午までに完了してください。全出展者は最低100万ドルの補償額を持つ商業賠償責任保険に加入し、見本市開幕の少なくとも10日前に保険証明書を提出する必要があります。支払いは請求書発行から14日以内に全額完了が必要です。未払い請求書はブース予約の没収につながります。',
    ],
  ],
);

const t1b = passage(
  't03-t1-email',
  'email',
  'Booth Application — Coretek Solutions',
  [
    [
      // 第0段落
      'Dear FinovaEx Organizing Team, I am writing to apply for an exhibitor booth at the upcoming FinovaEx International Trade Fair in September. Coretek Solutions develops regulatory compliance software for mid-sized financial institutions, and we believe FinovaEx is the ideal venue to demonstrate our newly released Coretek Audit 3.0 platform to prospective clients.',
      'FinovaEx主催チーム御中　9月の次回FinovaEx国際見本市への出展ブースを申し込むためにご連絡いたします。コアテック・ソリューションズは中堅金融機関向けのコンプライアンスソフトウェアを開発しており、新リリースのコアテック監査3.0プラットフォームをFinovaExで潜在顧客にデモする絶好の機会と考えています。',
    ],
    [
      // 第1段落
      'We wish to reserve a Premium Booth. Additionally, we would like to purchase four networking dinner tickets. Our application is submitted on August 3. Please issue an invoice at your earliest convenience so we can arrange payment through our finance department. We have current commercial liability insurance with coverage of $2,000,000 and will provide the certificate before the required deadline.',
      'プレミアムブースを予約したいと思います。また、交流ディナーチケットを4枚購入希望です。申し込みは8月3日に提出しています。財務部門での支払い手続きを進めるため、できるだけ早く請求書を発行してください。現在の商業賠償責任保険の補償額は200万ドルで、必要な期日までに証明書を提出します。',
    ],
  ],
  { from: 'Marcus Weil <m.weil@coretech.example>', to: 'exhibitors@finovaex.example' },
);

const t1c = passage(
  't03-t1-invoice',
  'invoice',
  'FinovaEx International Trade Fair — Exhibitor Invoice',
  [
    [
      // 第0段落（請求書ヘッダー）
      'Invoice No.: FX-2024-0441\nBill To: Coretek Solutions, Attn: Marcus Weil\nInvoice Date: August 5\nDue Date: August 19\n\nDescription | Unit Price | Qty | Subtotal\nPremium Booth (18 m²) | $6,800.00 | 1 | $6,800.00\nNetworking Dinner Ticket | $220.00 | 4 | $880.00\n\nSubtotal: $7,680.00\nDiscount: $0.00\nTotal Due: $7,680.00\n\nPayment: Bank transfer to FinovaEx Events Ltd. (account details attached)\nNote: Insurance certificate must be received by September 4.',
      '請求書番号：FX-2024-0441\n請求先：コアテック・ソリューションズ　マーカス・ワイル様\n請求日：8月5日　支払期限：8月19日\n\n内容　単価　数量　小計\nプレミアムブース（18㎡）　6,800.00ドル　1　6,800.00ドル\n交流ディナーチケット　220.00ドル　4　880.00ドル\n\n小計：7,680.00ドル\n割引：0.00ドル\n合計金額：7,680.00ドル\n\n支払方法：FinovaExイベンツ社宛て銀行振込（口座詳細は添付）\n注：保険証明書は9月4日までに提出が必要です。',
    ],
  ],
);

// ============================================================
// Triple T2（No.191–195）
// 工場設備の定期停止に関する通知 ＋ 停止作業スケジュール表 ＋ 保全班のテキストメッセージ
// ============================================================

const t2a = passage(
  't03-t2-notice',
  'notice',
  'Planned Production Shutdown — Facilities Notice',
  [
    [
      // 第0段落
      'To: All Vantrik Manufacturing Plant Personnel\nFrom: Plant Operations Management\nDate: October 2\nSubject: Scheduled Maintenance Shutdown — October 21 to October 23\n\nVantrik Manufacturing will conduct a planned shutdown of Assembly Line B and the Hydraulic Press Unit from Monday, October 21 through Wednesday, October 23 inclusive. This shutdown is required to perform mandatory five-year safety inspections and to replace the hydraulic seals on Press Units 3, 5, and 7, which are approaching the end of their certified service life.',
      '宛先：バントリック製造工場全従業員\n差出人：工場運営管理部\n日付：10月2日\n件名：予定保全停止　10月21日〜23日\n\nバントリック製造は、組立ラインBおよび油圧プレスユニットの計画停止を10月21日（月）から23日（水）の3日間実施します。この停止は5年に一度の義務的安全点検と、認定耐用年数が近づいているプレスユニット3、5、7号機の油圧シール交換のために必要です。',
    ],
    [
      // 第1段落
      'During the shutdown period, Assembly Line A and the Packaging Section will continue normal operations. Employees assigned to Assembly Line B or to the Hydraulic Press Unit are requested to report to the Maintenance Support Pool in Building 4 for redeployment tasks. Supervisors will receive individual redeployment schedules by October 7.',
      '停止期間中、組立ラインAおよび包装部門は通常通り操業を続けます。組立ラインBまたは油圧プレスユニットに配属されている従業員は、再配置業務のため4号棟のメンテナンスサポートプールに報告するよう求められます。管理職は10月7日までに個別の再配置スケジュールを受け取ります。',
    ],
    [
      // 第2段落
      'The inspection and repair work will be carried out by the internal maintenance team in collaboration with Hessex Engineering Services, an external contractor. Any personnel who observe a safety concern or require access to restricted areas during the shutdown must contact the on-site safety officer directly. Unauthorized access to the maintenance zones is strictly prohibited.',
      '点検・補修作業は社内保全チームと外部委託業者のヘセックス・エンジニアリング・サービスが協力して実施します。停止期間中に安全上の懸念を発見した従業員や制限区域へのアクセスが必要な従業員は、現場の安全担当者に直接連絡してください。保全ゾーンへの無断立ち入りは厳禁です。',
    ],
  ],
);

const t2b = passage(
  't03-t2-schedule',
  'schedule',
  'Shutdown Maintenance Schedule — October 21–23, Vantrik Manufacturing',
  [
    [
      // 第0段落（スケジュール表）
      'October 21 (Monday): Safety inspection — Press Units 3 and 5 | 07:00–18:00 | Lead: Hessex Engineering (external) | Location: Press Hall\nOctober 21 (Monday): Hydraulic seal removal and preparation — Press Unit 3 | 18:00–22:00 | Lead: Internal maintenance team | Location: Press Hall\nOctober 22 (Tuesday): Hydraulic seal replacement — Press Units 3 and 5 | 07:00–20:00 | Lead: Hessex Engineering (external) | Location: Press Hall\nOctober 22 (Tuesday): Safety inspection — Press Unit 7 | 08:00–14:00 | Lead: Internal maintenance team | Location: Press Hall\nOctober 23 (Wednesday): Hydraulic seal replacement — Press Unit 7 | 07:00–15:00 | Lead: Hessex Engineering (external) | Location: Press Hall\nOctober 23 (Wednesday): Full operational test — Press Units 3, 5, and 7 | 15:00–18:00 | Lead: Plant Operations Management | Location: Press Hall',
      '10月21日（月）：安全点検　プレスユニット3・5号機　07:00〜18:00　担当：ヘセックス・エンジニアリング（外部）　場所：プレスホール\n10月21日（月）：油圧シール取り外しと準備　プレスユニット3号機　18:00〜22:00　担当：社内保全チーム　場所：プレスホール\n10月22日（火）：油圧シール交換　プレスユニット3・5号機　07:00〜20:00　担当：ヘセックス・エンジニアリング（外部）　場所：プレスホール\n10月22日（火）：安全点検　プレスユニット7号機　08:00〜14:00　担当：社内保全チーム　場所：プレスホール\n10月23日（水）：油圧シール交換　プレスユニット7号機　07:00〜15:00　担当：ヘセックス・エンジニアリング（外部）　場所：プレスホール\n10月23日（水）：完全作動テスト　プレスユニット3・5・7号機　15:00〜18:00　担当：工場運営管理部　場所：プレスホール',
    ],
    [
      // 第1段落（注記）
      'Notes: All maintenance personnel must wear full PPE in the Press Hall at all times. Hessex Engineering will bring their own hydraulic tools; plant tools are not to be used for seal replacement without explicit authorization. Assembly Line B personnel must vacate the Press Hall before 07:00 on October 21. The final test on October 23 requires sign-off from the Plant Operations Manager before line restart is authorized.',
      '注意事項：プレスホールでの作業中は全保全担当者が常に完全なPPEを着用すること。ヘセックス・エンジニアリングは自社の油圧工具を持参するため、明示的な許可なしに工場の工具をシール交換に使用しないこと。組立ラインBの担当者は10月21日午前7時前にプレスホールから退去すること。10月23日の最終テストは工場運営マネージャーの承認を得てからラインの再起動が許可される。',
    ],
  ],
);

// 保全班のテキストメッセージ
const t2c = messages(
  't03-t2-texts',
  'text_message_chain',
  'Maintenance Team Text Chain — October 22',
  [
    // 発言インデックス 0
    [
      'Ravi',
      '7:05 A.M.',
      'Morning. Hessex crew arrived on time. We are starting seal replacement on Units 3 and 5 now. Unit 7 inspection will begin around 8:00 as scheduled.',
      'おはようございます。ヘセックスのクルーが定刻に到着しました。今からユニット3・5のシール交換を始めます。ユニット7の点検は予定通り8時頃開始します。',
    ],
    // 発言インデックス 1
    [
      'Priya',
      '7:18 A.M.',
      'Good. One thing — I heard from the plant manager that the final test on the 23rd cannot start until she has personally reviewed the inspection logs. Make sure all logs are submitted to her office by 14:00 on the 23rd.',
      'わかりました。一点確認ですが、工場マネージャーから、23日の最終テストは彼女が点検記録を個人的に確認するまで開始できないと聞きました。23日の14時までに全点検記録を彼女のオフィスに提出してください。',
    ],
    // 発言インデックス 2
    [
      'Ravi',
      '7:30 A.M.',
      'Understood. Also, the Hessex team lead mentioned that the hydraulic tools they brought are not compatible with the valve fittings on Unit 5. They need to borrow the plant\'s hydraulic wrench set. Is that authorized?',
      '了解です。それと、ヘセックスのチームリードから、持参した油圧工具がユニット5のバルブ継手に合わないと報告がありました。工場の油圧レンチセットを借りる必要があるとのことです。それは許可されていますか。',
    ],
    // 発言インデックス 3
    [
      'Priya',
      '7:44 A.M.',
      'I will confirm with the operations manager and get back to you within the hour. Do not proceed with Unit 5 seals until I give the green light. Start with Unit 3 in the meantime.',
      '運営マネージャーに確認して、1時間以内に返答します。私がGOサインを出すまでユニット5のシール作業を進めないでください。その間はユニット3から始めてください。',
    ],
  ],
);

// ============================================================
// Triple T3（No.196–200）
// 医療機器の新規制施行記事 ＋ 品質保証部の社内メモ ＋ 規制対応チームのオンラインチャット
// ============================================================

const t3a = passage(
  't03-t3-article',
  'article',
  'New Medical Device Regulations to Take Effect in March',
  [
    [
      // 第0段落
      'The National Health Products Authority (NHPA) has announced that revised traceability and post-market surveillance requirements under Regulation MDR-2024 will come into force on March 1 of next year. The new rules affect all Class II and Class III medical devices distributed within the country, including imported products. Manufacturers and importers will be required to implement a unique device identification (UDI) system and to submit quarterly adverse-event reports directly through the NHPA\'s online portal.',
      '国家保健製品局（NHPA）は、改訂されたトレーサビリティおよび市販後調査に関する要件（規制MDR-2024）が来年3月1日に発効すると発表した。新規則は国内で流通するすべてのクラスIIおよびクラスIIIの医療機器（輸入品を含む）に影響する。製造業者および輸入業者は固有デバイス識別（UDI）システムを導入し、NHPAのオンラインポータルを通じて四半期ごとに有害事象報告書を直接提出することが求められる。',
    ],
    [
      // 第1段落
      'Manufacturers whose devices are currently registered under the predecessor regulation (MDR-2018) are granted a transitional period of 180 days from March 1 to update their labeling and registration records without penalty. Devices that are newly introduced to the market after March 1 must comply with MDR-2024 in full from the date of first distribution, with no transitional allowance. Failure to comply after the applicable deadline carries a financial penalty of up to $50,000 per device line per month of non-compliance.',
      'MDR-2018（前規制）の下で現在登録されている機器の製造業者には、3月1日から180日間の移行期間が付与され、ペナルティなしにラベリングおよび登録記録を更新できる。3月1日以降に新たに市場に導入される機器は、初回流通日からMDR-2024に完全に準拠しなければならず、移行期間は認められない。適用期限後の不遵守には、デバイスラインごとに月額最大5万ドルの金銭的ペナルティが科される。',
    ],
    [
      // 第2段落
      'The NHPA has published detailed implementation guidance on its website and will host a series of free webinars throughout January and February to assist industry participants with the transition. Manufacturers who anticipate difficulty completing legacy-product updates within the 180-day transitional period may apply for an extension of up to 60 additional days, provided the application is filed no later than January 15 and demonstrates a documented compliance plan. NHPA has stated that extension applications submitted after that date will not be considered.',
      'NHPAはウェブサイトに詳細な実施ガイダンスを公開しており、業界関係者の移行支援のため1月と2月に無料ウェビナーシリーズを開催する予定だ。既存製品の更新を180日間の移行期間内に完了することが困難だと見込まれる製造業者は、最大60日間の延長を申請できる。ただし、申請書は1月15日までに提出し、文書化されたコンプライアンス計画を示す必要がある。NHPAはその日付を過ぎて提出された延長申請は受け付けないと表明している。',
    ],
  ],
);

const t3b = passage(
  't03-t3-memo',
  'memo',
  'Internal Memo — MDR-2024 Compliance Action Plan',
  [
    [
      // 第0段落
      'To: Quality Assurance Team, Regulatory Affairs Team\nFrom: Dr. Yoon Seo, VP of Regulatory Compliance\nDate: December 9\nSubject: Mandatory Actions for MDR-2024 Compliance\n\nAs you are aware, MDR-2024 enters into force on March 1. Our current product portfolio includes seven Class II devices that are registered under MDR-2018 and two Class III devices that we plan to launch on April 15 and May 15 of next year, respectively. Please treat the following as mandatory action items.',
      '宛先：品質保証チーム、法規制対応チーム\n差出人：ユン・ソ博士　法規制コンプライアンス担当副社長\n日付：12月9日\n件名：MDR-2024コンプライアンスの必須対応事項\n\nご承知のとおり、MDR-2024は3月1日に発効します。現在の製品ポートフォリオには、MDR-2018の下で登録されている7つのクラスIIデバイスと、来年4月15日と5月15日にそれぞれ発売予定の2つのクラスIIIデバイスが含まれています。以下を必須対応事項として対応してください。',
    ],
    [
      // 第1段落
      'Action 1 — UDI System Implementation: IT and QA must complete UDI labeling integration for all seven legacy Class II devices by August 28 (the final day of the 180-day transitional period). Interim labeling compliance reviews are due on May 1 and July 1.\nAction 2 — New Product Compliance: The two Class III devices planned for Q2 launch must be fully MDR-2024-compliant from day one of distribution. Engineering and Regulatory Affairs must sign off compliance documentation at least 30 days before the planned launch date.\nAction 3 — Extension Application: Given the complexity of updating UDI labels for three of our legacy devices (Product Lines 4, 6, and 8), I recommend filing an extension application with NHPA. This must be filed no later than January 15 and must include a detailed compliance roadmap.',
      '対応1 — UDIシステム導入：ITおよびQAは、7つの既存クラスIIデバイスすべてについて、180日間移行期間の最終日である8月28日までにUDIラベリング統合を完了すること。中間ラベリングコンプライアンスレビューは5月1日と7月1日が期限。\n対応2 — 新製品コンプライアンス：Q2発売予定の2つのクラスIIIデバイスは、流通初日からMDR-2024に完全準拠していなければならない。エンジニアリングおよび法規制対応部門は、計画発売日の少なくとも30日前にコンプライアンス文書に署名すること。\n対応3 — 延長申請：既存デバイス3製品（製品ライン4・6・8）のUDIラベル更新の複雑さを考慮し、NHPAへ延長申請を提出することを勧める。申請は1月15日までに提出し、詳細なコンプライアンスロードマップを含める必要がある。',
    ],
  ],
);

// 規制対応チームのオンラインチャット
const t3c = messages(
  't03-t3-chat',
  'online_chat',
  'Regulatory Compliance Team Channel — December 9',
  [
    // 発言インデックス 0
    [
      'Yoon',
      '3:10 P.M.',
      'Hi team. I just circulated the compliance memo for MDR-2024. Please read it carefully — the deadlines are firm.',
      'みなさん。MDR-2024のコンプライアンスメモを配布しました。期限は厳守ですので、注意深くお読みください。',
    ],
    // 発言インデックス 1
    [
      'Clara',
      '3:22 P.M.',
      'Noted. Regarding the extension application — I want to confirm: the article says extensions can cover up to 60 additional days. If the full extension is approved, that would push the deadline for Product Lines 4, 6, and 8 to late October, correct?',
      '了解です。延長申請についてですが、記事によると最大60日間の延長が認められるとのこと。満額の延長が承認された場合、製品ライン4・6・8の期限は10月下旬まで延びるということで合っていますか。',
    ],
    // 発言インデックス 2
    [
      'Yoon',
      '3:31 P.M.',
      'That is correct. The 180-day transitional period ends August 28, and a 60-day extension would move the hard deadline to October 27. But this is contingent on NHPA approval, so we cannot rely on it for planning.',
      'その通りです。180日間の移行期間は8月28日で終了し、60日間の延長が認められれば最終期限は10月27日になります。ただし、NHPAの承認が前提なので、計画の根拠にはできません。',
    ],
    // 発言インデックス 3
    [
      'Ben',
      '3:45 P.M.',
      'What about the two new Class III devices? Those are going into distribution on April 15 and May 15. Does the memo mean we need the compliance sign-offs done by March 16 and April 15, respectively?',
      '新しいクラスIIIデバイスの2製品はどうなりますか。4月15日と5月15日に流通開始予定ですよね。メモによると、コンプライアンス署名はそれぞれ3月16日と4月15日までに完了する必要があるということですか。',
    ],
    // 発言インデックス 4
    [
      'Yoon',
      '3:58 P.M.',
      'Exactly. Those are the correct sign-off dates. The point is that new products have zero grace period under MDR-2024 — they must be compliant from the first day they ship.',
      'その通りです。それが正しい署名期限です。重要なのは、新製品にはMDR-2024上の猶予期間がないということです。出荷初日から規制に準拠していなければなりません。',
    ],
  ],
);

// ============================================================
// エクスポート
// ============================================================

export const multiSets: Part7Set[] = [
  // ──────────────────────────────
  // Double D1（No.176–180）
  // 市の水質改善インフラ事業記事 ＋ 住民・商工業者意見書レター
  // ──────────────────────────────
  {
    setType: 'double',
    passages: [d1a, d1b],
    questions: [
      // No.176 — insertion: 記事の [1]〜[4] に挿入するのに最適な文を選ぶ
      q(
        176,
        'insertion',
        'In which position marked [1], [2], [3], or [4] does the following sentence best belong? "Officials noted that this represents the city\'s single largest capital investment in water infrastructure in more than 30 years."',
        '次の文は [1]、[2]、[3]、[4] のどの位置に入るのが最も適切ですか。「担当者は、これが30年以上で市の水インフラへの最大の単一資本投資であると指摘した。」',
        [
          ['[1]', '承認・資金調達の文脈の直後に投資規模を強調する当局コメントを置くと流れが自然です。'],
          ['[2]', 'この位置は優先対象地区の説明が続いており、投資規模のコメントを挿入する文脈ではありません。'],
          ['[3]', 'この位置はスマートメーター設置計画の後であり、投資規模の強調とは話題がずれます。'],
          ['[4]', 'この位置は補償申請の話題の後であり、プロジェクト全体の規模を強調するには唐突です。'],
        ],
        0,  // 正解は [1]
        '事業承認と資金調達の説明の直後（[1]）に、投資規模の大きさを補足する当局コメントを置くのが最も論理的な流れです。',
        [],
      ),

      // No.177 — main_idea: 記事の主旨
      q(
        177,
        'main_idea',
        'What is the article mainly about?',
        '記事は主に何について書かれていますか。',
        [
          ['A city\'s approval of a large-scale water system upgrade', '記事全体は市議会が承認した水道インフラ更新事業の概要（規模・工程・住民影響・補償）を中心に展開しています。'],
          ['A shortage of water supply in a metropolitan district', '水不足については触れられていません。'],
          ['The findings of a public health investigation into tap water quality', '公衆衛生調査の結論は記事の主題ではありません。'],
          ['Plans to privatize municipal water treatment facilities', '民営化の計画は記事のどこにも述べられていません。'],
        ],
        0,  // 正解
        '記事は市議会によるクリアウォーター・インフラ更新事業の承認を中心に、工期・資金・断水計画・補償制度を説明しています。',
        [['t03-d1-article', 0, 'Kelford City Council has unanimously approved the Clearwater Infrastructure Renewal Project']],
      ),

      // No.178 — detail: 断水前の通知期間（クロスリファレンス: 記事 × レター）
      q(
        178,
        'detail',
        'According to the article, how far in advance will residents be notified before a planned water outage?',
        '記事によると、計画断水の何日前に住民に通知されますか。',
        [
          ['At least 14 days', '記事には「advance notice of at least 14 days before any scheduled outage」と明記されています。'],
          ['At least 30 days', '30日前通知はレター側が商業地域向けに要請している内容であり、記事に記載されている住宅地向けの通知期間ではありません。'],
          ['At least 7 days', '7日前という数字は記事のどこにも登場しません。'],
          ['At least 21 days', '21日前という数字は記事にも意見書にも記載がありません。'],
        ],
        0,  // 正解
        '記事第1段落に「advance notice of at least 14 days」と明記されています。30日前という数字は商業地域向けの要請としてレターに記載されており、混同しないことが重要です。',
        [
          ['t03-d1-article', 1, 'advance notice of at least 14 days before any scheduled outage'],
          ['t03-d1-letter', 2, 'road closure schedules in commercial zones be released no fewer than 30 days in advance'],
        ],
      ),

      // No.179 — infer: クロスリファレンス（記事の補償上限 × レターの要望）
      q(
        179,
        'infer',
        'What can be inferred about the Kelford Traders\' Association\'s view of the proposed compensation program?',
        'ケルフォード商工業者協会は提案されている補償プログラムについてどのような見解を持っていると推測できますか。',
        [
          ['They consider the monthly maximum payment to be insufficient for many businesses.', '意見書は補償上限（月額5,000ドル）が会員の多くの月間売上高を大幅に下回ると明示しており、引き上げを求めています。'],
          ['They oppose the establishment of a liaison office for business impact claims.', '連絡窓口の設置には反対しておらず、手続き簡素化を求めているだけです。'],
          ['They believe the compensation program should be extended to residential households.', '住宅世帯への補償拡大は要求していません。'],
          ['They are satisfied with the existing reimbursement ceiling and request faster processing.', '現行の補償上限に満足しているのではなく、引き上げを求めています。'],
        ],
        0,  // 正解
        '記事は月額5,000ドルの上限を示しており、意見書はその上限が会員の多くの月間売上高を大幅に下回ると述べ、月額8,000ドルへの引き上げを要請しています。',
        [
          ['t03-d1-article', 2, 'eligible businesses may apply for a reimbursement of up to $5,000 per month of disruption'],
          ['t03-d1-letter', 1, 'monthly revenue significantly exceeds this threshold. We request that the ceiling be raised to at least $8,000 per month'],
        ],
      ),

      // No.180 — detail: 意見書の追加要望
      q(
        180,
        'detail',
        'What additional request does the Kelford Traders\' Association make regarding the disruption schedule?',
        'ケルフォード商工業者協会は工事スケジュールについてどのような追加要求をしていますか。',
        [
          ['Earlier notification of road closures in business districts', '意見書は商業地域の道路閉鎖スケジュールを少なくとも30日前に公表するよう求めています。'],
          ['A complete ban on construction work during business hours', '営業時間中の工事全面禁止は要求していません。'],
          ['Separate consultation meetings exclusive to commercial tenants', '商業テナント専用の協議会の開催は求めていません。'],
          ['A written guarantee that foot traffic will not decrease near retail areas', '客足の減少を保証するよう求める記述はありません。'],
        ],
        0,  // 正解
        '意見書第2段落に「road closure schedules in commercial zones be released no fewer than 30 days in advance」と明記されています。',
        [['t03-d1-letter', 2, 'road closure schedules in commercial zones be released no fewer than 30 days in advance']],
      ),
    ],
  },

  // ──────────────────────────────
  // Double D2（No.181–185）
  // 特許出願支援ウェブページ ＋ スタートアップからの問い合わせメール
  // ──────────────────────────────
  {
    setType: 'double',
    passages: [d2a, d2b],
    questions: [
      // No.181 — detail: ウェブページの情報（緊急処理の対象パッケージ）
      q(
        181,
        'detail',
        'According to the website, for which service does PatentBridge offer expedited processing?',
        'ウェブサイトによると、PatentBridgeはどのサービスに対して緊急処理を提供していますか。',
        [
          ['The Essential Package only', 'ウェブページに「Rush processing (50% surcharge) is available for the Essential Package only」と明記されています。'],
          ['Any package for an additional flat fee', '均一料金ではなく50%割増料金であり、すべてのパッケージが対象ではありません。'],
          ['The Standard and Premium Packages when combined with a PCT add-on', 'スタンダードおよびプレミアムパッケージへの緊急処理は提供されていません。'],
          ['All packages, provided the client applies at least 48 hours in advance', '全パッケージへの適用は記載がなく、48時間前申請の条件も存在しません。'],
        ],
        0,  // 正解
        'ウェブページ第2段落に「Rush processing (50% surcharge) is available for the Essential Package only」と明確に記載されています。',
        [['t03-d2-web', 2, 'Rush processing (50% surcharge) is available for the Essential Package only']],
      ),

      // No.182 — infer: ノボバ社の状況（クロスリファレンス: ウェブ × メール）
      q(
        182,
        'infer',
        'What can be inferred about Novova Technologies with regard to the first-time filer discount?',
        'ノボバ・テクノロジーズの初回出願者割引への適格性について推測できることは何ですか。',
        [
          ['The company is likely eligible because it has never filed a patent application in any jurisdiction.', 'メールにノボバ社自身がどの法域でも特許を出願したことがないと明記されており、ウェブの初回出願者割引の定義に合致します。'],
          ['The company is ineligible because it is not an academic institution or non-profit.', '学術機関・非営利組織は別の機関料金の対象であり、初回出願者割引とは無関係です。'],
          ['The company cannot claim the discount because it has been in operation for more than six months.', '設立からの期間は割引適格条件に含まれていません。'],
          ['The discount does not apply because Novova intends to file in multiple jurisdictions.', '複数国での出願は割引の適用除外条件として記載されていません。'],
        ],
        0,  // 正解
        'ウェブサイトの初回出願者割引は「世界中のいずれの特許庁にも一度も出願したことがない申請者」に適用されます。メールは申請者であるノボバ社自身がどの法域でも出願したことがないと述べており、適格と判断できます。',
        [
          ['t03-d2-web', 1, 'applicants who have never previously filed a patent application anywhere in the world'],
          ['t03-d2-email', 0, 'Novova Technologies has never filed a patent application in any jurisdiction'],
        ],
      ),

      // No.183 — synonym: ウェブページ第0段落 "conduct" の同義語
      q(
        183,
        'synonym',
        'The word "conduct" in paragraph 1 of the website is closest in meaning to which of the following?',
        'ウェブサイト第1段落の "conduct" に最も近い意味を持つ語はどれですか。',
        [
          ['carry out', '「実施する」という意味で、先行技術調査を実行するという文脈に最もよく合います。'],
          ['direct', '「指揮する」という意味で、人を指導する場面に使われ、調査の実行を表す用法としては不自然です。'],
          ['restrict', '「制限する」という意味で、文脈とまったく合いません。'],
          ['summarize', '「要約する」という意味で、先行技術調査を実施するという意味には合いません。'],
        ],
        0,  // 正解
        '"conduct a prior-art search" は先行技術調査を「実施する」という意味で使われており、"carry out" が最も近い意味です。',
        [['t03-d2-web', 0, 'conduct a prior-art search']],
        { targetWord: 'conduct' },
      ),

      // No.184 — detail: クロスリファレンス（割引後の合計費用）
      // スタンダード $3,800 × 0.80 = $3,040 + PCT $2,400 = $5,440
      q(
        184,
        'detail',
        'If Novova Technologies proceeds with the Standard Package and the PCT add-on, what will be their total cost after the applicable discount?',
        'ノボバ・テクノロジーズがスタンダードパッケージとPCT追加オプションで進めた場合、適用可能な割引後の合計費用はいくらですか。',
        [
          ['$5,440', 'スタンダードパッケージ（3,800ドル）に初回出願者20%割引を適用すると3,800×0.80＝3,040ドル。PCT追加オプション（2,400ドル）は割引対象外のため合計3,040＋2,400＝5,440ドルです。'],
          ['$6,200', '割引を適用しない場合の合計（3,800＋2,400＝6,200）であり、20%割引が考慮されていません。'],
          ['$4,960', 'PCT追加オプションにも誤って20%割引を適用した場合の計算（3,040＋1,920＝4,960）です。'],
          ['$5,720', '割引の適用先を取り違え、パッケージ料金ではなくPCT追加オプションのみを2割引にした場合の計算（3,800＋1,920＝5,720）です。'],
        ],
        0,  // 正解
        'ウェブページの注記に「割引はパッケージ料金のみを対象に計算され、追加オプションは定価で請求される」とあります。したがって初回出願者割引20%はスタンダードパッケージ（3,800ドル）だけに適用され、3,800×0.80＝3,040ドル。PCTオプション（2,400ドル）は定価のままなので、合計3,040＋2,400＝5,440ドルです。',
        [
          ['t03-d2-web', 1, 'The discount is calculated on the package fee alone; add-on services are billed at their full listed rate.'],
          ['t03-d2-email', 0, 'Novova Technologies has never filed a patent application in any jurisdiction'],
          ['t03-d2-email', 1, 'Standard Package with the PCT International Add-on'],
        ],
      ),

      // No.185 — infer: レナ・ソコロフが緊急処理について尋ねた意図
      q(
        185,
        'infer',
        'What does Lena Sokolov imply about the rush processing option?',
        'レナ・ソコロフは緊急処理オプションについて何を示唆していますか。',
        [
          ['She is considering using it if they decide to move forward quickly with the application.', 'メールに「if we decide to proceed quickly」と明示されており、迅速に進む場合の選択肢として検討していることが分かります。'],
          ['She assumes rush processing is automatically included with the PCT add-on.', 'PCT追加オプションに緊急処理が自動付帯するとは述べておらず、適用できるかを質問しています。'],
          ['She believes the 30-day delivery window is too short for her investor presentation deadline.', '30日の納期が短すぎるとは述べておらず、むしろ投資家プレゼンへの間に合わせを懸念しています。'],
          ['She has already decided to use rush processing and is confirming the fee.', 'すでに決定したとは述べておらず、可能性を尋ねています。'],
        ],
        0,  // 正解
        'メール第1段落の「if we decide to proceed quickly」という表現から、ソコロフが迅速に進める場合の選択肢として緊急処理を検討していることが分かります。ただし、ウェブページにより緊急処理はエッセンシャルパッケージのみが対象であるため、スタンダードパッケージには実際には適用できません。',
        [
          ['t03-d2-email', 1, 'if we decide to proceed quickly'],
          ['t03-d2-web', 2, 'Rush processing (50% surcharge) is available for the Essential Package only'],
        ],
      ),
    ],
  },

  // ──────────────────────────────
  // Triple T1（No.186–190）
  // 国際見本市出展ブース広告 ＋ 出展申込メール ＋ 出展料請求書
  // ──────────────────────────────
  {
    setType: 'triple',
    passages: [t1a, t1b, t1c],
    questions: [
      // No.186 — main_idea: 広告の主旨
      q(
        186,
        'main_idea',
        'What is the primary purpose of the advertisement?',
        '広告の主な目的は何ですか。',
        [
          ['To invite businesses to exhibit at an upcoming trade fair', '広告全体は金融テクノロジー関連の見本市への出展者募集を目的としています。'],
          ['To announce a change in venue for an annual trade event', '会場変更の発表ではなく、出展者の募集が目的です。'],
          ['To provide attendees with a schedule of conference sessions', '参加者向けのセッションスケジュールは広告の目的ではありません。'],
          ['To promote a fintech software product to potential buyers', '特定のソフトウェア製品の宣伝ではありません。'],
        ],
        0,  // 正解
        '広告はFinovaEx国際見本市への出展者募集を目的とし、ブースパッケージの種類・料金・条件を提示しています。',
        [['t03-t1-ad', 0, 'FinovaEx International Trade Fair, the premier annual showcase for financial technology']],
      ),

      // No.187 — detail: クロスリファレンス（早期割引 × 申込日）
      q(
        187,
        'detail',
        'Did Coretek Solutions qualify for the early-bird discount?',
        'コアテック・ソリューションズはアーリーバード割引の対象となりましたか。',
        [
          ['No, because its application was submitted after the deadline.', '広告はアーリーバード割引の締め切りを7月31日と定めており、メールによる申し込みは8月3日です。期限後のため割引対象外です。'],
          ['Yes, because it reserved a Premium Booth which qualifies automatically.', 'プレミアムブースの予約が割引を自動的に付与するという条件はありません。'],
          ['Yes, because Coretek applied more than 30 days before the fair.', '30日前というルールは広告に存在せず、7月31日の締め切りが適用されます。'],
          ['No, because Coretek only qualifies if it books two or more booths.', '2ブース以上の予約が割引条件というルールは広告にありません。'],
        ],
        0,  // 正解
        '広告の早期割引締め切りは7月31日です。コアテックのメールは8月3日付けの申し込みであり、請求書にも割引額がゼロと記載されています。締め切り後の申し込みのため割引対象外です。',
        [
          ['t03-t1-ad', 1, 'Early-bird discount: 15% off any booth package for applications received by July 31'],
          ['t03-t1-email', 1, 'Our application is submitted on August 3'],
          ['t03-t1-invoice', 0, 'Discount: $0.00'],
        ],
      ),

      // No.188 — infer: クロスリファレンス（保険証明書の提出期限）
      q(
        188,
        'infer',
        'By what date must Coretek Solutions submit its insurance certificate?',
        'コアテック・ソリューションズはいつまでに保険証明書を提出しなければなりませんか。',
        [
          ['September 4', '広告は「見本市開幕の少なくとも10日前」に保険証明書の提出を求めており、見本市は9月14日に開幕するため、10日前は9月4日です。請求書にもこの日付が明記されています。'],
          ['September 13', '9月13日は設営日であり、保険証明書の提出期限ではありません。'],
          ['August 19', '8月19日は請求書の支払期限であり、保険証明書の提出期限ではありません。'],
          ['September 7', '9月7日という日付は広告にも請求書にも記載されていません。'],
        ],
        0,  // 正解
        '広告に「見本市開幕の少なくとも10日前に保険証明書を提出」とあります。見本市は9月14日開幕なので10日前は9月4日です。請求書にも「Insurance certificate must be received by September 4」と明記されています。',
        [
          ['t03-t1-ad', 2, 'provide proof of insurance at least 10 days before the fair opens'],
          ['t03-t1-invoice', 0, 'Insurance certificate must be received by September 4'],
        ],
      ),

      // No.189 — not: 広告に明記されていない内容
      q(
        189,
        'not',
        'Which of the following is NOT mentioned in the advertisement as being included in the Premium Booth package?',
        '次のうち、広告にプレミアムブースパッケージの内容として記載されていないものはどれですか。',
        [
          ['A complimentary parking pass for exhibitors', '駐車場パスの提供は広告にまったく言及されていません。'],
          ['Placement at a corner location', '広告にはプレミアムブースの「corner placement（コーナー配置）」が明記されています。'],
          ['A logo displayed on the event banner', '広告にはプレミアムブースに「logo on event banner（イベントバナーへのロゴ掲載）」が含まれると明記されています。'],
          ['A listing in the official program', '広告にはプレミアムブースに「listing in official program（公式プログラム掲載）」が含まれると明記されています。'],
        ],
        0,  // 正解（言及されていないのは駐車場パス）
        '広告のプレミアムブースには「コーナー配置」「イベントバナーへのロゴ掲載」「公式プログラム掲載」が明記されていますが、駐車場パスについては一切触れられていません。',
        [['t03-t1-ad', 1, 'Premium Booth (18 m²): $6,800 | Includes: 2 tables, 4 chairs, power access, corner placement, logo on event banner, listing in official program']],
      ),

      // No.190 — detail: 請求書の詳細（コアテックの支払金額）
      q(
        190,
        'detail',
        'What is the total amount that Coretek Solutions is required to pay according to the invoice?',
        '請求書によると、コアテック・ソリューションズが支払うべき合計金額はいくらですか。',
        [
          ['$7,680', '請求書にプレミアムブース（6,800ドル）＋交流ディナーチケット4枚（880ドル）＝7,680ドルと明記されています。'],
          ['$6,800', 'これはプレミアムブースのみの金額であり、ディナーチケット代が含まれていません。'],
          ['$7,460', 'このような合計金額は請求書に記載されていません。'],
          ['$5,780', '早期割引を誤適用した場合の誤った計算値で、請求書の実際の金額と異なります。'],
        ],
        0,  // 正解
        '請求書はプレミアムブース6,800ドルと交流ディナーチケット4枚分880ドルの合計7,680ドルを明示しています。',
        [['t03-t1-invoice', 0, 'Total Due: $7,680.00']],
      ),
    ],
  },

  // ──────────────────────────────
  // Triple T2（No.191–195）
  // 工場設備の定期停止通知 ＋ 停止作業スケジュール表 ＋ 保全班のテキストメッセージ
  // ──────────────────────────────
  {
    setType: 'triple',
    passages: [t2a, t2b, t2c],
    questions: [
      // No.191 — detail: 停止の対象ユニット
      q(
        191,
        'detail',
        'According to the notice, which equipment will be taken offline during the shutdown?',
        '通知によると、停止期間中にオフラインになる機器はどれですか。',
        [
          ['Assembly Line B and the Hydraulic Press Unit', '通知に「Assembly Line B and the Hydraulic Press Unit」の停止が明記されています。'],
          ['All assembly lines and the packaging section', '包装部門と組立ラインAは通常操業を続けます。'],
          ['The Hydraulic Press Unit only, while Assembly Line B operates normally', '組立ラインBも停止対象です。'],
          ['Press Units 3, 5, and 7 only, with Line B continuing at reduced capacity', '組立ラインBも停止対象であり、縮小操業ではありません。'],
        ],
        0,  // 正解
        '通知第0段落に「shutdown of Assembly Line B and the Hydraulic Press Unit」と明記されています。',
        [['t03-t2-notice', 0, 'planned shutdown of Assembly Line B and the Hydraulic Press Unit']],
      ),

      // No.192 — infer: クロスリファレンス（通知の外部業者 × スケジュールの担当分担）
      q(
        192,
        'infer',
        'What role does Hessex Engineering Services play during the shutdown?',
        'ヘセックス・エンジニアリング・サービスは停止期間中にどのような役割を果たしていますか。',
        [
          ['They lead safety inspections and hydraulic seal replacement on certain press units.', '通知は外部業者として記載し、スケジュールはヘセックスが安全点検とシール交換の特定作業を主導すると示しています。'],
          ['They manage the redeployment of Assembly Line B workers to other tasks.', '従業員の再配置管理は工場内部の担当であり、外部業者の役割ではありません。'],
          ['They conduct the final operational test on all three press units on October 23.', '最終作動テストは工場運営管理部の担当とスケジュールに記載されています。'],
          ['They provide temporary workers to assist the internal maintenance team full-time.', '一時的な労働力の提供は通知にもスケジュールにも記載されていません。'],
        ],
        0,  // 正解
        '通知は外部委託業者としてヘセックスを挙げ、スケジュールでは安全点検（21日・プレスユニット3・5）およびシール交換（22日・23日）を主導する担当として記載されています。',
        [
          ['t03-t2-notice', 2, 'collaboration with Hessex Engineering Services, an external contractor'],
          ['t03-t2-schedule', 0, 'Safety inspection — Press Units 3 and 5 | 07:00–18:00 | Lead: Hessex Engineering (external)'],
        ],
      ),

      // No.193 — not: スケジュールに記載されていない内容
      q(
        193,
        'not',
        'Which of the following activities is NOT listed in the maintenance schedule?',
        '次のうち、保全スケジュールに記載されていない活動はどれですか。',
        [
          ['Recertification training for plant maintenance personnel', '人員の再認定訓練はスケジュールに一切記載されていません。'],
          ['A safety inspection of Press Units 3 and 5', '10月21日の項目に「Safety inspection — Press Units 3 and 5」と明記されています。'],
          ['A full operational test of all three press units', '10月23日の項目に「Full operational test — Press Units 3, 5, and 7」と明記されています。'],
          ['Hydraulic seal removal and preparation for Press Unit 3', '10月21日の項目に「Hydraulic seal removal and preparation — Press Unit 3」と明記されています。'],
        ],
        0,  // 正解（スケジュールに記載されていないのは再認定訓練）
        'スケジュールに記載されているのは安全点検・シール取り外し・シール交換・最終テストです。保全担当者の再認定訓練についてはどこにも記載されていません。',
        [['t03-t2-schedule', 0, 'Full operational test — Press Units 3, 5, and 7 | 15:00–18:00 | Lead: Plant Operations Management']],
      ),

      // No.194 — intention: プリヤの発言の意図（テキストメッセージ）
      q(
        194,
        'intention',
        'At 7:44 A.M., why does Priya write, "Do not proceed with Unit 5 seals until I give the green light"?',
        '午前7時44分に、プリヤが「私がGOサインを出すまでユニット5のシール作業を進めないでください」と書いた理由は何ですか。',
        [
          ['She needs to obtain authorization before Hessex is permitted to use plant tools on Unit 5.', 'スケジュールでは工場の工具は明示的な許可なしに使えないとされており、プリヤは運営マネージャーへの確認が終わるまで作業を一時停止させています。'],
          ['She wants to ensure the Unit 5 inspection is completed before seals are replaced.', 'スケジュールによるとユニット5の点検は22日に行われ、プリヤがメッセージを送った21日の問題とは別の話です。'],
          ['She is concerned that Unit 5 has not yet been cleared by the on-site safety officer.', '安全担当者のクリアランス問題は言及されておらず、工具の使用許可が問題の核心です。'],
          ['She plans to supervise the Unit 5 work personally and has not arrived at the Press Hall yet.', 'プリヤの個人的な立ち会いは言及されておらず、工具使用の許可確認が理由です。'],
        ],
        0,  // 正解
        'ラビのメッセージはヘセックスが工場の油圧レンチセットの借用を求めていると報告しています。スケジュールノートには明示的な許可なしに工場工具をシール交換に使用してはならないとあり、プリヤは運営マネージャーへの確認が取れるまでユニット5の作業を停止させています。',
        [
          ['t03-t2-texts', 2, 'the Hessex team lead mentioned that the hydraulic tools they brought are not compatible with the valve fittings on Unit 5'],
          ['t03-t2-schedule', 1, 'plant tools are not to be used for seal replacement without explicit authorization'],
        ],
        { intentionTarget: { sender: 'Priya', utteranceEn: 'I will confirm with the operations manager and get back to you within the hour. Do not proceed with Unit 5 seals until I give the green light. Start with Unit 3 in the meantime.' } },
      ),

      // No.195 — infer: クロスリファレンス（最終テスト条件 × プリヤのメッセージ）
      q(
        195,
        'infer',
        'What does the information in the texts suggest about the final operational test on October 23?',
        'テキストメッセージの情報から、10月23日の最終作動テストについて何が推測できますか。',
        [
          ['The test cannot begin until inspection records have been reviewed by the plant manager.', 'プリヤのメッセージはスケジュールの「工場運営マネージャーの承認後に再起動が許可される」という条件を補強し、点検記録の提出期限（14時）が最終テスト（15時開始）より前であることを示しています。'],
          ['The test will be conducted by the Hessex Engineering team, not plant staff.', 'スケジュールによると最終テストは工場運営管理部が担当します。'],
          ['The test has been moved to the morning to allow for an earlier restart of Assembly Line B.', '最終テスト時間の変更はどこにも示されていません。'],
          ['The test outcome determines whether the shutdown will be extended by one additional day.', '停止の延長はどの文書にも言及されていません。'],
        ],
        0,  // 正解
        'スケジュールには最終テスト前に工場運営マネージャーの承認が必要とあります。プリヤのメッセージは点検記録を14時までにマネージャーのオフィスに提出するよう指示しており、15時開始の最終テストの前に承認手続きが完了する流れを示しています。',
        [
          ['t03-t2-schedule', 1, 'The final test on October 23 requires sign-off from the Plant Operations Manager before line restart is authorized'],
          ['t03-t2-texts', 1, 'Make sure all logs are submitted to her office by 14:00 on the 23rd'],
        ],
      ),
    ],
  },

  // ──────────────────────────────
  // Triple T3（No.196–200）
  // 医療機器新規制記事 ＋ 品質保証部の社内メモ ＋ 規制対応チームのオンラインチャット
  // ──────────────────────────────
  {
    setType: 'triple',
    passages: [t3a, t3b, t3c],
    questions: [
      // No.196 — detail: 記事の情報（移行期間の対象）
      q(
        196,
        'detail',
        'According to the article, which products are eligible for the 180-day transitional period under MDR-2024?',
        '記事によると、MDR-2024の下で180日間の移行期間の対象となるのはどの製品ですか。',
        [
          ['Devices currently registered under the predecessor regulation MDR-2018', '記事に「Manufacturers whose devices are currently registered under the predecessor regulation (MDR-2018) are granted a transitional period of 180 days」と明記されています。'],
          ['All Class II and Class III devices regardless of registration status', '新規に市場投入される機器は移行期間の対象外です。'],
          ['Only Class III devices that were approved before January 1 of the current year', 'クラスIIIのみ、または特定の承認日という条件は記事に記載されていません。'],
          ['Imported products that applied for an extension before March 1', '輸入品の延長申請が移行期間の条件であるとは記載されていません。'],
        ],
        0,  // 正解
        '記事第1段落に、MDR-2018の下で登録済みの機器の製造業者に180日間の移行期間が付与されると明記されています。3月1日以降に新規市場投入される機器は移行期間が認められません。',
        [['t03-t3-article', 1, 'Manufacturers whose devices are currently registered under the predecessor regulation (MDR-2018) are granted a transitional period of 180 days from March 1']],
      ),

      // No.197 — infer: クロスリファレンス（記事の延長申請条件 × メモのアクション3）
      q(
        197,
        'infer',
        'What can be inferred about the company\'s plan to file an extension application with the NHPA?',
        'NHPAへの延長申請を行う会社の計画について推測できることは何ですか。',
        [
          ['The application must be submitted before the deadline stated in the article.', '記事は延長申請を1月15日以前に提出しなければならないと定めており、メモも同じ期限を示しています。会社は対象製品ラインを特定し申請を準備する必要があります。'],
          ['The extension would allow the company to delay compliance indefinitely.', '延長は最大60日間であり、無期限の猶予ではありません。'],
          ['Only Class III devices are eligible for the 60-day extension.', '記事では既存の登録済み製品（移行期間対象）への延長が述べられており、クラスIIIのみとは限定していません。'],
          ['The company has already submitted the application and is awaiting NHPA approval.', 'メモは申請を推奨しているだけで、すでに提出済みとは述べていません。'],
        ],
        0,  // 正解
        '記事は延長申請の期限を1月15日と定めており、メモも「1月15日以前に提出」と同じ期限を示しています。記事とメモの両方を参照することで、申請可能期限・申請対象（製品ライン4・6・8）・必要書類が確認できます。',
        [
          ['t03-t3-article', 2, 'application is filed no later than January 15'],
          ['t03-t3-memo', 1, 'must be filed no later than January 15 and must include a detailed compliance roadmap'],
        ],
      ),

      // No.198 — synonym: チャット発言インデックス2 "contingent on" の同義語
      q(
        198,
        'synonym',
        'In the online chat at 3:31 P.M., the phrase "contingent on" is closest in meaning to which of the following?',
        'オンラインチャットの午後3時31分の発言で、"contingent on" に最も近い意味を持つ表現はどれですか。',
        [
          ['dependent on', '「〜次第で決まる」という意味で、"contingent on NHPA approval"（NHPAの承認が前提）と同じ意味を表します。'],
          ['regardless of', '「〜にかかわらず」という意味で、文脈と正反対の意味になります。'],
          ['in addition to', '「〜に加えて」という意味で、条件関係を表すには合いません。'],
          ['prior to', '「〜より前に」という時間関係を表し、条件関係とは異なります。'],
        ],
        0,  // 正解
        '"contingent on NHPA approval" は「NHPAの承認を条件とする」という意味で使われており、"dependent on" が最も近い意味です。',
        [['t03-t3-chat', 2, 'this is contingent on NHPA approval, so we cannot rely on it for planning']],
        { targetWord: 'contingent on' },
      ),

      // No.199 — infer: クロスリファレンス（記事の新製品条件 × メモのアクション2 × チャットの質問）
      q(
        199,
        'infer',
        'Based on the information in all three documents, what is implied about the two new Class III devices?',
        '3つの文書の情報に基づくと、2つの新しいクラスIIIデバイスについて何が示唆されていますか。',
        [
          ['They must be fully compliant with MDR-2024 from the first day they are sold, with no transitional grace period.', '記事は3月1日以降の新規市場投入製品には移行期間が認められないと述べており、メモとチャットも同様の条件を確認しています。'],
          ['They are eligible for a 60-day extension because they have not yet been distributed.', '延長申請は既存の登録済み製品（MDR-2018登録済み）向けであり、新規製品には適用されません。'],
          ['They must be registered under MDR-2018 before March 1 to be sold in Q2.', '新規製品はMDR-2018の下で登録する必要があるという条件は記事に記載されていません。'],
          ['They are exempt from the UDI requirement because they are Class III and not Class II.', 'UDI要件はクラスIIとクラスIIIの両方に適用されます。'],
        ],
        0,  // 正解
        '記事は新規市場投入製品には移行期間がないと述べています。メモのアクション2は「Q2発売予定の2つのクラスIIIデバイスは流通初日からMDR-2024に完全準拠」と明示し、チャットのユーン氏も「new products have zero grace period under MDR-2024」と確認しています。',
        [
          ['t03-t3-article', 1, 'Devices that are newly introduced to the market after March 1 must comply with MDR-2024 in full from the date of first distribution, with no transitional allowance'],
          ['t03-t3-memo', 1, 'two Class III devices planned for Q2 launch must be fully MDR-2024-compliant from day one of distribution'],
          ['t03-t3-chat', 4, 'new products have zero grace period under MDR-2024 — they must be compliant from the first day they ship'],
        ],
      ),

      // No.200 — intention: ユーン氏の発言の意図（オンラインチャット）
      q(
        200,
        'intention',
        'At 3:58 P.M., why does Yoon write, "The point is that new products have zero grace period under MDR-2024 — they must be compliant from the first day they ship"?',
        '午後3時58分に、ユーン氏が「重要なのは、新製品にはMDR-2024上の猶予期間がないということです。出荷初日から規制に準拠していなければなりません」と書いた理由は何ですか。',
        [
          ['To clarify that the two planned Class III launches cannot rely on any transitional allowance.', 'ベンが2製品の署名期限を確認したのに対し、ユーン氏は両製品とも移行猶予を利用できないという原則を強調しています。'],
          ['To announce that the launch date for the Class III devices has been moved forward to March.', 'クラスIIIデバイスの発売日の前倒しは発表されていません。'],
          ['To warn the team that MDR-2024 compliance penalties will apply from January 15.', 'ペナルティの適用開始日は1月15日ではなく、規制の発効日（3月1日）以降の不遵守に対してです。'],
          ['To confirm that the compliance sign-off for new products should be completed before March 1.', '署名の期限はメモに「発売予定日の少なくとも30日前」とあり、3月1日に固定されているわけではありません。'],
        ],
        0,  // 正解
        'ベンのメッセージは発売月によって署名期限が変わると理解したことを示しており、ユーン氏はその理解を肯定しつつ、根本原則として新製品には猶予期間がゼロであること（出荷初日から完全準拠が必要）を強調しています。',
        [
          ['t03-t3-chat', 3, 'Does the memo mean we need the compliance sign-offs done by March 16 and April 15, respectively'],
          ['t03-t3-chat', 4, 'new products have zero grace period under MDR-2024 — they must be compliant from the first day they ship'],
        ],
        { intentionTarget: { sender: 'Yoon', utteranceEn: 'Exactly. Those are the correct sign-off dates. The point is that new products have zero grace period under MDR-2024 — they must be compliant from the first day they ship.' } },
      ),
    ],
  },
];
