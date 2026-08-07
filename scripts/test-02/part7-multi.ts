/**
 * test-02 Part 7 複数文書セット（No.176〜200）生成スクリプト。
 * double 2セット（D1: 176–180, D2: 181–185）+
 * triple 3セット（T1: 186–190, T2: 191–195, T3: 196–200）= 合計25問。
 *
 * 収録するのはすべて本プロジェクト用のオリジナル問題。公式問題の転載はしない。
 */

import { q, passage, messages } from './helpers';
import type { Part7Set } from '../../src/schemas/question.schema';

// ============================================================
// Double D1（No.176–180）
// 地域鉄道の延伸計画記事 ＋ 沿線住民からの意見書
// ============================================================

// 記事: 挿入マーカー [1]〜[4] を4か所に配置する
const d1a = passage(
  't02-d1-article',
  'article',
  'Rail Line Extension Advances',
  [
    [
      // 第0段落
      'The Westvale Transit Authority has approved a plan to extend the Northridge commuter rail line by 14 kilometers, connecting the existing terminus at Millford Station to the newly designated Lakeview Hub. [1] Construction is expected to begin in the second quarter of next year and will be completed within 30 months. The project will be funded through a combination of federal grants and municipal bonds.',
      'ウェストベール交通局は、ノースリッジ通勤鉄道をミルフォード駅から新設のレイクビュー・ハブまで14キロメートル延伸する計画を承認した。[1] 着工は来年第2四半期を予定しており、30か月以内に完成する見込みだ。この事業は連邦補助金と地方債の組み合わせで資金調達される。',
    ],
    [
      // 第1段落
      'The new stations along the extended route will be equipped with fully accessible platforms, real-time arrival displays, and secure bicycle storage. [2] Commuters traveling from the Lakeview area will see their journey time to Westvale Central reduced by an estimated 22 minutes compared with existing bus services. [3] Parking facilities accommodating 400 vehicles will also be built adjacent to the Lakeview Hub terminal.',
      '延伸ルート沿いの新駅は、完全バリアフリーのホーム、リアルタイム到着表示板、安全な自転車置き場を備える予定だ。[2] レイクビューエリアから乗車する通勤者は、既存のバス路線と比較してウェストベール・セントラルまでの所要時間が推定22分短縮される。[3] レイクビュー・ハブ終点には400台収容の駐車場も建設される。',
    ],
    [
      // 第2段落
      'Public response to the announcement has been generally positive. However, some residents living near the planned construction corridor have expressed concerns about noise and traffic disruption during the building phase. [4] The Transit Authority has committed to holding monthly community meetings to address these issues and to providing a 24-hour noise complaint hotline throughout the construction period.',
      '発表に対する市民の反応は概ね好意的だ。しかし、建設予定回廊付近の住民の一部は、施工期間中の騒音や交通渋滞への懸念を表明している。[4] 交通局はこれらの問題に対処するため、月1回のコミュニティ会議を開催し、施工期間中は24時間対応の騒音苦情ホットラインを設けることを約束した。',
    ],
  ],
  { hasInsertionMarkers: true },
);

// 住民意見書
const d1b = passage(
  't02-d1-letter',
  'letter',
  'Resident Comment Submitted to the Westvale Transit Authority',
  [
    [
      // 第0段落
      'Dear Westvale Transit Authority, I am writing on behalf of the Millford Residents Association to express our qualified support for the approved rail extension project. We believe that improved connectivity will benefit commuters throughout the region, and we welcome the commitment to accessible station design.',
      'ウェストベール交通局御中　ミルフォード住民協会を代表して、承認された鉄道延伸計画への条件付き賛同を表明いたします。接続性の向上が地域全体の通勤者に恩恵をもたらすと考えており、バリアフリー駅舎設計への取り組みを歓迎します。',
    ],
    [
      // 第1段落
      'That said, we urge the Authority to prioritize noise mitigation measures during evening and early morning construction shifts. In particular, we request that no heavy equipment be operated between 9:00 P.M. and 6:00 A.M. We also ask that the community meetings be scheduled no later than 7:00 P.M. so that working residents can attend.',
      'ただし、夜間・早朝の施工シフト中における騒音対策を優先するよう当局に強く求めます。特に、午後9時から午前6時の間は重機を使用しないことを要請します。また、コミュニティ会議は就労している住民も参加できるよう、午後7時以前に設定するよう求めます。',
    ],
    [
      // 第2段落
      'We look forward to participating in the monthly community meetings and hope that the Transit Authority will treat our feedback as constructive input rather than opposition. The Millford Residents Association remains committed to working collaboratively toward a transit solution that serves everyone.',
      '毎月のコミュニティ会議に参加することを楽しみにしており、交通局が私たちの意見を反対意見ではなく建設的な意見として受け止めてくださることを期待します。ミルフォード住民協会は、すべての人に役立つ交通ソリューションの実現に向けて協力的に取り組んでいく所存です。',
    ],
  ],
  { from: 'Millford Residents Association', to: 'Westvale Transit Authority' },
);

// ============================================================
// Double D2（No.181–185）
// オンライン職業講座カタログ ＋ 受講者からの申込コース変更依頼メール
// ============================================================

const d2a = passage(
  't02-d2-web',
  'web_page',
  'ProSkill Online — Course Catalog',
  [
    [
      // 第0段落
      'ProSkill Online offers professional development courses for working adults. All courses are instructor-led and delivered via live video sessions. Participants receive a digital certificate upon completing at least 80% of the scheduled sessions. Enrollment closes one week before the course start date.',
      'ProSkill Onlineは、社会人向けの専門能力開発講座を提供しています。全講座はインストラクター主導のライブビデオ形式で行われます。受講者は予定セッションの80%以上を受講することでデジタル証明書を取得できます。受講申込の締め切りは開講1週間前です。',
    ],
    [
      // 第1段落
      'Available Courses (Spring Term)\n\nCourse: Project Management Essentials | Duration: 8 weeks | Fee: $320 | Start Date: April 7\nCourse: Data Analysis with Python | Duration: 10 weeks | Fee: $420 | Start Date: April 14\nCourse: Business Writing Skills | Duration: 6 weeks | Fee: $240 | Start Date: April 7\nCourse: Digital Marketing Strategy | Duration: 8 weeks | Fee: $320 | Start Date: April 21\n\nNote: Participants who enroll in two or more courses in the same term receive a 15% discount on the lower-priced course.',
      '開講コース（春学期）\n\n講座：プロジェクトマネジメント基礎　期間：8週間　受講料：320ドル　開始日：4月7日\n講座：Pythonによるデータ分析　期間：10週間　受講料：420ドル　開始日：4月14日\n講座：ビジネスライティングスキル　期間：6週間　受講料：240ドル　開始日：4月7日\n講座：デジタルマーケティング戦略　期間：8週間　受講料：320ドル　開始日：4月21日\n\n注：同一学期に2講座以上申し込んだ受講者は、低価格の講座に15%割引が適用されます。',
    ],
  ],
);

const d2b = passage(
  't02-d2-email',
  'email',
  'Request to Change Course Enrollment',
  [
    [
      // 第0段落
      'Dear ProSkill Online Support Team, I am writing to request a change to my course enrollment for the Spring Term. I originally signed up for Business Writing Skills and Data Analysis with Python. I have since realized that my schedule will not allow me to attend the Data Analysis with Python sessions, as the class times conflict with a standing weekly team meeting at my workplace.',
      'ProSkill Onlineサポートチーム御中　春学期の受講申込内容の変更をお願いしたく、ご連絡いたします。当初、ビジネスライティングスキルとPythonによるデータ分析に申し込みました。しかし、Pythonによるデータ分析の授業時間が職場の定例週次会議と重なるため、受講できないことが判明しました。',
    ],
    [
      // 第1段落
      'I would like to replace my enrollment in Data Analysis with Python with Digital Marketing Strategy instead. Could you please confirm whether there are still spaces available in that course and whether the change can be processed before the enrollment deadline? I would also like to confirm the total amount due after applying any applicable discount.',
      'Pythonによるデータ分析の代わりに、デジタルマーケティング戦略への変更をお願いしたいと思います。同コースにまだ空きがあるかどうか、および申込締め切り前に変更手続きが完了できるかどうかをご確認いただけますでしょうか。また、割引適用後の合計金額についても確認させていただきたく存じます。',
    ],
    [
      // 第2段落
      'Thank you for your assistance. I look forward to your prompt reply. Best regards, Sandra Okonkwo',
      'ご対応よろしくお願いいたします。お返事をお待ちしております。敬具　サンドラ・オコンクウォ',
    ],
  ],
  { from: 'Sandra Okonkwo <s.okonkwo@mailnet.example>', to: 'support@proskillonline.example' },
);

// ============================================================
// Triple T1（No.186–190）
// コワーキング拠点の法人プラン広告 ＋ 法人契約問い合わせメール ＋ 初月請求書
// ============================================================

const t1a = passage(
  't02-t1-ad',
  'advertisement',
  'NexWork Coworking — Corporate Membership Plans',
  [
    [
      // 第0段落
      'Give your team a professional workspace anywhere in the city. NexWork Coworking offers flexible corporate membership plans for businesses of any size. Members gain access to all four of our downtown locations, including high-speed internet, private meeting rooms, and a fully equipped kitchen.',
      'チームにどこでも利用できるプロフェッショナルなワークスペースを。NexWork Coworkingは、あらゆる規模の企業向けに柔軟な法人会員プランをご提供しています。会員は高速インターネット、個室会議室、完全装備のキッチンを備えた4か所のダウンタウン拠点すべてをご利用いただけます。',
    ],
    [
      // 第1段落
      'Corporate Plan Options\n\nStarter Plan: Up to 5 seats | $800/month | 20 meeting-room hours included\nGrowth Plan: Up to 15 seats | $1,800/month | 60 meeting-room hours included\nEnterprise Plan: Up to 40 seats | $3,500/month | Unlimited meeting-room hours\n\nNew corporate members signing a minimum 6-month agreement receive a complimentary first-month fee waiver on the Starter or Growth Plan. The Enterprise Plan includes a dedicated account manager at no additional cost.',
      '法人プランの選択肢\n\nスタータープラン：最大5席　月額800ドル　会議室20時間付き\nグロースプラン：最大15席　月額1,800ドル　会議室60時間付き\nエンタープライズプラン：最大40席　月額3,500ドル　会議室無制限\n\n最低6か月の契約を締結した新規法人会員には、スタータープランまたはグロースプランに対して初月の会費が免除されます。エンタープライズプランには専任アカウントマネージャーが追加費用なしで含まれます。',
    ],
  ],
);

const t1b = passage(
  't02-t1-email',
  'email',
  'Corporate Membership Inquiry — Dawnfield Consulting',
  [
    [
      // 第0段落
      'Dear NexWork Coworking Team, I am reaching out on behalf of Dawnfield Consulting to inquire about your corporate membership options. We are a team of nine consultants who are currently operating from a shared rented office that we will vacate at the end of this month. We are looking for a workspace solution that can accommodate our full team and provides access to meeting rooms for client presentations.',
      'NexWork Coworkingチーム御中　ドーンフィールド・コンサルティングを代表してご連絡いたします。私どもは現在9名のコンサルタントが共有レンタルオフィスで業務を行っており、今月末に退去予定です。チーム全員を収容でき、クライアントプレゼンテーション用の会議室を備えたワークスペースを探しています。',
    ],
    [
      // 第1段落
      'Based on the information on your website, the Growth Plan appears to meet our needs. We would like to commit to a 6-month agreement starting from the first of next month. Could you please send us an invoice for the first month so that we can arrange payment through our accounts payable department? We would also appreciate confirmation of which downtown locations would be most convenient for our team based in the Hargrove district.',
      'ウェブサイトの情報に基づくと、グロースプランが私どものニーズを満たすように思われます。来月初日から6か月の契約を締結したいと考えています。経理部門で支払い手続きを進められるよう、初月分の請求書をお送りいただけますでしょうか。また、ハーグローブ地区に拠点を置く私どものチームに最も便利なダウンタウン拠点についてもご確認いただければ幸いです。',
    ],
  ],
  { from: 'Priya Nair <p.nair@dawnfieldconsulting.example>', to: 'corporate@nexwork.example' },
);

const t1c = passage(
  't02-t1-invoice',
  'invoice',
  'NexWork Coworking — Invoice',
  [
    [
      // 第0段落（請求書ヘッダー）
      'Invoice No.: NW-2024-0318\nBill To: Dawnfield Consulting, Attn: Priya Nair\nInvoice Date: March 18\nDue Date: March 31\n\nDescription: Growth Plan Corporate Membership — Month 1\nPlan Fee: $1,800.00\nFirst-Month Fee Waiver (6-month agreement): -$1,800.00\nSetup Fee (one-time): $150.00\n\nTotal Due: $150.00\n\nPayment Method: Bank transfer to NexWork Coworking (account details on file)\nNote: Recurring monthly charges of $1,800.00 will begin from Month 2 onward.',
      '請求書番号：NW-2024-0318\n請求先：ドーンフィールド・コンサルティング　プリヤ・ナイル様\n請求日：3月18日　支払期限：3月31日\n\n内容：グロースプラン法人会員　第1か月目\nプラン料金：1,800.00ドル\n初月会費免除（6か月契約）：-1,800.00ドル\n初期設定費用（一回限り）：150.00ドル\n\n合計金額：150.00ドル\n\n支払方法：NexWork Coworking宛て銀行振込（口座情報は手元にあります）\n注：第2か月目以降、月額1,800.00ドルの定期請求が発生します。',
    ],
  ],
);

// ============================================================
// Triple T2（No.191–195）
// 美術館巡回展告知 ＋ 作品搬入・設営日程表 ＋ 設営スタッフのテキストメッセージ
// ============================================================

const t2a = passage(
  't02-t2-notice',
  'notice',
  'Haverford Museum of Art — Traveling Exhibition Announcement',
  [
    [
      // 第0段落
      'The Haverford Museum of Art is pleased to announce the arrival of Shapes in Motion: A Survey of Kinetic Sculpture, a traveling exhibition featuring works by 18 contemporary artists from 11 countries. The exhibition will be on display from May 3 through July 27 in the museum\'s East Wing galleries.',
      'ハーバーフォード美術館は、11か国18名の現代芸術家による作品を特集した巡回展「形の動き：キネティック彫刻の概観」の開催を発表いたします。本展覧会は5月3日から7月27日まで、美術館の東翼ギャラリーにて公開されます。',
    ],
    [
      // 第1段落
      'Admission is $18 for adults, $12 for seniors and students with valid identification, and free for members and children under 12. Audio guides in six languages are available at the information desk for a rental fee of $5. Photography without flash is permitted throughout the exhibition.',
      '入場料は大人18ドル、有効な身分証明書を持つシニアおよび学生は12ドル、会員および12歳未満のお子様は無料です。6か国語の音声ガイドはインフォメーションデスクで5ドルのレンタル料にてご利用いただけます。展覧会全体を通じてフラッシュなしの写真撮影が可能です。',
    ],
    [
      // 第2段落
      'Installation of the artworks is scheduled to begin on April 28. Visitors should note that the East Wing will be closed to the public from April 28 through May 2 to allow for safe setup of the kinetic sculptures. The museum\'s permanent collection galleries in the West Wing will remain fully open during this period.',
      '作品の設営は4月28日に開始予定です。キネティック彫刻の安全な設置作業のため、東翼は4月28日から5月2日まで一般公開が休止となりますのでご留意ください。この期間中、西翼の常設コレクションギャラリーは通常通り開館しています。',
    ],
  ],
);

const t2b = passage(
  't02-t2-schedule',
  'schedule',
  'Shapes in Motion — Installation Schedule, Haverford Museum of Art',
  [
    [
      // 第0段落（日程表）
      'April 28 (Monday): Crate delivery and unpacking — Loading dock, 8:00 A.M.–5:00 P.M. | Lead: Facilities team\nApril 29 (Tuesday): Structural mounting for large-format works — East Wing Hall A | Lead: External installation crew\nApril 30 (Wednesday): Placement of medium and small sculptures — East Wing Hall B and C | Lead: Curatorial team\nMay 1 (Thursday): Electrical connections and motion testing — All East Wing galleries | Lead: Technical team\nMay 2 (Friday): Final walkthrough and signage installation — All East Wing galleries | Lead: Curatorial team',
      '4月28日（月）：梱包材の配送と開梱　搬入口　午前8時〜午後5時　担当：施設チーム\n4月29日（火）：大型作品の構造的取り付け　東翼ホールA　担当：外部設営クルー\n4月30日（水）：中小型彫刻の配置　東翼ホールBおよびC　担当：キュレーターチーム\n5月1日（木）：電気配線とモーションテスト　東翼全ギャラリー　担当：テクニカルチーム\n5月2日（金）：最終確認とサインage設置　東翼全ギャラリー　担当：キュレーターチーム',
    ],
    [
      // 第1段落（注記）
      'Notes: All crew members must complete the site safety briefing before beginning work. Access to the East Wing is restricted to authorized installation personnel only. Please direct any delivery vehicles to the Pemberton Street entrance. Catering for the installation crew will be provided in the staff lounge on each working day.',
      '注意事項：全クルーメンバーは作業開始前に現場安全ブリーフィングを完了すること。東翼へのアクセスは許可された設営担当者のみに制限されます。配送車両はすべてペンバートン・ストリートの入口へ誘導してください。各作業日、スタッフラウンジにて設営クルー向けのケータリングが提供されます。',
    ],
  ],
);

// 設営スタッフ間のテキストメッセージ
const t2c = messages(
  't02-t2-texts',
  'text_message_chain',
  'Installation Crew Text Chain — April 29',
  [
    // 発言インデックス 0
    [
      'Marcus',
      '8:14 A.M.',
      'Good morning. I just arrived at the loading dock. The crates from yesterday are all unpacked and ready for Hall A. The external crew is here too.',
      'おはようございます。今搬入口に着きました。昨日の梱包材はすべて開梱され、ホールAの準備が整っています。外部クルーも来ています。',
    ],
    // 発言インデックス 1
    [
      'Yuki',
      '8:22 A.M.',
      'Thanks, Marcus. One issue — the largest sculpture, the suspended mobile by Carla Reyes, needs an extra ceiling anchor. I checked the structural drawings and we are missing a bracket. I have contacted the supplier and they say they can deliver a replacement by noon.',
      'ありがとう、マーカス。一つ問題が。最大の彫刻、カルラ・レイエスの吊り下げモビールに追加の天井アンカーが必要です。構造図を確認したところ、ブラケットが一つ不足しています。サプライヤーに連絡したところ、正午までに代替品を届けられるとのことです。',
    ],
    // 発言インデックス 2
    [
      'Marcus',
      '8:31 A.M.',
      'That does not leave us much of a window. The external crew has a firm 4:00 P.M. cutoff today. Can we start with the smaller wall-mounted pieces in Hall A while we wait for the bracket?',
      'それでは作業できる時間がほとんど残りません。外部クルーは今日午後4時で終了です。ブラケットを待つ間、ホールAの小型壁掛け作品から始めてもよいですか。',
    ],
    // 発言インデックス 3
    [
      'Yuki',
      '8:45 A.M.',
      'Yes, go ahead with the wall-mounted pieces. I will supervise the mobile installation personally once the bracket arrives. Please make sure the external crew does not leave before we have finished with Carla Reyes\'s piece — we need their equipment for the ceiling work.',
      'はい、壁掛け作品から進めてください。ブラケットが届いたらモビールの設置は私が直接監督します。カルラ・レイエスの作品が終わるまで外部クルーが帰らないようにしてください。天井作業には彼らの機材が必要です。',
    ],
  ],
);

// ============================================================
// Triple T3（No.196–200）
// サプライヤー統合記事 ＋ 社内調達方針変更メモ ＋ 購買チームの社内チャット
// ============================================================

const t3a = passage(
  't02-t3-article',
  'article',
  'Industry Consolidation Reshapes Supply Chain Landscape',
  [
    [
      // 第0段落
      'The merger of Cascade Materials and Norfield Supply, announced last month, is already prompting manufacturers across the packaging and industrial components sectors to reassess their supplier relationships. The combined entity, to be known as Cascade-Norfield Group, will control approximately 38% of the domestic market for specialty polymer components.',
      '先月発表されたカスケード・マテリアルズとノーフィールド・サプライの合併は、包装材および産業部品セクター全体のメーカーが取引先関係を再評価するきっかけとなっている。カスケード・ノーフィールド・グループとなる新会社は、特殊ポリマー部品の国内市場の約38%を占めることになる。',
    ],
    [
      // 第1段落
      'Analysts warn that reduced competition could lead to price increases for buyers who rely on either Cascade or Norfield as their sole supplier. Firms that currently source from both companies will be placed under a unified pricing structure, which may eliminate the volume discounts they previously negotiated independently with each company. Industry observers recommend that affected businesses establish relationships with at least one alternative regional supplier to preserve negotiating leverage.',
      'アナリストたちは、競争の減少によって、カスケードまたはノーフィールドのどちらか一方のみを仕入先としている企業の購買コストが上昇する可能性があると警告している。現在両社から調達している企業は統一価格体系の適用を受け、それぞれの会社と個別に交渉してきたボリュームディスカウントが廃止される可能性がある。業界の専門家は、影響を受ける企業が交渉力を維持するために少なくとも一社の代替地域サプライヤーとの関係を構築することを勧めている。',
    ],
    [
      // 第2段落
      'The merger is expected to receive regulatory clearance within six months. Both Cascade and Norfield have stated that existing supply contracts will be honored through their current end dates, and that customers will receive 90 days\' notice before any pricing adjustments take effect.',
      '合併は6か月以内に規制当局の認可を受ける見込みだ。カスケードおよびノーフィールドは両社とも、既存の供給契約は現行の終了日まで履行され、価格改定が実施される前に顧客に90日前の通知が行われると表明している。',
    ],
  ],
);

const t3b = passage(
  't02-t3-memo',
  'memo',
  'Internal Memo — Procurement Policy Update',
  [
    [
      // 第0段落
      'To: All Procurement Team Members\nFrom: Helen Varga, Head of Procurement\nDate: June 10\nSubject: Supplier Diversification Initiative\n\nAs you will be aware, the planned merger of Cascade Materials and Norfield Supply has significant implications for our sourcing strategy. Both companies currently supply us with specialty polymer components, and we anticipate that the unified pricing structure will affect the volume discounts we currently receive.',
      '宛先：調達チーム全員\n差出人：ヘレン・バーガ、調達部長\n日付：6月10日\n件名：サプライヤー多様化イニシアチブ\n\nご承知のとおり、カスケード・マテリアルズとノーフィールド・サプライの合併計画は、私どもの調達戦略に重大な影響を与えます。現在、両社から特殊ポリマー部品を調達しており、統一価格体系が現在受けているボリュームディスカウントに影響を及ぼすと予想されます。',
    ],
    [
      // 第1段落
      'Effective immediately, all team members are asked to identify and evaluate at least two regional suppliers capable of providing equivalent polymer components. Supplier assessments must be completed and submitted to me by July 31. In the meantime, no new long-term contracts with Cascade or Norfield should be initiated without my prior approval. Renewals of contracts expiring before the merger\'s regulatory clearance may proceed under existing terms.',
      '即時有効として、チームメンバー全員に、同等のポリマー部品を提供できる地域サプライヤーを少なくとも2社特定・評価するよう求めます。サプライヤー評価は7月31日までに完了し、私に提出してください。それまでの間、私の事前承認なしに、カスケードまたはノーフィールドとの新たな長期契約を開始しないこと。合併の規制認可前に終了する契約の更新は、現行条件で進めて構いません。',
    ],
  ],
);

// 購買チームの社内チャット
const t3c = messages(
  't02-t3-chat',
  'online_chat',
  'Procurement Team Channel — June 10',
  [
    // 発言インデックス 0
    [
      'Helen',
      '2:05 P.M.',
      'Hi everyone. I just sent around an internal memo regarding our supplier situation. Please read it before end of day.',
      'みなさん、こんにちは。サプライヤーの状況に関する社内メモを送りました。本日中に読んでください。',
    ],
    // 発言インデックス 1
    [
      'Dom',
      '2:12 P.M.',
      'Noted. I already have a contact at Ridgepath Industrial — they supply polymer components to two firms in our sector. Should I reach out to them first?',
      '了解しました。リッジパス・インダストリアルに連絡先がすでにあります。同社は私どもと同じセクターの2社にポリマー部品を供給しています。まず彼らに連絡してみましょうか。',
    ],
    // 発言インデックス 2
    [
      'Helen',
      '2:18 P.M.',
      'Yes, please proceed with Ridgepath. That would count as one of your two required assessments. Remember the deadline is July 31.',
      'はい、リッジパスへの連絡を進めてください。それが2社のうち1社の評価としてカウントされます。締め切りは7月31日であることを忘れずに。',
    ],
    // 発言インデックス 3
    [
      'Fiona',
      '2:25 P.M.',
      'Helen, does the new policy also cover the adhesive tape we currently source exclusively from Norfield? Or is this memo only about the polymer components?',
      'ヘレン、新しい方針は現在ノーフィールドのみから調達している粘着テープにも適用されますか。それともこのメモはポリマー部品についてのみですか。',
    ],
    // 発言インデックス 4
    [
      'Helen',
      '2:33 P.M.',
      'Good point, Fiona. The memo focuses on polymer components, but let\'s extend the diversification review to all Norfield-supplied items as a precaution. I will update the memo to reflect this.',
      '良い指摘です、フィオナ。メモはポリマー部品に焦点を当てていますが、予防措置として、ノーフィールドが供給するすべての品目に多様化レビューを拡大しましょう。この点を反映するようメモを更新します。',
    ],
  ],
);

// ============================================================
// エクスポート
// ============================================================

export const multiSets: Part7Set[] = [
  // ──────────────────────────────
  // Double D1（No.176–180）
  // 地域鉄道延伸記事 ＋ 住民意見書
  // ──────────────────────────────
  {
    setType: 'double',
    passages: [d1a, d1b],
    questions: [
      // No.176 — insertion: 記事の [1]〜[4] に挿入するのに最適な文を選ぶ
      q(
        176,
        'insertion',
        'In which position marked [1], [2], [3], or [4] does the following sentence best belong? "The Authority stated that this marks the largest infrastructure investment in the region in over two decades."',
        '次の文は [1]、[2]、[3]、[4] のどの位置に入るのが最も適切ですか。「当局は、これが20年以上で最大の地域インフラ投資であると述べた。」',
        [
          ['[1]', '計画承認の直後に置くと、その投資規模を補足する流れとして自然です。'],
          ['[2]', 'この位置はアクセシビリティ設備について述べており、投資規模の補足が入る文脈ではありません。'],
          ['[3]', 'この位置は通勤時間短縮の話題が続いており、機関の声明として唐突になります。'],
          ['[4]', 'この位置は騒音苦情ホットラインの説明の後であり、投資規模の強調とは文脈が合いません。'],
        ],
        0,  // 正解は [1]
        '承認の発表直後（[1]）に投資規模を強調する当局の声明を置くのが最も自然な流れです。',
        // insertion 問題は evidence 不要
        [],
      ),

      // No.177 — main_idea: 記事の主題
      q(
        177,
        'main_idea',
        'What is the article mainly about?',
        '記事は主に何について書かれていますか。',
        [
          ['The approval of a commuter rail extension project', '計画の承認、工期、資金調達方法が記事の中心です。'],
          ['A rise in bus service fares in the Westvale area', 'バス料金の値上げは話題ではありません。'],
          ['The opening of Millford Station to new passengers', 'ミルフォード駅の開業は記事の内容ではありません。'],
          ['A community vote on a proposed transit budget', '住民投票については触れられていません。'],
        ],
        0,  // 正解
        '記事全体は延伸計画の承認・施工予定・資金源という3点を中心に展開しています。',
        [['t02-d1-article', 0, 'The Westvale Transit Authority has approved a plan to extend the Northridge commuter rail line']],
      ),

      // No.178 — detail: 新駅設備の詳細（パラフレーズ問題）
      q(
        178,
        'detail',
        'What amenity will be available at the new stations?',
        '新駅にはどのような設備が設けられますか。',
        [
          ['Storage space for bicycles', '記事では安全な自転車置き場（secure bicycle storage）の設置が述べられています。'],
          ['An on-site café and refreshment area', 'カフェや軽食エリアへの言及はありません。'],
          ['Dedicated lanes for taxi drop-off', 'タクシー専用レーンについては触れられていません。'],
          ['A staffed information booth', '有人案内所の設置は記事に記載がありません。'],
        ],
        0,  // 正解
        '第1段落に「secure bicycle storage」とあり、自転車保管スペースの設置が明記されています。',
        [['t02-d1-article', 1, 'secure bicycle storage']],
      ),

      // No.179 — infer: クロスリファレンス（記事の会議開催約束 × 住民の要望時間）
      q(
        179,
        'infer',
        'What can be inferred about the community meetings mentioned in both documents?',
        '両文書に言及されているコミュニティ会議について推測できることは何ですか。',
        [
          ['The Transit Authority has not yet confirmed the meeting times.', '当局は会議開催を約束しましたが、住民協会はその時間帯をまだ決まっていないと受け取り、午後7時以前を要請しています。'],
          ['The meetings will be held at Millford Station.', '会議の場所はどちらの文書にも明記されていません。'],
          ['The meetings have already been scheduled for Saturday mornings.', '土曜午前という日程はどちらの文書にも記載がありません。'],
          ['The Transit Authority plans to cancel the meetings after construction begins.', '会議の中止については全く言及されていません。'],
        ],
        0,  // 正解
        '記事は月1回の会議を約束するのみで具体的な時間帯を示しておらず、意見書が午後7時以前を要請していることから、時間帯がまだ確定していないと推測できます。',
        [
          ['t02-d1-article', 2, 'holding monthly community meetings'],
          ['t02-d1-letter', 1, 'community meetings be scheduled no later than 7:00 P.M.'],
        ],
      ),

      // No.180 — detail: 住民協会の立場
      q(
        180,
        'detail',
        'What position does the Millford Residents Association take on the rail extension?',
        'ミルフォード住民協会は鉄道延伸についてどのような立場を取っていますか。',
        [
          ['It conditionally supports the project.', '意見書の冒頭に「qualified support（条件付き賛同）」と明記されています。'],
          ['It strongly opposes the project on environmental grounds.', '環境問題を理由とした強固な反対は表明していません。'],
          ['It requests a delay until a new environmental assessment is completed.', '環境評価の新規実施を求める記述はありません。'],
          ['It recommends canceling the project and improving bus services instead.', '計画中止の勧告はなく、条件付きで支持しています。'],
        ],
        0,  // 正解
        '意見書第0段落に「qualified support（条件付き賛同）」と明記されています。',
        [['t02-d1-letter', 0, 'express our qualified support for the approved rail extension project']],
      ),
    ],
  },

  // ──────────────────────────────
  // Double D2（No.181–185）
  // オンライン職業講座カタログ ＋ 申込コース変更依頼メール
  // ──────────────────────────────
  {
    setType: 'double',
    passages: [d2a, d2b],
    questions: [
      // No.181 — detail: 証明書取得条件
      q(
        181,
        'detail',
        'According to the web page, what must participants do to receive a digital certificate?',
        'ウェブページによると、デジタル証明書を受け取るには何をしなければなりませんか。',
        [
          ['Attend a minimum of four fifths of the sessions', 'ウェブページでは「80%以上」のセッション出席が条件とされており、これは5分の4に相当します。'],
          ['Submit a final project within one week of the course end date', '最終課題の提出については記載がありません。'],
          ['Pass an online examination after each session', 'セッションごとの試験については言及されていません。'],
          ['Enroll at least two weeks before the course begins', '申込締め切りは開講1週間前であり、2週間前ではありません。'],
        ],
        0,  // 正解
        'ウェブページに「completing at least 80% of the scheduled sessions」と明記されています。80%は5分の4（four fifths）に相当します。',
        [['t02-d2-web', 0, 'completing at least 80% of the scheduled sessions']],
      ),

      // No.182 — infer: サンドラが変更したい理由
      q(
        182,
        'infer',
        'Why does Sandra want to change one of her course enrollments?',
        'サンドラが受講申込の一つを変更したい理由は何ですか。',
        [
          ['A session overlaps with a recurring work commitment.', 'メールに「standing weekly team meeting」との時間が重なると明記されています。'],
          ['The course she wants to drop has already been canceled.', '講座のキャンセルについては述べられていません。'],
          ['She has already taken a similar course at another institution.', '他の機関での受講歴には言及していません。'],
          ['The enrollment deadline for her original course has passed.', '申込締め切りに関する問題は原因として挙げられていません。'],
        ],
        0,  // 正解
        'メール第0段落に「conflict with a standing weekly team meeting at my workplace」と理由が明記されています。',
        [['t02-d2-email', 0, 'the class times conflict with a standing weekly team meeting at my workplace']],
      ),

      // No.183 — synonym: ウェブページ第0段落に実在する語 "delivered" の同義語を選ぶ
      // 本文に "delivered via live video sessions" が含まれる（第0段落）
      q(
        183,
        'synonym',
        'The word "delivered" in paragraph 1 of the web page is closest in meaning to which of the following?',
        'ウェブページ第1段落の "delivered" に最も近い意味を持つ語はどれですか。',
        [
          ['conducted', '「実施される」という意味でここでの "delivered" と最も近く、授業の提供方法を指しています。'],
          ['distributed', '「配布される」という意味で、物を配る場面に使われ、ここでは意味が合いません。'],
          ['arranged', '「手配される」という意味で、準備の段階を指すため文脈と一致しません。'],
          ['recorded', '「録画される」という意味で、ライブ形式の説明と矛盾します。'],
        ],
        0,  // 正解
        '"delivered via live video sessions" は授業が実施・提供される方法を示しており、"conducted" が最も近い意味です。',
        [['t02-d2-web', 0, 'delivered via live video sessions']],
        { targetWord: 'delivered' },
      ),

      // No.184 — detail: クロスリファレンス（割引条件 × サンドラの申込内容）
      // 計算: ビジネスライティングスキル $240 × 0.85 = $204（15%割引）+ デジタルマーケティング戦略 $320 = $524
      q(
        184,
        'detail',
        'If Sandra\'s enrollment change is approved, how much will she pay in total for the Spring Term?',
        'サンドラの変更申請が承認された場合、春学期の合計受講料はいくらになりますか。',
        [
          ['$524', 'ビジネスライティングスキル（240ドル）が低価格のため15%割引が適用され、240×0.85＝204ドル。デジタルマーケティング戦略（320ドル）と合計すると524ドルです。'],
          ['$560', '割引を適用せずに2講座の料金を合計した金額（240＋320）であり、2講座以上の割引が考慮されていません。'],
          ['$612', 'デジタルマーケティング戦略に割引を誤適用した場合の計算（240＋320×0.85＝240＋272＝512）とも合致せず、まったく誤った計算です。'],
          ['$476', '両講座に割引を適用したと誤って仮定した場合の計算であり、割引は低価格の1講座のみです。'],
        ],
        0,  // 正解: $524
        'カタログの2講座以上割引は低価格の講座に15%適用されます。ビジネスライティングスキル（240ドル）が低価格なので、240×0.85＝204ドル。デジタルマーケティング戦略（320ドル）は定価。合計204＋320＝524ドルです。',
        [
          ['t02-d2-web', 1, 'Participants who enroll in two or more courses in the same term receive a 15% discount on the lower-priced course'],
          ['t02-d2-email', 1, 'Digital Marketing Strategy'],
        ],
      ),

      // No.185 — infer: サンドラの次のアクション
      q(
        185,
        'infer',
        'What does Sandra ask ProSkill Online to confirm?',
        'サンドラはProSkill Onlineに何を確認するよう求めていますか。',
        [
          ['Whether spaces remain in Digital Marketing Strategy', '「まだ空きがあるかどうか」を確認するよう明示的に求めています。'],
          ['Whether the Business Writing Skills course has a new start date', 'ビジネスライティングスキルの開始日変更については問い合わせていません。'],
          ['Whether instructors hold recognized industry certifications', '講師の資格については触れていません。'],
          ['Whether she can attend sessions from a different time zone', 'タイムゾーンについては言及していません。'],
        ],
        0,  // 正解
        'メール第1段落に「whether there are still spaces available in that course」と明確に確認事項が記されています。',
        [['t02-d2-email', 1, 'whether there are still spaces available in that course']],
      ),
    ],
  },

  // ──────────────────────────────
  // Triple T1（No.186–190）
  // コワーキング広告 ＋ 問い合わせメール ＋ 初月請求書
  // ──────────────────────────────
  {
    setType: 'triple',
    passages: [t1a, t1b, t1c],
    questions: [
      // No.186 — main_idea: 広告の目的
      q(
        186,
        'main_idea',
        'What is the purpose of the advertisement?',
        '広告の目的は何ですか。',
        [
          ['To promote corporate workspace membership options', '法人向けプランの内容・料金・特典を紹介しています。'],
          ['To announce the opening of a new coworking location', '新拠点のオープン告知ではなく、既存の4拠点を紹介しています。'],
          ['To invite applications for a part-time receptionist position', '採用告知ではありません。'],
          ['To describe a change in monthly membership rates', '料金改定の案内ではありません。'],
        ],
        0,  // 正解
        '広告は法人会員向けの3プランとその特典を紹介することが主目的です。',
        [['t02-t1-ad', 0, 'NexWork Coworking offers flexible corporate membership plans']],
      ),

      // No.187 — detail: プリヤが希望するプランと理由
      q(
        187,
        'detail',
        'Why does Priya believe the Growth Plan is suitable for Dawnfield Consulting?',
        'プリヤはなぜグロースプランがドーンフィールド・コンサルティングに適していると考えていますか。',
        [
          ['It can accommodate her nine-person team within its seat limit.', 'グロースプランは最大15席のため、9名のチームを収容できます。'],
          ['It includes an unlimited number of meeting-room hours.', '会議室無制限はエンタープライズプランの特典です。'],
          ['It is the only plan that provides a dedicated account manager.', '専任アカウントマネージャーはエンタープライズプランのみに含まれます。'],
          ['It waives the one-time setup fee for new members.', '初期設定費用の免除については広告に記載されていません。'],
        ],
        0,  // 正解
        'メールにはチームが9名と記されており、グロースプランの上限15席以内に収まることが適合の根拠です。',
        [
          ['t02-t1-email', 0, 'a team of nine consultants'],
          ['t02-t1-ad', 1, 'Growth Plan: Up to 15 seats'],
        ],
      ),

      // No.188 — infer: クロスリファレンス（広告の初月免除条件 × 請求書の内容）
      q(
        188,
        'infer',
        'Why does the invoice show a charge of only $150.00 for the first month?',
        '請求書の初月請求額が150ドルだけである理由は何ですか。',
        [
          ['Dawnfield Consulting agreed to a 6-month contract and qualified for a first-month fee waiver.', '広告に6か月以上の契約で初月免除と記されており、プリヤが6か月契約を申し込んでいるため、月額1,800ドルが免除され、初期設定費用150ドルのみの請求となっています。'],
          ['NexWork applied a 15% early registration discount to the full plan price.', '15%の早期割引制度は広告に記載されていません。'],
          ['The team size of nine is below the minimum required for the Growth Plan.', 'グロースプランの最小人数制限はなく、最大15席です。'],
          ['Dawnfield Consulting paid the remaining balance in advance via bank transfer.', '一括前払いについては記載がありません。'],
        ],
        0,  // 正解
        '広告の「6か月以上の契約で初月免除」条件に、プリヤの6か月契約申込みが合致しています。請求書は月額1,800ドルを免除し、初期設定費用150ドルのみ請求しています。',
        [
          ['t02-t1-ad', 1, 'New corporate members signing a minimum 6-month agreement receive a complimentary first-month fee waiver'],
          ['t02-t1-email', 1, 'commit to a 6-month agreement'],
          ['t02-t1-invoice', 0, 'First-Month Fee Waiver (6-month agreement): -$1,800.00'],
        ],
      ),

      // No.189 — not: 広告・メール・請求書に記載されていない情報
      q(
        189,
        'not',
        'What is NOT mentioned in any of the three documents about NexWork Coworking?',
        '3つの文書のいずれにも記載されていないNexWork Coworkingに関する情報はどれですか。',
        [
          ['The number of staff members employed at each location', '各拠点のスタッフ数はどの文書にも記載がありません。'],
          ['The number of downtown locations available to members', '広告に「four downtown locations」と明記されています。'],
          ['The monthly recurring charge after the first month', '請求書に「$1,800.00 will begin from Month 2 onward」と記載されています。'],
          ['The type of internet connectivity offered at the facilities', '広告に「high-speed internet」と記載されています。'],
        ],
        0,  // 正解（各拠点のスタッフ数は不記載）
        '拠点ごとの従業員数はどの文書にも示されていません。他の3選択肢はそれぞれ広告または請求書で言及されています。',
        [['t02-t1-ad', 0, 'all four of our downtown locations']],
      ),

      // No.190 — detail: 請求書の支払期限
      q(
        190,
        'detail',
        'By what date must Dawnfield Consulting submit payment for the first month?',
        'ドーンフィールド・コンサルティングはいつまでに初月の支払いをしなければなりませんか。',
        [
          ['March 31', '請求書に「Due Date: March 31」と明記されています。'],
          ['March 18', 'これは請求日（Invoice Date）であり、支払期限ではありません。'],
          ['April 1', '来月初日は契約開始日として言及されていますが、支払期限ではありません。'],
          ['April 30', '4月末という日付は請求書には記載されていません。'],
        ],
        0,  // 正解
        '請求書の「Due Date: March 31」が支払期限です。',
        [['t02-t1-invoice', 0, 'Due Date: March 31']],
      ),
    ],
  },

  // ──────────────────────────────
  // Triple T2（No.191–195）
  // 美術館巡回展告知 ＋ 設営日程表 ＋ 設営スタッフのテキストメッセージ
  // ──────────────────────────────
  {
    setType: 'triple',
    passages: [t2a, t2b, t2c],
    questions: [
      // No.191 — detail: 東翼が閉鎖される期間
      q(
        191,
        'detail',
        'For how many days will the East Wing be closed to visitors before the exhibition opens?',
        '展覧会開幕前に東翼は何日間来館者に閉鎖されますか。',
        [
          ['Five days', '告知によると4月28日から5月2日まで閉鎖されており、これは5日間です。'],
          ['Three days', '3日間という期間は告知に記載されていません。'],
          ['Seven days', '1週間という記述はありません。'],
          ['Two days', '2日間という期間は正確ではありません。'],
        ],
        0,  // 正解
        '告知に「April 28 through May 2」と明記されており、4/28・4/29・4/30・5/1・5/2の5日間です。',
        [['t02-t2-notice', 2, 'East Wing will be closed to the public from April 28 through May 2']],
      ),

      // No.192 — infer: クロスリファレンス（日程表の外部クルー担当日 × テキストのタイムスタンプ）
      q(
        192,
        'infer',
        'Based on the schedule and the text messages, what problem did the installation crew face on April 29?',
        '日程表とテキストメッセージから、設営クルーは4月29日にどのような問題に直面しましたか。',
        [
          ['A component needed for a large sculpture was missing.', 'ユキが「ブラケットが一つ不足している」と報告しており、部品不足が問題でした。'],
          ['The delivery of art crates was delayed until the afternoon.', '梱包材の配送は前日（4月28日）に完了しており、遅延ではありません。'],
          ['The external installation crew did not arrive on time.', 'マーカスが「外部クルーも来ています」と報告しており、到着の遅れはありませんでした。'],
          ['Hall A had insufficient lighting for the large-format works.', '照明不足の問題はテキストメッセージに記載されていません。'],
        ],
        0,  // 正解
        'テキストメッセージで「ブラケットが不足している」という部品欠品が明らかになり、日程表の大型作品取り付けに支障が生じたことが推測できます。',
        [
          ['t02-t2-texts', 1, 'we are missing a bracket'],
          ['t02-t2-schedule', 0, 'April 29 (Tuesday): Structural mounting for large-format works'],
        ],
      ),

      // No.193 — not: 告知に記載されていない情報
      q(
        193,
        'not',
        'What is NOT stated in the museum notice about the exhibition?',
        '美術館の告知に展覧会について記載されていない情報はどれですか。',
        [
          ['The names of the participating artists', '告知は「18 contemporary artists from 11 countries」とのみ述べており、個別の芸術家名は挙げていません。'],
          ['The admission price for senior visitors', '告知に「$12 for seniors」と明記されています。'],
          ['The availability of audio guides', '告知に「Audio guides in six languages are available」と記載されています。'],
          ['The duration of the exhibition', '告知に「May 3 through July 27」と期間が明記されています。'],
        ],
        0,  // 正解（参加芸術家の具体名は不記載）
        '告知は参加芸術家の総数と出身国数を示すのみで、個別の名前は挙げていません。他の選択肢はいずれも告知に明記されています。',
        [['t02-t2-notice', 0, '18 contemporary artists from 11 countries']],
      ),

      // No.194 — intention: マーカスの発言意図
      q(
        194,
        'intention',
        'At 8:31 A.M., what does Marcus mean when he writes "That does not leave us much of a window"?',
        '午前8時31分にマーカスが「それでは作業できる時間がほとんど残りません」と書いたのはどういう意味ですか。',
        [
          ['He is concerned that the bracket may not arrive before the crew must leave.', '外部クルーが午後4時に終了するため、正午到着予定のブラケットで作業を完了できるか不安を示しています。'],
          ['He thinks the crates should have been delivered earlier in the morning.', '梱包材の配送時刻への不満ではありません。'],
          ['He believes Hall A is too small to accommodate all the sculptures.', 'スペースの広さについては発言していません。'],
          ['He wants to postpone the installation to the following day.', '翌日への延期は提案しておらず、むしろ代替案を提示しています。'],
        ],
        0,  // 正解
        'ブラケットが正午到着予定である一方、外部クルーの終了が午後4時であることから、時間的余裕のなさへの懸念を示しています。',
        [
          ['t02-t2-texts', 1, 'they can deliver a replacement by noon'],
          ['t02-t2-texts', 2, 'The external crew has a firm 4:00 P.M. cutoff today'],
        ],
        { intentionTarget: { sender: 'Marcus', utteranceEn: 'That does not leave us much of a window.' } },
      ),

      // No.195 — infer: ユキが外部クルーに残留を求めた理由
      q(
        195,
        'infer',
        'Why does Yuki ask the external crew to stay until the mobile is finished?',
        'ユキはなぜモビールが完成するまで外部クルーに残留するよう求めていますか。',
        [
          ['Their equipment is required for the ceiling installation.', 'ユキは「天井作業には彼らの機材が必要」と明示的に述べています。'],
          ['They are the only crew authorized to handle Carla Reyes\'s artwork.', '資格認定に関する記述はなく、外部クルーが唯一の取扱権限者という記述はありません。'],
          ['The supplier requires a crew member to sign for the delivered bracket.', 'サプライヤーの受取署名については言及されていません。'],
          ['They need to transport the finished mobile to a storage area after installation.', '設置後の移動については述べられていません。'],
        ],
        0,  // 正解
        'テキストメッセージ第3発言（インデックス3）に「we need their equipment for the ceiling work」と明記されています。',
        [['t02-t2-texts', 3, 'we need their equipment for the ceiling work']],
      ),
    ],
  },

  // ──────────────────────────────
  // Triple T3（No.196–200）
  // サプライヤー統合記事 ＋ 社内調達方針メモ ＋ 購買チームの社内チャット
  // ──────────────────────────────
  {
    setType: 'triple',
    passages: [t3a, t3b, t3c],
    questions: [
      // No.196 — detail: 記事が述べる企業への勧告
      q(
        196,
        'detail',
        'What do industry observers recommend that companies do in response to the merger?',
        '業界の専門家は合併に対応して企業に何をするよう勧めていますか。',
        [
          ['Build relationships with additional regional suppliers', '「少なくとも一社の代替地域サプライヤーとの関係を構築する」ことを勧めています。'],
          ['Renegotiate existing contracts before regulatory approval', '規制認可前の再交渉は勧められておらず、既存契約は終了日まで履行されると述べられています。'],
          ['Switch exclusively to domestic manufacturers', '国内メーカーへの完全切替えの勧告はありません。'],
          ['Reduce overall spending on polymer components by 20%', '支出の20%削減という数値目標は記事に記載されていません。'],
        ],
        0,  // 正解
        '記事第1段落に「establish relationships with at least one alternative regional supplier」と明記されています。',
        [['t02-t3-article', 1, 'establish relationships with at least one alternative regional supplier']],
      ),

      // No.197 — infer: クロスリファレンス（記事の統合予測 × メモの即時方針）
      q(
        197,
        'infer',
        'What can be inferred about why Helen issued the memo on June 10?',
        'ヘレンが6月10日にメモを発行した理由について何が推測できますか。',
        [
          ['She wanted to act before the merger receives regulatory approval.','メモは「即時有効」とされており、記事は規制認可まで6か月かかると述べているため、認可前に先手を打って方針を定めています。'],
          ['She had already received a price increase notice from Cascade Materials.', '価格上昇通知の受領はチャットにもメモにも記述がありません。'],
          ['She was responding to a complaint from a team member about supplier quality.', '品質への不満は文書中に示されていません。'],
          ['She needed to comply with a new government regulation on procurement.', '政府規制への対応はメモの目的ではありません。'],
        ],
        0,  // 正解
        '記事は「6か月以内に規制認可が下りる」と述べており、メモは「即時有効」で代替サプライヤーの評価を求めています。認可前に体制を整えようとしている意図が推測できます。',
        [
          ['t02-t3-article', 2, 'expected to receive regulatory clearance within six months'],
          ['t02-t3-memo', 1, 'Effective immediately'],
        ],
      ),

      // No.198 — synonym: "preserve" の同義語
      q(
        198,
        'synonym',
        'The word "preserve" in paragraph 2 of the article is closest in meaning to which of the following?',
        '記事第2段落の "preserve" に最も近い意味を持つ語はどれですか。',
        [
          ['maintain', '「維持する」という意味で「交渉力を保つ」という文脈に最も合います。'],
          ['restore', '「回復させる」という意味であり、失った後に取り戻すニュアンスを含み、ここでは不自然です。'],
          ['expand', '「拡大する」という意味で、交渉力を「保つ」という文脈とは方向性が異なります。'],
          ['transfer', '「移転する・譲渡する」という意味であり、ここでは全く適合しません。'],
        ],
        0,  // 正解
        '"preserve negotiating leverage" は「交渉力を維持する」という意味で、"maintain" が最も適切な言い換えです。',
        [['t02-t3-article', 1, 'preserve negotiating leverage']],
        { targetWord: 'preserve' },
      ),

      // No.199 — infer: クロスリファレンス（メモの方針 × チャットのフィオナの質問）
      q(
        199,
        'infer',
        'What does Fiona\'s question suggest about her company\'s current sourcing?',
        'フィオナの質問から、彼女の会社の現在の調達について何が推測できますか。',
        [
          ['The company sources adhesive tape from only one supplier.', 'フィオナは「ノーフィールドのみから調達している粘着テープ」と述べており、単一調達であることを示唆しています。'],
          ['The company has no existing contracts with Norfield Supply.', 'チャットではノーフィールドからの調達が前提とされており、契約なしとは言えません。'],
          ['The adhesive tape supplier was recently changed without management approval.', '管理職の承認なしに変更したという記述はありません。'],
          ['The company relies on Cascade Materials for all polymer purchases.', 'ポリマーはカスケードとノーフィールド双方からの調達が示唆されており、カスケードのみではありません。'],
        ],
        0,  // 正解
        'フィオナのチャット発言に「exclusively from Norfield」という表現があり、粘着テープは単一仕入先（ノーフィールド）から調達していることが示されています。',
        [['t02-t3-chat', 3, 'adhesive tape we currently source exclusively from Norfield']],
      ),

      // No.200 — intention: ヘレンの発言意図（チャット最終メッセージ）
      q(
        200,
        'intention',
        'What does Helen mean when she says "I will update the memo to reflect this"?',
        'ヘレンが「この点を反映するようメモを更新します」と言うのはどういう意味ですか。',
        [
          ['She will revise the memo to include all Norfield-supplied products in the diversification review.', 'フィオナの指摘を受けて、ポリマー部品以外のノーフィールド供給品もレビュー対象とするようメモを拡大修正する意図です。'],
          ['She will send a corrected version of the memo with a new deadline.', '締め切りの変更については述べていません。'],
          ['She will add Ridgepath Industrial as an approved supplier in the memo.', 'リッジパスをメモに承認サプライヤーとして追記する話ではありません。'],
          ['She will remove the section about polymer components from the original memo.', 'ポリマー部品の記述を削除するのではなく、対象を拡大すると述べています。'],
        ],
        0,  // 正解
        'ヘレンはフィオナの質問を「Good point」と評価し、ノーフィールド供給品全体に対象を広げる旨を伝えています。「this」はフィオナが指摘した粘着テープを含む拡大方針を指しています。',
        [
          ['t02-t3-chat', 3, 'adhesive tape we currently source exclusively from Norfield'],
          ['t02-t3-chat', 4, 'extend the diversification review to all Norfield-supplied items'],
        ],
        { intentionTarget: { sender: 'Helen', utteranceEn: 'I will update the memo to reflect this.' } },
      ),
    ],
  },
];
