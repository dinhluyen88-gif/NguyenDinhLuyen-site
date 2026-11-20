// Toàn bộ nội dung hồ sơ hiển thị trên website nằm ở file này.
// Sửa chữ ở đây, không cần đụng vào giao diện.

export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "vi";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Thông tin chung, không phụ thuộc ngôn ngữ.
export const site = {
  name: "Nguyễn Đình Luyện",
  alias: "Louis",
  // Đổi thành tên miền thật khi đã có (dùng cho SEO và sitemap).
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  linkedin: "https://www.linkedin.com/in/nguyendinhluyen/",
  // Để trống thì website không hiển thị email. Điền email công khai nếu muốn.
  email: "dinhluyen88@gmail.com",
  // Đặt ảnh chân dung vào public/portrait.jpg rồi điền "/portrait.jpg".
  portrait: "/portrait.jpg",
};

type Role = {
  period: string;
  title: string;
  company: string;
  summary: string;
  points?: string[];
};

type Dictionary = {
  nav: { home: string; about: string; blog: string; contact: string; menu: string; close: string; switchTo: string };
  meta: { title: string; description: string };
  hero: { eyebrow: string; headline: string[]; lede: string; primary: string; secondary: string; nowLabel: string; now: { role: string; org: string }[]; basedLabel: string; based: string };
  stats: { value: string; label: string }[];
  focus: { kicker: string; title: string; items: { title: string; body: string }[] };
  journey: { kicker: string; title: string; more: string };
  writing: { kicker: string; title: string; all: string; empty: string; minutes: string; inVietnamese: string; back: string; translated: string; topics: string };
  press: { kicker: string; title: string; note: string; items: { outlet: string; date: string; title: string; note: string; href: string }[] };
  quote: { text: string; source: string };
  contact: { kicker: string; title: string; body: string; linkedin: string; email: string };
  about: {
    kicker: string;
    title: string;
    intro: string[];
    experienceTitle: string;
    roles: Role[];
    educationTitle: string;
    education: { period: string; title: string; school: string; note?: string }[];
    certTitle: string;
    certs: { year: string; title: string; issuer: string }[];
    languagesTitle: string;
    languages: { name: string; level: string }[];
    beyondTitle: string;
    beyond: string[];
  };
  blog: { kicker: string; title: string; lede: string; all: string };
  categories: Record<string, string>;
  footer: { tagline: string; rights: string };
  portraitAlt: string;
};

const pressLinks = {
  tcdn: "https://taichinhdoanhnghiep.net.vn/di-tim-gia-tri-viet-trong-tung-san-pham-cong-nghe-d35985.html",
  vnexpress: "https://vnexpress.net/vietmap-ky-ket-hop-tac-chien-luoc-voi-icar-viet-nam-4552419.html",
  m1: "https://www.24h.com.vn/tin-tuc-o-to/khai-truong-cong-ty-co-phan-tmdv-m1-viet-nam-hat-giong-moi-cho-nganh-phu-tro-o-to-c332a1544863.html",
  award: "https://www.24h.com.vn/o-to/toan-canh-vietmap-trao-thuong-2022-va-ky-ket-hop-dong-2023-voi-dai-ly-chien-luoc-c747a1430002.html",
  speedmap: "https://www.youtube.com/watch?v=nDf1-wuZt28",
};

export const dictionaries: Record<Locale, Dictionary> = {
  vi: {
    nav: { home: "Trang chủ", about: "Giới thiệu", blog: "Blog", contact: "Liên hệ", menu: "Mở menu", close: "Đóng menu", switchTo: "English" },
    meta: {
      title: "Nguyễn Đình Luyện — Phát triển kinh doanh cho sản phẩm công nghệ",
      description:
        "Trang cá nhân của Nguyễn Đình Luyện (Louis): Head of Business Development tại Zalo Group (VNG) và CEO M1 Việt Nam. Ghi chép về công nghệ, điều hành và cuộc sống.",
    },
    hero: {
      eyebrow: "Nguyễn Đình Luyện · Louis",
      headline: ["Dẫn dắt doanh nghiệp,", "từ chiến lược", "đến kết quả."],
      lede:
        "Hơn 12 năm đưa sản phẩm công nghệ Việt ra thị trường, từ phát triển kinh doanh, đối tác chiến lược đến điều hành toàn bộ doanh nghiệp: bảo mật, ví điện tử, bản đồ số, hệ sinh thái Zalo và ngành phụ trợ ô tô.",
      primary: "Đọc bài viết",
      secondary: "Hành trình của tôi",
      nowLabel: "Hiện tại",
      now: [
        { role: "Head of Business Development", org: "Zalo Group · VNG Corporation" },
        { role: "CEO", org: "M1 Việt Nam JSC" },
      ],
      basedLabel: "Nơi làm việc",
      based: "TP. Hồ Chí Minh, Việt Nam",
    },
    stats: [
      { value: "12+", label: "năm làm kinh doanh sản phẩm công nghệ" },
      { value: "6", label: "năm dẫn dắt kinh doanh tại Vietmap" },
      { value: "~100", label: "nhân sự từng điều hành trên phạm vi toàn quốc" },
      { value: "Top 1", label: "NUS Leadership Development Programme 2023" },
    ],
    focus: {
      kicker: "Tôi làm gì",
      title: "Bốn việc tôi làm mỗi ngày",
      items: [
        {
          title: "Đối tác chiến lược",
          body: "Thiết lập và mở rộng hợp tác với nhà mạng, chuỗi bán lẻ, fintech và nhà sản xuất thiết bị: co-selling, chia sẻ doanh thu, tích hợp phân phối.",
        },
        {
          title: "Tăng trưởng doanh thu",
          body: "Thiết kế và vận hành mô hình doanh thu cho sản phẩm số: subscription, affiliate, bundle, dịch vụ trả trước; tối ưu phễu bán hàng B2B.",
        },
        {
          title: "Thương mại hoá AI",
          body: "Tham gia xây dựng chiến lược kinh doanh cho Kiki, nền tảng AI của Zalo: nghiên cứu mô hình subscription, licensing và dịch vụ nhúng.",
        },
        {
          title: "Sản phẩm khớp thị trường",
          body: "Làm việc cùng Product và Tech để định hướng tính năng theo nhu cầu thực tế của khách hàng và đối tác, rồi đưa sản phẩm ra thị trường.",
        },
      ],
    },
    journey: { kicker: "Hành trình", title: "Từ kỹ sư phần mềm đến người làm kinh doanh công nghệ", more: "Xem đầy đủ" },
    writing: {
      kicker: "Ghi chép",
      title: "Bài viết mới",
      all: "Tất cả bài viết",
      empty: "Chưa có bài viết.",
      minutes: "phút đọc",
      inVietnamese: "Tiếng Việt",
      back: "Tất cả bài viết",
      translated: "Bản dịch từ nguyên bản tiếng Việt",
      topics: "Chủ đề",
    },
    press: {
      kicker: "Báo chí & sự kiện",
      title: "Trên truyền thông",
      note: "Một số bài viết và sự kiện gắn với công việc của tôi.",
      items: [
        {
          outlet: "Tạp chí Tài chính Doanh nghiệp",
          date: "14.01.2023",
          title: "Đi tìm giá trị Việt trong từng sản phẩm công nghệ",
          note: "Phỏng vấn về chiến lược phân phối và giữ vững thị trường trong nước của Vietmap.",
          href: pressLinks.tcdn,
        },
        {
          outlet: "VnExpress",
          date: "27.12.2022",
          title: "Vietmap ký kết hợp tác chiến lược với ICar Việt Nam",
          note: "Phát biểu tại lễ ký kết với vai trò Giám đốc Kinh doanh toàn quốc.",
          href: pressLinks.vnexpress,
        },
        {
          outlet: "24h",
          date: "21.02.2024",
          title: "Khai trương Công ty Cổ phần TMDV M1 Việt Nam",
          note: "Lễ khai trương và ký kết nhượng quyền phân phối thương hiệu phụ trợ ô tô.",
          href: pressLinks.m1,
        },
        {
          outlet: "24h",
          date: "04.01.2023",
          title: "Vietmap trao thưởng 2022 và ký kết hợp đồng 2023 với đại lý chiến lược",
          note: "Chương trình dành cho hệ thống đại lý phần mềm dẫn đường Vietmap.",
          href: pressLinks.award,
        },
        {
          outlet: "YouTube",
          date: "Video",
          title: "Sự kiện ra mắt sản phẩm Vietmap SpeedMap M1",
          note: "Sự kiện ra mắt sản phẩm tại Vietmap.",
          href: pressLinks.speedmap,
        },
      ],
    },
    quote: {
      text: "Cung cấp những giá trị thật sự tốt đẹp đến khách hàng, một cách nhanh và trọn vẹn nhất.",
      source: "Điều tôi theo đuổi trong công việc",
    },
    contact: {
      kicker: "Liên hệ",
      title: "Cùng trao đổi",
      body: "Tôi sẵn lòng trò chuyện về hợp tác kinh doanh, phát triển đối tác, thương mại hoá sản phẩm số, hoặc đơn giản là một cung trekking hay.",
      linkedin: "Kết nối trên LinkedIn",
      email: "Gửi email",
    },
    about: {
      kicker: "Giới thiệu",
      title: "Người làm kinh doanh có gốc kỹ thuật",
      intro: [
        "Tôi là Nguyễn Đình Luyện, bạn bè và đồng nghiệp thường gọi là Louis. Tôi học kỹ sư công nghệ thông tin, rồi rẽ sang kinh doanh từ rất sớm, và hơn 12 năm qua tôi làm một việc xuyên suốt: đưa sản phẩm công nghệ đến tay khách hàng.",
        "Tôi bắt đầu ở mảng bảo mật với Trend Micro, làm sản phẩm thanh toán tại M_Service (MoMo), quản lý các tài khoản chiến lược tại FPT, rồi dành hơn sáu năm ở Vietmap, từ Head of Business Development đến Giám đốc Kinh doanh toàn quốc, chịu trách nhiệm doanh thu và lợi nhuận trước Ban Giám đốc và Hội đồng Quản trị.",
        "Từ năm 2023, tôi phụ trách phát triển kinh doanh tại Zalo Group (VNG) cho hệ sinh thái dịch vụ số trên nền tảng Zalo, đồng thời là CEO của M1 Việt Nam JSC trong ngành phụ trợ ô tô. Gần đây tôi dành nhiều thời gian đồng hành cùng các cơ quan Trung ương và địa phương trong chuyển đổi số hành chính công.",
      ],
      experienceTitle: "Kinh nghiệm",
      roles: [
        {
          period: "03.2023 — nay",
          title: "Head of Business Development",
          company: "Zalo Group · VNG Corporation",
          summary:
            "Dẫn dắt phát triển kinh doanh cho hệ sinh thái dịch vụ số trên nền tảng Zalo: zBusiness, zCloud, zStyle, Zing MP3 VIP.",
          points: [
            "Quản lý đa đội ngũ, không chỉ BD thuần: thiết lập KPI, phối hợp liên phòng ban và coaching.",
            "Thúc đẩy doanh thu từ B2B và đối tác chiến lược; dẫn dắt các thương vụ key account.",
            "Triển khai mô hình hợp tác affiliate, bundle, distribution với telco, bán lẻ, fintech.",
            "Tham gia xây dựng chiến lược kinh doanh và thương mại hoá cho Kiki, nền tảng AI của Zalo.",
            "Phối hợp Product và Tech xây dựng luồng sản phẩm, thanh toán và trải nghiệm khách hàng.",
          ],
        },
        {
          period: "02.2024 — nay",
          title: "CEO",
          company: "M1 Việt Nam JSC",
          summary: "Điều hành toàn bộ công ty thương mại dịch vụ trong ngành phụ trợ ô tô, khai trương tháng 2.2024: tài chính, kinh doanh, marketing, hành chính.",
        },
        {
          period: "10.2020 — 03.2023",
          title: "Giám đốc Kinh doanh toàn quốc",
          company: "Vietmap JSC",
          summary:
            "Điều hành kinh doanh toàn quốc, chịu trách nhiệm doanh thu và lợi nhuận trước Ban Giám đốc và Hội đồng Quản trị.",
          points: [
            "Ra quyết định chiến lược về mở rộng kinh doanh, đầu tư và phát triển sản phẩm.",
            "Ký kết hợp tác chiến lược với các đối tác phân phối phần mềm dẫn đường.",
            "Xây dựng chiến lược kinh doanh mang đậm dấu ấn cá nhân, trở thành đề tài luận văn thạc sĩ của tôi.",
          ],
        },
        {
          period: "07.2016 — 10.2020",
          title: "Head of Business Development",
          company: "Vietmap Application Co., Ltd",
          summary:
            "Xây dựng chiến lược kinh doanh và đội ngũ cho camera hành trình, thiết bị dẫn đường và giải pháp quản lý xe ô tô.",
          points: [
            "Thiết lập, phân vùng và quản lý hệ thống phân phối trên cả nước.",
            "Điều phối Marketing và phát triển sản phẩm để ra mắt sản phẩm mới.",
            "Phối hợp giao vận, kiểm soát chất lượng, chăm sóc khách hàng, bảo hành và lắp đặt.",
          ],
        },
        {
          period: "01.2015 — 06.2016",
          title: "Key Account Management",
          company: "FPT Telecommunication Technology Distribution",
          summary:
            "Phụ trách quan hệ cấp cao với các chuỗi bán lẻ lớn: Thế Giới Di Động, Viễn Thông A, Nguyễn Kim, FPT Shop, Viettel.",
          points: ["Lập và quản lý chỉ tiêu doanh số theo khu vực.", "Đàm phán chính sách bán hàng, quản lý công nợ và xử lý xung đột kênh."],
        },
        {
          period: "01.2014 — 12.2014",
          title: "Product Manager",
          company: "M_Service JSC (Ví điện tử MoMo)",
          summary:
            "Tiếp cận đối tác lớn và triển khai kết nối thanh toán hoá đơn điện, nước, internet, truyền hình cáp, viễn thông, cùng dịch vụ thu hộ chi hộ.",
        },
        {
          period: "09.2012 — 12.2013",
          title: "Product Manager · Sales Engineer",
          company: "Trend Micro Vietnam Distribution's Channel",
          summary:
            "Quản lý sản phẩm Trend Micro Mobile Security: đào tạo đối tác, truyền thông sản phẩm, phát triển kênh phân phối. Trước đó là tư vấn giải pháp bảo mật cho doanh nghiệp.",
        },
        {
          period: "02.2012 — 07.2012",
          title: "Thực tập & nhân viên thời vụ",
          company: "ACB · HSBC",
          summary: "Tín dụng doanh nghiệp tại ACB; hỗ trợ chứng từ và nghiên cứu thị trường tại bộ phận Trade and Supply Chain của HSBC.",
        },
      ],
      educationTitle: "Học vấn",
      education: [
        { period: "2023", title: "Leadership Development Programme", school: "National University of Singapore", note: "Chứng chỉ Top 1; đội vô địch khoá học" },
        { period: "2017 — 2020", title: "Thạc sĩ Quản trị Kinh doanh (MBA)", school: "Đại học Kinh tế TP. Hồ Chí Minh (UEH)", note: "Luận văn về chiến lược kinh doanh thành công của Vietmap, giai đoạn tôi trực tiếp xây dựng và điều hành" },
        { period: "2008 — 2012", title: "Cử nhân Quản trị Kinh doanh", school: "Đại học Ngoại ngữ – Tin học TP. Hồ Chí Minh (HUFLIT)" },
        { period: "2006 — 2011", title: "Kỹ sư Công nghệ Thông tin", school: "Học viện Công nghệ Bưu chính Viễn thông (PTIT)" },
      ],
      certTitle: "Chứng chỉ",
      certs: [
        { year: "2023", title: "Leadership Development Programme", issuer: "National University of Singapore" },
        { year: "2022", title: "Coach Training for Manager", issuer: "LCV" },
        { year: "2019", title: "Giám đốc Kinh doanh", issuer: "PTI" },
        { year: "2018", title: "Mindfulness-Based Transformation", issuer: "ISM" },
      ],
      languagesTitle: "Ngôn ngữ",
      languages: [
        { name: "Tiếng Việt", level: "Bản ngữ" },
        { name: "Tiếng Anh", level: "Giao tiếp công việc" },
        { name: "Tiếng Hàn", level: "Sơ cấp" },
      ],
      beyondTitle: "Ngoài công việc",
      beyond: [
        "Tôi mê trekking. Mỗi cung đường cho tôi một bài học về sức bền và góc nhìn, và nhiều bài viết trên blog này bắt đầu từ những chuyến đi như vậy.",
        "Tôi cũng tự nhắc mình vài điều giản dị: ưu tiên gia đình, có mặt cùng con, làm việc trong một môi trường mình yêu thích, và giữ một mối quan hệ lành mạnh với chính mình.",
      ],
    },
    blog: {
      kicker: "Blog",
      title: "Ghi chép về công nghệ, điều hành và cuộc sống",
      lede: "Kiến thức, kinh nghiệm và nhận định cá nhân, viết từ những gì tôi thật sự trải qua.",
      all: "Tất cả",
    },
    categories: { "cong-nghe": "Công nghệ", "dieu-hanh": "Điều hành", "cuoc-song": "Cuộc sống" },
    footer: { tagline: "Công nghệ, điều hành và cuộc sống.", rights: "Giữ mọi quyền." },
    portraitAlt: "Chân dung Nguyễn Đình Luyện",
  },

  en: {
    nav: { home: "Home", about: "About", blog: "Blog", contact: "Contact", menu: "Open menu", close: "Close menu", switchTo: "Tiếng Việt" },
    meta: {
      title: "Nguyen Dinh Luyen — Business development for technology products",
      description:
        "Personal site of Nguyen Dinh Luyen (Louis): Head of Business Development at Zalo Group (VNG) and CEO of M1 Vietnam. Notes on technology, leadership and life.",
    },
    hero: {
      eyebrow: "Nguyen Dinh Luyen · Louis",
      headline: ["Leading businesses,", "from strategy", "to results."],
      lede:
        "Over 12 years taking Vietnamese technology products to market, from business development and strategic partnerships to running entire companies: security software, e-wallets, digital maps, the Zalo ecosystem and the automotive aftermarket.",
      primary: "Read the blog",
      secondary: "My journey",
      nowLabel: "Now",
      now: [
        { role: "Head of Business Development", org: "Zalo Group · VNG Corporation" },
        { role: "CEO", org: "M1 Vietnam JSC" },
      ],
      basedLabel: "Based in",
      based: "Ho Chi Minh City, Vietnam",
    },
    stats: [
      { value: "12+", label: "years selling and scaling technology products" },
      { value: "6", label: "years leading sales at Vietmap" },
      { value: "~100", label: "people led at peak, nationwide" },
      { value: "Top 1", label: "NUS Leadership Development Programme 2023" },
    ],
    focus: {
      kicker: "What I do",
      title: "Four things I work on every day",
      items: [
        {
          title: "Strategic partnerships",
          body: "Building and expanding partnerships with telcos, retail chains, fintechs and device makers: co-selling, revenue sharing, distribution integration.",
        },
        {
          title: "Revenue growth",
          body: "Designing and running revenue models for digital products: subscription, affiliate, bundles, prepaid services; tuning the B2B sales funnel.",
        },
        {
          title: "Commercialising AI",
          body: "Helping shape the business strategy for Kiki, Zalo's AI platform: subscription, licensing and embedded-service models.",
        },
        {
          title: "Product–market alignment",
          body: "Working with Product and Tech to steer features toward what customers and partners actually need, then taking them to market.",
        },
      ],
    },
    journey: { kicker: "Journey", title: "From software engineer to technology business builder", more: "Full story" },
    writing: {
      kicker: "Writing",
      title: "Latest posts",
      all: "All posts",
      empty: "No posts yet.",
      minutes: "min read",
      inVietnamese: "In Vietnamese",
      back: "All posts",
      translated: "Translated from the Vietnamese original",
      topics: "Topics",
    },
    press: {
      kicker: "Press & events",
      title: "In the media",
      note: "Selected coverage and events connected to my work (in Vietnamese).",
      items: [
        {
          outlet: "Tạp chí Tài chính Doanh nghiệp",
          date: "14.01.2023",
          title: "Finding Vietnamese value in every technology product",
          note: "Interview on Vietmap's distribution strategy and its focus on the domestic market.",
          href: pressLinks.tcdn,
        },
        {
          outlet: "VnExpress",
          date: "27.12.2022",
          title: "Vietmap signs strategic partnership with ICar Vietnam",
          note: "Remarks at the signing ceremony as National Sales Director.",
          href: pressLinks.vnexpress,
        },
        {
          outlet: "24h",
          date: "21.02.2024",
          title: "M1 Vietnam Trading & Services JSC opens",
          note: "Company launch and signing of distribution rights for automotive accessory brands.",
          href: pressLinks.m1,
        },
        {
          outlet: "24h",
          date: "04.01.2023",
          title: "Vietmap's 2022 dealer awards and 2023 strategic dealer contracts",
          note: "Programme for Vietmap's navigation software dealer network.",
          href: pressLinks.award,
        },
        {
          outlet: "YouTube",
          date: "Video",
          title: "Vietmap SpeedMap M1 product launch",
          note: "Product launch event at Vietmap.",
          href: pressLinks.speedmap,
        },
      ],
    },
    quote: {
      text: "Deliver genuinely good value to customers, as quickly and as completely as possible.",
      source: "What I aim for in my work",
    },
    contact: {
      kicker: "Contact",
      title: "Let's talk",
      body: "I'm happy to talk about business partnerships, partner development, commercialising digital products, or simply a good trekking route.",
      linkedin: "Connect on LinkedIn",
      email: "Send an email",
    },
    about: {
      kicker: "About",
      title: "A business builder with an engineering background",
      intro: [
        "I'm Nguyen Dinh Luyen; friends and colleagues call me Louis. I trained as an information technology engineer, moved into business early, and for more than 12 years I have done one thing consistently: get technology products into customers' hands.",
        "I started in security software with Trend Micro, worked on payment products at M_Service (MoMo), managed strategic accounts at FPT, then spent more than six years at Vietmap, from Head of Business Development to National Sales Director, accountable for revenue and profit to the Board of Directors.",
        "Since 2023 I have led business development at Zalo Group (VNG) for the digital service ecosystem on the Zalo platform, and I am also CEO of M1 Vietnam JSC in the automotive aftermarket. Lately I spend much of my time working with central and local government bodies on public-sector digital transformation.",
      ],
      experienceTitle: "Experience",
      roles: [
        {
          period: "03.2023 — present",
          title: "Head of Business Development",
          company: "Zalo Group · VNG Corporation",
          summary: "Leading business development for the digital service ecosystem on Zalo: zBusiness, zCloud, zStyle, Zing MP3 VIP.",
          points: [
            "Lead multiple teams, well beyond pure BD: setting KPIs, aligning across functions and coaching.",
            "Drive revenue from B2B and strategic partners; lead key-account deals.",
            "Roll out affiliate, bundle and distribution models with telcos, retail and fintech.",
            "Contribute to the business strategy and commercialisation of Kiki, Zalo's AI platform.",
            "Work with Product and Tech on product flows, payments and customer experience.",
          ],
        },
        {
          period: "02.2024 — present",
          title: "CEO",
          company: "M1 Vietnam JSC",
          summary: "Running the whole of a trading and services company in the automotive aftermarket, opened in February 2024: finance, sales, marketing and administration.",
        },
        {
          period: "10.2020 — 03.2023",
          title: "National Sales Director",
          company: "Vietmap JSC",
          summary: "Ran nationwide sales, accountable for revenue and profit to the Board of Directors.",
          points: [
            "Made strategic decisions on business expansion, investment and product development.",
            "Signed strategic partnerships with navigation-software distribution partners.",
            "Shaped a business strategy that carried my personal stamp and became the subject of my master's thesis.",
          ],
        },
        {
          period: "07.2016 — 10.2020",
          title: "Head of Business Development",
          company: "Vietmap Application Co., Ltd",
          summary: "Built the sales strategy and team for dash cams, navigation devices and vehicle management solutions.",
          points: [
            "Set up, zoned and managed the nationwide distribution network.",
            "Coordinated Marketing and product development for new product launches.",
            "Aligned logistics, quality control, customer care, warranty and installation with sales.",
          ],
        },
        {
          period: "01.2015 — 06.2016",
          title: "Key Account Management",
          company: "FPT Telecommunication Technology Distribution",
          summary: "Owned senior relationships with major retail chains: Mobile World, Vien Thong A, Nguyen Kim, FPT Shop, Viettel.",
          points: ["Set and managed regional sales targets.", "Negotiated sales policies, managed receivables and resolved channel conflicts."],
        },
        {
          period: "01.2014 — 12.2014",
          title: "Product Manager",
          company: "M_Service JSC (MoMo e-wallet)",
          summary: "Approached large partners and delivered bill-payment integrations for electricity, water, internet, cable TV and telecoms, plus collection and disbursement services.",
        },
        {
          period: "09.2012 — 12.2013",
          title: "Product Manager · Sales Engineer",
          company: "Trend Micro Vietnam Distribution's Channel",
          summary: "Managed Trend Micro Mobile Security: partner training, product communications and channel development. Earlier, a security solution consultant for businesses.",
        },
        {
          period: "02.2012 — 07.2012",
          title: "Internship & temporary staff",
          company: "ACB · HSBC",
          summary: "Corporate credit at ACB; documentation and market research for HSBC's Trade and Supply Chain department.",
        },
      ],
      educationTitle: "Education",
      education: [
        { period: "2023", title: "Leadership Development Programme", school: "National University of Singapore", note: "Top 1 certificate; champion team of the course" },
        { period: "2017 — 2020", title: "Master of Business Administration (MBA)", school: "University of Economics Ho Chi Minh City (UEH)", note: "Thesis on Vietmap's successful business strategy, from the period I designed and ran it" },
        { period: "2008 — 2012", title: "Bachelor of Business Administration", school: "Ho Chi Minh City University of Foreign Languages – Information Technology (HUFLIT)" },
        { period: "2006 — 2011", title: "Bachelor of Engineering, Information Technology", school: "Posts and Telecommunications Institute of Technology (PTIT)" },
      ],
      certTitle: "Certificates",
      certs: [
        { year: "2023", title: "Leadership Development Programme", issuer: "National University of Singapore" },
        { year: "2022", title: "Coach Training for Manager", issuer: "LCV" },
        { year: "2019", title: "Sales Director Programme", issuer: "PTI" },
        { year: "2018", title: "Mindfulness-Based Transformation", issuer: "ISM" },
      ],
      languagesTitle: "Languages",
      languages: [
        { name: "Vietnamese", level: "Native" },
        { name: "English", level: "Working proficiency" },
        { name: "Korean", level: "Elementary" },
      ],
      beyondTitle: "Beyond work",
      beyond: [
        "I love trekking. Every route teaches me something about endurance and perspective, and many posts on this blog begin on trips like those.",
        "I also keep a few simple reminders: put family first, be present with my children, work in an environment I enjoy, and keep a healthy relationship with myself.",
      ],
    },
    blog: {
      kicker: "Blog",
      title: "Notes on technology, leadership and life",
      lede: "Knowledge, experience and personal views, written from what I have actually lived through.",
      all: "All",
    },
    categories: { "cong-nghe": "Technology", "dieu-hanh": "Leadership", "cuoc-song": "Life" },
    footer: { tagline: "Technology, leadership and life.", rights: "All rights reserved." },
    portraitAlt: "Portrait of Nguyen Dinh Luyen",
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
