/* ==========================================================================
   MIYAKO HOME — 3-COLUMN SCENT ALCHEMIST MINI-GAME ENGINE
   ========================================================================== */

(() => {
  "use strict";

  const FRAGRANCE_FAMILIES = [
    {
      id: "floral",
      name: "Hương Hoa",
      sub: "Floral · Thanh Tao",
      color: "#c96a7b",
      desc: "Mềm mại, lãng mạn & giàu rung cảm nghệ thuật",
      notes: [
        {
          id: "white-lotus",
          name: "Bạch Liên Hoa",
          icon: "🪷",
          prefix: "Sương Liên",
          suffix: "Bên Hồ Tĩnh Lặng",
          outer:
            "Bạn mang lại cảm giác trong trẻo, điềm tĩnh và thanh lịch. Người đối diện dễ cảm thấy bình yên ngay từ khoảnh khắc đầu tiên trò chuyện cùng bạn.",
          inner:
            "Trái tim bạn trân trọng sự chân thành và những vẻ đẹp thuần khiết. Giữa đám đông ồn ào, bạn luôn giữ cho mình một khoảng lặng trong veo không dễ bị xao động.",
          core: "Ẩn sau vẻ dịu dàng là một nội lực kiên định. Bạn sống có nguyên tắc ngầm, biết buông bỏ những điều vụn vặt để giữ tâm hồn nhẹ nhõm.",
          scores: {
            elegance: 95,
            depth: 82,
            warmth: 75,
            freedom: 70,
            mystery: 78,
          },
        },
        {
          id: "night-jasmine",
          name: "Nhài Đêm",
          icon: "🌼",
          prefix: "Nguyệt Nhài",
          suffix: "Dưới Hiên Trăng",
          outer:
            "Bạn sở hữu sức hút tự nhiên đầy duyên dáng. Không cần phô trương, ánh mắt và cử chỉ của bạn vẫn khiến người khác phải nhớ mãi.",
          inner:
            "Bạn sống giàu cảm xúc, lãng mạn và rất tinh tế trong việc thấu hiểu tâm ý người khác. Khi đã yêu quý ai, bạn dành trọn sự nồng nhiệt và chân thành.",
          core: "Bạn yêu cái đẹp có chiều sâu và những cuộc trò chuyện tâm giao lúc đêm muộn — nơi mọi lớp mặt nạ xã giao được tháo xuống.",
          scores: {
            elegance: 92,
            depth: 85,
            warmth: 88,
            freedom: 68,
            mystery: 90,
          },
        },
        {
          id: "osmanthus",
          name: "Mộc Hương Cổ",
          icon: "✨",
          prefix: "Mộc Quế",
          suffix: "Mùa Thu Cố Đô",
          outer:
            "Bạn toát lên vẻ nho nhã, ấm áp và đáng tin cậy như một người bạn tri kỷ lâu năm.",
          inner:
            "Bạn là người hoài niệm, trân quý những kỷ niệm đẹp và những giá trị bền vững theo năm tháng. Một bức thư tay hay một giai điệu cũ đều làm bạn rung động.",
          core: "Sự tử tế và sâu sắc của bạn giống như hương mộc hương: càng ở gần lâu, người ta càng nhận ra giá trị quý giá khó tìm.",
          scores: {
            elegance: 90,
            depth: 88,
            warmth: 92,
            freedom: 65,
            mystery: 80,
          },
        },
      ],
    },
    {
      id: "woody",
      name: "Gỗ & Trầm",
      sub: "Woody · Sâu Lắng",
      color: "#8c583a",
      desc: "Trầm ổn, bản lĩnh & mang chiều sâu ký ức",
      notes: [
        {
          id: "agarwood",
          name: "Trầm Kỳ Nam",
          icon: "🪵",
          prefix: "Trầm Mặc",
          suffix: "Giữa Đêm Sâu",
          outer:
            "Bạn mang khí chất điềm đạm, trưởng thành và có uy tín tự nhiên. Lời nói của bạn ít nhưng luôn có sức nặng.",
          inner:
            "Bạn không thích sự hời hợt. Trong mọi mối quan hệ hay công việc, bạn luôn tìm kiếm sự thấu cảm sâu sắc và giá trị cốt lõi thật sự.",
          core: "Giống như gỗ quý trải qua sương gió mới kết thành trầm, bạn là người từng trải, vững chãi và là điểm tựa tinh thần vững chắc.",
          scores: {
            elegance: 90,
            depth: 98,
            warmth: 85,
            freedom: 72,
            mystery: 96,
          },
        },
        {
          id: "sandalwood",
          name: "Đàn Hương",
          icon: "🎋",
          prefix: "Đàn Mộc",
          suffix: "Khúc Thiền Định",
          outer:
            "Bạn tạo cảm giác ấm áp, điềm nhiên và rất biết lắng nghe. Ở bên bạn, mọi căng thẳng dường như dịu lại.",
          inner:
            "Bạn đề cao sự cân bằng nội tâm. Thay vì chạy theo nhịp sống vội vã, bạn biết cách chăm sóc thế giới tinh thần và không gian sống của riêng mình.",
          core: "Bạn sở hữu trí tuệ cảm xúc cao (EQ), thấu suốt nhiều điều nhưng chọn cách đối đãi với thế giới bằng sự bao dung.",
          scores: {
            elegance: 88,
            depth: 94,
            warmth: 94,
            freedom: 74,
            mystery: 84,
          },
        },
        {
          id: "cedarwood",
          name: "Tuyết Tùng",
          icon: "🌲",
          prefix: "Tuyết Tùng",
          suffix: "Rừng Sương Cao Nguyên",
          outer:
            "Bạn độc lập, thẳng thắn và mang vẻ đẹp hiện đại, gọn gàng, không chút cầu kỳ.",
          inner:
            "Bạn khao khát sự tự do trong tư tưởng. Bạn yêu những chuyến đi xa, những buổi sớm se lạnh và không gian mở thoáng đãng.",
          core: "Dù thế giới bên ngoài biến động thế nào, bạn vẫn đứng vững như cây tùng trên đỉnh núi — kiên cường và tự chủ.",
          scores: {
            elegance: 85,
            depth: 88,
            warmth: 72,
            freedom: 94,
            mystery: 82,
          },
        },
      ],
    },
    {
      id: "herbal",
      name: "Trà & Thảo Mộc",
      sub: "Tea · Tĩnh Tại",
      color: "#4d7c5d",
      desc: "Thanh khiết, trí tuệ & năng lượng chữa lành",
      notes: [
        {
          id: "white-tea",
          name: "Trà Trắng",
          icon: "🍵",
          prefix: "Bạch Trà",
          suffix: "Sớm Tinh Khôi",
          outer:
            "Bạn gây ấn tượng bởi sự tinh tế, thông minh và gu thẩm mỹ tối giản nhưng cực kỳ chỉn chu (Quiet Luxury).",
          inner:
            "Bạn yêu những khoảnh khắc tĩnh lặng: một tách trà nóng, một cuốn sách hay và ánh nắng chiếu qua rèm cửa.",
          core: "Tâm hồn bạn giống như trà thượng hạng — không phô trương ở ngụm đầu, nhưng hậu vị ngọt thanh khiến người ta nhớ mãi.",
          scores: {
            elegance: 96,
            depth: 90,
            warmth: 78,
            freedom: 85,
            mystery: 80,
          },
        },
        {
          id: "bamboo-leaf",
          name: "Lá Tre Xanh",
          icon: "🌿",
          prefix: "Trúc Thanh",
          suffix: "Sau Cơn Mưa Hạ",
          outer:
            "Bạn tươi mới, chân thật và mang nguồn năng lượng trong lành khiến ai tiếp xúc cũng thấy dễ chịu.",
          inner:
            "Bạn có khả năng phục hồi cảm xúc rất tốt. Sau những thử thách, bạn luôn biết cách làm mới mình như mầm cây sau mưa.",
          core: "Ngay thẳng, tự nhiên nhưng mềm dẻo — bạn biết linh hoạt trước hoàn cảnh mà không đánh mất chất riêng.",
          scores: {
            elegance: 84,
            depth: 78,
            warmth: 76,
            freedom: 95,
            mystery: 68,
          },
        },
        {
          id: "lavender",
          name: "Oải Hương",
          icon: "💜",
          prefix: "Oải Hương",
          suffix: "Chiều Tím Bình Yên",
          outer: "Bạn nhẹ nhàng, tinh tế và có tâm hồn nghệ sĩ nhạy cảm.",
          inner:
            "Bạn là 'người chữa lành' trong mắt bạn bè. Bạn nhạy bén với cảm xúc của người khác và luôn tạo ra không gian an toàn cho những người mình thương.",
          core: "Bạn trân trọng sự bình yên hơn những cuộc đua hào nhoáng. Với bạn, hạnh phúc là một giấc ngủ ngon trong căn phòng thơm dịu.",
          scores: {
            elegance: 89,
            depth: 84,
            warmth: 90,
            freedom: 82,
            mystery: 76,
          },
        },
      ],
    },
    {
      id: "citrus",
      name: "Cam Chanh & Sương",
      sub: "Citrus · Rạng Rỡ",
      color: "#d49b38",
      desc: "Tươi sáng, phóng khoáng & tràn đầy cảm hứng",
      notes: [
        {
          id: "bergamot",
          name: "Cam Bergamot",
          icon: "🍊",
          prefix: "Nắng Bergamot",
          suffix: "Trên Hiên Nhà",
          outer:
            "Bạn rạng rỡ, cởi mở và truyền cảm hứng tích cực. Sự xuất hiện của bạn luôn mang theo sinh khí tươi vui.",
          inner:
            "Bạn có tư duy sáng tạo, nhạy bén với cái mới và luôn nhìn thấy cơ hội trong mọi hoàn cảnh.",
          core: "Dù trưởng thành qua bao nhiêu trải nghiệm, bạn vẫn giữ được sự tò mò trẻ trung và niềm yêu đời thuần khiết.",
          scores: {
            elegance: 86,
            depth: 75,
            warmth: 88,
            freedom: 96,
            mystery: 65,
          },
        },
        {
          id: "pomelo",
          name: "Hoa Bưởi Xưa",
          icon: "🌸",
          prefix: "Thanh Trà",
          suffix: "Vườn Xưa Tháng Ba",
          outer:
            "Bạn gần gũi, duyên dáng và mang một nét đẹp truyền thống pha lẫn hiện đại rất riêng.",
          inner:
            "Gia đình, những bữa cơm ấm cúng và những góc nhà thân quen là nguồn năng lượng lớn nhất của bạn.",
          core: "Bạn sống tình cảm, biết chăm chút từng điều nhỏ nhặt và luôn khiến người khác cảm thấy 'được trở về nhà'.",
          scores: {
            elegance: 91,
            depth: 84,
            warmth: 95,
            freedom: 78,
            mystery: 72,
          },
        },
        {
          id: "morning-dew",
          name: "Sương Đà Lạt",
          icon: "💧",
          prefix: "Ngọc Sương",
          suffix: "Bình Minh Phố Núi",
          outer:
            "Bạn thanh thoát, tự do và có chút gì đó lãng đãng như sương sớm khiến người khác muốn khám phá.",
          inner:
            "Bạn ghét sự gò bó. Tâm hồn bạn thuộc về những chân trời mở, những chuyến đi ngẫu hứng và những ý tưởng khác biệt.",
          core: "Sự minh bạch và thẳng thắn là kim chỉ nam của bạn — trong veo như giọt sương mai.",
          scores: {
            elegance: 87,
            depth: 80,
            warmth: 70,
            freedom: 98,
            mystery: 78,
          },
        },
      ],
    },
    {
      id: "spicy",
      name: "Gia Vị Ấm",
      sub: "Spicy · Quyến Rũ",
      color: "#a8422b",
      desc: "Bí ẩn, nồng nàn & cá tính nghệ thuật độc bản",
      notes: [
        {
          id: "cinnamon",
          name: "Quế Chi Rừng",
          icon: "🍂",
          prefix: "Hỏa Quế",
          suffix: "Đêm Đông Ấm Áp",
          outer:
            "Bạn ấm áp, nhiệt thành và có cá tính rõ nét. Bạn không bao giờ hòa lẫn vào đám đông.",
          inner:
            "Trái tim bạn luôn rực lửa đam mê. Khi đã theo đuổi điều gì hay yêu thương ai, bạn luôn hết mình và quyết liệt.",
          core: "Bạn là người truyền lửa — sự hiện diện của bạn xua tan sự lạnh lẽo và mang lại sinh khí ấm cúng cho mọi không gian.",
          scores: {
            elegance: 82,
            depth: 88,
            warmth: 98,
            freedom: 80,
            mystery: 89,
          },
        },
        {
          id: "pink-pepper",
          name: "Hồng Tiêu",
          icon: "🌶️",
          prefix: "Hồng Tiêu",
          suffix: "Khúc Giao Hưởng Đương Đại",
          outer:
            "Bạn thông minh, sắc sảo và có gu thẩm mỹ độc bản. Bạn thích những thứ có chiều sâu và khác biệt.",
          inner:
            "Bên dưới vẻ ngoài tự tin, hiện đại là một tâm hồn nhạy cảm, luôn khao khát tìm được người thực sự hiểu những tầng suy nghĩ của mình.",
          core: "Bạn dám bứt phá khỏi lối mòn để định nghĩa thành công và hạnh phúc theo cách riêng.",
          scores: {
            elegance: 90,
            depth: 87,
            warmth: 84,
            freedom: 91,
            mystery: 94,
          },
        },
        {
          id: "warm-ginger",
          name: "Gừng Ấm",
          icon: "🫚",
          prefix: "Khương Ấm",
          suffix: "Lửa Nhỏ Bên Hiên",
          outer:
            "Bạn chân thành, thực tế và mang lại cảm giác an tâm tuyệt đối cho những người xung quanh.",
          inner:
            "Bạn coi trọng hành động hơn lời nói hoa mỹ. Sự quan tâm của bạn thể hiện qua những cử chỉ chăm sóc tinh tế đời thường.",
          core: "Bền bỉ và kiên định, bạn là người giữ nhịp ấm áp cho cả tập thể và gia đình.",
          scores: {
            elegance: 80,
            depth: 86,
            warmth: 96,
            freedom: 77,
            mystery: 75,
          },
        },
      ],
    },
    {
      id: "amber",
      name: "Hổ Phách & Xạ",
      sub: "Amber · Gợi Cảm",
      color: "#9b6b43",
      desc: "Sang trọng, mượt như lụa & lưu giữ dư âm",
      notes: [
        {
          id: "golden-amber",
          name: "Hổ Phách Vàng",
          icon: "🍯",
          prefix: "Hổ Phách",
          suffix: "Ánh Vàng Hoàng Hôn",
          outer:
            "Bạn toát lên thần thái sang trọng, điềm tĩnh và có sức quyến rũ ngầm đầy mê hoặc.",
          inner:
            "Bạn yêu nghệ thuật, cái đẹp cổ điển và những trải nghiệm có chiều sâu văn hóa.",
          core: "Dư âm bạn để lại trong lòng người khác rất sâu đậm — giống như giọt hổ phách lưu giữ vẻ đẹp qua hàng triệu năm.",
          scores: {
            elegance: 95,
            depth: 94,
            warmth: 92,
            freedom: 75,
            mystery: 95,
          },
        },
        {
          id: "white-musk",
          name: "Xạ Hương Lụa",
          icon: "🕊️",
          prefix: "Lụa Xạ",
          suffix: "Hơi Thở Thầm Thì",
          outer:
            "Bạn tinh tế, thanh lịch một cách tự nhiên như không hề gắng gượng.",
          inner:
            "Bạn đề cao sự gắn kết thân mật và cảm giác an toàn. Bạn không cần nhiều mối quan hệ, chỉ cần vài người thực sự đồng điệu.",
          core: "Sức hút của bạn nằm ở sự dịu dàng bản năng — nhẹ nhàng như lụa nhưng khiến người ta lưu luyến không rời.",
          scores: {
            elegance: 96,
            depth: 86,
            warmth: 90,
            freedom: 80,
            mystery: 88,
          },
        },
        {
          id: "vanilla-tonka",
          name: "Đậu Tonka",
          icon: "🤎",
          prefix: "Mật Tonka",
          suffix: "Khúc Ru Đêm Dịu",
          outer:
            "Bạn ngọt ngào, thân thiện và có khả năng làm mềm đi mọi khoảng cách xã giao.",
          inner:
            "Bạn biết tận hưởng niềm vui từ những điều giản dị: mùi bánh nướng, ánh đèn vàng ấm và tiếng nhạc du dương.",
          core: "Tâm hồn bạn giàu lòng trắc ẩn và sự lạc quan ấm áp.",
          scores: {
            elegance: 86,
            depth: 82,
            warmth: 97,
            freedom: 79,
            mystery: 83,
          },
        },
      ],
    },
  ];

  const MIYAKO_MATCHES = {
    floral: {
      vessel: "Thiết kế SẮC — Ngọc Sương Mai",
      collection: "BST Tinh Dầu Hương Hoa Cao Cấp & Hồn Việt",
      image: "assets/custom-06.webp",
      desc: "Bình khuếch tán thủy tinh vân kim cương đón sáng kết hợp cùng nốt hương hoa thanh khiết, tôn lên vẻ đẹp tinh tế cho phòng khách và phòng ngủ.",
    },
    woody: {
      vessel: "Thiết kế ÁNH NGÂN MỘC — Đế Gỗ Tự Nhiên",
      collection: "BST Tinh Dầu Dấu Ấn & Hồn Việt",
      image: "assets/custom-14.webp",
      desc: "Sự kết hợp giữa sắc bạc đương đại và đế gỗ mộc mạc, hoàn hảo để lan tỏa tầng hương gỗ trầm ấm và bản lĩnh.",
    },
    herbal: {
      vessel: "Thiết kế DẤU — Lục Sắc Sơn Hà",
      collection: "BST Tinh Dầu Hương Trị Liệu - Thư Giãn",
      image: "assets/custom-11.webp",
      desc: "Sắc xanh sơn hà phóng khoáng đồng điệu cùng hương trà và thảo mộc, mang lại không gian tĩnh tại, cân bằng tâm trí.",
    },
    citrus: {
      vessel: "Thiết kế NÉT — Nắng Trên Hiên",
      collection: "BST Tinh Dầu Hương Thiên Nhiên",
      image: "assets/custom-09.webp",
      desc: "Thủy tinh trong trẻo ôm lấy sắc cam ấm áp như vệt nắng sớm, đánh thức nguồn năng lượng tươi mới mỗi ngày.",
    },
    spicy: {
      vessel: "Thiết kế SẮC — Đêm Huyền Sắc",
      collection: "BST Tinh Dầu Dấu Ấn & 12 Cung Hoàng Đạo",
      image: "assets/custom-05.webp",
      desc: "Sắc đêm trầm mặc đầy chiều sâu, tôn vinh những tầng hương gia vị ấm nồng và cá tính độc bản của gia chủ.",
    },
    amber: {
      vessel: "Thiết kế NÉT — Sắc Lam Trời",
      collection: "BST Tinh Dầu Dấu Ấn Cao Cấp",
      image: "assets/custom-08.webp",
      desc: "Vẻ đẹp giao thoa giữa truyền thống và hiện đại, giữ trọn dư âm hổ phách và xạ hương sang trọng trong không gian.",
    },
  };

  const ARCHETYPES = [
    {
      condition: (s) => s.depth >= 90 && s.mystery >= 88,
      title: "Người Kể Chuyện Thầm Lặng (The Poetic Old Soul)",
      summary:
        "Bạn là người có thế giới nội tâm vô cùng phong phú và sâu sắc. Bạn không thích sự ồn ào phô trương mà chọn cách cảm nhận cuộc sống qua từng chi tiết tinh tế. Những người bước vào thế giới của bạn đều bị cuốn hút bởi sự điềm tĩnh, từng trải và chiều sâu tri thức khó đoán.",
    },
    {
      condition: (s) => s.freedom >= 90,
      title: "Kẻ Lữ Hành Tự Do Giữa Sương Mai (The Free Spirit)",
      summary:
        "Tâm hồn bạn thuộc về những khoảng trời rộng mở, những làn gió mới và sự sáng tạo không giới hạn. Bạn sống chân thật với cảm xúc của mình, ghét sự rập khuôn và luôn mang đến nguồn năng lượng tươi mới, trong lành cho những người xung quanh.",
    },
    {
      condition: (s) => s.elegance >= 92,
      title: "Biểu Tượng Của Sự Thanh Lịch Tối Giản (The Quiet Luxury Soul)",
      summary:
        "Ở bạn toát lên một khí chất tao nhã tự nhiên không cần gắng gượng. Bạn có gu thẩm mỹ tinh tường, yêu sự chỉn chu và biết cách biến không gian sống của mình thành một ốc đảo nghệ thuật đầy chất thơ.",
    },
    {
      condition: (s) => s.warmth >= 92,
      title: "Người Giữ Lửa Dịu Dàng (The Warm Empathetic Healer)",
      summary:
        "Bạn là hiện thân của sự ấm áp, bao dung và chữa lành. Sự hiện diện của bạn giống như ánh đèn vàng ấm cúng sau một ngày mưa lạnh — luôn khiến người khác cảm thấy được lắng nghe, trân trọng và thuộc về.",
    },
    {
      condition: () => true,
      title: "Nhà Giả Kim Của Cảm Xúc (The Harmonious Alchemist)",
      summary:
        "Bạn sở hữu sự cân bằng hiếm có giữa lý trí và cảm xúc, giữa nét truyền thống sâu lắng và tinh thần hiện đại phóng khoáng. Bạn biết mình là ai, biết tận hưởng từng khoảnh khắc và luôn lưu lại một dấu ấn riêng biệt khó trộn lẫn.",
    },
  ];

  // Game State
  let activeFamilyId = "floral";
  const slots = {
    top: { note: null, poured: false },
    heart: { note: null, poured: false },
    base: { note: null, poured: false },
  };
  let selectedFormula = {
    code: "40-30-30",
    name: "Hài Hòa Cổ Điển",
    top: 40,
    heart: 30,
    base: 30,
  };
  let isPouringAnim = false;
  let draggedLayer = null;

  // DOM Elements
  const wheelSvg = document.getElementById("fragrance-wheel-svg");
  const familyDot = document.getElementById("family-dot");
  const familyNameEl = document.getElementById("family-name");
  const familyDescEl = document.getElementById("family-desc");
  const notesGrid = document.getElementById("notes-grid");
  const dropzone = document.getElementById("alchemy-dropzone");
  const dropzoneHint = document.getElementById("dropzone-hint");
  const pouringActor = document.getElementById("pouring-actor");
  const pouringLiquid = document.getElementById("pouring-vial-liquid");
  const pouringStream = document.getElementById("pouring-stream");
  const particlesBox = document.getElementById("aroma-particles");
  const pourStatusText = document.getElementById("pour-status-text");
  const quickPourBtn = document.getElementById("quick-pour-all-btn");
  const craftBtn = document.getElementById("craft-btn");
  const userNameInput = document.getElementById("user-name-input");
  const finalBottleOwner = document.getElementById("final-bottle-owner");
  const finalBottleRatio = document.getElementById("final-bottle-ratio");
  const resultModal = document.getElementById("result-modal");

  // SVG Math Helpers
  function polarToCartesian(cx, cy, r, angleInDegrees) {
    const rad = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  }

  function createAnnularSectorPath(
    cx,
    cy,
    rInner,
    rOuter,
    startAngle,
    endAngle,
  ) {
    const startOuter = polarToCartesian(cx, cy, rOuter, endAngle);
    const endOuter = polarToCartesian(cx, cy, rOuter, startAngle);
    const startInner = polarToCartesian(cx, cy, rInner, endAngle);
    const endInner = polarToCartesian(cx, cy, rInner, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M",
      startOuter.x,
      startOuter.y,
      "A",
      rOuter,
      rOuter,
      0,
      largeArcFlag,
      0,
      endOuter.x,
      endOuter.y,
      "L",
      endInner.x,
      endInner.y,
      "A",
      rInner,
      rInner,
      0,
      largeArcFlag,
      1,
      startInner.x,
      startInner.y,
      "Z",
    ].join(" ");
  }

  // Render Column 1 Fragrance Wheel
  function renderWheel() {
    const cx = 210;
    const cy = 210;
    const rInner = 68;
    const rOuter = 194;
    const sliceAngle = 360 / FRAGRANCE_FAMILIES.length;

    let svgContent = `
      <circle cx="${cx}" cy="${cy}" r="202" fill="none" stroke="rgba(212,163,89,0.28)" stroke-width="1" stroke-dasharray="3 5" />
    `;

    FRAGRANCE_FAMILIES.forEach((fam, idx) => {
      const startAngle = idx * sliceAngle;
      const endAngle = (idx + 1) * sliceAngle;
      const midAngle = startAngle + sliceAngle / 2;
      const pathData = createAnnularSectorPath(
        cx,
        cy,
        rInner,
        rOuter,
        startAngle + 1.2,
        endAngle - 1.2,
      );
      const labelPos = polarToCartesian(cx, cy, 142, midAngle);
      const subPos = polarToCartesian(cx, cy, 106, midAngle);
      const isActive = fam.id === activeFamilyId;

      svgContent += `
        <g class="wheel-slice ${isActive ? "active" : ""}" data-family="${fam.id}" role="button" tabindex="0" aria-label="Nhóm ${fam.name}">
          <path d="${pathData}" fill="${fam.color}" fill-opacity="${isActive ? "0.95" : "0.7"}" stroke="rgba(255,248,238,0.35)" stroke-width="${isActive ? "2" : "1"}" />
          <text x="${labelPos.x}" y="${labelPos.y}" class="wheel-label">${fam.name}</text>
          <text x="${subPos.x}" y="${subPos.y}" class="wheel-sublabel">${fam.notes.map((n) => n.icon).join(" ")}</text>
        </g>
      `;
    });

    svgContent += `
      <circle cx="${cx}" cy="${cy}" r="${rInner - 4}" class="wheel-center-circle" />
      <text x="${cx}" y="${cy - 7}" class="wheel-center-title">VÒNG TRÒN</text>
      <text x="${cx}" y="${cy + 10}" class="wheel-center-sub">HƯƠNG VIỆT</text>
    `;

    wheelSvg.innerHTML = svgContent;

    wheelSvg.querySelectorAll(".wheel-slice").forEach((el) => {
      el.addEventListener("click", () => {
        activeFamilyId = el.dataset.family;
        renderWheel();
        renderShelfNotes();
      });
    });
  }

  // Render Sub-notes Shelf in Column 1
  function renderShelfNotes() {
    const family = FRAGRANCE_FAMILIES.find((f) => f.id === activeFamilyId);
    if (!family) return;

    familyDot.style.backgroundColor = family.color;
    familyNameEl.textContent = `${family.name}`;
    familyDescEl.textContent = family.desc;

    notesGrid.innerHTML = family.notes
      .map((note) => {
        const assignedEntry = Object.entries(slots).find(
          ([, s]) => s.note && s.note.id === note.id,
        );
        const tagLabel = assignedEntry
          ? `Lọ ${getLayerShortName(assignedEntry[0])}`
          : "+ Chọn lọ mẫu";

        return `
          <button type="button" class="note-pick-btn ${assignedEntry ? "picked" : ""}" data-note-id="${note.id}">
            <span class="note-pick-icon">${note.icon}</span>
            <span class="note-pick-name">${note.name}</span>
            <span class="note-pick-tag">${tagLabel}</span>
          </button>
        `;
      })
      .join("");

    notesGrid.querySelectorAll(".note-pick-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const noteId = btn.dataset.noteId;
        handlePickNote(noteId);
      });
    });
  }

  function getLayerShortName(layer) {
    if (layer === "top") return "Hương Đầu";
    if (layer === "heart") return "Hương Giữa";
    return "Hương Cuối";
  }

  function findNoteById(noteId) {
    for (const fam of FRAGRANCE_FAMILIES) {
      const found = fam.notes.find((n) => n.id === noteId);
      if (found) return { ...found, familyId: fam.id, color: fam.color };
    }
    return null;
  }

  // Pick a note from Column 1 -> Spawn Sample Vial in Column 2
  function handlePickNote(noteId) {
    // Check if already picked -> remove it
    const existingLayer = Object.keys(slots).find(
      (k) => slots[k].note && slots[k].note.id === noteId,
    );
    if (existingLayer) {
      slots[existingLayer] = { note: null, poured: false };
      updateAllColumns();
      return;
    }

    const noteObj = findNoteById(noteId);
    if (!noteObj) return;

    // Find first empty slot; if all 3 have notes, pick first unpoured slot, else replace top
    let targetLayer = ["top", "heart", "base"].find((k) => !slots[k].note);
    if (!targetLayer) {
      targetLayer =
        ["top", "heart", "base"].find((k) => !slots[k].poured) || "top";
    }

    slots[targetLayer] = {
      note: noteObj,
      poured: false,
    };

    updateAllColumns();
  }

  // Pour a Sample Vial into the Mixing Flask (Column 2 Animation)
  function pourVialIntoFlask(layer) {
    const slot = slots[layer];
    if (!slot || !slot.note || slot.poured || isPouringAnim) return;

    isPouringAnim = true;
    const color = slot.note.color;

    // Trigger Pouring Actor Animation
    pouringLiquid.style.backgroundColor = color;
    pouringStream.style.backgroundColor = color;
    pouringStream.style.color = color;
    pouringActor.hidden = false;

    // Retrigger CSS animation
    pouringActor.style.animation = "none";
    void pouringActor.offsetWidth;
    pouringActor.style.animation = "";

    // Spawn floating aroma bubbles
    spawnAromaBubbles(color);

    setTimeout(() => {
      slot.poured = true;
      updateAllColumns();
    }, 420);

    setTimeout(() => {
      pouringActor.hidden = true;
      isPouringAnim = false;
    }, 900);
  }

  function spawnAromaBubbles(color) {
    for (let i = 0; i < 10; i++) {
      const b = document.createElement("span");
      b.className = "aroma-bubble";
      b.style.backgroundColor = color;
      b.style.boxShadow = `0 0 8px ${color}`;
      b.style.left = `${38 + Math.random() * 24}%`;
      b.style.animationDelay = `${i * 65}ms`;
      particlesBox.appendChild(b);
      setTimeout(() => b.remove(), 1500);
    }
  }

  // Update Column 2 Sample Vials, Central Mixing Flask, and Column 3 Bespoke Bottle
  function updateAllColumns() {
    renderShelfNotes();

    const pickedCount = Object.values(slots).filter((s) =>
      Boolean(s.note),
    ).length;
    const pouredCount = Object.values(slots).filter((s) => s.poured).length;

    // Update 3 Sample Vials in Column 2
    ["top", "heart", "base"].forEach((layer) => {
      const slot = slots[layer];
      const vialEl = document.getElementById(`vial-${layer}`);
      const liquidEl = document.getElementById(`vial-liquid-${layer}`);
      const iconEl = document.getElementById(`vial-icon-${layer}`);
      const nameEl = document.getElementById(`vial-name-${layer}`);
      const statusEl = document.getElementById(`vial-status-${layer}`);
      const removeBtn = document.querySelector(
        `.vial-remove-btn[data-remove="${layer}"]`,
      );

      vialEl.classList.remove("empty", "ready", "poured");

      if (!slot.note) {
        vialEl.classList.add("empty");
        vialEl.setAttribute("draggable", "false");
        liquidEl.style.backgroundColor = "transparent";
        iconEl.textContent = "＋";
        nameEl.textContent = "Chưa chọn";
        statusEl.textContent = "Chọn ở cột 1";
        removeBtn.hidden = true;
      } else if (!slot.poured) {
        vialEl.classList.add("ready");
        vialEl.setAttribute("draggable", "true");
        liquidEl.style.backgroundColor = slot.note.color;
        iconEl.textContent = slot.note.icon;
        nameEl.textContent = slot.note.name;
        statusEl.textContent = "Kéo thả / Bấm để rót";
        removeBtn.hidden = false;
      } else {
        vialEl.classList.add("poured");
        vialEl.setAttribute("draggable", "false");
        liquidEl.style.backgroundColor = slot.note.color;
        iconEl.textContent = "✓";
        nameEl.textContent = slot.note.name;
        statusEl.textContent = "Đã rót vào bình";
        removeBtn.hidden = false;
      }
    });

    // Update Central Mixing Flask Liquid Levels
    updateCentralFlask();

    // Update Pour Progress & Quick Pour Button
    pourStatusText.textContent = `Đã rót vào bình: ${pouredCount} / 3 tầng hương`;
    quickPourBtn.hidden = !(pickedCount > pouredCount);

    if (pouredCount === 3) {
      dropzoneHint.textContent =
        "✨ Đã hội tụ đủ 3 tầng hương! Hãy chọn công thức ở cột 3";
    } else if (pickedCount > 0) {
      dropzoneHint.textContent =
        "⬇ Kéo lọ hương mẫu thả vào đây (hoặc bấm vào lọ mẫu)";
    } else {
      dropzoneHint.textContent =
        "← Hãy chọn 3 nốt hương yêu thích từ Vòng Tròn Hương";
    }

    // Update Column 3 Final Bottle & Ratio Legend
    updateFinalBottlePreview();

    // Update HUD Quests & Craft Button
    const q1 = document.getElementById("quest-1");
    const q2 = document.getElementById("quest-2");
    const q3 = document.getElementById("quest-3");

    q1.className = `quest-step ${pickedCount === 3 ? "done" : "active"}`;
    q2.className = `quest-step ${pouredCount === 3 ? "done" : pickedCount > 0 ? "active" : ""}`;
    q3.className = `quest-step ${pouredCount === 3 ? "active" : ""}`;

    if (pickedCount < 3) {
      craftBtn.disabled = true;
      craftBtn.textContent = `🔒 Chọn thêm ${3 - pickedCount} lọ hương mẫu ở Cột 1`;
    } else if (pouredCount < 3) {
      craftBtn.disabled = false;
      craftBtn.textContent = `⚡ Rót Nốt & Giải Mã Mùi Hương (${selectedFormula.code})`;
    } else {
      craftBtn.disabled = false;
      craftBtn.textContent = `✦ Lắc Bình & Giải Mã Bản Ngã (${selectedFormula.code}) ✦`;
    }
  }

  function updateCentralFlask() {
    // Flask interior goes from y=244 (bottom) up to y=100 (max fill height = 144px)
    const maxFillHeight = 138;
    const totalRatio =
      selectedFormula.top + selectedFormula.heart + selectedFormula.base;

    const baseH = slots.base.poured
      ? Math.round((selectedFormula.base / totalRatio) * maxFillHeight)
      : 0;
    const heartH = slots.heart.poured
      ? Math.round((selectedFormula.heart / totalRatio) * maxFillHeight)
      : 0;
    const topH = slots.top.poured
      ? Math.round((selectedFormula.top / totalRatio) * maxFillHeight)
      : 0;

    const baseRect = document.getElementById("flask-layer-base");
    const heartRect = document.getElementById("flask-layer-heart");
    const topRect = document.getElementById("flask-layer-top");
    const meniscus = document.getElementById("flask-meniscus");

    const bottomY = 244;
    const baseY = bottomY - baseH;
    const heartY = baseY - heartH;
    const topY = heartY - topH;

    baseRect.setAttribute("y", baseY);
    baseRect.setAttribute("height", baseH);
    if (slots.base.note) baseRect.setAttribute("fill", slots.base.note.color);

    heartRect.setAttribute("y", heartY);
    heartRect.setAttribute("height", heartH);
    if (slots.heart.note)
      heartRect.setAttribute("fill", slots.heart.note.color);

    topRect.setAttribute("y", topY);
    topRect.setAttribute("height", topH);
    if (slots.top.note) topRect.setAttribute("fill", slots.top.note.color);

    const totalH = baseH + heartH + topH;
    if (totalH > 0) {
      meniscus.setAttribute("cy", bottomY - totalH);
      meniscus.setAttribute("opacity", "1");
    } else {
      meniscus.setAttribute("opacity", "0");
    }
  }

  function updateFinalBottlePreview() {
    // Final bottle interior goes from y=72 to y=196 (total height = 124px)
    const totalHeight = 120;
    const sum =
      selectedFormula.top + selectedFormula.heart + selectedFormula.base;

    const hTop = Math.round((selectedFormula.top / sum) * totalHeight);
    const hHeart = Math.round((selectedFormula.heart / sum) * totalHeight);
    const hBase = totalHeight - hTop - hHeart;

    const rectTop = document.getElementById("final-liquid-top");
    const rectHeart = document.getElementById("final-liquid-heart");
    const rectBase = document.getElementById("final-liquid-base");

    const startY = 74;
    rectTop.setAttribute("y", startY);
    rectTop.setAttribute("height", hTop);
    rectTop.setAttribute(
      "fill",
      slots.top.note ? slots.top.note.color : "#3a2b22",
    );
    rectTop.setAttribute("fill-opacity", slots.top.note ? "0.82" : "0.2");

    rectHeart.setAttribute("y", startY + hTop);
    rectHeart.setAttribute("height", hHeart);
    rectHeart.setAttribute(
      "fill",
      slots.heart.note ? slots.heart.note.color : "#3a2b22",
    );
    rectHeart.setAttribute("fill-opacity", slots.heart.note ? "0.86" : "0.25");

    rectBase.setAttribute("y", startY + hTop + hHeart);
    rectBase.setAttribute("height", hBase);
    rectBase.setAttribute(
      "fill",
      slots.base.note ? slots.base.note.color : "#3a2b22",
    );
    rectBase.setAttribute("fill-opacity", slots.base.note ? "0.92" : "0.3");

    // Update Ratio Legend in Column 3
    document.getElementById("ratio-val-top").textContent =
      `${selectedFormula.top}%`;
    document.getElementById("ratio-val-heart").textContent =
      `${selectedFormula.heart}%`;
    document.getElementById("ratio-val-base").textContent =
      `${selectedFormula.base}%`;

    document.getElementById("ratio-dot-top").style.backgroundColor = slots.top
      .note
      ? slots.top.note.color
      : "rgba(255,255,255,0.2)";
    document.getElementById("ratio-dot-heart").style.backgroundColor = slots
      .heart.note
      ? slots.heart.note.color
      : "rgba(255,255,255,0.2)";
    document.getElementById("ratio-dot-base").style.backgroundColor = slots.base
      .note
      ? slots.base.note.color
      : "rgba(255,255,255,0.2)";

    document.getElementById("ratio-note-top").textContent = slots.top.note
      ? `${slots.top.note.icon} ${slots.top.note.name}`
      : "Chưa chọn";
    document.getElementById("ratio-note-heart").textContent = slots.heart.note
      ? `${slots.heart.note.icon} ${slots.heart.note.name}`
      : "Chưa chọn";
    document.getElementById("ratio-note-base").textContent = slots.base.note
      ? `${slots.base.note.icon} ${slots.base.note.name}`
      : "Chưa chọn";

    finalBottleRatio.textContent = `CÔNG THỨC ${selectedFormula.code.replace(/-/g, " · ")}`;
  }

  // Drag & Drop + Click Event Listeners for Sample Vials
  ["top", "heart", "base"].forEach((layer) => {
    const vialEl = document.getElementById(`vial-${layer}`);

    vialEl.addEventListener("dragstart", (e) => {
      if (!slots[layer].note || slots[layer].poured) {
        e.preventDefault();
        return;
      }
      draggedLayer = layer;
      e.dataTransfer.setData("text/plain", layer);
      e.dataTransfer.effectAllowed = "move";
    });

    vialEl.addEventListener("dragend", () => {
      draggedLayer = null;
      dropzone.classList.remove("drag-over");
    });

    // Click to pour (great for mobile & quick interaction)
    vialEl.addEventListener("click", () => {
      if (slots[layer].note && !slots[layer].poured) {
        pourVialIntoFlask(layer);
      }
    });
  });

  // Remove Vial Button
  document.querySelectorAll(".vial-remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const layer = btn.dataset.remove;
      slots[layer] = { note: null, poured: false };
      updateAllColumns();
    });
  });

  // Dropzone Drag Events
  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    dropzone.classList.add("drag-over");
  });

  dropzone.addEventListener("dragleave", () => {
    dropzone.classList.remove("drag-over");
  });

  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("drag-over");
    const layer = draggedLayer || e.dataTransfer.getData("text/plain");
    if (layer && slots[layer]) {
      pourVialIntoFlask(layer);
    }
  });

  // Quick Pour All Button
  quickPourBtn.addEventListener("click", () => {
    const unpoured = ["top", "heart", "base"].filter(
      (k) => slots[k].note && !slots[k].poured,
    );
    unpoured.forEach((layer, idx) => {
      setTimeout(() => {
        slots[layer].poured = true;
        spawnAromaBubbles(slots[layer].note.color);
        updateAllColumns();
      }, idx * 220);
    });
  });

  // 3 Formula Recipe Selector (40-30-30, 50-40-20, 50-40-10)
  document.querySelectorAll(".formula-recipe-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".formula-recipe-btn")
        .forEach((b) => b.classList.toggle("active", b === btn));

      selectedFormula = {
        code: btn.dataset.formula,
        name: btn.querySelector(".recipe-name").textContent,
        top: Number(btn.dataset.top),
        heart: Number(btn.dataset.heart),
        base: Number(btn.dataset.base),
      };

      updateAllColumns();
    });
  });

  // Owner Name Input
  userNameInput.addEventListener("input", () => {
    const val = userNameInput.value.trim();
    finalBottleOwner.textContent = val
      ? val.toUpperCase().slice(0, 16)
      : "BESPOKE SCENT";
  });

  // Random Pick Button in HUD
  document.getElementById("random-spin-btn").addEventListener("click", () => {
    const allNotes = [];
    FRAGRANCE_FAMILIES.forEach((fam) => {
      fam.notes.forEach((n) => {
        allNotes.push({ ...n, familyId: fam.id, color: fam.color });
      });
    });

    const shuffled = [...allNotes].sort(() => Math.random() - 0.5);
    slots.top = { note: shuffled[0], poured: false };
    slots.heart = { note: shuffled[1], poured: false };
    slots.base = { note: shuffled[2], poured: false };

    activeFamilyId = shuffled[1].familyId;
    wheelSvg.style.transform = "rotate(360deg)";
    setTimeout(() => {
      wheelSvg.style.transform = "rotate(0deg)";
    }, 750);

    renderWheel();
    updateAllColumns();
  });

  // Reset Board Button
  function resetGame() {
    slots.top = { note: null, poured: false };
    slots.heart = { note: null, poured: false };
    slots.base = { note: null, poured: false };
    resultModal.hidden = true;
    updateAllColumns();
  }

  document
    .getElementById("reset-board-btn")
    .addEventListener("click", resetGame);
  document
    .getElementById("modal-replay-btn")
    .addEventListener("click", resetGame);

  // Radar Chart Generator inside Modal
  function renderRadarChart(scores) {
    const svg = document.getElementById("radar-svg");
    const cx = 135;
    const cy = 128;
    const maxR = 78;
    const axes = [
      { key: "elegance", label: "Tinh Tế" },
      { key: "depth", label: "Chiều Sâu" },
      { key: "warmth", label: "Ấm Áp" },
      { key: "freedom", label: "Tự Do" },
      { key: "mystery", label: "Bí Ẩn" },
    ];

    let html = "";
    [0.35, 0.7, 1].forEach((level) => {
      const pts = axes
        .map((_, i) => {
          const angle = (i * 360) / axes.length;
          const p = polarToCartesian(cx, cy, maxR * level, angle);
          return `${p.x},${p.y}`;
        })
        .join(" ");
      html += `<polygon points="${pts}" fill="none" stroke="rgba(212,163,89,0.25)" stroke-width="1" />`;
    });

    axes.forEach((axis, i) => {
      const angle = (i * 360) / axes.length;
      const end = polarToCartesian(cx, cy, maxR, angle);
      const labelPos = polarToCartesian(cx, cy, maxR + 22, angle);
      html += `
        <line x1="${cx}" y1="${cy}" x2="${end.x}" y2="${end.y}" stroke="rgba(212,163,89,0.25)" stroke-width="1" />
        <text x="${labelPos.x}" y="${labelPos.y}" fill="#f7efe2" font-size="10.5" font-family="var(--font-sans)" text-anchor="middle" dominant-baseline="middle">${axis.label} (${scores[axis.key]}%)</text>
      `;
    });

    const dataPts = axes
      .map((axis, i) => {
        const angle = (i * 360) / axes.length;
        const val = (scores[axis.key] || 80) / 100;
        const p = polarToCartesian(cx, cy, maxR * val, angle);
        return `${p.x},${p.y}`;
      })
      .join(" ");

    html += `<polygon points="${dataPts}" fill="rgba(212,163,89,0.38)" stroke="#f3c878" stroke-width="2" />`;

    axes.forEach((axis, i) => {
      const angle = (i * 360) / axes.length;
      const val = (scores[axis.key] || 80) / 100;
      const p = polarToCartesian(cx, cy, maxR * val, angle);
      html += `<circle cx="${p.x}" cy="${p.y}" r="3.5" fill="#fff8ee" stroke="#d4a359" stroke-width="2" />`;
    });

    svg.innerHTML = html;
  }

  // Final Craft & Open Pop-up Modal
  craftBtn.addEventListener("click", () => {
    if (!slots.top.note || !slots.heart.note || !slots.base.note) return;

    // Auto-pour any unpoured vials first
    ["top", "heart", "base"].forEach((k) => {
      if (!slots[k].poured) {
        slots[k].poured = true;
        spawnAromaBubbles(slots[k].note.color);
      }
    });
    updateAllColumns();

    // Shake flask animation before opening popup
    const flaskSvg = document.getElementById("mixing-flask-svg");
    flaskSvg.classList.add("flask-shake");

    setTimeout(() => {
      flaskSvg.classList.remove("flask-shake");
      openResultModal();
    }, 550);
  });

  function openResultModal() {
    const top = slots.top.note;
    const heart = slots.heart.note;
    const base = slots.base.note;
    const ownerName = userNameInput.value.trim() || "Bạn";

    const wTop = selectedFormula.top;
    const wHeart = selectedFormula.heart;
    const wBase = selectedFormula.base;
    const wSum = wTop + wHeart + wBase;

    const clamp = (n) => Math.min(99, Math.max(68, Math.round(n)));
    const avgScores = {
      elegance: clamp(
        (top.scores.elegance * wTop +
          heart.scores.elegance * wHeart +
          base.scores.elegance * wBase) /
          wSum,
      ),
      depth: clamp(
        (top.scores.depth * wTop +
          heart.scores.depth * wHeart +
          base.scores.depth * wBase) /
          wSum,
      ),
      warmth: clamp(
        (top.scores.warmth * wTop +
          heart.scores.warmth * wHeart +
          base.scores.warmth * wBase) /
          wSum,
      ),
      freedom: clamp(
        (top.scores.freedom * wTop +
          heart.scores.freedom * wHeart +
          base.scores.freedom * wBase) /
          wSum,
      ),
      mystery: clamp(
        (top.scores.mystery * wTop +
          heart.scores.mystery * wHeart +
          base.scores.mystery * wBase) /
          wSum,
      ),
    };

    const bespokeName = `${heart.prefix} & ${base.suffix}`;
    const codeNum =
      ((top.id.length * 19 + heart.id.length * 31 + base.id.length * 47) %
        899) +
      100;
    const archetype = ARCHETYPES.find((a) => a.condition(avgScores));
    const dominantFamily = heart.familyId || base.familyId;
    const productMatch =
      MIYAKO_MATCHES[dominantFamily] || MIYAKO_MATCHES.floral;

    // Populate Modal Fields
    document.getElementById("result-serial").textContent =
      `MIYAKO BESPOKE NO. ${codeNum} · CÔNG THỨC TỶ LỆ ${selectedFormula.code} (${selectedFormula.name.toUpperCase()})`;
    document.getElementById("result-owner").textContent =
      `Chế tác độc bản dành riêng cho: ${ownerName}`;
    document.getElementById("result-scent-name").textContent = bespokeName;
    document.getElementById("result-poetic-sub").textContent =
      `Pha chế theo tỷ lệ ${selectedFormula.code}: ${top.name} (${wTop}%) · ${heart.name} (${wHeart}%) · ${base.name} (${wBase}%).`;

    document.getElementById("persona-title").textContent = archetype.title;
    document.getElementById("persona-summary").textContent = archetype.summary;

    document.getElementById("modal-pct-top").textContent = `${wTop}%`;
    document.getElementById("modal-pct-heart").textContent = `${wHeart}%`;
    document.getElementById("modal-pct-base").textContent = `${wBase}%`;

    document.getElementById("psych-top-note").textContent =
      `${top.icon} ${top.name}`;
    document.getElementById("psych-top-desc").textContent = top.outer;

    document.getElementById("psych-heart-note").textContent =
      `${heart.icon} ${heart.name}`;
    document.getElementById("psych-heart-desc").textContent = heart.inner;

    document.getElementById("psych-base-note").textContent =
      `${base.icon} ${base.name}`;
    document.getElementById("psych-base-desc").textContent = base.core;

    document.getElementById("aura-tags").innerHTML = [
      `Công thức: ${selectedFormula.code}`,
      `${top.name} (${wTop}%)`,
      `${heart.name} (${wHeart}%)`,
      `${base.name} (${wBase}%)`,
    ]
      .map((t) => `<span class="aura-tag">${t}</span>`)
      .join("");

    document.getElementById("match-thumb").src = productMatch.image;
    document.getElementById("match-vessel").textContent = productMatch.vessel;
    document.getElementById("match-collection").textContent =
      productMatch.collection;
    document.getElementById("match-desc").textContent = productMatch.desc;

    renderRadarChart(avgScores);
    resultModal.hidden = false;
  }

  // Close Modal Events
  document.getElementById("close-modal-btn").addEventListener("click", () => {
    resultModal.hidden = true;
  });

  resultModal.addEventListener("click", (e) => {
    if (e.target === resultModal) {
      resultModal.hidden = true;
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !resultModal.hidden) {
      resultModal.hidden = true;
    }
  });

  // Copy Formula Button
  document
    .getElementById("copy-formula-btn")
    .addEventListener("click", async () => {
      const scentName =
        document.getElementById("result-scent-name").textContent;
      const persona = document.getElementById("persona-title").textContent;
      const text = `✦ Mùi Hương Độc Bản Miyako Home: "${scentName}"\n• Công thức pha: ${selectedFormula.code} (${selectedFormula.name})\n• Thành phần: Hương đầu ${slots.top.note?.name} (${selectedFormula.top}%) — Hương giữa ${slots.heart.note?.name} (${selectedFormula.heart}%) — Hương cuối ${slots.base.note?.name} (${selectedFormula.base}%)\n• Chân dung tính cách: ${persona}`;
      try {
        await navigator.clipboard.writeText(text);
        const btn = document.getElementById("copy-formula-btn");
        const old = btn.textContent;
        btn.textContent = "✓ Đã sao chép công thức!";
        setTimeout(() => {
          btn.textContent = old;
        }, 2200);
      } catch {
        // Ignore clipboard error
      }
    });

  // Initialize Game
  renderWheel();
  updateAllColumns();
})();
