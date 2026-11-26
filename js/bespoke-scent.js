/* ==========================================================================
   MIYAKO HOME — 3-COLUMN SCENT ALCHEMIST MINI-GAME ENGINE
   ========================================================================== */

(() => {
  "use strict";

  const BESPOKE_UTM_QUERY =
    "utm_source=web-bespoke&utm_medium=bespoke-scent&utm_campaign=branding&utm_content=bio_link";

  function withBespokeUtm(url) {
    if (!url || !url.includes("vietbeauties.vn") || url.includes("utm_source=")) {
      return url;
    }
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}${BESPOKE_UTM_QUERY}`;
  }

  const CUSTOM_PRODUCT_URL =
    "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-custome/";

  function buildCustomFormulaNote(scentName) {
    const cleanName = (scentName || "").replace(/^[“"]|[”"]$/g, "").trim();
    const top = slots.top.note;
    const heart = slots.heart.note;
    const base = slots.base.note;
    if (!top || !heart || !base) return "";
    return [
      "[MIYAKO HOME BESPOKE – PHA CHẾ RIÊNG]",
      `Tên mùi: ${cleanName}`,
      `Công thức tỷ lệ: ${selectedFormula.code} (${selectedFormula.name})`,
      `Hương đầu (${selectedFormula.top}%): ${top.name}`,
      `Hương giữa (${selectedFormula.heart}%): ${heart.name}`,
      `Hương cuối (${selectedFormula.base}%): ${base.name}`,
    ].join("\n");
  }

  function buildCustomProductOrderUrl(scentName) {
    const baseUrl = withBespokeUtm(CUSTOM_PRODUCT_URL);
    const note = buildCustomFormulaNote(scentName);
    if (!note) return baseUrl;
    return `${baseUrl}&bespoke_note=${encodeURIComponent(note)}`;
  }

  const FRAGRANCE_FAMILIES = [
    {
      id: "floral",
      name: "Hương Hoa",
      sub: "Floral · Thanh Tao",
      color: "#c96a7b",
      desc: "Hoa Sen, Hoa Nhài, Hồng Damask, Lan Freesia, Hoa Cam & Mẫu Đơn",
      notes: [
        {
          id: "white-lotus",
          name: "Hoa Sen Trắng",
          icon: "🪷",
          prefix: "Thanh Liên",
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
          name: "Hoa Nhài",
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
          id: "damask-rose",
          name: "Hoa Hồng Damask",
          icon: "🌹",
          prefix: "Hồng Nhung",
          suffix: "Vườn Sương Sớm",
          outer:
            "Bạn mang vẻ đẹp thanh lịch, kiêu kỳ tự nhiên nhưng ấm áp và gần gũi.",
          inner:
            "Bạn trân trọng sự thủy chung, tinh tế và luôn dành trọn tâm huyết cho những gì mình tin tưởng.",
          core: "Vẻ đẹp thuần khiết, lãng mạn và kiên cường như đóa hồng Damask bung nở trong sương mai.",
          scores: {
            elegance: 96,
            depth: 86,
            warmth: 86,
            freedom: 74,
            mystery: 82,
          },
        },
        {
          id: "freesia-orchid",
          name: "Hoa Lan Freesia",
          icon: "🪻",
          prefix: "U Lan",
          suffix: "Gió Biển Chiều",
          outer:
            "Bạn thanh tú, khác biệt và toát lên khí chất tự tại, phóng khoáng.",
          inner:
            "Bạn trân trọng không gian riêng, yêu thích sự tĩnh lặng và chiều sâu tư tưởng.",
          core: "Kiêu hãnh, thanh thoát và đầy cuốn hút như đóa lan Nam Phi giữa làn gió mát.",
          scores: {
            elegance: 93,
            depth: 89,
            warmth: 76,
            freedom: 88,
            mystery: 91,
          },
        },
        {
          id: "orange-blossom",
          name: "Hoa Cam Neroli",
          icon: "🌸",
          prefix: "Hoa Cam",
          suffix: "Nắng Sớm Địa Trung Hải",
          outer:
            "Bạn cuốn hút bởi sự trang nhã, tươi sáng và nụ cười đong đầy cảm xúc.",
          inner:
            "Tâm hồn bạn tha thiết, trân trọng những khoảnh khắc lãng mạn và sự gắn kết chân thành.",
          core: "Đằm thắm, rạng rỡ nhưng đầy nội lực, bạn luôn biết cách sưởi ấm những người mình yêu thương.",
          scores: {
            elegance: 94,
            depth: 84,
            warmth: 91,
            freedom: 78,
            mystery: 83,
          },
        },
        {
          id: "peony-lily",
          name: "Mẫu Đơn & Linh Lan",
          icon: "🌺",
          prefix: "Mẫu Đơn",
          suffix: "Thung Lũng Hoa",
          outer:
            "Bạn toát lên vẻ nho nhã, sang trọng và đáng tin cậy như một người tri kỷ.",
          inner:
            "Bạn trân quý những kỷ niệm đẹp và những giá trị bền vững theo năm tháng.",
          core: "Sự tử tế và tinh khôi của bạn giống như đóa linh lan và mẫu đơn mùa xuân.",
          scores: {
            elegance: 95,
            depth: 85,
            warmth: 88,
            freedom: 75,
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
      desc: "Trầm Hương, Đàn Hương, Tuyết Tùng, Gỗ Thông, Gỗ Guaiac & Rêu Sồi",
      notes: [
        {
          id: "agarwood",
          name: "Gỗ Trầm & Khói Trầm",
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
          name: "Gỗ Đàn Hương",
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
          name: "Gỗ Tuyết Tùng",
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
        {
          id: "pine-wood",
          name: "Gỗ Thông & Linh Sam",
          icon: "🌲",
          prefix: "Thanh Tùng",
          suffix: "Đỉnh Núi Sương Mù",
          outer:
            "Bạn phóng khoáng, dứt khoát và mang hơi thở tự nhiên trong lành của rừng thông.",
          inner:
            "Bạn khao khát chinh phục những chân trời mới và sống trọn vẹn từng khoảnh khắc.",
          core: "Nội lực bền bỉ, luôn vươn mình đón ánh ban mai rực rỡ.",
          scores: {
            elegance: 87,
            depth: 90,
            warmth: 79,
            freedom: 95,
            mystery: 84,
          },
        },
        {
          id: "guaiac-teak",
          name: "Gỗ Guaiac & Teak",
          icon: "🪵",
          prefix: "Mộc Quý",
          suffix: "Hảiình Viễn Dương",
          outer:
            "Bạn sở hữu thần thái sang trọng, lịch lãm và uy quyền một cách tự nhiên.",
          inner:
            "Bạn có cái nhìn sâu sắc, tinh tế về con người và cuộc đời, không dễ bị lay động.",
          core: "Vương giả, ấm áp và lưu giữ giá trị trường tồn qua thời gian.",
          scores: {
            elegance: 94,
            depth: 95,
            warmth: 86,
            freedom: 78,
            mystery: 92,
          },
        },
        {
          id: "vetiver-oakmoss",
          name: "Cỏ Hương Bài & Rêu Sồi",
          icon: "🌿",
          prefix: "Rêu Xanh",
          suffix: "Cổ Thụ Ngàn Năm",
          outer:
            "Bạn toát lên sự rắn rỏi, mực thước và luôn là chỗ dựa vững chãi.",
          inner:
            "Bạn sống thực tế, sâu sắc và coi trọng chữ tín hơn mọi điều khác.",
          core: "Trầm mặc, thanh lịch và gắn kết sâu sắc với thiên nhiên nguyên bản.",
          scores: {
            elegance: 89,
            depth: 95,
            warmth: 83,
            freedom: 82,
            mystery: 90,
          },
        },
      ],
    },
    {
      id: "herbal",
      name: "Trà & Thảo Mộc",
      sub: "Tea · Tĩnh Tại",
      color: "#4d7c5d",
      desc: "Trà Trắng, Trà Xanh, Oải Hương, Sả Chanh, Hương Thảo & Bạc Hà",
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
          id: "green-tea-bamboo",
          name: "Trà Xanh & Trúc Xanh",
          icon: "🌿",
          prefix: "Trúc Thanh",
          suffix: "Sau Cơn Mưa Hạ",
          outer:
            "Bạn tươi mới, chân thật và mang nguồn năng lượng trong lành khiến ai tiếp xúc cũng thấy dễ chịu.",
          inner:
            "Bạn có khả năng phục hồi cảm xúc rất tốt. Sau những thử thách, bạn luôn biết cách làm mới mình như mầm cây sau mưa.",
          core: "Ngay thẳng, tự nhiên nhưng mềm dẻo — bạn biết linh hoạt trước hoàn cảnh mà không đánh mất chất riêng.",
          scores: {
            elegance: 86,
            depth: 80,
            warmth: 76,
            freedom: 95,
            mystery: 70,
          },
        },
        {
          id: "lavender",
          name: "Hoa Oải Hương",
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
        {
          id: "lemongrass",
          name: "Sả Chanh",
          icon: "🌾",
          prefix: "Thảo Hương",
          suffix: "Thung Lũng Nắng Mai",
          outer:
            "Bạn sảng khoái, tràn đầy năng lượng tích cực và luôn mang lại sự tươi vui.",
          inner:
            "Bạn yêu sự trong sáng, ghét sự giả tạo và luôn sống thật với cảm xúc của mình.",
          core: "Như cơn gió sớm thanh lọc không gian, bạn đem lại sinh khí tươi mới ở bất cứ nơi đâu.",
          scores: {
            elegance: 86,
            depth: 76,
            warmth: 82,
            freedom: 96,
            mystery: 68,
          },
        },
        {
          id: "rosemary-tea-tree",
          name: "Hương Thảo & Tràm Trà",
          icon: "🌿",
          prefix: "Mộc Thảo",
          suffix: "Khu Vườn Trị Liệu",
          outer:
            "Bạn gần gũi, minh mẫn và mang nét duyên điềm tĩnh làm người khác thấy an lòng.",
          inner:
            "Bạn có khả năng tập trung cao, trực giác nhạy bén và luôn biết cách chăm sóc sức khỏe tinh thần.",
          core: "Hiền hòa, chữa lành và tràn ngập năng lượng thanh lọc tự nhiên.",
          scores: {
            elegance: 89,
            depth: 85,
            warmth: 88,
            freedom: 86,
            mystery: 78,
          },
        },
        {
          id: "peppermint",
          name: "Bạc Hà & Khuynh Diệp",
          icon: "🌱",
          prefix: "Băng Bạc",
          suffix: "Gió Lạnh Đầu Non",
          outer:
            "Bạn sắc bén, nhanh nhạy, hiện đại và luôn có những góc nhìn đột phá.",
          inner:
            "Bạn yêu tự do tuyệt đối, thích trải nghiệm những điều mới lạ và không sợ thử thách.",
          core: "Tỉnh táo, độc lập và luôn giữ cái đầu lạnh trước mọi biến động.",
          scores: {
            elegance: 88,
            depth: 80,
            warmth: 68,
            freedom: 98,
            mystery: 75,
          },
        },
      ],
    },
    {
      id: "citrus",
      name: "Cam Chanh & Biển",
      sub: "Citrus · Rạng Rỡ",
      color: "#d49b38",
      desc: "Cam Bergamot, Bưởi Hồng, Muối Biển, Cam Ngọt, Chanh Vàng & Trái Cây",
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
          id: "grapefruit",
          name: "Bưởi Hồng",
          icon: "🍊",
          prefix: "Thanh Bưởi",
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
            freedom: 82,
            mystery: 72,
          },
        },
        {
          id: "sea-salt-ozone",
          name: "Muối Biển & Ozone",
          icon: "🌊",
          prefix: "Hải Sương",
          suffix: "Sóng Biển Bình Minh",
          outer:
            "Bạn thanh thoát, tự do và phóng khoáng như làn gió đại dương buổi sớm.",
          inner:
            "Bạn ghét sự gò bó. Tâm hồn bạn thuộc về những chân trời mở, những chuyến đi ngẫu hứng và những ý tưởng khác biệt.",
          core: "Sự minh bạch và tự do là kim chỉ nam của bạn — trong trẻo như hơi thở của biển khơi.",
          scores: {
            elegance: 88,
            depth: 82,
            warmth: 72,
            freedom: 98,
            mystery: 78,
          },
        },
        {
          id: "sweet-orange",
          name: "Cam Ngọt & Quýt",
          icon: "🍊",
          prefix: "Kim Quýt",
          suffix: "Mùa Màng Rực Rỡ",
          outer:
            "Bạn tươi vui, ngọt ngào và luôn tạo không khí ấm cúng, phấn khởi.",
          inner:
            "Bạn biết trân trọng những niềm vui bình dị mỗi ngày và luôn giữ sự hồn nhiên.",
          core: "Rạng rỡ như ánh nắng vàng, mang lại niềm vui thuần khiết cho cuộc sống.",
          scores: {
            elegance: 85,
            depth: 74,
            warmth: 94,
            freedom: 92,
            mystery: 64,
          },
        },
        {
          id: "amalfi-lemon",
          name: "Chanh Vàng Amalfi",
          icon: "🍋",
          prefix: "Nắng Chanh",
          suffix: "Bờ Biển Nắng Ấm",
          outer: "Bạn bộc trực, cá tính năng động và vô cùng cuốn hút.",
          inner:
            "Bạn yêu ghét rõ ràng, không bao giờ vòng vo và luôn theo đuổi sự chân thật.",
          core: "Tươi mới, sảng khoái và luôn tiến về phía trước.",
          scores: {
            elegance: 85,
            depth: 76,
            warmth: 75,
            freedom: 97,
            mystery: 70,
          },
        },
        {
          id: "pear-berry-melon",
          name: "Lê, Cherry & Dưa Lưới",
          icon: "🍐",
          prefix: "Mật Quả",
          suffix: "Khu Vườn Mùa Hạ",
          outer:
            "Bạn thanh nhã, ngọt ngào và có nụ cười ấm áp khiến người ta xao xuyến.",
          inner:
            "Bạn chu đáo, tinh tế và luôn để ý đến cảm nhận của những người xung quanh.",
          core: "Trẻ trung, thơm thảo và đong đầy nguồn năng lượng yêu thương.",
          scores: {
            elegance: 92,
            depth: 80,
            warmth: 91,
            freedom: 86,
            mystery: 74,
          },
        },
      ],
    },
    {
      id: "spicy",
      name: "Gia Vị Ấm",
      sub: "Spicy · Quyến Rũ",
      color: "#a8422b",
      desc: "Nghệ Tây, Tiêu Hồng, Cà Phê, Khói & Da Thuộc, Bạch Đậu Khấu & Đinh Hương",
      notes: [
        {
          id: "saffron-almond",
          name: "Nghệ Tây & Hạnh Nhân",
          icon: "✨",
          prefix: "Nhụy Đỏ",
          suffix: "Hoàng Cung Rực Rỡ",
          outer:
            "Bạn sang trọng, nhiệt thành và có cá tính rõ nét. Bạn không bao giờ hòa lẫn vào đám đông.",
          inner:
            "Trái tim bạn luôn rực lửa đam mê. Khi đã theo đuổi điều gì hay yêu thương ai, bạn luôn hết mình và sâu sắc.",
          core: "Quý phái và độc bản như sợi nghệ tây vàng đỏ quý giá.",
          scores: {
            elegance: 94,
            depth: 92,
            warmth: 94,
            freedom: 80,
            mystery: 95,
          },
        },
        {
          id: "pink-pepper",
          name: "Tiêu Hồng (Pink Pepper)",
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
          id: "coffee-cacao",
          name: "Cà Phê & Cacao",
          icon: "☕",
          prefix: "Hương Cà Phê",
          suffix: "Đêm Phố Thị",
          outer:
            "Bạn sâu sắc, cuốn hút và mang lại cảm giác ấm áp, tỉnh thức cho những người xung quanh.",
          inner:
            "Bạn yêu những khoảng lặng suy tư và những cuộc trò chuyện có chiều sâu.",
          core: "Đậm đà, quyến rũ và lưu lại hậu vị khó quên.",
          scores: {
            elegance: 88,
            depth: 93,
            warmth: 95,
            freedom: 82,
            mystery: 92,
          },
        },
        {
          id: "tobacco-leather",
          name: "Khói & Da Thuộc",
          icon: "🍂",
          prefix: "Phong Trần",
          suffix: "Phòng Đọc Sách Cổ",
          outer: "Bạn độc đáo, lịch lãm và toát lên khí chất bí ẩn khó đoán.",
          inner:
            "Bạn có tư duy triết học sâu sắc, thích khám phá những khía cạnh ẩn giấu của cuộc sống.",
          core: "Nồng nàn, từng trải và mang phong vị nghệ thuật cổ điển.",
          scores: {
            elegance: 91,
            depth: 96,
            warmth: 90,
            freedom: 84,
            mystery: 96,
          },
        },
        {
          id: "cardamom-cumin",
          name: "Bạch Đậu Khấu & Thì Là",
          icon: "🌰",
          prefix: "Đậu Khấu",
          suffix: "Ngọn Lửa Rừng Khuya",
          outer: "Bạn phóng khoáng, dũng cảm và có nét phong trần lãng tử.",
          inner:
            "Bạn khao khát tự do và không ngại dấn thân vào những hành trình mới.",
          core: "Ấm nồng, mạnh mẽ và dám sống trọn vẹn cho đam mê.",
          scores: {
            elegance: 86,
            depth: 92,
            warmth: 94,
            freedom: 91,
            mystery: 89,
          },
        },
        {
          id: "clove-cinnamon",
          name: "Đinh Hương & Quế",
          icon: "🌿",
          prefix: "Đinh Hương",
          suffix: "Đêm Đông Ấm Áp",
          outer: "Bạn đĩnh đạc, ấm áp và có sức hút mê hoặc đầy quyến rũ.",
          inner:
            "Bạn sống giàu cảm xúc nhưng rất kín đáo, chỉ mở lòng với người thật sự hiểu mình.",
          core: "Sâu sắc, nồng nàn và để lại dấu ấn khó phai.",
          scores: {
            elegance: 90,
            depth: 95,
            warmth: 97,
            freedom: 78,
            mystery: 94,
          },
        },
      ],
    },
    {
      id: "amber",
      name: "Hổ Phách & Xạ",
      sub: "Amber · Gợi Cảm",
      color: "#9b6b43",
      desc: "Hổ Phách, Xạ Hương, Đậu Tonka, Vanilla, Gỗ Cashmere & Hoắc Hương",
      notes: [
        {
          id: "golden-amber",
          name: "Hổ Phách & Long Diên Hương",
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
          name: "Xạ Hương Trắng",
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
          name: "Đậu Tonka & Vanilla",
          icon: "🤎",
          prefix: "Mật Tonka",
          suffix: "Khúc Ru Đêm Dịu",
          outer:
            "Bạn ngọt ngào, thân thiện và có khả năng làm mềm đi mọi khoảng cách xã giao.",
          inner:
            "Bạn biết tận hưởng niềm vui từ những điều giản dị: mùi bánh nướng, ánh đèn vàng ấm và tiếng nhạc du dương.",
          core: "Tâm hồn bạn giàu lòng trắc ẩn và sự lạc quan ấm áp.",
          scores: {
            elegance: 88,
            depth: 84,
            warmth: 97,
            freedom: 79,
            mystery: 83,
          },
        },
        {
          id: "cashmere-wood",
          name: "Gỗ Cashmere (Cashmeran)",
          icon: "🧣",
          prefix: "Nhung Cashmere",
          suffix: "Chiều Thu Êm Ái",
          outer:
            "Bạn thanh lịch, nho nhã và mang lại cảm giác êm dịu như tấm lụa cashmere.",
          inner:
            "Bạn yêu sự tinh tế, sang trọng thầm lặng và không gian sống ấm cúng.",
          core: "Mượt mà, sâu lắng và ôm ấp tâm hồn bằng sự dịu dàng.",
          scores: {
            elegance: 95,
            depth: 91,
            warmth: 94,
            freedom: 76,
            mystery: 89,
          },
        },
        {
          id: "frankincense-labdanum",
          name: "Nhũ Hương & Nhựa Thơm",
          icon: "✨",
          prefix: "Thiên Hương",
          suffix: "Điện Thờ Tôn Quý",
          outer: "Bạn cao quý, điềm đạm và có tầm nhìn xa trông rộng.",
          inner:
            "Bạn sống có lý tưởng cao đẹp, luôn hướng về sự cân bằng và tĩnh tại.",
          core: "Trang nghiêm, thuần khiết và lưu giữ sự tôn quý bền lâu.",
          scores: {
            elegance: 97,
            depth: 96,
            warmth: 88,
            freedom: 78,
            mystery: 96,
          },
        },
        {
          id: "patchouli",
          name: "Hoắc Hương (Patchouli)",
          icon: "🌿",
          prefix: "Hoắc Hương",
          suffix: "Hương Đất Mẹ Sâu Xa",
          outer: "Bạn mộc mạc, bí ẩn và có nét cuốn hút rất riêng biệt.",
          inner:
            "Bạn kiên cường, thấu hiểu quy luật tự nhiên và không thích những điều giả tạo.",
          core: "Bám rễ sâu vào lòng đất mẹ, vững chãi và để lại dư âm quyến rũ.",
          scores: {
            elegance: 89,
            depth: 96,
            warmth: 88,
            freedom: 82,
            mystery: 95,
          },
        },
      ],
    },
  ];

  const MIYAKO_PRODUCTS = [
    {
      title:
        "Tinh Dầu Khuếch Tán Giảm Stress MIYAKO HOME – Năng Lượng: Hổ Phách",
      shortName: "Năng Lượng: Hổ Phách",
      collection: "BST Tinh Dầu Giảm Stress – Trị Liệu",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-giam-stress-miyako-home-nang-luong-ho-phach/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/11/chai-nhua-300ml-800x800.jpg",
      priceRange: "589.000 ₫ – 1.520.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "589.000 ₫",
        },
        {
          capacity: "500ml",
          price: "859.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.520.000 ₫",
        },
      ],
      pyramid: {
        top: "Hương hoa, Hương trái cây",
        heart: "Hương gỗ, Thảo mộc",
        base: "Hương gỗ, Hương nhựa, Vani",
      },
      topIds: ["peony-lily", "pear-berry-melon"],
      heartIds: ["guaiac-teak", "rosemary-tea-tree"],
      baseIds: ["guaiac-teak", "vanilla-tonka", "frankincense-labdanum"],
      allNoteIds: [
        "peony-lily",
        "pear-berry-melon",
        "guaiac-teak",
        "rosemary-tea-tree",
        "vanilla-tonka",
        "frankincense-labdanum",
        "golden-amber",
      ],
      desc: "Tinh dầu trị liệu Hổ Phách sở hữu hương thơm ngọt ấm, trầm lắng và đầy lôi cuốn – được ví như một dòng năng lượng âm ỉ chảy trong cơ thể, vừa xoa dịu tâm trí, vừa đánh thức nguồn sinh lực từ bên trong. Đây là liệu phá...",
    },
    {
      title: "Tinh Dầu Khuếch Tán Giảm Stress MIYAKO HOME – Cảm Hứng: Gỗ Thông",
      shortName: "Cảm Hứng: Gỗ Thông",
      collection: "BST Tinh Dầu Giảm Stress – Trị Liệu",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-giam-stress-miyako-home-cam-hung-go-thong/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/11/chai-nhua-300ml-2-800x800.jpg",
      priceRange: "589.000 ₫ – 1.520.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "589.000 ₫",
        },
        {
          capacity: "500ml",
          price: "859.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.520.000 ₫",
        },
      ],
      pyramid: {
        top: "Lá thông",
        heart: "Hương gỗ, Hương nhựa, Thảo mộc",
        base: "Hương gỗ, Hương nhựa",
      },
      topIds: ["pine-wood"],
      heartIds: ["guaiac-teak", "rosemary-tea-tree", "frankincense-labdanum"],
      baseIds: ["guaiac-teak", "frankincense-labdanum"],
      allNoteIds: [
        "pine-wood",
        "guaiac-teak",
        "rosemary-tea-tree",
        "frankincense-labdanum",
      ],
      desc: "Chiết xuất từ lá và quả của cây thông,  tinh dầu trị liệu Gỗ Thông   mang hương thơm mộc mạc, tươi mát – đặc trưng của núi rừng. Với đặc tính kháng khuẩn và kháng viêm tự nhiên, tinh dầu thông hỗ trợ làm sạch không kh...",
    },
    {
      title:
        "Tinh Dầu Khuếch Tán Giảm Stress MIYAKO HOME – Giấc Ngủ: Bưởi & Bạc Hà",
      shortName: "Giấc Ngủ: Bưởi & Bạc Hà",
      collection: "BST Tinh Dầu Giảm Stress – Trị Liệu",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-giam-stress-miyako-home-giac-ngu-buoi-bac-ha/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/11/chai-nhua-300ml-2-800x800.jpg",
      priceRange: "589.000 ₫ – 1.520.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "589.000 ₫",
        },
        {
          capacity: "500ml",
          price: "859.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.520.000 ₫",
        },
      ],
      pyramid: {
        top: "Sự tươi mát, chua chua và thanh khiết, gợi nhớ đến những quả bưởi chín mộng",
        heart:
          "Bạc hà sẽ bổ sung cho hương bưởi bằng một lớp hương menthol lạnh lẽo, làm tăng thêm cảm giác tươi mát",
        base: "Thảo mộc của bạc hà cảm giác dễ chịu và thư giãn",
      },
      topIds: ["grapefruit"],
      heartIds: ["peppermint", "grapefruit"],
      baseIds: ["rosemary-tea-tree", "peppermint"],
      allNoteIds: ["grapefruit", "peppermint", "rosemary-tea-tree"],
      desc: "Sự kết hợp hài hòa giữa tinh dầu Bưởi và Bạc Hà tạo nên một liệu pháp hương thơm lý tưởng, hỗ trợ cải thiện chất lượng giấc ngủ một cách tự nhiên và an toàn. Hương bưởi tươi mát giúp giải tỏa căng thẳng và làm dịu cảm...",
    },
    {
      title: "Tinh Dầu Khuếch Tán Giảm Stress MIYAKO HOME – Phục Hồi: Thảo Mộc",
      shortName: "Phục Hồi: Thảo Mộc",
      collection: "BST Tinh Dầu Giảm Stress – Trị Liệu",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-miyako-giam-stress-phuc-hoi/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/11/chai-nhua-300ml-2-800x800.jpg",
      priceRange: "589.000 ₫ – 1.520.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "589.000 ₫",
        },
        {
          capacity: "500ml",
          price: "859.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.520.000 ₫",
        },
      ],
      pyramid: {
        top: "Chanh, Bưởi",
        heart: "Hoa Nhài, Hoa Cam",
        base: "Gỗ đàn hương, Hương nhựa, Hương đất",
      },
      topIds: ["grapefruit", "amalfi-lemon"],
      heartIds: ["night-jasmine", "orange-blossom"],
      baseIds: ["sandalwood", "frankincense-labdanum"],
      allNoteIds: [
        "grapefruit",
        "amalfi-lemon",
        "night-jasmine",
        "orange-blossom",
        "sandalwood",
        "frankincense-labdanum",
        "rosemary-tea-tree",
      ],
      desc: "Chiết xuất từ những loại thảo mộc bản địa của rừng nhiệt đới, Phục Hồi là liệu pháp hương thơm lý tưởng giúp đánh thức sức sống tiềm ẩn trong bạn. Mùi hương mộc mạc, thanh mát nhưng sâu lắng này có khả năng xua tan cả...",
    },
    {
      title:
        "Tinh Dầu Khuếch Tán Giảm Stress MIYAKO HOME – Tập Trung: Hương Thảo",
      shortName: "Tập Trung: Hương Thảo",
      collection: "BST Tinh Dầu Giảm Stress – Trị Liệu",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-giam-stress-miyako-home-tap-trung-huong-thao/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/11/chai-nhua-300ml-2-800x800.jpg",
      priceRange: "589.000 ₫ – 1.520.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "589.000 ₫",
        },
        {
          capacity: "500ml",
          price: "859.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.520.000 ₫",
        },
      ],
      pyramid: {
        top: "Chanh",
        heart: "Hương thảo, Thảo mộc",
        base: "Hương gỗ, Hương nhựa",
      },
      topIds: ["amalfi-lemon"],
      heartIds: ["rosemary-tea-tree"],
      baseIds: ["guaiac-teak", "frankincense-labdanum"],
      allNoteIds: [
        "amalfi-lemon",
        "rosemary-tea-tree",
        "guaiac-teak",
        "frankincense-labdanum",
      ],
      desc: "Với hương thơm thanh mát, sắc sảo từ tinh dầu hương thảo kết hợp cùng cam chanh nhẹ nhàng, Tập Trung là “liều kích thích tự nhiên” giúp tăng cường sự tập trung, cải thiện trí nhớ và thúc đẩy tuần hoàn máu não. Đây là ...",
    },
    {
      title:
        "Tinh Dầu Khuếch Tán Giảm Stress MIYAKO HOME – Thanh Tịnh: Hoa Sen",
      shortName: "Thanh Tịnh: Hoa Sen",
      collection: "BST Tinh Dầu Giảm Stress – Trị Liệu",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-giam-stress-thanh-tinh/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/11/chai-nhua-300ml-2-800x800.jpg",
      priceRange: "589.000 ₫ – 1.520.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "589.000 ₫",
        },
        {
          capacity: "500ml",
          price: "859.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.520.000 ₫",
        },
      ],
      pyramid: {
        top: "Sương mai, Lá sen non",
        heart: "Hoa sen trắng thuần khiết",
        base: "Trà trắng, Xạ hương lụa",
      },
      topIds: ["white-lotus"],
      heartIds: ["white-lotus"],
      baseIds: ["white-tea", "white-musk"],
      allNoteIds: ["white-lotus", "white-tea", "white-musk"],
      desc: "Tinh dầu trị liệu Sen Trắng  nhẹ nhàng như một lời thì thầm từ chính trái tim – dịu dàng, thuần khiết và sâu sắc. Hương thơm này giúp điều hòa nhịp thở, làm dịu dòng suy nghĩ và đưa tâm trí trở về trạng thái tĩnh lặng...",
    },
    {
      title:
        "Tinh Dầu Khuếch Tán Giảm Stress MIYAKO HOME – Thư Giãn: Hoa Lan & Muối Biển",
      shortName: "Thư Giãn: Hoa Lan & Muối Biển",
      collection: "BST Tinh Dầu Giảm Stress – Trị Liệu",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-giam-stress-miyako-home-thu-gian-hoa-lan-muoi-bien/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/11/chai-nhua-300ml-2-800x800.jpg",
      priceRange: "789.000 ₫ – 2.180.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "789.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.210.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "2.180.000 ₫",
        },
      ],
      pyramid: {
        top: "Ozone",
        heart: "Muối Biển, Hoa Fresia, Lá xanh",
        base: "Hạt tonka, Xạ hương nhẹ, Hổ phách",
      },
      topIds: ["sea-salt-ozone"],
      heartIds: ["green-tea-bamboo", "sea-salt-ozone"],
      baseIds: ["golden-amber", "white-musk", "vanilla-tonka"],
      allNoteIds: [
        "sea-salt-ozone",
        "green-tea-bamboo",
        "golden-amber",
        "white-musk",
        "vanilla-tonka",
        "freesia-orchid",
      ],
      desc: "Tinh dầu trị liệu từ Muối Biển & Hoa Lan  giúp giảm căng thẳng, cải thiện tâm trạng và đưa bạn trở về với trạng thái thư thái nguyên bản. Đây là lựa chọn lý tưởng sau một ngày dài, hoặc mỗi khi bạn cần không gian để t...",
    },
    {
      title:
        "Tinh Dầu Khuếch Tán Giảm Stress MIYAKO HOME – Yên Bình: Vườn Hồng",
      shortName: "Yên Bình: Vườn Hồng",
      collection: "BST Tinh Dầu Giảm Stress – Trị Liệu",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-giam-stress-miyako-home-yen-binh-vuon-hong/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/11/chai-nhua-300ml-2-800x800.jpg",
      priceRange: "589.000 ₫ – 1.520.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "589.000 ₫",
        },
        {
          capacity: "500ml",
          price: "859.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.520.000 ₫",
        },
      ],
      pyramid: {
        top: "Lá non, Trái cây",
        heart: "Hoa hồng",
        base: "Hương gỗ, Hương nhựa",
      },
      topIds: ["green-tea-bamboo", "pear-berry-melon"],
      heartIds: ["damask-rose"],
      baseIds: ["guaiac-teak", "frankincense-labdanum"],
      allNoteIds: [
        "green-tea-bamboo",
        "pear-berry-melon",
        "damask-rose",
        "guaiac-teak",
        "frankincense-labdanum",
      ],
      desc: "Tựa như bước chân chạm khẽ vào khu vườn hoa hồng trắng giữa buổi sớm trong lành, hương thơm từ “Vườn Hồng” mang lại cảm giác thư giãn, tinh khôi và đầy mê hoặc. Không quá ngọt, không quá nồng, mùi hương dịu dàng kết h...",
    },
    {
      title: "Tinh Dầu Khuếch Tán Giảm Stress MIYAKO HOME – Yêu: Gỗ Tuyết Tùng",
      shortName: "Yêu: Gỗ Tuyết Tùng",
      collection: "BST Tinh Dầu Giảm Stress – Trị Liệu",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-giam-stress-miyako-home-yeu-go-tuyet-tung/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/11/chai-nhua-300ml-2-800x800.jpg",
      priceRange: "589.000 ₫ – 1.520.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "589.000 ₫",
        },
        {
          capacity: "500ml",
          price: "859.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.520.000 ₫",
        },
      ],
      pyramid: {
        top: "Thảo mộc thanh mát",
        heart: "Gỗ tuyết tùng",
        base: "Hương nhựa thơm",
      },
      topIds: ["rosemary-tea-tree"],
      heartIds: ["cedarwood"],
      baseIds: ["frankincense-labdanum"],
      allNoteIds: ["rosemary-tea-tree", "cedarwood", "frankincense-labdanum"],
      desc: "Tinh dầu trị liệu Gỗ Tuyết Tùng  mang trong mình sự vững chãi, trầm lắng – như một vòng tay dịu dàng ôm trọn những cảm xúc tổn thương. Hương thơm ấm áp, mộc mạc nhưng đầy chiều sâu này có khả năng xoa dịu tâm trí, làm...",
    },
    {
      title:
        "Tinh Dầu Khuếch Tán Giảm Stress MIYAKO HOME –Kết Nối: Gỗ CARIBBEAN",
      shortName: "Kết Nối: Gỗ CARIBBEAN",
      collection: "BST Tinh Dầu Giảm Stress – Trị Liệu",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-giam-stress-miyako-home-ket-noi-go-caribbean/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/11/chai-nhua-300ml-2-800x800.jpg",
      priceRange: "589.000 ₫ – 2.180.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "589.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.210.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "2.180.000 ₫",
        },
      ],
      pyramid: {
        top: "Da thuộc, Hạt tiêu",
        heart: "Gỗ teak, Lá thuốc lá, Đinh hương",
        base: "Gỗ đàn hương, Hạt tiêu, Hổ phách",
      },
      topIds: ["pink-pepper", "tobacco-leather"],
      heartIds: ["guaiac-teak", "tobacco-leather", "clove-cinnamon"],
      baseIds: ["sandalwood", "pink-pepper", "golden-amber"],
      allNoteIds: [
        "pink-pepper",
        "tobacco-leather",
        "guaiac-teak",
        "clove-cinnamon",
        "sandalwood",
        "golden-amber",
      ],
      desc: "Mang sắc thái mạnh mẽ và đầy chiều sâu, Gỗ Caribbean là sự hòa quyện tinh tế của các nốt hương trầm ấm và cay nồng – từ tiêu đen, lá thuốc lá, gỗ đàn hương cho đến patchouli và hổ phách. Đây không chỉ là một mùi hương...",
    },
    {
      title: "Tinh Dầu Khuếch Tán Miyako Home – Acqua di Gioia",
      shortName: "Acqua di Gioia",
      collection: "BST Tinh Dầu Hương Nước Hoa Cao Cấp",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-miyako-home-giola-hermes/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/11/chai-nhua-300ml-2-800x800.jpg",
      priceRange: "649.000 ₫ – 1.980.000 ₫",
      volumes: [
        {
          capacity: "250ml",
          price: "649.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.099.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.980.000 ₫",
        },
      ],
      pyramid: {
        top: "Chanh vàng Amalfi, Bạc hà",
        heart: "Hoa nhài, Hồng tiêu, Hoa mẫu đơn",
        base: "Gỗ tuyết tùng, Đường nâu",
      },
      topIds: ["peppermint", "amalfi-lemon"],
      heartIds: ["night-jasmine", "peony-lily", "pink-pepper"],
      baseIds: ["cedarwood", "vanilla-tonka"],
      allNoteIds: [
        "peppermint",
        "amalfi-lemon",
        "night-jasmine",
        "peony-lily",
        "pink-pepper",
        "cedarwood",
        "vanilla-tonka",
      ],
      desc: "Tinh dầu Acqua di Gioia là bản hoà ca giữa thiên nhiên tươi mới và cảm xúc an yên – mang đến cho bạn trải nghiệm như đang tận hưởng kỳ nghỉ tại một bãi biển xanh ngắt ở miền Nam nước Ý. Đây là mùi hương gợi cảm giác t...",
    },
    {
      title: "Tinh Dầu Khuếch Tán Miyako Home – Amber Nuit",
      shortName: "Amber Nuit",
      collection: "BST Tinh Dầu Hương Nước Hoa Cao Cấp",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-miyako-amber-nuit/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/11/chai-nhua-300ml-2-800x800.jpg",
      priceRange: "789.000 ₫ – 2.180.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "789.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.210.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "2.180.000 ₫",
        },
      ],
      pyramid: {
        top: "Cam Bergamot",
        heart: "Hoa hồng Damask, Tiêu hồng",
        base: "Đá hổ phách, Gỗ Guaiac, Tuyết tùng, Hoắc hương.",
      },
      topIds: ["bergamot"],
      heartIds: ["damask-rose", "pink-pepper"],
      baseIds: ["cedarwood", "guaiac-teak", "golden-amber", "patchouli"],
      allNoteIds: [
        "bergamot",
        "damask-rose",
        "pink-pepper",
        "cedarwood",
        "guaiac-teak",
        "golden-amber",
        "patchouli",
      ],
      desc: "Tinh Dầu Ambre Nuit là bản hoà âm đầy mê hoặc giữa sự dữ dội và dịu dàng – nơi vẻ đẹp mềm mại của hoa hồng Thổ Nhĩ Kỳ chạm vào nét hoang dã, sâu lắng của hổ phách phương Đông. Như một phiên bản thơm của Người đẹp và Q...",
    },
    {
      title: "Tinh Dầu Khuếch Tán Miyako Home – Armani Sisi",
      shortName: "Armani Sisi",
      collection: "BST Tinh Dầu Hương Nước Hoa Cao Cấp",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-miyako-sisi/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/11/chai-nhua-300ml-2-800x800.jpg",
      priceRange: "789.000 ₫ – 2.180.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "789.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.210.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "2.180.000 ₫",
        },
      ],
      pyramid: {
        top: "Lá cây lý chua đen",
        heart: "Hoa hồng, lan Nam Phi",
        base: "Vanilla, hoắc hương, ambroxan, hương gỗ",
      },
      topIds: ["pear-berry-melon"],
      heartIds: ["damask-rose", "freesia-orchid"],
      baseIds: ["guaiac-teak", "golden-amber", "vanilla-tonka", "patchouli"],
      allNoteIds: [
        "pear-berry-melon",
        "damask-rose",
        "freesia-orchid",
        "guaiac-teak",
        "golden-amber",
        "vanilla-tonka",
        "patchouli",
      ],
      desc: "Tinh Dầu Khuếch Tán Armani Sisi là mùi hương dành riêng cho những người phụ nữ hiện đại – tự do, bản lĩnh và luôn biết mình muốn gì. Không cần quá phô trương, Sisi vẫn thu hút một cách tự nhiên nhờ vào sự kết hợp hoàn...",
    },
    {
      title: "Tinh Dầu Khuếch Tán Miyako Home – Baccarat",
      shortName: "Baccarat",
      collection: "BST Tinh Dầu Hương Nước Hoa Cao Cấp",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-miyako-home-baccarat-rouge/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/11/chai-nhua-300ml-2-800x800.jpg",
      priceRange: "890.000 ₫ – 2.580.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "890.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.350.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "2.580.000 ₫",
        },
      ],
      pyramid: {
        top: "Hạnh nhân đắng, Nghệ tây",
        heart: "Hoa nhài Ai Cập, Gỗ tuyết tùng",
        base: "Xạ hương, Hương gỗ, Long diên hương",
      },
      topIds: ["saffron-almond"],
      heartIds: ["night-jasmine", "cedarwood"],
      baseIds: ["guaiac-teak", "golden-amber", "white-musk"],
      allNoteIds: [
        "saffron-almond",
        "night-jasmine",
        "cedarwood",
        "guaiac-teak",
        "golden-amber",
        "white-musk",
      ],
      desc: "Tinh Dầu Khuếch Tán Baccarat là mùi hương tinh tế và đầy lôi cuốn, mang lại cảm giác sang trọng và mạnh mẽ nhưng cũng đầy quyến rũ. Sự kết hợp hoàn hảo của những nốt hương độc đáo mang lại cảm giác mạnh mẽ nhưng vẫn g...",
    },
    {
      title: "Tinh dầu Khuếch Tán Miyako Home – Bạch Dương",
      shortName: "Bạch Dương",
      collection: "BST Tinh Dầu 12 Cung Hoàng Đạo",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-miyako-aries/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/01/bia-tinh-dau-khuech-tan-web-800x800.jpg",
      priceRange: "310.000 ₫ – 2.180.000 ₫",
      volumes: [
        {
          capacity: "20ml",
          price: "310.000 ₫",
        },
        {
          capacity: "50ml",
          price: "310.000 ₫",
        },
        {
          capacity: "100ml",
          price: "440.000 ₫",
        },
        {
          capacity: "200ml",
          price: "680.000 ₫",
        },
        {
          capacity: "300ml",
          price: "710.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.210.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "2.180.000 ₫",
        },
      ],
      pyramid: {
        top: "Cam Bergamot, quýt hồng, rượu rum, mật ong",
        heart: "Hoa nhài, hoa hồng, hoa phong lan",
        base: "Gỗ đàn hương, Vanilla",
      },
      topIds: ["bergamot", "sweet-orange"],
      heartIds: ["night-jasmine", "damask-rose"],
      baseIds: ["sandalwood", "vanilla-tonka"],
      allNoteIds: [
        "bergamot",
        "sweet-orange",
        "night-jasmine",
        "damask-rose",
        "sandalwood",
        "vanilla-tonka",
      ],
      desc: "Bạn là Bạch Dương – người tiên phong không ngừng tiến bước, mang trong mình nguồn năng lượng rực rỡ và tinh thần bất khuất. Luôn khát khao thử thách, bạn sống trọn vẹn với đam mê và sẵn sàng bứt phá mọi giới hạn. Với ...",
    },
    {
      title: "Tinh Dầu Khuếch Tán Miyako Home – Bảo Bình",
      shortName: "Bảo Bình",
      collection: "BST Tinh Dầu 12 Cung Hoàng Đạo",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-miyako-aquarius/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/01/bia-tinh-dau-khuech-tan-web-800x800.jpg",
      priceRange: "310.000 ₫ – 2.180.000 ₫",
      volumes: [
        {
          capacity: "20ml",
          price: "310.000 ₫",
        },
        {
          capacity: "50ml",
          price: "310.000 ₫",
        },
        {
          capacity: "100ml",
          price: "440.000 ₫",
        },
        {
          capacity: "200ml",
          price: "680.000 ₫",
        },
        {
          capacity: "300ml",
          price: "710.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.210.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "2.180.000 ₫",
        },
      ],
      pyramid: {
        top: "Muối, Hương Ozonic, Hương Nước, Sim và Cam Bergamot.",
        heart: "Hương Biển, Muối, Hoa Ngọc Lan Tây và Hoa Cam",
        base: "Long diên hương, Tảo, Xạ hương trắng, Rêu sồi và Hoắc hương",
      },
      topIds: ["bergamot", "sea-salt-ozone"],
      heartIds: ["orange-blossom", "sea-salt-ozone"],
      baseIds: ["vetiver-oakmoss", "golden-amber", "white-musk", "patchouli"],
      allNoteIds: [
        "bergamot",
        "sea-salt-ozone",
        "orange-blossom",
        "vetiver-oakmoss",
        "golden-amber",
        "white-musk",
        "patchouli",
      ],
      desc: "Bạn là một Bảo Bình – người luôn đi trước thời đại, yêu thích sự mới mẻ và chẳng ngại phá bỏ những khuôn khổ cũ. Với tư duy độc lập, tính cách giàu sáng tạo và cái nhìn khác biệt, bạn chính là nguồn cảm hứng cho những...",
    },
    {
      title: "Tinh Dầu Khuếch Tán Miyako Home – Black Poppy",
      shortName: "Black Poppy",
      collection: "BST Tinh Dầu Hương Nước Hoa Cao Cấp",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-miyako-black-poppy/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/11/chai-nhua-300ml-2-800x800.jpg",
      priceRange: "789.000 ₫ – 2.180.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "789.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.210.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "2.180.000 ₫",
        },
      ],
      pyramid: {
        top: "Hồng tiêu, Hoa cam, Quả lê",
        heart: "Cà phê, Hoa nhài, Hạnh nhân đắng, Cam thảo",
        base: "Vanilla, Hoắc hương, Gỗ tuyết tùng, Gỗ Cashmere",
      },
      topIds: ["orange-blossom", "pear-berry-melon", "pink-pepper"],
      heartIds: ["night-jasmine", "saffron-almond", "coffee-cacao"],
      baseIds: ["cedarwood", "vanilla-tonka", "cashmere-wood", "patchouli"],
      allNoteIds: [
        "orange-blossom",
        "pear-berry-melon",
        "pink-pepper",
        "night-jasmine",
        "saffron-almond",
        "coffee-cacao",
        "cedarwood",
        "vanilla-tonka",
        "cashmere-wood",
        "patchouli",
      ],
      desc: "Tinh Dầu Khuếch Tán Black Poppy mang trong mình tinh thần “rock chic” – đại diện cho những cô gái hiện đại, mạnh mẽ và không ngại khác biệt. Với sự kết hợp táo bạo giữa những nốt hương ngọt ngào, nồng nàn và sắc sảo. ...",
    },
    {
      title: "Tinh Dầu Khuếch Tán Miyako Home – Blue Bell",
      shortName: "Blue Bell",
      collection: "BST Tinh Dầu Hương Nước Hoa Cao Cấp",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-miyako-home-blue-bell/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/11/chai-nhua-300ml-2-800x800.jpg",
      priceRange: "729.000 ₫ – 1.980.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "729.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.099.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.980.000 ₫",
        },
      ],
      pyramid: {
        top: "Trà xanh",
        heart: "Quả việt quất, hoa huệ thung lũng, hoa nhài",
        base: "Xạ hương, hổ phách trắng",
      },
      topIds: ["green-tea-bamboo"],
      heartIds: ["night-jasmine", "peony-lily", "pear-berry-melon"],
      baseIds: ["golden-amber", "white-musk"],
      allNoteIds: [
        "green-tea-bamboo",
        "night-jasmine",
        "peony-lily",
        "pear-berry-melon",
        "golden-amber",
        "white-musk",
      ],
      desc: "Tinh Dầu Khuếch Tán Blue Bell mang đến một không gian thư giãn và dễ chịu, nơi mọi giác quan được vỗ về. Cảm giác an yên như buổi sáng trong vườn, ngọt ngào mà không hề nồng gắt, như một cái ôm nhẹ nhàng cuối ngày.",
    },
    {
      title: "Tinh dầu Khuếch Tán Miyako Home – Bọ Cạp",
      shortName: "Bọ Cạp",
      collection: "BST Tinh Dầu 12 Cung Hoàng Đạo",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-miyako-scorpius/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/01/bia-tinh-dau-khuech-tan-web-800x800.jpg",
      priceRange: "310.000 ₫ – 2.180.000 ₫",
      volumes: [
        {
          capacity: "20ml",
          price: "310.000 ₫",
        },
        {
          capacity: "50ml",
          price: "310.000 ₫",
        },
        {
          capacity: "100ml",
          price: "440.000 ₫",
        },
        {
          capacity: "200ml",
          price: "680.000 ₫",
        },
        {
          capacity: "300ml",
          price: "789.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.210.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "2.180.000 ₫",
        },
      ],
      pyramid: {
        top: "Cam néroli, hoa cam, quýt mandarine – khởi đầu đầy tươi mới nhưng không kém phần cuốn hút.",
        heart:
          "Hoa dành dành, hoa lan, hoa nhài – tầng hương hoa sang trọng, quyến rũ và nữ tính.",
        base: "Gỗ đàn hương, vani, xạ hương",
      },
      topIds: ["orange-blossom", "sweet-orange"],
      heartIds: ["night-jasmine", "freesia-orchid", "peony-lily"],
      baseIds: ["sandalwood", "white-musk", "vanilla-tonka"],
      allNoteIds: [
        "orange-blossom",
        "sweet-orange",
        "night-jasmine",
        "freesia-orchid",
        "peony-lily",
        "sandalwood",
        "white-musk",
        "vanilla-tonka",
      ],
      desc: "Bạn là một Bọ Cạp – đầy mê hoặc, mạnh mẽ và mang trong mình sức hút không thể lý giải. Ẩn sau vẻ ngoài điềm tĩnh là một tâm hồn đầy cảm xúc, mãnh liệt và trung thành tuyệt đối với những điều mình tin tưởng. Bạn không ...",
    },
    {
      title: "Tinh Dầu Khuếch Tán Miyako Home – Bvlgari Aqva",
      shortName: "Bvlgari Aqva",
      collection: "BST Tinh Dầu Hương Nước Hoa Cao Cấp",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-miyako-home-bvlgari-aqva/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/11/chai-nhua-300ml-2-800x800.jpg",
      priceRange: "729.000 ₫ – 1.980.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "729.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.099.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.980.000 ₫",
        },
      ],
      pyramid: {
        top: "Cam Mandarin, Quả cam và Tinh dầu lá chanh",
        heart: "Rong biển, Hoa oải hương và Hoa bông vải",
        base: "Gỗ tuyết tùng Virginia, Hương gỗ, Cây hoắc hương, Cây xô thơm và Hổ phách",
      },
      topIds: ["sweet-orange", "amalfi-lemon"],
      heartIds: ["peony-lily", "lavender", "sea-salt-ozone"],
      baseIds: [
        "cedarwood",
        "guaiac-teak",
        "rosemary-tea-tree",
        "golden-amber",
        "patchouli",
      ],
      allNoteIds: [
        "sweet-orange",
        "amalfi-lemon",
        "peony-lily",
        "lavender",
        "sea-salt-ozone",
        "cedarwood",
        "guaiac-teak",
        "rosemary-tea-tree",
        "golden-amber",
        "patchouli",
      ],
      desc: "Lấy cảm hứng từ đại dương, Tinh Dầu Khuếch Tán Bvlgari Aqva mang đến cảm giác sảng khoái, tươi mới như làn gió biển đầu hè. Mùi hương mở ra sự tự do, mạnh mẽ và đầy năng lượng – như chính người đàn ông hiện đại: yêu t...",
    },
    {
      title: "Tinh Dầu Khuếch Tán Miyako Home – Choloé Love Story",
      shortName: "Chloé Love Story",
      collection: "BST Tinh Dầu Hương Nước Hoa Cao Cấp",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-miyako-love-story/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/11/chai-nhua-300ml-2-800x800.jpg",
      priceRange: "890.000 ₫ – 2.580.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "890.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.350.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "2.580.000 ₫",
        },
      ],
      pyramid: {
        top: "Hoa cam Neroli, Quả lê, Cam Bergamot, Bưởi, Chanh vàng",
        heart: "Hoa cam, Hoa nhài, Hoa hồng, Đào, Lý chua đen",
        base: "Xạ hương, Gỗ tuyết tùng, Gỗ Cashmere, Hoắc hương",
      },
      topIds: [
        "orange-blossom",
        "bergamot",
        "grapefruit",
        "amalfi-lemon",
        "pear-berry-melon",
      ],
      heartIds: [
        "night-jasmine",
        "damask-rose",
        "orange-blossom",
        "pear-berry-melon",
      ],
      baseIds: ["cedarwood", "white-musk", "cashmere-wood", "patchouli"],
      allNoteIds: [
        "orange-blossom",
        "bergamot",
        "grapefruit",
        "amalfi-lemon",
        "pear-berry-melon",
        "night-jasmine",
        "damask-rose",
        "cedarwood",
        "white-musk",
        "cashmere-wood",
        "patchouli",
      ],
      desc: "Tinh Dầu Khuếch Tán Chloé Love Story là tinh dầu dành cho những tâm hồn nhẹ nhàng, bay bổng và yêu sự lãng mạn. Mang tinh thần của một chuyện tình dưới ánh đèn Paris, Love Story gợi nhớ đến những khoảnh khắc ngọt ngào...",
    },
    {
      title: "Tinh Dầu Khuếch Tán Miyako Home – Cool Water",
      shortName: "Cool Water",
      collection: "BST Tinh Dầu Hương Nước Hoa Cao Cấp",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-miyako-home-cool-water-hermes/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/11/chai-nhua-300ml-2-800x800.jpg",
      priceRange: "299.000 ₫ – 1.980.000 ₫",
      volumes: [
        {
          capacity: "100ml",
          price: "299.000 ₫",
        },
        {
          capacity: "300ml",
          price: "729.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.099.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.980.000 ₫",
        },
      ],
      pyramid: {
        top: "Hoa sen, Oải hương",
        heart: "Rêu, Phong lữ, Gỗ đàn hương",
        base: "Xạ hương, Gỗ tuyết tùng, Long diên hương, Bạch đàn khấu",
      },
      topIds: ["white-lotus", "lavender"],
      heartIds: ["peony-lily", "sandalwood"],
      baseIds: ["cedarwood", "golden-amber", "white-musk"],
      allNoteIds: [
        "white-lotus",
        "lavender",
        "peony-lily",
        "sandalwood",
        "cedarwood",
        "golden-amber",
        "white-musk",
      ],
      desc: "Tinh Dầu Khuếch Tán Cool Water là tinh dầu lý tưởng cho những ngày hè nắng nóng – mát lạnh như làn nước đầu mùa, trong trẻo và dịu nhẹ như làn gió biển thổi qua tâm hồn. Mùi hương này mang lại cảm giác thư giãn, dễ ch...",
    },
    {
      title: "Tinh Dầu Khuếch Tán Miyako Home – Cự Giải",
      shortName: "Cự Giải",
      collection: "BST Tinh Dầu 12 Cung Hoàng Đạo",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-miyako-home-cu-giai/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/12/chai-nhua-300ml-800x800.jpg",
      priceRange: "310.000 ₫ – 2.180.000 ₫",
      volumes: [
        {
          capacity: "20ml",
          price: "310.000 ₫",
        },
        {
          capacity: "50ml",
          price: "310.000 ₫",
        },
        {
          capacity: "100ml",
          price: "440.000 ₫",
        },
        {
          capacity: "200ml",
          price: "680.000 ₫",
        },
        {
          capacity: "300ml",
          price: "789.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.210.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "2.180.000 ₫",
        },
      ],
      pyramid: {
        top: "Cam Bergamot, Chanh",
        heart: "Quả hồi, Hoa Olive, Gỗ Cualiac",
        base: "Đậu Tonka",
      },
      topIds: ["bergamot", "amalfi-lemon"],
      heartIds: [],
      baseIds: ["vanilla-tonka"],
      allNoteIds: ["bergamot", "amalfi-lemon", "vanilla-tonka"],
      desc: "Tinh Dầu Khuếch Tán Cự Giải , Bạn là người thuộc cung Cự Giải, nhạy cảm và tràn đầy tình cảm, luôn yêu thương gia đình và những người xung quanh.",
    },
    {
      title: "Tinh Dầu Khuếch Tán Miyako Home – Homme A La Rose",
      shortName: "Homme A La Rose",
      collection: "BST Tinh Dầu Hương Nước Hoa Cao Cấp",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-miyako-homme-a-la-rose/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/12/chai-nhua-300ml-800x800.jpg",
      priceRange: "789.000 ₫ – 2.180.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "789.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.210.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "2.180.000 ₫",
        },
      ],
      pyramid: {
        top: "Hồng tiêu, Quả bưởi",
        heart: "Hoa hồng tháng Năm, Hoa hồng Damask",
        base: "Gỗ hổ phách, Labdanum Tây Ban Nha, Cây xô thơm",
      },
      topIds: ["grapefruit", "pink-pepper"],
      heartIds: ["damask-rose"],
      baseIds: ["rosemary-tea-tree", "golden-amber", "frankincense-labdanum"],
      allNoteIds: [
        "grapefruit",
        "pink-pepper",
        "damask-rose",
        "rosemary-tea-tree",
        "golden-amber",
        "frankincense-labdanum",
      ],
      desc: "Tinh Dầu Khuếch Tán Homme A La Rose là tinh dầu mang đến một định nghĩa mới cho mùi hương nam tính – tinh tế, khác biệt và đầy bản lĩnh. Không quá ồn ào, không cần phải gồng mình mạnh mẽ, chỉ với hoa hồng và một chút ...",
    },
    {
      title: "Tinh Dầu Khuếch Tán Miyako Home – Kim Ngưu",
      shortName: "Kim Ngưu",
      collection: "BST Tinh Dầu 12 Cung Hoàng Đạo",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-miyako-home-kim-nguu/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/12/chai-nhua-300ml-1536x1536-1.jpg",
      priceRange: "280.000 ₫ – 1.980.000 ₫",
      volumes: [
        {
          capacity: "50ml",
          price: "280.000 ₫",
        },
        {
          capacity: "20ml",
          price: "299.000 ₫",
        },
        {
          capacity: "100ml",
          price: "400.000 ₫",
        },
        {
          capacity: "200ml",
          price: "620.000 ₫",
        },
        {
          capacity: "300ml",
          price: "729.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.099.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.980.000 ₫",
        },
      ],
      pyramid: {
        top: "Cam Bergamot, Lavender",
        heart: "Caumarin, Rêu cây sồi, Táo đỏ",
        base: "Gỗ đàn hương, Đậu Tonka",
      },
      topIds: ["bergamot"],
      heartIds: [],
      baseIds: ["sandalwood", "vanilla-tonka"],
      allNoteIds: ["bergamot", "sandalwood", "vanilla-tonka"],
      desc: "Tinh Dầu Khuếch Tán Kim Ngưu , bạn thuộc cung Kim Ngưu – người luôn trân trọng sự ổn định và biết tận hưởng từng khoảnh khắc bình yên trong cuộc sống.",
    },
    {
      title: "Tinh Dầu Khuếch Tán Miyako Home – L’ombre des Merveilles",
      shortName: "L’ombre des Merveilles",
      collection: "BST Tinh Dầu Hương Nước Hoa Cao Cấp",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-miyako-home-merveilles-hermes/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/12/chai-nhua-300ml-1536x1536-1.jpg",
      priceRange: "729.000 ₫ – 1.980.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "729.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.099.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.980.000 ₫",
        },
      ],
      pyramid: {
        top: "Trà đen",
        heart: "Khói trầm hương",
        base: "Đậu Tonka",
      },
      topIds: ["white-tea"],
      heartIds: ["agarwood"],
      baseIds: ["vanilla-tonka"],
      allNoteIds: ["white-tea", "agarwood", "vanilla-tonka"],
      desc: "Tinh Dầu Khuếch Tán L’Ombre Des Merveilles là tinh dầu mang đến cảm giác như lạc bước giữa màn đêm lấp lánh – nơi có trà đen nồng nàn, khói trầm ấm áp và đậu Tonka dịu ngọt len lỏi vào từng giác quan. Không dành cho s...",
    },
    {
      title: "Tinh Dầu Khuếch Tán Miyako Home – LV Moon",
      shortName: "LV Moon",
      collection: "BST Tinh Dầu Hương Nước Hoa Cao Cấp",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-miyako-home-lv-moon/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/11/chai-nhua-300ml-1536x1536-1.jpg",
      priceRange: "810.000 ₫ – 3.290.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "810.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.620.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "3.290.000 ₫",
        },
      ],
      pyramid: {
        top: "Sả, chanh",
        heart: "Trà trắng Nam Mỹ",
        base: "Cam Bergamot, Xương rồng",
      },
      topIds: ["lemongrass", "amalfi-lemon"],
      heartIds: ["white-tea"],
      baseIds: ["green-tea-bamboo", "bergamot"],
      allNoteIds: [
        "lemongrass",
        "amalfi-lemon",
        "white-tea",
        "green-tea-bamboo",
        "bergamot",
      ],
      desc: "Tinh Dầu Khuếch Tán LV Moon gợi liên tưởng đến những nhánh xương rồng nơi hoang mạc – bên ngoài gai góc nhưng bên trong lại ẩn chứa sự mềm mại, thanh tao. Hương sả chanh mở đầu đầy sảng khoái, tiếp nối bằng trà trắng ...",
    },
    {
      title: "Tinh Dầu Khuếch Tán Miyako Home – Ma Kết",
      shortName: "Ma Kết",
      collection: "BST Tinh Dầu 12 Cung Hoàng Đạo",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-miyako-home-ma-ket/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/12/chai-nhua-300ml-1536x1536-1.jpg",
      priceRange: "280.000 ₫ – 1.980.000 ₫",
      volumes: [
        {
          capacity: "50ml",
          price: "280.000 ₫",
        },
        {
          capacity: "20ml",
          price: "299.000 ₫",
        },
        {
          capacity: "100ml",
          price: "400.000 ₫",
        },
        {
          capacity: "200ml",
          price: "620.000 ₫",
        },
        {
          capacity: "300ml",
          price: "729.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.099.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.980.000 ₫",
        },
      ],
      pyramid: {
        top: "Cam quýt, Lavender, Quả lý đen",
        heart: "Hoa nhài, Hoa cam, Hoa lavender",
        base: "Vanilla, Gỗ tuyết tùng",
      },
      topIds: ["sweet-orange"],
      heartIds: ["night-jasmine", "orange-blossom"],
      baseIds: ["cedarwood", "vanilla-tonka"],
      allNoteIds: [
        "sweet-orange",
        "night-jasmine",
        "orange-blossom",
        "cedarwood",
        "vanilla-tonka",
      ],
      desc: "Tinh Dầu Khuếch Tán Ma Kết , bạn là người thuộc cung Ma Kết, nổi bật với sự kiên định, thực tế và đầy tham vọng. Bạn luôn đặt ra những mục tiêu cao và làm việc chăm chỉ để đạt được những gì mình mong muốn.",
    },
    {
      title: "Tinh Dầu Khuếch Tán Miyako Home – MJacobs Perfect",
      shortName: "MJacobs Perfect",
      collection: "BST Tinh Dầu Hương Nước Hoa Cao Cấp",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-miyako-perfect/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/12/chai-nhua-300ml-1536x1536-1.jpg",
      priceRange: "890.000 ₫ – 2.580.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "890.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.350.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "2.580.000 ₫",
        },
      ],
      pyramid: {
        top: "Đại hoàng, Hoa thuỷ tiên",
        heart: "Sữa hạnh nhân",
        base: "Gỗ tuyết tùng, Cashmer",
      },
      topIds: ["pear-berry-melon"],
      heartIds: ["saffron-almond"],
      baseIds: ["cedarwood"],
      allNoteIds: ["pear-berry-melon", "saffron-almond", "cedarwood"],
      desc: "Tinh Dầu Khuếch Tán MJacobs Perfect không tìm cách định nghĩa sự hoàn hảo bằng sự chỉn chu hay rực rỡ, mà bằng cảm xúc: mượt mà, bất ngờ, tươi mới – và đúng như tên gọi, là hoàn hảo theo một cách rất riêng. Mùi hương ...",
    },
    {
      title: "Tinh Dầu Khuếch Tán Miyako Home – Nhân Mã",
      shortName: "Nhân Mã",
      collection: "BST Tinh Dầu 12 Cung Hoàng Đạo",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-miyako-home-nhan-ma/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/12/chai-nhua-300ml-1536x1536-1.jpg",
      priceRange: "280.000 ₫ – 1.980.000 ₫",
      volumes: [
        {
          capacity: "50ml",
          price: "280.000 ₫",
        },
        {
          capacity: "20ml",
          price: "299.000 ₫",
        },
        {
          capacity: "100ml",
          price: "400.000 ₫",
        },
        {
          capacity: "200ml",
          price: "620.000 ₫",
        },
        {
          capacity: "300ml",
          price: "729.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.099.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.980.000 ₫",
        },
      ],
      pyramid: {
        top: "Cam Bergamot, Hồng tiêu, Hạt hồ trăn",
        heart: "Hoa nhài, Hoa huệ trắng, Ngọc lan tây",
        base: "Dừa, Hổ phách, Đậu Tonka",
      },
      topIds: ["bergamot", "pink-pepper"],
      heartIds: ["night-jasmine", "peony-lily"],
      baseIds: ["golden-amber", "vanilla-tonka"],
      allNoteIds: [
        "bergamot",
        "pink-pepper",
        "night-jasmine",
        "peony-lily",
        "golden-amber",
        "vanilla-tonka",
      ],
      desc: "Tinh Dầu Khuếch Tán Nhân Mã , bạn thuộc cung Nhân Mã, những người yêu thích tự do, khám phá và phiêu lưu.",
    },
    {
      title: "Tinh Dầu Khuếch Tán Miyako Home – Omnia Bvlgari",
      shortName: "Omnia Bvlgari",
      collection: "BST Tinh Dầu Hương Nước Hoa Cao Cấp",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-miyako-home-omina-crystal-hermes/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/12/chai-nhua-300ml-1536x1536-1.jpg",
      priceRange: "729.000 ₫ – 1.980.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "729.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.099.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.980.000 ₫",
        },
      ],
      pyramid: {
        top: "Trúc, Quả Lê",
        heart: "Hoa Sen, Trà, Cassia",
        base: "Xạ hương, Rêu sồi, Gỗ Balsa",
      },
      topIds: ["green-tea-bamboo", "pear-berry-melon"],
      heartIds: ["white-lotus"],
      baseIds: ["guaiac-teak", "vetiver-oakmoss", "white-musk"],
      allNoteIds: [
        "green-tea-bamboo",
        "pear-berry-melon",
        "white-lotus",
        "guaiac-teak",
        "vetiver-oakmoss",
        "white-musk",
      ],
      desc: "Dưới ánh nắng ban mai, Tinh Dầu Khuếch Tán Omnia Bvlgari  tỏa ra hương thơm trong trẻo và thuần khiết như giọt sương đầu ngày – nhẹ nhàng, tinh tế nhưng đủ để chạm đến cảm xúc. Lấy cảm hứng từ vẻ đẹp mong manh của pha...",
    },
    {
      title: "Tinh Dầu Khuếch Tán Miyako Home – Rose 31",
      shortName: "Rose 31",
      collection: "BST Tinh Dầu Hương Nước Hoa Cao Cấp",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-miyako-home-rose-31/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/12/chai-nhua-300ml-1536x1536-1.jpg",
      priceRange: "729.000 ₫ – 1.980.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "729.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.099.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.980.000 ₫",
        },
      ],
      pyramid: {
        top: "Hoa hồng, Thì là (Ai Cập)",
        heart: "Hoa hồng, Cỏ hương bài, Gỗ tuyết tùng",
        base: "Xạ hương, Gỗ guaiac, Nhũ hương, Labdanum, Trầm hương",
      },
      topIds: ["damask-rose", "cardamom-cumin"],
      heartIds: ["damask-rose", "cedarwood", "vetiver-oakmoss"],
      baseIds: [
        "agarwood",
        "guaiac-teak",
        "white-musk",
        "frankincense-labdanum",
      ],
      allNoteIds: [
        "damask-rose",
        "cardamom-cumin",
        "cedarwood",
        "vetiver-oakmoss",
        "agarwood",
        "guaiac-teak",
        "white-musk",
        "frankincense-labdanum",
      ],
      desc: "Tinh Dầu Khuếch Tán Rose 31 là minh chứng rõ ràng rằng hoa hồng không chỉ dành cho sự nữ tính. Đây là mùi hương cho những tâm hồn cá tính, yêu thích sự bí ẩn, gợi cảm và khác biệt – một mùi hương “phi giới tính” đúng ...",
    },
    {
      title: "Tinh Dầu Khuếch Tán Miyako Home – Song Ngư",
      shortName: "Song Ngư",
      collection: "BST Tinh Dầu 12 Cung Hoàng Đạo",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-miyako-pisces/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/01/bia-tinh-dau-khuech-tan-web-800x800.jpg",
      priceRange: "310.000 ₫ – 2.180.000 ₫",
      volumes: [
        {
          capacity: "20ml",
          price: "310.000 ₫",
        },
        {
          capacity: "50ml",
          price: "310.000 ₫",
        },
        {
          capacity: "100ml",
          price: "329.000 ₫",
        },
        {
          capacity: "200ml",
          price: "680.000 ₫",
        },
        {
          capacity: "300ml",
          price: "789.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.210.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "2.180.000 ₫",
        },
      ],
      pyramid: {
        top: "Bergamot, chanh, cam",
        heart: "Hoa oải hương",
        base: "Gỗ tuyết tùng, xạ hương",
      },
      topIds: ["bergamot", "amalfi-lemon"],
      heartIds: ["lavender"],
      baseIds: ["cedarwood", "white-musk"],
      allNoteIds: [
        "bergamot",
        "amalfi-lemon",
        "lavender",
        "cedarwood",
        "white-musk",
      ],
      desc: "Bạn là Song Ngư – người sống theo cảm xúc, mang tâm hồn bay bổng và trái tim đầy yêu thương. Với khả năng thấu cảm và trí tưởng tượng phong phú, bạn luôn biết cách lan tỏa sự dịu dàng, nhẹ nhàng đến mọi người xung qua...",
    },
    {
      title: "Tinh Dầu Khuếch Tán Miyako Home – Song Tử",
      shortName: "Song Tử",
      collection: "BST Tinh Dầu 12 Cung Hoàng Đạo",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-miyako-home-song-tu/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/12/chai-nhua-300ml-800x800.jpg",
      priceRange: "310.000 ₫ – 2.180.000 ₫",
      volumes: [
        {
          capacity: "20ml",
          price: "310.000 ₫",
        },
        {
          capacity: "50ml",
          price: "310.000 ₫",
        },
        {
          capacity: "100ml",
          price: "440.000 ₫",
        },
        {
          capacity: "200ml",
          price: "680.000 ₫",
        },
        {
          capacity: "300ml",
          price: "789.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.210.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "2.180.000 ₫",
        },
      ],
      pyramid: {
        top: "Hạnh nhân, Cà phê",
        heart: "Hoà nhài Sambac, Hoa huệ trắng",
        base: "Đậu Tonka, Cocoa",
      },
      topIds: ["saffron-almond", "coffee-cacao"],
      heartIds: ["night-jasmine", "peony-lily"],
      baseIds: ["vanilla-tonka"],
      allNoteIds: [
        "saffron-almond",
        "coffee-cacao",
        "night-jasmine",
        "peony-lily",
        "vanilla-tonka",
      ],
      desc: "Tinh Dầu Khuếch Tán Song Tử , Bạn là người thuộc cung Song Tử, nổi bật với sự linh hoạt, thông minh và đa dạng trong tính cách.",
    },
    {
      title: "Tinh Dầu Khuếch Tán Miyako Home – Sư Tử",
      shortName: "Sư Tử",
      collection: "BST Tinh Dầu 12 Cung Hoàng Đạo",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-miyako-leo/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/01/bia-tinh-dau-khuech-tan-web-800x800.jpg",
      priceRange: "280.000 ₫ – 1.980.000 ₫",
      volumes: [
        {
          capacity: "50ml",
          price: "280.000 ₫",
        },
        {
          capacity: "20ml",
          price: "299.000 ₫",
        },
        {
          capacity: "100ml",
          price: "400.000 ₫",
        },
        {
          capacity: "200ml",
          price: "620.000 ₫",
        },
        {
          capacity: "300ml",
          price: "729.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.099.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.980.000 ₫",
        },
      ],
      pyramid: {
        top: "Cam quýt, hoa cam",
        heart: "Hoa mộc lan, hoa nhài",
        base: "Hoắc hương, xạ hương, vani Tahitian",
      },
      topIds: ["orange-blossom", "sweet-orange"],
      heartIds: ["night-jasmine"],
      baseIds: ["white-musk", "vanilla-tonka", "patchouli"],
      allNoteIds: [
        "orange-blossom",
        "sweet-orange",
        "night-jasmine",
        "white-musk",
        "vanilla-tonka",
        "patchouli",
      ],
      desc: "Sư Tử là biểu tượng của quyền lực, sự tự tin và niềm đam mê sống mãnh liệt. Bạn luôn biết cách để nổi bật giữa đám đông, sở hữu sức hút tự nhiên và phong thái của một nhà lãnh đạo bẩm sinh. Với trái tim nhiệt thành và...",
    },
    {
      title: "Tinh Dầu Khuếch Tán Miyako Home – Thiên Bình",
      shortName: "Thiên Bình",
      collection: "BST Tinh Dầu 12 Cung Hoàng Đạo",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-miyako-home-thien-binh/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/12/chai-nhua-500ml-1-800x800.jpg",
      priceRange: "330.000 ₫ – 2.980.000 ₫",
      volumes: [
        {
          capacity: "20ml",
          price: "330.000 ₫",
        },
        {
          capacity: "50ml",
          price: "340.000 ₫",
        },
        {
          capacity: "100ml",
          price: "460.000 ₫",
        },
        {
          capacity: "200ml",
          price: "740.000 ₫",
        },
        {
          capacity: "300ml",
          price: "1.090.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.650.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "2.980.000 ₫",
        },
      ],
      pyramid: {
        top: "Bạch đậu khấu, Hoa violet",
        heart: "Gỗ đàn hương, Gỗ tuyết tùng",
        base: "Xạ hương, Da thuộc, Hổ phách",
      },
      topIds: ["cardamom-cumin"],
      heartIds: ["sandalwood", "cedarwood"],
      baseIds: ["tobacco-leather", "golden-amber", "white-musk"],
      allNoteIds: [
        "cardamom-cumin",
        "sandalwood",
        "cedarwood",
        "tobacco-leather",
        "golden-amber",
        "white-musk",
      ],
      desc: "Tinh Dầu Khuếch Tán Thiên Bình , bạn thuộc cung Thiên Bình , nổi bật với sự hòa đồng, duyên dáng và khả năng giao tiếp tinh tế. Bạn luôn tìm kiếm sự cân bằng và hài hòa trong mọi khía cạnh của cuộc sống, đồng thời lan...",
    },
    {
      title: "Tinh dầu Khuếch Tán Miyako Home – Xử Nữ",
      shortName: "Xử Nữ",
      collection: "BST Tinh Dầu 12 Cung Hoàng Đạo",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-miyako-virgo/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/01/bia-tinh-dau-khuech-tan-web-800x800.jpg",
      priceRange: "280.000 ₫ – 1.980.000 ₫",
      volumes: [
        {
          capacity: "50ml",
          price: "280.000 ₫",
        },
        {
          capacity: "20ml",
          price: "299.000 ₫",
        },
        {
          capacity: "100ml",
          price: "400.000 ₫",
        },
        {
          capacity: "200ml",
          price: "620.000 ₫",
        },
        {
          capacity: "300ml",
          price: "729.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.099.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.980.000 ₫",
        },
      ],
      pyramid: {
        top: "Hoa tiêu, hoa cam, quả lê",
        heart: "Cà phê, hạnh nhân, hoa lài, cam thảo",
        base: "Vanilla, hoắc hương, gỗ tuyết tùng, gỗ cashmere",
      },
      topIds: ["orange-blossom", "pear-berry-melon"],
      heartIds: ["saffron-almond", "coffee-cacao"],
      baseIds: ["cedarwood", "vanilla-tonka", "cashmere-wood", "patchouli"],
      allNoteIds: [
        "orange-blossom",
        "pear-berry-melon",
        "saffron-almond",
        "coffee-cacao",
        "cedarwood",
        "vanilla-tonka",
        "cashmere-wood",
        "patchouli",
      ],
      desc: "Chỉn chu – Thanh lịch – Tinh tế đến từng chi tiết",
    },
    {
      title: "Tinh Dầu Khuếch Tán Thiên Nhiên MIYAKO HOME – Bạc Hà",
      shortName: "Bạc Hà",
      collection: "BST Tinh Dầu Hương Thiên Nhiên",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-thien-nhien-miyako-home-bac-ha/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/12/chai-nhua-300ml-1536x1536-1.jpg",
      priceRange: "729.000 ₫ – 1.980.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "729.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.099.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.980.000 ₫",
        },
      ],
      pyramid: {
        top: "Lá bạc hà tươi nguyên chất",
        heart: "Bạc hà, Thảo mộc thanh mát",
        base: "Hương gỗ nhẹ",
      },
      topIds: ["peppermint"],
      heartIds: ["rosemary-tea-tree", "peppermint"],
      baseIds: ["guaiac-teak"],
      allNoteIds: ["peppermint", "rosemary-tea-tree", "guaiac-teak"],
      desc: "Mang đến làn hương the mát, tươi mới và đầy năng lượng, tinh dầu Bạc Hà là lựa chọn tuyệt vời để khơi dậy tinh thần, làm mới không gian và nâng cao sự tập trung. Chỉ vài giọt khuếch tán là đủ để xua tan cảm giác uể oả...",
    },
    {
      title: "Tinh Dầu Khuếch Tán Thiên Nhiên MIYAKO HOME – Cam Trong",
      shortName: "Cam Trong",
      collection: "BST Tinh Dầu Hương Thiên Nhiên",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-thien-nhien-miyako-home-cam-trong/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/12/chai-nhua-300ml-1536x1536-1.jpg",
      priceRange: "589.000 ₫ – 1.520.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "589.000 ₫",
        },
        {
          capacity: "500ml",
          price: "859.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.520.000 ₫",
        },
      ],
      pyramid: {
        top: "Vỏ cam ngọt, Quýt tươi",
        heart: "Hoa cam, Tinh dầu cam nguyên chất",
        base: "Hương gỗ ấm",
      },
      topIds: ["sweet-orange"],
      heartIds: ["orange-blossom"],
      baseIds: ["guaiac-teak"],
      allNoteIds: ["sweet-orange", "orange-blossom", "guaiac-teak"],
      desc: "Tinh Dầu Cam Trong – Tươi mới & Tràn đầy sức sống",
    },
    {
      title: "Tinh Dầu Khuếch Tán Thiên Nhiên MIYAKO HOME – Cherry",
      shortName: "Cherry",
      collection: "BST Tinh Dầu Hương Thiên Nhiên",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-thien-nhien-miyako-home-cherry/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/12/chai-nhua-300ml-1536x1536-1.jpg",
      priceRange: "589.000 ₫ – 1.520.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "589.000 ₫",
        },
        {
          capacity: "500ml",
          price: "859.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.520.000 ₫",
        },
      ],
      pyramid: {
        top: "Quả anh đào (Cherry) chín mọng",
        heart: "Hoa hồng, Trái cây ngọt ngào",
        base: "Vanilla, Xạ hương trắng",
      },
      topIds: ["pear-berry-melon"],
      heartIds: ["damask-rose", "pear-berry-melon"],
      baseIds: ["white-musk", "vanilla-tonka"],
      allNoteIds: [
        "pear-berry-melon",
        "damask-rose",
        "white-musk",
        "vanilla-tonka",
      ],
      desc: "Tinh dầu thiên nhiên Cherry  còn có tác dụng nâng cao tinh thần, kích thích sự sáng tạo và cảm hứng trong công việc. Khuếch tán vài giọt trong không gian sống sẽ giúp bạn cảm thấy tràn đầy năng lượng, nâng cao hiệu su...",
    },
    {
      title: "Tinh Dầu Khuếch Tán Thiên Nhiên MIYAKO HOME – Hoa Nhài",
      shortName: "Hoa Nhài",
      collection: "BST Tinh Dầu Hương Thiên Nhiên",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-thien-nhien-miyako-home-hoa-nhai/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/12/chai-nhua-300ml-1536x1536-1.jpg",
      priceRange: "589.000 ₫ – 1.520.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "589.000 ₫",
        },
        {
          capacity: "500ml",
          price: "859.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.520.000 ₫",
        },
      ],
      pyramid: {
        top: "Lá xanh, Sương sớm",
        heart: "Hoa nhài trắng nguyên chất",
        base: "Xạ hương, Trà trắng",
      },
      topIds: ["green-tea-bamboo"],
      heartIds: ["night-jasmine"],
      baseIds: ["white-tea", "white-musk"],
      allNoteIds: [
        "green-tea-bamboo",
        "night-jasmine",
        "white-tea",
        "white-musk",
      ],
      desc: "Hãy dịu dàng chăm sóc và nâng niu đứa trẻ bên trong bạn với hương hoa nhài – loài hoa chỉ nở vào ban đêm, mang vẻ đẹp lãng mạn và ngọt ngào.  Tinh dầu thiên nhiên Hoa Nhài  lan tỏa hương thơm thanh khiết, nhẹ nhàng nh...",
    },
    {
      title: "Tinh Dầu Khuếch Tán Thiên Nhiên MIYAKO HOME – Long Não",
      shortName: "Long Não",
      collection: "BST Tinh Dầu Hương Thiên Nhiên",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-thien-nhien-huong-long-nao/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/11/chai-nhua-300ml-1536x1536-1.jpg",
      priceRange: "589.000 ₫ – 1.520.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "589.000 ₫",
        },
        {
          capacity: "500ml",
          price: "859.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.520.000 ₫",
        },
      ],
      pyramid: {
        top: "Lá khuynh diệp, Bạc hà",
        heart: "Gỗ long não, Tràm trà",
        base: "Gỗ thông, Hương gỗ trầm",
      },
      topIds: ["peppermint"],
      heartIds: ["rosemary-tea-tree"],
      baseIds: ["agarwood", "pine-wood", "guaiac-teak"],
      allNoteIds: [
        "peppermint",
        "rosemary-tea-tree",
        "agarwood",
        "pine-wood",
        "guaiac-teak",
      ],
      desc: "Tinh dầu thiên nhiên Long Não  nổi bật với hương thơm tươi mát, thanh nhẹ pha chút cay nhẹ đặc trưng, mang đến cảm giác dễ chịu và sảng khoái. Mùi hương này giúp làm dịu tinh thần, đồng thời kích thích sự tỉnh táo và ...",
    },
    {
      title: "Tinh Dầu Khuếch Tán Thiên Nhiên MIYAKO HOME – Sả Chanh",
      shortName: "Sả Chanh",
      collection: "BST Tinh Dầu Hương Thiên Nhiên",
      url: "https://vietbeauties.vn/san-pham/thien-nhien-sa-chanh/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/11/chai-nhua-300ml-1536x1536-1.jpg",
      priceRange: "649.000 ₫ – 1.980.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "649.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.099.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.980.000 ₫",
        },
      ],
      pyramid: {
        top: "Chanh tươi, Vỏ bưởi",
        heart: "Sả chanh nguyên chất, Thảo mộc",
        base: "Gỗ tuyết tùng nhẹ",
      },
      topIds: ["grapefruit", "amalfi-lemon"],
      heartIds: ["lemongrass", "rosemary-tea-tree"],
      baseIds: ["cedarwood"],
      allNoteIds: [
        "grapefruit",
        "amalfi-lemon",
        "lemongrass",
        "rosemary-tea-tree",
        "cedarwood",
      ],
      desc: "Sở hữu hương thơm tươi mát, thanh sạch và có chút chanh nhẹ nhàng,  tinh dầu thiên nhiên Sả Chanh  là lựa chọn lý tưởng để thanh lọc không khí, làm sạch năng lượng và cải thiện tinh thần.",
    },
    {
      title: "Tinh Dầu Khuếch Tán Thiên Nhiên MIYAKO HOME – Trà Xanh",
      shortName: "Trà Xanh",
      collection: "BST Tinh Dầu Hương Thiên Nhiên",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-thien-nhien-huong-tra-xanh/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/11/chai-nhua-300ml-1536x1536-1.jpg",
      priceRange: "729.000 ₫ – 1.980.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "729.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.099.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.980.000 ₫",
        },
      ],
      pyramid: {
        top: "Chanh vàng, Cam Bergamot",
        heart: "Lá trà xanh non, Hoa nhài",
        base: "Xạ hương trắng, Rêu sồi",
      },
      topIds: ["bergamot", "amalfi-lemon"],
      heartIds: ["night-jasmine", "green-tea-bamboo"],
      baseIds: ["vetiver-oakmoss", "white-musk"],
      allNoteIds: [
        "bergamot",
        "amalfi-lemon",
        "night-jasmine",
        "green-tea-bamboo",
        "vetiver-oakmoss",
        "white-musk",
      ],
      desc: "Tinh dầu thiên nhiên Trà Xanh  không chỉ giúp thanh lọc không khí mà còn tạo nên một không gian sống thư giãn, trong trẻo và đầy an yên. Lý tưởng để sử dụng trong phòng làm việc, phòng ngủ hay những khoảnh khắc cần tĩ...",
    },
    {
      title: "Tinh Dầu Khuếch Tán Thiên Nhiên MIYAKO HOME – Trà Trắng",
      shortName: "Trà Trắng",
      collection: "BST Tinh Dầu Hương Thiên Nhiên",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-thien-nhien-miyako-home-tra-trang/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/11/chai-nhua-300ml-1536x1536-1.jpg",
      priceRange: "390.000 ₫ – 1.980.000 ₫",
      volumes: [
        {
          capacity: "100ml",
          price: "390.000 ₫",
        },
        {
          capacity: "300ml",
          price: "729.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.099.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.980.000 ₫",
        },
      ],
      pyramid: {
        top: "Cam Bergamot, Sương mai",
        heart: "Búp trà trắng thượng hạng, Hoa sen",
        base: "Gỗ đàn hương, Xạ hương trắng",
      },
      topIds: ["bergamot"],
      heartIds: ["white-lotus", "white-tea"],
      baseIds: ["sandalwood", "white-musk"],
      allNoteIds: [
        "bergamot",
        "white-lotus",
        "white-tea",
        "sandalwood",
        "white-musk",
      ],
      desc: "Được lấy cảm hứng từ vẻ đẹp thanh tao của những lá trà trắng, tinh dầu Trà Trắng mang đến hương thơm nhẹ nhàng, tinh tế và trong trẻo – như một làn gió mềm mại len qua không gian, giúp làm mới tâm trạng và tạo cảm giá...",
    },
    {
      title: "Tinh Dầu Khuếch Tán Thiên Nhiên MIYAKO HOME – Tràm Trà",
      shortName: "Tràm Trà",
      collection: "BST Tinh Dầu Hương Thiên Nhiên",
      url: "https://vietbeauties.vn/san-pham/thien-nhien-huong-tram-tra/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/11/chai-nhua-300ml-1536x1536-1.jpg",
      priceRange: "729.000 ₫ – 1.980.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "729.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.099.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.980.000 ₫",
        },
      ],
      pyramid: {
        top: "Lá tràm trà, Bạc hà",
        heart: "Tinh dầu tràm trà nguyên chất, Hương thảo",
        base: "Gỗ tuyết tùng, Thảo mộc",
      },
      topIds: ["rosemary-tea-tree", "peppermint"],
      heartIds: ["rosemary-tea-tree"],
      baseIds: ["cedarwood", "rosemary-tea-tree"],
      allNoteIds: ["rosemary-tea-tree", "peppermint", "cedarwood"],
      desc: "Được chiết xuất từ lá cây tràm trà, tinh dầu mang đến hương thơm tươi mát, cay nhẹ và đầy đặc trưng – như một làn gió trong lành giúp làm mới không gian và tinh thần. Với đặc tính kháng khuẩn, kháng viêm mạnh mẽ, tràm...",
    },
    {
      title: "Tinh Dầu Khuếch Tán Thiên Nhiên MIYAKOHOME – Dưa Lưới",
      shortName: "Dưa Lưới",
      collection: "BST Tinh Dầu Hương Thiên Nhiên",
      url: "https://vietbeauties.vn/san-pham/tinh-dau-khuech-tan-thien-nhien-miyakohome-dua-luoi/",
      image:
        "https://vietbeauties.vn/wp-content/uploads/2025/11/chai-nhua-300ml-1536x1536-1.jpg",
      priceRange: "729.000 ₫ – 1.980.000 ₫",
      volumes: [
        {
          capacity: "300ml",
          price: "729.000 ₫",
        },
        {
          capacity: "500ml",
          price: "1.099.000 ₫",
        },
        {
          capacity: "1000ml",
          price: "1.980.000 ₫",
        },
      ],
      pyramid: {
        top: "Dưa lưới chín mọng, Quả lê",
        heart: "Hoa lan Nam Phi, Trái cây tươi",
        base: "Xạ hương trắng, Vanilla",
      },
      topIds: ["pear-berry-melon"],
      heartIds: ["freesia-orchid", "pear-berry-melon"],
      baseIds: ["white-musk", "vanilla-tonka"],
      allNoteIds: [
        "pear-berry-melon",
        "freesia-orchid",
        "white-musk",
        "vanilla-tonka",
      ],
      desc: "Mang hương thơm đặc trưng của trái cây mùa hè, tinh dầu Dưa Lưới là sự kết hợp hoàn hảo giữa vị ngọt nhẹ, thanh mát và cảm giác tươi mới. Mùi hương này không chỉ dễ chịu mà còn giúp tâm trí thư giãn, đánh thức sự vui ...",
    },
  ];

  function findMatchingProduct(topNote, heartNote, baseNote) {
    const pickedIds = [topNote.id, heartNote.id, baseNote.id];
    let bestProduct = null;
    let bestScore = -1;
    let bestMatchedNotes = [];
    let bestExactLayers = 0;

    for (const prod of MIYAKO_PRODUCTS) {
      const matchedNotes = pickedIds.filter((id) =>
        prod.allNoteIds.includes(id),
      );
      const matchCount = matchedNotes.length;

      let exactLayers = 0;
      if (prod.topIds.includes(topNote.id)) exactLayers++;
      if (prod.heartIds.includes(heartNote.id)) exactLayers++;
      if (prod.baseIds.includes(baseNote.id)) exactLayers++;

      const coverage =
        matchCount / Math.max(1, Math.min(3, prod.allNoteIds.length));

      // Weighted score: prioritize number of matched notes + exact pyramid layer match + specificity
      const score =
        matchCount * 32 +
        exactLayers * 12 +
        coverage * 15 -
        prod.allNoteIds.length * 0.4;

      if (score > bestScore) {
        bestScore = score;
        bestProduct = prod;
        bestMatchedNotes = matchedNotes;
        bestExactLayers = exactLayers;
      }
    }

    // A user mix matches a Miyako Home product if all 3 notes are in the product,
    // OR at least 2 of 3 notes are in the product with at least 1 exact pyramid layer (or a focused 2-note product)
    const isMatched =
      bestMatchedNotes.length === 3 ||
      (bestMatchedNotes.length === 2 &&
        (bestExactLayers >= 1 ||
          (bestProduct && bestProduct.allNoteIds.length <= 3)));

    const matchPercent =
      bestMatchedNotes.length === 3
        ? Math.min(99, 92 + bestExactLayers * 2)
        : bestMatchedNotes.length === 2
          ? Math.min(89, 78 + bestExactLayers * 4)
          : 45;

    return {
      isMatched,
      matchPercent,
      matchedCount: bestMatchedNotes.length,
      product: bestProduct || MIYAKO_PRODUCTS[0],
    };
  }

  const ARCHETYPES = [
    // 20 cặp trục (primary, secondary) phân biệt theo 5 chiều: depth, elegance, warmth, freedom, mystery
    {
      id: "depth-mystery",
      primary: "depth",
      secondary: "mystery",
      title: "Người Kể Chuyện Thầm Lặng (The Poetic Old Soul)",
      stories: [
        "Bạn sở hữu thế giới nội tâm sâu lắng và giàu tầng nghĩa. Không ưa sự ồn ào phô trương, bạn chọn chạm vào cuộc sống qua những chi tiết tinh vi mà người vội vã thường bỏ qua.",
        "Ở bạn luôn có một khoảng tĩnh khiến người đối diện muốn chậm lại để lắng nghe. Sự từng trải và chiều sâu tri thức của bạn toát ra nhẹ nhàng như dư âm lưu mãi sau câu chuyện khuya.",
      ],
    },
    {
      id: "depth-warmth",
      primary: "depth",
      secondary: "warmth",
      title: "Người Gác Đêm Bên Cửa Sổ (The Hearthside Keeper)",
      stories: [
        "Vững chãi mà dịu dàng, bạn là nơi người thân quen tìm về mỗi khi cần một điểm tựa bình yên. Bạn suy nghĩ thấu đáo nhưng luôn đặt sự tử tế và ấm áp lên trước mọi lý lẽ.",
        "Bên trong vẻ điềm đạm của bạn là một trái tim bao dung, nhớ kỹ từng thói quen nhỏ của những người bạn thương. Căn phòng có bạn lúc nào cũng mang cảm giác an toàn và được chở che.",
      ],
    },
    {
      id: "depth-elegance",
      primary: "depth",
      secondary: "elegance",
      title: "Kiến Trúc Sư Của Những Khoảng Lặng (The Quiet Architect)",
      stories: [
        "Bạn nhìn cuộc sống với con mắt điềm tĩnh của người hiểu rõ giá trị cốt lõi. Mọi lựa chọn từ lời ăn tiếng nói đến không gian sống của bạn đều gọn ghẽ, sâu sắc và không thừa một nét nào.",
        "Không chạy theo những xu hướng sớm nở tối tàn, bạn đầu tư trọn vẹn cho những thứ có thể đồng hành qua năm tháng. Gu thẩm mỹ chín chắn giúp bạn luôn giữ được phong thái đĩnh đạc.",
      ],
    },
    {
      id: "depth-freedom",
      primary: "depth",
      secondary: "freedom",
      title: "Kẻ Mộng Mơ Trong Rừng Sương (The Cedarwood Dreamer)",
      stories: [
        "Bạn mang trong mình nét trầm tư của triết gia nhưng lại sở hữu đôi chân không chịu đứng yên trước những chân trời mới. Bạn vừa cần sự tĩnh tại để nghĩ sâu, vừa cần không gian mở để hít thở tự do.",
        "Những chuyến đi một mình hay buổi sáng ngồi nhìn sương tan ngoài hiên là lúc bạn nạp lại năng lượng tốt nhất. Bạn độc lập trong tư duy và trung thực với tiếng nói bên trong mình.",
      ],
    },
    {
      id: "elegance-depth",
      primary: "elegance",
      secondary: "depth",
      title: "Biểu Tượng Thanh Lịch Tối Giản (The Quiet Luxury Soul)",
      stories: [
        "Khí chất tao nhã nơi bạn đến từ sự tiết chế tinh tế chứ không phải phô diễn cầu kỳ. Bạn biết biến góc nhỏ đời thường thành một ốc đảo nghệ thuật đầy chất thơ và sự chỉn chu.",
        "Người ta nhớ về bạn bởi sự chuẩn mực nhẹ nhàng và chiều sâu văn hóa ẩn sau nụ cười điềm nhiên. Bạn trân trọng chất lượng hơn số lượng trong cả đồ vật lẫn các mối quan hệ.",
      ],
    },
    {
      id: "elegance-freedom",
      primary: "elegance",
      secondary: "freedom",
      title: "Nghệ Sĩ Giữa Vườn Sớm (The Morning-Garden Aesthete)",
      stories: [
        "Bạn mang vẻ đẹp thanh thoát như làn nắng sớm lướt qua tán lá còn đọng sương. Tâm hồn bạn yêu cái đẹp tự nhiên, mềm mại nhưng luôn giữ cho mình khoảng trời riêng phóng khoáng.",
        "Khéo léo mà không gò bó, bạn sống theo nhịp điệu riêng đầy cảm hứng. Ở gần bạn, người khác dễ dàng cảm thấy nhẹ nhõm như vừa mở tung cửa sổ đón gió mai.",
      ],
    },
    {
      id: "elegance-mystery",
      primary: "elegance",
      secondary: "mystery",
      title: "Kẻ Lưu Giữ Ánh Hoàng Hôn (The Dusk Connoisseur)",
      stories: [
        "Bạn có sức hút sang trọng đầy ý nhị — đủ gần để người khác ngưỡng mộ, đủ xa để họ mãi tò mò khám phá. Mọi cử chỉ của bạn đều chừng mực nhưng để lại dư vị khó phai.",
        "Giống như khoảnh khắc chuyển giao giữa chiều tà và màn đêm, vẻ đẹp của bạn nằm ở nét giao thoa tinh xảo giữa lý trí sắc sảo và cảm xúc kín đáo.",
      ],
    },
    {
      id: "elegance-warmth",
      primary: "elegance",
      secondary: "warmth",
      title: "Người Ướp Thơ Cho Đời Thường (The Everyday Poet)",
      stories: [
        "Bạn biến những điều giản dị như tách trà chiều, bình hoa mới cắm hay ánh đèn vàng ấm trở thành kỷ niệm đáng nhớ. Sự tinh tế của bạn luôn đi cùng tấm lòng chu đáo hiếm thấy.",
        "Dịu dàng, lịch thiệp và giàu lòng trắc ẩn, bạn sưởi ấm bầu không khí xung quanh một cách thật tự nhiên. Ai từng trò chuyện cùng bạn đều mang về cảm giác được trân quý.",
      ],
    },
    {
      id: "warmth-elegance",
      primary: "warmth",
      secondary: "elegance",
      title: "Người Giữ Lửa Dịu Dàng (The Warm Empathetic Healer)",
      stories: [
        "Bạn là hiện thân của sự ân cần, bao dung và tinh tế trong từng cách đối nhân xử thế. Chỉ cần có bạn hiện diện, bầu không khí căng thẳng cũng dần dịu lại như chiều mưa có ánh đèn vàng.",
        "Trái tim ấm áp giúp bạn lắng nghe điều người khác chưa kịp nói thành lời. Bạn chữa lành mọi người bằng sự chân thành điềm nhã chứ không bao giờ ồn ào.",
      ],
    },
    {
      id: "warmth-depth",
      primary: "warmth",
      secondary: "depth",
      title: "Chủ Nhân Căn Phòng Ánh Nến (The Candlelight Confidant)",
      stories: [
        "Bạn yêu những kết nối bền chặt và những cuộc trò chuyện kéo dài thâu đêm bên tách trà ấm. Sự chân thành của bạn có sức nặng của người từng trải, khiến ai cũng muốn tin cậy gửi gắm tâm sự.",
        "Nồng hậu nhưng không hời hợt, bạn dành hết tâm huyết cho gia đình và vài người tri kỷ thực sự. Tình cảm nơi bạn giống như rượu ủ lâu năm — càng qua thời gian càng đằm.",
      ],
    },
    {
      id: "warmth-freedom",
      primary: "warmth",
      secondary: "freedom",
      title: "Kẻ Mang Nắng Về Hiên Nhà (The Sunlit Host)",
      stories: [
        "Bạn tỏa ra nguồn năng lượng rạng rỡ, cởi mở và hiếu khách ngay từ ánh nhìn đầu tiên. Niềm vui sống thuần khiết nơi bạn dễ dàng lan sang cả căn phòng, xua tan mọi âu lo.",
        "Dù bận rộn với bao dự định mới, bạn vẫn biết cách tận hưởng trọn vẹn từng buổi tụ họp ấm cúng. Bạn sống hết mình, cười hết lòng và truyền cảm hứng lạc quan cho mọi người.",
      ],
    },
    {
      id: "warmth-mystery",
      primary: "warmth",
      secondary: "mystery",
      title: "Người Đưa Tin Của Mùa Thu (The Autumn Storyteller)",
      stories: [
        "Bạn vừa ngọt ngào dễ mến lại vừa giữ một góc riêng trầm mặc đầy hoài niệm. Có những lúc bạn nhiệt thành sôi nổi, nhưng ngay sau đó lại lặng lẽ thu mình đọc lại trang ký ức cũ.",
        "Sự pha trộn giữa hơi ấm thân thuộc và nét bí ẩn nhẹ nhàng khiến bạn trở nên đặc biệt khó quên. Người ta luôn muốn ngồi cạnh bạn lâu hơn để nghe thêm một câu chuyện nữa.",
      ],
    },
    {
      id: "freedom-elegance",
      primary: "freedom",
      secondary: "elegance",
      title: "Kẻ Lữ Hành Giữa Sương Mai (The Free Spirit)",
      stories: [
        "Tâm hồn bạn thuộc về những khoảng trời rộng mở, những làn gió mới và tinh thần sáng tạo không rập khuôn. Bạn chọn sự tự do nhưng vẫn luôn giữ được nét thanh lịch rất riêng.",
        "Trong veo, thẳng thắn và tràn đầy sinh khí, bạn bước qua cuộc sống nhẹ tênh như giọt sương đầu ngày. Sự xuất hiện của bạn luôn thổi một luồng gió mát lành vào tập thể.",
      ],
    },
    {
      id: "freedom-warmth",
      primary: "freedom",
      secondary: "warmth",
      title: "Người Đọc Sóng Bình Minh (The Horizon Seeker)",
      stories: [
        "Bạn hào sảng, yêu trải nghiệm và luôn sẵn lòng rủ bạn bè cùng bước ra khỏi vùng an toàn. Trái tim bạn rộng mở đón nắng mới, nhưng vẫn đủ ấm để không ai bị bỏ lại phía sau.",
        "Năng lượng dồi dào và tư duy tích cực giúp bạn nhìn thấy cơ hội ngay giữa lúc thử thách nhất. Với bạn, mỗi ngày mới đều xứng đáng bắt đầu bằng một cảm hứng tươi vui.",
      ],
    },
    {
      id: "freedom-depth",
      primary: "freedom",
      secondary: "depth",
      title: "Đốm Lửa Của Những Chuyến Đi (The Restless Philosopher)",
      stories: [
        "Bạn đi nhiều để hiểu mình hơn và ngắm thế giới bằng đôi mắt tò mò sâu sắc. Đằng sau vẻ ngoài phóng khoáng, tự tại là một khối óc luôn suy ngẫm về ý nghĩa của tự do và bình yên.",
        "Bạn không sợ đi một mình trên con đường ít người chọn. Với bạn, trưởng thành là biết giữ cái đầu tỉnh táo giữa muôn vàn biến động mà vẫn giữ nguyên chất riêng.",
      ],
    },
    {
      id: "freedom-mystery",
      primary: "freedom",
      secondary: "mystery",
      title: "Gió Lạ Giữa Phố Đêm (The Midnight Wanderer)",
      stories: [
        "Khó đoán, sắc sảo và luôn mang một góc nhìn khác biệt, bạn không bao giờ chịu đứng yên trong bất kỳ khuôn mẫu nào. Cá tính độc lập khiến người khác vừa nể phục vừa bị cuốn theo.",
        "Bạn thích những hành trình ngẫu hứng lúc thành phố đã lên đèn và những ý tưởng táo bạo chưa từng có tiền lệ. Năng lượng nơi bạn là sự giao thoa giữa tự do và nét mê hoặc ngầm.",
      ],
    },
    {
      id: "mystery-depth",
      primary: "mystery",
      secondary: "depth",
      title: "Người Giữ Khóa Màn Đêm (The Velvet-Hour Keeper)",
      stories: [
        "Bạn ít nói về bản thân, nhưng mỗi lời bạn thốt ra đều cho thấy một chiều sâu trải nghiệm hiếm có. Bạn giữ cho riêng mình một thế giới nội tâm kín đáo, chỉ mở cửa cho người thật sự đồng điệu.",
        "Khí chất điềm nhiên pha chút bí ẩn khiến bạn có sức nặng tự nhiên trong mọi căn phòng. Bạn giống như một bản nhạc cổ điển — càng nghe kỹ càng thấy nhiều lớp cảm xúc.",
      ],
    },
    {
      id: "mystery-elegance",
      primary: "mystery",
      secondary: "elegance",
      title: "Bóng Hình Sau Tấm Rèm Nhung (The Enigmatic Muse)",
      stories: [
        "Cuốn hút một cách lặng lẽ, bạn sở hữu nét duyên dáng sắc sảo không cần cố gắng. Gu thẩm mỹ tinh tường giúp bạn luôn nổi bật dù chọn cho mình tông màu trầm tối giản nhất.",
        "Người khác bị bạn hấp dẫn bởi sự tự chủ và vẻ điềm tĩnh đầy kiêu hãnh. Bạn không chạy theo sự chú ý, bởi chính khoảng lặng của bạn đã đủ tạo nên sức hút.",
      ],
    },
    {
      id: "mystery-warmth",
      primary: "mystery",
      secondary: "warmth",
      title: "Nhà Sưu Tầm Ký Ức Cũ (The Memory Collector)",
      stories: [
        "Bạn lưu giữ cảm xúc lâu hơn bất kỳ ai: một mùi hương quen, một bản nhạc xưa hay ánh chiều qua khung cửa đều có thể đánh thức cả bầu trời kỷ niệm bên trong bạn.",
        "Vẻ ngoài trầm lắng nhưng bên trong bạn lại vô cùng nồng hậu và chung thủy. Ai được bạn xem là người thân thuộc sẽ luôn có một vị trí ấm áp không thể thay thế.",
      ],
    },
    {
      id: "mystery-freedom",
      primary: "mystery",
      secondary: "freedom",
      title: "Kẻ Độc Hành Đầy Mê Hoặc (The Magnetic Maverick)",
      stories: [
        "Bạn sống theo luật chơi của riêng mình — bản lĩnh, khác biệt và hoàn toàn làm chủ nhịp điệu cuộc đời. Sự tự tin thầm lặng giúp bạn biến cá tính độc bản thành dấu ấn không thể nhầm lẫn.",
        "Bạn yêu những trải nghiệm có cá tính mạnh và không ngại rẽ lối khỏi số đông. Chính nét bất kham nhưng tinh tế ấy tạo nên sức quyến rũ rất riêng nơi bạn.",
      ],
    },
    // 4 hình mẫu đặc biệt theo cấu trúc nhóm hương & độ cân bằng
    {
      id: "pure-family",
      special: "pure-family",
      title: "Tâm Hồn Thuần Khiết Một Sắc Hương (The Devoted Purist)",
      stories: [
        "Bạn không cần pha tạp quá nhiều lớp mặt nạ: khi đã tìm thấy điều hợp với bản chất mình, bạn theo đuổi nó một cách trọn vẹn và thuần khiết nhất.",
        "Sự nhất quán từ bên ngoài đến nội tâm giúp bạn toát lên vẻ chân thật đầy tin cậy. Bạn hiểu rõ mình thích gì, cần gì và không dễ bị nhiễu bởi những tiếng ồn xung quanh.",
      ],
    },
    {
      id: "balanced-harmonious",
      special: "balanced-harmonious",
      title: "Nhà Giả Kim Của Cảm Xúc (The Harmonious Alchemist)",
      stories: [
        "Bạn sở hữu sự cân bằng hiếm có giữa lý trí và cảm xúc, giữa nét truyền thống sâu lắng và tinh thần hiện đại phóng khoáng.",
        "Biết nhu biết cương đúng lúc, bạn dễ dàng hòa nhập vào nhiều không gian khác nhau mà vẫn giữ trọn bản sắc. Sự hài hòa nội tại chính là nguồn năng lượng bền bỉ nhất của bạn.",
      ],
    },
    {
      id: "balanced-contrast",
      special: "balanced-contrast",
      title: "Người Điều Phối Ánh Sáng & Bóng Tối (The Chiaroscuro Soul)",
      stories: [
        "Bên trong bạn cùng tồn tại hai thái cực thú vị: vẻ ngoài tươi sáng, cởi mở nhưng lại ẩn chứa một nội tâm sâu thẳm và quyết liệt đến bất ngờ.",
        "Bạn biết cách biến sự đối lập thành nét quyến rũ riêng, giống như tia nắng sớm chiếu lên nền gỗ trầm. Chính những tầng hương tương phản này khiến bạn luôn mới mẻ trong mắt người đối diện.",
      ],
    },
    {
      id: "balanced-seasons",
      special: "balanced-seasons",
      title: "Bản Giao Hưởng Của Bốn Mùa (The Four-Season Symphony)",
      stories: [
        "Bạn là người đa sắc thái và linh hoạt đáng kinh ngạc — có lúc nhẹ nhàng như gió xuân, khi lại nồng ấm như thu sang hay trầm ổn như đêm đông.",
        "Trí tuệ cảm xúc phong phú giúp bạn kết nối với nhiều kiểu người và cảm nhận trọn vẹn từng cung bậc của đời sống. Ở bên bạn, mỗi ngày đều có một gam màu mới để khám phá.",
      ],
    },
  ];

  const recentPersonaIds = [];

  function hashString(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function resolvePersonaStory(avgScores, top, heart, base, formula) {
    const mixSeed = hashString(
      `${top.id}|${heart.id}|${base.id}|${formula.code}`,
    );

    const axisKeys = ["depth", "elegance", "warmth", "freedom", "mystery"];
    const rankedAxes = axisKeys
      .map((key, idx) => {
        // Nudge ties deterministically based on mixSeed so equal scores spread evenly across archetypes
        const jitter = (((mixSeed >>> (idx * 3)) & 7) - 3.5) * 0.12;
        return {
          key,
          score: (avgScores[key] || 80) + jitter,
          raw: avgScores[key] || 80,
        };
      })
      .sort((a, b) => b.score - a.score);

    const rawValues = rankedAxes.map((a) => a.raw);
    const spread = Math.max(...rawValues) - Math.min(...rawValues);

    const sameFamily =
      top.familyId === heart.familyId && heart.familyId === base.familyId;
    const allDistinctFamilies =
      new Set([top.familyId, heart.familyId, base.familyId]).size === 3;
    const brightFamilies = new Set(["citrus", "herbal", "floral"]);
    const deepFamilies = new Set(["woody", "spicy", "amber"]);
    const hasFamilyContrast =
      [top.familyId, heart.familyId, base.familyId].some((f) =>
        brightFamilies.has(f),
      ) &&
      [top.familyId, heart.familyId, base.familyId].some((f) =>
        deepFamilies.has(f),
      );

    const findPair = (p, s) =>
      ARCHETYPES.find((a) => a.primary === p && a.secondary === s);
    const findSpecial = (sp) => ARCHETYPES.find((a) => a.special === sp);

    const candidates = [];

    if (sameFamily) {
      candidates.push(findSpecial("pure-family"));
    }
    if (hasFamilyContrast && spread >= 14) {
      candidates.push(findSpecial("balanced-contrast"));
    }
    if (spread <= 6) {
      candidates.push(findSpecial("balanced-harmonious"));
    }
    if (allDistinctFamilies && spread <= 10) {
      candidates.push(findSpecial("balanced-seasons"));
    }

    const [a1, a2, a3, a4] = rankedAxes.map((a) => a.key);
    candidates.push(
      findPair(a1, a2),
      findPair(a2, a1),
      findPair(a1, a3),
      findPair(a3, a1),
      findPair(a2, a3),
      findPair(a1, a4),
    );

    const uniqueCandidates = [];
    const seenIds = new Set();
    for (const cand of candidates) {
      if (cand && !seenIds.has(cand.id)) {
        seenIds.add(cand.id);
        uniqueCandidates.push(cand);
      }
    }

    const chosen =
      uniqueCandidates.find((c) => !recentPersonaIds.includes(c.id)) ||
      uniqueCandidates[0] ||
      ARCHETYPES[0];

    const prevIndex = recentPersonaIds.indexOf(chosen.id);
    if (prevIndex !== -1) recentPersonaIds.splice(prevIndex, 1);
    recentPersonaIds.unshift(chosen.id);
    if (recentPersonaIds.length > 4) recentPersonaIds.pop();

    const variantIndex =
      prevIndex !== -1 ? (mixSeed + 1) % chosen.stories.length : mixSeed % chosen.stories.length;
    const baseStory = chosen.stories[variantIndex];

    const closingPools = {
      "40-30-30": [
        `Cách bạn kết hợp ${top.name}, ${heart.name} và ${base.name} theo tỷ lệ cân bằng 40-30-30 phản ánh rõ nét tính cách điềm đạm, biết dung hòa mọi sắc thái của riêng bạn.`,
        `Dư âm của ${top.name} quyện cùng ${heart.name} trên nền ${base.name} theo nhịp 40-30-30 cho thấy bạn luôn ưu tiên sự tròn vị và chiều sâu bền lâu.`,
      ],
      "50-40-20": [
        `Nhịp pha phóng khoáng 50-40-20 với ${top.name} dẫn lối, ${heart.name} nâng cảm xúc và ${base.name} chốt hạ cho thấy nguồn năng lượng giàu cảm hứng luôn bừng sáng trong bạn.`,
        `Tỷ lệ bùng nổ 50-40-20 giữa ${top.name}, ${heart.name} và ${base.name} bộc lộ tinh thần cởi mở, sống động và luôn sẵn sàng lan tỏa thiện cảm của bạn.`,
      ],
      "50-40-10": [
        `Công thức thanh thoát 50-40-10 để ${top.name} và ${heart.name} tỏa sáng nhẹ nhàng trên vệt nền ${base.name} khắc họa trọn vẹn gu thẩm mỹ trong trẻo, không gượng ép của bạn.`,
        `Sự tiết chế khéo léo ở tỷ lệ 50-40-10 khi ghép ${top.name}, ${heart.name} cùng ${base.name} gợi nhắc phong thái tự tại và tinh thần yêu sự nhẹ nhõm bên trong bạn.`,
      ],
    };

    const pool = closingPools[formula.code] || closingPools["40-30-30"];
    const closingLine = pool[(mixSeed >>> 5) % pool.length];

    return {
      title: chosen.title,
      summary: `${baseStory} ${closingLine}`,
    };
  }

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
  let isBrewingMagic = false;
  let draggedLayer = null;
  let hasClickedWheel = false;
  let hasLearnedStep1 = false;
  let hasLearnedStep2 = false;
  let step1Anims = [];
  let step2Anims = [];

  // DOM Elements
  const colWheel = document.querySelector(".col-wheel");
  const colAlchemy = document.querySelector(".col-alchemy");
  const colBespoke = document.querySelector(".col-bespoke");
  const tutorialStep1 = document.getElementById("tutorial-step1-overlay");
  const tutorialStep1Path = document.getElementById("tutorial-step1-path");
  const tutorialStep2 = document.getElementById("tutorial-step2-overlay");
  let selectedSlotLayer = null;
  const wheelBox = document.getElementById("wheel-box");
  const wheelHoverCard = document.getElementById("wheel-hover-card");
  const wheelHoverTitle = document.getElementById("wheel-hover-title");
  const wheelHoverDesc = document.getElementById("wheel-hover-desc");
  const wheelSvg = document.getElementById("fragrance-wheel-svg");
  const familyDot = document.getElementById("family-dot");
  const familyNameEl = document.getElementById("family-name");
  const familyDescEl = document.getElementById("family-desc");
  const notesGrid = document.getElementById("notes-grid");
  const vialsTray = document.querySelector(".vials-tray");
  const vialDiscardZone = document.getElementById("vial-discard-zone");
  const vialDiscardText = document.getElementById("vial-discard-text");
  const dropzone = document.getElementById("alchemy-dropzone");
  const dropzoneHint = document.getElementById("dropzone-hint");
  const pouringActor = document.getElementById("pouring-actor");
  const pouringLiquid = document.getElementById("pouring-vial-liquid");
  const pouringStream = document.getElementById("pouring-stream");
  const particlesBox = document.getElementById("aroma-particles");
  const pourStatusText = document.getElementById("pour-status-text");
  const quickPourBtn = document.getElementById("quick-pour-all-btn");
  const craftBtn = document.getElementById("craft-btn");
  const finalBottleRatio = document.getElementById("final-bottle-ratio");
  const resultModal = document.getElementById("result-modal");
  const mobileBrewOverlay = document.getElementById("mobile-brew-overlay");
  const mobileBrewFlaskSvg = document.getElementById("mobile-brew-flask-svg");
  const mobileBrewParticles = document.getElementById("mobile-brew-particles");
  const mobileBrewNotes = document.getElementById("mobile-brew-notes");
  const mobileBrewStatus = document.getElementById("mobile-brew-status");
  const soundToggleBtn = document.getElementById("sound-toggle-btn");
  const musicToggleBtn = document.getElementById("music-toggle-btn");

  // =========================================================================
  // BACKGROUND MUSIC ENGINE (assets/audios/music-back.MP3)
  // Low volume (~0.16) to ensure SoundFX remains crisp and clear
  // =========================================================================
  const BackgroundMusic = (() => {
    let audio = null;
    let isPlaying = false;
    let initialized = false;

    function init() {
      if (initialized) return;
      initialized = true;
      audio = new Audio("assets/audios/music-back.MP3");
      audio.loop = true;
      audio.volume = 0.35; // Âm lượng nhạc nền lớn hơn gấp đôi
    }

    function play() {
      init();
      if (!audio) return;
      const promise = audio.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            isPlaying = true;
            updateBtn();
          })
          .catch(() => {
            // Trình duyệt chặn autoplay khi chưa có tương tác từ người dùng
            isPlaying = false;
            updateBtn();
          });
      }
    }

    function pause() {
      if (!audio) return;
      audio.pause();
      isPlaying = false;
      updateBtn();
    }

    function toggle() {
      init();
      if (isPlaying) {
        pause();
      } else {
        play();
      }
      return isPlaying;
    }

    const svgSoundOn =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
    const svgSoundOff =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';
    const svgMusicOn =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>';
    const svgMusicOff =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.27 3L3 4.27l9 9v.28c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4v-1.73l4.27 4.27L19.73 21 21 19.73 4.27 3zM14 7h4V3h-6v5.18l2 2V7z"/></svg>';

    function updateBtn() {
      if (!musicToggleBtn) return;
      musicToggleBtn.setAttribute("aria-pressed", String(isPlaying));
      musicToggleBtn.innerHTML = isPlaying ? svgMusicOn : svgMusicOff;
      musicToggleBtn.title = isPlaying ? "Tắt nhạc nền" : "Bật nhạc nền";
      musicToggleBtn.classList.toggle("active", isPlaying);
    }

    // Tự động phát nhạc ngay khi nạp trang (và dự phòng khi người dùng di chuột/tương tác nếu trình duyệt cần kích hoạt)
    function autoStartMusic() {
      // 1. Thử gọi play() ngay lập tức khi mở trang
      play();

      // 2. Dự phòng: các trình duyệt hiện đại (Chrome, Edge, Safari) có Autoplay Policy chặn âm thanh
      // trước cử chỉ đầu tiên. Do đó lắng nghe bất kỳ thao tác nào (mousemove, scroll, click, keydown, touch)
      // để lập tức bật nhạc lên nếu trước đó bị chặn.
      function ensurePlayingOnAnyAction() {
        if (!isPlaying) {
          play();
        }
        if (isPlaying) {
          [
            "pointerdown",
            "mousedown",
            "mousemove",
            "click",
            "keydown",
            "touchstart",
            "scroll",
            "wheel",
          ].forEach((ev) =>
            window.removeEventListener(ev, ensurePlayingOnAnyAction),
          );
        }
      }

      [
        "pointerdown",
        "mousedown",
        "mousemove",
        "click",
        "keydown",
        "touchstart",
        "scroll",
        "wheel",
      ].forEach((ev) =>
        window.addEventListener(ev, ensurePlayingOnAnyAction, {
          passive: true,
        }),
      );
    }

    autoStartMusic();

    return {
      play,
      pause,
      toggle,
      get isPlaying() {
        return isPlaying;
      },
    };
  })();

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      BackgroundMusic.toggle();
    });
  }

  // =========================================================================
  // WEB AUDIO API ALCHEMY SOUND FX ENGINE (NO EXTERNAL AUDIO FILES REQUIRED)
  // =========================================================================
  const SoundFX = (() => {
    let ctx = null;
    let enabled = true;

    function getCtx() {
      if (!enabled) return null;
      if (!ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return null;
        ctx = new AudioCtx();
      }
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      return ctx;
    }

    function playTone({
      freq = 440,
      endFreq = null,
      type = "sine",
      gain = 0.08,
      attack = 0.008,
      duration = 0.18,
      delay = 0,
    }) {
      const c = getCtx();
      if (!c) return;
      const now = c.currentTime + delay;
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      if (endFreq) {
        osc.frequency.exponentialRampToValueAtTime(endFreq, now + duration);
      }
      g.gain.setValueAtTime(0.0001, now);
      g.gain.linearRampToValueAtTime(gain, now + attack);
      g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(g);
      g.connect(c.destination);
      osc.start(now);
      osc.stop(now + duration + 0.02);
    }

    function playNoiseBurst({
      duration = 0.25,
      filterFreq = 800,
      endFilterFreq = null,
      q = 3,
      gain = 0.05,
      delay = 0,
    }) {
      const c = getCtx();
      if (!c) return;
      const now = c.currentTime + delay;
      const bufferSize = Math.max(1, Math.floor(c.sampleRate * duration));
      const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = c.createBufferSource();
      noise.buffer = buffer;

      const filter = c.createBiquadFilter();
      filter.type = "bandpass";
      filter.Q.setValueAtTime(q, now);
      filter.frequency.setValueAtTime(filterFreq, now);
      if (endFilterFreq) {
        filter.frequency.exponentialRampToValueAtTime(
          endFilterFreq,
          now + duration,
        );
      }

      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, now);
      g.gain.linearRampToValueAtTime(gain, now + duration * 0.2);
      g.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      noise.connect(filter);
      filter.connect(g);
      g.connect(c.destination);
      noise.start(now);
      noise.stop(now + duration + 0.02);
    }

    return {
      toggle() {
        enabled = !enabled;
        if (enabled) {
          playTone({ freq: 660, endFreq: 880, gain: 0.24, duration: 0.16 });
        }
        return enabled;
      },
      playHoverTick() {
        playTone({
          freq: 920,
          endFreq: 1180,
          type: "sine",
          gain: 0.09,
          attack: 0.003,
          duration: 0.045,
        });
      },
      playWheelSelect() {
        playTone({ freq: 528, type: "sine", gain: 0.26, duration: 0.28 });
        playTone({
          freq: 792,
          type: "triangle",
          gain: 0.16,
          duration: 0.34,
          delay: 0.035,
        });
      },
      playVialPick(isPick = true) {
        if (isPick) {
          // Crisp glass vial clink + harmonic sparkle
          playTone({
            freq: 1320,
            endFreq: 1680,
            type: "sine",
            gain: 0.28,
            attack: 0.004,
            duration: 0.14,
          });
          playTone({
            freq: 2640,
            type: "sine",
            gain: 0.13,
            attack: 0.003,
            duration: 0.22,
            delay: 0.02,
          });
        } else {
          playTone({
            freq: 580,
            endFreq: 390,
            type: "sine",
            gain: 0.2,
            duration: 0.14,
          });
        }
      },
      playLiquidPour() {
        // Pouring liquid stream + rising bubble pops
        playNoiseBurst({
          duration: 0.78,
          filterFreq: 420,
          endFilterFreq: 1150,
          q: 4.5,
          gain: 0.2,
        });
        const bubbleFreqs = [340, 440, 520, 640, 780];
        bubbleFreqs.forEach((f, idx) => {
          playTone({
            freq: f,
            endFreq: f * 1.65,
            type: "sine",
            gain: 0.18,
            attack: 0.005,
            duration: 0.075,
            delay: 0.08 + idx * 0.13,
          });
        });
      },
      playFormulaSwitch() {
        playTone({
          freq: 640,
          endFreq: 960,
          type: "triangle",
          gain: 0.22,
          attack: 0.004,
          duration: 0.15,
        });
      },
      playRandomSpin() {
        const notes = [
          440, 493.88, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66,
        ];
        notes.forEach((f, i) => {
          playTone({
            freq: f,
            type: "sine",
            gain: 0.16,
            attack: 0.004,
            duration: 0.09,
            delay: i * 0.075,
          });
        });
      },
      playMagicAlchemyRitual() {
        // 1. Rhythmic potion shaking sloshes & glass clinks (0.0s -> 2.0s)
        for (let i = 0; i < 8; i++) {
          const delay = 0.12 + i * 0.23;
          playNoiseBurst({
            duration: 0.16,
            filterFreq: 520 + (i % 2) * 260,
            endFilterFreq: 980,
            q: 3.5,
            gain: 0.18,
            delay,
          });
          playTone({
            freq: 1450 + (i % 3) * 220,
            type: "sine",
            gain: 0.1,
            attack: 0.003,
            duration: 0.06,
            delay: delay + 0.03,
          });
        }

        // 2. Rising mystical celesta arpeggio during swirling (0.3s -> 2.05s)
        const arp = [
          523.25, 659.25, 783.99, 987.77, 1046.5, 1318.5, 1567.98, 1975.53,
        ];
        arp.forEach((f, idx) => {
          playTone({
            freq: f,
            type: "sine",
            gain: 0.15,
            attack: 0.008,
            duration: 0.32,
            delay: 0.35 + idx * 0.21,
          });
        });

        // 3. Climactic golden transmutation shockwave chord at 2.1s
        const chord = [261.63, 523.25, 659.25, 783.99, 1046.5, 1318.5, 1567.98];
        chord.forEach((f, idx) => {
          playTone({
            freq: f,
            type: idx < 2 ? "triangle" : "sine",
            gain: idx === 0 ? 0.3 : 0.19,
            attack: 0.015,
            duration: 0.95,
            delay: 2.08 + idx * 0.02,
          });
        });
      },
    };
  })();

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener("click", () => {
      const isOn = SoundFX.toggle();
      soundToggleBtn.setAttribute("aria-pressed", String(isOn));
      soundToggleBtn.innerHTML = isOn
        ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>'
        : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';
      soundToggleBtn.title = isOn
        ? "Tắt hiệu ứng âm thanh"
        : "Bật hiệu ứng âm thanh";
    });
  }

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
    const existingSlices = wheelSvg.querySelectorAll(".wheel-slice");
    if (existingSlices.length === FRAGRANCE_FAMILIES.length) {
      existingSlices.forEach((sliceEl) => {
        const isActive = sliceEl.dataset.family === activeFamilyId;
        sliceEl.classList.toggle("active", isActive);
        const pathEl = sliceEl.querySelector("path");
        if (pathEl) {
          pathEl.setAttribute("fill-opacity", isActive ? "0.95" : "0.7");
          pathEl.setAttribute("stroke-width", isActive ? "2" : "1");
        }
      });
      return;
    }

    const cx = 210;
    const cy = 210;
    const rInner = 68;
    const rOuter = 194;
    const sliceAngle = 360 / FRAGRANCE_FAMILIES.length;

    let svgContent = `
      <defs>
        <clipPath id="wheel-center-clip">
          <circle cx="${cx}" cy="${cy}" r="${rInner - 5}" />
        </clipPath>
      </defs>
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

      // Calculate center of the sector ring
      const rCenter = (rInner + rOuter) / 2; // 131
      const centerPos = polarToCartesian(cx, cy, rCenter, midAngle);
      const isActive = fam.id === activeFamilyId;

      // Split name into 2 lines if it contains '&' or is long to avoid text collision
      let labelSvg = "";
      if (fam.name.includes("&")) {
        const parts = fam.name.split("&").map((s) => s.trim());
        labelSvg = `
          <text x="${centerPos.x}" y="${centerPos.y - 8}" class="wheel-label">${parts[0]}</text>
          <text x="${centerPos.x}" y="${centerPos.y + 9}" class="wheel-label">&amp; ${parts[1]}</text>
        `;
      } else {
        labelSvg = `<text x="${centerPos.x}" y="${centerPos.y}" class="wheel-label">${fam.name}</text>`;
      }

      svgContent += `
        <g class="wheel-slice ${isActive ? "active" : ""}" data-family="${fam.id}" role="button" tabindex="0" aria-label="Nhóm ${fam.name}">
          <title>${fam.name} (${fam.sub}): ${fam.desc}</title>
          <path d="${pathData}" fill="${fam.color}" fill-opacity="${isActive ? "0.95" : "0.7"}" stroke="rgba(255,248,238,0.35)" stroke-width="${isActive ? "2" : "1"}" />
          ${labelSvg}
        </g>
      `;
    });

    // Center circle with logo-miyako.png (links to https://vietbeauties.vn/)
    svgContent += `
      <a href="https://vietbeauties.vn/?utm_source=web-bespoke&amp;utm_medium=bespoke-scent&amp;utm_campaign=branding&amp;utm_content=bio_link" target="_blank" rel="noopener noreferrer" class="wheel-center-link" aria-label="Miyako Home - Vietbeauties">
        <circle cx="${cx}" cy="${cy}" r="${rInner - 4}" class="wheel-center-circle" />
        <image
          href="assets/logo-miyako.png"
          x="${cx - 48}"
          y="${cy - 48}"
          width="96"
          height="96"
          clip-path="url(#wheel-center-clip)"
          preserveAspectRatio="xMidYMid meet"
          class="wheel-center-logo"
        />
      </a>
    `;

    wheelSvg.innerHTML = svgContent;

    function updateHoverCardPos(e) {
      if (!wheelBox || !wheelHoverCard) return;
      const rect = wheelBox.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const tipW = wheelHoverCard.offsetWidth || 180;
      const tipH = wheelHoverCard.offsetHeight || 44;

      let left = x - tipW / 2;
      let top = y - tipH - 12;

      // Keep within bounds of wheel-box
      if (left < 8) left = 8;
      if (left + tipW > rect.width - 8) left = rect.width - tipW - 8;
      if (top < 8) top = y + 16;

      wheelHoverCard.style.left = `${left}px`;
      wheelHoverCard.style.top = `${top}px`;
    }

    wheelSvg.querySelectorAll(".wheel-slice").forEach((el) => {
      el.addEventListener("click", () => {
        SoundFX.playWheelSelect();
        hasClickedWheel = true;
        activeFamilyId = el.dataset.family;
        renderWheel();
        renderShelfNotes();
        const pickedCount = Object.values(slots).filter((s) =>
          Boolean(s.note),
        ).length;
        const pouredCount = Object.values(slots).filter((s) => s.poured).length;
        updateGestureTutorials(pickedCount, pouredCount);
      });

      el.addEventListener("mouseenter", (e) => {
        SoundFX.playHoverTick();
        const fam = FRAGRANCE_FAMILIES.find((f) => f.id === el.dataset.family);
        if (!fam || !wheelHoverCard) return;
        if (wheelHoverTitle) wheelHoverTitle.textContent = fam.name;
        if (wheelHoverDesc) wheelHoverDesc.textContent = fam.desc;
        wheelHoverCard.classList.add("visible");
        updateHoverCardPos(e);
      });

      el.addEventListener("mousemove", (e) => {
        updateHoverCardPos(e);
      });

      el.addEventListener("mouseleave", () => {
        if (wheelHoverCard) wheelHoverCard.classList.remove("visible");
      });
    });

    wheelSvg.addEventListener("mouseleave", () => {
      if (wheelHoverCard) wheelHoverCard.classList.remove("visible");
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
          : selectedSlotLayer
            ? `+ Chọn cho ${getLayerShortName(selectedSlotLayer)}`
            : "+ Chọn lọ mẫu";

        return `
          <button type="button" class="note-pick-btn ${assignedEntry ? "picked" : ""}" data-note-id="${note.id}" title="${note.name}">
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
    const existingLayer = Object.keys(slots).find(
      (k) => slots[k].note && slots[k].note.id === noteId,
    );

    // If user clicked a specific glowing vial slot in Column 2 first, assign directly to that slot
    if (selectedSlotLayer) {
      const noteObj = findNoteById(noteId);
      if (!noteObj) return;

      if (existingLayer === selectedSlotLayer) {
        selectedSlotLayer = null;
        updateAllColumns();
        return;
      }

      if (existingLayer) {
        const prevTargetNote = slots[selectedSlotLayer].note;
        slots[existingLayer] = {
          note: prevTargetNote || null,
          poured: false,
        };
      }

      slots[selectedSlotLayer] = {
        note: noteObj,
        poured: false,
      };
      SoundFX.playVialPick(true);
      selectedSlotLayer = null;
      updateAllColumns();
      return;
    }

    // Check if already picked -> remove it
    if (existingLayer) {
      SoundFX.playVialPick(false);
      slots[existingLayer] = { note: null, poured: false };
      updateAllColumns();
      return;
    }

    const noteObj = findNoteById(noteId);
    if (!noteObj) return;

    SoundFX.playVialPick(true);

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
    SoundFX.playLiquidPour();

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

  function spawnAromaBubbles(color, container = particlesBox) {
    if (!container) return;
    for (let i = 0; i < 10; i++) {
      const b = document.createElement("span");
      b.className = "aroma-bubble";
      b.style.backgroundColor = color;
      b.style.boxShadow = `0 0 8px ${color}`;
      b.style.left = `${38 + Math.random() * 24}%`;
      b.style.animationDelay = `${i * 65}ms`;
      container.appendChild(b);
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

      const isSelectedTarget = selectedSlotLayer === layer;
      const slotWrap = vialEl.closest(".vial-slot-wrap");
      vialEl.classList.remove("empty", "ready", "poured");
      vialEl.classList.toggle("is-selected-slot", isSelectedTarget);
      if (slotWrap) {
        slotWrap.classList.toggle("is-selected-slot", isSelectedTarget);
      }

      if (!slot.note) {
        vialEl.classList.add("empty");
        vialEl.setAttribute("draggable", "false");
        liquidEl.style.backgroundColor = "transparent";
        iconEl.textContent = "＋";
        nameEl.textContent = "Chưa chọn";
        statusEl.textContent = isSelectedTarget
          ? "✨ Chọn hương ở cột 1"
          : "Bấm để chọn hương";
      } else if (!slot.poured) {
        vialEl.classList.add("ready");
        vialEl.setAttribute("draggable", "true");
        liquidEl.style.backgroundColor = slot.note.color;
        iconEl.textContent = slot.note.icon;
        nameEl.textContent = slot.note.name;
        statusEl.textContent = isSelectedTarget
          ? "✨ Chọn hương ở cột 1"
          : "Kéo thả / Bấm để rót";
      } else {
        vialEl.classList.add("poured");
        vialEl.setAttribute("draggable", "true");
        liquidEl.style.backgroundColor = slot.note.color;
        iconEl.textContent = "✓";
        nameEl.textContent = slot.note.name;
        statusEl.textContent = isSelectedTarget
          ? "✨ Chọn hương ở cột 1"
          : "Đã rót · Bấm để đổi";
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

    // Desktop subtle step-by-step glow guide (Col 1 -> Col 2 -> Col 3)
    const guideStep1 =
      !isBrewingMagic && (selectedSlotLayer !== null || pickedCount < 3);
    const guideStep2 =
      !isBrewingMagic &&
      selectedSlotLayer === null &&
      pickedCount === 3 &&
      pouredCount < 3;
    const guideStep3 =
      !isBrewingMagic && selectedSlotLayer === null && pouredCount === 3;
    if (colWheel) colWheel.classList.toggle("guide-step-active", guideStep1);
    if (colAlchemy) colAlchemy.classList.toggle("guide-step-active", guideStep2);
    if (colBespoke) colBespoke.classList.toggle("guide-step-active", guideStep3);

    if (pickedCount < 3) {
      craftBtn.disabled = true;
      craftBtn.textContent = `🔒 Chọn thêm ${3 - pickedCount} lọ hương mẫu ở Cột 1`;
    } else if (pouredCount < 3) {
      craftBtn.disabled = false;
      craftBtn.textContent = "⚡ Rót Nốt & Giải Mã Mùi Hương";
    } else {
      craftBtn.disabled = false;
      craftBtn.textContent = "✦ Lắc Bình & Giải Mã Bản Ngã ✦";
    }

    updateGestureTutorials(pickedCount, pouredCount);
  }

  function cancelAnimList(list) {
    list.forEach((anim) => {
      try {
        anim.cancel();
      } catch {
        // Ignore if already finished
      }
    });
    return [];
  }

  function playSingleTapAnimation(x, y) {
    step1Anims = cancelAnimList(step1Anims);
    if (!tutorialStep1) return;
    const hand = tutorialStep1.querySelector(".gesture-hand-step1");
    const rA = tutorialStep1.querySelector(".gesture-ripple-s1a");
    const rB = tutorialStep1.querySelector(".gesture-ripple-s1b");
    if (rB) rB.style.opacity = "0";
    if (tutorialStep1Path) tutorialStep1Path.setAttribute("d", "");

    const dur = 1500;
    if (hand && hand.animate) {
      step1Anims.push(
        hand.animate(
          [
            {
              offset: 0,
              opacity: 0.92,
              transform: `translate3d(${x}px, ${y}px, 0) scale(1)`,
            },
            {
              offset: 0.3,
              opacity: 1,
              transform: `translate3d(${x}px, ${y}px, 0) scale(1)`,
            },
            {
              offset: 0.45,
              opacity: 1,
              transform: `translate3d(${x}px, ${y}px, 0) scale(0.8)`,
            },
            {
              offset: 0.65,
              opacity: 1,
              transform: `translate3d(${x}px, ${y}px, 0) scale(1)`,
            },
            {
              offset: 1,
              opacity: 0.92,
              transform: `translate3d(${x}px, ${y}px, 0) scale(1)`,
            },
          ],
          { duration: dur, iterations: Infinity, easing: "ease-in-out" },
        ),
      );
    }

    if (rA && rA.animate) {
      step1Anims.push(
        rA.animate(
          [
            {
              offset: 0,
              opacity: 0,
              transform: `translate3d(${x}px, ${y}px, 0) scale(0.45)`,
            },
            {
              offset: 0.38,
              opacity: 0,
              transform: `translate3d(${x}px, ${y}px, 0) scale(0.45)`,
            },
            {
              offset: 0.5,
              opacity: 0.95,
              transform: `translate3d(${x}px, ${y}px, 0) scale(0.95)`,
            },
            {
              offset: 0.9,
              opacity: 0,
              transform: `translate3d(${x}px, ${y}px, 0) scale(1.8)`,
            },
            {
              offset: 1,
              opacity: 0,
              transform: `translate3d(${x}px, ${y}px, 0) scale(1.8)`,
            },
          ],
          { duration: dur, iterations: Infinity, easing: "ease-out" },
        ),
      );
    }
  }

  function playStep2Animation(x1, y1, x2, y2) {
    step2Anims = cancelAnimList(step2Anims);
    if (!tutorialStep2) return;
    const hand = tutorialStep2.querySelector(".gesture-hand-step2");
    const ghostVial = tutorialStep2.querySelector(".gesture-ghost-vial");
    const rStart = tutorialStep2.querySelector(".gesture-ripple-s2-start");
    const rEnd = tutorialStep2.querySelector(".gesture-ripple-s2-end");
    const dur = 2600;
    const cx = Math.round((x1 + x2) / 2 - 24);
    const cy = Math.round((y1 + y2) / 2);

    if (hand && hand.animate) {
      step2Anims.push(
        hand.animate(
          [
            {
              offset: 0,
              opacity: 0,
              transform: `translate3d(${x1}px, ${y1}px, 0) scale(1.08)`,
            },
            {
              offset: 0.12,
              opacity: 1,
              transform: `translate3d(${x1}px, ${y1}px, 0) scale(1)`,
            },
            {
              offset: 0.22,
              opacity: 1,
              transform: `translate3d(${x1}px, ${y1}px, 0) scale(0.84)`,
            },
            {
              offset: 0.44,
              opacity: 1,
              transform: `translate3d(${cx}px, ${cy}px, 0) rotate(-10deg) scale(0.88)`,
            },
            {
              offset: 0.66,
              opacity: 1,
              transform: `translate3d(${x2}px, ${y2}px, 0) rotate(-22deg) scale(0.9)`,
            },
            {
              offset: 0.78,
              opacity: 1,
              transform: `translate3d(${x2}px, ${y2}px, 0) rotate(-22deg) scale(1)`,
            },
            {
              offset: 0.92,
              opacity: 0,
              transform: `translate3d(${x2}px, ${y2}px, 0) scale(1)`,
            },
            {
              offset: 1,
              opacity: 0,
              transform: `translate3d(${x1}px, ${y1}px, 0) scale(1)`,
            },
          ],
          { duration: dur, iterations: Infinity, easing: "ease-in-out" },
        ),
      );
    }

    if (ghostVial && ghostVial.animate) {
      step2Anims.push(
        ghostVial.animate(
          [
            { offset: 0, opacity: 0, transform: "scale(0.8)" },
            { offset: 0.16, opacity: 0, transform: "scale(0.8)" },
            { offset: 0.22, opacity: 1, transform: "scale(1)" },
            { offset: 0.72, opacity: 1, transform: "scale(1)" },
            { offset: 0.84, opacity: 0, transform: "scale(0.7)" },
            { offset: 1, opacity: 0, transform: "scale(0.7)" },
          ],
          { duration: dur, iterations: Infinity, easing: "ease-in-out" },
        ),
      );
    }

    if (rStart && rStart.animate) {
      step2Anims.push(
        rStart.animate(
          [
            {
              offset: 0,
              opacity: 0,
              transform: `translate3d(${x1}px, ${y1}px, 0) scale(0.5)`,
            },
            {
              offset: 0.14,
              opacity: 0,
              transform: `translate3d(${x1}px, ${y1}px, 0) scale(0.5)`,
            },
            {
              offset: 0.2,
              opacity: 0.9,
              transform: `translate3d(${x1}px, ${y1}px, 0) scale(0.9)`,
            },
            {
              offset: 0.34,
              opacity: 0,
              transform: `translate3d(${x1}px, ${y1}px, 0) scale(1.5)`,
            },
            {
              offset: 1,
              opacity: 0,
              transform: `translate3d(${x1}px, ${y1}px, 0) scale(1.5)`,
            },
          ],
          { duration: dur, iterations: Infinity, easing: "ease-out" },
        ),
      );
    }

    if (rEnd && rEnd.animate) {
      step2Anims.push(
        rEnd.animate(
          [
            {
              offset: 0,
              opacity: 0,
              transform: `translate3d(${x2}px, ${y2}px, 0) scale(0.5)`,
            },
            {
              offset: 0.64,
              opacity: 0,
              transform: `translate3d(${x2}px, ${y2}px, 0) scale(0.5)`,
            },
            {
              offset: 0.7,
              opacity: 0.95,
              transform: `translate3d(${x2}px, ${y2}px, 0) scale(0.95)`,
            },
            {
              offset: 0.9,
              opacity: 0,
              transform: `translate3d(${x2}px, ${y2}px, 0) scale(1.9)`,
            },
            {
              offset: 1,
              opacity: 0,
              transform: `translate3d(${x2}px, ${y2}px, 0) scale(1.9)`,
            },
          ],
          { duration: dur, iterations: Infinity, easing: "ease-out" },
        ),
      );
    }
  }

  function updateGestureTutorials(pickedCount, pouredCount) {
    if (pickedCount > 0) hasLearnedStep1 = true;
    if (pouredCount > 0) hasLearnedStep2 = true;

    const showStep1 =
      !hasLearnedStep1 && pickedCount === 0 && !isBrewingMagic && colWheel;
    const showStep2 =
      !hasLearnedStep2 &&
      pickedCount >= 1 &&
      pouredCount === 0 &&
      !isBrewingMagic &&
      colAlchemy;

    if (tutorialStep1) {
      tutorialStep1.hidden = !showStep1;
      if (!showStep1) {
        step1Anims = cancelAnimList(step1Anims);
      } else {
        requestAnimationFrame(() => {
          const colRect = colWheel.getBoundingClientRect();
          if (!colRect.width || !colRect.height) return;

          if (!hasClickedWheel) {
            // Stage 1A: Suggest clicking a fragrance family on the wheel
            const sliceTarget =
              colWheel.querySelector('.wheel-slice[data-family="woody"]') ||
              wheelBox;
            let x = colRect.width * 0.64;
            let y = colRect.height * 0.36;
            if (sliceTarget) {
              const r = sliceTarget.getBoundingClientRect();
              if (r.width && r.height) {
                x = r.left - colRect.left + r.width * 0.56;
                y = r.top - colRect.top + r.height * 0.52;
              }
            }
            playSingleTapAnimation(Math.round(x), Math.round(y));
          } else {
            // Stage 1B: After clicking a wheel family, suggest clicking a sub-note below
            const noteTarget = notesGrid.querySelector(".note-pick-btn");
            let x = colRect.width * 0.34;
            let y = colRect.height * 0.78;
            if (noteTarget) {
              const r = noteTarget.getBoundingClientRect();
              if (r.width && r.height) {
                x = r.left - colRect.left + r.width * 0.52;
                y = r.top - colRect.top + r.height * 0.52;
              }
            }
            playSingleTapAnimation(Math.round(x), Math.round(y));
          }
        });
      }
    }

    if (tutorialStep2) {
      tutorialStep2.hidden = !showStep2;
      if (!showStep2) {
        step2Anims = cancelAnimList(step2Anims);
      } else {
        requestAnimationFrame(() => {
          const colRect = colAlchemy.getBoundingClientRect();
          if (!colRect.width || !colRect.height) return;

          const vialTarget =
            colAlchemy.querySelector(".sample-vial.ready") ||
            document.getElementById("vial-top");
          const flaskTarget = document.getElementById("mixing-flask-svg");

          let x1 = colRect.width * 0.22;
          let y1 = colRect.height * 0.25;
          if (vialTarget) {
            const r1 = vialTarget.getBoundingClientRect();
            if (r1.width && r1.height) {
              x1 = r1.left - colRect.left + r1.width * 0.5;
              y1 = r1.top - colRect.top + r1.height * 0.52;
            }
          }

          let x2 = colRect.width * 0.5;
          let y2 = colRect.height * 0.56;
          if (flaskTarget) {
            const r2 = flaskTarget.getBoundingClientRect();
            if (r2.width && r2.height) {
              x2 = r2.left - colRect.left + r2.width * 0.5;
              y2 = r2.top - colRect.top + r2.height * 0.22;
            }
          }

          const rx1 = Math.round(x1);
          const ry1 = Math.round(y1);
          const rx2 = Math.round(x2);
          const ry2 = Math.round(y2);
          playStep2Animation(rx1, ry1, rx2, ry2);
        });
      }
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
    // Square bottle interior goes from y=120 to y=208 (total height = 88px)
    const totalHeight = 88;
    const sum =
      selectedFormula.top + selectedFormula.heart + selectedFormula.base;

    const hTop = Math.round((selectedFormula.top / sum) * totalHeight);
    const hHeart = Math.round((selectedFormula.heart / sum) * totalHeight);
    const hBase = totalHeight - hTop - hHeart;

    const rectTop = document.getElementById("final-liquid-top");
    const rectHeart = document.getElementById("final-liquid-heart");
    const rectBase = document.getElementById("final-liquid-base");

    const startY = 120;
    rectTop.setAttribute("y", startY);
    rectTop.setAttribute("height", hTop);
    rectTop.setAttribute(
      "fill",
      slots.top.note ? slots.top.note.color : "#3a2b22",
    );
    rectTop.setAttribute("fill-opacity", slots.top.note ? "0.84" : "0.25");

    rectHeart.setAttribute("y", startY + hTop);
    rectHeart.setAttribute("height", hHeart);
    rectHeart.setAttribute(
      "fill",
      slots.heart.note ? slots.heart.note.color : "#3a2b22",
    );
    rectHeart.setAttribute("fill-opacity", slots.heart.note ? "0.88" : "0.3");

    rectBase.setAttribute("y", startY + hTop + hHeart);
    rectBase.setAttribute("height", hBase);
    rectBase.setAttribute(
      "fill",
      slots.base.note ? slots.base.note.color : "#3a2b22",
    );
    rectBase.setAttribute("fill-opacity", slots.base.note ? "0.92" : "0.35");

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

  function selectTargetSlot(layer) {
    if (!slots[layer]) return;
    selectedSlotLayer = selectedSlotLayer === layer ? null : layer;
    SoundFX.playWheelSelect();
    updateAllColumns();

    if (
      selectedSlotLayer &&
      window.matchMedia("(max-width: 1024px)").matches &&
      colWheel
    ) {
      colWheel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  function removeVialSlot(layer) {
    if (!layer || !slots[layer] || !slots[layer].note) return;
    SoundFX.playVialPick(false);
    slots[layer] = { note: null, poured: false };
    if (selectedSlotLayer === layer) selectedSlotLayer = null;
    updateAllColumns();
  }

  let dragStartY = 0;
  let isDiscardArmed = false;
  let dragHandled = false;
  let dragCancelled = false;
  let touchGhostEl = null;

  function showDiscardZone() {
    if (!vialDiscardZone) return;
    vialDiscardZone.hidden = false;
    vialDiscardZone.classList.remove("is-active");
    const iconSpan = vialDiscardZone.querySelector(".discard-zone-icon");
    if (iconSpan) iconSpan.textContent = "↑";
    if (vialDiscardText) {
      vialDiscardText.textContent = "Kéo lên trên để bỏ hương này";
    }
  }

  function setDiscardArmed(armed, layer) {
    isDiscardArmed = Boolean(armed);
    const noteName =
      layer && slots[layer] && slots[layer].note ? slots[layer].note.name : "";
    if (vialDiscardZone) {
      vialDiscardZone.classList.toggle("is-active", isDiscardArmed);
      const iconSpan = vialDiscardZone.querySelector(".discard-zone-icon");
      if (iconSpan) iconSpan.textContent = isDiscardArmed ? "✕" : "↑";
      if (vialDiscardText) {
        vialDiscardText.textContent = isDiscardArmed
          ? `Thả ra để bỏ "${noteName}"`
          : "Kéo lên trên để bỏ hương này";
      }
    }
    document.querySelectorAll(".sample-vial").forEach((el) => {
      el.classList.toggle("is-discard-armed", isDiscardArmed && el.dataset.layer === layer);
    });
    if (touchGhostEl) {
      touchGhostEl.classList.toggle("is-discard", isDiscardArmed);
    }
  }

  function resetVialDragUI() {
    if (vialDiscardZone) {
      vialDiscardZone.hidden = true;
      vialDiscardZone.classList.remove("is-active");
    }
    document
      .querySelectorAll(".sample-vial")
      .forEach((el) => el.classList.remove("is-discard-armed"));
    dropzone.classList.remove("drag-over");
    if (touchGhostEl) {
      touchGhostEl.remove();
      touchGhostEl = null;
    }
    draggedLayer = null;
    isDiscardArmed = false;
    dragStartY = 0;
  }

  function isPointInUpwardDiscard(clientX, clientY, startY, overDropzone) {
    if (overDropzone) return false;
    if (vialDiscardZone && !vialDiscardZone.hidden) {
      const dzRect = vialDiscardZone.getBoundingClientRect();
      if (
        clientX >= dzRect.left - 24 &&
        clientX <= dzRect.right + 24 &&
        clientY > 0 &&
        clientY <= dzRect.bottom + 8
      ) {
        return true;
      }
    }
    const trayRect = vialsTray ? vialsTray.getBoundingClientRect() : null;
    const aboveTray = trayRect && clientY > 0 && clientY < trayRect.top - 22;
    const draggedUpFar =
      clientY > 0 && startY > 0 && startY - clientY >= 68;
    return Boolean(aboveTray || draggedUpFar);
  }

  // Drag & Drop + Touch + Click Event Listeners for Sample Vials
  ["top", "heart", "base"].forEach((layer) => {
    const vialEl = document.getElementById(`vial-${layer}`);

    vialEl.addEventListener("dragstart", (e) => {
      if (!slots[layer].note) {
        e.preventDefault();
        return;
      }
      hasLearnedStep2 = true;
      if (tutorialStep2) tutorialStep2.hidden = true;
      draggedLayer = layer;
      dragStartY = e.clientY || 0;
      dragHandled = false;
      dragCancelled = false;
      isDiscardArmed = false;
      e.dataTransfer.setData("text/plain", layer);
      e.dataTransfer.effectAllowed = "move";
      showDiscardZone();
    });

    vialEl.addEventListener("dragend", () => {
      if (!dragHandled && !dragCancelled && isDiscardArmed && draggedLayer) {
        dragHandled = true;
        const layerToRemove = draggedLayer;
        resetVialDragUI();
        removeVialSlot(layerToRemove);
      } else {
        resetVialDragUI();
      }
    });

    // Touch drag support (down to pour into flask, or up far to discard)
    let touchState = null;

    vialEl.addEventListener(
      "touchstart",
      (e) => {
        if (!slots[layer].note || e.touches.length !== 1) return;
        const t = e.touches[0];
        touchState = {
          startX: t.clientX,
          startY: t.clientY,
          lastX: t.clientX,
          lastY: t.clientY,
          active: false,
        };
      },
      { passive: true },
    );

    vialEl.addEventListener(
      "touchmove",
      (e) => {
        if (!touchState || e.touches.length !== 1 || !slots[layer].note) return;
        const t = e.touches[0];
        touchState.lastX = t.clientX;
        touchState.lastY = t.clientY;
        const dx = t.clientX - touchState.startX;
        const dy = t.clientY - touchState.startY;
        if (!touchState.active && Math.hypot(dx, dy) > 14) {
          touchState.active = true;
          hasLearnedStep2 = true;
          if (tutorialStep2) tutorialStep2.hidden = true;
          draggedLayer = layer;
          dragStartY = touchState.startY;
          showDiscardZone();
          touchGhostEl = document.createElement("div");
          touchGhostEl.className = "vial-touch-ghost";
          touchGhostEl.textContent = `${slots[layer].note.icon} ${slots[layer].note.name}`;
          document.body.appendChild(touchGhostEl);
        }
        if (!touchState.active) return;
        e.preventDefault();
        if (touchGhostEl) {
          touchGhostEl.style.left = `${t.clientX}px`;
          touchGhostEl.style.top = `${t.clientY}px`;
        }
        const dzRect = dropzone.getBoundingClientRect();
        const overDropzone =
          t.clientX >= dzRect.left &&
          t.clientX <= dzRect.right &&
          t.clientY >= dzRect.top &&
          t.clientY <= dzRect.bottom;
        const canPour = overDropzone && !slots[layer].poured;
        dropzone.classList.toggle("drag-over", canPour);
        setDiscardArmed(
          isPointInUpwardDiscard(t.clientX, t.clientY, touchState.startY, overDropzone),
          layer,
        );
      },
      { passive: false },
    );

    vialEl.addEventListener("touchend", (e) => {
      if (!touchState) return;
      const wasActive = touchState.active;
      const endX = touchState.lastX;
      const endY = touchState.lastY;
      touchState = null;
      if (!wasActive) return;

      e.preventDefault();
      const dzRect = dropzone.getBoundingClientRect();
      const overDropzone =
        endX >= dzRect.left &&
        endX <= dzRect.right &&
        endY >= dzRect.top &&
        endY <= dzRect.bottom;
      const shouldDiscard = isDiscardArmed;
      resetVialDragUI();

      if (overDropzone && !slots[layer].poured) {
        pourVialIntoFlask(layer);
      } else if (shouldDiscard) {
        removeVialSlot(layer);
      }
    });

    vialEl.addEventListener("touchcancel", () => {
      if (touchState && touchState.active) {
        resetVialDragUI();
      }
      touchState = null;
    });

    function handleVialActivate() {
      if (!slots[layer].note || slots[layer].poured) {
        selectTargetSlot(layer);
      } else {
        if (selectedSlotLayer === layer) {
          selectedSlotLayer = null;
        }
        pourVialIntoFlask(layer);
      }
    }

    // Click to select/glow (empty or poured) or pour into flask (ready)
    vialEl.addEventListener("click", handleVialActivate);
    vialEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleVialActivate();
      }
    });
  });

  // Document-level DnD handlers for dragging upward to discard
  document.addEventListener("dragover", (e) => {
    if (!draggedLayer) return;
    const overDropzone = dropzone.contains(e.target);
    if (isPointInUpwardDiscard(e.clientX, e.clientY, dragStartY, overDropzone)) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      dropzone.classList.remove("drag-over");
      setDiscardArmed(true, draggedLayer);
    } else {
      setDiscardArmed(false, draggedLayer);
    }
  });

  document.addEventListener("drop", (e) => {
    if (!draggedLayer || dragHandled) return;
    if (isDiscardArmed && !dropzone.contains(e.target)) {
      e.preventDefault();
      dragHandled = true;
      const layerToRemove = draggedLayer;
      resetVialDragUI();
      removeVialSlot(layerToRemove);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && draggedLayer) {
      dragCancelled = true;
      setDiscardArmed(false, draggedLayer);
    }
  });

  // Dropzone Drag Events
  dropzone.addEventListener("dragover", (e) => {
    if (draggedLayer && (!slots[draggedLayer] || slots[draggedLayer].poured)) {
      return;
    }
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDiscardArmed(false, draggedLayer);
    dropzone.classList.add("drag-over");
  });

  dropzone.addEventListener("dragleave", () => {
    dropzone.classList.remove("drag-over");
  });

  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("drag-over");
    const layer = draggedLayer || e.dataTransfer.getData("text/plain");
    if (layer && slots[layer] && slots[layer].note && !slots[layer].poured) {
      dragHandled = true;
      resetVialDragUI();
      pourVialIntoFlask(layer);
    }
  });

  // Quick Pour All Button
  quickPourBtn.addEventListener("click", () => {
    hasLearnedStep2 = true;
    if (tutorialStep2) tutorialStep2.hidden = true;
    const unpoured = ["top", "heart", "base"].filter(
      (k) => slots[k].note && !slots[k].poured,
    );
    if (unpoured.length > 0) {
      SoundFX.playLiquidPour();
    }
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
      SoundFX.playFormulaSwitch();
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

  // Random Pick Button in HUD
  let wheelSpinAngle = 0;
  let diceSpinAngle = 0;
  document.getElementById("random-spin-btn").addEventListener("click", (e) => {
    SoundFX.playRandomSpin();
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
    selectedSlotLayer = null;

    activeFamilyId = shuffled[1].familyId;
    wheelSpinAngle += 720;
    wheelSvg.style.transform = `rotate(${wheelSpinAngle}deg) translateZ(0)`;

    const diceSvg = e.currentTarget.querySelector("svg");
    if (diceSvg) {
      diceSpinAngle += 360;
      diceSvg.style.transform = `rotate(${diceSpinAngle}deg)`;
    }

    renderWheel();
    updateAllColumns();
  });

  // Reset Board Button
  function resetGame() {
    slots.top = { note: null, poured: false };
    slots.heart = { note: null, poured: false };
    slots.base = { note: null, poured: false };
    selectedSlotLayer = null;
    resultModal.hidden = true;
    if (mobileBrewOverlay) {
      mobileBrewOverlay.hidden = true;
      mobileBrewOverlay.classList.remove("brewing-magic");
    }
    if (mobileBrewFlaskSvg) {
      mobileBrewFlaskSvg.classList.remove("flask-shake");
    }
    document.body.classList.remove("brew-overlay-open");
    updateAllColumns();
  }

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

  // Spawn Magic Alchemy Sparkles during Flask Shake
  function spawnMagicSparkles(colors, count = 16, container = particlesBox) {
    if (!container) return;
    const glyphs = ["✦", "✧", "⋆", "✵", "✺"];
    for (let i = 0; i < count; i++) {
      const sp = document.createElement("span");
      sp.className = "magic-sparkle";
      sp.textContent = glyphs[i % glyphs.length];
      const angle = Math.random() * Math.PI * 2;
      const dist = 48 + Math.random() * 88;
      const tx = Math.round(Math.cos(angle) * dist);
      const ty = Math.round(Math.sin(angle) * dist - 14);
      const color = colors[i % colors.length] || "#f3c878";
      sp.style.setProperty("--tx", `${tx}px`);
      sp.style.setProperty("--ty", `${ty}px`);
      sp.style.setProperty("--dur", `${0.85 + Math.random() * 0.55}s`);
      sp.style.setProperty("--sparkle-color", color);
      sp.style.fontSize = `${11 + Math.round(Math.random() * 9)}px`;
      sp.style.animationDelay = `${Math.round(Math.random() * 180)}ms`;
      container.appendChild(sp);
      setTimeout(() => sp.remove(), 1600);
    }
  }

  function syncMobileBrewFlask() {
    if (!mobileBrewOverlay) return;
    [
      ["flask-layer-base", "mobile-flask-layer-base"],
      ["flask-layer-heart", "mobile-flask-layer-heart"],
      ["flask-layer-top", "mobile-flask-layer-top"],
    ].forEach(([srcId, dstId]) => {
      const src = document.getElementById(srcId);
      const dst = document.getElementById(dstId);
      if (src && dst) {
        dst.setAttribute("y", src.getAttribute("y") || "244");
        dst.setAttribute("height", src.getAttribute("height") || "0");
        dst.setAttribute("fill", src.getAttribute("fill") || "#d49b38");
      }
    });

    const srcMeniscus = document.getElementById("flask-meniscus");
    const dstMeniscus = document.getElementById("mobile-flask-meniscus");
    if (srcMeniscus && dstMeniscus) {
      dstMeniscus.setAttribute("cy", srcMeniscus.getAttribute("cy") || "244");
      dstMeniscus.setAttribute(
        "opacity",
        srcMeniscus.getAttribute("opacity") || "0",
      );
    }

    if (mobileBrewNotes) {
      mobileBrewNotes.innerHTML = [
        `${slots.top.note.icon} ${slots.top.note.name} (${selectedFormula.top}%)`,
        `${slots.heart.note.icon} ${slots.heart.note.name} (${selectedFormula.heart}%)`,
        `${slots.base.note.icon} ${slots.base.note.name} (${selectedFormula.base}%)`,
      ]
        .map((label) => `<span class="mobile-brew-note-pill">${label}</span>`)
        .join("");
    }
  }

  // Final Craft & Open Pop-up Modal
  craftBtn.addEventListener("click", () => {
    if (
      isBrewingMagic ||
      !slots.top.note ||
      !slots.heart.note ||
      !slots.base.note
    ) {
      return;
    }

    isBrewingMagic = true;
    selectedSlotLayer = null;

    // Auto-pour any unpoured vials first
    ["top", "heart", "base"].forEach((k) => {
      if (!slots[k].poured) {
        slots[k].poured = true;
        spawnAromaBubbles(slots[k].note.color);
      }
    });
    updateAllColumns();

    const noteColors = [
      slots.top.note.color,
      slots.heart.note.color,
      slots.base.note.color,
      "#f3c878",
    ];

    const flaskSvg = document.getElementById("mixing-flask-svg");
    const finalBottleSvg = document.getElementById("final-bottle-svg");
    const useMobileOverlay =
      window.matchMedia("(max-width: 1024px)").matches &&
      Boolean(mobileBrewOverlay);

    // Lock button & start multi-stage magic alchemy sequence (2.75s)
    SoundFX.playMagicAlchemyRitual();
    craftBtn.disabled = true;
    craftBtn.textContent = "✨ Đang lắc bình & hòa quyện phép thuật...";
    dropzoneHint.textContent =
      "✨ Đang kích hoạt vòng tròn giả kim & lắc đều 3 tầng hương...";

    dropzone.classList.add("brewing-magic");
    flaskSvg.classList.remove("flask-shake");
    void flaskSvg.offsetWidth;
    flaskSvg.classList.add("flask-shake");

    if (useMobileOverlay) {
      syncMobileBrewFlask();
      if (mobileBrewStatus) {
        mobileBrewStatus.textContent =
          "✨ Đang kích hoạt vòng tròn giả kim & lắc đều 3 tầng hương...";
      }
      mobileBrewOverlay.hidden = false;
      document.body.classList.add("brew-overlay-open");
      mobileBrewOverlay.classList.add("brewing-magic");
      if (mobileBrewFlaskSvg) {
        mobileBrewFlaskSvg.classList.remove("flask-shake");
        void mobileBrewFlaskSvg.offsetWidth;
        mobileBrewFlaskSvg.classList.add("flask-shake");
      }
    }

    // Wave 1: Initial levitation & rune activation
    spawnMagicSparkles(noteColors, 14);
    spawnAromaBubbles(slots.top.note.color);
    if (useMobileOverlay) {
      spawnMagicSparkles(noteColors, 14, mobileBrewParticles);
      spawnAromaBubbles(slots.top.note.color, mobileBrewParticles);
    }

    // Wave 2: Vigorous rhythmic shaking
    setTimeout(() => {
      const msg2 = "🌟 Đang hòa quyện tinh hoa theo công thức tỷ lệ...";
      dropzoneHint.textContent = msg2;
      spawnMagicSparkles(noteColors, 18);
      spawnAromaBubbles(slots.heart.note.color);
      if (useMobileOverlay) {
        if (mobileBrewStatus) mobileBrewStatus.textContent = msg2;
        spawnMagicSparkles(noteColors, 18, mobileBrewParticles);
        spawnAromaBubbles(slots.heart.note.color, mobileBrewParticles);
      }
    }, 750);

    // Wave 3: Peak alchemical swirling
    setTimeout(() => {
      spawnMagicSparkles(noteColors, 20);
      spawnAromaBubbles(slots.base.note.color);
      if (useMobileOverlay) {
        spawnMagicSparkles(noteColors, 20, mobileBrewParticles);
        spawnAromaBubbles(slots.base.note.color, mobileBrewParticles);
      }
    }, 1450);

    // Wave 4: Climactic golden transmutation & shockwave burst
    setTimeout(() => {
      const msg4 = "✦ Kết tinh mùi hương độc bản hoàn tất! ✦";
      dropzoneHint.textContent = msg4;
      craftBtn.textContent = "✦ Đã giải mã bản ngã! ✦";
      spawnMagicSparkles(["#fff8ee", "#f3c878", ...noteColors], 26);
      if (useMobileOverlay) {
        if (mobileBrewStatus) mobileBrewStatus.textContent = msg4;
        spawnMagicSparkles(
          ["#fff8ee", "#f3c878", ...noteColors],
          26,
          mobileBrewParticles,
        );
      }
      if (finalBottleSvg) {
        finalBottleSvg.classList.remove("bottle-enchanted");
        void finalBottleSvg.offsetWidth;
        finalBottleSvg.classList.add("bottle-enchanted");
      }
    }, 2100);

    // Complete ritual & open Result Modal
    setTimeout(() => {
      flaskSvg.classList.remove("flask-shake");
      dropzone.classList.remove("brewing-magic");
      if (mobileBrewOverlay) {
        mobileBrewOverlay.hidden = true;
        mobileBrewOverlay.classList.remove("brewing-magic");
      }
      if (mobileBrewFlaskSvg) {
        mobileBrewFlaskSvg.classList.remove("flask-shake");
      }
      document.body.classList.remove("brew-overlay-open");
      if (finalBottleSvg) {
        finalBottleSvg.classList.remove("bottle-enchanted");
      }
      isBrewingMagic = false;
      updateAllColumns();
      openResultModal();
    }, 2750);
  });

  let currentCustomScentName = "";
  let currentMatchResult = null;

  function applyCustomScentName(newName) {
    const clean = (newName || "").trim();
    if (!clean) return;
    currentCustomScentName = clean;

    const scentNameEl = document.getElementById("result-scent-name");
    if (scentNameEl) scentNameEl.textContent = `“${clean}”`;
    if (finalBottleRatio) {
      finalBottleRatio.textContent = clean.toUpperCase().slice(0, 22);
    }

    const primaryActionLink = document.getElementById(
      "modal-primary-action-link",
    );
    if (
      primaryActionLink &&
      currentMatchResult &&
      !currentMatchResult.isMatched
    ) {
      primaryActionLink.href = buildCustomProductOrderUrl(clean);
    }

    const saveBtn = document.getElementById("save-custom-name-btn");
    if (saveBtn) {
      const prev = saveBtn.textContent;
      saveBtn.textContent = "✓ Đã lưu tên mùi hương!";
      setTimeout(() => {
        saveBtn.textContent = prev;
      }, 1800);
    }
  }

  function openResultModal() {
    const top = slots.top.note;
    const heart = slots.heart.note;
    const base = slots.base.note;

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

    const generatedPoeticName = `${heart.prefix} & ${base.suffix}`;
    currentCustomScentName = "";

    const archetype = resolvePersonaStory(
      avgScores,
      top,
      heart,
      base,
      selectedFormula,
    );

    // Match user's 3 chosen notes against the 47 real Miyako Home products
    const matchResult = findMatchingProduct(top, heart, base);
    currentMatchResult = matchResult;
    const prod = matchResult.product;

    const modalKicker = document.getElementById("modal-kicker");
    const namingBox = document.getElementById("bespoke-naming-box");
    const nameInput = document.getElementById("custom-scent-name-input");
    const suggestChipsEl = document.getElementById("naming-suggest-chips");
    const productCard = document.getElementById("modal-product-card");
    const matchEyebrow = document.getElementById("match-eyebrow");
    const matchScoreBadge = document.getElementById("match-score-badge");
    const matchThumb = document.getElementById("match-thumb");
    const matchVessel = document.getElementById("match-vessel");
    const matchCollection = document.getElementById("match-collection");
    const matchPriceRange = document.getElementById("match-price-range");
    const matchPyramid = document.getElementById("match-pyramid");
    const matchVolumes = document.getElementById("match-volumes");
    const matchDesc = document.getElementById("match-desc");
    const matchedStoryBox = document.getElementById(
      "matched-product-story-box",
    );
    const matchedStoryName = document.getElementById(
      "matched-product-story-name",
    );
    const matchedStoryDesc = document.getElementById(
      "matched-product-story-desc",
    );
    const matchProductLink = document.getElementById("match-product-link");
    const primaryActionLink = document.getElementById(
      "modal-primary-action-link",
    );

    // Generate 2 concise poetic name suggestions for custom naming
    const poeticSuggestions = [
      generatedPoeticName,
      `${top.prefix} ${heart.prefix}`,
    ];
    if (suggestChipsEl) {
      suggestChipsEl.innerHTML = poeticSuggestions
        .map(
          (s) =>
            `<button type="button" class="suggest-chip" data-suggest="${s}">✨ ${s}</button>`,
        )
        .join("");
      suggestChipsEl.querySelectorAll(".suggest-chip").forEach((chip) => {
        chip.addEventListener("click", () => {
          const val = chip.dataset.suggest;
          if (nameInput) nameInput.value = val;
          applyCustomScentName(val);
        });
      });
    }

    if (matchResult.isMatched) {
      // CASE 1: Matches an existing Miyako Home product!
      if (modalKicker) {
        modalKicker.textContent = `✦ TƯƠNG ĐỒNG ${matchResult.matchPercent}% VỚI TUYỆT TÁC CÓ SẴN TẠI MIYAKO HOME ✦`;
      }
      document.getElementById("result-scent-name").textContent = prod.shortName;

      if (namingBox) namingBox.hidden = true;
      if (productCard) productCard.classList.add("is-exact-match");
      if (matchEyebrow) {
        matchEyebrow.textContent = "✦ SẢN PHẨM MIYAKO HOME TƯƠNG ĐỒNG";
      }
      if (matchScoreBadge) {
        matchScoreBadge.textContent = `Độ trùng khớp ${matchResult.matchPercent}%`;
      }
      if (matchProductLink) {
        matchProductLink.href = withBespokeUtm(prod.url);
        matchProductLink.textContent = "Xem chi tiết trên Vietbeauties.vn ↗";
      }
      if (primaryActionLink) {
        primaryActionLink.href = withBespokeUtm(prod.url);
        primaryActionLink.textContent = `Xem Sản Phẩm "${prod.shortName}" ↗`;
      }
      if (matchDesc) matchDesc.hidden = true;
      if (matchedStoryBox) matchedStoryBox.hidden = false;
      if (matchedStoryName) matchedStoryName.textContent = prod.shortName;
      if (matchedStoryDesc) matchedStoryDesc.textContent = prod.desc;
    } else {
      // CASE 2: Unique Bespoke Combination not yet in Miyako Home's catalog -> Let user name their scent!
      if (matchDesc) matchDesc.hidden = false;
      if (matchedStoryBox) matchedStoryBox.hidden = true;
      if (modalKicker) {
        modalKicker.textContent =
          "✦ CÔNG THỨC ĐỘC BẢN MỚI — CHƯA TỪNG CÓ TRONG BỘ SƯU TẬP ✦";
      }
      document.getElementById("result-scent-name").textContent =
        generatedPoeticName;

      if (namingBox) namingBox.hidden = false;
      if (nameInput) {
        nameInput.value = "";
        nameInput.placeholder = `VD: ${generatedPoeticName}...`;
      }
      if (productCard) productCard.classList.remove("is-exact-match");
      if (matchEyebrow) {
        matchEyebrow.textContent = "GỢI Ý SẢN PHẨM GẦN NHẤT TẠI MIYAKO";
      }
      if (matchScoreBadge) {
        matchScoreBadge.textContent = "Công thức Bespoke mới";
      }
      if (matchProductLink) {
        matchProductLink.href = withBespokeUtm(prod.url);
        matchProductLink.textContent = "Xem chi tiết trên Vietbeauties.vn ↗";
      }
      if (primaryActionLink) {
        primaryActionLink.href = buildCustomProductOrderUrl(
          generatedPoeticName,
        );
        primaryActionLink.textContent = "Đặt trải nghiệm thử miễn phí ngay ↗";
      }
    }

    document.getElementById("result-poetic-sub").textContent =
      `${top.name} (${wTop}%), ${heart.name} (${wHeart}%), ${base.name} (${wBase}%)`;

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

    // Populate Product Card Details (Real image, collection, price range, pyramid, capacities & prices)
    if (matchThumb) {
      matchThumb.onerror = () => {
        matchThumb.onerror = null;
        matchThumb.src = "assets/images/custom-06.webp";
      };
      matchThumb.src = prod.image || "assets/images/custom-06.webp";
      matchThumb.alt = prod.title || prod.shortName;
    }
    if (matchVessel) matchVessel.textContent = prod.shortName;
    if (matchCollection) matchCollection.textContent = prod.collection;
    if (matchPriceRange)
      matchPriceRange.textContent = `Giá: ${prod.priceRange}`;

    if (matchPyramid && prod.pyramid) {
      matchPyramid.innerHTML = `
        <div><strong>Hương đầu:</strong> ${prod.pyramid.top}</div>
        <div><strong>Hương giữa:</strong> ${prod.pyramid.heart}</div>
        <div><strong>Hương cuối:</strong> ${prod.pyramid.base}</div>
      `;
    }

    if (matchVolumes) {
      matchVolumes.innerHTML = (prod.volumes || [])
        .map(
          (v) =>
            `<span class="volume-pill"><strong>${v.capacity}:</strong> ${v.price}</span>`,
        )
        .join("");
    }

    if (matchDesc) matchDesc.textContent = prod.desc;

    renderRadarChart(avgScores);
    resultModal.hidden = false;
  }

  // Custom Bespoke Scent Naming Events
  const saveCustomNameBtn = document.getElementById("save-custom-name-btn");
  const customScentNameInput = document.getElementById(
    "custom-scent-name-input",
  );

  if (saveCustomNameBtn && customScentNameInput) {
    saveCustomNameBtn.addEventListener("click", () => {
      SoundFX.playFormulaSwitch();
      applyCustomScentName(customScentNameInput.value);
    });
    customScentNameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        SoundFX.playFormulaSwitch();
        applyCustomScentName(customScentNameInput.value);
      }
    });
  }

  // Drag-to-scroll & horizontal wheel scroll for volume price pills inside modal
  const matchVolumesStrip = document.getElementById("match-volumes");
  if (matchVolumesStrip) {
    let isDraggingVols = false;
    let volStartX = 0;
    let volScrollLeft = 0;

    matchVolumesStrip.addEventListener("mousedown", (e) => {
      isDraggingVols = true;
      volStartX = e.pageX - matchVolumesStrip.offsetLeft;
      volScrollLeft = matchVolumesStrip.scrollLeft;
      matchVolumesStrip.classList.add("is-dragging");
    });

    window.addEventListener("mouseup", () => {
      if (!isDraggingVols) return;
      isDraggingVols = false;
      matchVolumesStrip.classList.remove("is-dragging");
    });

    matchVolumesStrip.addEventListener("mousemove", (e) => {
      if (!isDraggingVols) return;
      e.preventDefault();
      const x = e.pageX - matchVolumesStrip.offsetLeft;
      matchVolumesStrip.scrollLeft = volScrollLeft - (x - volStartX) * 1.3;
    });

    matchVolumesStrip.addEventListener(
      "wheel",
      (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          matchVolumesStrip.scrollLeft += e.deltaY;
        }
      },
      { passive: false },
    );
  }

  // Close Modal Events
  resultModal.addEventListener("click", (e) => {
    if (e.target === resultModal) {
      resultModal.hidden = true;
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!resultModal.hidden) {
        resultModal.hidden = true;
      } else if (selectedSlotLayer) {
        selectedSlotLayer = null;
        updateAllColumns();
      }
    }
  });

  // Keep wordless tutorial trails aligned when viewport resizes or fonts finish loading
  function syncActiveTutorialCoords() {
    if (
      (tutorialStep1 && !tutorialStep1.hidden) ||
      (tutorialStep2 && !tutorialStep2.hidden)
    ) {
      const pickedCount = Object.values(slots).filter((s) =>
        Boolean(s.note),
      ).length;
      const pouredCount = Object.values(slots).filter((s) => s.poured).length;
      updateGestureTutorials(pickedCount, pouredCount);
    }
  }

  window.addEventListener("resize", syncActiveTutorialCoords);
  window.addEventListener("load", syncActiveTutorialCoords);

  // Initialize Game
  renderWheel();
  updateAllColumns();
  setTimeout(syncActiveTutorialCoords, 180);
})();
