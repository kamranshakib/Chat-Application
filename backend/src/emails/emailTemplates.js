export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="fa" dir="rtl">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>خوش آمدید به مسنجر</title>
  </head>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5; direction: rtl;">
    <div style="background: linear-gradient(to right, #36D1DC, #5B86E5); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
      <img src="https://img.freepik.com/free-vector/hand-drawn-message-element-vector-cute-sticker_53876-118344.jpg?t=st=1741295028~exp=1741298628~hmac=0d076f885d7095f0b5bc8d34136cd6d64749455f8cb5f29a924281bafc11b96c&w=1480" alt="لوگوی مسنجر" style="width: 80px; height: 80px; margin-bottom: 20px; border-radius: 50%; background-color: white; padding: 10px;">
      <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 500;">به مسنجر خوش آمدید!</h1>
    </div>
    <div style="background-color: #ffffff; padding: 35px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
      <p style="font-size: 18px; color: #5B86E5;"><strong>سلام ${name}،</strong></p>
      <p>خوشحالیم که به پلتفرم پیام‌رسان ما پیوسته‌اید! مسنجر شما را در تماس آنی با دوستان، خانواده و همکاران قرار می‌دهد، بدون توجه به مکان آن‌ها.</p>
      
      <div style="background-color: #f8f9fa; padding: 25px; border-radius: 10px; margin: 25px 0; border-right: 4px solid #36D1DC; text-align: right;">
        <p style="font-size: 16px; margin: 0 0 15px 0;"><strong>در چند گام ساده شروع کنید:</strong></p>
        <ul style="padding-right: 20px; margin: 0;">
          <li style="margin-bottom: 10px;">تصویر پروفایل خود را تنظیم کنید</li>
          <li style="margin-bottom: 10px;">مخاطبین خود را پیدا و اضافه کنید</li>
          <li style="margin-bottom: 10px;">یک گفتگو را شروع کنید</li>
          <li style="margin-bottom: 0;">اشتراک‌گذاری عکس، ویدئو و موارد دیگر</li>
        </ul>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href=${clientURL} style="background: linear-gradient(to right, #36D1DC, #5B86E5); color: white; text-decoration: none; padding: 12px 30px; border-radius: 50px; font-weight: 500; display: inline-block;">باز کردن مسنجر</a>
      </div>
      
      <p style="margin-bottom: 5px;">اگر به کمک نیاز دارید یا سوالی دارید، همواره در خدمت شما هستیم.</p>
      <p style="margin-top: 0;">پیام‌رسانی خوش!</p>
      
      <p style="margin-top: 25px; margin-bottom: 0;">با احترام،<br>تیم مسنجر</p>
    </div>
    
    <div style="text-align: center; padding: 20px; color: #999; font-size: 12px; direction: rtl;">
      <p>© 2025 مسنجر. تمامی حقوق محفوظ است.</p>
      <p>
        <a href="#" style="color: #5B86E5; text-decoration: none; margin: 0 10px;">سیاست حفظ حریم خصوصی</a>
        <a href="#" style="color: #5B86E5; text-decoration: none; margin: 0 10px;">شرایط سرویس</a>
        <a href="#" style="color: #5B86E5; text-decoration: none; margin: 0 10px;">تماس با ما</a>
      </p>
    </div>
  </body>
  </html>
  `;
}
