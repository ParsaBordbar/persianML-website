import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      nav: {
        collections: 'Collections',
        bina: 'Bina OCR',
        live: 'Demo',
        datasets: 'Datasets',
        community: 'Community',
        hf: 'Hugging Face ↗',
      },
      hero: {
        eyebrow: 'PersianML · Persian AI Community',
        title: 'Bina, the open OCR model that reads Persian documents.',
        sub: 'Bina (بینا, “sighted”) is a 0.7B-parameter Persian OCR model — a LoRA finetune of Surya OCR 2, served through vLLM and running live on PersianVLM.com. Open weights, from the community that also builds Shenava ASR, Gooya TTS, and a 14.7M-row Persian corpus.',
        explore: 'Get the weights',
        demo: 'Try it live ↗',
        license: 'Open weights · open data',
        scanCaption: 'block_0 · text_line · lang=fa',
      },
      stats: {
        models: 'open models',
        datasets: 'open datasets',
        collections: 'collections',
        maintainers: 'maintainers',
        corpus: 'Persian corpus rows',
        bench: 'benchmark documents',
      },
      families: {
        eyebrow: 'The stack',
        title: 'One community, a full Persian stack.',
        sub: 'Five model families cover the pipeline end to end — hear it, say it, read it, reason about it, and tokenize it.',
        items: [
          {
            fa: 'شنوا',
            name: 'Shenava',
            role: 'Speech recognition',
            desc: 'Persian ASR finetuned from NVIDIA FastConformer. Rizeh, Koochik, and Lite variants shipped as ONNX, CoreML, sherpa-onnx, and tract builds — server to iPhone.',
            href: 'https://huggingface.co/PersianML/Shenava-Koochik-v1.0',
          },
          {
            fa: 'گویا',
            name: 'Gooya',
            role: 'Text-to-speech',
            desc: 'Persian TTS — a LoRA finetune of MOSS-TTS-Nano trained on 48k phonemized Persian clips, focused on getting Persian pronunciation right.',
            href: 'https://huggingface.co/PersianML/gooya-0.1',
          },
          {
            fa: 'بینا',
            name: 'Bina',
            role: 'OCR & documents',
            desc: 'A 0.7B Persian OCR model — LoRA finetune of Surya OCR 2. Reads scans and PDFs into structured, ordered text.',
            href: 'https://huggingface.co/PersianML/Bina-0.1-Koochik',
          },
          {
            fa: 'دانا',
            name: 'Dana',
            role: 'Language models',
            desc: 'Dana — Persian-tuned Gemma 2 and 3 finetunes, 2B–4B, with GGUF builds for local inference.',
            href: 'https://huggingface.co/PersianML/gemma-3-4b-persian',
          },
          {
            fa: 'داده',
            name: 'Tokenizers & corpora',
            role: 'Foundations',
            desc: 'Persian BPE, Unigram, and WordPiece tokenizers plus the 14.7M-row persian-text-corpus that feeds everything above.',
            href: 'https://huggingface.co/PersianML/persian-bpe-tokenizer',
          },
        ],
      },
      bina: {
        eyebrow: 'Featured · vision & OCR',
        title: 'Bina: documents in, structure out.',
        sub: 'Bina is 0.7B parameters of merged BF16 LoRA on Surya OCR 2, Qwen3.5 architecture, OpenRAIL license. It ships in four formats and is deployed in production as بینا ۰٫۱ کوچک on PersianVLM.com, with inference handled by vLLM through the Surya package.',
        outputs: [
          {
            title: 'Ordered blocks',
            body: 'Reading-order text blocks with layout labels, so documents reconstruct as documents — not a bag of strings.',
          },
          {
            title: 'HTML + plain text',
            body: 'Each block is recognized as structured HTML or raw text, preserving tables, headings, and emphasis.',
          },
          {
            title: 'Bounding boxes',
            body: 'Pixel coordinates for every block, ready for overlay UIs, redaction, or downstream layout models.',
          },
          {
            title: 'Confidence scores',
            body: 'Per-block confidence for triage and human review. Deterministic decoding recommended for baselines.',
          },
        ],
        table: {
          repo: 'repository',
          params: 'params',
          format: 'format',
          target: 'target',
          notes: 'notes',
        },
        variants: [
          {
            name: 'Bina-0.1-Koochik',
            size: '0.7B',
            format: 'BF16 safetensors',
            target: 'NVIDIA GPU · Surya runtime',
            note: 'Merged release of the Persian OCR LoRA checkpoint. The reference variant.',
          },
          {
            name: 'Bina-0.1-Koochik-GGUF',
            size: '0.6B',
            format: 'GGUF · Q4_K_M · 366 MB',
            target: 'llama.cpp · CPU / edge',
            note: 'Single Q4_K_M quant for local inference without a GPU. Pair it with the bundled mmproj vision-projector file or images won’t load.',
          },
          {
            name: 'Bina-0.1-Koochik-CoreML-Six-Bucket',
            size: '0.7B',
            format: 'CoreML',
            target: 'Apple Silicon · iOS / macOS',
            note: 'Six-bucket CoreML conversion for on-device Apple deployment.',
          },
          {
            name: 'Bina-0.1-Flax-BF16',
            size: '0.7B',
            format: 'Flax BF16',
            target: 'JAX / TPU',
            note: 'Flax weights for JAX training and TPU inference pipelines.',
          },
        ],
        benchTitle: 'Tested on real Persian paperwork.',
        benchBody:
          'The persian-ocr-benchmark dataset pairs 100 real Persian document images with reference transcriptions, so you can see how OCR holds up outside the lab.',
        benchCard: 'dataset card',
        benchRows: [
          ['samples', '100 image–text pairs'],
          ['size', '≈17 MB · jpg / png / webp'],
          ['fields', 'image · id · page · type · text · language · checked · notes'],
          ['language', 'fa'],
          ['format', 'JSONL + images · 🤗 datasets'],
        ],
        benchNote:
          'Each row carries a review-status (checked) field and reviewer notes. Use deterministic decoding when comparing models against this baseline.',
        promptTitle: 'GGUF prompt format',
        promptNote: 'The llama.cpp build answers in HTML — one div per block, with label and normalized bounding box:',
        reqTitle: 'requirements',
        reqs: [
          'Linux or WSL2 with an NVIDIA GPU',
          'Python 3.10+',
          'surya-ocr ≥ 0.20.0',
          'Docker + NVIDIA Container Toolkit',
        ],
        usageNote:
          'Snippet is illustrative — check the model card for the exact runtime flags of your Surya version. Weights follow the upstream Surya OCR 2 OpenRAIL license; review it before redistribution.',
      },
      datasets: {
        eyebrow: 'Open data',
        title: 'The data underneath.',
        sub: '19 open datasets, from a 14.7M-row web corpus to small, focused evaluation sets.',
        table: { name: 'dataset', rows: 'rows', what: 'what it is' },
        items: [
          {
            name: 'persian-text-corpus',
            rows: '14.7M',
            what: 'Large-scale Persian text corpus for pretraining and tokenizers.',
          },
          {
            name: 'persian-tts',
            rows: '82.2k',
            what: 'Persian speech–text pairs for training and evaluating speech models.',
          },
          {
            name: 'persian-ocr-benchmark',
            rows: '100',
            what: 'Human-verified OCR evaluation set of real documents.',
          },
          {
            name: 'persian-tweets-2024',
            rows: '900',
            what: 'Contemporary social-media Persian.',
          },
          {
            name: 'persian-konkur-1404 + eval sets',
            rows: '—',
            what: 'Multiple-choice and general-knowledge benchmarks for Persian LLMs.',
          },
        ],
      },
      community: {
        eyebrow: 'Built in the open',
        title: 'A growing community.',
        sub: 'Everything ships with open weights on Hugging Face — models, datasets, and benchmarks, with discussions open to everyone.',
        cards: [
          ['29', 'open models'],
          ['19', 'open datasets'],
          ['5', 'maintainers'],
        ],
        maintainedBy: 'Maintained by',
        and: 'and',
        withCommunity: ', with the Persian AI community.',
        members: [
          { name: 'Reza Sayar', handle: 'Reza2kn' },
          { name: 'Mohammad Shojaei', handle: 'mshojaei77' },
          { name: 'Masoud Marandi', handle: 'masoudmarandi' },
          { name: 'Hasan Movahed', handle: 'hasanmova' },
          { name: 'Mostafa Rezaee', handle: 'mostafa-mr' },
        ],
      },
      live: {
        eyebrow: 'Demo · sample document',
        title: 'Point Bina at a document.',
        sub: 'A sample page in four Persian handwriting styles, with the OCR result Bina produces for it — no account, no token, nothing leaves your browser.',
        running: 'Reading…',
        output: 'output',
        empty: 'Output appears here.',
        demoBtn: 'Run demo OCR',
        demoNote:
          'The result is pre-computed, so you can see the output format — ordered blocks with labels and normalized bounding boxes — without any inference call.',
        demoTag: '· sample (cached)',
        warn: 'Want to run Bina live on your own images? The production deployment is at',
      },
      footer: {
        line: 'PersianML — open models, datasets, and benchmarks for Persian AI. Not an official PersianML site.',
        designedBy: 'Designed by',
      },
    },
  },
  fa: {
    translation: {
      nav: {
        collections: 'مجموعه‌ها',
        bina: 'بینا OCR',
        live: 'دمو',
        datasets: 'دیتاست‌ها',
        community: 'انجمن',
        hf: '↗ مشاهده در هاگینگ‌فیس',
      },
      hero: {
        eyebrow: 'PersianML · جامعهٔ متن‌باز هوش مصنوعی فارسی',
        title: 'بینا؛ مدل OCR بازی که فارسی را درست می‌خواند',
        sub: 'بینا یک مدل OCR فارسی با حدود ۷۰۰ میلیون پارامتر است؛ مدلی سبک، باز و کاربردی که اسناد فارسی را به متن مرتب و ساخت‌یافته تبدیل می‌کند. بینا با LoRA روی Surya OCR 2 آموزش دیده، با vLLM اجرا می‌شود و همین حالا می‌توانید آن را در PersianVLM.com امتحان کنید. وزن‌های مدل کاملاً در دسترس‌اند و بینا هم بخشی از همان خانواده‌ای است که «شنوا» برای تشخیص گفتار، «گویا» برای تبدیل متن به گفتار و پیکرهٔ ۱۴٫۷ میلیون‌ردیفی فارسی را ساخته است.',
        explore: 'دریافت وزن‌ها',
        demo: '↗ امتحان رایگان بینا',
        license: 'وزن‌های باز · داده‌های باز',
        scanCaption: 'block_0 · text_line · lang=fa',
      },
      stats: {
        models: 'مدل باز',
        datasets: 'دیتاست باز',
        collections: 'مجموعه',
        maintainers: 'نگه‌دارنده',
        corpus: 'ردیف در پیکرهٔ فارسی',
        bench: 'سند واقعی در بنچمارک OCR',
      },
      families: {
        eyebrow: 'همهٔ ابزارهای PersianML',
        title: 'یک جامعه؛ مجموعه‌ای کامل از ابزارهای فارسی',
        sub: 'پنج خانوادهٔ مدل، مسیر هوش مصنوعی فارسی را از شنیدن و صحبت‌کردن تا خواندن و درک متن پوشش می‌دهند.',
        items: [
          {
            fa: 'شنوا',
            name: 'Shenava',
            role: 'تشخیص گفتار',
            desc: 'تشخیص گفتار فارسی بر پایهٔ FastConformer انویدیا. نسخه‌های ریزه، کوچک و لایت در قالب‌های ONNX، CoreML، sherpa-onnx و tract منتشر شده‌اند؛ مناسب برای اجرا از سرور تا آیفون.',
            href: 'https://huggingface.co/PersianML/Shenava-Koochik-v1.0',
          },
          {
            fa: 'گویا',
            name: 'Gooya',
            role: 'تبدیل متن به گفتار',
            desc: 'مدل تبدیل متن فارسی به گفتار که با LoRA روی MOSS-TTS-Nano آموزش دیده است. گویا از ۴۸ هزار نمونهٔ صوتی فارسی استفاده می‌کند و تمرکزش بر تلفظ طبیعی و درست واژه‌هاست.',
            href: 'https://huggingface.co/PersianML/gooya-0.1',
          },
          {
            fa: 'بینا',
            name: 'Bina',
            role: 'OCR و پردازش اسناد',
            desc: 'مدل OCR فارسی با حدود ۷۰۰ میلیون پارامتر که با LoRA روی Surya OCR 2 آموزش دیده است. بینا تصویر اسکن‌شده و صفحات PDF را به متن مرتب و ساخت‌یافته تبدیل می‌کند.',
            href: 'https://huggingface.co/PersianML/Bina-0.1-Koochik',
          },
          {
            fa: 'دانا',
            name: 'Dana',
            role: 'مدل‌های زبانی',
            desc: 'نسخه‌های فارسی‌سازی‌شدهٔ Gemma 2 و Gemma 3 با اندازه‌های ۲ تا ۴ میلیارد پارامتر، همراه با مدل‌های GGUF برای اجرای آسان روی سیستم شخصی شما.',
            href: 'https://huggingface.co/PersianML/gemma-3-4b-persian',
          },
          {
            fa: 'داده',
            name: 'توکنایزر و پیکره',
            role: 'زیرساخت زبان فارسی',
            desc: 'توکنایزرهای فارسی BPE، Unigram و WordPiece، در کنار پیکرهٔ ۱۴٫۷ میلیون‌ردیفی که زیربنای آموزش و توسعهٔ بسیاری از مدل‌های PersianML است.',
            href: 'https://huggingface.co/PersianML/persian-bpe-tokenizer',
          },
        ],
      },
      bina: {
        eyebrow: 'ویژه · بینایی ماشین و OCR',
        title: 'سند را بدهید؛ متن مرتب تحویل بگیرید',
        sub: 'بینا حدود ۷۰۰ میلیون پارامتر دارد و بر پایهٔ معماری Qwen3.5 ساخته شده است. چک‌پوینت LoRA با دقت BF16 در مدل ادغام شده و وزن‌ها با مجوز OpenRAIL منتشر شده‌اند. بینا در چهار قالب مختلف در دسترس است و نسخهٔ «بینا ۰٫۱ کوچک» همین حالا روی PersianVLM.com اجرا می‌شود. استنتاج مدل نیز با vLLM و از طریق پکیج Surya انجام می‌شود.',
        outputs: [
          {
            title: 'بلوک‌های مرتب و خوانا',
            body: 'متن با همان ترتیبی برمی‌گردد که چشم آن را می‌خواند؛ همراه با برچسب‌های چیدمان. نتیجه شبیه بازسازی یک سند واقعی است، نه مجموعه‌ای از جمله‌های پراکنده و نامرتب.',
          },
          {
            title: 'HTML یا متن ساده؛ انتخاب با شماست',
            body: 'خروجی هر بلوک می‌تواند HTML ساخت‌یافته یا متن خام باشد. جدول‌ها، تیترها و تأکیدها هم تا جای ممکن سر جای خود باقی می‌مانند.',
          },
          {
            title: 'مختصات دقیق هر بخش',
            body: 'برای هر بلوک، مختصات پیکسلی آن را هم دریافت می‌کنید. این اطلاعات برای هایلایت‌کردن متن روی تصویر، پوشاندن اطلاعات حساس و ساخت ابزارهای مبتنی بر چیدمان کاربردی است.',
          },
          {
            title: 'امتیاز اطمینان برای بررسی آسان‌تر',
            body: 'هر بلوک یک امتیاز اطمینان دارد تا سریع‌تر متوجه شوید کدام قسمت‌ها به بررسی انسانی نیاز دارند. اگر مدل‌ها را با هم مقایسه می‌کنید، پیشنهاد می‌کنیم از رمزگشایی قطعی استفاده کنید.',
          },
        ],
        table: {
          repo: 'مخزن',
          params: 'پارامتر',
          format: 'قالب',
          target: 'مناسب برای',
          notes: 'توضیحات',
        },
        variants: [
          {
            name: 'Bina-0.1-Koochik',
            size: '0.7B',
            format: 'BF16 safetensors',
            target: 'GPU انویدیا · محیط اجرای Surya',
            note: 'نسخهٔ مرجع بینا؛ چک‌پوینت LoRA در آن ادغام شده است.',
          },
          {
            name: 'Bina-0.1-Koochik-GGUF',
            size: '0.6B',
            format: 'GGUF · Q4_K_M · 366 MB',
            target: 'llama.cpp · پردازنده · دستگاه‌های لبه',
            note: 'نسخهٔ کم‌حجم Q4_K_M برای اجرای محلی، حتی بدون کارت گرافیک. فایل mmproj یا پروژکتور بینایی را هم کنار مدل قرار دهید تا ورودی تصویر به‌درستی کار کند.',
          },
          {
            name: 'Bina-0.1-Koochik-CoreML-Six-Bucket',
            size: '0.7B',
            format: 'CoreML',
            target: 'اپل سیلیکون · iOS · macOS',
            note: 'نسخهٔ شش‌سطلی CoreML برای اجرای بینا روی دستگاه‌های اپل.',
          },
          {
            name: 'Bina-0.1-Flax-BF16',
            size: '0.7B',
            format: 'Flax BF16',
            target: 'JAX · TPU',
            note: 'وزن‌های Flax برای آموزش با JAX و استنتاج روی TPU.',
          },
        ],
        benchTitle: 'ارزیابی‌شده با اسناد واقعی فارسی',
        benchBody:
          'دیتاست persian-ocr-benchmark شامل ۱۰۰ تصویر از اسناد واقعی فارسی و متن مرجع آن‌هاست. با این مجموعه می‌توانید عملکرد OCR را در شرایط واقعی ببینید، نه فقط روی نمونه‌های آزمایشگاهی.',
        benchCard: 'شناسنامهٔ دیتاست',
        benchRows: [
          ['نمونه‌ها', '۱۰۰ جفت تصویر و متن'],
          ['حجم', 'حدود ۱۷ مگابایت · JPG / PNG / WebP'],
          ['فیلدها', 'image · id · page · type · text · language · checked · notes'],
          ['زبان', 'فارسی (fa)'],
          ['قالب', 'JSONL به‌همراه تصویر · سازگار با 🤗 Datasets'],
        ],
        benchNote:
          'هر ردیف، وضعیت بازبینی (checked) و یادداشت بازبین را هم در خود دارد. برای مقایسهٔ دقیق‌تر مدل‌ها روی این مجموعه، از رمزگشایی قطعی استفاده کنید.',
        promptTitle: 'قالب پرامپت برای نسخهٔ GGUF',
        promptNote:
          'نسخهٔ llama.cpp خروجی را به‌شکل HTML برمی‌گرداند. هر بلوک یک div دارد که نوع محتوا و کادر نرمال‌شدهٔ آن را مشخص می‌کند:',
        reqTitle: 'پیش‌نیازها',
        reqs: [
          'لینوکس یا WSL2 به‌همراه کارت گرافیک انویدیا',
          'پایتون ۳٫۱۰ یا جدیدتر',
          'surya-ocr ≥ 0.20.0',
          'Docker و NVIDIA Container Toolkit',
        ],
        usageNote:
          'این کد یک نمونهٔ شروع سریع است. برای جزئیات سازگار با نسخهٔ Surya خودتان، کارت مدل را ببینید. وزن‌های بینا نیز تابع مجوز OpenRAIL مدل Surya OCR 2 هستند؛ لطفاً پیش از بازنشر، شرایط مجوز را بررسی کنید.',
      },
      datasets: {
        eyebrow: 'داده‌های باز',
        title: 'داده‌هایی برای ساختن، آزمایش‌کردن و بهترشدن',
        sub: '۱۹ دیتاست باز در دسترس شماست؛ از پیکرهٔ وب فارسی با ۱۴٫۷ میلیون ردیف تا مجموعه‌های ارزیابی کوچک، دقیق و بازبینی‌شده.',
        table: { name: 'دیتاست', rows: 'تعداد ردیف', what: 'کاربرد' },
        items: [
          {
            name: 'persian-text-corpus',
            rows: '14.7M',
            what: 'پیکرهٔ بزرگ متن فارسی برای پیش‌آموزش مدل‌ها و ساخت توکنایزر.',
          },
          {
            name: 'persian-tts',
            rows: '82.2k',
            what: 'جفت‌های گفتار و متن فارسی برای آموزش و ارزیابی مدل‌های صوتی.',
          },
          {
            name: 'persian-ocr-benchmark',
            rows: '100',
            what: 'مجموعهٔ ارزیابی OCR شامل تصاویر اسناد واقعی و متن مرجع آن‌ها.',
          },
          {
            name: 'persian-tweets-2024',
            rows: '900',
            what: 'نمونه‌ای از فارسی امروز در شبکه‌های اجتماعی.',
          },
          {
            name: 'persian-konkur-1404 و مجموعه‌های ارزیابی',
            rows: '—',
            what: 'بنچمارک‌های چهارگزینه‌ای و دانش عمومی برای سنجش مدل‌های زبانی فارسی.',
          },
        ],
      },
      community: {
        eyebrow: 'ساخته‌شده با همراهی جامعه',
        title: 'همه‌چیز باز است؛ از وزن‌ها تا گفت‌وگوها',
        sub: 'PersianML با کمک یک جامعهٔ رو‌به‌رشد ساخته می‌شود. مدل‌ها، دیتاست‌ها و بنچمارک‌ها با وزن‌ها و داده‌های باز در هاگینگ‌فیس منتشر می‌شوند و بخش گفت‌وگوها هم برای پرسیدن، پیشنهاد‌دادن و مشارکت‌کردن در دسترس همه است.',
        cards: [
          ['۲۹', 'مدل باز'],
          ['۱۹', 'دیتاست باز'],
          ['۵', 'نگه‌دارنده'],
        ],
        maintainedBy: 'با کوشش',
        and: 'و',
        withCommunity: '، همراه با جامعهٔ هوش مصنوعی فارسی.',
        members: [
          { name: 'رضا سیار', handle: 'Reza2kn' },
          { name: 'محمد شجاعی', handle: 'mshojaei77' },
          { name: 'مسعود مرندی', handle: 'masoudmarandi' },
          { name: 'حسن موحد', handle: 'hasanmova' },
          { name: 'مصطفی رضایی', handle: 'mostafa-mr' },
        ],
      },
      live: {
        eyebrow: 'دمو · سند نمونه',
        title: 'یک سند فارسی به بینا نشان بدهید',
        sub: 'صفحه‌ای نمونه با چهار دست‌خط فارسی، همراه با خروجی‌ای که بینا برای آن تولید می‌کند — بدون حساب کاربری، بدون توکن؛ هیچ داده‌ای از مرورگر شما خارج نمی‌شود.',
        running: 'در حال خواندن…',
        output: 'خروجی',
        empty: 'پس از پایان پردازش، متن استخراج‌شده همین‌جا نمایش داده می‌شود.',
        demoBtn: 'اجرای دموی OCR',
        demoNote:
          'خروجی از پیش محاسبه شده است تا بدون هیچ فراخوانی استنتاج، قالب خروجی بینا را ببینید: بلوک‌های مرتب با برچسب و مختصات نرمال‌شده.',
        demoTag: '· نمونه (ذخیره‌شده)',
        warn: 'می‌خواهید بینا را روی تصویرهای خودتان اجرا کنید؟ نسخهٔ همیشه‌فعال اینجاست:',
      },
      footer: {
        line: 'PersianML — مدل‌ها، دیتاست‌ها و بنچمارک‌های باز برای هوش مصنوعی فارسی. این وب‌سایت، نمایی غیررسمی از فعالیت‌های جامعهٔ PersianML است.',
        designedBy: 'طراحی از',
      },
    },
  },
} as const

i18n.use(initReactI18next).init({
  resources,
  lng: 'fa',
  fallbackLng: 'fa',
  interpolation: { escapeValue: false },
})

export default i18n
