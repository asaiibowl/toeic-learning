/**
 * test-02 Part 6 — 長文穴埋め（No.131〜146、4文書×4問）
 *
 * 題材:
 *   文書1 (notice)  : 大学研究所の共用機器 予約ポリシー変更
 *   文書2 (memo)    : 物流会社の配送ルート再編と担当者への指示
 *   文書3 (email)   : 地域クリニックの予約システム移行案内（患者向け）
 *   文書4 (article) : 出版社が電子版を創刊したという業界記事
 *
 * 難易度: TOEIC 730〜860 帯（やや難）
 * すべてオリジナル問題。架空の人名・社名・ドメイン使用。
 */

import { p6Passage, p6q } from './helpers';
import type { Part6Passage } from '../../src/schemas/question.schema';

export const part6Passages: Part6Passage[] = [
  // ============================================================
  // 文書1: notice — 大学研究所の共用機器 予約ポリシー変更
  // 問番号: 131〜134
  // ============================================================
  p6Passage(
    1,
    'notice',
    'Updated Reservation Policy for Shared Research Equipment',
    [
      // 段落0
      [
        'To: All Research Staff\nFrom: Laboratory Services Office\n\nBeginning March 1, all research groups must reserve shared instruments ______[131] the online portal at labportal.westerfield.example. Requests submitted through any other channel will no longer be accepted. The new system allows users to view real-time availability and receive automatic confirmation within minutes of booking.',
        '宛先：全研究スタッフ\n送信者：実験室サービス部\n\n3月1日より、全研究グループは共用機器をlabportal.westerfield.exampleのオンラインポータル経由で予約しなければなりません。他の経路で提出されたリクエストは受け付けられなくなります。新システムにより、ユーザーはリアルタイムの空き状況を確認し、予約から数分以内に自動確認を受け取ることができます。',
      ],
      // 段落1
      [
        'Equipment that is ______[132] for scheduled maintenance will be marked as unavailable on the calendar. In such cases, researchers are advised to plan their experiments accordingly. ______[133] Requests received after 5:00 P.M. will be processed the following morning. For urgent reservations outside normal hours, please contact the on-call technician directly at ext. 4402.',
        '定期メンテナンスのため予約不可の機器はカレンダー上で利用不可と表示されます。その場合、研究者は実験計画を適切に調整されることをお勧めします。緊急の予約についても、翌朝の処理を円滑にするため、前日の午後5時までに登録することをお勧めします。午後5時以降に受け付けたリクエストは翌朝に処理されます。通常時間外の緊急予約は、内線4402のオンコール技術者に直接ご連絡ください。',
      ],
      // 段落2
      [
        'Groups that repeatedly fail to cancel unused reservations may ______[134] lose booking privileges for a period of up to four weeks. The Laboratory Services Office appreciates your cooperation in keeping shared resources available to all teams.',
        '未使用の予約をキャンセルしないことを繰り返すグループは、最長4週間、予約権限を失う場合があります。実験室サービス部は、共有リソースをすべてのチームが利用できる状態に保つためのご協力に感謝します。',
      ],
    ],
    [
      // No.131: 前置詞 — 「オンラインポータル経由で」
      // targetIndex=0(A) → correctIndex=0 → shift=0（シフトなし）
      p6q(
        131,
        'blank',
        [
          ['through', '手段・経路を表す前置詞で、「オンラインポータルを通じて」という予約手段を正確に示します。'],
          ['among', '「〜の間で」という複数のものの中の位置関係を示す前置詞で、手段・経路を表せません。'],
          ['toward', '「〜の方向へ」という方向性を示す前置詞で、予約の手段を表す文脈には合いません。'],
          ['despite', '「〜にもかかわらず」という譲歩を示す前置詞で、空所前後が逆接の関係にないため文脈に合いません。'],
        ],
        0, // 正解: through（correctIndex=0 → targetIndex=0 → shift=0）
        '空所の後は名詞句（the online portal）なので前置詞が必要です。「〜を通じて」という手段・経路を表す through が文意と一致します。',
        [0, 'must reserve shared instruments ______[131] the online portal'],
      ),
      // No.132: 語形変化 — 「メンテナンスのため予約不可の」
      // targetIndex=1(B) → correctIndex=0 → shift=1（元の0番目→1番目Bになるよう1つシフト）
      p6q(
        132,
        'blank',
        [
          ['reserved', '「予約された」という意味の過去分詞で、「メンテナンスのために取り置かれた」という意味に最も近く文意に合います。'],
          ['reserve', '動詞の原形で、be 動詞の後に置くには受動態の過去分詞か進行形の -ing 形が必要であり、文法的に不自然です。'],
          ['reserving', '現在分詞で is reserving とすれば進行形になりますが、機器が自発的に何かを予約しているという解釈は文脈に合いません。'],
          ['reservation', '名詞で、be 動詞の後には置けますが「機器が予約である」という意味になり文意が通りません。'],
        ],
        0, // 正解: reserved（correctIndex=0 → targetIndex=1 → shift=1）
        'be 動詞の後に空所があり、Equipment が主語です。機器は「メンテナンスのために確保されている」側なので、受動態を作る過去分詞 reserved が適切です。文脈から「scheduled maintenance のために確保された」という意味が読み取れます。',
        [1, 'Equipment that is ______[132] for scheduled maintenance'],
      ),
      // No.133: 接続副詞 / 文脈依存 — insertion
      // targetIndex=2(C) → insertion問題の4選択肢は完全な文
      p6q(
        133,
        'insertion',
        [
          ['The laboratory was renovated during the summer break last year.', '昨年夏休み中に行われた改装に関する情報で、予約の締め切り時刻や処理手順という文脈から話題がずれており、直前・直後の文とのつながりがありません。'],
          ['However, all staff members are required to attend a safety training session.', '接続副詞 however で始まり逆接を示しますが、前文（機器の利用不可表示）と後続文（午後5時以降の処理）の間に逆接の関係は存在せず、文脈に合いません。'],
          ['To facilitate timely processing, researchers are encouraged to submit requests by 5:00 P.M. the day before.', '「翌朝の処理を円滑にするため、前日の午後5時までにリクエストを提出することを推奨する」という内容で、直後の「午後5時以降のリクエストは翌朝に処理」という文への橋渡しとして自然につながります。'],
          ['All research projects must be approved by the department head before starting.', '承認手続きについての文で、予約の時刻制限や処理手順を説明する段落の流れから外れており、前後の文と話題が一致しません。'],
        ],
        2, // 正解: To facilitate...（correctIndex=2 → targetIndex=2 → shift=0）
        '空所の直後に「午後5時以降のリクエストは翌朝に処理される」とあります。前日の午後5時までに提出を促す理由を説明する文が挿入されると、翌文への論理的な流れが生まれます。直前の文（メンテナンス中の対応）から予約手続きの注意事項へ移行する段落の文脈にも合致します。',
      ),
      // No.134: 語彙（副詞）— 直後の for a period of up to four weeks から期間限定の措置と分かる
      p6q(
        134,
        'blank',
        [
          ['temporarily', '「一時的に」という意味の副詞。直後の for a period of up to four weeks（最長4週間）と呼応し、期間を区切った措置であることを示します。'],
          ['consistently', '「一貫して」という意味の副詞。行為の継続性を表す語で、権限を失う側の状態を「最長4週間」と限定する文脈には合いません。'],
          ['mutually', '「相互に」という意味の副詞。二者が互いに何かをする場合に使い、違反したグループが一方的に権限を失う場面には使えません。'],
          ['formerly', '「以前は」という意味の副詞。過去の状態を示すため、これから科される措置を述べる may lose とは時間の向きが合いません。'],
        ],
        0,
        '空所は may と lose の間に入る副詞です。直後の「最長4週間」という期間の限定と矛盾しない語を選びます。',
        [2, 'for a period of up to four weeks'],
      ),
    ],
  ),

  // ============================================================
  // 文書2: memo — 物流会社の配送ルート再編と担当者への指示
  // 問番号: 135〜138
  // ============================================================
  p6Passage(
    2,
    'memo',
    'Route Restructuring — Action Required by All Delivery Coordinators',
    [
      // 段落0
      [
        'To: Delivery Coordinators, Hartwell Freight Solutions\nFrom: Operations Manager, Derek Callum\nDate: February 14\n\nEffective April 1, Hartwell Freight Solutions will implement a revised delivery route structure for the northern and central regions. This change is ______[135] to reduce fuel costs by an estimated 12 percent and improve on-time delivery rates.',
        '宛先：配送コーディネーター各位、Hartwell Freight Solutions\n送信者：オペレーションマネージャー、Derek Callum\n日付：2月14日\n\n4月1日より、Hartwell Freight Solutionsは北部および中央地域の配送ルート体制を改訂します。この変更は燃料コストを推定12パーセント削減し、定時配送率を向上させることを目的としています。',
      ],
      // 段落1
      [
        'Each coordinator is required to review the new route maps, ______[136] have been shared on the internal network drive at \\\\hfs-server\\routes\\2026. You should also update your client contact lists to reflect any reassigned delivery windows. ______[137] Any discrepancies between your current assignments and the new route map must be reported to Mr. Callum by March 10.',
        '各コーディネーターは、社内ネットワークドライブ（\\\\hfs-server\\routes\\2026）で共有されている新しいルートマップを確認する必要があります。また、再割り当てされた配送時間帯を反映するよう顧客連絡先リストを更新してください。クライアントへの通知については、4月1日の少なくとも2週間前に書面で送付することが義務付けられています。現在の担当と新しいルートマップとの差異は3月10日までにCallum氏に報告してください。',
      ],
      // 段落2
      [
        'A briefing session will be ______[138] on February 28 in the main conference room at 10:00 A.M. Attendance is mandatory for all coordinators. Presentations and Q&A materials will be available afterward on the same network drive.',
        '説明会は2月28日午前10時に本社会議室で開催されます。全コーディネーターの出席が義務付けられています。プレゼンテーションおよびQ&A資料は、終了後に同じネットワークドライブで入手できます。',
      ],
    ],
    [
      // No.135: 語形変化 — be expected / intended / designed to のいずれか
      // targetIndex=0(A)
      p6q(
        135,
        'blank',
        [
          ['intended', '「〜を意図して行われる」という意味の過去分詞で、be 動詞との組み合わせで受動態を形成し、変更の目的を示すのに適しています。'],
          ['intends', '三単現の動詞ですが、主語は This change（無生物）であり、自発的意図を持つ主体として使うには意味が不自然で、後続の to 不定詞とも構造が合いません。'],
          ['intending', '現在分詞で is intending とすれば進行形になりますが、目的・意図を示すには受動態の is intended to が標準的な表現であり、このコンテキストでは不自然です。'],
          ['intention', '名詞で、be 動詞の後に「This change is intention」という形は文法的に不成立です。to 不定詞を後続させる構造も作れません。'],
        ],
        0, // 正解: intended（correctIndex=0 → targetIndex=0 → shift=0）
        'be 動詞＋空所＋to 不定詞という構造から、「〜するために意図/設計されている」という受動態の表現が必要です。This change という無生物主語に対して目的を述べるには be intended to が慣用的に使われます。',
        [0, 'This change is ______[135] to reduce fuel costs'],
      ),
      // No.136: 関係代名詞 — which / that の選択（前置詞なし・非制限用法）
      // targetIndex=0(A)
      p6q(
        136,
        'blank',
        [
          ['which', '先行詞 the new route maps を受ける非制限用法の関係代名詞で、コンマの後に置かれた補足説明の節を正しく導きます。'],
          ['that', '制限用法の関係代名詞で、コンマで区切られた非制限用法の節では使用できません。コンマの後に that を置く構文は標準的な英語では認められません。'],
          ['those', '指示代名詞で関係節を導く機能はなく、後続の「have been shared」という完全な節を文法的につなぐことができません。'],
          ['what', '関係代名詞 what は先行詞を含んでおり、先行詞（the new route maps）が別に存在する文脈では使用できません。'],
        ],
        0, // 正解: which（correctIndex=0 → targetIndex=0 → shift=0）
        '空所の前にコンマがあり、先行詞は the new route maps です。コンマ＋関係代名詞という非制限用法の関係節なので、which が唯一適切な選択肢です。that は非制限用法で使えないというルールが鍵となります。',
        [1, 'review the new route maps, ______[136] have been shared on the internal network drive'],
      ),
      // No.137: insertion — 客への通知義務についての文
      // targetIndex=3(D)
      p6q(
        137,
        'insertion',
        [
          ['All fuel receipts must be submitted to the finance department by the end of each month.', '燃料費の領収書提出に関する内容で、ルート変更に伴う顧客連絡先リストの更新という直前の指示と話題が断絶しており、直後の「差異の報告」とも自然につながりません。'],
          ['Mr. Callum joined Hartwell Freight Solutions fourteen years ago as a junior driver.', 'Derek Callum の経歴紹介で、コーディネーターへの具体的な業務指示が続く段落の流れから完全に逸脱しており、前後どの文とも論理的につながりません。'],
          ['The northern region currently handles more than two hundred daily deliveries.', '北部地域の配送量という統計情報で、新しい情報として興味深い一方、顧客への通知手順と差異報告という直前・直後の指示の流れを断ち切ってしまいます。'],
          ['Clients must be notified in writing at least two weeks before April 1.', '顧客への書面通知の締め切りを指示する文で、直前の「顧客連絡先リストを更新する」という指示を受けて具体的な行動基準を補足し、直後の「差異の報告期限（3月10日）」と並んで業務上の期限を整理する流れに自然に収まります。'],
        ],
        3, // 正解: Clients must be notified...（correctIndex=3 → targetIndex=3 → shift=0）
        '空所の直前に「顧客連絡先リストを更新せよ」という指示があり、直後に「3月10日までに差異を報告せよ」という期限があります。「顧客への書面通知を4月1日の少なくとも2週間前に行う」という文を挿入すると、更新の目的（通知）と期限（4月1日の2週間前）が明示され、その後の報告期限（3月10日）へも流れが続きます。',
      ),
      // No.138: 語形変化 — held / scheduled / conducted
      // targetIndex=2(C)
      p6q(
        138,
        'blank',
        [
          ['hold', '動詞の原形で、be 動詞の後には受動態を作る過去分詞か進行形の現在分詞が必要であり、原形をそのまま置くことはできません。'],
          ['holding', '現在分詞で is holding とすれば「（誰かが）開催している」という能動進行形になりますが、主語 A briefing session は開催される側であり、能動態は意味的に不自然です。'],
          ['held', '過去分詞で、will be held とすれば「開催される予定」という受動態の未来表現になります。定期的に使われる慣用表現で、会議・説明会の告知に最も適切です。'],
          ['holder', '「保持者・開催者」という意味の名詞で、be 動詞の後に置くと「briefing session が holder である」という意味になり文意が成立しません。'],
        ],
        2, // 正解: held（correctIndex=2 → targetIndex=2 → shift=0）
        'will be ______[138] という構造から、受動態を作る過去分詞が必要です。「〜で開催される」という予定を示す will be held は説明会・会議の告知で標準的に使われる表現です。',
        [2, 'A briefing session will be ______[138] on February 28'],
      ),
    ],
  ),

  // ============================================================
  // 文書3: email — 地域クリニックの予約システム移行案内（患者向け）
  // 問番号: 139〜142
  // ============================================================
  p6Passage(
    3,
    'email',
    'Important Update: Transition to Online Appointment Booking',
    [
      // 段落0
      [
        'Dear Valued Patient,\n\nWe are writing to inform you that Greendale Family Clinic will be switching to a fully online appointment system beginning May 1. From that date ______[139], all appointment requests must be submitted through our patient portal at appointments.greendaleclinic.example. Our reception team will no longer be able to accept appointment requests by telephone.',
        '患者の皆様へ\n\n5月1日より、Greendale Family Clinicは完全オンライン予約システムに移行することをお知らせします。その日以降、すべての予約リクエストはappointments.greendaleclinic.exampleの患者ポータルを通じて提出する必要があります。受付スタッフは電話による予約受付を行わなくなります。',
      ],
      // 段落1
      [
        'To register for the portal, please visit the website and click "Create Account." You will need your date of birth and the patient ID number printed on your clinic card. ______[140] Once registered, you can view your appointment history, request prescription renewals, and receive test results electronically.',
        'ポータルへの登録は、ウェブサイトにアクセスして「アカウントを作成」をクリックしてください。クリニックカードに印刷された生年月日と患者ID番号が必要です。アカウントの設定についてサポートが必要な場合は、support@greendaleclinic.exampleまでメールでお問い合わせください。登録後は、予約履歴の確認、処方箋の更新申請、検査結果の電子受取が可能になります。',
      ],
      // 段落2
      [
        'We recognize that this transition may require ______[141] on your part, and we appreciate your understanding. For patients who are unable to use the online system, a telephone assistance line will remain ______[142] at (03) 5544-9900 during regular office hours. We look forward to serving you through our improved system.',
        'この移行にはご調整が必要になることを認識しており、ご理解に感謝申し上げます。オンラインシステムをご利用いただけない患者様のために、通常の診療時間中は電話サポートライン（03）5544-9900が引き続きご利用いただけます。改善されたシステムを通じて皆様にサービスを提供できることを楽しみにしています。',
      ],
    ],
    [
      // No.139: 副詞 / 時間表現 — forward / onward / ahead / beyond
      // targetIndex=1(B)
      p6q(
        139,
        'blank',
        [
          ['onward', '「〜以降」という意味で from that date onward は「その日以降ずっと」を表す慣用表現として適切で、変更の発効を示す文脈に自然に合います。'],
          ['along', '「〜に沿って」という副詞・前置詞。時間の起点から先を示す用法はなく、from that date along という形は成立しません。'],
          ['ahead', '「前方に」「先に」という空間・時間的副詞ですが、from that date ahead は慣用表現として一般的ではなく不自然です。'],
          ['beyond', '「〜を超えて」という前置詞・副詞で、from that date beyond は意味的に成立しますが、日時を起点として「以降」を表す慣用表現としては使われません。'],
        ],
        0, // 正解: onward（correctIndex=0 → targetIndex=1 → shift=1）
        '"From that date ______" という表現で「その日以降」という継続的な効力の起点を示す副詞が必要です。from ... onward は「〜以降ずっと」という意味の慣用的な表現で、ポリシーの発効を告知する文脈に最も適しています。',
        [0, 'From that date ______[139], all appointment requests must be submitted'],
      ),
      // No.140: insertion — アカウント設定サポートについての文
      // targetIndex=0(A)
      p6q(
        140,
        'insertion',
        [
          ['If you need assistance setting up your account, please email support@greendaleclinic.example.', 'アカウント設定で困った場合の連絡先を示す文で、直前の「登録手順（生年月日と患者ID番号が必要）」の説明を受け、直後の「登録後にできること」への橋渡しとして論理的に機能します。'],
          ['The clinic has been open for more than twenty years and serves over five thousand patients.', 'クリニックの歴史と規模についての情報で、患者ポータルの登録手順を説明する段落の流れとは無関係で、前後の文とのつながりがありません。'],
          ['Appointments for annual health checkups must be booked at least six weeks in advance.', '年次健康診断の予約に関する規則で、ポータル登録の手順説明という直前・直後の文の流れとは話題が異なり、段落の目的から逸れます。'],
          ['Patients who fail to cancel appointments may be charged a cancellation fee.', 'キャンセルポリシーについての情報で、登録手順と登録後の機能説明という段落の文脈と無関係であり、前後の文に自然につながりません。'],
        ],
        0, // 正解: If you need assistance...（correctIndex=0 → targetIndex=0 → shift=0）
        '空所の直前に「クリニックカードの生年月日と患者ID番号が必要」という登録に必要な情報の説明があり、直後に「登録後は〜ができる」という機能紹介があります。「アカウント設定のサポートが必要ならメールを」という補助情報を挿入すると、手順案内から機能紹介への移行が自然になります。',
      ),
      // No.141: 語彙 — 調整・変更・努力を表す名詞
      // targetIndex=3(D)
      p6q(
        141,
        'blank',
        [
          ['adjustment', '「調整」という意味で、"require adjustment on your part" は「あなた側での調整が必要」という自然な表現です。移行に伴う患者の行動変容を示す文脈に合います。'],
          ['achievement', '「達成・業績」という意味で、移行が困難であるという文脈で「達成が必要」とするのは意味的に不自然です。努力や対応を求める表現にはなりません。'],
          ['assignment', '「課題・割り当て」という意味で、require assignment on your part とすると「あなたへの課題」という不自然なニュアンスになり、移行への対応を患者に求める文意と合いません。'],
          ['announcement', '「発表・告知」という意味で、「発表が必要」とすると主語（this transition）が告知を必要とするという奇妙な意味になり、患者に適応を求める文脈と全く合いません。'],
        ],
        0, // 正解: adjustment（correctIndex=0 → targetIndex=3 → shift=3）
        '"require ______[141] on your part" という表現で、「あなた（患者）側の〜が必要」という意味の名詞が入ります。システム移行に対応するために患者が何かを変える必要があるという文脈から、「調整」を意味する adjustment が最も自然です。achievement・assignment・announcement はこの文脈では意味的に不適切です。',
        [2, 'this transition may require ______[141] on your part'],
      ),
      // No.142: 語形変化 — remain + 形容詞補語
      // targetIndex=2(C)
      p6q(
        142,
        'blank',
        [
          ['availability', '名詞で、a telephone assistance line will remain availability とすると文法的に不成立です。remain の後に名詞を置くと「〜のままである」という補語にはなりません。'],
          ['available', '形容詞で、"will remain available" は「引き続き利用可能である」という意味の自然な表現です。remain は第2文型（SVC）の動詞で補語に形容詞を取ります。'],
          ['avail', '動詞または名詞で、"will remain avail" は文法的に不成立です。「avail oneself of」などの形で使われますが、ここでは不適切です。'],
          ['availably', '副詞ですが、英語として一般的な語ではなく、remain の後に副詞を置く構文も一般的ではありません。'],
        ],
        1, // 正解: available（correctIndex=1 → targetIndex=2 → shift=1）
        '"will remain ______[142]" という構造で、remain は第2文型（SVC）の動詞として補語を取ります。補語の位置には形容詞が必要で、「電話サポートラインが引き続き利用可能である」という意味を作る available が適切です。',
        [2, 'a telephone assistance line will remain ______[142] at'],
      ),
    ],
  ),

  // ============================================================
  // 文書4: article — 出版社が電子版を創刊したという業界記事
  // 問番号: 143〜146
  // ============================================================
  p6Passage(
    4,
    'article',
    'Vantage Press Launches Digital Edition of Industry Quarterly',
    [
      // 段落0
      [
        'Vantage Press announced last week that it will launch a digital edition of Industry Quarterly, its flagship trade publication, starting with the March issue. The decision comes after a two-year study ______[143] by an internal task force that analyzed subscription trends and reader preferences across the company\'s entire portfolio.',
        'Vantage Pressは先週、旗艦業界誌「Industry Quarterly」の電子版を3月号から創刊すると発表しました。この決定は、同社の全ポートフォリオにわたる購読傾向と読者の好みを分析した社内タスクフォースによる2年間の調査を経て下されました。',
      ],
      // 段落1
      [
        'The digital edition will be offered at a ______[144] price compared to the print subscription, reflecting lower production and distribution costs. Current print subscribers will receive access to the digital version at no additional charge for the first six months. ______[145]',
        '電子版は印刷版の購読料と比べて割引価格で提供され、製造・流通コストの低下が反映されます。現在の印刷版購読者は、最初の6か月間は追加料金なしで電子版へのアクセス権を受け取ります。この優待期間終了後、デジタル購読料は月額14ドルとなります。',
      ],
      // 段落2
      [
        'Vantage Press CEO Miriam Okafor said the shift ______[146] the company\'s long-term commitment to accessible and sustainable publishing. "Our readers increasingly expect content on multiple platforms, and we are committed to meeting that demand," she said. The company plans to digitize its back catalog of issues from the past decade as well.',
        'Vantage Press CEOのMiriam Okafor氏は、この転換が同社のアクセスしやすく持続可能な出版への長期的なコミットメントを反映していると述べました。「読者はますます複数のプラットフォームでコンテンツを期待しており、私たちはその需要に応えることを約束します」と同氏は語りました。同社はまた、過去10年間のバックナンバーのデジタル化も計画しています。',
      ],
    ],
    [
      // No.143: 語形変化 — 分詞による後置修飾（conducted）
      // targetIndex=1(B)
      p6q(
        143,
        'blank',
        [
          ['conducting', '現在分詞で能動の意味になりますが、a study が調査を「実施する」主体ではなく「実施された」対象であるため、能動分詞は意味的に不自然です。'],
          ['conducted', '過去分詞で受動の後置修飾を作り、"a study conducted by an internal task force" は「社内タスクフォースによって実施された調査」という自然な表現になります。'],
          ['conduct', '動詞の原形で、名詞（study）の後に動詞原形を置く後置修飾の構文は英語に存在しません。'],
          ['conductive', '「導電性の」という意味の形容詞で、study の後置修飾としても前置修飾としても文意が成立しません。'],
        ],
        1, // 正解: conducted（correctIndex=1 → targetIndex=1 → shift=0）
        '"a two-year study ______[143] by an internal task force" という構造で、study（調査）が後置修飾されています。study は実施される対象なので受動を表す過去分詞 conducted が必要で、"a study conducted by ..." という形が自然な英語表現です。',
        [0, 'a two-year study ______[143] by an internal task force'],
      ),
      // No.144: 語彙 — 割引の形容詞
      // targetIndex=3(D)
      p6q(
        144,
        'blank',
        [
          ['reduced', '「引き下げられた」という意味の形容詞で、"at a reduced price" は「割引価格で」という慣用表現として非常に自然です。後続の「製造コストの低下を反映」という説明とも意味的につながります。'],
          ['shortened', '「短縮された」という意味。長さや期間が短くなることを表す語で、価格を修飾することはできません。'],
          ['narrowed', '「狭められた」という意味。幅や範囲が狭くなることを表す語で、金額の高低には使いません。'],
          ['weakened', '「弱められた」という意味。力や効果が弱まることを表す語で、価格の設定を表す形容詞にはなりません。'],
        ],
        0, // 正解: reduced（correctIndex=0 → targetIndex=3 → shift=3）
        '印刷版と比べて安いことを示す形容詞を選びます。選択肢はいずれも「減る」系の過去分詞ですが、価格を修飾できるのは reduced だけで、at a reduced price は「割引価格で」という商業文書の定型表現です。',
        [1, 'will be offered at a ______[144] price compared to the print subscription'],
      ),
      // No.145: insertion — 優待期間後の料金についての文
      // targetIndex=0(A)
      p6q(
        145,
        'insertion',
        [
          ['After that introductory period, the digital subscription will be priced at $14 per month.', '「この優待期間終了後、デジタル購読料は月額14ドル」という情報で、直前の「最初の6か月間は無料」という内容に時間的に続き、直後の段落（CEOのコメント）への区切りとして段落をきれいに締める役割を果たします。'],
          ['Nevertheless, the print edition will continue to be published on a monthly basis.', '接続副詞 nevertheless（それにもかかわらず）で始まり、「それでも印刷版は継続」という逆接の内容を示しますが、直前の「電子版の優待アクセス」という肯定的な内容との論理的な対比が明確でなく、また直後の段落への流れとも合いません。'],
          ['The task force presented its findings to the board of directors last spring.', 'タスクフォースの報告に関する情報で、段落0の「2年間の調査」に関連しますが、段落1で展開されている購読料の詳細という話題からは外れており、前後の文とつながりません。'],
          ['Consequently, all employees at Vantage Press will receive free digital access.', '接続副詞 consequently（その結果）で始まりますが、「その結果、全従業員が無料でアクセス」という内容は直前の「現在の購読者に6か月間無料アクセス」という文の自然な帰結ではなく、文書の文脈にも合いません。'],
        ],
        0, // 正解: After that introductory period...（correctIndex=0 → targetIndex=0 → shift=0）
        '空所の直前に「現在の印刷版購読者は最初の6か月間は追加料金なしで電子版にアクセスできる」とあります。"After that introductory period"（この優待期間終了後）は直前の「6か月間の優待」を指示語 that で受け、優待期間終了後の料金を補足する文として自然に続きます。また、段落1（料金情報）をまとめ、段落2（CEOコメント）へ移行する段落末の位置にも適しています。',
      ),
      // No.146: 語彙 — 反映・象徴する動詞
      // targetIndex=1(B)
      p6q(
        146,
        'blank',
        [
          ['insists', '「主張する」という意味の動詞で、三単現の形です。"the shift insists the company\'s commitment" は「転換が約束を主張する」という意味になり、無生物主語の shift に自発的な主張の動作を割り当てるのは意味的に不自然です。'],
          ['reflects', '「反映する・体現する」という意味の動詞で、三単現の形です。"the shift reflects the company\'s commitment" は「この転換が同社の約束を体現する」という意味の自然な表現で、後続するCEOのコメント内容とも一致します。'],
          ['submits', '「提出する・服従させる」という意味の動詞。書類などを提出する場合に使い、方針への姿勢を目的語に取ることはできません。'],
          ['requires', '「要求する・必要とする」という意味の動詞で、"the shift requires the commitment" は「この転換がコミットメントを要求する」という意味になり、CEOが転換を肯定的に評価するというコンテキストとは論理関係が逆転します。'],
        ],
        1, // 正解: reflects（correctIndex=1 → targetIndex=1 → shift=0）
        '"the shift ______[146] the company\'s long-term commitment" という文で、「転換」という出来事が「コミットメント」との関係でどのように描かれるかを示す動詞が必要です。後続のCEOのコメント「複数プラットフォームへの対応を約束する」という内容から、転換がコミットメントを「体現・反映する」という意味の reflects が最も自然に文意を伝えます。',
        [2, 'the shift ______[146] the company\'s long-term commitment'],
      ),
    ],
  ),
];
