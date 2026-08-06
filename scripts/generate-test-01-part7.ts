/**
 * test-01 Part 7（No.147〜200）生成スクリプト。
 * 収録文・設問・選択肢はすべて本プロジェクト用のオリジナル。
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { Part7DataSchema } from '../src/schemas/question.schema';

const LABELS = ['A', 'B', 'C', 'D'] as const;
type QuestionType = 'main_idea' | 'detail' | 'not' | 'infer' | 'intention' | 'synonym' | 'insertion';
type Option = readonly [text: string, explanation: string];
type EvidenceSeed = readonly [passageId: string, paragraphIndex: number, snippetEn: string];

function q(
  no: number,
  type: QuestionType,
  questionEn: string,
  questionJa: string,
  options: readonly [Option, Option, Option, Option],
  correctIndex: 0 | 1 | 2 | 3,
  explanationOverall: string,
  evidence: readonly EvidenceSeed[] = [],
  extra: Record<string, unknown> = {},
) {
  // 正解位置が特定ラベルへ偏らないよう、問番号から安定した配置先を決める。
  const targetCorrectIndex = (((no * 13 + 5) ^ (no >> 3)) & 3) as 0 | 1 | 2 | 3;
  const shift = (targetCorrectIndex - correctIndex + 4) % 4;
  const arrangedOptions = options.map(
    (_, index) => options[(index - shift + 4) % 4],
  );

  return {
    no,
    type,
    questionEn,
    questionJa,
    ...extra,
    choices: arrangedOptions.map(([text, explanation], index) => ({
      label: LABELS[index],
      text,
      explanation: `${explanation}${index === targetCorrectIndex ? ' 正解です。' : ' 正解ではありません。'}`,
      isCorrect: index === targetCorrectIndex,
    })),
    ...(evidence.length > 0
      ? {
          evidence: evidence.map(([passageId, paragraphIndex, snippetEn]) => ({
            passageId,
            paragraphIndex,
            snippetEn,
          })),
        }
      : {}),
    explanationOverall,
  };
}

function passage(
  passageId: string,
  docType: string,
  title: string,
  paragraphs: readonly (readonly [en: string, ja: string])[],
  extra: Record<string, unknown> = {},
) {
  return {
    passageId,
    docType,
    title,
    ...extra,
    paragraphs: paragraphs.map(([en, ja]) => ({ en, ja })),
  };
}

function messages(
  passageId: string,
  docType: 'text_message_chain' | 'online_chat',
  title: string,
  items: readonly (readonly [sender: string, timeLabel: string, bodyEn: string, bodyJa: string])[],
) {
  return {
    passageId,
    docType,
    title,
    messages: items.map(([sender, timeLabel, bodyEn, bodyJa]) => ({ sender, timeLabel, bodyEn, bodyJa })),
  };
}

const s1 = passage(
  't01-s1-email',
  'email',
  'Atrium Lighting Inspection',
  [
    ['Hello Ms. Ortega, Our electrician has finished replacing the atrium lights at the Bellmere Hotel. Before we close the work order, could you inspect the new fixtures on Thursday morning?', 'オルテガ様、電気技師がベルメールホテルのアトリウム照明の交換を終えました。作業票を閉じる前に、木曜午前に新しい器具をご確認いただけますか。'],
    ['I will be on site from 9:00 to 11:00 and can adjust any fixture that is not aimed correctly. Please meet me beside the front desk at 9:30. Bring the inspection checklist that I sent on Monday.', '私は9時から11時まで現場におり、向きが正しくない器具を調整できます。9時30分にフロントデスク横でお会いください。月曜に送った点検表をお持ちください。'],
  ],
  { from: 'Evan Holt <e.holt@lumenworks.example>', to: 'Marina Ortega <facilities@bellmere.example>' },
);

const s2 = passage(
  't01-s2-notice',
  'notice',
  'Temporary Bicycle Parking',
  [
    ['From September 3 through September 14, the bicycle racks beside the east entrance will be unavailable while the pavement is repaired. Employees should use the covered racks behind Building C.', '9月3日から14日まで、舗装工事のため東口横の自転車ラックは使用できません。従業員はC棟裏の屋根付きラックを利用してください。'],
    ['Access cards will open the rear gate between 6:00 A.M. and 10:00 P.M. Bicycles left near the east entrance after September 2 will be moved to the security office.', '入館カードで午前6時から午後10時まで裏門を開けられます。9月2日以降に東口付近へ置かれた自転車は警備室へ移動されます。'],
  ],
);

const s3 = passage(
  't01-s3-article',
  'article',
  'Riverside Bakery Expands Its Training Program',
  [
    ['Riverside Bakery has opened a small training kitchen above its Oak Street shop. The space will allow newly hired bakers to practice recipes without interrupting daily production.', 'リバーサイド・ベーカリーはオーク通り店の上階に小規模な研修厨房を開設しました。新任のパン職人は日々の製造を妨げずにレシピを練習できます。'],
    ['Owner Lena Brooks said the kitchen will also host monthly classes for local residents beginning in November. Class fees will support a scholarship for culinary students at North County College.', 'オーナーのレナ・ブルックス氏によると、11月から地域住民向けの月例講座も開催します。受講料はノース郡大学の調理学生向け奨学金に充てられます。'],
  ],
);

const s4 = passage(
  't01-s4-ad',
  'advertisement',
  'Harborview Meeting Rooms',
  [
    ['Need a quiet space near Central Station? Harborview offers three meeting rooms for groups of 4 to 24. Every booking includes wireless Internet, a display screen, and unlimited tea.', '中央駅近くの静かな場所をお探しですか。ハーバービューには4名から24名用の会議室が3室あります。全予約に無線インターネット、表示画面、紅茶が含まれます。'],
    ['Book at least seven days in advance to receive a 15 percent discount. Catering is available from Pine Table Café for an additional charge. Weekend reservations must be made by telephone.', '7日前までの予約で15パーセント割引になります。パイン・テーブル・カフェのケータリングは追加料金で利用できます。週末の予約は電話で行う必要があります。'],
  ],
);

const s5 = passage(
  't01-s5-web',
  'web_page',
  'Marlow Library: Device Lending',
  [
    ['Library members may borrow a tablet or mobile hotspot for up to seven days. Devices can be reserved online, but they must be collected from the Technology Desk before 6:00 P.M.', '図書館会員はタブレットまたはモバイルホットスポットを最長7日間借りられます。オンライン予約できますが、午後6時までに技術カウンターで受け取る必要があります。'],
    ['A replacement fee will be charged for lost chargers. Renewals are permitted only when no other member has reserved the device. Staff provide a brief orientation at pickup.', '充電器を紛失した場合は交換料が請求されます。更新は他の会員がその機器を予約していない場合に限られます。受取時に職員が短い説明を行います。'],
  ],
);

const s6 = messages(
  't01-s6-texts',
  'text_message_chain',
  'Delivery Team Messages',
  [
    ['Noah', '8:12 A.M.', 'The display cases arrived, but the loading dock door is locked.', '展示ケースは到着しましたが、搬入口の扉が施錠されています。'],
    ['Priya', '8:14 A.M.', 'I am calling building security now. Please keep the truck in lane two so the bakery delivery can use lane one.', '今、ビル警備へ電話しています。パン店の配送が1番レーンを使えるよう、トラックは2番レーンに置いてください。'],
    ['Noah', '8:18 A.M.', 'Understood. The driver can wait for about twenty minutes before his next appointment.', '了解です。運転手は次の予定まで約20分待てます。'],
    ['Priya', '8:23 A.M.', 'Security is sending someone downstairs. We should be ready shortly.', '警備員が階下へ向かっています。まもなく準備できます。'],
  ],
);

const s7 = passage(
  't01-s7-form',
  'form',
  'Community Workshop Registration',
  [
    ['Workshop: Balcony Gardening | Date: April 18 | Time: 2:00–4:00 P.M. | Location: Westfield Community Center, Room 204 | Fee: $18', '講座：ベランダ園芸｜日付：4月18日｜時間：午後2時～4時｜場所：ウェストフィールド・コミュニティセンター204号室｜料金：18ドル'],
    ['Registrant: Owen Price | Experience level: Beginner | Requested materials: Starter seed kit | Payment method: Credit card | Accessibility request: Chair near entrance', '申込者：オーウェン・プライス｜経験：初心者｜希望教材：初心者向け種セット｜支払方法：クレジットカード｜配慮事項：入口近くの椅子'],
  ],
);

const s8 = passage(
  't01-s8-invoice',
  'invoice',
  'Northline Office Supply Invoice 8842',
  [
    ['Invoice date: January 8 | Customer: Halden Design Studio | 6 drawing pads at $12 each | 2 desk lamps at $35 each | Delivery: $8', '請求日：1月8日｜顧客：ホールデン・デザイン・スタジオ｜画用紙6冊（各12ドル）｜デスクライト2台（各35ドル）｜配送料：8ドル'],
    ['Total due: $150 | Payment due: January 29 | Terms: A $10 late fee applies after the due date. Contact orders@northline.example to report damaged items within five business days.', '支払総額：150ドル｜支払期限：1月29日｜条件：期限後は10ドルの延滞料が発生します。破損品は5営業日以内にorders@northline.exampleへ連絡してください。'],
  ],
);

const s9 = passage(
  't01-s9-schedule',
  'schedule',
  'Product Photography — Tuesday',
  [
    ['9:00–9:30 Equipment setup (Studio B) | 9:30–11:00 Kitchenware collection | 11:00–11:30 Break | 11:30–1:00 Outdoor collection', '9:00～9:30 機材準備（スタジオB）｜9:30～11:00 台所用品コレクション｜11:00～11:30 休憩｜11:30～1:00 屋外用品コレクション'],
    ['1:00–2:00 Lunch | 2:00–3:30 Furniture collection | 3:30–4:00 File backup and Studio B cleanup. Models are required only for the outdoor and furniture sessions.', '1:00～2:00 昼食｜2:00～3:30 家具コレクション｜3:30～4:00 ファイルのバックアップとスタジオBの清掃。モデルが必要なのは屋外用品と家具の撮影のみです。'],
  ],
);

const s10 = passage(
  't01-s10-markers',
  'notice',
  'New Reusable Container Program',
  [
    ['Beginning October 1, the cafeteria will offer reusable containers for takeout meals. [1] Customers pay a five-dollar deposit when requesting a container. [2] The deposit is returned when the rinsed container is brought back to any cafeteria register. [3] Containers may be kept for up to fourteen days. [4]', '10月1日から、食堂では持ち帰り用の再利用容器を提供します。[1] 容器を希望する際に5ドルの保証金を支払います。[2] すすいだ容器を食堂のレジへ返すと保証金が返金されます。[3] 容器は最長14日間保有できます。[4]'],
    ['This program will reduce the number of disposable boxes sent to the landfill. Questions may be directed to cafeteria manager June Park.', 'この制度は埋立地へ送られる使い捨て容器を減らします。質問は食堂責任者のジューン・パークへお寄せください。'],
  ],
  { hasInsertionMarkers: true },
);

const singleSets = [
  {
    setType: 'single',
    passages: [s1],
    questions: [
      q(147, 'main_idea', 'Why did Mr. Holt write the email?', 'ホルト氏がメールを書いたのはなぜですか。', [
        ['To arrange a final inspection', '作業票を閉じる前の器具点検を依頼しています。'],
        ['To order replacement light bulbs', '電球の注文ではなく、交換作業は完了しています。'],
        ['To change the hotel front desk hours', 'フロントデスクの営業時間変更は述べられていません。'],
        ['To apply for an electrician position', '採用応募ではなく、既存工事の確認連絡です。'],
      ], 0, '目的は新しい照明器具の最終点検日時を調整することです。', [['t01-s1-email', 0, 'Before we close the work order, could you inspect the new fixtures on Thursday morning?']]),
      q(148, 'detail', 'What should Ms. Ortega bring to the meeting?', 'オルテガ氏は会合へ何を持参すべきですか。', [
        ['A hotel access card', '入館カードの持参指示はありません。'],
        ['An inspection checklist', '月曜に送った点検表を持参するよう明記されています。'],
        ['A box of spare fixtures', '予備器具を持参するのは電気技師側の仕事で、指示されていません。'],
        ['The original work order', '作業票ではなく点検表が指定されています。'],
      ], 1, '第2段落末尾の持参物を確認します。', [['t01-s1-email', 1, 'Bring the inspection checklist that I sent on Monday.']]),
    ],
  },
  {
    setType: 'single', passages: [s2], questions: [
      q(149, 'detail', 'Where should employees park their bicycles during the repairs?', '工事中、従業員は自転車をどこへ置くべきですか。', [
        ['Beside the east entrance', '東口横のラックは工事中使用できません。'], ['Behind Building C', 'C棟裏の屋根付きラックが代替場所です。'], ['Inside the security office', '警備室は移動された自転車の保管先で、通常の駐輪場所ではありません。'], ['Near the front gate', '正門付近は代替場所として案内されていません。'],
      ], 1, '一時的な代替駐輪場所を問う詳細問題です。', [['t01-s2-notice', 0, 'Employees should use the covered racks behind Building C.']]),
      q(150, 'infer', 'Why is the rear-gate access time mentioned?', '裏門の利用時間が記載されているのはなぜだと考えられますか。', [
        ['Employees need the gate to reach the temporary racks.', '代替ラックがC棟裏にあるため、裏門の利用条件が必要です。'], ['The security office closes at 10:00 P.M.', '警備室の閉室時間とは述べられていません。'], ['Repair workers will enter through the rear gate.', '工事業者の入場経路は説明されていません。'], ['Access cards are being replaced.', 'カード交換の案内はありません。'],
      ], 0, '代替駐輪場所と裏門の案内を関連付けて推測します。', [['t01-s2-notice', 0, 'Employees should use the covered racks behind Building C.'], ['t01-s2-notice', 1, 'Access cards will open the rear gate between 6:00 A.M. and 10:00 P.M.']]),
      q(151, 'synonym', 'The word "unavailable" in paragraph 1 is closest in meaning to', '第1段落の「unavailable」に最も近い意味はどれですか。', [
        ['not usable', '工事中ラックを使えないという文脈に合います。'], ['uncovered', '屋根がないという意味ではありません。'], ['unpopular', '人気の有無は扱っていません。'], ['unlocked', '施錠状態を示す語ではありません。'],
      ], 0, 'unavailable はここでは「利用できない」を意味します。', [['t01-s2-notice', 0, 'the bicycle racks beside the east entrance will be unavailable']], { targetWord: 'unavailable' }),
    ],
  },
  {
    setType: 'single', passages: [s3], questions: [
      q(152, 'main_idea', 'What is the article mainly about?', 'この記事は主に何についてですか。', [
        ['A bakery opening a training facility', '新しい研修厨房の開設が記事の中心です。'], ['A college closing its culinary program', '大学の調理課程閉鎖は述べられていません。'], ['A shop moving away from Oak Street', '店舗移転ではなく上階活用の話です。'], ['A contest for experienced bakers', 'コンテストの案内ではありません。'],
      ], 0, '第1文の研修厨房開設が主題です。', [['t01-s3-article', 0, 'Riverside Bakery has opened a small training kitchen above its Oak Street shop.']]),
      q(153, 'detail', 'When will classes for residents begin?', '地域住民向け講座はいつ始まりますか。', [
        ['In September', '9月という記載はありません。'], ['In October', '10月開始ではありません。'], ['In November', '第2段落に11月開始とあります。'], ['In December', '12月開始ではありません。'],
      ], 2, '開始月を本文から直接特定します。', [['t01-s3-article', 1, 'beginning in November']]),
      q(154, 'infer', 'What will most likely benefit from the class fees?', '講座の受講料から最も恩恵を受けるのは何ですか。', [
        ['The bakery production line', '受講料を製造設備に使うとは書かれていません。'], ['Culinary students', '受講料は調理学生の奨学金を支援します。'], ['Oak Street property owners', '不動産所有者への支援ではありません。'], ['Classroom equipment suppliers', '備品業者への支払いという記述はありません。'],
      ], 1, '受講料の用途である奨学金の受益者を推測します。', [['t01-s3-article', 1, 'Class fees will support a scholarship for culinary students at North County College.']]),
    ],
  },
  {
    setType: 'single', passages: [s4], questions: [
      q(155, 'detail', 'What is included with every room booking?', 'すべての会議室予約に含まれるものは何ですか。', [
        ['A catered lunch', 'ケータリングは追加料金です。'], ['Unlimited coffee', '含まれる飲み物は紅茶で、コーヒーではありません。'], ['A display screen', '全予約に表示画面が含まれます。'], ['Parking at Central Station', '駅の駐車場は案内されていません。'],
      ], 2, '基本料金に含まれる設備を確認します。', [['t01-s4-ad', 0, 'Every booking includes wireless Internet, a display screen, and unlimited tea.']]),
      q(156, 'not', 'What is NOT indicated about Harborview?', 'ハーバービューについて示されていないものはどれですか。', [
        ['It has rooms for different group sizes.', '4名から24名用という記載があります。'], ['It offers an advance-booking discount.', '7日前予約の割引があります。'], ['It provides free catering.', 'ケータリングは追加料金であり、無料とは示されていません。'], ['It accepts weekend bookings by phone.', '週末予約は電話で行うとあります。'],
      ], 2, 'NOT問題では、本文にある3項目を消去します。', [['t01-s4-ad', 1, 'Catering is available from Pine Table Café for an additional charge.']]),
      q(157, 'infer', 'What should someone do to reserve a room for Saturday?', '土曜日の部屋を予約するにはどうすべきですか。', [
        ['Call Harborview', '週末予約は電話で行う必要があります。'], ['Visit Pine Table Café', 'カフェはケータリング提供者で予約窓口ではありません。'], ['Wait until seven days before the event', '7日前までなら割引ですが、待つ必要はありません。'], ['Send a request to Central Station', '駅は所在地の目印で予約先ではありません。'],
      ], 0, 'Saturday は weekend に該当するため電話予約です。', [['t01-s4-ad', 1, 'Weekend reservations must be made by telephone.']]),
    ],
  },
  {
    setType: 'single', passages: [s5], questions: [
      q(158, 'main_idea', 'What is the purpose of the web page?', 'このウェブページの目的は何ですか。', [
        ['To explain how members can borrow devices', '貸出対象・期間・受取・更新条件を案内しています。'], ['To sell used library computers', '機器販売のページではありません。'], ['To recruit staff for the Technology Desk', '職員募集は行っていません。'], ['To compare mobile service providers', '通信会社の比較はありません。'],
      ], 0, '図書館の機器貸出サービスの利用方法が中心です。', [['t01-s5-web', 0, 'Library members may borrow a tablet or mobile hotspot for up to seven days.']]),
      q(159, 'detail', 'Under what condition may a device be renewed?', 'どのような条件で機器を更新できますか。', [
        ['The borrower pays a replacement fee.', '交換料は紛失充電器に関するものです。'], ['The device is returned before 6:00 P.M.', '午後6時は受取期限で、更新条件ではありません。'], ['No other member has reserved it.', '他の会員の予約がない場合のみ更新できます。'], ['A staff orientation is completed twice.', '説明を2回受ける条件はありません。'],
      ], 2, 'renewals の直後に示された条件を選びます。', [['t01-s5-web', 1, 'Renewals are permitted only when no other member has reserved the device.']]),
      q(160, 'synonym', 'The word "brief" in paragraph 2 is closest in meaning to', '第2段落の「brief」に最も近い意味はどれですか。', [
        ['short', '受取時の短い説明という意味です。'], ['written', '書面によるという意味ではありません。'], ['mandatory', '義務的という意味そのものではありません。'], ['technical', '技術的に難しいという意味ではありません。'],
      ], 0, 'brief は時間や長さが「短い」を表します。', [['t01-s5-web', 1, 'Staff provide a brief orientation at pickup.']], { targetWord: 'brief' }),
    ],
  },
  {
    setType: 'single', passages: [s6], questions: [
      q(161, 'intention', 'At 8:23 A.M., what does Priya most likely mean by "We should be ready shortly"?', '午前8時23分の「まもなく準備できます」でプリヤが最も伝えたいことは何ですか。', [
        ['The display cases can soon be unloaded.', '警備員が解錠に向かっているため、間もなく荷下ろしできます。'], ['The bakery delivery has been canceled.', 'パン店配送の中止は述べられていません。'], ['The truck must leave lane two immediately.', '2番レーンで待つ指示と矛盾します。'], ['The next appointment will be delayed.', '次の予定の遅延を断定していません。'],
      ], 0, '直前の警備員派遣を受け、搬入口がまもなく使えるという意図です。', [['t01-s6-texts', 3, 'Security is sending someone downstairs. We should be ready shortly.']], { intentionTarget: { sender: 'Priya', utteranceEn: 'We should be ready shortly.' } }),
      q(162, 'detail', 'Why should the truck remain in lane two?', 'トラックが2番レーンに留まるべきなのはなぜですか。', [
        ['Lane one needs repairs.', 'レーン工事は述べられていません。'], ['A bakery delivery needs lane one.', 'パン店配送が1番レーンを使うためです。'], ['Security vehicles use lane one.', '警備車両の利用ではありません。'], ['The display cases are stored in lane two.', '展示ケースはトラックで到着したのであり、レーン保管ではありません。'],
      ], 1, 'Priya の8時14分の指示理由を確認します。', [['t01-s6-texts', 1, 'Please keep the truck in lane two so the bakery delivery can use lane one.']]),
      q(163, 'infer', 'What will probably happen next?', '次に何が起こる可能性が高いですか。', [
        ['The loading dock will be opened.', '警備員が階下へ向かっているため解錠が見込まれます。'], ['Noah will return the display cases.', '返品する理由はありません。'], ['Priya will drive to the bakery.', 'プリヤがパン店へ行くとは示されていません。'], ['The driver will attend his next appointment early.', '待機が必要なので早着を示す根拠はありません。'],
      ], 0, '警備員派遣という最後の状況から次の出来事を推測します。', [['t01-s6-texts', 3, 'Security is sending someone downstairs.']]),
    ],
  },
  {
    setType: 'single', passages: [s7], questions: [
      q(164, 'detail', 'What did Mr. Price request?', 'プライス氏は何を希望しましたか。', [
        ['An advanced gardening class', '経験欄は初心者です。'], ['A starter seed kit', '希望教材欄に初心者向け種セットとあります。'], ['A refund by credit card', 'カードは支払方法で、返金依頼ではありません。'], ['A seat beside the instructor', '希望は入口近くの椅子です。'],
      ], 1, 'フォームの Requested materials 欄を読み取ります。', [['t01-s7-form', 1, 'Requested materials: Starter seed kit']]),
      q(165, 'infer', 'Why will Mr. Price probably sit near the entrance?', 'プライス氏が入口近くに座る可能性が高いのはなぜですか。', [
        ['He made an accessibility request.', '配慮事項として入口近くの椅子を希望しています。'], ['He will collect class fees.', '料金徴収を担当する記載はありません。'], ['He is teaching the workshop.', '申込者であり講師ではありません。'], ['He registered after the deadline.', '締切や遅延登録の情報はありません。'],
      ], 0, 'フォームのアクセシビリティ希望から判断します。', [['t01-s7-form', 1, 'Accessibility request: Chair near entrance']]),
      q(166, 'not', 'Which statement is NOT true about the registration?', 'この申込みについて正しくないものはどれですか。', [
        ['The workshop is held in Room 204.', '会場欄に204号室と記載されています。'], ['Mr. Price requested a beginner seed kit.', '希望教材欄に初心者向け種セットとあります。'], ['Mr. Price will pay the fee in cash.', '支払方法はクレジットカードなので、現金払いではありません。'], ['The workshop fee is $18.', '料金欄に18ドルとあります。'],
      ], 2, '支払方法の記載と矛盾する選択肢を選びます。', [['t01-s7-form', 1, 'Payment method: Credit card']]),
    ],
  },
  {
    setType: 'single', passages: [s8], questions: [
      q(167, 'detail', 'How much was charged for delivery?', '配送料はいくらですか。', [
        ['$8', '明細に Delivery: $8 とあります。'], ['$10', '10ドルは期限後の延滞料です。'], ['$12', '12ドルは画用紙1冊の価格です。'], ['$35', '35ドルはライト1台の価格です。'],
      ], 0, '同じ文書内の複数の金額を区別します。', [['t01-s8-invoice', 0, 'Delivery: $8']]),
      q(168, 'synonym', 'The word "due" in paragraph 2 is closest in meaning to', '第2段落の「due」に最も近い意味はどれですか。', [
        ['owed', '支払うべき総額という文脈で owed が一致します。'], ['reduced', '減額されたという意味ではありません。'], ['delivered', '配送済みという意味ではありません。'], ['estimated', '見積額ではなく確定した支払額です。'],
      ], 0, 'Total due の due は「支払われるべき」を意味します。', [['t01-s8-invoice', 1, 'Total due: $150']], { targetWord: 'due' }),
      q(169, 'infer', 'What happens if payment is made on February 1?', '2月1日に支払うとどうなりますか。', [
        ['A late fee will apply.', '1月29日の期限後なので10ドルの延滞料がかかります。'], ['Delivery will become free.', '配送料免除の規定はありません。'], ['The desk lamps must be returned.', '支払遅延と返品は関連しません。'], ['A damaged-item report will be accepted automatically.', '破損連絡は5営業日以内という別条件です。'],
      ], 0, '支払日と期限を比較し、期限後の条件を適用します。', [['t01-s8-invoice', 1, 'Payment due: January 29'], ['t01-s8-invoice', 1, 'A $10 late fee applies after the due date.']]),
    ],
  },
  {
    setType: 'single', passages: [s9], questions: [
      q(170, 'detail', 'What is scheduled immediately after the break?', '休憩の直後に予定されているものは何ですか。', [
        ['Equipment setup', '機材準備は一日の最初です。'], ['The outdoor collection', '11時30分から屋外用品の撮影です。'], ['Lunch', '昼食は屋外用品撮影の後です。'], ['File backup', 'バックアップは最後です。'],
      ], 1, '11時終了の休憩に続く予定を時系列で確認します。', [['t01-s9-schedule', 0, '11:30–1:00 Outdoor collection']]),
      q(171, 'not', 'During which activity are models NOT required?', 'どの活動ではモデルが必要ありませんか。', [
        ['The outdoor collection', '屋外用品撮影にはモデルが必要です。'], ['The furniture collection', '家具撮影にもモデルが必要です。'], ['The kitchenware collection', 'モデルが必要なのは屋外用品と家具だけなので、台所用品では不要です。'], ['Both the outdoor and furniture collections', 'この両方にはモデルが必要です。'],
      ], 2, 'モデルが必要な2セッションを本文から除外します。', [['t01-s9-schedule', 1, 'Models are required only for the outdoor and furniture sessions.']]),
      q(172, 'infer', 'Where will the photographer most likely be at 3:45 P.M.?', '午後3時45分に撮影者はどこにいる可能性が高いですか。', [
        ['At lunch', '昼食は1時から2時です。'], ['At the outdoor location', '屋外用品は1時までです。'], ['In Studio B', '3時30分からスタジオのバックアップと清掃を行います。'], ['At a furniture store', '家具撮影は3時30分に終了しています。'],
      ], 2, '3時45分はバックアップとスタジオB清掃の時間帯です。', [['t01-s9-schedule', 1, '3:30–4:00 File backup and Studio B cleanup.']]),
    ],
  },
  {
    setType: 'single', passages: [s10], questions: [
      q(173, 'insertion', 'Where does the following sentence best belong? "This small payment encourages people to return what they borrow."', '次の文を入れるのに最も適切な位置はどこですか。「この少額の支払いは、借りた物を返すよう利用者に促します。」', [
        ['[1]', 'この位置では this small payment が指す保証金がまだ登場していません。'], ['[2]', '直前の five-dollar deposit を this small payment で受け、その目的を説明できます。'], ['[3]', '返金手順の後では支払いの導入説明から離れます。'], ['[4]', '保有期限の後では照応先から遠く、段落の流れが弱まります。'],
      ], 1, 'this small payment が直前の five-dollar deposit を明確に受けるため[2]が最適です。'),
      q(174, 'main_idea', 'What is the main purpose of the notice?', 'このお知らせの主な目的は何ですか。', [
        ['To announce a reusable-container system', '新しい再利用容器制度と利用方法を案内しています。'], ['To advertise a new cafeteria menu', '料理メニューの広告ではありません。'], ['To change cafeteria opening hours', '営業時間変更はありません。'], ['To recruit a cafeteria manager', '責任者名は問い合わせ先で、募集ではありません。'],
      ], 0, '制度の開始、保証金、返却方法を知らせる文書です。', [['t01-s10-markers', 0, 'Beginning October 1, the cafeteria will offer reusable containers for takeout meals.']]),
      q(175, 'detail', 'When is the deposit returned?', '保証金はいつ返金されますか。', [
        ['When a meal is purchased', '購入時は保証金を支払います。'], ['When the rinsed container is returned', 'すすいだ容器をレジへ返すと返金されます。'], ['Fourteen days after borrowing', '14日は保有上限で自動返金日ではありません。'], ['After contacting June Park', '責任者への連絡は返金条件ではありません。'],
      ], 1, '保証金返金の具体的条件を選びます。', [['t01-s10-markers', 0, 'The deposit is returned when the rinsed container is brought back to any cafeteria register.']]),
    ],
  },
];

const d1a = passage(
  't01-d1-email',
  'email',
  'Friday Client Orientation',
  [
    ['Hi Rafael, The new client orientation has been confirmed for Friday afternoon. I reserved the Cedar Room from 1:00 to 3:00 P.M. for the twelve visitors from Alton Foods.', 'ラファエルさん、新規顧客向け説明会が金曜午後に確定しました。アルトン・フーズからの訪問者12名のため、午後1時から3時までシーダー室を予約しました。'],
    ['Please print the name badges by Thursday and place them at reception. The IT team will test the video connection at 12:30 on Friday, so the presenter should upload her slides to the shared folder before noon.', '木曜までに名札を印刷し、受付へ置いてください。ITチームが金曜12時30分に映像接続を試すため、発表者は正午までにスライドを共有フォルダーへアップロードしてください。'],
  ],
  { from: 'Mia Chen <mia@northcrest.example>', to: 'Rafael Silva <rafael@northcrest.example>' },
);
const d1b = passage(
  't01-d1-schedule',
  'schedule',
  'Conference Rooms — Friday',
  [
    ['Maple Room | 9:00–11:00 | Sales planning | 8 people\nCedar Room | 10:00–11:30 | Safety briefing | 20 people\nCedar Room | 1:00–3:00 | New client orientation | 16 people', 'メープル室｜9:00～11:00｜販売計画｜8名\nシーダー室｜10:00～11:30｜安全説明｜20名\nシーダー室｜1:00～3:00｜新規顧客説明会｜16名'],
    ['Willow Room | 1:30–4:30 | Supplier interviews | 6 people\nNote: Video equipment is installed only in the Cedar and Willow rooms.', 'ウィロー室｜1:30～4:30｜仕入先面談｜6名\n注：映像機器はシーダー室とウィロー室にのみ設置されています。'],
  ],
);

const d2a = passage(
  't01-d2-invoice',
  'invoice',
  'Brightmark Signs — Invoice BM-3107',
  [
    ['Customer: Oriole Events | 4 directional signs at $28 each | 1 lobby banner at $95 | Installation: $40 | Subtotal: $247', '顧客：オリオール・イベント｜案内標識4枚（各28ドル）｜ロビーバナー1枚（95ドル）｜設置料40ドル｜小計247ドル'],
    ['Adjustment: Banner size credit -$20 | Total due: $227 | Delivery date: May 6 | Payment terms: Due within 15 days of delivery', '調整：バナー寸法差額 -20ドル｜支払総額227ドル｜納品日5月6日｜支払条件：納品後15日以内'],
  ],
);
const d2b = messages(
  't01-d2-chat',
  'online_chat',
  'Oriole Events Purchasing Chat',
  [
    ['Keiko', '10:05 A.M.', 'The banner arrived at 180 centimeters wide, but our order specified 200 centimeters.', 'バナーは幅180センチで届きましたが、注文では200センチを指定していました。'],
    ['Martin', '10:07 A.M.', 'Brightmark offered either a replacement next week or a twenty-dollar credit. The event is tomorrow, so I accepted the credit.', 'ブライトマークは来週の交換か20ドルの値引きを提案しました。イベントは明日なので、値引きを受け入れました。'],
    ['Keiko', '10:09 A.M.', 'That makes sense. Please ask the setup crew to center the smaller banner above the registration desk.', 'それが妥当ですね。設営班に小さいバナーを受付机の上の中央へ配置するよう頼んでください。'],
    ['Martin', '10:11 A.M.', 'Already done. I will update the expense sheet after lunch.', 'すでに済ませました。昼食後に経費表を更新します。'],
  ],
);

const doubleSets = [
  {
    setType: 'double', passages: [d1a, d1b], questions: [
      q(176, 'main_idea', 'Why did Ms. Chen write to Mr. Silva?', 'チェン氏がシルバ氏へメールした主な理由は何ですか。', [
        ['To assign preparations for a client visit', '名札印刷や受付への配置を依頼しています。'], ['To cancel a safety briefing', '安全説明の中止連絡ではありません。'], ['To request a larger conference room', '部屋はすでに予約済みで変更依頼はありません。'], ['To interview a new supplier', '仕入先面談は別室の予定です。'],
      ], 0, '顧客説明会の確定と準備作業の依頼が目的です。', [['t01-d1-email', 1, 'Please print the name badges by Thursday and place them at reception.']]),
      q(177, 'detail', 'According to the schedule, for how many people is the Cedar Room listed for the orientation?', '予定表では、説明会のシーダー室は何名用として記載されていますか。', [
        ['6', '6名はウィロー室の仕入先面談です。'], ['8', '8名はメープル室の販売計画です。'], ['12', '12名は実際の訪問者数で、部屋の収容設定ではありません。'], ['16', '説明会のシーダー室には16名と記載されています。'],
      ], 3, 'メールの説明会名と予定表の同じ行を照合します。', [['t01-d1-schedule', 0, 'Cedar Room | 1:00–3:00 | New client orientation | 16 people']]),
      q(178, 'infer', 'Why was the Cedar Room probably selected?', 'シーダー室が選ばれた理由として最も考えられるものは何ですか。', [
        ['It is beside reception.', '受付との位置関係は示されていません。'], ['It has video equipment and enough capacity.', '映像設備があり、12名の訪問者を収容できる16名用です。'], ['It is available all day.', '午前には安全説明で使われます。'], ['It is the only room for supplier interviews.', '仕入先面談はウィロー室です。'],
      ], 1, 'メールの人数・映像テストと予定表の設備・定員を組み合わせます。', [['t01-d1-email', 0, 'the twelve visitors from Alton Foods'], ['t01-d1-schedule', 1, 'Video equipment is installed only in the Cedar and Willow rooms.']]),
      q(179, 'not', 'What is Mr. Silva NOT asked to do?', 'シルバ氏が依頼されていないことはどれですか。', [
        ['Print name badges', 'メールで木曜までの印刷を依頼されています。'], ['Put badges at reception', '名札を受付へ置くよう依頼されています。'], ['Test the video connection', '映像接続の試験はITチームが行います。'], ['Complete the tasks by Thursday', '名札関連作業は木曜までです。'],
      ], 2, '担当者を区別すると、映像テストだけはITチームの作業です。', [['t01-d1-email', 1, 'The IT team will test the video connection at 12:30 on Friday']]),
      q(180, 'detail', 'By what time should the presenter upload her slides?', '発表者は何時までにスライドをアップロードすべきですか。', [
        ['Thursday morning', '木曜は名札の期限です。'], ['Friday at noon', '金曜正午までと明記されています。'], ['Friday at 12:30 P.M.', '12時30分はITテスト開始時刻です。'], ['Friday at 3:00 P.M.', '3時は説明会終了時刻です。'],
      ], 1, '映像テスト前のアップロード期限を直接読み取ります。', [['t01-d1-email', 1, 'the presenter should upload her slides to the shared folder before noon.']]),
    ],
  },
  {
    setType: 'double', passages: [d2a, d2b], questions: [
      q(181, 'detail', 'What caused the invoice adjustment?', '請求書の調整が行われた原因は何ですか。', [
        ['A sign was delivered late.', '納品遅延は述べられていません。'], ['The banner was the wrong width.', '注文より20センチ狭いバナーだったため値引きされました。'], ['Installation was canceled.', '設置料は明細に残っています。'], ['One directional sign was missing.', '案内標識の不足は報告されていません。'],
      ], 1, 'チャットの寸法違いが請求書の20ドル調整に対応します。', [['t01-d2-chat', 0, 'The banner arrived at 180 centimeters wide, but our order specified 200 centimeters.'], ['t01-d2-invoice', 1, 'Adjustment: Banner size credit -$20']]),
      q(182, 'intention', 'What does Keiko mean when she says, "That makes sense"?', 'ケイコの「それが妥当ですね」は何を意味しますか。', [
        ['She agrees with accepting the credit.', '翌日のイベントに間に合わないため値引きを選んだ判断に同意しています。'], ['She wants to postpone the event.', '延期を提案していません。'], ['She believes the original width was correct.', '寸法違いを認めた上での発言です。'], ['She will contact Brightmark herself.', '連絡を引き継ぐとは言っていません。'],
      ], 0, '直前の交換ではなく値引きを選んだ判断への同意です。', [['t01-d2-chat', 1, 'Brightmark offered either a replacement next week or a twenty-dollar credit. The event is tomorrow, so I accepted the credit.'], ['t01-d2-chat', 2, 'That makes sense.']], { intentionTarget: { sender: 'Keiko', utteranceEn: 'That makes sense.' } }),
      q(183, 'infer', 'When is payment most likely due?', '支払期限はいつになる可能性が高いですか。', [
        ['May 6', '5月6日は納品日です。'], ['May 15', '納品から9日後で、15日以内の最終日ではありません。'], ['May 21', '5月6日の15日後なので支払期限と考えられます。'], ['June 6', '納品から1か月後ではありません。'],
      ], 2, '納品日5月6日と「15日以内」という条件を計算します。', [['t01-d2-invoice', 1, 'Delivery date: May 6 | Payment terms: Due within 15 days of delivery']]),
      q(184, 'synonym', 'The word "center" in the chat is closest in meaning to', 'チャット内の「center」に最も近い意味はどれですか。', [
        ['place in the middle', '受付机の上の中央に配置するという意味です。'], ['measure carefully', '寸法を測る指示ではありません。'], ['replace immediately', '交換の意味ではありません。'], ['hang outdoors', '屋外設置という意味ではありません。'],
      ], 0, 'ここで center は動詞で「中央に置く」です。', [['t01-d2-chat', 2, 'Please ask the setup crew to center the smaller banner above the registration desk.']], { targetWord: 'center' }),
      q(185, 'detail', 'What will Martin do after lunch?', 'マーティンは昼食後に何をしますか。', [
        ['Replace the banner', '交換ではなく値引きを選びました。'], ['Move the registration desk', '机を移動する話はありません。'], ['Update the expense sheet', '本人が昼食後に更新すると述べています。'], ['Pay the installation fee', '設置料だけを支払う予定ではありません。'],
      ], 2, 'チャット最後の発言から次の作業を特定します。', [['t01-d2-chat', 3, 'I will update the expense sheet after lunch.']]),
    ],
  },
];

const t1a = passage(
  't01-t1-ad',
  'advertisement',
  'Greenway Learning Center — Team Retreat Package',
  [
    ['The Garden Room accommodates up to 20 guests and includes a projector, whiteboards, and access to a private patio. The weekday package costs $420 and includes morning coffee.', 'ガーデン室は最大20名を収容し、プロジェクター、ホワイトボード、専用パティオが含まれます。平日パッケージは420ドルで朝のコーヒー付きです。'],
    ['A buffet lunch may be added for $24 per person. Vegetarian and gluten-free meals are available with five days notice. A deposit equal to 25 percent of the total charge secures the reservation.', 'ビュッフェ昼食は1人24ドルで追加できます。ベジタリアン食とグルテンフリー食は5日前までの連絡で利用できます。合計料金の25パーセントに相当する保証金で予約が確定します。'],
  ],
);
const t1b = passage(
  't01-t1-email',
  'email',
  'Retreat Request',
  [
    ['Hello Greenway Team, I would like to reserve a room for our eighteen-person design team on Wednesday, June 22. We plan to meet from 9:00 A.M. until 3:00 P.M. and will need to show several product videos.', 'グリーンウェイご担当者様、6月22日水曜日に18名のデザインチーム用の部屋を予約したいです。午前9時から午後3時まで会合を行い、製品動画を数本上映する予定です。'],
    ['Please include buffet lunches, with four vegetarian meals. Could you confirm the total price and tell me when the deposit is due?', 'ビュッフェ昼食を付け、うち4食をベジタリアン食にしてください。合計金額と保証金の期限をご確認いただけますか。'],
  ],
  { from: 'Dana Wells <dana@lumio.example>', to: 'Bookings <events@greenway.example>' },
);
const t1c = passage(
  't01-t1-form',
  'form',
  'Greenway Reservation Confirmation G-622',
  [
    ['Client: Lumio Design | Date: Wednesday, June 22 | Room: Garden Room | Guests: 18 | Hours: 9:00 A.M.–3:00 P.M.', '顧客：ルミオ・デザイン｜日付：6月22日水曜日｜部屋：ガーデン室｜人数：18名｜時間：午前9時～午後3時'],
    ['Room package: $420 | Buffet lunches: 18 × $24 = $432 | Total: $852 | Deposit due: June 10 | Meal note: 4 vegetarian', '部屋パッケージ：420ドル｜ビュッフェ昼食：18×24ドル＝432ドル｜合計：852ドル｜保証金期限：6月10日｜食事注記：ベジタリアン4食'],
  ],
);

const t2a = passage(
  't01-t2-article',
  'article',
  'Solar Roof Completed at Bayport Ferry Terminal',
  [
    ['Bayport Transit has completed a solar roof above the passenger waiting area. The panels are expected to provide about 40 percent of the terminal building’s annual electricity.', 'ベイポート交通局は旅客待合所の上に太陽光屋根を完成させました。パネルはターミナル建物の年間電力の約40パーセントを供給する見込みです。'],
    ['The project also added shaded seating and two charging stations for electric bicycles. A public tour will be offered on Saturday as part of the city’s Clean Energy Week.', 'この事業では日陰付き座席と電動自転車用充電所2基も追加されました。市のクリーンエネルギー週間の一環として土曜日に一般見学会が行われます。'],
  ],
);
const t2b = passage(
  't01-t2-schedule',
  'schedule',
  'Saturday Terminal Tours',
  [
    ['Tour A: 9:00 A.M. | Guide: Luis Moreno | Spaces: 20\nTour B: 11:00 A.M. | Guide: Erin Cho | Spaces: 20', 'ツアーA：午前9時｜案内：ルイス・モレノ｜定員20名\nツアーB：午前11時｜案内：エリン・チョー｜定員20名'],
    ['Tour C: 2:00 P.M. | Guide: Erin Cho | Spaces: 25\nMeet at the ticket hall ten minutes before each tour. Bicycle parking is beside the west platform.', 'ツアーC：午後2時｜案内：エリン・チョー｜定員25名\n各ツアー開始10分前に切符売場へ集合してください。自転車置場は西ホーム横です。'],
  ],
);
const t2c = messages(
  't01-t2-texts',
  'text_message_chain',
  'Tour Volunteers',
  [
    ['Erin', '7:35 A.M.', 'Heavy rain is expected until 10:00. The coordinator has canceled Tour A because part of its route is outdoors.', '10時まで大雨の予報です。経路の一部が屋外なので、責任者がツアーAを中止しました。'],
    ['Luis', '7:38 A.M.', 'I will email the registered visitors and offer them spaces on Tour C. It has five more spaces than the morning tours.', '登録者へメールし、ツアーCの空きを案内します。午後のツアーは午前の各ツアーより定員が5名多いです。'],
    ['Erin', '7:42 A.M.', 'Good. Tour B is still full, so that is our best option. I will put a cancellation sign in the ticket hall.', 'いいですね。ツアーBは満員のままなので、それが最善です。切符売場に中止の掲示を出します。'],
  ],
);

const t3a = passage(
  't01-t3-web',
  'web_page',
  'LedgerLeaf Scheduled Maintenance',
  [
    ['LedgerLeaf accounting services will be unavailable from 11:00 P.M. Saturday until 3:00 A.M. Sunday while database upgrades are installed. Saved reports and receipts will not be affected.', 'データベース更新のため、レジャーリーフ会計サービスは土曜午後11時から日曜午前3時まで利用できません。保存済みの報告書と領収書には影響しません。'],
    ['Customers who schedule automatic invoice delivery during this period may see a delay of up to two hours. For urgent access, download needed reports before maintenance begins.', 'この時間帯に請求書の自動送信を予定した利用者は、最大2時間の遅延が生じる場合があります。緊急利用には保守開始前に必要な報告書をダウンロードしてください。'],
  ],
);
const t3b = passage(
  't01-t3-notice',
  'notice',
  'Finance Department Weekend Work',
  [
    ['The Finance Department will prepare quarterly statements on Sunday from 8:00 A.M. to noon. Employees may work remotely or use Conference Room 3, which has been reserved for the team.', '財務部は日曜午前8時から正午まで四半期報告書を作成します。従業員は在宅勤務するか、予約済みの会議室3を利用できます。'],
    ['Download LedgerLeaf reports by 5:00 P.M. Friday and save them in the Q3 shared folder. Contact Mel Torres before Friday noon if remote network access needs to be tested.', 'レジャーリーフの報告書を金曜午後5時までにダウンロードし、Q3共有フォルダーへ保存してください。在宅ネットワーク接続のテストが必要な場合は金曜正午までにメル・トレスへ連絡してください。'],
  ],
);
const t3c = messages(
  't01-t3-chat',
  'online_chat',
  'Finance Team Chat',
  [
    ['Mel', 'Thursday 3:10 P.M.', 'Has everyone decided where to work on Sunday?', '皆さん、日曜にどこで作業するか決めましたか。'],
    ['Aisha', 'Thursday 3:12 P.M.', 'I will work from home. My network test was successful this morning, and I have already saved the sales report.', '私は自宅で作業します。今朝ネットワークテストに成功し、販売報告書も保存済みです。'],
    ['Jon', 'Thursday 3:15 P.M.', 'I will use Conference Room 3. Could someone download the expense report? I am visiting a supplier all day Friday.', '私は会議室3を使います。誰か経費報告書をダウンロードしてもらえますか。金曜は終日仕入先を訪問します。'],
    ['Mel', 'Thursday 3:18 P.M.', 'I can take care of that. I will place it in the shared folder with the other files.', '私が対応できます。他のファイルと一緒に共有フォルダーへ置きます。'],
  ],
);

const tripleSets = [
  {
    setType: 'triple', passages: [t1a, t1b, t1c], questions: [
      q(186, 'detail', 'Why does Ms. Wells need a room with a projector?', 'ウェルズ氏がプロジェクター付きの部屋を必要とするのはなぜですか。', [
        ['She will display product videos.', 'メールで製品動画を上映すると述べています。'], ['She will conduct remote interviews.', '遠隔面談の予定はありません。'], ['She will teach a gardening class.', '園芸講座ではなくチーム会合です。'], ['She will replace the whiteboards.', '設備交換を行うのではありません。'],
      ], 0, 'メールの用途と広告の設備を結び付けます。', [['t01-t1-email', 0, 'will need to show several product videos.'], ['t01-t1-ad', 0, 'includes a projector']]),
      q(187, 'infer', 'Why was the Garden Room appropriate for the group?', 'ガーデン室がこのグループに適していたのはなぜですか。', [
        ['It is available only on weekends.', '予約日は水曜で平日です。'], ['It holds the group and has the needed equipment.', '18名は定員20名以内で、必要なプロジェクターがあります。'], ['It includes free buffet lunches.', '昼食は1人24ドルの追加です。'], ['It requires no deposit.', '25パーセントの保証金が必要です。'],
      ], 1, '人数と設備の両条件を3文書で照合します。', [['t01-t1-ad', 0, 'accommodates up to 20 guests and includes a projector'], ['t01-t1-form', 0, 'Guests: 18']]),
      q(188, 'detail', 'How much is the required deposit?', '必要な保証金はいくらですか。', [
        ['$105', '105ドルは部屋代420ドルだけの25パーセントで、総額基準ではありません。'], ['$213', '総額852ドルの25パーセントは213ドルです。'], ['$420', '420ドルは部屋パッケージ料金です。'], ['$852', '852ドルは保証金ではなく合計額です。'],
      ], 1, '広告の25パーセントと確認書の総額852ドルを用いて計算します。', [['t01-t1-ad', 1, 'A deposit equal to 25 percent of the total charge secures the reservation.'], ['t01-t1-form', 1, 'Total: $852']]),
      q(189, 'detail', 'How many standard buffet meals were ordered?', '通常のビュッフェ食は何食注文されましたか。', [
        ['4', '4食はベジタリアン食です。'], ['14', '全18食からベジタリアン4食を引くと通常食は14食です。'], ['18', '18は昼食の総数です。'], ['20', '20は部屋の最大収容人数です。'],
      ], 1, '総食数と特別食数の差を求めます。', [['t01-t1-form', 1, 'Buffet lunches: 18 × $24 = $432'], ['t01-t1-form', 1, 'Meal note: 4 vegetarian']]),
      q(190, 'not', 'Which statement is NOT correct about the confirmed reservation?', '確定した予約について正しくないものはどれですか。', [
        ['The meeting is on June 22.', '日付欄に6月22日と確認されています。'], ['Eighteen guests will attend.', '人数欄に18名と確認されています。'], ['The deposit is due on June 10.', '保証金期限欄に6月10日とあります。'], ['All eighteen lunches are standard meals.', '4食はベジタリアン食なので、全食が通常食ではありません。'],
      ], 3, '食事注記と矛盾する内容を選びます。', [['t01-t1-form', 1, 'Meal note: 4 vegetarian']]),
    ],
  },
  {
    setType: 'triple', passages: [t2a, t2b, t2c], questions: [
      q(191, 'main_idea', 'What is the article mainly about?', '記事は主に何についてですか。', [
        ['A completed renewable-energy improvement', '太陽光屋根完成と関連設備追加を報じています。'], ['A rise in ferry ticket prices', '運賃変更は扱っていません。'], ['A delay in terminal construction', '事業は完成しており遅延記事ではありません。'], ['A new electric bicycle retailer', '自転車店の開業ではありません。'],
      ], 0, 'ターミナルの太陽光設備完成が記事の主題です。', [['t01-t2-article', 0, 'Bayport Transit has completed a solar roof above the passenger waiting area.']]),
      q(192, 'detail', 'What percentage of the terminal’s electricity is the solar roof expected to provide?', '太陽光屋根はターミナル電力の何パーセントを供給する見込みですか。', [
        ['20 percent', '20は午前ツアーの定員で、電力割合ではありません。'], ['25 percent', '25はツアーCの定員です。'], ['40 percent', '年間電力の約40パーセントとあります。'], ['50 percent', '50パーセントという数値はありません。'],
      ], 2, '記事第1段落の割合を読み取ります。', [['t01-t2-article', 0, 'about 40 percent of the terminal building’s annual electricity.']]),
      q(193, 'infer', 'Why did Luis offer Tour C to Tour A visitors?', 'ルイスがツアーAの参加者へツアーCを案内したのはなぜですか。', [
        ['Tour C follows the same morning route.', '同じ経路という説明はありません。'], ['Tour B was full and Tour C had more capacity.', 'Bは満員で、Cは午前ツアーより定員が5名多いからです。'], ['Tour C is entirely indoors.', 'Cが全て屋内とは書かれていません。'], ['Luis was scheduled to guide Tour C.', 'Cの案内役はエリンです。'],
      ], 1, '予定表の定員とメッセージの満員情報を統合します。', [['t01-t2-texts', 2, 'Tour B is still full, so that is our best option.'], ['t01-t2-schedule', 1, 'Tour C: 2:00 P.M. | Guide: Erin Cho | Spaces: 25']]),
      q(194, 'intention', 'What does Erin mean by "that is our best option"?', 'エリンの「それが最善です」は何を意味しますか。', [
        ['Visitors should be moved to Tour C.', 'Bが満員なのでCへの振替案を支持しています。'], ['The cancellation sign should be removed.', '中止掲示はこれから設置します。'], ['Tour A should start after the rain.', 'Aは中止され、延期とは述べられていません。'], ['Luis should guide Tour B.', 'Bの案内役変更は話題ではありません。'],
      ], 0, '直前のツアーCへの振替提案を指しています。', [['t01-t2-texts', 1, 'I will email the registered visitors and offer them spaces on Tour C.'], ['t01-t2-texts', 2, 'Tour B is still full, so that is our best option.']], { intentionTarget: { sender: 'Erin', utteranceEn: 'that is our best option' } }),
      q(195, 'detail', 'Where will Erin place a cancellation sign?', 'エリンは中止の掲示をどこへ置きますか。', [
        ['Beside the west platform', '西ホーム横は自転車置場です。'], ['At a charging station', '充電所に掲示するとは言っていません。'], ['In the ticket hall', 'メッセージで切符売場に置くと述べています。'], ['Above the waiting area', '待合所上は太陽光屋根の場所です。'],
      ], 2, '最後のメッセージの掲示場所を確認します。', [['t01-t2-texts', 2, 'I will put a cancellation sign in the ticket hall.']]),
    ],
  },
  {
    setType: 'triple', passages: [t3a, t3b, t3c], questions: [
      q(196, 'main_idea', 'What is the purpose of the LedgerLeaf web page?', 'レジャーリーフのウェブページの目的は何ですか。', [
        ['To announce maintenance and its possible effects', '保守時間、影響、事前対応を案内しています。'], ['To introduce a new accounting subscription', '新料金プランの紹介ではありません。'], ['To request customer receipts', '領収書提出の依頼ではありません。'], ['To explain how to prepare quarterly statements', '四半期報告書の作り方ではなくサービス保守の告知です。'],
      ], 0, 'サービス停止時間と利用者への影響を知らせるページです。', [['t01-t3-web', 0, 'LedgerLeaf accounting services will be unavailable from 11:00 P.M. Saturday until 3:00 A.M. Sunday']]),
      q(197, 'detail', 'By when should Finance employees download the reports?', '財務部員はいつまでに報告書をダウンロードすべきですか。', [
        ['Thursday at 3:00 P.M.', '木曜はチャット日ですが締切ではありません。'], ['Friday at noon', '金曜正午はネットワークテスト連絡の期限です。'], ['Friday at 5:00 P.M.', '通知にダウンロード期限として明記されています。'], ['Saturday at 11:00 P.M.', 'これは保守開始時刻で、社内期限より遅いです。'],
      ], 2, '社内通知の報告書保存期限を選びます。', [['t01-t3-notice', 1, 'Download LedgerLeaf reports by 5:00 P.M. Friday']]),
      q(198, 'infer', 'Why did Jon ask someone else to download the expense report?', 'ジョンが別の人に経費報告書のダウンロードを頼んだのはなぜですか。', [
        ['His remote network test failed.', 'ジョンのネットワークテスト結果は示されていません。'], ['He will be away from the office on Friday.', '金曜は終日仕入先を訪問するため期限対応が難しいからです。'], ['The report can be opened only in Conference Room 3.', '会議室限定のファイルではありません。'], ['He does not work for Finance.', '日曜作業へ参加する財務チーム員です。'],
      ], 1, '金曜のダウンロード期限とジョンの外出予定を関連付けます。', [['t01-t3-chat', 2, 'I am visiting a supplier all day Friday.'], ['t01-t3-notice', 1, 'Download LedgerLeaf reports by 5:00 P.M. Friday']]),
      q(199, 'detail', 'Which report had already been saved at the time of the chat?', 'チャット時点ですでに保存されていた報告書はどれですか。', [
        ['The sales report', 'アイシャが販売報告書を保存済みと述べています。'], ['The expense report', '経費報告書はメルがこれから対応します。'], ['The supplier report', '仕入先報告書というファイルはありません。'], ['The maintenance report', '保守報告書の保存は話題ではありません。'],
      ], 0, 'アイシャの発言から保存済みファイルを特定します。', [['t01-t3-chat', 1, 'I have already saved the sales report.']]),
      q(200, 'intention', 'What does Mel mean by "I can take care of that"?', 'メルの「私が対応できます」は何を意味しますか。', [
        ['She will download and save the expense report.', 'ジョンの直前の依頼を引き受けています。'], ['She will visit the supplier with Jon.', '仕入先訪問に同行する話ではありません。'], ['She will reserve Conference Room 3.', '会議室はすでに予約済みです。'], ['She will change the maintenance schedule.', '保守時間を変更する権限や意図はありません。'],
      ], 0, 'that はジョンの経費報告書ダウンロード依頼を指します。', [['t01-t3-chat', 2, 'Could someone download the expense report?'], ['t01-t3-chat', 3, 'I can take care of that.']], { intentionTarget: { sender: 'Mel', utteranceEn: 'I can take care of that.' } }),
    ],
  },
];

async function main(): Promise<void> {
  const parsed = Part7DataSchema.parse({
    testId: 'test-01',
    part: 7,
    sets: [...singleSets, ...doubleSets, ...tripleSets],
  });

  const outputPath = path.resolve(process.cwd(), 'public', 'data', 'tests', 'test-01', 'part7.json');
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(parsed, null, 2)}\n`, 'utf8');
  console.log(`Generated ${outputPath}`);
}

void main();
