/**
 * オリジナル問題「テストセット01」のメタデータ・Part5・Part6を生成する。
 * 公式問題の転載はせず、業務場面を題材に独自作成した問題のみを出力する。
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import {
  Part5DataSchema,
  Part6DataSchema,
  TestIndexSchema,
  TestMetaSchema,
  type Choice,
  type Part5Question,
  type Part6Question,
} from '../src/schemas/question.schema';

const TEST_ID = 'test-01';
const DATA_ROOT = path.join(process.cwd(), 'public', 'data');
const TEST_DIR = path.join(DATA_ROOT, 'tests', TEST_ID);

type Label = Choice['label'];
const LABELS: Label[] = ['A', 'B', 'C', 'D'];

function choices(
  options: [string, string, string, string],
  correctIndex: number,
  rationale: string,
): Choice[] {
  return options.map((text, index) => ({
    label: LABELS[index],
    text,
    isCorrect: index === correctIndex,
    explanation: index === correctIndex
      ? `「${text}」が文法と文脈の両方に合います。${rationale}`
      : `「${text}」はこの空所で求められる形または意味に合いません。${rationale}`,
  }));
}

function balancedChoices(
  options: [string, string, string, string],
  correctIndex: number,
  targetIndex: number,
  rationale: string,
): Choice[] {
  const reordered = [...options];
  const [correctText] = reordered.splice(correctIndex, 1);
  reordered.splice(targetIndex, 0, correctText);
  return choices(reordered as [string, string, string, string], targetIndex, rationale);
}

type Part5Seed = {
  sentence: string;
  sentenceJa: string;
  options: [string, string, string, string];
  correct: number;
  rationale: string;
  tag: Part5Question['tag'];
};

const part5Seeds: Part5Seed[] = [
  {
    sentence: 'The finance team responded ______ to the auditor\'s request for additional records.',
    sentenceJa: '財務チームは、追加記録を求める監査人の依頼に迅速に対応しました。',
    options: ['prompt', 'promptly', 'promptness', 'prompted'], correct: 1,
    rationale: '動詞 responded を修飾する副詞 promptly が必要です。', tag: 'grammar',
  },
  {
    sentence: 'The product demonstration ______ until next Tuesday because the equipment has not arrived.',
    sentenceJa: '機器が到着していないため、製品実演は来週火曜日まで延期されました。',
    options: ['postpones', 'postponed', 'has postponed', 'has been postponed'], correct: 3,
    rationale: 'demonstration は延期される側なので現在完了の受動態が適切です。', tag: 'verb_form',
  },
  {
    sentence: 'Several flights were delayed ______ heavy fog near the airport.',
    sentenceJa: '空港付近の濃霧のため、複数の便が遅延しました。',
    options: ['because', 'because of', 'although', 'unless'], correct: 1,
    rationale: '後ろが名詞句 heavy fog なので because of を使います。', tag: 'preposition',
  },
  {
    sentence: 'All ______ must submit a résumé and two professional references by May 18.',
    sentenceJa: 'すべての応募者は5月18日までに履歴書と2通の職務上の推薦状を提出しなければなりません。',
    options: ['applicants', 'applications', 'applicable', 'applying'], correct: 0,
    rationale: 'All の後で「応募者」を表す複数名詞 applicants が主語になります。', tag: 'grammar',
  },
  {
    sentence: 'The new printer is ______ faster and quieter than the model it replaces.',
    sentenceJa: '新しいプリンターは、置き換え前の機種より速く、しかも静かです。',
    options: ['both', 'either', 'neither', 'whether'], correct: 0,
    rationale: 'both A and B の相関表現で2つの長所を結びます。', tag: 'conjunction',
  },
  {
    sentence: 'Ms. Ortega is known for providing ______ estimates even when project details are limited.',
    sentenceJa: 'オルテガさんは、プロジェクトの詳細が限られている場合でも信頼できる見積もりを出すことで知られています。',
    options: ['rely', 'reliably', 'reliable', 'reliability'], correct: 2,
    rationale: '名詞 estimates を修飾する形容詞 reliable が必要です。', tag: 'grammar',
  },
  {
    sentence: 'Please ______ the completed expense form to your department manager.',
    sentenceJa: '記入済みの経費申請書を部門マネージャーに提出してください。',
    options: ['submit', 'attend', 'borrow', 'arrange'], correct: 0,
    rationale: '書類を「提出する」という意味の submit が適切です。', tag: 'vocab',
  },
  {
    sentence: '______ the unexpected increase in material costs, the project remained within budget.',
    sentenceJa: '予想外の資材費上昇にもかかわらず、プロジェクトは予算内に収まりました。',
    options: ['Despite', 'During', 'Except', 'Toward'], correct: 0,
    rationale: '逆接の意味で名詞句を導く Despite が適切です。', tag: 'preposition',
  },
  {
    sentence: 'Employees ______ wish to join the volunteer event should register online.',
    sentenceJa: 'ボランティアイベントへの参加を希望する従業員は、オンラインで登録してください。',
    options: ['who', 'which', 'whose', 'whom'], correct: 0,
    rationale: '先行詞 Employees を受け、関係節の主語になる who を使います。', tag: 'pronoun',
  },
  {
    sentence: 'The hotel plans a major ______ of its conference facilities this winter.',
    sentenceJa: 'そのホテルは今冬、会議施設の大規模な拡張を計画しています。',
    options: ['expand', 'expands', 'expansive', 'expansion'], correct: 3,
    rationale: '冠詞 a と形容詞 major の後には名詞 expansion が必要です。', tag: 'grammar',
  },
  {
    sentence: 'Visitors must obtain a security badge ______ entering the research laboratory.',
    sentenceJa: '訪問者は研究所に入る前にセキュリティバッジを取得しなければなりません。',
    options: ['before', 'while', 'since', 'until'], correct: 0,
    rationale: '入室より先に取得するため、時間関係を示す before が適切です。', tag: 'conjunction',
  },
  {
    sentence: 'The survey results were ______ summarized in a report for senior management.',
    sentenceJa: '調査結果は上級管理職向けの報告書に正確にまとめられました。',
    options: ['accuracy', 'accurate', 'accurately', 'more accurate'], correct: 2,
    rationale: '動詞 summarized を修飾する副詞 accurately が必要です。', tag: 'grammar',
  },
  {
    sentence: 'Mr. Chen ______ at the Osaka branch since it opened in 2019.',
    sentenceJa: 'チェンさんは2019年の大阪支店開設以来、同支店で勤務しています。',
    options: ['works', 'worked', 'has worked', 'will work'], correct: 2,
    rationale: 'since と継続期間があるため現在完了 has worked を使います。', tag: 'verb_form',
  },
  {
    sentence: 'Final ______ from the safety committee is required before production can begin.',
    sentenceJa: '生産を開始する前に、安全委員会の最終承認が必要です。',
    options: ['approve', 'approval', 'approved', 'approving'], correct: 1,
    rationale: '形容詞 Final の後で主語になる名詞 approval が必要です。', tag: 'grammar',
  },
  {
    sentence: 'The outdoor concert will proceed as scheduled ______ severe weather is expected.',
    sentenceJa: '荒天が予想されない限り、屋外コンサートは予定どおり開催されます。',
    options: ['unless', 'because', 'so that', 'whereas'], correct: 0,
    rationale: '「～でない限り」という条件を示す unless が適切です。', tag: 'conjunction',
  },
  {
    sentence: 'A limited number of complimentary tickets are ______ at the reception desk.',
    sentenceJa: '無料チケットは受付で数量限定で配布されています。',
    options: ['available', 'capable', 'probable', 'responsible'], correct: 0,
    rationale: '「入手可能な」という意味の available が文脈に合います。', tag: 'vocab',
  },
  {
    sentence: 'The purchasing director will ______ a lower delivery fee with the supplier.',
    sentenceJa: '購買部長は供給業者と、より低い配送料について交渉します。',
    options: ['negotiate', 'inspect', 'reserve', 'manufacture'], correct: 0,
    rationale: '条件について「交渉する」という意味の negotiate が適切です。', tag: 'vocab',
  },
  {
    sentence: 'The consultant, ______ recommendations were adopted last year, will return in June.',
    sentenceJa: '昨年提案が採用されたそのコンサルタントは、6月に戻ってきます。',
    options: ['who', 'whom', 'whose', 'which'], correct: 2,
    rationale: 'recommendations との所有関係を表す whose が必要です。', tag: 'pronoun',
  },
  {
    sentence: 'Online orders increased ______ after the company introduced free shipping.',
    sentenceJa: '会社が送料無料を導入した後、オンライン注文は大幅に増加しました。',
    options: ['considerable', 'considerably', 'consideration', 'considering'], correct: 1,
    rationale: '動詞 increased を修飾する副詞 considerably が必要です。', tag: 'grammar',
  },
  {
    sentence: 'The museum will close early on Friday ______ a private reception.',
    sentenceJa: '博物館は貸切レセプションのため、金曜日は早く閉館します。',
    options: ['due to', 'apart from', 'instead of', 'next to'], correct: 0,
    rationale: '理由を表す前置詞句 due to が適切です。', tag: 'preposition',
  },
  {
    sentence: 'All electrical inspections must ______ before tenants move into the building.',
    sentenceJa: '入居者が建物に入る前に、すべての電気検査を完了しなければなりません。',
    options: ['complete', 'completed', 'be completed', 'be completing'], correct: 2,
    rationale: 'inspections は完了される側で、助動詞 must の後なので be completed です。', tag: 'verb_form',
  },
  {
    sentence: 'The marketing campaign was so ______ that demand exceeded the factory\'s capacity.',
    sentenceJa: 'マーケティングキャンペーンが非常に成功したため、需要が工場の生産能力を超えました。',
    options: ['success', 'successful', 'successfully', 'succeed'], correct: 1,
    rationale: 'be動詞 was の補語となる形容詞 successful が必要です。', tag: 'grammar',
  },
  {
    sentence: 'The annual award is presented to the most innovative proposal ______ all submissions.',
    sentenceJa: '年次賞は、すべての応募案の中で最も革新的な提案に贈られます。',
    options: ['among', 'between', 'through', 'beside'], correct: 0,
    rationale: '3つ以上の集合の中を示す among が適切です。', tag: 'preposition',
  },
  {
    sentence: 'We will ______ customers by e-mail when their orders are ready for pickup.',
    sentenceJa: '注文品の受け取り準備ができた時点で、顧客に電子メールで通知します。',
    options: ['notify', 'mention', 'announce', 'explain'], correct: 0,
    rationale: 'notify + 人で「人に通知する」という形を取ります。', tag: 'vocab',
  },
  {
    sentence: 'The instructions have been simplified ______ new users can install the software easily.',
    sentenceJa: '新規利用者がソフトウェアを簡単にインストールできるよう、説明書が簡略化されました。',
    options: ['even though', 'so that', 'as if', 'rather than'], correct: 1,
    rationale: '目的を表す so that が適切です。', tag: 'conjunction',
  },
  {
    sentence: 'Regular ______ of the ventilation system will help reduce energy costs.',
    sentenceJa: '換気システムを定期的に保守することで、エネルギー費用の削減につながります。',
    options: ['maintain', 'maintained', 'maintenance', 'maintaining'], correct: 2,
    rationale: '形容詞 Regular の後で主語になる名詞 maintenance が必要です。', tag: 'grammar',
  },
  {
    sentence: 'The revised contract arrived two days ______ than the legal team had expected.',
    sentenceJa: '改訂契約書は法務チームの予想より2日早く届きました。',
    options: ['early', 'earliest', 'earlier', 'more early'], correct: 2,
    rationale: 'than があるため比較級 earlier を使います。', tag: 'grammar',
  },
  {
    sentence: 'Department heads are expected to prepare the monthly reports ______.',
    sentenceJa: '各部門長は月次報告書を自ら作成することが求められています。',
    options: ['themselves', 'their', 'them', 'they'], correct: 0,
    rationale: '主語 Department heads を強調する再帰代名詞 themselves が適切です。', tag: 'pronoun',
  },
  {
    sentence: 'The architect ______ using recycled materials for the lobby renovation.',
    sentenceJa: '建築家はロビー改装に再生材料を使用することを勧めました。',
    options: ['recommended', 'prevented', 'refused', 'expected'], correct: 0,
    rationale: 'recommend doing の形で「～することを勧める」と表します。', tag: 'verb_form',
  },
  {
    sentence: 'Please indicate ______ you require vegetarian meals on the registration form.',
    sentenceJa: '登録用紙に、ベジタリアン食が必要かどうかを記入してください。',
    options: ['whether', 'until', 'despite', 'wherever'], correct: 0,
    rationale: '「～かどうか」を表す whether が名詞節を導きます。', tag: 'conjunction',
  },
];

const part5Questions: Part5Question[] = part5Seeds.map((seed, index) => ({
  no: 101 + index,
  sentence: seed.sentence,
  sentenceJa: seed.sentenceJa,
  choices: balancedChoices(seed.options, seed.correct, index % 4, seed.rationale),
  explanationOverall: seed.rationale,
  tag: seed.tag,
}));

function p6Question(
  no: number,
  type: Part6Question['type'],
  options: [string, string, string, string],
  correctIndex: number,
  rationale: string,
): Part6Question {
  return {
    no,
    type,
    choices: balancedChoices(options, correctIndex, (no - 131) % 4, rationale),
    explanationOverall: rationale,
  };
}

const part6Data = {
  testId: TEST_ID,
  part: 6 as const,
  passages: [
    {
      passageNo: 1 as const,
      docType: 'email' as const,
      title: 'Leadership Workshop Registration',
      paragraphs: [
        {
          en: 'To: Department Supervisors\nFrom: Human Resources\nSubject: Leadership Workshop\n\nThank you for ______[131] for the leadership workshop on September 12. The session will ______[132] at 9:00 A.M. in Conference Room B.',
          ja: '宛先：部門監督者\n送信者：人事部\n件名：リーダーシップ研修\n\n9月12日のリーダーシップ研修にご登録いただきありがとうございます。研修は午前9時に会議室Bで始まります。',
        },
        {
          en: 'Because seating is limited, please confirm your attendance ______[133] Friday afternoon. ______[134] If you have dietary restrictions, include them in your reply.',
          ja: '座席数に限りがあるため、金曜日の午後までに出席を確認してください。確認後、詳しい日程をお送りします。食事制限がある場合は返信に記載してください。',
        },
      ],
      questions: [
        p6Question(131, 'blank', ['register', 'registered', 'registering', 'registration'], 2, '前置詞 for の後には動名詞 registering が必要です。'),
        p6Question(132, 'blank', ['begin', 'began', 'begun', 'beginning'], 0, '助動詞 will の後には動詞原形 begin を置きます。'),
        p6Question(133, 'blank', ['at', 'by', 'from', 'during'], 1, '締切を示すため by Friday afternoon が適切です。'),
        p6Question(134, 'insertion', [
          'A detailed schedule will be sent after we receive your confirmation.',
          'The conference room was renovated several years ago.',
          'Supervisors may submit travel expenses every month.',
          'The company cafeteria closes at 3:00 P.M.',
        ], 0, '出席確認の依頼から、確認後に日程を送る説明へ自然につながります。'),
      ],
    },
    {
      passageNo: 2 as const,
      docType: 'notice' as const,
      title: 'Temporary Lobby Closure',
      paragraphs: [
        {
          en: 'The main lobby of the Harborside Office Center will be closed from October 3 to October 7 while new flooring is ______[135]. During this period, employees and visitors should enter the building ______[136] the east entrance on Mason Street.',
          ja: 'Harborside Office Centerの正面ロビーは、新しい床材の設置工事のため10月3日から7日まで閉鎖されます。この期間、従業員と来訪者はMason Street側の東入口から入館してください。',
        },
        {
          en: 'Security staff will be available there to issue visitor badges and provide ______[137]. ______[138] We apologize for any inconvenience caused by the temporary change.',
          ja: '東入口には警備員が待機し、来訪者バッジの発行と案内を行います。正面受付の電話番号は工事期間中も変更ありません。一時的な変更によるご不便をおわびします。',
        },
      ],
      questions: [
        p6Question(135, 'blank', ['install', 'installed', 'installing', 'installation'], 1, 'flooring は設置される側なので is installed の受動態が必要です。'),
        p6Question(136, 'blank', ['through', 'among', 'beside', 'until'], 0, '入口を通って入るため through the east entrance が自然です。'),
        p6Question(137, 'blank', ['direct', 'direction', 'directions', 'directly'], 2, '案内を表す可算名詞の複数形 directions が適切です。'),
        p6Question(138, 'insertion', [
          'The main reception telephone number will remain unchanged during the work.',
          'Several offices are currently available for rent on the fifth floor.',
          'The flooring supplier opened a store near the airport.',
          'Employees received their identification cards last January.',
        ], 0, '一時閉鎖中も利用できる連絡手段の説明が、案内とおわびの間に自然に入ります。'),
      ],
    },
    {
      passageNo: 3 as const,
      docType: 'article' as const,
      title: 'Local Bakery Expands Distribution',
      paragraphs: [
        {
          en: 'Riverside Breads announced yesterday that its products will soon be sold in 40 additional grocery stores. The agreement is the company\'s largest distribution ______[139] since it opened eight years ago.',
          ja: 'Riverside Breadsは昨日、同社製品が新たに40店舗の食料品店で販売されると発表しました。この契約は8年前の創業以来、同社最大の流通拡大です。',
        },
        {
          en: 'To meet the expected demand, the bakery has purchased a second oven and plans to ______[140] six more employees. Production manager Lila Gomez said the expansion had been planned ______[141] so that product quality would not be affected. ______[142]',
          ja: '予想される需要に対応するため、同社は2台目のオーブンを購入し、従業員をさらに6名採用する予定です。生産責任者のリラ・ゴメス氏は、製品品質に影響が出ないよう拡大を慎重に計画したと述べました。新店舗への最初の配送は来月初めに予定されています。',
        },
      ],
      questions: [
        p6Question(139, 'blank', ['expand', 'expansion', 'expansive', 'expanded'], 1, 'largest distribution の後には名詞 expansion が必要です。'),
        p6Question(140, 'blank', ['hire', 'hired', 'hiring', 'hires'], 0, 'plan to の後には動詞原形 hire を置きます。'),
        p6Question(141, 'blank', ['care', 'careful', 'carefully', 'more careful'], 2, '動詞 planned を修飾する副詞 carefully が必要です。'),
        p6Question(142, 'insertion', [
          'The first deliveries to the new stores are scheduled for early next month.',
          'Customers can request refunds without a receipt.',
          'The company stopped producing bread eight years ago.',
          'Ms. Gomez will speak at a banking conference this week.',
        ], 0, '拡大計画の実施時期を示す文が記事の結びとして適切です。'),
      ],
    },
    {
      passageNo: 4 as const,
      docType: 'memo' as const,
      title: 'New Inventory System',
      paragraphs: [
        {
          en: 'Beginning November 1, all warehouse teams will use the StockPoint inventory system. The new system updates product counts ______[143] and alerts staff when supplies fall below a preset level.',
          ja: '11月1日から、すべての倉庫チームはStockPoint在庫システムを使用します。新システムは製品数を自動更新し、在庫が設定水準を下回るとスタッフへ通知します。',
        },
        {
          en: 'Employees must complete an online tutorial before they are ______[144] access to StockPoint. Team leaders should make sure that everyone finishes the tutorial ______[145] October 28. ______[146] Questions may be sent to systems@northstar.example.',
          ja: '従業員はStockPointへのアクセス権を付与される前に、オンラインチュートリアルを修了しなければなりません。チームリーダーは全員が10月28日までに修了するよう確認してください。各シフトの実習会も翌週に実施されます。質問はsystems@northstar.exampleへ送ってください。',
        },
      ],
      questions: [
        p6Question(143, 'blank', ['automatic', 'automatically', 'automation', 'automate'], 1, '動詞 updates を修飾する副詞 automatically が適切です。'),
        p6Question(144, 'blank', ['grant', 'granted', 'granting', 'grants'], 1, 'employees は権限を与えられる側なので are granted が必要です。'),
        p6Question(145, 'blank', ['by', 'for', 'since', 'through'], 0, '完了期限を表す by October 28 が適切です。'),
        p6Question(146, 'insertion', [
          'Hands-on sessions for each shift will also be offered the following week.',
          'The warehouse was built beside a railway station.',
          'Customers should return damaged goods to a retail store.',
          'StockPoint is the name of a local delivery company.',
        ], 0, '研修期限の説明から追加研修、問い合わせ先へ自然につながります。'),
      ],
    },
  ],
};

const part5Data = Part5DataSchema.parse({ testId: TEST_ID, part: 5, questions: part5Questions });
const parsedPart6Data = Part6DataSchema.parse(part6Data);
const meta = TestMetaSchema.parse({
  testId: TEST_ID,
  title: 'テストセット01（75分・100問）',
  description: 'TOEIC L&R Readingの現行公式構成に準拠したオリジナル100問セット。Part 5: 30問、Part 6: 16問、Part 7: 単一文書29問・複数文書25問。',
  createdAt: '2026-08-06T21:00:00+09:00',
  tags: ['full-test', '75-minutes', 'original'],
  completeness: { part5: 30, part6: 16, part7: 54 },
});

fs.mkdirSync(TEST_DIR, { recursive: true });
fs.writeFileSync(path.join(TEST_DIR, 'meta.json'), `${JSON.stringify(meta, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(TEST_DIR, 'part5.json'), `${JSON.stringify(part5Data, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(TEST_DIR, 'part6.json'), `${JSON.stringify(parsedPart6Data, null, 2)}\n`, 'utf8');

const indexPath = path.join(DATA_ROOT, 'index.json');
const index = TestIndexSchema.parse(JSON.parse(fs.readFileSync(indexPath, 'utf8')) as unknown);
const tests = [meta, ...index.tests.filter((test) => test.testId !== TEST_ID)];
fs.writeFileSync(indexPath, `${JSON.stringify({ version: 1, tests }, null, 2)}\n`, 'utf8');

console.log(`Generated ${TEST_ID}: Part5=${part5Questions.length}, Part6=16`);
