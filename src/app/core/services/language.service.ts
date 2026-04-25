import { Injectable, signal } from '@angular/core';

export type AppLanguage = 'en' | 'ar';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly storageKey = 'app-language';
  readonly currentLanguage = signal<AppLanguage>('en');

  private readonly translations: Record<AppLanguage, Record<string, string>> = {
    en: {
      'common.logout': 'Logout',
      'common.light': 'Light',
      'common.dark': 'Dark',
      'common.language': 'Language',
      'common.rights': 'All rights reserved.',
      'common.location': 'Location',
      'common.walletBalance': 'Wallet Balance',
      'common.accessLevel': 'Access Level',
      'common.fullAccess': 'Full Access',
      'common.premiumMobility': 'Premium Mobility',
      'common.english': 'English',
      'common.arabic': 'Arabic',
      'common.user': 'User',
      'common.admin': 'Admin',
      'common.na': 'N/A',

      'nav.browseCars': 'Browse Cars',
      'nav.myOrders': 'My Orders',
      'nav.installments': 'Installments',
      'nav.users': 'Users',
      'nav.cars': 'Cars',
      'nav.orders': 'Orders',
      'nav.support': 'Support',
      'nav.privacyPolicy': 'Privacy Policy',
      'nav.termsOfService': 'Terms of Service',
      'nav.helpCenter': 'Help Center',

      'account.customer': 'Customer Account',
      'account.admin': 'Admin Account',
      'account.adminAccess': 'Administrator Access',
      'account.adminPanel': 'Admin Control Panel',

      'authLayout.title': 'Drive Your Dream',
      'authLayout.subtitle': 'Experience the ultimate luxury with our premium car rental service.',
      'footer.defaultDescription': 'Premium car rental services for your business and personal needs.',
      'footer.defaultCompany': 'CarRental Inc.',
      'footer.adminTitle': 'CarRental Admin',
      'footer.adminDescription': 'Manage users, vehicles, and platform activity from one shared control surface.',
      'footer.adminCompany': 'CarRental Admin',
      'error.invalidCredentials': 'Invalid email or password. Please try again.',
      'error.registrationFailed': 'Registration failed. Please try again.',

      'login.customer': 'Customer',
      'login.admin': 'Admin',
      'login.adminPortal': 'Admin Portal',
      'login.welcomeBack': 'Welcome Back',
      'login.adminSubtitle': 'Secure access for car rental management',
      'login.customerSubtitle': 'Please enter your details to sign in',
      'login.email': 'Email Address',
      'login.password': 'Password',
      'login.signIn': 'Sign In',
      'login.signingIn': 'Signing in...',
      'login.noAccount': "Don't have an account?",
      'login.createAccount': 'Create an account',
      'login.emailError': 'Please enter a valid email.',
      'login.passwordError': 'Password must be at least 6 characters.',

      'register.createAccount': 'Create Account',
      'register.subtitle': 'Join our premium car rental community',
      'register.fullName': 'Full Name',
      'register.phone': 'Phone Number',
      'register.confirmPassword': 'Confirm Password',
      'register.country': 'Country',
      'register.registering': 'Registering...',
      'register.alreadyHaveAccount': 'Already have an account?',
      'register.signInInstead': 'Sign in instead',
      'register.nameRequired': 'Name is required.',
      'register.nameMin': 'Name must be at least 3 characters.',
      'register.phoneRequired': 'Phone number is required.',
      'register.phoneInvalid': 'Please enter a valid phone number.',
      'register.passwordMin': 'Min 6 characters.',
      'register.passwordMismatch': "Passwords don't match.",
      'register.countryRequired': 'Country is required.',
      'register.johnDoe': 'John Doe',
      'register.selectCountry': 'Select your country'
      , 'Car Fleet': 'Car Fleet'
      , 'Manage and browse available cars': 'Manage and browse available cars'
      , 'Brand...': 'Brand...'
      , 'Min Price...': 'Min Price...'
      , 'Max Price...': 'Max Price...'
      , 'Search by name...': 'Search by name...'
      , 'Car Name': 'Car Name'
      , 'Year': 'Year'
      , 'Price/Day': 'Price/Day'
      , 'Actions': 'Actions'
      , 'Available': 'Available'
      , 'View Details': 'View Details'
      , 'View': 'View'
      , 'Order Now': 'Order Now'
      , 'Showing page': 'Showing page'
      , 'of': 'of'
      , 'Total:': 'Total:'
      , 'cars': 'cars'
      , 'Previous': 'Previous'
      , 'Next': 'Next'
      , 'No cars found matching your search.': 'No cars found matching your search.'
      , 'Loading car details...': 'Loading car details...'
      , 'Back to Fleet': 'Back to Fleet'
      , 'Rental Rate': 'Rental Rate'
      , '/ day': '/ day'
      , 'Availability': 'Availability'
      , 'Color': 'Color'
      , 'Gearbox': 'Gearbox'
      , 'Fuel': 'Fuel'
      , 'About this car': 'About this car'
      , 'Book this experience': 'Book this experience'
      , 'Oops! Car not found.': 'Oops! Car not found.'
      , 'Return to Fleet': 'Return to Fleet'
      , 'Complete Your Booking': 'Complete Your Booking'
      , 'Review the car details and fill in the rental information.': 'Review the car details and fill in the rental information.'
      , 'Selected Vehicle': 'Selected Vehicle'
      , 'Daily Rate:': 'Daily Rate:'
      , 'Rental Dates': 'Rental Dates'
      , 'Delivery Date': 'Delivery Date'
      , 'Receiving Date': 'Receiving Date'
      , 'Payment & Order Type': 'Payment & Order Type'
      , 'Payment Method': 'Payment Method'
      , 'Choose Method': 'Choose Method'
      , 'Cash': 'Cash'
      , 'Order Type': 'Order Type'
      , 'Choose Type': 'Choose Type'
      , 'Full Payment': 'Full Payment'
      , 'Installments': 'Installments'
      , 'Tamara requires installments.': 'Tamara requires installments.'
      , 'Cash requires full payment.': 'Cash requires full payment.'
      , 'Installment Details': 'Installment Details'
      , 'Down Payment ($)': 'Down Payment ($)'
      , 'Enter amount': 'Enter amount'
      , 'Number of Installments': 'Number of Installments'
      , 'e.g. 12 months': 'e.g. 12 months'
      , 'Processing...': 'Processing...'
      , 'Confirm Booking': 'Confirm Booking'
      , 'Cancel': 'Cancel'
      , 'My Rental Orders': 'My Rental Orders'
      , 'View and track your car rental history': 'View and track your car rental history'
      , 'Loading your orders...': 'Loading your orders...'
      , 'Car Details': 'Car Details'
      , 'Duration': 'Duration'
      , 'Total Price': 'Total Price'
      , 'Days': 'Days'
      , 'Details': 'Details'
      , 'No orders yet': 'No orders yet'
      , "You haven't made any rental bookings yet.": "You haven't made any rental bookings yet."
      , 'Find a Car': 'Find a Car'
      , 'Payment Installments': 'Payment Installments'
      , 'Manage and track your scheduled payments': 'Manage and track your scheduled payments'
      , 'Loading your installments...': 'Loading your installments...'
      , 'Order ID': 'Order ID'
      , 'Due Date': 'Due Date'
      , 'Amount': 'Amount'
      , 'Pay Now': 'Pay Now'
      , 'Completed': 'Completed'
      , 'No installments found': 'No installments found'
      , "You don't have any active installment plans at the moment.": "You don't have any active installment plans at the moment."
      , 'Browse Cars': 'Browse Cars'
      , 'User Management': 'User Management'
      , 'Manage and monitor all platform members': 'Manage and monitor all platform members'
      , 'All Roles': 'All Roles'
      , 'All Countries': 'All Countries'
      , 'Search by name or email...': 'Search by name or email...'
      , 'Total Users': 'Total Users'
      , 'Total Pages': 'Total Pages'
      , 'Showing Results': 'Showing Results'
      , 'User': 'User'
      , 'Role': 'Role'
      , 'Orders': 'Orders'
      , 'Wallet': 'Wallet'
      , 'No phone': 'No phone'
      , 'View Profile': 'View Profile'
      , 'No users found': 'No users found'
      , 'Try adjusting your search or filter criteria': 'Try adjusting your search or filter criteria'
      , 'users': 'users'
      , 'Car Management': 'Car Management'
      , 'Manage and monitor all available vehicles': 'Manage and monitor all available vehicles'
      , 'Search by brand or model...': 'Search by brand or model...'
      , 'Min Price': 'Min Price'
      , 'Max Price': 'Max Price'
      , 'Per Page': 'Per Page'
      , 'Total Cars': 'Total Cars'
      , 'Kilometers': 'Kilometers'
      , 'Price / Day': 'Price / Day'
      , '/day': '/day'
      , 'Update': 'Update'
      , 'Deleting...': 'Deleting...'
      , 'Delete': 'Delete'
      , 'Try adjusting your search criteria': 'Try adjusting your search criteria'
      , 'Delete Car': 'Delete Car'
      , 'This action will remove the car from the admin list. Make sure you really want to continue.': 'This action will remove the car from the admin list. Make sure you really want to continue.'
      , 'N/A': 'N/A'
      , 'Something went wrong. Please check your dates and try again.': 'Something went wrong. Please check your dates and try again.'
      , 'Payment completed successfully!': 'Payment completed successfully!'
      , 'Payment failed. Please try again.': 'Payment failed. Please try again.'
      , 'Add Car': 'Add Car'
      , 'Create New Car': 'Create New Car'
      , 'Fill in the vehicle information and save it to the fleet.': 'Fill in the vehicle information and save it to the fleet.'
      , 'Name': 'Name'
      , 'e.g. Corolla': 'e.g. Corolla'
      , 'Plate Number': 'Plate Number'
      , 'Saving...': 'Saving...'
      , 'Save Car': 'Save Car'
      , 'Please fill all required fields.': 'Please fill all required fields.'
      , 'Car added successfully.': 'Car added successfully.'
      , 'Failed to add car.': 'Failed to add car.'
    },
    ar: {
      'common.logout': 'تسجيل الخروج',
      'common.light': 'فاتح',
      'common.dark': 'داكن',
      'common.language': 'اللغة',
      'common.rights': 'جميع الحقوق محفوظة.',
      'common.location': 'الموقع',
      'common.walletBalance': 'رصيد المحفظة',
      'common.accessLevel': 'مستوى الصلاحية',
      'common.fullAccess': 'صلاحية كاملة',
      'common.premiumMobility': 'تنقل فاخر',
      'common.english': 'الإنجليزية',
      'common.arabic': 'العربية',
      'common.user': 'مستخدم',
      'common.admin': 'مدير',
      'common.na': 'غير متاح',

      'nav.browseCars': 'استعراض السيارات',
      'nav.myOrders': 'طلباتي',
      'nav.installments': 'الأقساط',
      'nav.users': 'المستخدمون',
      'nav.cars': 'السيارات',
      'nav.orders': 'الطلبات',
      'nav.support': 'الدعم',
      'nav.privacyPolicy': 'سياسة الخصوصية',
      'nav.termsOfService': 'شروط الخدمة',
      'nav.helpCenter': 'مركز المساعدة',

      'account.customer': 'حساب العميل',
      'account.admin': 'حساب المدير',
      'account.adminAccess': 'وصول المدير',
      'account.adminPanel': 'لوحة تحكم المدير',

      'authLayout.title': 'قد حلمك',
      'authLayout.subtitle': 'استمتع بتجربة فاخرة مع خدمة تأجير السيارات المميزة.',
      'footer.defaultDescription': 'خدمات تأجير سيارات مميزة لاحتياجاتك الشخصية والتجارية.',
      'footer.defaultCompany': 'كار رينتال',
      'footer.adminTitle': 'لوحة إدارة كار رينتال',
      'footer.adminDescription': 'إدارة المستخدمين والسيارات والعمليات من لوحة تحكم واحدة.',
      'footer.adminCompany': 'إدارة كار رينتال',
      'error.invalidCredentials': 'البريد الإلكتروني أو كلمة المرور غير صحيحة. حاول مرة أخرى.',
      'error.registrationFailed': 'فشل إنشاء الحساب. حاول مرة أخرى.',

      'login.customer': 'عميل',
      'login.admin': 'مدير',
      'login.adminPortal': 'بوابة المدير',
      'login.welcomeBack': 'أهلا بعودتك',
      'login.adminSubtitle': 'وصول آمن لإدارة تأجير السيارات',
      'login.customerSubtitle': 'يرجى إدخال بياناتك لتسجيل الدخول',
      'login.email': 'البريد الإلكتروني',
      'login.password': 'كلمة المرور',
      'login.signIn': 'تسجيل الدخول',
      'login.signingIn': 'جار تسجيل الدخول...',
      'login.noAccount': 'ليس لديك حساب؟',
      'login.createAccount': 'إنشاء حساب',
      'login.emailError': 'يرجى إدخال بريد إلكتروني صالح.',
      'login.passwordError': 'كلمة المرور يجب أن تكون 6 أحرف على الأقل.',

      'register.createAccount': 'إنشاء حساب',
      'register.subtitle': 'انضم إلى مجتمع تأجير السيارات المميز',
      'register.fullName': 'الاسم الكامل',
      'register.phone': 'رقم الهاتف',
      'register.confirmPassword': 'تأكيد كلمة المرور',
      'register.country': 'الدولة',
      'register.registering': 'جار إنشاء الحساب...',
      'register.alreadyHaveAccount': 'لديك حساب بالفعل؟',
      'register.signInInstead': 'سجل الدخول بدلا من ذلك',
      'register.nameRequired': 'الاسم مطلوب.',
      'register.nameMin': 'الاسم يجب أن يكون 3 أحرف على الأقل.',
      'register.phoneRequired': 'رقم الهاتف مطلوب.',
      'register.phoneInvalid': 'يرجى إدخال رقم هاتف صحيح.',
      'register.passwordMin': '6 أحرف على الأقل.',
      'register.passwordMismatch': 'كلمات المرور غير متطابقة.',
      'register.countryRequired': 'الدولة مطلوبة.',
      'register.johnDoe': 'محمد أحمد',
      'register.selectCountry': 'اختر دولتك',
      'Car Fleet': 'أسطول السيارات',
      'Manage and browse available cars': 'استعرض السيارات المتاحة وأدرها',
      'Brand...': 'العلامة...',
      'Min Price...': 'أقل سعر...',
      'Max Price...': 'أعلى سعر...',
      'Search by name...': 'ابحث بالاسم...',
      'Car Name': 'اسم السيارة',
      'Year': 'السنة',
      'Price/Day': 'السعر/اليوم',
      'Actions': 'الإجراءات',
      'Available': 'متاح',
      'View Details': 'عرض التفاصيل',
      'View': 'عرض',
      'Order Now': 'اطلب الآن',
      'Showing page': 'عرض الصفحة',
      'of': 'من',
      'Total:': 'الإجمالي:',
      'cars': 'سيارة',
      'Previous': 'السابق',
      'Next': 'التالي',
      'No cars found matching your search.': 'لا توجد سيارات مطابقة لبحثك.',
      'Loading car details...': 'جار تحميل تفاصيل السيارة...',
      'Back to Fleet': 'العودة إلى الأسطول',
      'Rental Rate': 'سعر الإيجار',
      '/ day': '/ يوم',
      'Availability': 'التوفر',
      'Color': 'اللون',
      'Gearbox': 'ناقل الحركة',
      'Fuel': 'الوقود',
      'About this car': 'عن هذه السيارة',
      'Book this experience': 'احجز هذه التجربة',
      'Oops! Car not found.': 'عفوا! السيارة غير موجودة.',
      'Return to Fleet': 'العودة إلى الأسطول',
      'Complete Your Booking': 'أكمل حجزك',
      'Review the car details and fill in the rental information.': 'راجع تفاصيل السيارة واملأ بيانات الإيجار.',
      'Selected Vehicle': 'السيارة المختارة',
      'Daily Rate:': 'السعر اليومي:',
      'Rental Dates': 'تواريخ الإيجار',
      'Delivery Date': 'تاريخ التسليم',
      'Receiving Date': 'تاريخ الاستلام',
      'Payment & Order Type': 'طريقة الدفع ونوع الطلب',
      'Payment Method': 'طريقة الدفع',
      'Choose Method': 'اختر الطريقة',
      'Cash': 'نقدا',
      'Order Type': 'نوع الطلب',
      'Choose Type': 'اختر النوع',
      'Full Payment': 'دفع كامل',
      'Installments': 'أقساط',
      'Tamara requires installments.': 'تمارا تتطلب الدفع بالأقساط.',
      'Cash requires full payment.': 'الدفع النقدي يتطلب دفعا كاملا.',
      'Installment Details': 'تفاصيل الأقساط',
      'Down Payment ($)': 'الدفعة المقدمة ($)',
      'Enter amount': 'ادخل المبلغ',
      'Number of Installments': 'عدد الأقساط',
      'e.g. 12 months': 'مثال: 12 شهر',
      'Processing...': 'جار المعالجة...',
      'Confirm Booking': 'تأكيد الحجز',
      'Cancel': 'إلغاء',
      'My Rental Orders': 'طلبات الإيجار الخاصة بي',
      'View and track your car rental history': 'اعرض وتابع سجل إيجار السيارات الخاص بك',
      'Loading your orders...': 'جار تحميل طلباتك...',
      'Car Details': 'تفاصيل السيارة',
      'Duration': 'المدة',
      'Total Price': 'السعر الإجمالي',
      'Days': 'أيام',
      'Details': 'التفاصيل',
      'No orders yet': 'لا توجد طلبات بعد',
      "You haven't made any rental bookings yet.": 'لم تقم بأي حجوزات إيجار بعد.',
      'Find a Car': 'ابحث عن سيارة',
      'Payment Installments': 'أقساط الدفع',
      'Manage and track your scheduled payments': 'إدارة ومتابعة دفعاتك المجدولة',
      'Loading your installments...': 'جار تحميل الأقساط...',
      'Order ID': 'رقم الطلب',
      'Due Date': 'تاريخ الاستحقاق',
      'Amount': 'المبلغ',
      'Pay Now': 'ادفع الآن',
      'Completed': 'مكتمل',
      'No installments found': 'لا توجد أقساط',
      "You don't have any active installment plans at the moment.": 'لا يوجد لديك خطط تقسيط نشطة حاليا.',
      'Browse Cars': 'استعراض السيارات',
      'User Management': 'إدارة المستخدمين',
      'Manage and monitor all platform members': 'إدارة ومتابعة جميع أعضاء المنصة',
      'All Roles': 'كل الأدوار',
      'All Countries': 'كل الدول',
      'Search by name or email...': 'ابحث بالاسم أو البريد...',
      'Total Users': 'إجمالي المستخدمين',
      'Total Pages': 'إجمالي الصفحات',
      'Showing Results': 'النتائج المعروضة',
      'User': 'مستخدم',
      'Role': 'الدور',
      'Orders': 'الطلبات',
      'Wallet': 'المحفظة',
      'No phone': 'لا يوجد هاتف',
      'View Profile': 'عرض الملف الشخصي',
      'No users found': 'لا يوجد مستخدمون',
      'Try adjusting your search or filter criteria': 'حاول تعديل البحث أو الفلاتر',
      'users': 'مستخدم',
      'Car Management': 'إدارة السيارات',
      'Manage and monitor all available vehicles': 'إدارة ومتابعة جميع المركبات المتاحة',
      'Search by brand or model...': 'ابحث بالعلامة أو الموديل...',
      'Min Price': 'أقل سعر',
      'Max Price': 'أعلى سعر',
      'Per Page': 'لكل صفحة',
      'Total Cars': 'إجمالي السيارات',
      'Kilometers': 'الكيلومترات',
      'Price / Day': 'السعر / يوم',
      '/day': '/يوم',
      'Update': 'تعديل',
      'Deleting...': 'جار الحذف...',
      'Delete': 'حذف',
      'Try adjusting your search criteria': 'حاول تعديل معايير البحث',
      'Delete Car': 'حذف السيارة',
      'This action will remove the car from the admin list. Make sure you really want to continue.': 'سيؤدي هذا الإجراء إلى حذف السيارة من قائمة الإدارة. تأكد من رغبتك في المتابعة.',
      'N/A': 'غير متاح',
      'Something went wrong. Please check your dates and try again.': 'حدث خطأ ما. يرجى مراجعة التواريخ والمحاولة مرة أخرى.',
      'Payment completed successfully!': 'تم الدفع بنجاح!',
      'Payment failed. Please try again.': 'فشل الدفع. حاول مرة أخرى.'
      , 'Add Car': 'إضافة سيارة'
      , 'Create New Car': 'إنشاء سيارة جديدة'
      , 'Fill in the vehicle information and save it to the fleet.': 'املأ بيانات السيارة واحفظها في الأسطول.'
      , 'Name': 'الاسم'
      , 'e.g. Corolla': 'مثال: كورولا'
      , 'Plate Number': 'رقم اللوحة'
      , 'Saving...': 'جار الحفظ...'
      , 'Save Car': 'حفظ السيارة'
      , 'Please fill all required fields.': 'يرجى ملء كل الحقول المطلوبة.'
      , 'Car added successfully.': 'تمت إضافة السيارة بنجاح.'
      , 'Failed to add car.': 'فشلت إضافة السيارة.'
    }
  };

  constructor() {
    const savedLanguage = localStorage.getItem(this.storageKey) as AppLanguage | null;
    this.setLanguage(savedLanguage ?? 'en');
  }

  setLanguage(language: AppLanguage): void {
    this.currentLanguage.set(language);
    localStorage.setItem(this.storageKey, language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', language === 'ar');
  }

  toggleLanguage(): void {
    this.setLanguage(this.currentLanguage() === 'en' ? 'ar' : 'en');
  }

  translate(key: string): string {
    return this.translations[this.currentLanguage()][key] ?? key;
  }
}
