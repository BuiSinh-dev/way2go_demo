export interface FaqItem {
  id: string;
  category: 'install' | 'compatible' | 'roaming' | 'troubleshoot' | 'payment';
  questionVi: string;
  questionEn: string;
  answerVi: string;
  answerEn: string;
}

export const FAQS_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'install',
    questionVi: 'Tôi nên cài đặt eSIM trước khi bay hay khi đến sân bay nước ngoài?',
    questionEn: 'Should I install the eSIM before flying or after landing?',
    answerVi: 'Bạn nên cài đặt eSIM (quét mã QR) từ nhà trước khi khởi hành khoảng 1-2 ngày khi có Wi-Fi ổn định. Nhưng LƯU Ý: Chỉ bật dòng "Chuyển vùng dữ liệu" (Data Roaming) của eSIM khi đã hạ cánh xuống sân bay điểm đến để gói cước bắt đầu tính ngày sử dụng chính xác.',
    answerEn: 'You should install the eSIM at home with stable Wi-Fi 1-2 days before flying. Only turn on "Data Roaming" for this eSIM once you land at your destination so validity starts accurately.'
  },
  {
    id: 'faq-2',
    category: 'install',
    questionVi: 'Cách cài đặt eSIM trên iPhone (iOS 16, 17, 18) như thế nào?',
    questionEn: 'How to install eSIM on iPhone (iOS 16, 17, 18)?',
    answerVi: 'Bước 1: Vào Cài đặt (Settings) -> Di động (Cellular) -> Thêm eSIM (Add eSIM). Bước 2: Chọn "Sử dụng mã QR" và quét mã QR do Way2Go gửi qua email. Bước 3: Đặt nhãn cho eSIM (ví dụ "Du lịch Nhật"). Bước 4: Đến nơi, bật Dữ liệu di động cho eSIM này và BẬT mục "Chuyển vùng dữ liệu" (Data Roaming).',
    answerEn: 'Step 1: Settings -> Cellular -> Add eSIM. Step 2: Select "Use QR Code" and scan the QR code received from Way2Go. Step 3: Label the plan (e.g., "Japan Trip"). Step 4: Upon arrival, set Mobile Data to this eSIM and turn ON Data Roaming.'
  },
  {
    id: 'faq-3',
    category: 'install',
    questionVi: 'Cách cài đặt eSIM trên máy Android (Samsung Galaxy, Google Pixel)?',
    questionEn: 'How to install eSIM on Android (Samsung, Google Pixel)?',
    answerVi: 'Trên Samsung: Cài đặt -> Kết nối -> Quản lý SIM -> Thêm eSIM -> Quét mã QR. Trên Google Pixel: Cài đặt -> Mạng & Internet -> SIM -> Thêm SIM -> Tải xuống thẻ SIM mới -> Quét QR. Khi đến nước sở tại, bật chuyển vùng cho SIM này.',
    answerEn: 'On Samsung: Settings -> Connections -> SIM manager -> Add eSIM -> Scan QR code. On Google Pixel: Settings -> Network & internet -> SIMs -> Add -> Download eSIM -> Scan QR.'
  },
  {
    id: 'faq-4',
    category: 'compatible',
    questionVi: 'Làm thế nào để biết điện thoại của tôi có hỗ trợ eSIM hay không?',
    questionEn: 'How can I check if my phone supports eSIM?',
    answerVi: 'Cách nhanh nhất: Mở bàn phím cuộc gọi, bấm *#06#. Nếu trên màn hình hiển thị mã EID (32 chữ số), thiết bị của bạn có hỗ trợ eSIM! Ngoài ra, iPhone từ dòng iPhone XS/XR trở lên, Samsung S20 trở lên, Google Pixel 3 trở lên đều hỗ trợ (ngoại trừ một số máy xách tay khóa mạng hoặc bản Trung Quốc 2 SIM vật lý).',
    answerEn: 'Fast check: Dial *#06#. If an EID number appears on screen, your device supports eSIM! Most iPhone XS/XR and newer, Samsung S20+, Google Pixel 3+ are compatible (excluding carrier-locked or mainland China dual-nano SIM models).'
  },
  {
    id: 'faq-5',
    category: 'roaming',
    questionVi: 'Bật Data Roaming có bị trừ tiền oan của SIM chính ở Việt Nam không?',
    questionEn: 'Will enabling Data Roaming charge my primary home SIM?',
    answerVi: 'Hoàn toàn không, nếu bạn làm đúng: Bạn chỉ bật "Chuyển vùng dữ liệu" cho thẻ eSIM Way2Go du lịch (vốn là gói trả trước cố định 100%, không bao giờ phát sinh cước). Đối với SIM chính ở Việt Nam, bạn giữ nguyên để nhận tin nhắn SMS ngân hàng/OTP miễn phí và TẮT dữ liệu di động của SIM chính.',
    answerEn: 'No, you only turn Data Roaming ON for your Way2Go travel eSIM (which is 100% prepaid with zero roaming surprises). Keep your home SIM active for free incoming bank OTP SMS while disabling mobile data on it.'
  },
  {
    id: 'faq-6',
    category: 'troubleshoot',
    questionVi: 'Tôi đã hạ cánh nhưng eSIM hiển thị "Không có dịch vụ" hoặc không vào được mạng?',
    questionEn: 'I landed but eSIM shows "No Service" or cannot connect to internet?',
    answerVi: 'Hãy kiểm tra 3 điểm sau: 1. Đã BẬT mục "Chuyển vùng dữ liệu" (Data Roaming) cho eSIM chưa? 2. Bật Chế độ máy bay (Airplane Mode) trong 10 giây rồi tắt để máy kết nối lại sóng viễn thông địa phương. 3. Nếu vẫn chưa được, vào Cài đặt di động -> Lựa chọn mạng -> Tắt "Tự động" và chọn mạng đối tác (ví dụ SoftBank ở Nhật, AIS ở Thái Lan). Đội ngũ Way2Go luôn trực 24/7 sẵn sàng hỗ trợ bạn qua Zalo/WhatsApp.',
    answerEn: 'Check 3 quick fixes: 1. Verify Data Roaming is turned ON for the eSIM. 2. Toggle Airplane Mode on/off for 10s. 3. Switch Network Selection from Automatic to manual and pick partner carrier (e.g. SoftBank in Japan). Our 24/7 support is ready on WhatsApp.'
  },
  {
    id: 'faq-7',
    category: 'payment',
    questionVi: 'Chính sách hoàn tiền của Way2Go như thế nào?',
    questionEn: 'What is the refund policy of Way2Go?',
    answerVi: 'Way2Go cam kết hoàn tiền 100% nếu: 1. Đơn hàng chưa quét cài đặt và bạn báo hủy trước chuyến đi. 2. eSIM gặp lỗi kỹ thuật từ hệ thống viễn thông mà đội ngũ hỗ trợ kỹ thuật không thể khắc phục được trong 24h. Sự an tâm của khách hàng là ưu tiên số 1 của chúng tôi.',
    answerEn: 'Way2Go guarantees 100% refund if the eSIM was uninstalled and canceled before departure, or in the rare event of technical provider failures unresolved within 24 hours.'
  }
];

export const COMPATIBLE_DEVICES = {
  apple: [
    'iPhone 16, 16 Plus, 16 Pro, 16 Pro Max',
    'iPhone 15, 15 Plus, 15 Pro, 15 Pro Max',
    'iPhone 14, 14 Plus, 14 Pro, 14 Pro Max',
    'iPhone 13, 13 mini, 13 Pro, 13 Pro Max',
    'iPhone 12, 12 mini, 12 Pro, 12 Pro Max',
    'iPhone 11, 11 Pro, 11 Pro Max',
    'iPhone XS, XS Max, XR',
    'iPhone SE (2nd & 3rd Gen)',
    'iPad Pro, iPad Air (3rd Gen+), iPad mini (5th Gen+)'
  ],
  samsung: [
    'Galaxy S24, S24+, S24 Ultra',
    'Galaxy S23, S23+, S23 Ultra, S23 FE',
    'Galaxy S22, S22+, S22 Ultra',
    'Galaxy S21, S21+, S21 Ultra',
    'Galaxy S20, S20+, S20 Ultra',
    'Galaxy Z Fold 1 - 6, Galaxy Z Flip 1 - 6',
    'Galaxy Note 20, Note 20 Ultra'
  ],
  google: [
    'Pixel 9, 9 Pro, 9 Pro XL, 9 Fold',
    'Pixel 8, 8 Pro, 8a',
    'Pixel 7, 7 Pro, 7a',
    'Pixel 6, 6 Pro, 6a',
    'Pixel 5, 4, 4a, 3, 3a'
  ],
  others: [
    'Xiaomi 14, 13 Pro, 13T Pro, 12T Pro',
    'Oppo Find X5 Pro, Find N2 Flip, Find X3 Pro',
    'Sony Xperia 1 IV, 1 V, 5 IV, 10 IV',
    'Motorola Razr 40 Ultra, Edge 40 Pro'
  ]
};
