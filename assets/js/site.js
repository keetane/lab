const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const salonRoot = document.querySelector("[data-salon-root]");

const resolvePageLanguage = () => {
  const candidates = [
    salonRoot?.getAttribute("data-lang"),
    document.documentElement?.getAttribute("data-lang"),
    document.documentElement?.lang,
    document.body?.getAttribute("data-lang")
  ];

  for (const candidate of candidates) {
    if (!candidate) {
      continue;
    }

    const normalized = candidate.trim().toLowerCase();
    if (normalized.startsWith("en")) {
      return "en";
    }
    if (normalized.startsWith("ja")) {
      return "ja";
    }
  }

  return "ja";
};

const pageLanguage = resolvePageLanguage();
const isEnglishPage = pageLanguage === "en";
const stripStylePrefix = (value) => (typeof value === "string"
  ? value.replace(/^(?:スタイル|Style):\s*/, "")
  : "");

const uiCopy = isEnglishPage
  ? {
      copySuccess: "Copied.",
      copyFailure: "Copy failed. Please copy manually.",
      copyButton: "Copy",
      sourceUnavailable: "source unavailable",
      additionalPrompt: "Additional prompt",
      patternEditor: "Pattern editor",
      colorEditor: "Color editor",
      colorSpecification: "Color specification",
      bodyType: "Body type",
      height: "Height",
      guideModes: {
        hairColor: "Hair color",
        makeup: "Makeup",
        glasses: "Glasses",
        surround: "Surround",
        beard: "Beard"
      },
      thumbs: {
        portrait: "Women's Hair Style",
        product: "Men's Hair Style",
        kids: "Kids Hair Style",
        glasses: "Glasses Style Comparison",
        suit: "Suit Color Comparison",
        dress: "Dress Color Comparison",
        hat: "Hat Comparison",
        tie: "Tie Color Comparison",
        shirt: "Shirt and Blouse Color Comparison",
        education: "Study Guide Board",
        event: "Event Flyer Board",
        comparison: "Comparison Board"
      },
      stripTitle: "Imagine success."
    }
  : {
      copySuccess: "コピーしました。",
      copyFailure: "コピーに失敗しました。手動でコピーしてください。",
      copyButton: "コピーする",
      sourceUnavailable: "source unavailable",
      additionalPrompt: "追加プロンプト",
      patternEditor: "パターン編集",
      colorEditor: "カラー編集",
      colorSpecification: "カラー指定",
      bodyType: "体型パターン",
      height: "身長指定",
      guideModes: {
        hairColor: "ヘアカラー",
        makeup: "メイク",
        glasses: "メガネ",
        surround: "サラウンド",
        beard: "ヒゲ"
      },
      thumbs: {},
      stripTitle: "成功をイメージしてみよう。"
    };

const galleryLocale = isEnglishPage
  ? {
      portrait: {
        title: "Women's Hair Style",
        style: "Fashion magazine style, polished, clean, Japanese typography",
        sourceLabel: "source",
        editHeading: "Pattern editor",
        customHeading: "Additional prompt",
        patternHeading: "Body type",
        heightHeading: "Height",
        guideModes: {
          primary: "Hair color",
          secondary: "Makeup",
          tertiary: "Glasses"
        }
      },
      product: {
        title: "Men's Hair Style",
        style: "Men's magazine style, clean, polished, Japanese typography",
        sourceLabel: "source",
        editHeading: "Pattern editor",
        customHeading: "Additional prompt",
        patternHeading: "Body type",
        heightHeading: "Height",
        guideModes: {
          primary: "Hair color",
          secondary: "Beard",
          tertiary: "Glasses"
        }
      },
      kids: {
        title: "Kids Hair Style",
        style: "Kids magazine style, clean, soft palette, Japanese typography",
        sourceLabel: "source",
        editHeading: "Pattern editor",
        customHeading: "Additional prompt",
        patternHeading: "Body type",
        heightHeading: "Height",
        guideModes: {
          primary: "Surround",
          secondary: "Glasses"
        }
      },
      glasses: {
        title: "Glasses Style Comparison",
        style: "Horizontal, clean, white-based comparison table, Japanese typography",
        sourceLabel: "source",
        editHeading: "Color editor",
        customHeading: "Additional prompt",
        colorHeading: "Color editor",
        customPlaceholder: "Example: Focus on black and tortoiseshell, keep the round frames compact.",
        colorPlaceholder: "Example: Center on black and tortoiseshell, keep the round frames small.",
        customInstructionLabel: "Additional glasses color notes"
      },
      suit: {
        title: "Suit Color Comparison",
        style: "Horizontal, clean, white-based comparison table, Japanese typography",
        sourceLabel: "source unavailable",
        patternHeading: "Body type",
        heightHeading: "Height",
        customHeading: "Color specification"
      },
      dress: {
        title: "Dress Color Comparison",
        style: "Horizontal, clean, white-based comparison table, Japanese typography",
        sourceLabel: "source unavailable",
        patternHeading: "Body type",
        heightHeading: "Height",
        customHeading: "Color specification"
      },
      hat: {
        title: "Hat Comparison",
        style: "Horizontal, clean, white-based comparison table, Japanese typography",
        sourceLabel: "source unavailable",
        patternHeading: "Body type",
        heightHeading: "Height",
        customHeading: "Hat specification"
      },
      tie: {
        title: "Tie Color Comparison",
        style: "Horizontal, clean, white-based comparison table, Japanese typography",
        sourceLabel: "source unavailable",
        patternHeading: "Body type",
        heightHeading: "Height",
        customHeading: "Color specification"
      },
      shirt: {
        title: "Shirt and Blouse Color Comparison",
        style: "Horizontal, clean, white-based comparison table, Japanese typography",
        sourceLabel: "source unavailable",
        patternHeading: "Body type",
        heightHeading: "Height",
        customHeading: "Color specification"
      },
      education: {
        title: "Study Guide Board",
        style: "Educational style, organized diagrams, soft colors",
        sourceLabel: "source unavailable"
      },
      event: {
        title: "Event Flyer Board",
        style: "Announcement style, bold headings, prominent date",
        sourceLabel: "source unavailable"
      },
      comparison: {
        title: "Comparison Board",
        style: "Comparison-focused, organized table, high readability",
        sourceLabel: "source unavailable"
      }
    }
  : {};

const getLocalizedSampleText = (sampleId, key, fallback) => {
  if (!isEnglishPage) {
    return fallback;
  }

  return galleryLocale[sampleId]?.[key] ?? fallback;
};

if (header) {
  const syncHeader = () => {
    header.classList.toggle("header-shadow", window.scrollY > 8);
  };

  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll("[data-copy-target]").forEach((button) => {
  button.addEventListener("click", async () => {
    const targetId = button.getAttribute("data-copy-target");
    const feedbackId = button.getAttribute("data-copy-feedback");
    const target = targetId ? document.getElementById(targetId) : null;
    const feedback = feedbackId ? document.getElementById(feedbackId) : null;

    if (!target) {
      return;
    }

    try {
      await navigator.clipboard.writeText(target.value ?? target.textContent ?? "");
      if (feedback) {
        feedback.textContent = uiCopy.copySuccess;
      }
    } catch (error) {
      if (feedback) {
        feedback.textContent = uiCopy.copyFailure;
      }
    }
  });
});

document.querySelectorAll("[data-copy-and-open]").forEach((link) => {
  link.addEventListener("click", async (event) => {
    const targetId = link.getAttribute("data-copy-and-open");
    const target = targetId ? document.getElementById(targetId) : null;

    if (!target) {
      return;
    }

    event.preventDefault();

    try {
      await navigator.clipboard.writeText(target.value ?? target.textContent ?? "");
    } catch (error) {
      // If clipboard access fails, still continue to the target.
    }

    window.open(link.href, "_blank", "noopener,noreferrer");
  });
});

if (salonRoot) {
  const defaultOutfitPatterns = {
    slim: "すっきり",
    balanced: "バランス",
    solid: "しっかり"
  };
  const englishGuideModes = {
    portrait: { primary: "Hair color", secondary: "Makeup", tertiary: "Glasses" },
    product: { primary: "Hair color", secondary: "Beard", tertiary: "Glasses" },
    kids: { primary: "Surround view", secondary: "Glasses" }
  };
  const englishView = {
    portrait: {
      title: "Hair Style",
      style: "Magazine-like, elegant, clean",
      editHeading: "Pattern edit",
      customHeading: "Additional prompt",
      customPlaceholder: "e.g. Make it more elegant. Use a vertical poster and keep the stats to two items.",
      customInstructionLabel: "Additional instructions",
      heightHeading: "Height",
      colorHeading: "Color edit",
      colorPlaceholder: "e.g. Keep it black and tortoiseshell; make the round frame compact.",
      prompt: "Hair style infographic prompt"
    },
    product: {
      title: "Men's Hair Style",
      style: "Men's magazine-like, clean, polished",
      editHeading: "Pattern edit",
      customHeading: "Additional prompt",
      customPlaceholder: "e.g. Make it more polished. Use a clean, masculine magazine layout.",
      customInstructionLabel: "Additional instructions",
      heightHeading: "Height",
      colorHeading: "Color edit",
      colorPlaceholder: "e.g. Keep the palette natural and professional.",
      prompt: "Men's hair style infographic prompt"
    },
    kids: {
      title: "Kids' Hair Style",
      style: "Soft, clean, kid-friendly, magazine-like",
      editHeading: "Pattern edit",
      customHeading: "Additional prompt",
      customPlaceholder: "e.g. Keep it soft and playful while staying neat.",
      customInstructionLabel: "Additional instructions",
      heightHeading: "Height",
      colorHeading: "Color edit",
      colorPlaceholder: "e.g. Keep colors gentle and natural.",
      prompt: "Kids' hair style infographic prompt"
    },
    glasses: {
      title: "Glasses Style Comparison",
      style: "Horizontal, clean, white-based, comparison table",
      editHeading: "Color edit",
      customHeading: "Additional prompt",
      customPlaceholder: "e.g. Keep the palette brown-centered. Use tortoiseshell for the Boston frame and gold for metal frames.",
      customInstructionLabel: "Additional color instructions",
      heightHeading: "Height",
      colorHeading: "Color edit",
      colorPlaceholder: "e.g. Keep the frames black and tortoiseshell; make the round frame compact.",
      prompt: "Glasses style comparison prompt"
    },
    suit: {
      title: "Suit Color Comparison",
      style: "Horizontal, polished, white-based, comparison table",
      editHeading: "Additional prompt",
      customHeading: "Additional prompt",
      customPlaceholder: "e.g. Keep it deep and autumn-like. Compare navy-leaning options.",
      customInstructionLabel: "Additional suit color instructions",
      heightHeading: "Height",
      prompt: "Suit color comparison prompt"
    },
    dress: {
      title: "Dress Color Comparison",
      style: "Horizontal, polished, white-based, comparison table",
      editHeading: "Additional prompt",
      customHeading: "Additional prompt",
      customPlaceholder: "e.g. Keep it subdued and suitable for a formal venue.",
      customInstructionLabel: "Additional dress color instructions",
      heightHeading: "Height",
      prompt: "Dress color comparison prompt"
    },
    hat: {
      title: "Hat Comparison",
      style: "Horizontal, polished, white-based, comparison table",
      editHeading: "Additional prompt",
      customHeading: "Additional prompt",
      customPlaceholder: "e.g. Keep it casual and compare shapes that are not too wide-brimmed.",
      customInstructionLabel: "Additional hat instructions",
      heightHeading: "Height",
      prompt: "Hat comparison prompt"
    },
    tie: {
      title: "Tie Color Comparison",
      style: "Horizontal, polished, white-based, comparison table",
      editHeading: "Additional prompt",
      customHeading: "Additional prompt",
      customPlaceholder: "e.g. Keep it business-forward and compare understated accent colors.",
      customInstructionLabel: "Additional tie color instructions",
      heightHeading: "Height",
      prompt: "Tie color comparison prompt"
    },
    shirt: {
      title: "Shirt / Blouse Color Comparison",
      style: "Horizontal, polished, white-based, comparison table",
      editHeading: "Additional prompt",
      customHeading: "Additional prompt",
      customPlaceholder: "e.g. Focus on face-flattering colors that work in the office too.",
      customInstructionLabel: "Additional shirt / blouse color instructions",
      heightHeading: "Height",
      prompt: "Shirt / blouse color comparison prompt"
    }
  };

  const createOutfitComparisonPrompt = ({
    title,
    itemLabel,
    variationLabel,
    variations,
    stylingNote
  }) => `アップロードされた人物画像をもとに、同一人物の${itemLabel}を比較できる横長インフォグラフィックを生成してください。

## 目的
${itemLabel}の違いによる印象の変化を、同一人物・同一条件で分かりやすく比較できるスタイリング提案資料を作成する。

## 基本ルール
- アップロードされた人物と同一人物として描写する。
- 顔立ち、肌色、髪色、表情、年齢感、人物の雰囲気は維持する。
- ${itemLabel}以外の要素はできるだけ統一し、比較対象の差だけが見えるようにする。
- 指定がない限り、背景は白または淡いニュートラルカラーにする。
- 日本語ラベルを使用し、読みやすい誌面レイアウトにする。
- 体型パターンや身長指定がある場合は、その条件に合わせて全身バランスと服の落ち感を自然に調整する。
- 過度な加工感、誇張されたポーズ、不自然な体型補正は避ける。

## 人物と衣装
- 同一人物のまま比較する。
- ポーズ、カメラ距離、ライティング、背景、表情はできるだけ統一する。
- ${stylingNote}
- 衣装の素材感、サイズ感、シルエットは現実的で自然に見えるようにする。

## インフォグラフィック構成
- 全体タイトルは「${title}」とする。
- 上部に、この人物に特に似合うおすすめ3案を横並びで表示する。
- 各おすすめ案には「おすすめ1」「おすすめ2」「おすすめ3」の見出し、短い理由、${variationLabel}名を付ける。
- 下部に5つの比較パターンを横並びで配置する。
- 5パターンすべて同一人物で、主な違いは${itemLabel}にする。
- 各パターンに以下を含める：
  - 日本語の小見出し
  - ${variationLabel}名
  - 小さめの人物画像
  - 印象の短い説明文
  - コーディネートの相性コメント

## 比較パターン
${variations.map((variation, index) => `${index + 1}. ${variation}`).join("\n")}

## デザイン指定
- 横長の比較インフォグラフィックにする。
- 白、アイボリー、ライトグレー、淡いベージュを基調にする。
- 比較対象ごとの差が一目で分かるように余白と整列を保つ。
- 文字量は多すぎず少なすぎず、比較表として自然に読める密度にする。

## 出力条件
- 1枚の完成されたインフォグラフィック画像として生成する。
- 日本語の文字は正確で読みやすくする。
- 同一人物性を崩さず、${itemLabel}の違いだけで印象差が伝わるようにする。`;

  const createOutfitSample = ({
    title,
    summary,
    itemLabel,
    variationLabel,
    variations,
    customHeading,
    customPlaceholder,
    customInstructionLabel,
    patternOptions = null,
    defaultHeight,
    stylingNote
  }) => ({
    title,
    summary,
    photo: "写真: 顔と服装の雰囲気が分かる人物画像1枚",
    style: "スタイル: 横長、清潔感、白基調、比較表、日本語組版",
    sourceUrl: "https://x.com/katap_yutori/status/2048318468878221555",
    sourceLabel: "source",
    editHeading: "パターン編集",
    customHeading,
    customPlaceholder,
    customInstructionLabel,
    patternHeading: "体型パターン",
    patternOptions,
    defaultPattern: patternOptions ? "balanced" : null,
    heightEnabled: true,
    heightHeading: "身長指定",
    heightPlaceholder: "例: 165cm",
    defaultHeight,
    prompt: createOutfitComparisonPrompt({
      title,
      itemLabel,
      variationLabel,
      variations,
      stylingNote
    })
  });

  const salonSamples = {
    portrait: {
      title: "ヘアスタイル",
      summary: "上部3カード、中段3×5一覧、下部5色比較で構成する美容室向けヘア診断インフォグラフィック。",
      photo: "写真: 自撮り画像1枚 + 参照インフォグラフィック1枚",
      style: "スタイル: 美容雑誌風、上品、清潔感、日本語組版",
      sourceUrl: "https://x.com/katap_yutori/status/2048318468878221555",
      sourceLabel: "source",
      guideModes: {
        primary: "ヘアカラー",
        secondary: "メイク",
        tertiary: "メガネ"
      },
      promptHair: `添付した自撮り画像の人物をモデルにし、美容診断インフォグラフィックを生成してください。内容は自動生成してください。

【全体】
- 縦長A4風の1枚完結インフォグラフィック
- 白〜生成り背景、薄いベージュの罫線、上品で清潔感のある日本の美容雑誌風
- 見出しは明朝体風、本文は読みやすいゴシック体風
- 日本語で自然に組版し、文字化けを避ける
- 参照画像と同程度の情報量・余白感・誌面密度を保つ

【人物】
- 自撮り画像の本人に似せる。別人化しない
- 顔立ち、輪郭、肌色、雰囲気を維持する
- 全カットで同一人物性を保つ
- 服装は維持する
- 表情は自然で洗練された印象
- 髪型は、指定がない限り元の髪型を採用する
- 髪色だけを各パターンごとに自然に変更する
- 過度な加工感や不自然な染色表現は避ける
- 日本の美容室の提案資料として自然な仕上がりにする

【上部：ヘアスタイル】
- タイトル「ヘアスタイル」
- サブタイトル「あなたに一番似合う髪型は？」
- 上部に大きな診断カードを3枚横並びで配置
- 左から「一番似合う」「普通」「あまりおすすめしない」
- 左カードには王冠アイコン
- 各カードの髪型名、説明文、評価は自動生成
- 左が高評価、中央が中評価、右が低評価
- 3カードの髪型はすべて異なるものにする
- 髪型変更時も本人らしさを保ち、服装は統一する

【中段：髪型一覧】
- 必ず3行×5列、合計15枚で構成する
- 左の縦ラベルは上から「ロング」「ショート」「アレンジ」
- 横方向は左から右へ「カジュアル → ナチュラル → シック」の印象変化が分かるようにする
- ただし5列を維持するため、列の意味は以下の通り：
  1列目：カジュアル
  2列目：カジュアル寄り
  3列目：ナチュラル
  4列目：シック寄り
  5列目：シック
- 必要なら上部に大分類として「カジュアル」「ナチュラル」「シック」を見せる
- 各セルに小さな人物写真と日本語の髪型名を入れる
- 15セルすべて異なる髪型にする
- 1行目はロング系5種、2行目はショート系5種、3行目はアレンジ系5種
- 左から右へ進むほど、印象がカジュアルからシックへ自然に変化するようにする
- 髪型はすべて自撮り人物に合わせて自動生成し、実在しそうな美容室提案として自然にする

【下部：ヘアカラーパターンガイド】
- タイトル「ヘアカラーパターンガイド」
- サブタイトル「あなたに似合う髪色の提案」
- 参照画像の下部セクションと同程度の情報量・レイアウト密度を保ちつつ、内容はメイク分析ではなくヘアカラー提案に置き換える
- 左から右へ5つのカラーパターンを横並びで配置する
- 並び順は必ず以下の通り：
  1. ダークカラー
  2. 明るめ
  3. おすすめ
  4. ブロンド
  5. それ以外のファンキーめなカラーリング
- 5パターンすべて同一人物で、髪型は指定がない限り元の髪型を採用する
- 5パターンすべて服装・表情・撮影条件・人物性を揃え、主な違いは髪色にする
- 各パターンに以下を含める：
  - 小見出し（例：ダークカラー / 明るめ / おすすめ / ブロンド / ファンキーカラー）
  - 自動生成の具体的なカラー名
  - 小さめの人物写真
  - その色の印象説明を1〜2文
  - 似合いやすさや雰囲気の短いコメント
- 5パターンの色味は明確に差をつける
- 「おすすめ」はこの人物に最も似合うと考えられる自然で上品なカラーを自動生成する
- 「ダークカラー」は黒髪〜ダークブラウン系で落ち着いた提案
- 「明るめ」は柔らかなライトブラウン〜ベージュ系で自然な明るさの提案
- 「ブロンド」は日本人の誌面として成立する上品寄りのブロンド提案にする
- 「それ以外のファンキーめなカラーリング」は、個性的だが誌面として美しくまとまるカラー提案にする（例：ラベンダーグレージュ、ピンクブラウン、オリーブ、ブルーブラック寄りのデザインカラーなど）。ただし名称や内容は自動生成し、既存文言の流用はしない
- 必要であれば各パターン下に補足として「おすすめポイント」「似合う印象」「注意点」を短く添える
- 下部に小さく「おすすめトーン」や「避けたい傾向」の補助欄を加えてもよいが、主役は5パターンの比較であること

【最重要】
- 参照画像の「構成」「セクションの並び」「上部3カード」「中段3×5一覧」「下部ガイド欄」の構成バランスは忠実に再現する
- ただし、髪型名・診断文・評価・候補一覧・ヘアカラー名・提案文はすべて自動生成する
- 参照画像の文字内容はそのまま複製しない
- 中段は必ず15枚を維持する
- 縦軸は「ロング」「ショート」「アレンジ」
- 横軸は「カジュアル → ナチュラル → シック」が視覚的に分かる構成にする
- 下部は必ず「ヘアカラーパターンガイド」とし、5つのカラーパターン比較を明確に見せる

【避けること】
- 参照画像の髪型名や文章の流用
- 英語だけの文字
- 文字化け
- 別人化
- 顔の歪み
- 過度なアニメ調
- 過度な美肌加工
- 派手すぎる配色
- レイアウトの簡略化
- 情報量の削減
- 5パターン未満への省略
- 髪型まで勝手に大きく変えてしまうこと（指定がない限り元の髪型を維持）`
      ,
      promptMakeup: `添付した自撮り画像の人物をモデルにし、参照画像の美容診断インフォグラフィックを「構成・レイアウトのみ」忠実に再現してください。参照画像の文字内容や名称はコピーせず、内容は自動生成してください。

【全体】
- 縦長A4風の1枚完結インフォグラフィック
- 白〜生成り背景、薄いベージュの罫線、上品で清潔感のある日本の美容雑誌風
- 見出しは明朝体風、本文は読みやすいゴシック体風
- 日本語で自然に組版し、文字化けを避ける
- 参照画像と同程度の情報量・余白感・誌面密度を保つ

【人物】
- 自撮り画像の本人に似せる。別人化しない
- 顔立ち、輪郭、肌色、雰囲気を維持する
- 全カットで同一人物性を保つ
- 服装は維持する
- 表情は自然で洗練された印象
- 髪型は、指定がない限り元の髪型を採用する
- 髪色だけを各パターンごとに自然に変更する
- 過度な加工感や不自然な染色表現は避ける
- 日本の美容室の提案資料として自然な仕上がりにする

【上部：ヘアスタイル】
- タイトル「ヘアスタイル」
- サブタイトル「あなたに一番似合う髪型は？」
- 上部に大きな診断カードを3枚横並びで配置
- 左から「一番似合う」「普通」「あまりおすすめしない」
- 左カードには王冠アイコン
- 各カードの髪型名、説明文、評価は自動生成
- 左が高評価、中央が中評価、右が低評価
- 3カードの髪型はすべて異なるものにする
- 髪型変更時も本人らしさを保ち、服装は統一する

【中段：髪型一覧】
- 必ず3行×5列、合計15枚で構成する
- 左の縦ラベルは上から「ロング」「ショート」「アレンジ」
- 横方向は左から右へ「カジュアル → ナチュラル → シック」の印象変化が分かるようにする
- ただし5列を維持するため、列の意味は以下の通り：
  1列目：カジュアル
  2列目：カジュアル寄り
  3列目：ナチュラル
  4列目：シック寄り
  5列目：シック
- 必要なら上部に大分類として「カジュアル」「ナチュラル」「シック」を見せる
- 各セルに小さな人物写真と日本語の髪型名を入れる
- 15セルすべて異なる髪型にする
- 1行目はロング系5種、2行目はショート系5種、3行目はアレンジ系5種
- 左から右へ進むほど、印象がカジュアルからシックへ自然に変化するようにする
- 髪型はすべて自撮り人物に合わせて自動生成し、実在しそうな美容室提案として自然にする

【下部：メイク分析ガイド】
- タイトル「メイク分析ガイド」
- サブタイトル「あなたの魅力を引き出すメイク提案」
- 参照画像と同じ構成で、左に大きな人物ポートレート、右に分析情報を配置
- 左側に顔立ちの特徴コメントを4つ程度、自動生成
- 右上に顔タイプ診断チャートを配置
- 「大人顔—子供顔」
- 「直線—曲線」
- 「クール—フェミニン」
- 「フレッシュ—エレガント」
- 診断タイプ名、説明文、ハッシュタグは自動生成
- メイクポイントは4つの小画像で構成（目元、眉、輪郭または鼻筋、唇）
- 各小画像に短い解説文を付ける
- 下部に「おすすめカラー」欄を配置し、EYE / CHEEK / LIP / BASE を表示
- 右下に「避けたいカラー」欄を配置
- 色提案は人物の雰囲気に合わせて自動生成する

【最重要】
- 参照画像の「構成」「セクションの並び」「上部3カード」「中段3×5一覧」「下部分析欄」の構成バランスは忠実に再現する
- ただし、髪型名・診断文・評価・候補一覧・メイク分析文・色提案はすべて自動生成する
- 参照画像の文字内容はそのまま複製しない
- 中段は必ず15枚を維持する
- 縦軸は「ロング」「ショート」「アレンジ」
- 横軸は「カジュアル → ナチュラル → シック」が視覚的に分かる構成にする
- 下部は必ず「メイク分析ガイド」とし、分析チャート、メイクポイント、おすすめカラー、避けたいカラーを見せる

【避けること】
- 参照画像の髪型名や文章の流用
- 英語だけの文字
- 文字化け
- 別人化
- 顔の歪み
- 過度なアニメ調
- 過度な美肌加工
- 派手すぎる配色
- レイアウトの簡略化
- 情報量の削減
- 4つ未満のメイクポイントへの省略
- 髪型まで勝手に大きく変えてしまうこと（指定がない限り元の髪型を維持）`
      ,
      promptGlasses: `添付した自撮り画像の人物をモデルにし、参照画像の美容診断インフォグラフィックを「構成・レイアウトのみ」忠実に再現してください。参照画像の文字内容や名称はコピーせず、内容は自動生成してください。

【全体】
- 縦長A4風の1枚完結インフォグラフィック
- 白〜生成り背景、薄いベージュの罫線、上品で清潔感のある日本の美容雑誌風
- 見出しは明朝体風、本文は読みやすいゴシック体風
- 日本語で自然に組版し、文字化けを避ける
- 参照画像と同程度の情報量・余白感・誌面密度を保つ

【人物】
- 自撮り画像の本人に似せる。別人化しない
- 顔立ち、輪郭、肌色、雰囲気を維持する
- 全カットで同一人物性を保つ
- 服装は維持する
- 表情は自然で洗練された印象
- 髪型は、指定がない限り元の髪型を採用する
- 指定がなければ元のアップロード画像をベースにする
- メガネ以外の要素を過度に変えない
- 日本の美容室の提案資料として自然な仕上がりにする

【上部：ヘアスタイル】
- タイトル「ヘアスタイル」
- サブタイトル「あなたに一番似合う髪型は？」
- 上部に大きな診断カードを3枚横並びで配置
- 左から「一番似合う」「普通」「あまりおすすめしない」
- 左カードには王冠アイコン
- 各カードの髪型名、説明文、評価は自動生成
- 左が高評価、中央が中評価、右が低評価
- 3カードの髪型はすべて異なるものにする
- 髪型変更時も本人らしさを保ち、服装は統一する

【中段：髪型一覧】
- 必ず3行×5列、合計15枚で構成する
- 左の縦ラベルは上から「ロング」「ショート」「アレンジ」
- 横方向は左から右へ「カジュアル → ナチュラル → シック」の印象変化が分かるようにする
- ただし5列を維持するため、列の意味は以下の通り：
  1列目：カジュアル
  2列目：カジュアル寄り
  3列目：ナチュラル
  4列目：シック寄り
  5列目：シック
- 各セルに小さな人物写真と日本語の髪型名を入れる
- 15セルすべて異なる髪型にする
- 1行目はロング系5種、2行目はショート系5種、3行目はアレンジ系5種
- 左から右へ進むほど、印象がカジュアルからシックへ自然に変化するようにする
- 髪型はすべて自撮り人物に合わせて自動生成し、実在しそうな美容室提案として自然にする

【下部：メガネパターンガイド】
- タイトル「メガネパターンガイド」
- サブタイトル「あなたに似合うメガネの提案」
- 下部に5つのメガネパターンを横並びで配置する
- 並び順は必ず以下の通り：
  1. ボストン
  2. ウェリントン
  3. スクエア
  4. ブロウライン
  5. メタルラウンド
- 5パターンすべて同一人物で、服装・表情・撮影条件・人物性を揃え、主な違いはメガネだけにする
- 指定がなければ元のアップロード画像をベースにする
- 各パターンに以下を含める：
  - 小見出し
  - フレーム名
  - 小さめの人物写真
  - 似合い方や印象の短い説明文
  - 顔立ちとの相性コメント
- フレームの太さ、素材感、知的さややわらかさの差が明確に分かるようにする
- 日本の美容誌やスタイリング提案資料として自然な仕上がりにする

【最重要】
- 参照画像の「構成」「セクションの並び」「上部3カード」「中段3×5一覧」「下部ガイド欄」の構成バランスは忠実に再現する
- ただし、髪型名・診断文・評価・候補一覧・メガネ提案文はすべて自動生成する
- 参照画像の文字内容はそのまま複製しない
- 中段は必ず15枚を維持する
- 縦軸は「ロング」「ショート」「アレンジ」
- 横軸は「カジュアル → ナチュラル → シック」が視覚的に分かる構成にする
- 下部は必ず「メガネパターンガイド」とし、5つのフレーム比較を明確に見せる

【避けること】
- 参照画像の髪型名や文章の流用
- 英語だけの文字
- 文字化け
- 別人化
- 顔の歪み
- 過度なアニメ調
- 過度な美肌加工
- 派手すぎる配色
- レイアウトの簡略化
- 情報量の削減
- 5パターン未満への省略
- メガネ以外の要素を勝手に大きく変えてしまうこと`
    },
    product: {
      title: "男性ヘアスタイル",
      summary: "男性向けに、上部診断カードと中段3×5マトリックスで似合う髪型を提案するインフォグラフィック。",
      photo: "写真: 男性の自撮り画像1枚 + 参照インフォグラフィック1枚",
      style: "スタイル: メンズ美容雑誌風、清潔感、上品、日本語組版",
      sourceUrl: "https://x.com/katap_yutori/status/2048318468878221555",
      sourceLabel: "source",
      guideModes: {
        primary: "ヘアカラー",
        secondary: "ヒゲ",
        tertiary: "メガネ"
      },
      promptHair: `添付した男性の自撮り画像の人物をモデルにし、ヘアスタイルインフォグラフィックを生成してください。内容は自動生成してください。

【全体】
- 縦長A4風の1枚完結インフォグラフィック
- 白〜生成り背景、薄いベージュの罫線、上品で清潔感のある日本のメンズ美容雑誌風
- 見出しは明朝体風、本文は読みやすいゴシック体風
- 日本語で自然に組版し、文字化けを避ける
- 参照画像と同程度の情報量・余白感・誌面密度を保つ

【人物】
- 自撮り画像の本人に似せる。別人化しない
- 顔立ち、輪郭、肌色、雰囲気を維持する
- 全カットで同一人物性を保つ
- 服装は維持する
- 表情は自然で洗練された印象
- 指定がなければ元のアップロード画像をベースにする
- 髪型は各パターンごとに自然に変更する
- 不自然なワックス感や過度な加工を避ける
- 日本の美容室の提案資料として自然な仕上がりにする

【上部：ヘアスタイル】
- タイトル「ヘアスタイル」
- サブタイトル「あなたに一番似合う髪型は？」
- 上部に大きな診断カードを3枚横並びで配置
- 左から「一番似合う」「普通」「あまりおすすめしない」
- 左カードには王冠アイコン
- 各カードの髪型名、説明文、評価は自動生成
- 左が高評価、中央が中評価、右が低評価
- 3カードの髪型はすべて異なるものにする

【中段：髪型一覧】
- 必ず3行×5列、合計15枚で構成する
- 左の縦ラベルは上から「ビジネス」「カジュアル」「アレンジ」
- 横方向は左から右へ以下の印象変化が分かるようにする
  1列目：ナチュラル
  2列目：爽やか
  3列目：清潔感
  4列目：大人っぽい
  5列目：モード
- 各セルに小さな人物写真と日本語の髪型名を入れる
- 15セルすべて異なる髪型にする
- 1行目はビジネス向け5種、2行目はカジュアル向け5種、3行目はアレンジ向け5種
- 左から右へ進むほど、印象がナチュラルからモードへ自然に変化するようにする
- 髪型はすべて自撮り人物に合わせて自動生成し、実在しそうな美容室提案として自然にする

【下部：ヘアカラーセクション】
- 下部に、この人物に似合うヘアカラー提案セクションを追加する
- 指定がなければ元のアップロード画像の髪型をベースにし、髪色だけを変える
- ダーク系、ナチュラルブラウン系、やや明るめ、上品なハイトーン、おすすめカラーなどを誌面バランスに合わせて比較表示してよい
- 各パターンに短い説明と印象コメントを付ける

【下部全体】
- 下部ではヘアカラーセクションを主役にする
- 情報量は十分に保ちつつ、誌面全体のバランスを崩さない
- ただし主役は上部3カードと中段3×5一覧であること

【最重要】
- 参照画像の「構成」「セクションの並び」「上部3カード」「中段3×5一覧」の構成バランスは忠実に再現する
- ただし、髪型名・診断文・評価・候補一覧・ヘアカラー提案・補足文はすべて自動生成する
- 参照画像の文字内容はそのまま複製しない
- 中段は必ず15枚を維持する
- 縦軸は「ビジネス」「カジュアル」「アレンジ」
- 横軸は「ナチュラル」「爽やか」「清潔感」「大人っぽい」「モード」

【避けること】
- 参照画像の髪型名や文章の流用
- 英語だけの文字
- 文字化け
- 別人化
- 顔の歪み
- 過度なアニメ調
- 過度な美肌加工
- 派手すぎる配色
- レイアウトの簡略化
- 情報量の削減`
      ,
      promptBeard: `添付した男性の自撮り画像の人物をモデルにし、参照画像の美容診断インフォグラフィックを「構成・レイアウトのみ」忠実に再現してください。参照画像の文字内容や名称はコピーせず、内容は自動生成してください。

【全体】
- 縦長A4風の1枚完結インフォグラフィック
- 白〜生成り背景、薄いベージュの罫線、上品で清潔感のある日本のメンズ美容雑誌風
- 見出しは明朝体風、本文は読みやすいゴシック体風
- 日本語で自然に組版し、文字化けを避ける
- 参照画像と同程度の情報量・余白感・誌面密度を保つ

【人物】
- 自撮り画像の本人に似せる。別人化しない
- 顔立ち、輪郭、肌色、雰囲気を維持する
- 全カットで同一人物性を保つ
- 服装は維持する
- 表情は自然で洗練された印象
- 指定がなければ元のアップロード画像をベースにする
- 髪型は各パターンごとに自然に変更する
- 不自然なワックス感や過度な加工を避ける
- 日本の美容室や理容提案資料として自然な仕上がりにする

【上部：ヘアスタイル】
- タイトル「ヘアスタイル」
- サブタイトル「あなたに一番似合う髪型は？」
- 上部に大きな診断カードを3枚横並びで配置
- 左から「一番似合う」「普通」「あまりおすすめしない」
- 左カードには王冠アイコン
- 各カードの髪型名、説明文、評価は自動生成
- 左が高評価、中央が中評価、右が低評価
- 3カードの髪型はすべて異なるものにする

【中段：髪型一覧】
- 必ず3行×5列、合計15枚で構成する
- 左の縦ラベルは上から「ビジネス」「カジュアル」「アレンジ」
- 横方向は左から右へ以下の印象変化が分かるようにする
  1列目：ナチュラル
  2列目：爽やか
  3列目：清潔感
  4列目：大人っぽい
  5列目：モード
- 各セルに小さな人物写真と日本語の髪型名を入れる
- 15セルすべて異なる髪型にする
- 1行目はビジネス向け5種、2行目はカジュアル向け5種、3行目はアレンジ向け5種
- 左から右へ進むほど、印象がナチュラルからモードへ自然に変化するようにする
- 髪型はすべて自撮り人物に合わせて自動生成し、実在しそうな美容室提案として自然にする

【下部：ヒゲセクション】
- 下部にヒゲの比較セクションを追加する
- 指定がなければ元のアップロード画像をベースにし、人物性・服装・表情は維持する
- ヒゲは以下の5パターンを必ず作成する
  1. あごヒゲ
  2. 口髭
  3. ビジネス
  4. フルビアード
  5. ゴーティー
- 5パターンすべて同一人物で、主な違いはヒゲの形にする
- 各パターンに日本語の名称と短い印象説明を付ける
- メンズ美容誌や理容提案資料として自然な仕上がりにする

【下部全体】
- 下部ではヒゲセクションを主役にする
- 情報量は十分に保ちつつ、誌面全体のバランスを崩さない
- ただし主役は上部3カードと中段3×5一覧であること

【最重要】
- 参照画像の「構成」「セクションの並び」「上部3カード」「中段3×5一覧」の構成バランスは忠実に再現する
- ただし、髪型名・診断文・評価・候補一覧・ヒゲ提案・補足文はすべて自動生成する
- 参照画像の文字内容はそのまま複製しない
- 中段は必ず15枚を維持する
- 縦軸は「ビジネス」「カジュアル」「アレンジ」
- 横軸は「ナチュラル」「爽やか」「清潔感」「大人っぽい」「モード」

【避けること】
- 参照画像の髪型名や文章の流用
- 英語だけの文字
- 文字化け
- 別人化
- 顔の歪み
- 過度なアニメ調
- 過度な美肌加工
- 派手すぎる配色
- レイアウトの簡略化
- 情報量の削減`
      ,
      promptGlasses: `添付した男性の自撮り画像の人物をモデルにし、参照画像の美容診断インフォグラフィックを「構成・レイアウトのみ」忠実に再現してください。参照画像の文字内容や名称はコピーせず、内容は自動生成してください。

【全体】
- 縦長A4風の1枚完結インフォグラフィック
- 白〜生成り背景、薄いベージュの罫線、上品で清潔感のある日本のメンズ美容雑誌風
- 見出しは明朝体風、本文は読みやすいゴシック体風
- 日本語で自然に組版し、文字化けを避ける
- 参照画像と同程度の情報量・余白感・誌面密度を保つ

【人物】
- 自撮り画像の本人に似せる。別人化しない
- 顔立ち、輪郭、肌色、雰囲気を維持する
- 全カットで同一人物性を保つ
- 服装は維持する
- 表情は自然で洗練された印象
- 指定がなければ元のアップロード画像をベースにする
- メガネ以外の要素を過度に変えない
- 日本の美容室や理容提案資料として自然な仕上がりにする

【上部：ヘアスタイル】
- タイトル「ヘアスタイル」
- サブタイトル「あなたに一番似合う髪型は？」
- 上部に大きな診断カードを3枚横並びで配置
- 左から「一番似合う」「普通」「あまりおすすめしない」
- 左カードには王冠アイコン
- 各カードの髪型名、説明文、評価は自動生成
- 左が高評価、中央が中評価、右が低評価
- 3カードの髪型はすべて異なるものにする

【中段：髪型一覧】
- 必ず3行×5列、合計15枚で構成する
- 左の縦ラベルは上から「ビジネス」「カジュアル」「アレンジ」
- 横方向は左から右へ以下の印象変化が分かるようにする
  1列目：ナチュラル
  2列目：爽やか
  3列目：清潔感
  4列目：大人っぽい
  5列目：モード
- 各セルに小さな人物写真と日本語の髪型名を入れる
- 15セルすべて異なる髪型にする
- 1行目はビジネス向け5種、2行目はカジュアル向け5種、3行目はアレンジ向け5種
- 左から右へ進むほど、印象がナチュラルからモードへ自然に変化するようにする
- 髪型はすべて自撮り人物に合わせて自動生成し、実在しそうな美容室提案として自然にする

【下部：メガネパターンガイド】
- タイトル「メガネパターンガイド」
- サブタイトル「あなたに似合うメガネの提案」
- 下部に5つのメガネパターンを横並びで配置する
- 並び順は必ず以下の通り：
  1. ボストン
  2. ウェリントン
  3. スクエア
  4. ブロウライン
  5. メタルラウンド
- 5パターンすべて同一人物で、服装・表情・撮影条件・人物性を揃え、主な違いはメガネだけにする
- 指定がなければ元のアップロード画像をベースにする
- 各パターンに以下を含める：
  - 小見出し
  - フレーム名
  - 小さめの人物写真
  - 似合い方や印象の短い説明文
  - 清潔感、知的さ、やわらかさなどのコメント
- メンズ美容誌やスタイリング提案資料として自然な仕上がりにする

【最重要】
- 参照画像の「構成」「セクションの並び」「上部3カード」「中段3×5一覧」の構成バランスは忠実に再現する
- ただし、髪型名・診断文・評価・候補一覧・メガネ提案・補足文はすべて自動生成する
- 参照画像の文字内容はそのまま複製しない
- 中段は必ず15枚を維持する
- 縦軸は「ビジネス」「カジュアル」「アレンジ」
- 横軸は「ナチュラル」「爽やか」「清潔感」「大人っぽい」「モード」

【避けること】
- 参照画像の髪型名や文章の流用
- 英語だけの文字
- 文字化け
- 別人化
- 顔の歪み
- 過度なアニメ調
- 過度な美肌加工
- 派手すぎる配色
- レイアウトの簡略化
- 情報量の削減
- 5パターン未満への省略`
    },
    education: {
      title: "Study guide board",
      summary: "概念や手順を分解し、学習内容を一目で復習できる図解に寄せるテンプレート。",
      photo: "写真: なくても可。必要なら教材写真を1枚",
      style: "スタイル: 教材風、整理された図解、やさしい配色",
      sourceUrl: "",
      sourceLabel: "source unavailable",
      prompt: `学習内容を一目で整理できる教育向けインフォグラフィックを作成してください。写真がある場合は補助的に使い、図解と文字情報を主役にしてください。

目的:
- 概念、手順、ポイントを短時間で復習できるようにする
- 小学生から大人まで読みやすい、整理された教材風の見た目にする

レイアウト:
- タイトル、4つ前後のステップ、要点のまとめを明確に分ける
- 図形や矢印を使って流れが追いやすい構成にする
- 余白を確保し、各ブロックが独立して理解できるようにする

タイポグラフィ:
- 見出しははっきり大きく、本文はやさしく読みやすくする
- 難しい専門語は必要最小限にする

カラーと質感:
- 明るめで清潔感のある色使い
- クリーム、ネイビー、アクセントの黄色など、教材として見やすい配色にする

写真の扱い:
- 写真がある場合は補足要素として小さめに使う
- 写真がなくても成立する図解中心のビジュアルにする

出力:
- 学習内容を復習しやすい1枚の図解画像
- 手順や関係性がひと目で伝わる構成

禁止事項:
- 文字を詰め込みすぎない
- 色や装飾を増やしすぎて教材感を壊さない
- 情報の順序が分かりにくくならないようにする`
    },
    event: {
      title: "Event flyer board",
      summary: "開催情報、登壇者、参加メリットを一目で伝える告知向けテンプレート。",
      photo: "写真: 登壇者または会場写真を1枚",
      style: "スタイル: 告知向け、強い見出し、日時が目立つ",
      sourceUrl: "",
      sourceLabel: "source unavailable",
      prompt: `アップロードした写真を使って、イベント告知用のインフォグラフィックを1枚作成してください。

目的:
- 開催日、会場、登壇者、参加メリットを一目で伝える
- SNS投稿や申込ページのサムネイルとして使いやすい見た目にする

レイアウト:
- 大きなイベントタイトルを最優先で見せる
- 日時、会場、登壇者、参加対象、申込導線を整理して配置する
- 視線が上から下へ自然に流れる構成にする

タイポグラフィ:
- 見出しは大胆に大きくする
- 重要情報は短く、数字や日付が最初に目に入るようにする

カラーと質感:
- コントラストを強めにして告知感を出す
- 暖色アクセントとダークトーンを組み合わせ、目を引くが安っぽくない印象にする

写真の扱い:
- 登壇者または会場写真を主役にしつつ、文字情報が読める余白を確保する

出力:
- イベントの魅力と参加情報がひと目で分かる1枚画像

禁止事項:
- 情報を詰め込みすぎない
- 色数を増やしすぎない
- 申込導線が埋もれる構成にしない`
    },
    comparison: {
      title: "Compare board",
      summary: "複数案の違いや選び方を見せる比較表向けテンプレート。",
      photo: "写真: 商品2点またはアイコン素材",
      style: "スタイル: 比較重視、整理された表、視認性高め",
      sourceUrl: "",
      sourceLabel: "source unavailable",
      prompt: `アップロードした写真やアイコンを使って、複数案の違いが一目で伝わる比較インフォグラフィックを作成してください。

目的:
- 違い、選び方、向いている人をひと目で伝える
- 比較記事、紹介投稿、サービス説明資料に転用しやすい見た目にする

レイアウト:
- 2列または3列の比較構成にする
- 比較軸ごとに情報を並べ、視線移動で違いが分かるようにする
- 上部に総評や選び方の一言を入れる

タイポグラフィ:
- 項目名と結論がすぐ読めるよう、見出しとラベルを明快にする
- 本文は短く、表のように読み進めやすくする

カラーと質感:
- 背景は明るく清潔感を保つ
- 比較対象ごとにアクセント色を分けるが、全体の色数は抑える

写真の扱い:
- 比較対象の輪郭や差が見えるよう、同じサイズ感で扱う

出力:
- 比較ポイントとおすすめが短時間で伝わる1枚画像

禁止事項:
- 行や列を増やしすぎて読みにくくしない
- 装飾で比較軸を曖昧にしない`
    },
    kids: {
      title: "キッズヘアスタイル",
      summary: "男女を自動判断し、子ども向けに上部診断カードと長さ変化マトリックスで提案するヘアスタイル診断。",
      photo: "写真: キッズの自撮りまたは正面写真1枚 + 参照インフォグラフィック1枚",
      style: "スタイル: キッズ美容雑誌風、清潔感、やわらかい配色、日本語組版",
      sourceUrl: "https://x.com/katap_yutori/status/2048318468878221555",
      sourceLabel: "source",
      guideModes: {
        primary: "サラウンド",
        secondary: "メガネ"
      },
      promptSurround: `添付した子どもの画像の人物をモデルにし、参照画像の美容診断インフォグラフィックを「構成・レイアウトのみ」忠実に再現してください。参照画像の文字内容や名称はコピーせず、内容は自動生成してください。

【全体】
- 縦長A4風の1枚完結インフォグラフィック
- 白〜生成り背景、薄いベージュの罫線、上品で清潔感のある日本のキッズ美容雑誌風
- 見出しは明朝体風、本文は読みやすいゴシック体風
- 日本語で自然に組版し、文字化けを避ける
- 参照画像と同程度の情報量・余白感・誌面密度を保つ

【人物】
- アップロード画像の人物を本人に似せる。別人化しない
- 男女は画像から自動で自然に判断する
- 顔立ち、輪郭、肌色、雰囲気を維持する
- 全カットで同一人物性を保つ
- 服装は維持する
- 表情は自然で明るく清潔感のある印象
- 指定がなければ元のアップロード画像をベースにする
- 子どもらしい自然さを保ち、過度な大人化を避ける

【上部：キッズヘアスタイル】
- タイトル「キッズヘアスタイル」
- サブタイトル「この子に一番似合う髪型は？」
- 上部に大きな診断カードを3枚横並びで配置
- 左から「一番似合う」「普通」「あまりおすすめしない」
- 左カードには王冠アイコン
- 各カードの髪型名、説明文、評価は自動生成
- 左が高評価、中央が中評価、右が低評価
- 3カードの髪型はすべて異なるものにする

【中段：髪型一覧】
- 必ず3行×5列、合計15枚で構成する
- 左の縦ラベルは上から「ベーシック」「スマート」「アレンジ」
- 横方向は左から右へ進むほど髪が短めから長めへ自然に変化するようにする
- 各セルに小さな人物写真と日本語の髪型名を入れる
- 15セルすべて異なる髪型にする
- 1行目はベーシック系5種、2行目はスマート系5種、3行目はアレンジ系5種
- 左端が最も短め、右端が最も長めに見える構成にする
- 性別は固定せず、画像の人物に自然に合う髪型を自動生成する

【下部：サラウンドガイド】
- タイトル「サラウンドガイド」
- サブタイトル「おすすめ髪型をいろいろな角度から見る」
- 指定がなければ、上部で最もおすすめと判断した髪型をベースにする
- 下部に5つの視点パターンを横並びで配置する
- 並び順は必ず以下の通り：
  1. 斜め前
  2. 横
  3. 斜め後ろ
  4. 後ろ
  5. 上から
- 5パターンすべて同一人物で、髪型・服装・表情・人物性を揃える
- 主な違いは視点だけにする
- 各パターンに短い説明文を付ける

【最重要】
- 参照画像の「構成」「セクションの並び」「上部3カード」「中段3×5一覧」「下部ガイド欄」の構成バランスは忠実に再現する
- ただし、髪型名・診断文・評価・候補一覧・サラウンド説明文はすべて自動生成する
- 参照画像の文字内容はそのまま複製しない
- 中段は必ず15枚を維持する
- 縦軸は「ベーシック」「スマート」「アレンジ」
- 横軸は左から右へ髪が短めから長めになる構成にする

【避けること】
- 参照画像の髪型名や文章の流用
- 英語だけの文字
- 文字化け
- 別人化
- 顔の歪み
- 過度なアニメ調
- 過度な美肌加工
- 派手すぎる配色
- レイアウトの簡略化
- 情報量の削減`,
      promptGlasses: `添付した子どもの画像の人物をモデルにし、参照画像の美容診断インフォグラフィックを「構成・レイアウトのみ」忠実に再現してください。参照画像の文字内容や名称はコピーせず、内容は自動生成してください。

【全体】
- 縦長A4風の1枚完結インフォグラフィック
- 白〜生成り背景、薄いベージュの罫線、上品で清潔感のある日本のキッズ美容雑誌風
- 見出しは明朝体風、本文は読みやすいゴシック体風
- 日本語で自然に組版し、文字化けを避ける
- 参照画像と同程度の情報量・余白感・誌面密度を保つ

【人物】
- アップロード画像の人物を本人に似せる。別人化しない
- 男女は画像から自動で自然に判断する
- 顔立ち、輪郭、肌色、雰囲気を維持する
- 全カットで同一人物性を保つ
- 服装は維持する
- 表情は自然で明るく清潔感のある印象
- 指定がなければ元のアップロード画像をベースにする
- メガネ以外の要素を過度に変えない
- 子どもらしい自然さを保ち、過度な大人化を避ける

【上部：キッズヘアスタイル】
- タイトル「キッズヘアスタイル」
- サブタイトル「この子に一番似合う髪型は？」
- 上部に大きな診断カードを3枚横並びで配置
- 左から「一番似合う」「普通」「あまりおすすめしない」
- 左カードには王冠アイコン
- 各カードの髪型名、説明文、評価は自動生成
- 左が高評価、中央が中評価、右が低評価
- 3カードの髪型はすべて異なるものにする

【中段：髪型一覧】
- 必ず3行×5列、合計15枚で構成する
- 左の縦ラベルは上から「ベーシック」「スマート」「アレンジ」
- 横方向は左から右へ進むほど髪が短めから長めへ自然に変化するようにする
- 各セルに小さな人物写真と日本語の髪型名を入れる
- 15セルすべて異なる髪型にする
- 1行目はベーシック系5種、2行目はスマート系5種、3行目はアレンジ系5種
- 左端が最も短め、右端が最も長めに見える構成にする
- 性別は固定せず、画像の人物に自然に合う髪型を自動生成する

【下部：メガネパターンガイド】
- タイトル「メガネパターンガイド」
- サブタイトル「あなたに似合うメガネの提案」
- 下部に5つのメガネパターンを横並びで配置する
- 並び順は必ず以下の通り：
  1. ボストン
  2. ウェリントン
  3. スクエア
  4. ブロウライン
  5. メタルラウンド
- 5パターンすべて同一人物で、服装・表情・撮影条件・人物性を揃え、主な違いはメガネだけにする
- 指定がなければ元のアップロード画像をベースにする
- 各パターンに以下を含める：
  - 小見出し
  - フレーム名
  - 小さめの人物写真
  - 似合い方や印象の短い説明文
  - 顔立ちとの相性コメント
- 大人向けと同じ5パターン構成を使う

【最重要】
- 参照画像の「構成」「セクションの並び」「上部3カード」「中段3×5一覧」「下部ガイド欄」の構成バランスは忠実に再現する
- ただし、髪型名・診断文・評価・候補一覧・メガネ提案文はすべて自動生成する
- 参照画像の文字内容はそのまま複製しない
- 中段は必ず15枚を維持する
- 縦軸は「ベーシック」「スマート」「アレンジ」
- 横軸は左から右へ髪が短めから長めになる構成にする

【避けること】
- 参照画像の髪型名や文章の流用
- 英語だけの文字
- 文字化け
- 別人化
- 顔の歪み
- 過度なアニメ調
- 過度な美肌加工
- 派手すぎる配色
- レイアウトの簡略化
- 情報量の削減`
    },
    glasses: {
      title: "おすすめメガネスタイル比較",
      summary: "同一人物にさまざまなメガネをかけさせて、形・素材・おすすめ色を比較する横長インフォグラフィック。",
      photo: "写真: 顔がはっきり分かる人物画像1枚",
      style: "スタイル: 横長、清潔感、白基調、比較表、日本語組版",
      sourceUrl: "https://x.com/katap_yutori/status/2048318468878221555",
      sourceLabel: "source",
      editHeading: "カラー編集",
      customHeading: "追加プロンプト",
      customPlaceholder: "例: 全体はブラウン系中心。ボストンはべっ甲、メタルはゴールド寄りで比較する。",
      colorHeading: "カラー編集",
      colorPlaceholder: "例: ブラックとべっ甲を中心に、ラウンドは小ぶりに。",
      customInstructionLabel: "追加のメガネカラー指定",
      prompt: `同一人物のリアルな顔写真をベースに、メガネのみを変更した比較インフォグラフィックを生成する。

【最重要要件】
各メガネ形状およびサイズの違いが一目で明確に識別できるよう、形状特徴とサイズ差を強調して描写すること。
中間的な形状や曖昧なデザインは禁止。

【人物条件】
- 同一人物（顔・髪型・肌色・表情・ライティング完全固定）
- 正面向きバストアップ
- 背景は白〜淡いベージュで統一
- 顔サイズ・位置・角度は全画像で一致

【メガネ描写ルール（重要）】
各フレームは以下の「形状定義」に厳密に従うこと：

■ ラウンド（重要：小さめサイズ）
- 完全な円形
- 横幅と縦幅が同一
- 他のフレームより明確に小さいサイズにする
- 顔幅に対してレンズ幅は約40〜45%程度
- 目の周囲に収まるコンパクト設計（頬にかからない）
- リムは細め
- 知的・クラシックな印象

■ ボストン
- 上部が丸く、下部がやや直線
- やや逆三角気味
- クラシック感あり
- サイズは標準

■ ウェリントン
- 上辺が水平で、下に向かって広がる台形
- やや角あり
- バランス型
- サイズはやや大きめ

■ スクエア
- 明確な四角形
- 直線的でシャープ
- 角は丸めすぎない
- 横幅を強調し大きめサイズ

■ オーバル
- 横長の楕円
- ラウンドより潰れた形状
- 細長く柔らかい
- サイズはやや小さめ

■ キャットアイ
- 外側上部が明確に吊り上がる
- はっきりした角度をつける
- 横方向にやや広がる
- 個性的シルエット

【サイズ差の明示ルール】
- 各フレームはサイズ感も明確に差をつける
- ラウンド：最小サイズ（小ぶり）
- オーバル：やや小さめ
- ボストン：標準
- ウェリントン：やや大きめ
- スクエア：大きめ（横幅強調）
- キャットアイ：横幅やや広め＋外側強調

※全フレーム同サイズは禁止
※ラウンドは一目で小さいと認識できること（必須）

【形状強調ルール】
- 各形状は「他と明確に違う輪郭」を持たせる
- ラウンドに寄せない
- サイズ・太さ・角度で差を強調
- 中間形状は禁止（例：ラウンド寄りスクエア）

【素材ごとの描写】
- メタル：細くシャープ、リム細め
- アセテート：厚みあり、存在感強い
- 木製：木目テクスチャを明確に表示
- 透明樹脂：透過感と輪郭の軽さを強調

【色選定ルール】
人物に自然に似合う色を選定する：
ブラック、ダークブラウン、べっ甲、ガンメタル、ネイビー、クリア、グレーなど
派手な色は禁止

【構成】
■ 上部：おすすめ3選（大きく表示）
1. ビジネス向け
   - 信頼感・知的・清潔感
2. 日常・カジュアル向け
   - 自然・親しみやすい
3. ファッション重視
   - 個性・スタイル感

各項目に以下を表示：
- 形
- 素材
- 推奨カラー
- 理由

■ 下部：比較マトリックス
横軸：形（6種）
- ラウンド / ボストン / ウェリントン / スクエア / オーバル / キャットアイ

縦軸：素材（4種）
- メタル / アセテート / 木製 / 透明樹脂

各セルに：
- メガネ着用画像（同一人物）
- 「形 × 素材」
- 「おすすめ色」

【デザイン】
- 横長インフォグラフィック
- 上部おすすめを目立たせる
- 下部は整然としたグリッド
- 余白広めで過密禁止
- 日本語ラベル明確
- フォントはシンプルで視認性重視
- 色は白・ライトグレー・淡いベージュ基調

【タイトル】
おすすめメガネスタイル比較

【注記】
フレーム色は指定がない場合、顔立ち・肌色・髪色に合わせて自動提案

【禁止事項】
- 形状の混在（例：ラウンド寄りスクエア）
- フレーム差が不明瞭
- サイズ差が不明瞭
- 顔の変形
- ライティング変更
- 背景変更`
    },
    suit: createOutfitSample({
      title: "スーツカラー比較",
      summary: "同一人物でスーツカラーの違いを見せる比較カード向けインフォグラフィック。",
      itemLabel: "スーツカラー",
      variationLabel: "カラー",
      variations: ["ネイビー", "チャコールグレー", "ミディアムグレー", "ベージュ", "ブラック"],
      customHeading: "カラー指定",
      customPlaceholder: "例: 秋冬向けに深めの色中心。おすすめはネイビー寄りで比較する。",
      customInstructionLabel: "追加のスーツカラー指定",
      patternOptions: null,
      defaultHeight: "170cm",
      stylingNote: "スーツ以外はシャツ、靴、背景トーンをできるだけ統一し、スーツカラーの差が主役になるようにする。"
    }),
    dress: createOutfitSample({
      title: "ドレスカラー比較",
      summary: "同一人物でドレスカラーの違いを見せる比較カード向けインフォグラフィック。",
      itemLabel: "ドレスカラー",
      variationLabel: "カラー",
      variations: ["ブラック", "ネイビー", "ボルドー", "グリーン", "ベージュピンク"],
      customHeading: "カラー指定",
      customPlaceholder: "例: 落ち着いたホテル会場向け。おすすめはくすみ系カラーでまとめる。",
      customInstructionLabel: "追加のドレスカラー指定",
      patternOptions: null,
      defaultHeight: "160cm",
      stylingNote: "ドレス以外の髪型、アクセサリー、ライティングは揃え、ドレスカラーと見え方の差が分かるようにする。"
    }),
    hat: createOutfitSample({
      title: "帽子比較",
      summary: "同一人物で帽子の種類や見え方を比較する横長インフォグラフィック。",
      itemLabel: "帽子",
      variationLabel: "帽子タイプ",
      variations: ["キャップ", "バケットハット", "ベレー帽", "中折れハット", "ニット帽"],
      customHeading: "帽子指定",
      customPlaceholder: "例: カジュアル寄りで、つばが広すぎないもの中心に比較する。",
      customInstructionLabel: "追加の帽子指定",
      patternOptions: null,
      defaultHeight: "",
      stylingNote: "帽子以外の服装は揃え、帽子の形、つば、素材感による印象差が分かるようにする。"
    }),
    tie: createOutfitSample({
      title: "ネクタイカラー比較",
      summary: "同一人物でネクタイカラーの印象差を見せる比較カード向けインフォグラフィック。",
      itemLabel: "ネクタイカラー",
      variationLabel: "カラー",
      variations: ["ネイビー", "ボルドー", "ダークグリーン", "シルバーグレー", "ブラウン"],
      customHeading: "カラー指定",
      customPlaceholder: "例: ビジネス向け中心。差し色は控えめで上品に比較する。",
      customInstructionLabel: "追加のネクタイカラー指定",
      patternOptions: null,
      defaultHeight: "",
      stylingNote: "スーツ、シャツ、ポーズは統一し、ネクタイカラーだけで印象の違いが明確に伝わるようにする。"
    }),
    shirt: createOutfitSample({
      title: "シャツ・ブラウスカラー比較",
      summary: "同一人物でシャツやブラウスのカラー差を見せる比較カード向けインフォグラフィック。",
      itemLabel: "シャツ・ブラウスカラー",
      variationLabel: "カラー",
      variations: ["ホワイト", "サックスブルー", "ライトグレー", "ピンクベージュ", "ネイビー"],
      customHeading: "カラー指定",
      customPlaceholder: "例: 顔映り重視で、オフィスにも使いやすい色中心に比較する。",
      customInstructionLabel: "追加のシャツ・ブラウスカラー指定",
      patternOptions: null,
      defaultHeight: "",
      stylingNote: "上半身の見え方を揃え、顔映りや清潔感の差がシャツ・ブラウスカラーで分かるようにする。"
    })
  };

  const galleryButtons = salonRoot.querySelectorAll("[data-gallery-select]");
  const galleryCards = salonRoot.querySelectorAll("[data-gallery-card]");
  const galleryPatternButtons = salonRoot.querySelectorAll("[data-gallery-pattern]");
  const galleryPatternGroup = salonRoot.querySelector("[data-gallery-pattern-group]");
  const galleryPatternHeading = salonRoot.querySelector("[data-gallery-pattern-heading]");
  const galleryCustom = salonRoot.querySelector("[data-gallery-custom]");
  const galleryHeightInput = salonRoot.querySelector("[data-gallery-height]");
  const galleryHeightGroup = salonRoot.querySelector("[data-gallery-height-group]");
  const galleryHeightHeading = salonRoot.querySelector("[data-gallery-height-heading]");
  const galleryColorWrap = salonRoot.querySelector("[data-gallery-color-wrap]");
  const galleryColorInput = salonRoot.querySelector("[data-gallery-color]");
  const galleryOutput = salonRoot.querySelector("[data-gallery-output]");
  const galleryTitle = salonRoot.querySelector("[data-gallery-title]");
  const galleryStyle = salonRoot.querySelector("[data-gallery-style]");
  const galleryCopyButton = salonRoot.querySelector("[data-gallery-copy]");
  const gallerySourceLink = salonRoot.querySelector("[data-gallery-source-link]");
  const galleryGuideButtons = salonRoot.querySelectorAll("[data-gallery-guide-mode]");
  const galleryModes = salonRoot.querySelector("[data-gallery-modes]");
  const galleryEditHeading = salonRoot.querySelector("[data-gallery-edit-heading]");
  const galleryCustomHeading = salonRoot.querySelector("[data-gallery-custom-heading]");
  const galleryStripTitle = document.querySelector(".salon-gallery-strip__title");

  let selectedGalleryId = "portrait";
  let selectedGuideMode = "primary";
  const gallerySelections = {};

  const applyGalleryLanguage = () => {
    if (galleryStripTitle) {
      galleryStripTitle.textContent = uiCopy.stripTitle;
    }

    galleryCards.forEach((card) => {
      const sampleId = card.dataset.galleryCard;
      const title = card.querySelector("h3");
      if (title && sampleId) {
        title.textContent = uiCopy.thumbs[sampleId] || title.textContent;
      }
    });

    if (galleryCopyButton) {
      galleryCopyButton.textContent = uiCopy.copyButton;
    }
  };

  applyGalleryLanguage();

  const getGallerySelectionState = (sampleId) => {
    if (!gallerySelections[sampleId]) {
      gallerySelections[sampleId] = {};
    }

    return gallerySelections[sampleId];
  };

  const syncGallerySelectionState = (sampleId) => {
    const sample = salonSamples[sampleId];
    if (!sample) {
      return null;
    }

    const selectionState = getGallerySelectionState(sampleId);

    if (sample.patternOptions) {
      const patternKeys = Object.keys(sample.patternOptions);
      if (!patternKeys.includes(selectionState.pattern)) {
        selectionState.pattern = sample.defaultPattern && patternKeys.includes(sample.defaultPattern)
          ? sample.defaultPattern
          : patternKeys[0];
      }
    } else {
      delete selectionState.pattern;
    }

    if (sample.heightEnabled) {
      if (typeof selectionState.height !== "string" || !selectionState.height.trim()) {
        selectionState.height = sample.defaultHeight;
      }
    } else {
      delete selectionState.height;
    }

    return selectionState;
  };

  const buildGalleryPrompt = () => {
    const sample = salonSamples[selectedGalleryId];
    if (!sample) {
      return "";
    }

    const customText = galleryCustom ? galleryCustom.value.trim() : "";
    const colorText = galleryColorInput ? galleryColorInput.value.trim() : "";
    const selectionState = syncGallerySelectionState(selectedGalleryId);
    let basePrompt = sample.prompt;

    if (sample.guideModes) {
      if (selectedGalleryId === "portrait") {
        if (selectedGuideMode === "secondary") {
          basePrompt = sample.promptMakeup;
        } else if (selectedGuideMode === "tertiary") {
          basePrompt = sample.promptGlasses;
        } else {
          basePrompt = sample.promptHair;
        }
      } else if (selectedGalleryId === "product") {
        if (selectedGuideMode === "secondary") {
          basePrompt = sample.promptBeard;
        } else if (selectedGuideMode === "tertiary") {
          basePrompt = sample.promptGlasses;
        } else {
          basePrompt = sample.promptHair;
        }
      } else if (selectedGalleryId === "kids") {
        if (selectedGuideMode === "secondary") {
          basePrompt = sample.promptGlasses;
        } else {
          basePrompt = sample.promptSurround;
        }
      }
    }

    const promptSections = [];

    if (sample.patternOptions && selectionState?.pattern) {
      const patternLabel = sample.patternOptions[selectionState.pattern];
      if (patternLabel) {
        promptSections.push(`${sample.patternHeading || "体型パターン"}:\n- ${patternLabel}`);
      }
    }

    if (typeof selectionState?.height === "string" && selectionState.height.trim()) {
      promptSections.push(`${sample.heightHeading || "身長指定"}:\n- ${selectionState.height.trim()}`);
    }

    if (selectedGalleryId === "glasses" && colorText) {
      promptSections.push(`${sample.colorHeading || "カラー編集"}:\n- ${colorText.split("\n").filter(Boolean).join("\n- ")}`);
    }

    if (customText) {
      const instructionLabel = sample.customInstructionLabel || "追加のカスタム指示";
      promptSections.push(`${instructionLabel}:\n- ${customText.split("\n").filter(Boolean).join("\n- ")}`);
    }

    if (!promptSections.length) {
      return basePrompt;
    }

    return `${basePrompt}

${promptSections.join("\n\n")}`;
  };

  const renderGalleryState = () => {
    const sample = salonSamples[selectedGalleryId];
    if (!sample || !galleryTitle || !galleryStyle || !galleryOutput) {
      return;
    }

    if (sample.guideModes && !sample.guideModes[selectedGuideMode]) {
      selectedGuideMode = "primary";
    }

    const selectionState = syncGallerySelectionState(selectedGalleryId);
    const localizedPatternHeading = getLocalizedSampleText(
      selectedGalleryId,
      "patternHeading",
      sample.patternHeading || uiCopy.patternEditor
    );
    const localizedEditHeading = getLocalizedSampleText(
      selectedGalleryId,
      "editHeading",
      sample.editHeading || localizedPatternHeading || uiCopy.patternEditor
    );

    galleryTitle.textContent = getLocalizedSampleText(selectedGalleryId, "title", sample.title);
    galleryStyle.textContent = stripStylePrefix(getLocalizedSampleText(selectedGalleryId, "style", sample.style));
    galleryOutput.value = buildGalleryPrompt();
    if (galleryEditHeading) {
      galleryEditHeading.textContent = localizedEditHeading;
    }
    if (galleryCustomHeading) {
      galleryCustomHeading.textContent = getLocalizedSampleText(
        selectedGalleryId,
        "customHeading",
        sample.customHeading || uiCopy.additionalPrompt
      );
    }
    if (galleryCustom) {
      galleryCustom.placeholder = getLocalizedSampleText(
        selectedGalleryId,
        "customPlaceholder",
        sample.customPlaceholder || (isEnglishPage
          ? "Example: Make it more refined. Use a vertical poster layout and keep the numbers to two."
          : "例: もっと上品に。縦長ポスターにして、数字実績は2つだけに絞る。")
      );
    }
    if (galleryPatternHeading && galleryPatternHeading !== galleryEditHeading) {
      galleryPatternHeading.textContent = localizedPatternHeading;
    }
    if (galleryPatternGroup) {
      galleryPatternGroup.hidden = !sample.patternOptions || selectedGalleryId === "glasses";
      galleryPatternGroup.style.display = selectedGalleryId === "glasses" ? "none" : "";
      if (isEnglishPage) {
        galleryPatternGroup.setAttribute("aria-label", uiCopy.patternEditor);
      }
    }
    galleryPatternButtons.forEach((button) => {
      const patternKey = button.dataset.galleryPattern;
      const label = patternKey && sample.patternOptions ? sample.patternOptions[patternKey] : "";
      const isSelected = Boolean(patternKey) && selectionState?.pattern === patternKey;
      button.hidden = !label;
      button.disabled = !label;
      button.setAttribute("aria-disabled", String(!label));
      button.setAttribute("aria-pressed", String(isSelected));
      if (label) {
        button.textContent = label;
      }
    });
    const showHeightField = Boolean(sample.heightEnabled);
    if (galleryHeightHeading) {
      galleryHeightHeading.textContent = getLocalizedSampleText(
        selectedGalleryId,
        "heightHeading",
        sample.heightHeading || uiCopy.height
      );
      galleryHeightHeading.hidden = !showHeightField;
    }
    if (galleryHeightGroup) {
      galleryHeightGroup.hidden = !showHeightField;
      galleryHeightGroup.style.display = showHeightField ? "" : "none";
    }
    if (galleryHeightInput) {
      galleryHeightInput.hidden = !showHeightField;
      galleryHeightInput.style.display = showHeightField ? "" : "none";
      galleryHeightInput.placeholder = getLocalizedSampleText(
        selectedGalleryId,
        "heightPlaceholder",
        sample.heightPlaceholder || (isEnglishPage ? "Example: 165 cm" : "例: 165cm")
      );
      galleryHeightInput.value = typeof selectionState?.height === "string" ? selectionState.height : "";
    }
    const showColorField = selectedGalleryId === "glasses";
    if (galleryColorWrap) {
      galleryColorWrap.hidden = !showColorField;
      galleryColorWrap.style.display = showColorField ? "" : "none";
    }
    if (galleryColorInput) {
      galleryColorInput.placeholder = getLocalizedSampleText(
        selectedGalleryId,
        "colorPlaceholder",
        sample.colorPlaceholder || (isEnglishPage
          ? "Example: Center on black and tortoiseshell, keep the round frames small."
          : "例: ブラックとべっ甲を中心に、ラウンドは小ぶりに。")
      );
      galleryColorInput.value = gallerySelections[selectedGalleryId]?.color || "";
    }
    if (galleryModes) {
      galleryModes.hidden = !sample.guideModes || selectedGalleryId === "glasses";
      galleryModes.style.display = selectedGalleryId === "glasses" ? "none" : "";
    }

    if (gallerySourceLink) {
      gallerySourceLink.textContent = getLocalizedSampleText(
        selectedGalleryId,
        "sourceLabel",
        sample.sourceLabel || uiCopy.sourceUnavailable
      );
      if (sample.sourceUrl) {
        gallerySourceLink.href = sample.sourceUrl;
        gallerySourceLink.removeAttribute("aria-disabled");
      } else {
        gallerySourceLink.href = "#";
        gallerySourceLink.setAttribute("aria-disabled", "true");
      }
    }

    galleryGuideButtons.forEach((button) => {
      if (selectedGalleryId === "glasses") {
        button.hidden = true;
        button.style.display = "none";
        button.disabled = true;
        return;
      }

      const hasGuideModes = Boolean(sample.guideModes);
      const modeKey = button.dataset.galleryGuideMode;
      const label = hasGuideModes && modeKey
        ? getLocalizedSampleText(selectedGalleryId, "guideModes", sample.guideModes)?.[modeKey] || sample.guideModes[modeKey]
        : "";
      const isSelected = button.dataset.galleryGuideMode === selectedGuideMode;
      button.setAttribute("aria-pressed", String(isSelected));
      button.hidden = !label;
      button.setAttribute("aria-disabled", String(!label));
      button.disabled = !label;
      button.style.display = label ? "" : "none";
      button.textContent = label;
    });

    galleryCards.forEach((card) => {
      card.classList.toggle("is-selected", card.dataset.galleryCard === selectedGalleryId);
    });

    galleryButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.gallerySelect === selectedGalleryId));
    });
  };

  galleryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextId = button.dataset.gallerySelect;
      if (!salonSamples[nextId]) {
        return;
      }

      selectedGalleryId = nextId;
      renderGalleryState();

      if (galleryCopyButton) {
        const feedbackId = galleryCopyButton.getAttribute("data-copy-feedback");
        const feedback = feedbackId ? document.getElementById(feedbackId) : null;
        if (feedback) {
          feedback.textContent = "";
        }
      }
    });
  });

  galleryPatternButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const sample = salonSamples[selectedGalleryId];
      const patternKey = button.dataset.galleryPattern;
      if (!sample?.patternOptions || !patternKey || !sample.patternOptions[patternKey]) {
        return;
      }

      const selectionState = syncGallerySelectionState(selectedGalleryId);
      if (!selectionState) {
        return;
      }

      selectionState.pattern = patternKey;
      renderGalleryState();
    });
  });

  if (galleryCustom && galleryOutput) {
    galleryOutput.id = galleryOutput.id || "salon-gallery-output";
    if (galleryCopyButton) {
      galleryCopyButton.setAttribute("data-copy-target", galleryOutput.id);
    }

    galleryCustom.addEventListener("input", () => {
      renderGalleryState();
    });
  }

  if (galleryHeightInput) {
    galleryHeightInput.addEventListener("input", () => {
      const selectionState = syncGallerySelectionState(selectedGalleryId);
      if (!selectionState) {
        return;
      }

      selectionState.height = galleryHeightInput.value;
      renderGalleryState();
    });
  }

  if (galleryColorInput) {
    galleryColorInput.addEventListener("input", () => {
      gallerySelections[selectedGalleryId] = gallerySelections[selectedGalleryId] || {};
      gallerySelections[selectedGalleryId].color = galleryColorInput.value;
      renderGalleryState();
    });
  }

  galleryGuideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const sample = salonSamples[selectedGalleryId];
      if (!sample.guideModes) {
        return;
      }

      if (!sample.guideModes[button.dataset.galleryGuideMode]) {
        return;
      }

      selectedGuideMode = button.dataset.galleryGuideMode || "primary";
      renderGalleryState();

      if (galleryCopyButton) {
        const feedbackId = galleryCopyButton.getAttribute("data-copy-feedback");
        const feedback = feedbackId ? document.getElementById(feedbackId) : null;
        if (feedback) {
          feedback.textContent = "";
        }
      }
    });
  });

  renderGalleryState();
}
