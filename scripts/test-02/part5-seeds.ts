/**
 * テストセット02 — Part 5（短文穴埋め）シード
 * No.101〜130 の30問。すべてオリジナル問題。
 * 公式問題・市販問題集の文の転載はしない。
 */

import { p5q, type Options4 } from './helpers';
import type { Part5Question } from '../../src/schemas/question.schema';

export const part5Questions: Part5Question[] = [
  // No.101 — 品詞（名詞 vs. 動詞）/ grammar
  p5q(
    101,
    'The board of directors made a ______ to expand operations into Southeast Asia next fiscal year.',
    '取締役会は来会計年度に東南アジアへの事業拡大を決定しました。',
    [
      ['decision', '名詞「決定」。made a decision で「決定を下した」となり、文法と文意の両方に合います。'],
      ['decide', '動詞の原形。冠詞 a の後に動詞原形は置けません。'],
      ['decisive', '形容詞「決定的な」。made a decisive の後には名詞が別途必要で、単独では文が成立しません。'],
      ['decided', '過去形または形容詞。made a decided とすると「明確な」を意味する形容詞用法になりますが、「決定を下す」という本来の意味から外れます。'],
    ] as Options4,
    0,
    '動詞 made と不定冠詞 a に続く空所には名詞が必要です。make a decision「決定を下す」という定型コロケーションを問います。',
    'grammar',
  ),

  // No.102 — 語彙（動詞のコロケーション）/ vocab
  p5q(
    102,
    'The pharmaceutical company plans to ______ clinical trials for the new vaccine by the end of the year.',
    'その製薬会社は年末までに新ワクチンの臨床試験を開始する予定です。',
    [
      ['achieve', '動詞「達成する」。achieve は目標や結果に使い、試験そのものを「始める」意味には合いません。'],
      ['initiate', '動詞「開始する」。initiate clinical trials で「臨床試験を開始する」という自然な表現になります。'],
      ['diagnose', '動詞「診断する」。病気や状態を診断する際に使い、試験を開始する文脈に合いません。'],
      ['prescribe', '動詞「処方する」。薬を処方する際に使い、臨床試験を始める意味にはなりません。'],
    ] as Options4,
    1,
    '文脈から「臨床試験を始める」という動詞を選びます。選択肢はすべて医療・ビジネス分野の動詞ですが、trials を目的語に取って「開始する」意味を正確に表せるのは1つだけです。',
    'vocab',
  ),

  // No.103 — 動詞の形（分詞構文）/ verb_form
  p5q(
    103,
    '______ the proposal carefully before submitting it, the applicant noticed several errors in the final section.',
    '提出前に提案書を注意深く読み返したところ、応募者は最終セクションにいくつかの誤りがあることに気づきました。',
    [
      ['Reviewed', '過去分詞の単独使用。受動の意味になるうえ、直後に目的語 the proposal を取ることができません。'],
      ['To review', 'to 不定詞の副詞的用法。目的「読み返すために」を表しますが、前後の時間関係（先に読み返した）を正確に示せません。'],
      ['Reviews', '三人称単数現在形の動詞。文頭に定形動詞を置くと主節の noticed と動詞が2つになり、接続詞がなければ文法的に成立しません。'],
      ['Having reviewed', '完了分詞構文。主動詞「気づいた」より前に読み返したことを表し、文意と文法の両方に合います。'],
    ] as Options4,
    3,
    '主節の動詞 noticed より先に起きた行為を分詞構文で表す問題です。時間的な前後関係を示す完了分詞（Having + 過去分詞）の用法を問います。',
    'verb_form',
  ),

  // No.104 — 複合前置詞 / preposition
  p5q(
    104,
    '______ the rising cost of raw materials, the procurement team revised the quarterly budget.',
    '原材料費の高騰を踏まえ、調達チームは四半期予算を改訂しました。',
    [
      ['In light of', '複合前置詞「〜を踏まえて」。状況や事実を考慮して行動したことを示し、文意に合います。'],
      ['In spite of', '複合前置詞「〜にもかかわらず」。逆接を表すため、費用上昇を受けて予算を改訂したという論理的な流れと合いません。'],
      ['Instead of', '複合前置詞「〜の代わりに」。費用上昇の代わりに改訂したという意味になり、因果関係が崩れます。'],
      ['As well as', '複合前置詞「〜に加えて」。何かに加えて改訂したという意味になり、原材料費を考慮したという文意を表せません。'],
    ] as Options4,
    0,
    '複合前置詞の意味を問う問題です。後続する名詞句と主節の行動の関係（原因・考慮）から、正確な意味の前置詞句を選びます。',
    'preposition',
  ),

  // No.105 — 語彙（形容詞のコロケーション）/ vocab
  p5q(
    105,
    'The editorial team set a ______ deadline to ensure the annual report would be released before the investor summit.',
    '編集チームは、年次報告書が投資家サミット前に公開できるよう厳格な締め切りを設定しました。',
    [
      ['intense', '形容詞「激しい」「強烈な」。intense は競争や感情の強さを表し、deadline との組み合わせは不自然です。'],
      ['accurate', '形容詞「正確な」。accurate は情報・測定の正確さを表し、締め切りの性質を表す語として文脈に合いません。'],
      ['strict', '形容詞「厳格な」。a strict deadline で「厳格な締め切り」となり、締め切りを確実に守らせる文脈に合います。'],
      ['brief', '形容詞「短い」「簡潔な」。brief deadline とすると「短い締め切り」になりますが、会議が迫る状況で「厳格さ」を示す文意からずれます。'],
    ] as Options4,
    2,
    '名詞 deadline を修飾する形容詞のコロケーションを問います。選択肢はいずれも形容詞ですが、ビジネス文書で deadline と自然に結びつく語を選びます。',
    'vocab',
  ),

  // No.106 — 動詞の形（受動態 + 完了）/ verb_form
  p5q(
    106,
    'The laboratory equipment ______ by a qualified technician before any experiments can proceed.',
    '実験を進める前に、研究室の機器は有資格技術者によって点検されなければなりません。',
    [
      ['must be inspected', '助動詞 must + 受動態の原形。機器が点検される側であり、義務を示す must と合わせて正しい形です。'],
      ['must inspect', '能動態。主語 equipment が自分で点検するという意味になり、論理的に不自然です。'],
      ['must have inspected', '能動態の完了形。機器が何かを点検し終えたという意味になり、受動の意味を表せません。'],
      ['must be inspecting', '進行形の受動態は「現在点検されている最中だ」を表し、これから進む実験の前提条件という文意と合いません。'],
    ] as Options4,
    0,
    '主語 equipment は点検される側のため受動態が必要です。また义務を表す助動詞 must の後に be + 過去分詞を置く受動態の語順を問います。',
    'verb_form',
  ),

  // No.107 — 接続詞（逆接・条件）/ conjunction
  p5q(
    107,
    'The new safety regulations will take effect on July 1 ______ the industry association requests further review.',
    '業界団体がさらなる審査を要請しない限り、新しい安全規制は7月1日に施行されます。',
    [
      ['once', '接続詞「〜したら即座に」。審査要請があった瞬間に施行されるという意味になり、原文の論理と逆になります。'],
      ['unless', '接続詞「〜しない限り」。条件の不成立を表し、審査要請がなければ施行されるという文意に正確に合います。'],
      ['while', '接続詞「〜する間」または「一方で」。施行と審査が同時進行するか対比する意味になり、条件関係を表せません。'],
      ['provided that', '接続詞「〜であるという条件で」。「業界団体が審査を求めることを条件に施行される」という意味になり、原文と逆の因果関係になります。'],
    ] as Options4,
    1,
    '主節（施行される）と従節（審査要請）の論理関係を把握し、正しい接続詞を選ぶ問題です。「〜しない限り」という条件の否定を表す語を見極めます。',
    'conjunction',
  ),

  // No.108 — 語彙（名詞のコロケーション）/ vocab
  p5q(
    108,
    'The HR department issued a ______ reminding all employees to complete their annual compliance training.',
    '人事部は、全従業員に年次コンプライアンス研修の受講を促すお知らせを発行しました。',
    [
      ['notice', '名詞「お知らせ」「通知」。issued a notice で「通知を発行した」という自然な表現になります。'],
      ['notion', '名詞「概念」「考え」。issued a notion とすると「考えを発行した」となり、ビジネス文書の文脈に合いません。'],
      ['novelty', '名詞「目新しさ」「新奇さ」。HR 部門が novelty を発行するという組み合わせは不自然です。'],
      ['nomination', '名詞「指名」「推薦」。研修受講を促す文書を指す語としては意味が合いません。'],
    ] as Options4,
    0,
    'issued a ______ という動詞＋目的語のコロケーションを問います。後ろの reminding 以下の内容から、文書の種類を表す最も適切な名詞を選びます。',
    'vocab',
  ),

  // No.109 — 関係副詞 / grammar
  p5q(
    109,
    'The conference center ______ the award ceremony will be held is located just outside the city.',
    '授賞式が開催されるコンファレンスセンターは市の郊外にあります。',
    [
      ['which', '関係代名詞。先行詞を関係節の主語または目的語として受けますが、この節には主語（ceremony）と動詞（will be held）がそろっているため目的語の位置が埋まっており、which を置く構造上の空所がありません。'],
      ['when', '関係副詞「〜する時」。時を表す先行詞が必要ですが、先行詞は conference center（場所）であり用法が合いません。'],
      ['what', '関係代名詞「〜するもの」。先行詞を含み「〜するもの」を意味するため、すでに先行詞 center がある文には使えません。'],
      ['where', '関係副詞。場所を表す先行詞 conference center を受け、「〜が開催される場所」という関係節を導きます。'],
    ] as Options4,
    3,
    '先行詞が場所を表す名詞で、後続の節が完全な文（主語・動詞がそろっている）であるときに関係副詞 where を使う規則を問います。',
    'grammar',
  ),

  // No.110 — 語彙（動詞の語法）/ vocab
  p5q(
    110,
    'The research institute will ______ a grant from the national science foundation to fund the new study.',
    'その研究所は新しい研究への助成金として国立科学財団から資金援助を受ける予定です。',
    [
      ['receive', '動詞「受け取る」。助成金を出すのは財団側なので、研究所は受け取る側です。from 〜 とも自然に結びつきます。'],
      ['achieve', '動詞「達成する」。目標や成果に使う動詞で、財団から交付される助成金を目的語に取れません。'],
      ['award', '動詞「授与する」。助成金を与える側の動作です。主語が受け取る側の研究所なので方向が逆になります。'],
      ['submit', '動詞「提出する」。提出できるのは助成金の申請書であって助成金そのものではありません。'],
    ] as Options4,
    0,
    '動詞と目的語（grant）のコロケーションを問う問題です。助成金を「出す側」と「受け取る側」のどちらが主語かを見極めます。',
    'vocab',
  ),

  // No.111 — 仮定法過去 / grammar
  p5q(
    111,
    'If the supplier ______ able to deliver the components on schedule, the production line would not have been halted.',
    '供給業者が部品を予定通り納入できていたなら、生産ラインは停止しなかったでしょう。',
    [
      ['were', '仮定法過去の条件節で使う be 動詞の形。現在または未来の反事実を表し、帰結節に would + 原形が必要ですが、ここは would not have been と完了形になっており時制が合いません。'],
      ['is', '直説法現在。仮定法ではなく事実を述べる形のため、would not have been という仮定法の帰結節と呼応しません。'],
      ['had been', '仮定法過去完了の条件節で使う had + 過去分詞。「実際には納入できなかった」という反事実を示し、帰結節の would not have been と呼応します。'],
      ['was', '直説法過去または仮定法過去（口語）。仮定法過去の was は現在の反事実に使い、過去の反事実を示す本文の帰結節 would not have been とは時制が合いません。'],
    ] as Options4,
    2,
    '帰結節 would not have been halted（仮定法過去完了）と時制を合わせる条件節の形を問います。過去の反事実を表す仮定法過去完了の if 節では had + 過去分詞を使います。',
    'grammar',
  ),

  // No.112 — 語彙（副詞のコロケーション）/ vocab
  p5q(
    112,
    'The logistics manager confirmed that all shipments had cleared customs and were ______ to the distribution center.',
    '物流マネージャーは、すべての出荷品が通関を終え配送センターへ輸送中であることを確認しました。',
    [
      ['en route', 'be en route to 〜 で「〜へ向かう途中である」という定型表現。輸送中であることを表し文意に合います。'],
      ['underway', '「進行中で」を表す形容詞。事業や作業が進んでいる状態に使い、後ろに to 〜 を続けて行き先を示すことはできません。'],
      ['forward', '「前方へ」を表す副詞。were forward to という形は成立せず、移動先を示す表現にもなりません。'],
      ['ahead', '「先に」を表す副詞。were ahead to という形は取れず、ahead を使うなら ahead of 〜 の形が必要です。'],
    ] as Options4,
    0,
    '空所の後の to the distribution center と結びつく定型表現を問います。「輸送中」を表す be en route to のイディオムを知っているかがポイントです。',
    'vocab',
  ),

  // No.113 — 複合前置詞 / preposition
  p5q(
    113,
    'All contractors must adhere to safety procedures ______ the provisions outlined in Section 4 of the agreement.',
    'すべての契約業者は、協定第4条に定める規定に従って安全手順を遵守しなければなりません。',
    [
      ['in addition to', '複合前置詞「〜に加えて」。規定に加えてさらに守るという意味になり、「規定に従う」という文意と論理がずれます。'],
      ['in accordance with', '複合前置詞「〜に従って」。規定に従って手順を守るという意味を正確に表します。'],
      ['with respect to', '複合前置詞「〜に関して」。「規定に関して安全手順を守る」という意味になりますが、具体的な準拠を示す in accordance with ほど明確ではありません。'],
      ['regardless of', '複合前置詞「〜にかかわらず」。規定に関係なく守るという意味になり、規定を根拠とする文意と矛盾します。'],
    ] as Options4,
    1,
    '規定や規則への準拠を表す複合前置詞を選ぶ問題です。adhere to との組み合わせで「規定に従って」を意味する表現を選びます。',
    'preposition',
  ),

  // No.114 — 倒置（Not until）/ grammar
  p5q(
    114,
    'Not until the project manager reviewed the final draft ______ that several critical data points were missing.',
    'プロジェクトマネージャーが最終草稿を確認して初めて、いくつかの重要なデータポイントが欠落していることが分かりました。',
    [
      ['did it become clear', '否定語句 Not until が文頭に置かれた倒置構文。助動詞 did を主語 it の前に出し、動詞の原形 become を続けます。'],
      ['it became clear', '倒置なしの語順。Not until が文頭に来た場合、主節は倒置しなければならないため、この語順は文法的に誤りです。'],
      ['it becomes clear', '現在時制かつ倒置なし。文頭の否定語句による倒置と過去時制の両方に反します。'],
      ['did become clear it', '助動詞 did は正しく文頭に出ていますが、主語 it と動詞 become の語順が逆になっており非文法的です。'],
    ] as Options4,
    0,
    '否定語句 Not until が文頭に出た場合の主節の倒置（助動詞を主語の前に置く）を問います。倒置後の語順 did + 主語 + 動詞原形 を正確に組み立てる必要があります。',
    'grammar',
  ),

  // No.115 — 語彙（動詞＋前置詞のコロケーション）/ vocab
  p5q(
    115,
    'The startup has been struggling to ______ with the rapid changes in consumer demand.',
    'そのスタートアップ企業は消費者需要の急速な変化に対応しようと苦労しています。',
    [
      ['put up', '動詞句「〜を我慢する」「〜を泊める」。put up with は「〜を我慢する」を意味し、変化に「対応する」という文意に合いません。'],
      ['make up', '動詞句「〜を補う」「〜を構成する」。make up with には「仲直りする」の意味もあり、消費者需要との文脈には合いません。'],
      ['give up', '動詞句「〜を諦める」。give up on（諦める）の形で使いますが、前置詞 with とはセットにならず、文意も「諦める」とは真逆です。'],
      ['keep up', '動詞句「〜に遅れずついていく」。keep up with changes で「変化に対応し続ける」という自然な表現になります。'],
    ] as Options4,
    3,
    '動詞句＋前置詞のコロケーションを問う問題です。「変化に遅れずついていく」という文意に合う動詞句と、後続の前置詞 with との組み合わせを選びます。',
    'vocab',
  ),

  // No.116 — 語彙（形容詞の意味と語法）/ vocab
  p5q(
    116,
    'The board found the financial projections ______ and asked for a more detailed breakdown.',
    '取締役会は財務予測が不明瞭だと感じ、より詳細な内訳を求めました。',
    [
      ['vague', '形容詞「不明瞭な」「漠然とした」。found the projections vague で「予測が不明瞭だと分かった」となり、詳細な内訳を求める流れと一致します。'],
      ['valid', '形容詞「有効な」「妥当な」。予測が妥当だと分かったなら詳細な内訳を求める理由がなく、後半の行動と矛盾します。'],
      ['verbose', '形容詞「冗長な」「言葉数が多すぎる」。財務予測が「言葉数が多すぎる」という批判は可能ですが、内訳を求める理由としては不自然です。'],
      ['viable', '形容詞「実行可能な」。予測が実行可能だと分かったにもかかわらず詳細を求めるという流れが論理的に不自然です。'],
    ] as Options4,
    0,
    'find O C（目的語を C だと分かる）の C の位置に入る形容詞を、後続の行動（詳細な内訳を要求）から推測する語彙・文脈問題です。',
    'vocab',
  ),

  // No.117 — 動詞の形（倒置 Only after）/ verb_form
  p5q(
    117,
    'Only after the merger ______ finalized will the two companies begin joint marketing efforts.',
    '合併が最終決定されて初めて、両社は共同マーケティング活動を開始します。',
    [
      ['will be', '未来形の受動態。Only after 節の中では現在時制で未来を表すのが文法上の原則であり、節の内部に will を置くことはできません。'],
      ['is', '三人称単数現在形の be 動詞。受動態 is finalized で「合併が最終決定される」を表し、Only after 節で未来の出来事を現在時制で表す用法に合います。'],
      ['would be', '仮定法または過去未来の形。主節が will begin という直説法の未来であり、条件節に would を置くと時制の対応が崩れます。'],
      ['was', '過去形の受動態。主節が未来形（will begin）であるため、条件節を過去形にすると時制の論理が崩れます。'],
    ] as Options4,
    1,
    'Only after が文頭に出た倒置構文で、after 節の内部の動詞形を問います。時・条件節では現在時制で未来を表す規則と、受動態の形を組み合わせます。',
    'verb_form',
  ),

  // No.118 — 語彙（名詞の選択）/ vocab
  p5q(
    118,
    'The hospital administrator sent a ______ to all nursing staff outlining the updated patient intake procedures.',
    '病院管理者は、更新された患者受入手順を概説する覚書を全看護スタッフに送付しました。',
    [
      ['memorandum', '名詞「覚書」。組織内の正式な通知文書を表し、手順変更を周知する文脈に合います。'],
      ['memoir', '名詞「回顧録」。個人の思い出を記した著作物を指し、業務手順の周知文書には使いません。'],
      ['memorial', '名詞「記念碑」「追悼」。記念または追悼の意味であり、業務通知の文脈に合いません。'],
      ['medium', '名詞「媒体」「手段」。手順を伝える手段（媒体）という意味合いでは使えず、sent a medium という表現も不自然です。'],
    ] as Options4,
    0,
    '動詞 sent の目的語として適切な文書の種類を表す名詞を選びます。後続の outlining 以下の内容から、正式な社内通知文書を表す語を選びます。',
    'vocab',
  ),

  // No.119 — 複合関係詞（whoever）/ pronoun
  p5q(
    119,
    '______ is selected as the new regional director will need to relocate to the Osaka office within three months.',
    '新しい地域ディレクターに選ばれた人は、3か月以内に大阪オフィスへ転居する必要があります。',
    [
      ['Who', '疑問詞または関係代名詞。疑問詞として使う場合は間接疑問の語順が必要で、関係代名詞として使う場合は先行詞が必要ですが、ここには先行詞がありません。'],
      ['Whomever', '複合関係詞の目的格。is selected の主語の位置に目的格を置くことはできません。'],
      ['Whoever', '複合関係詞「〜する人は誰でも」。先行詞を含む名詞節を導き、文の主語として機能します。'],
      ['Whose', '所有格の関係詞・疑問詞。直後に名詞を伴う必要があり、is selected の主語として単独では使えません。'],
    ] as Options4,
    2,
    '文の主語になる名詞節を導く複合関係詞を選ぶ問題です。先行詞なしで「〜する人は誰でも」を表せる複合関係詞の主格の形を問います。',
    'pronoun',
  ),

  // No.120 — 語彙（動詞の語法）/ vocab
  p5q(
    120,
    'The audit revealed that the accounting department had failed to ______ all travel expenses to the correct cost center.',
    '監査により、経理部門がすべての出張費用を正しいコストセンターに配賦していなかったことが明らかになりました。',
    [
      ['allocate', '動詞「配分する」「割り当てる」。費用を適切なコストセンターに割り当てるという会計業務の文脈に合います。'],
      ['accumulate', '動詞「蓄積する」「積み重ねる」。費用が積み上がるという意味では使えますが、費用を特定のコストセンターに「振り分ける」という操作を表せません。'],
      ['alleviate', '動詞「緩和する」「軽減する」。問題や苦痛を和らげる際に使い、費用の配賦という文脈に合いません。'],
      ['articulate', '動詞「明確に述べる」「表現する」。意見や考えを明確に伝える際に使い、費用の会計処理を指す語としては不適切です。'],
    ] as Options4,
    0,
    '会計・財務の文脈で費用を特定の科目や部門に「割り当てる」動詞を選ぶ問題です。選択肢はいずれも al- で始まりますが、語義から正しい動詞を見極めます。',
    'vocab',
  ),

  // No.121 — 接続詞（譲歩節）/ conjunction
  p5q(
    121,
    'The documentary received widespread critical acclaim ______ it was produced on a limited budget.',
    'そのドキュメンタリーは限られた予算で制作されたにもかかわらず、広く批評家に絶賛されました。',
    [
      ['now that', '接続詞「今や〜なので」。理由・原因を表し、「今や予算が限られているので絶賛された」という意味になり、論理的に成立しません。'],
      ['so that', '接続詞「〜するために」または「その結果〜」。予算が限られるように絶賛された、または絶賛されたのでさらに予算が限られた、という意味になり文意と合いません。'],
      ['in case', '接続詞「〜に備えて」。備えの意味であり、ドキュメンタリーの評価と予算の逆接関係を表せません。'],
      ['even though', '接続詞「〜にもかかわらず」。譲歩を表し、限られた予算という不利な条件にもかかわらず絶賛されたという逆接の文意に合います。'],
    ] as Options4,
    3,
    '前後の節の論理関係（逆接）を見極めて接続詞を選ぶ問題です。後半が「限られた予算」という不利な条件で、前半が「絶賛された」という好結果であることから逆接の接続詞を選びます。',
    'conjunction',
  ),

  // No.122 — 語彙（動詞）/ vocab
  p5q(
    122,
    'The publishing house plans to ______ its entire back catalog in digital format by the end of next quarter.',
    'その出版社は来期末までに全バックカタログをデジタル形式で提供する計画です。',
    [
      ['release', '動詞「発売する」「公開する」。カタログを特定の形式で提供・公開するという意味に合います。'],
      ['relocate', '動詞「移転する」「移動させる」。出版社や物品の場所を移す際に使い、コンテンツを形式変換して提供する文脈に合いません。'],
      ['resolve', '動詞「解決する」「解消する」。問題やトラブルを解決する際に使い、カタログを提供するという文脈には合いません。'],
      ['restore', '動詞「回復させる」「復元する」。以前の状態に戻す際に使い、バックカタログをデジタル形式で新たに提供するという文脈に合いません。'],
    ] as Options4,
    0,
    '出版・コンテンツ業界の文脈で「カタログを（形式変換して）提供・公開する」動詞を選ぶ問題です。選択肢はいずれも re- で始まりますが、語義を正確に区別します。',
    'vocab',
  ),

  // No.123 — 品詞（副詞）/ grammar
  p5q(
    123,
    'The quality control manager reviewed each batch ______, checking for inconsistencies in texture and color.',
    '品質管理マネージャーは、質感と色のばらつきを確認しながら各ロットを入念に確認しました。',
    [
      ['meticulous', '形容詞「入念な」。動詞を直接修飾することはできず、補語の位置でもないため文法的に不適切です。'],
      ['meticulously', '副詞「入念に」「綿密に」。動詞 reviewed を修飾し、細部まで丁寧に確認したという文意に合います。'],
      ['meticulousness', '名詞「入念さ」。副詞の役割を担えず、reviewed の直後に前置詞なしで置くこともできません。'],
      ['more meticulous', '形容詞の比較級。動詞を修飾する副詞の役割を果たせず、比較対象も示されていません。'],
    ] as Options4,
    1,
    '動詞 reviewed を修飾する語の品詞を問う問題です。動詞を修飾できるのは副詞のみであることを確認し、適切な形を選びます。',
    'grammar',
  ),

  // No.124 — 数量表現と動詞の一致 / grammar
  p5q(
    124,
    'A number of defective units ______ detected during the final inspection and returned to the manufacturer.',
    '最終検査で複数の不良品が発見され、製造業者に返品されました。',
    [
      ['were', '複数扱いの be 動詞過去形。a number of は「多くの〜」という意味で後ろの複数名詞 units に動詞を一致させるため、were が正しい形です。'],
      ['was', '単数扱いの be 動詞過去形。the number of（〜の数は）なら単数扱いですが、a number of（多くの〜）は複数扱いになります。'],
      ['has been', '現在完了の単数形。時制が不一致（during the final inspection は過去の一点）で、かつ単数形であるため a number of units には合いません。'],
      ['is', '単数扱いの be 動詞現在形。複数名詞 units と一致せず、過去の検査を述べる文脈で現在形も使えません。'],
    ] as Options4,
    0,
    'a number of と the number of の区別、および後続名詞との動詞一致を問う問題です。a number of は「多くの〜」で複数扱い、the number of は「〜の数」で単数扱いになります。',
    'grammar',
  ),

  // No.125 — 語彙（形容詞）/ vocab
  p5q(
    125,
    'The spokesperson was ______ in her responses to avoid making any premature announcements about the merger.',
    '広報担当者は、合併に関する時期尚早な発表を避けるため、慎重な言い回しで質問に答えました。',
    [
      ['candid', '形容詞「率直な」。率直に答えたなら時期尚早な発表を避けるという後半の意図と矛盾します。'],
      ['fluent', '形容詞「流暢な」。言語能力を表し、発言内容を慎重にコントロールするという文脈とは別の意味です。'],
      ['generous', '形容詞「寛大な」「惜しみない」。寛大に答えたなら情報を制限しようとする意図とは逆になります。'],
      ['guarded', '形容詞「慎重な」「用心深い」。be guarded in responses で「慎重な言い回しで答える」となり、情報漏洩を避ける文脈に合います。'],
    ] as Options4,
    3,
    'be ______ in responses という表現の空所に入る形容詞を、後半の「時期尚早な発表を避ける」という目的から推測します。発言を意図的に制限するニュアンスを持つ語を選びます。',
    'vocab',
  ),

  // No.126 — 動詞の形（分詞の後置修飾）/ verb_form
  p5q(
    126,
    'The company\'s new wellness program, ______ in partnership with a local healthcare provider, offers monthly health screenings.',
    '地域の医療機関と提携して設計された同社の新しいウェルネスプログラムは、月次の健康診断を提供します。',
    [
      ['designed', '過去分詞。program は「設計される」側のため受動の意味を持つ過去分詞が必要です。分詞句が program を後置修飾します。'],
      ['designing', '現在分詞。program が自分で設計するという能動の意味になり、論理的に不自然です。'],
      ['to design', 'to 不定詞の形容詞的用法。「設計するための」という目的を表しますが、「設計された」という既存の事実を表す文意には合いません。'],
      ['has designed', '現在完了の定形動詞。関係節の動詞なら that the program has designed の形にする必要があり、単独で名詞を修飾する分詞句の機能を果たせません。'],
    ] as Options4,
    0,
    '主語 program を後置修飾する分詞句の形を問います。program が「設計される」対象であるため受動の意味を持つ過去分詞（designed）を選びます。',
    'verb_form',
  ),

  // No.127 — 接続詞（従属節の種類）/ conjunction
  p5q(
    127,
    'Please reply to this invitation ______ you will be able to join us, so we can adjust the seating arrangement.',
    'ご参加いただけるかどうかにかかわらず、この招待状にご返信ください。座席配置を調整いたします。',
    [
      ['although', '接続詞「〜にもかかわらず」。参加できるのに返信を求める、という不自然な逆接になり文意が通りません。'],
      ['whether or not', '「〜かどうかにかかわらず」。出欠どちらの場合でも返信を求める意味になり、座席調整という主節の目的に自然につながります。'],
      ['due to', '前置詞句「〜のために」。後ろには名詞句しか置けず、you will be able to join us という節を導けません。'],
      ['however', '副詞「しかしながら」。接続詞ではないため、2つの節を直接つなぐことはできません。'],
    ] as Options4,
    1,
    '節を導けるかどうか（品詞）と、主節との論理関係の両方を見る問題です。出欠いずれの場合も返信を求める意味を表せる表現を選びます。',
    'conjunction',
  ),

  // No.128 — 語彙（前置詞を伴う動詞の語法）/ vocab
  p5q(
    128,
    'After reviewing the client\'s feedback, the design team ______ up with a much simpler navigation menu.',
    'クライアントのフィードバックを検討した後、デザインチームははるかに簡潔なナビゲーションメニューを考案しました。',
    [
      ['came', 'come up with で「（案を）思いつく・考案する」という句動詞。新しいメニューを考え出したという文意に合います。'],
      ['put', 'put up with は「〜を我慢する」。不満に耐える意味になり、案を生み出す文脈に合いません。'],
      ['took', 'take up は「（趣味などを）始める」。take up with 〜 という形で案を考案する意味にはなりません。'],
      ['kept', 'keep up with は「〜に遅れずについていく」。既存のものに追随する意味で、新しい案を作り出す動作を表せません。'],
    ] as Options4,
    0,
    '動詞＋副詞＋前置詞からなる3語の句動詞を問う問題です。up with と結びついて「考案する」を表す動詞を選びます。',
    'vocab',
  ),

  // No.129 — 複合関係詞（whichever）/ grammar
  p5q(
    129,
    'Employees may select ______ health insurance plan best suits their family\'s needs.',
    '従業員は、家族のニーズに最も合う健康保険プランを自由に選択できます。',
    [
      ['whoever', '複合関係詞「〜する人は誰でも」。人を指すため、直後の名詞 health insurance plan を修飾できません。'],
      ['whenever', '複合関係詞「〜するときはいつでも」。時を表し、プランを選ぶという目的語の役割を果たせません。'],
      ['whichever', '複合関係詞「〜するどれでも」。複数のプランの中から自由に選べることを示し、先行詞なしで名詞節を導いて select の目的語になります。'],
      ['wherever', '複合関係詞「〜するどこでも」。場所を表し、保険プランを選ぶ目的語の役割を果たせません。'],
    ] as Options4,
    2,
    '複合関係詞の種類を選ぶ問題です。限定された選択肢（複数の保険プラン）の中から自由に選ぶ場合は whichever を、制限のない「何でも」の場合は whatever を使います。',
    'grammar',
  ),

  // No.130 — 語彙（副詞）/ vocab
  p5q(
    130,
    'The translation was ______ accurate, but some industry-specific terminology had been misinterpreted.',
    '翻訳はおおむね正確でしたが、一部の業界固有の専門用語は誤訳されていました。',
    [
      ['largely', '副詞「おおむね」「大部分において」。largely accurate で「おおむね正確だが完全ではない」という意味になり、後半の「一部の用語が誤訳された」という逆接と自然につながります。'],
      ['entirely', '副詞「完全に」。entirely accurate とすると「完全に正確だった」となり、後半で誤訳があったという逆接と矛盾します。'],
      ['barely', '副詞「かろうじて」「ほとんど〜ない」。barely accurate とすると「ほとんど正確ではなかった」となり、but で逆接する後半の内容との論理関係が崩れます。'],
      ['highly', '副詞「非常に」「高度に」。highly accurate は「非常に正確だった」を意味し、後半の誤訳との逆接を自然に説明できません。'],
    ] as Options4,
    0,
    '後半の逆接節（but some terminology had been misinterpreted）を踏まえ、「おおむね〜だが完全ではない」という意味合いを表せる副詞を選ぶ問題です。',
    'vocab',
  ),
];
