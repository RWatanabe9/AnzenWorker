'use strict';
import { Window } from './Window.js';

export class Mail extends Window {//メールウィンドウ
    preload() {
        this.load.image('mailicon', 'images/mailicon.png')
        this.title_text = "メール"
        this.width = 800
        this.mails = this.get_mails()
        this.mail_width = 300
        this.mail_block = {}
    }
    get_mails() {//メール一覧取得(実際はネットから持ってくるか、自動生成でそれっぽいの用意する)
        let mails = [["テストメール", `先生へ

4Fの太郎です。

例の物を添付ファイルとしてお送り致します。
ご確認の方よろしくお願いします。
        
舞鶴工業高等専門学校 機械制御情弱科 4年 舞鶴 太郎
Email: taro@maizuru.kosen.ac.jp`
        ], ["メール2", "本文2"]]
        return mails
    }
    show_mail(mail) {
        this.mail_title.setText(mail[0])
        this.mail_text.setText(mail[1])
    }
    fix_mail(text) {
        text = text.replaceAll("\n", " ")
        text = text.substr(0, 15)
        return text
    }
    create_after() {//create関数はすでにWindowクラスで使われてるので、そこからcreate_afterを呼び出してる
        this.mail_title = this.add.text(300, this.menu_height + 5, "", { color: "0x000", font: "30px Yu Gothic" }).setOrigin(0)
        this.mail_text = this.add.text(300, this.menu_height + 40, "", { color: "0x000", font: "15px Yu Gothic", wordWrap: { width: this.mail_width, useAdvancedWrap: true } }).setOrigin(0)
        this.mails.forEach((mail, i) => {
            let mailblock = this.add.rectangle(5, this.menu_height + 2 + i * 50, 280, 48, 0xf0f0f0).setOrigin(0).setInteractive().setDepth(-1000)
            this.add.text(5, this.menu_height + 2 + i * 50, this.fix_mail(mail[0]), { color: "0x000", font: "15px Yu Gothic" }).setOrigin(0)
            this.add.text(5, this.menu_height + 15 + i * 50, this.fix_mail(mail[1]), { color: "0xaaa", font: "15px Yu Gothic" }).setOrigin(0)
            //上20pxと下&左右5pxくらいウィンドウが専有してるので基準を少しずらしてる
            mailblock.on('pointerdown', () => {
                this.show_mail(mail)
                this.desktop.Reportfunc({
                    type: "task",
                    status: "success",
                    task: {
                        id: 1,
                        "point": 150,
                        "broadcast": [{ type: "attack", attack: {type: "trojan"} }]
                    }
                })//結果送信テスト
            }, this);//最後にthis入れないとthisの参照先が変わってしまう
        }, this);
    }
    update() {
        if (this.width - 300 > 50) {
            this.mail_width = this.width - 300
        }
        this.mail_text.setStyle({ color: "0x000", font: "15px Yu Gothic", wordWrap: { width: this.mail_width, useAdvancedWrap: true } })
    }
}