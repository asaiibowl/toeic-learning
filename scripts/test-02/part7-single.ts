/**
 * test-02 Part 7 単一文書（single）10セット・No.147〜175
 *
 * すべてオリジナル問題。ETS / IIBC 著作物の転載はしない。
 * 人名・社名は架空、メールドメイン・URL は .example。
 */

import { q, passage, messages } from './helpers';
import type { Part7Set } from '../../src/schemas/question.schema';

// ============================================================
// セット1 — email: 臨床試験の参加問い合わせへの回答（No.147–148）
// ============================================================
const s1 = passage(
  't02-s1-email',
  'email',
  'Clinical Trial Enrollment Inquiry',
  [
    [
      'Dear Ms. Okonkwo, Thank you for your interest in our Phase II cardiovascular study. We are pleased to confirm that applications are currently open for qualified volunteers.',
      'オコンクウォ様、弊社フェーズII心臓血管研究へのご関心をいただきありがとうございます。現在、資格を満たしたボランティアへの応募を受け付けていることをお伝えできます。',
    ],
    [
      'Participants must be between 40 and 65 years of age, free of diabetes, and available for six monthly clinic visits. A stipend of $80 per visit will be provided to cover travel costs. To begin the screening process, please complete the intake form at trials.northgate-research.example by October 20.',
      '参加者は40歳以上65歳以下で糖尿病のない方に限り、月1回・計6回の来院が必要です。交通費の補助として1回あたり80ドルの謝礼が支給されます。審査を開始するには、10月20日までにtrials.northgate-research.exampleの申込フォームにご記入ください。',
    ],
    [
      'If you have questions about eligibility or the study procedures, please contact our trial coordinator, Dana Reyes, at d.reyes@northgate-research.example.',
      '参加資格や試験手順についてご質問がある場合は、試験コーディネーターのダナ・レイエスへ d.reyes@northgate-research.example でご連絡ください。',
    ],
  ],
  { from: 'Dana Reyes <d.reyes@northgate-research.example>', to: 'Amara Okonkwo <a.okonkwo@mailbox.example>' },
);

// ============================================================
// セット2 — article: 都市型垂直農場の事業拡大（No.149–151）
// ============================================================
const s2 = passage(
  't02-s2-article',
  'article',
  'UrbanRoot Farms Scales Up Operations in Three Cities',
  [
    [
      'UrbanRoot Farms, a pioneer in hydroponic vertical agriculture, announced a major expansion plan last month. [1] The company will open new growing facilities in Portland, Austin, and Nashville by the end of next year. [2] Each location will use climate-controlled stacking towers to produce leafy greens year-round, regardless of outdoor weather conditions.',
      'ハイドロポニック垂直農業のパイオニアであるUrbanRoot Farmsが先月、大規模拡大計画を発表しました。[1] 同社は来年末までにポートランド、オースティン、ナッシュビルに新たな栽培施設を開設します。[2] 各拠点は気候制御型スタッキングタワーを使用し、屋外の天候に関係なく年間を通じて葉物野菜を生産します。',
    ],
    [
      'Chief Executive Miriam Solano said the expansion was driven by rising demand from restaurants and grocery chains seeking locally sourced produce. [3] The company currently supplies more than 200 restaurants across the Pacific Northwest. However, she noted that securing affordable warehouse space in urban centres remains the biggest operational challenge. [4]',
      'CEO のミリアム・ソラノ氏は、地元産食材を求めるレストランや食料品チェーンからの需要増加が拡大の背景にあると述べました。[3] 同社は現在、太平洋岸北西部の200以上のレストランに供給しています。ただし、都市部での手頃な倉庫スペースの確保が最大の運営上の課題と語りました。[4]',
    ],
  ],
  { hasInsertionMarkers: true },
);

// ============================================================
// セット3 — web_page: ホテルグループのロイヤルティ制度改定（No.152–154）
// ============================================================
const s3 = passage(
  't02-s3-web',
  'web_page',
  'Creston Collection Hotels — Loyalty Programme Update',
  [
    [
      'Starting January 1, our Creston Rewards programme will move to a points-based system. Members will earn ten points for every dollar spent on eligible room rates, dining, and spa services at any Creston Collection property worldwide.',
      '1月1日より、クレストン・リワーズプログラムはポイント制に移行します。会員は世界中のクレストン・コレクション施設で、対象の客室料金、ダイニング、スパサービスに対して1ドルにつき10ポイントを獲得できます。',
    ],
    [
      'Silver status is achieved at 5,000 points and includes complimentary breakfast. Gold status requires 15,000 points and adds a guaranteed room upgrade on arrival. All accumulated points from our previous tier system have been automatically converted at a ratio of one tier credit to five points.',
      'シルバーステータスは5,000ポイントで取得でき、朝食無料サービスが含まれます。ゴールドステータスは15,000ポイントが必要で、チェックイン時の客室アップグレード保証が追加されます。旧ティア制度で蓄積したすべてのポイントは、1ティアクレジット＝5ポイントの比率で自動変換されています。',
    ],
    [
      'Points cannot be redeemed for cash and will expire if an account is inactive for 24 consecutive months. Members who booked directly through our website before December 31 will receive a one-time bonus of 500 points.',
      'ポイントは現金への換金はできず、24か月連続で利用がない場合は失効します。12月31日以前に公式ウェブサイトから直接予約した会員には、一回限りの500ポイントボーナスが付与されます。',
    ],
  ],
);

// ============================================================
// セット4 — notice: 大学図書館アーカイブの閲覧手続き変更（No.155–157）
// ============================================================
const s4 = passage(
  't02-s4-notice',
  'notice',
  'Westbrook University Library — Special Collections Access Procedure',
  [
    [
      'Effective September 1, researchers wishing to consult materials in the Special Collections archive must submit an online appointment request at least 72 hours in advance. Walk-in visits will no longer be permitted during this period.',
      '9月1日より、特別コレクション・アーカイブの資料を閲覧したい研究者は、少なくとも72時間前にオンラインで予約申請を行う必要があります。当期間中は飛び込み来館はできません。',
    ],
    [
      'At the time of your appointment, you will be required to present a valid university ID or a government-issued photo identification. Personal bags and food are prohibited in the reading room. Pencils are provided; pens and highlighters must be left outside. Photographs may be taken with a personal camera for personal research use only, provided flash is disabled.',
      '予約時間には、有効な大学IDまたは公的機関発行の顔写真付き身分証明書の提示が必要です。閲覧室へのバッグと食べ物の持ち込みは禁止されています。鉛筆は貸し出しますが、ペンと蛍光ペンは外に置いてください。個人の研究目的に限り、フラッシュを無効にした状態で個人用カメラによる撮影が可能です。',
    ],
    [
      'Appointments may be cancelled up to 24 hours before the scheduled time without penalty. Late cancellations or no-shows will result in a 30-day restriction on future bookings. Contact archives@westbrook-lib.example with any questions.',
      '予約はキャンセルしても当日の24時間前まではペナルティなしで取り消せます。当日キャンセルや無断キャンセルの場合、今後の予約が30日間制限されます。ご質問はarchives@westbrook-lib.exampleまでお問い合わせください。',
    ],
  ],
);

// ============================================================
// セット5 — online_chat: リリース延期をめぐる社内チャット（No.158–160）
// ============================================================
const s5 = messages(
  't02-s5-chat',
  'online_chat',
  'Product Team Chat — Release Update',
  [
    ['Lena', '2:05 P.M.', 'Quick update — QA found a memory leak in the export module this morning. We cannot ship version 4.2 on Thursday as planned.', '短い報告です。今朝QAがエクスポートモジュールでメモリリークを発見しました。計画通り木曜日にバージョン4.2をリリースすることはできません。'],
    ['Omar', '2:07 P.M.', 'How serious is it? Does it affect all platforms or just one?', '深刻度はどのくらいですか。全プラットフォームに影響しますか、それとも一つだけですか。'],
    ['Lena', '2:09 P.M.', 'It only affects the Windows build, but we still need at least four days to patch and retest. That is going to push us to Monday at the earliest.', 'Windowsビルドのみに影響しますが、パッチ適用と再テストに少なくとも4日は必要です。最短でも月曜日にずれ込みます。'],
    ['Priya', '2:11 P.M.', 'That is going to be tight. We already promised the sales team a Thursday delivery for their client demo.', '厳しいですね。セールスチームにはクライアントデモ向けに木曜日の納品を約束しています。'],
    ['Omar', '2:13 P.M.', 'Can we give sales a stable build of version 4.1 to use for the demo in the meantime?', 'その間、デモ用として安定版の4.1をセールスに渡すことはできますか。'],
    ['Lena', '2:15 P.M.', 'Yes, version 4.1 is fully stable. I will send them the installer link right now.', 'はい、バージョン4.1は完全に安定しています。今すぐインストーラーのリンクを送ります。'],
  ],
);

// ============================================================
// セット6 — letter: 商業テナントへの賃料改定通知（No.161–163）
// ============================================================
const s6 = passage(
  't02-s6-letter',
  'letter',
  'Notice of Rent Adjustment — Unit 4B, Calloway Commerce Centre',
  [
    [
      'Dear Ms. Farida Ng, This letter serves as formal notice that the monthly rent for Unit 4B at Calloway Commerce Centre will increase from $3,400 to $3,740 beginning March 1. This adjustment reflects a ten percent increase in line with the annual review clause in your lease agreement, signed on March 1 three years ago.',
      'ファリダ・ング様、本書は、カロウェイ・コマース・センター4B号室の月額賃料が3月1日より3,400ドルから3,740ドルに引き上げられることの正式通知です。この改定は、3年前の3月1日に署名されたリース契約の年次見直し条項に基づく10パーセントの引き上げです。',
    ],
    [
      'You have the option to terminate your tenancy without penalty before February 15 if you do not wish to continue under the revised terms. Should you choose to remain, no further action is required on your part. Your next rent payment on March 1 should reflect the new amount.',
      '改定条件での継続をご希望でない場合は、2月15日以前にペナルティなしでテナント契約を解除することができます。継続を選択された場合は特段の手続きは不要です。3月1日の次回家賃支払いより新額をお支払いください。',
    ],
    [
      'If you have questions regarding this notice, please contact our property management office at leasing@calloway-cc.example or call 555-0192 during business hours.',
      'この通知に関するご質問は、business hoursにleasing@calloway-cc.exampleまたは555-0192にてプロパティマネジメントオフィスへお問い合わせください。',
    ],
  ],
  { from: 'Calloway Commerce Centre Management <leasing@calloway-cc.example>', to: 'Farida Ng <f.ng@ngconsult.example>' },
);

// ============================================================
// セット7 — advertisement: ポッドキャスト制作スタジオの求人広告（No.164–166）
// ============================================================
const s7 = passage(
  't02-s7-ad',
  'advertisement',
  'Audio Producer — Ironclad Sound Studio',
  [
    [
      'Ironclad Sound Studio is hiring a full-time Audio Producer to join our team in Denver. We specialize in producing branded podcasts for corporate clients across the technology and healthcare sectors.',
      'アイアンクラッド・サウンド・スタジオは、デンバーのチームに加わるフルタイムのオーディオプロデューサーを募集しています。当スタジオはテクノロジーおよびヘルスケア分野の企業クライアント向けのブランドポッドキャスト制作を専門としています。',
    ],
    [
      'The successful candidate will record, edit, and mix audio content; manage client feedback sessions; and coordinate release schedules. A minimum of three years of professional audio production experience is required. Familiarity with Adobe Audition or a comparable DAW is essential. Experience in a client-facing role is strongly preferred.',
      '採用者は音声コンテンツの録音・編集・ミキシング、クライアントフィードバックセッションの管理、リリーススケジュールの調整を担当します。プロとして3年以上の音声制作経験が必須です。Adobe Auditionまたは同等のDAWに精通していることが不可欠です。クライアントと直接対応する経験があることが強く望まれます。',
    ],
    [
      'We offer a competitive salary, fully paid health insurance, and 20 days of annual leave. Remote work is not available for this position. Interested applicants should send a cover letter, résumé, and two audio samples to careers@ironclad-sound.example by November 30.',
      '競争力のある給与、完全有給の健康保険、年間20日の休暇を提供します。この職種はリモートワーク不可です。応募希望者はカバーレター、履歴書、音声サンプル2点を11月30日までにcareers@ironclad-sound.exampleへ送付してください。',
    ],
  ],
);

// ============================================================
// セット8 — invoice: 国際貨物の運賃明細（追加料金あり）（No.167–169）
// ============================================================
const s8 = passage(
  't02-s8-invoice',
  'invoice',
  'Meridian Freight Services — Invoice MF-7741',
  [
    [
      'Shipper: Pelton Industrial Ltd. | Consignee: Volta Components GmbH | Origin: Vancouver, Canada | Destination: Hamburg, Germany | Shipment date: October 3 | Cargo: 12 pallets of circuit boards (2,400 kg)',
      '荷送人：ペルトン・インダストリアル社｜荷受人：ヴォルタ・コンポーネンツ社｜発地：カナダ・バンクーバー｜着地：ドイツ・ハンブルク｜出荷日：10月3日｜貨物：回路基板12パレット（2,400 kg）',
    ],
    [
      'Ocean freight: $1,860 | Fuel surcharge: $210 | Port handling (Vancouver): $145 | Port handling (Hamburg): $175 | Customs documentation: $90 | Subtotal: $2,480',
      '海上運賃：1,860ドル｜燃料割増料金：210ドル｜港湾取扱料（バンクーバー）：145ドル｜港湾取扱料（ハンブルク）：175ドル｜通関書類：90ドル｜小計：2,480ドル',
    ],
    [
      'Refrigeration surcharge (applied due to temperature-sensitive cargo declaration): $320 | Total due: $2,800 | Payment terms: Net 30 days from invoice date (October 3). A 1.5% monthly interest charge applies to overdue balances.',
      '冷蔵割増料金（温度管理貨物申告に伴い適用）：320ドル｜支払総額：2,800ドル｜支払条件：請求書発行日（10月3日）から30日以内。未払い残高には月1.5%の利息が発生します。',
    ],
  ],
);

// ============================================================
// セット9 — form: カンファレンス登壇提案フォーム（記入済み）（No.170–172）
// ============================================================
const s9 = passage(
  't02-s9-form',
  'form',
  'Nexbridge Technology Forum — Speaker Proposal Form',
  [
    [
      'Applicant name: Dr. Yuki Tanaka | Affiliation: Westcoast Institute of Applied AI | Proposed session title: Bias Mitigation in Large Language Models | Session format: 45-minute presentation with Q&A | Preferred date: Day 1 (March 4) | Required equipment: Laptop connection, wireless microphone',
      '申請者氏名：田中雪博士｜所属：ウェストコースト応用AI研究所｜提案セッションタイトル：大規模言語モデルにおけるバイアス軽減｜セッション形式：質疑応答を含む45分のプレゼンテーション｜希望日：1日目（3月4日）｜必要機器：ノートPC接続、ワイヤレスマイクロフォン',
    ],
    [
      'Abstract (max 150 words): This session examines practical techniques for identifying and reducing bias in large language model outputs. Drawing on two years of research at Westcoast Institute, Dr. Tanaka will demonstrate open-source toolkits that allow development teams to audit model responses for demographic bias before deployment. Attendees will leave with actionable guidelines and a curated list of evaluation benchmarks.',
      '概要（150語以内）：このセッションでは、大規模言語モデルの出力におけるバイアスの特定と軽減のための実践的な技術を検討します。ウェストコースト研究所での2年間の研究を踏まえ、田中博士は開発チームがデプロイ前にモデルの応答の人口統計学的バイアスを監査できるオープンソースツールキットを紹介します。参加者は実用的なガイドラインと評価ベンチマークのリストを持ち帰ることができます。',
    ],
    [
      'Travel support requested: Yes — international travel from Tokyo, Japan | Previous Nexbridge speaking experience: None | Co-presenter: None | Special dietary requirement: Vegetarian',
      '渡航支援申請：あり（日本・東京からの国際移動）｜過去のNextbridgeでの登壇：なし｜共同発表者：なし｜食事の特別要件：ベジタリアン',
    ],
  ],
);

// ============================================================
// セット10 — memo: 工場の安全監査を受けた是正指示（No.173–175）
// ============================================================
const s10 = passage(
  't02-s10-memo',
  'memo',
  'Internal Memo: Safety Audit Corrective Actions — Halden Manufacturing Plant',
  [
    [
      'TO: All Department Supervisors | FROM: Greta Wolff, Safety & Compliance Manager | DATE: November 14 | RE: Corrective Actions Following Safety Audit',
      '宛先：全部門スーパーバイザー｜差出人：グレタ・ウォルフ（安全・コンプライアンスマネージャー）｜日付：11月14日｜件名：安全監査後の是正措置',
    ],
    [
      'The external safety audit conducted on November 10 identified three areas requiring immediate corrective action. First, emergency exit signage in Warehouse B must be replaced with illuminated signs by November 25. Second, fire extinguisher inspection records in the assembly hall have not been updated since April and must be brought current within five business days. Third, forklift operators must complete a refresher training session before operating any vehicle after December 1.',
      '11月10日に実施した外部安全監査において、即時の是正措置が必要な3点が特定されました。第一に、倉庫Bの非常口標識は11月25日までに発光式標識に交換してください。第二に、組立ホールの消火器点検記録が4月から更新されておらず、5営業日以内に最新の状態にしてください。第三に、フォークリフトオペレーターは12月1日以降の車両操作前にリフレッシャー研修を修了する必要があります。',
    ],
    [
      'Each supervisor is responsible for documenting the completion of their relevant action item and submitting confirmation to safety@halden-mfg.example no later than the specified deadline. Failure to meet any deadline may result in a formal compliance notice being issued to the department. Please contact my office if you have any questions.',
      '各スーパーバイザーは担当する是正項目の完了を記録し、指定期限内にsafety@halden-mfg.exampleへ確認を提出する責任があります。いずれかの期限を守れない場合は部門へ正式なコンプライアンス通知が発行される可能性があります。ご質問があれば私のオフィスへご連絡ください。',
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
        'What is the purpose of the e-mail?',
        'このメールの目的は何ですか。',
        [
          [
            'To respond to an inquiry about joining a research study',
            '冒頭で研究への関心に礼を述べ、応募受付中であることを伝えており、問い合わせへの回答です。',
          ],
          [
            'To notify a participant that she has been accepted',
            '採用決定ではなく、審査フォームの提出を促す段階の連絡です。',
          ],
          [
            'To announce the results of a completed clinical trial',
            '試験が完了したとは述べられておらず、現在進行中の募集案内です。',
          ],
          [
            'To request payment for a medical procedure',
            '費用を請求する内容ではなく、謝礼の支給について説明しています。',
          ],
        ],
        0,
        '冒頭で「ご関心への礼」を述べ、参加条件・手順を説明している点から問い合わせへの返答と判断します。',
        [['t02-s1-email', 0, 'Thank you for your interest in our Phase II cardiovascular study.']],
      ),
      q(
        148,
        'detail',
        'What must applicants do by October 20?',
        '応募者は10月20日までに何をしなければなりませんか。',
        [
          [
            'Attend an in-person screening appointment',
            '来院での審査については述べられておらず、オンラインフォームの記入が求められています。',
          ],
          [
            'Send a medical history document by e-mail',
            '病歴書類のメール送付は指示されていません。',
          ],
          [
            'Complete an intake form on the research website',
            '10月20日までに指定ウェブサイトの申込フォームを記入するよう明記されています。',
          ],
          [
            'Pay a registration fee to the coordinator',
            '登録料の支払いは述べられておらず、謝礼が支給される側です。',
          ],
        ],
        2,
        '第2段落末尾にオンラインフォームの提出期限として10月20日が明示されています。',
        [['t02-s1-email', 1, 'please complete the intake form at trials.northgate-research.example by October 20.']],
      ),
    ],
  },

  // ---- セット2: article（No.149–151）insertion あり ----
  {
    setType: 'single',
    passages: [s2],
    questions: [
      q(
        149,
        'insertion',
        'Where does the following sentence best belong? "Initial funding for the project came from a regional agricultural development grant."',
        '次の文を入れるのに最も適切な位置はどこですか。「このプロジェクトへの初期資金は、地域農業開発助成金から提供されました。」',
        [
          [
            '[1]',
            '拡大計画の発表を受け、資金源に言及する文は[1]に置くと計画の背景補足として自然につながります。',
          ],
          [
            '[2]',
            '[2]は3都市展開の詳細説明へ移行する位置であり、資金の話題は前の文脈から離れすぎます。',
          ],
          [
            '[3]',
            '[3]はCEOのコメントの途中にあり、需要について述べた文の後に資金の話が割り込むと流れが断ち切られます。',
          ],
          [
            '[4]',
            '[4]は倉庫確保の課題に続く段落末で、資金の話題を最後に置くと既存の締めくくりが弱まります。',
          ],
        ],
        0,
        '拡大計画の発表直後に初期資金の出所を補足する[1]が最も論理的な挿入位置です。',
        // insertion 問題は evidence 不要
      ),
      q(
        150,
        'detail',
        'How many restaurants does UrbanRoot Farms currently supply?',
        'UrbanRoot Farms は現在何件のレストランに食材を供給していますか。',
        [
          [
            'Fewer than 100',
            '100件未満という記載はなく、200以上と述べられています。',
          ],
          [
            'Exactly 200',
            '200件ちょうどではなく、200件を超えると明記されています。',
          ],
          [
            'More than 200',
            '第2段落に太平洋岸北西部の200以上のレストランへ供給中とあります。',
          ],
          [
            'About 300',
            '300という数字は本文に登場しません。',
          ],
        ],
        2,
        '第2段落の現在の供給先数を直接読み取ります。',
        [['t02-s2-article', 1, 'The company currently supplies more than 200 restaurants across the Pacific Northwest.']],
      ),
      q(
        151,
        'infer',
        'What is most likely true about UrbanRoot Farms?',
        'UrbanRoot Farms について最も当てはまる推測はどれですか。',
        [
          [
            'It grows produce that requires outdoor sunlight.',
            '気候制御型タワーを使い、屋外の天候に依存しないと述べられています。',
          ],
          [
            'It has difficulty finding suitable facilities in cities.',
            '都市部での手頃な倉庫スペース確保が最大の課題だと明記されており、都市での施設確保に苦労していると推測できます。',
          ],
          [
            'It does not have any corporate clients yet.',
            '200以上のレストランへ既に供給中であり、クライアントがいないとは言えません。',
          ],
          [
            'It plans to move its headquarters to Nashville.',
            '本社移転の計画は述べられておらず、施設開設の話です。',
          ],
        ],
        1,
        'CEOが「都市部での倉庫スペース確保が最大の課題」と述べていることから推測します。',
        [['t02-s2-article', 1, 'securing affordable warehouse space in urban centres remains the biggest operational challenge.']],
      ),
    ],
  },

  // ---- セット3: web_page（No.152–154） ----
  {
    setType: 'single',
    passages: [s3],
    questions: [
      q(
        152,
        'main_idea',
        'What is the main purpose of the web page?',
        'このウェブページの主な目的は何ですか。',
        [
          [
            'To inform members about changes to the loyalty programme',
            '1月1日からのポイント制移行など、ロイヤルティ制度の改定内容を会員に伝えることが目的です。',
          ],
          [
            'To advertise new Creston Collection hotel properties',
            '新しいホテル物件の広告ではなく、既存プログラムの変更説明です。',
          ],
          [
            'To ask members to update their account information',
            '情報更新の要求は述べられていません。',
          ],
          [
            'To announce the opening of a new spa facility',
            'スパ施設の新規開業は述べられておらず、スパはポイント対象サービスの一つとして言及されているだけです。',
          ],
        ],
        0,
        '第1段落からポイント制への移行という制度改定の説明が全体の主旨です。',
        [['t02-s3-web', 0, 'our Creston Rewards programme will move to a points-based system.']],
      ),
      q(
        153,
        'detail',
        'What benefit does Silver status provide?',
        'シルバーステータスにはどのような特典がありますか。',
        [
          [
            'A free morning meal each day',
            '第2段落にシルバーステータスで朝食無料が含まれると明記されています。',
          ],
          [
            'A guaranteed room upgrade at check-in',
            '客室アップグレード保証はゴールドステータスの特典です。',
          ],
          [
            'A 500-point welcome bonus',
            '500ポイントボーナスは年末前に直接予約した会員向けで、シルバーステータスの特典ではありません。',
          ],
          [
            'The ability to convert points into cash',
            '現金への換金は不可と明記されています。',
          ],
        ],
        0,
        'Silver status の特典を第2段落で直接確認します。',
        [['t02-s3-web', 1, 'Silver status is achieved at 5,000 points and includes complimentary breakfast.']],
      ),
      q(
        154,
        'not',
        'What is NOT mentioned about the Creston Rewards programme?',
        'クレストン・リワーズプログラムについて述べられていないものはどれですか。',
        [
          [
            'Points are earned on spa services.',
            '第1段落でスパサービスもポイント対象と明記されています。',
          ],
          [
            'Unused points will eventually expire.',
            '第3段落で24か月の未利用でポイントが失効すると述べられています。',
          ],
          [
            'Members can transfer points to another account.',
            'ポイントの他アカウントへの移転については本文に記載がなく、現金換金不可の説明のみです。',
          ],
          [
            'Old tier credits were converted to points automatically.',
            '第2段落で旧ティアクレジットが自動変換されたと述べられています。',
          ],
        ],
        2,
        'NOT問題では本文に記述のない項目を選びます。ポイント移転については一切触れられていません。',
        [['t02-s3-web', 2, 'Points cannot be redeemed for cash and will expire if an account is inactive for 24 consecutive months.']],
      ),
    ],
  },

  // ---- セット4: notice（No.155–157） ----
  {
    setType: 'single',
    passages: [s4],
    questions: [
      q(
        155,
        'detail',
        'What must visitors bring to their appointment?',
        '予約した訪問者は何を持参しなければなりませんか。',
        [
          [
            'A printed confirmation of their online request',
            'オンライン予約確認書の持参指示はありません。',
          ],
          [
            'A letter of authorization from a faculty supervisor',
            '指導教員の承認書は求められていません。',
          ],
          [
            'A form of photo identification',
            '第2段落に大学IDまたは顔写真付き身分証明書の提示が必要と明記されています。',
          ],
          [
            'Their own pens and pencils',
            'ペンは持ち込み禁止で、鉛筆は貸し出されます。',
          ],
        ],
        2,
        '閲覧当日の持参物を第2段落から直接読み取ります。',
        [['t02-s4-notice', 1, 'you will be required to present a valid university ID or a government-issued photo identification.']],
      ),
      q(
        156,
        'infer',
        'What can be inferred about the policy change?',
        'この方針変更について推測できることは何ですか。',
        [
          [
            'It was introduced to manage the volume of archive visitors.',
            '72時間前のオンライン予約義務化と飛び込み来館禁止は、来館者数の管理が目的と推測できます。',
          ],
          [
            'It applies only to graduate students.',
            '大学院生に限定するという記述はなく、研究者全般を対象にしています。',
          ],
          [
            'It was requested by students rather than library staff.',
            '変更の要望者については何も述べられていません。',
          ],
          [
            'It will be reviewed after six months.',
            '見直し期間については本文に記載がありません。',
          ],
        ],
        0,
        '飛び込み来館を禁止してオンライン予約を義務化した措置は、来館者数の管理を目的としていると推測できます。',
        [['t02-s4-notice', 0, 'Walk-in visits will no longer be permitted during this period.']],
      ),
      q(
        157,
        'synonym',
        'The word "penalty" in paragraph 3 is closest in meaning to',
        '第3段落の "penalty" に最も近い意味はどれですか。',
        [
          [
            'punishment',
            'penalty はここでルール違反への制裁・不利益を指しており、punishment が最も近い意味です。',
          ],
          [
            'fee',
            'キャンセル規定では「料金」を指すこともありますが、この通知が定める不利益は金銭ではなく30日間の予約制限なので当てはまりません。',
          ],
          [
            'delay',
            '「遅延」の意味はなく、期限内キャンセルで何かが遅れるという記述もありません。',
          ],
          [
            'reminder',
            '「注意喚起」の意味で、規則違反に対して科される不利益を表す語ではありません。',
          ],
        ],
        0,
        'without penalty は「不利益を科されずに」という意味です。直後の文で不利益の中身が30日間の予約制限だと示されており、金銭ではなく制裁を指すと分かります。',
        [['t02-s4-notice', 2, 'Appointments may be cancelled up to 24 hours before the scheduled time without penalty.']],
        { targetWord: 'penalty' },
      ),
    ],
  },

  // ---- セット5: online_chat（No.158–160） ----
  {
    setType: 'single',
    passages: [s5],
    questions: [
      q(
        158,
        'main_idea',
        'What is the main topic of the conversation?',
        'この会話の主なトピックは何ですか。',
        [
          [
            'A software release that must be postponed',
            'QAによるバグ発見でバージョン4.2のリリースが木曜から延期になることが話題の中心です。',
          ],
          [
            'A client demo that has been canceled',
            'デモのキャンセルは述べられておらず、代替版の提供が検討されています。',
          ],
          [
            'A hardware failure in the testing environment',
            'ハードウェアの障害ではなく、ソフトウェアのメモリリークが問題です。',
          ],
          [
            'A request to hire additional QA engineers',
            'エンジニアの採用依頼は述べられていません。',
          ],
        ],
        0,
        'レナの最初の発言でバージョン4.2のリリース延期が伝えられ、それへの対応が会話全体の主題です。',
        [['t02-s5-chat', 0, 'We cannot ship version 4.2 on Thursday as planned.']],
      ),
      q(
        159,
        'intention',
        'At 2:11 P.M., what does Priya most likely mean when she says, "That is going to be tight"?',
        '午後2時11分のプリヤの「厳しいですね」は何を意味していますか。',
        [
          [
            'The schedule will be difficult to meet given the existing promise to the sales team.',
            '直前にセールスチームへ木曜納品を約束済みと述べており、月曜への延期が約束と相容れないことを懸念しています。',
          ],
          [
            'The memory leak is more serious than Lena described.',
            'バグの深刻度についての発言ではなく、スケジュールへの影響を懸念しています。',
          ],
          [
            'The Windows build requires more testing than other platforms.',
            'プラットフォームごとのテスト工数の比較をしているわけではありません。',
          ],
          [
            'The sales team should cancel the client demo.',
            'デモのキャンセルを提案しているわけではなく、スケジュールの問題を指摘しています。',
          ],
        ],
        0,
        'プリヤは直後に「セールスチームへの木曜納品の約束」を述べており、延期により約束が守れなくなることを懸念しています。',
        [['t02-s5-chat', 3, 'That is going to be tight.']],
        { intentionTarget: { sender: 'Priya', utteranceEn: 'That is going to be tight.' } },
      ),
      q(
        160,
        'infer',
        'What will most likely happen next?',
        '次に何が起こる可能性が高いですか。',
        [
          [
            'The sales team will receive a link to version 4.1.',
            'レナが「今すぐインストーラーリンクを送る」と述べており、セールスチームが4.1を受け取る見通しです。',
          ],
          [
            'Omar will fix the memory leak immediately.',
            'バグ修正の担当者はオマールとは述べられておらず、少なくとも4日必要とあります。',
          ],
          [
            'Priya will reschedule the client demo to Monday.',
            'デモの再設定はプリヤが行うとは述べられていません。',
          ],
          [
            'Lena will contact the client directly to explain the delay.',
            'レナがクライアントへ直接連絡するとは述べられていません。',
          ],
        ],
        0,
        'レナの最後の発言「今すぐインストーラーリンクを送る」から、セールスチームへの送付が次に起こると判断します。',
        [['t02-s5-chat', 5, 'I will send them the installer link right now.']],
      ),
    ],
  },

  // ---- セット6: letter（No.161–163） ----
  {
    setType: 'single',
    passages: [s6],
    questions: [
      q(
        161,
        'main_idea',
        'What is the main purpose of the letter?',
        'この手紙の主な目的は何ですか。',
        [
          [
            'To inform a tenant of an upcoming rent increase',
            '3月1日からの賃料引き上げを正式に通知することが目的です。',
          ],
          [
            'To confirm the signing of a new lease agreement',
            '新しいリース契約の締結確認ではなく、既存契約の条項に基づく改定通知です。',
          ],
          [
            'To offer a rent reduction as an incentive to renew',
            '賃料引き下げではなく、値上げの通知です。',
          ],
          [
            'To request payment of overdue rent',
            '賃料滞納への対応ではなく、将来の改定の予告です。',
          ],
        ],
        0,
        '第1段落の冒頭で3月1日からの賃料引き上げを正式通知と明示しています。',
        [['t02-s6-letter', 0, 'This letter serves as formal notice that the monthly rent for Unit 4B at Calloway Commerce Centre will increase']],
      ),
      q(
        162,
        'detail',
        'How much will the monthly rent increase?',
        '月額賃料はいくら増加しますか。',
        [
          [
            'By $240',
            '3,740 − 3,400 = 340ドルであり、240ドルではありません。',
          ],
          [
            'By $300',
            '300ドルという数値は本文に登場しません。',
          ],
          [
            'By $340',
            '3,400ドルから3,740ドルへの差額は340ドルです。',
          ],
          [
            'By $400',
            '400ドルという数値は本文に登場しません。',
          ],
        ],
        2,
        '新旧の賃料から差額を計算します（3,740 − 3,400 = 340）。',
        [['t02-s6-letter', 0, 'the monthly rent for Unit 4B at Calloway Commerce Centre will increase from $3,400 to $3,740 beginning March 1.']],
      ),
      q(
        163,
        'infer',
        'What can be inferred about Ms. Ng\'s lease?',
        'ングさんのリース契約について推測できることは何ですか。',
        [
          [
            'It was originally a one-year agreement.',
            '3年前に署名したという記述はありますが、当初の契約期間が1年とは述べられていません。',
          ],
          [
            'It includes a clause allowing annual rent reviews.',
            '第1段落に「リース契約の年次見直し条項に基づく」と明記されており、そのような条項が存在することが分かります。',
          ],
          [
            'It was renewed without any changes last year.',
            '昨年の更新内容については述べられていません。',
          ],
          [
            'It prohibits the tenant from subletting the unit.',
            '転貸禁止については触れられていません。',
          ],
        ],
        1,
        '「リース契約の年次見直し条項に基づく」という記述から、年次見直し条項が契約に含まれていることが推測できます。',
        [['t02-s6-letter', 0, 'This adjustment reflects a ten percent increase in line with the annual review clause in your lease agreement']],
      ),
    ],
  },

  // ---- セット7: advertisement（No.164–166） ----
  {
    setType: 'single',
    passages: [s7],
    questions: [
      q(
        164,
        'detail',
        'What type of clients does Ironclad Sound Studio primarily serve?',
        'アイアンクラッド・サウンド・スタジオは主にどのような顧客にサービスを提供していますか。',
        [
          [
            'Independent musicians and bands',
            'ミュージシャンやバンドへのサービスとは述べられていません。',
          ],
          [
            'Businesses in technology and healthcare',
            '第1段落にテクノロジーおよびヘルスケア分野の企業クライアント向けと明記されています。',
          ],
          [
            'Local radio stations and broadcasters',
            'ラジオ局や放送局への言及はありません。',
          ],
          [
            'Film and television production companies',
            '映像制作会社への言及はありません。',
          ],
        ],
        1,
        '第1段落のスタジオ紹介から主な顧客層を直接確認します。',
        [['t02-s7-ad', 0, 'We specialize in producing branded podcasts for corporate clients across the technology and healthcare sectors.']],
      ),
      q(
        165,
        'not',
        'What is NOT mentioned as a job requirement?',
        '求人条件として述べられていないものはどれですか。',
        [
          [
            'At least three years of audio production experience',
            '第2段落に3年以上の経験が必須と明記されています。',
          ],
          [
            'Knowledge of a digital audio workstation',
            '第2段落にAdobe Auditionまたは同等のDAWへの精通が必須と述べられています。',
          ],
          [
            'Experience working with clients directly',
            '第2段落にクライアント対応経験が強く望まれると述べられています。',
          ],
          [
            'A degree in audio engineering or a related field',
            '音響工学の学位については一切触れられていません。',
          ],
        ],
        3,
        'NOT問題では本文にない項目を選びます。学位要件は広告に記載がありません。',
        [['t02-s7-ad', 1, 'A minimum of three years of professional audio production experience is required.']],
      ),
      q(
        166,
        'infer',
        'What can be inferred about the position?',
        'この求人について推測できることは何ですか。',
        [
          [
            'It requires candidates to relocate to Denver.',
            'リモートワーク不可と述べられており、デンバーへの出社が必要と推測できます。ただし必ずしも転居を要求しているとは言えません。',
          ],
          [
            'The studio will hire multiple people for this role.',
            '複数採用については述べられていません。',
          ],
          [
            'Applicants must already live in Denver.',
            '居住地の制限は述べられておらず、リモート不可は在職者の勤務形態の話です。',
          ],
          [
            'The job involves working on-site rather than remotely.',
            'リモートワーク不可と明記されており、スタジオへの出社が必要と推測できます。',
          ],
        ],
        3,
        '第3段落の「リモートワーク不可」という記述から、対面での勤務が求められると推測できます。',
        [['t02-s7-ad', 2, 'Remote work is not available for this position.']],
      ),
    ],
  },

  // ---- セット8: invoice（No.167–169） ----
  {
    setType: 'single',
    passages: [s8],
    questions: [
      q(
        167,
        'detail',
        'Why was a refrigeration surcharge added to the invoice?',
        '冷蔵割増料金が請求書に加算されたのはなぜですか。',
        [
          [
            'The cargo was heavier than the standard limit.',
            '重量オーバーではなく、温度管理の申告が理由です。',
          ],
          [
            'The shipment was rerouted through a different port.',
            '別港への迂回は述べられていません。',
          ],
          [
            'The goods were declared as temperature-sensitive.',
            '第3段落に「温度管理貨物申告に伴い適用」と明記されています。',
          ],
          [
            'Delivery was delayed beyond the scheduled date.',
            '遅延については述べられていません。',
          ],
        ],
        2,
        '第3段落の冷蔵割増料金の括弧書きで理由が直接説明されています。',
        [['t02-s8-invoice', 2, 'Refrigeration surcharge (applied due to temperature-sensitive cargo declaration): $320']],
      ),
      q(
        168,
        'synonym',
        'The word "terms" in paragraph 3 is closest in meaning to',
        '第3段落の "terms" に最も近い意味はどれですか。',
        [
          [
            'conditions',
            '支払い条件という文脈で terms は conditions（条件）を意味します。',
          ],
          [
            'words',
            '語句・用語という意味もありますが、この文脈には合いません。',
          ],
          [
            'periods',
            '期間という意味もありますが、「支払い期間」より「支払い条件」が適切です。',
          ],
          [
            'agreements',
            '合意という意味には近いですが、ここでは具体的な支払い条件を指しています。',
          ],
        ],
        0,
        'Payment terms は「支払い条件」であり、conditions が最も近い意味です。',
        [['t02-s8-invoice', 2, 'Payment terms: Net 30 days from invoice date (October 3).']],
        { targetWord: 'terms' },
      ),
      q(
        169,
        'infer',
        'If payment is received on November 5, what will most likely happen?',
        '11月5日に支払いがあった場合、どうなる可能性が高いですか。',
        [
          [
            'An interest charge will be added to the balance.',
            '10月3日から30日後は11月2日が期限であり、11月5日はその後になるため、月1.5%の利息が発生します。',
          ],
          [
            'The shipment will be sent back to Vancouver.',
            '未払いと返送を結びつける記述はありません。',
          ],
          [
            'A discount will be applied for early payment.',
            '早期支払い割引の規定は述べられていません。',
          ],
          [
            'The invoice will be canceled and reissued.',
            '再発行については何も述べられていません。',
          ],
        ],
        0,
        '請求日10月3日から30日後（11月2日）を過ぎての支払いになるため、月1.5%の利息条項が適用されます。',
        [
          ['t02-s8-invoice', 2, 'Payment terms: Net 30 days from invoice date (October 3).'],
          ['t02-s8-invoice', 2, 'A 1.5% monthly interest charge applies to overdue balances.'],
        ],
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
        'main_idea',
        'What is the purpose of the form?',
        'このフォームの目的は何ですか。',
        [
          [
            'To apply for a speaking slot at a conference',
            'テクノロジーフォーラムへの登壇を申請するためのプロポーザルフォームです。',
          ],
          [
            'To register as an attendee for a technology event',
            '参加者としての登録フォームではなく、登壇提案フォームです。',
          ],
          [
            'To request research funding from a university',
            '研究資金の申請ではなく、発表の機会を求める提案フォームです。',
          ],
          [
            'To apply for a position at a research institute',
            '採用応募ではなく、カンファレンスの登壇申請です。',
          ],
        ],
        0,
        'フォームのタイトルと内容（セッションタイトル・概要・発表形式）から登壇申請が目的と分かります。',
        [['t02-s9-form', 0, 'Proposed session title: Bias Mitigation in Large Language Models']],
      ),
      q(
        171,
        'detail',
        'What equipment has Dr. Tanaka requested?',
        '田中博士はどのような機器を要請しましたか。',
        [
          [
            'A projector and laser pointer',
            'プロジェクターとレーザーポインターは記載されていません。',
          ],
          [
            'A laptop connection and a wireless microphone',
            '第1段落の必要機器欄にノートPC接続とワイヤレスマイクロフォンが記載されています。',
          ],
          [
            'A video recording setup',
            '録画設備については記載されていません。',
          ],
          [
            'A standing desk and a translation headset',
            'スタンディングデスクや通訳ヘッドセットは記載されていません。',
          ],
        ],
        1,
        '第1段落の Required equipment 欄を直接読み取ります。',
        [['t02-s9-form', 0, 'Required equipment: Laptop connection, wireless microphone']],
      ),
      q(
        172,
        'infer',
        'What can be inferred about Dr. Tanaka?',
        '田中博士について推測できることは何ですか。',
        [
          [
            'She has previously spoken at the Nexbridge Forum.',
            '過去の登壇歴欄に「なし」と記載されており、初めての応募です。',
          ],
          [
            'She will travel from outside the country to attend.',
            '第3段落で東京からの国際移動として渡航支援を申請していることから、海外からの参加と分かります。',
          ],
          [
            'Her session is aimed at beginner-level attendees.',
            '対象者レベルは述べられておらず、概要から専門的内容であることが分かります。',
          ],
          [
            'She will be joined by a co-presenter.',
            '共同発表者欄に「なし」と記載されています。',
          ],
        ],
        1,
        '渡航支援申請欄の「日本・東京からの国際移動」から、海外から参加することが推測できます。',
        [['t02-s9-form', 2, 'Travel support requested: Yes — international travel from Tokyo, Japan']],
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
        'detail',
        'According to the memo, what must be completed by November 25?',
        'メモによると、11月25日までに完了しなければならないことは何ですか。',
        [
          [
            'Replacing exit signs in Warehouse B with illuminated ones',
            '第2段落に非常口標識を11月25日までに発光式に交換するよう明記されています。',
          ],
          [
            'Updating fire extinguisher records in the assembly hall',
            '消火器点検記録の更新期限は「5営業日以内」であり、11月25日ではありません。',
          ],
          [
            'Completing refresher training for forklift operators',
            '研修の完了は12月1日以降の車両操作前が期限です。',
          ],
          [
            'Submitting confirmation to the safety manager',
            '完了確認の提出は各是正項目の期限に従いますが、11月25日に特定されているのは標識交換です。',
          ],
        ],
        0,
        '第2段落の是正措置一覧から11月25日を期限とする項目を特定します。',
        [['t02-s10-memo', 1, 'emergency exit signage in Warehouse B must be replaced with illuminated signs by November 25.']],
      ),
      q(
        174,
        'not',
        'Which action is NOT listed as a corrective measure in the memo?',
        '是正措置として示されていないものはどれですか。',
        [
          [
            'Replacing emergency exit signs with illuminated versions',
            '第2段落の第一の是正措置として明記されています。',
          ],
          [
            'Updating fire extinguisher inspection records',
            '第2段落の第二の是正措置として明記されています。',
          ],
          [
            'Requiring forklift operators to complete refresher training',
            '第2段落の第三の是正措置として明記されています。',
          ],
          [
            'Installing new ventilation systems in the assembly hall',
            '換気設備の設置については一切述べられていません。',
          ],
        ],
        3,
        'NOT問題では本文に記載のない項目を選びます。換気設備の設置は是正措置の一覧に含まれていません。',
        [['t02-s10-memo', 1, 'The external safety audit conducted on November 10 identified three areas requiring immediate corrective action.']],
      ),
      q(
        175,
        'synonym',
        'The word "current" in paragraph 2 is closest in meaning to',
        '第2段落の "current" に最も近い意味はどれですか。',
        [
          [
            'up to date',
            '「最新の状態にする」という文脈で current は up to date が最も近い意味です。',
          ],
          [
            'electric',
            '電流という意味もありますが、ここでは時系列的な「最新」を指しています。',
          ],
          [
            'ongoing',
            '進行中という意味に近いですが、brought current は「最新の状態にする」という慣用表現です。',
          ],
          [
            'accurate',
            '正確という意味には近いですが、current は「時系列上の最新」を強調する語です。',
          ],
        ],
        0,
        'brought current は「最新の状態にする」という意味で、up to date が最も適切な言い換えです。',
        [['t02-s10-memo', 1, 'fire extinguisher inspection records in the assembly hall have not been updated since April and must be brought current within five business days.']],
        { targetWord: 'current' },
      ),
    ],
  },
];
