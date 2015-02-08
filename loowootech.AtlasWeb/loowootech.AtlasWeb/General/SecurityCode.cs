﻿using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;
using System.Linq;
using System.Web;

namespace loowootech.AtlasWeb.General
{
    public class SecurityCode
    {
        public static string MakeCode(int codelen)
        {
            if (codelen < 1)
            {
                return string.Empty;
            }
            int number;
            string checkCode = string.Empty;
            Random random = new Random();
            for (int index = 0; index < codelen; index++)
            {
                number = random.Next();

                if (number % 2 == 0)
                {
                    checkCode += (char)('0' + (char)(number % 10));
                }
                else
                {
                    checkCode += (char)('A' + (char)(number) % 20);
                }
            }
            return checkCode;
        }

        public static MemoryStream CreateCodeImg(string CheckCode)
        {
            if (string.IsNullOrEmpty(CheckCode))
            {
                return null;
            }

            Bitmap image = new Bitmap((int)Math.Ceiling((CheckCode.Length * 12.5)), 25);

            Graphics graphic = Graphics.FromImage(image);

            try
            {
                Random random = new Random();
                graphic.Clear(Color.White);

                int x1 = 0, y1 = 0, x2 = 0, y2 = 0;

                for (int index = 0; index < 25; index++)
                {
                    x1 = random.Next(image.Width);
                    x2 = random.Next(image.Width);
                    y1 = random.Next(image.Height);
                    y2 = random.Next(image.Height);

                    graphic.DrawLine(new Pen(Color.Silver), x1, y1, x2, y2);
                }

                Font font = new Font("Arial", 12, (FontStyle.Bold | FontStyle.Italic));
                LinearGradientBrush brush = new LinearGradientBrush(new Rectangle(0, 0, image.Width, image.Height), Color.Blue, Color.DarkRed, 1.2f, true);
                graphic.DrawString(CheckCode, font, brush, 2, 2);

                int x = 0;
                int y = 0;

                //画图片的前景噪音点
                for (int i = 0; i < 100; i++)
                {
                    x = random.Next(image.Width);
                    y = random.Next(image.Height);

                    image.SetPixel(x, y, Color.FromArgb(random.Next()));
                }

                //画图片的边框线
                graphic.DrawRectangle(new Pen(Color.Silver), 0, 0, image.Width - 1, image.Height - 1);

                //将图片验证码保存为流Stream返回
                System.IO.MemoryStream ms = new System.IO.MemoryStream();
                image.Save(ms, System.Drawing.Imaging.ImageFormat.Gif);
                return ms;
            }
            finally
            {
                graphic.Dispose();
                image.Dispose();
            }
        }
    }
}