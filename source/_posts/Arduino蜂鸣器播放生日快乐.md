---
title: Arduino蜂鸣器播放生日快乐
tags: [Arduino,控制器]
categories: Arduino
---

### 1)       说明：

蜂鸣器是一种一体化结构的电子讯响器，采用直流电压供电，广泛应用于计算电子玩具、定时器等电子产品中作发声器件。
蜂鸣器分有源和无源。如果是有源的，单片机只要输出高低电平就可以，如果是无源的，单片机就要输出PWM波才可以让蜂鸣器发声。

### 2)       硬件：

5V有源蜂鸣器，Arduinouno，杜邦线

### 3)       连接：

正极连 ArduinoDigital 4
负极连 Arduino GND

![img](http://img.blog.csdn.net/20170220135301780?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQveGlleWFuMDgxMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

### 4)       ­­代码：

```

int PIN_SPEAKER = 4;
int length = 25;
char notes[] = "ggagCbggagDCggGECbaffECDC";
int beats[] = {1,1,2,2,2,4, 1,1,2,2,2,4, 1,1,2,2,2,2,2, 1,1,2,2,2,4,1};
int tempo = 300;
 
void playTone(int tone, int duration) {
  for (long i = 0; i < duration * 1000L; i += tone * 2) {
    digitalWrite(PIN_SPEAKER, HIGH);
    delayMicroseconds(tone);
    digitalWrite(PIN_SPEAKER, LOW);
    delayMicroseconds(tone);
  }
}
 
void playNote(char note, int duration) {
  char names[] = {'c', 'd', 'e', 'f', 'g', 'a', 'b', 'C', 'D', 'E', 'F', 'G'};
  int tones[] = {1915, 1700, 1519, 1432, 1275, 1136, 1014, 956, 853, 759, 716, 637, 568};
 
  for (int i = 0; i < 12; i++) {
    if (names[i] == note) {
      Serial.print("value:");
      Serial.println(note);
      playTone(tones[i]*2, duration);
    }
  }
}
 
void setup() {
  pinMode(PIN_SPEAKER, OUTPUT);
}
 
void loop() {
  for (int i = 0; i < length; i++) {
    if (notes[i] == ' ') {
      delay(beats[i] * tempo); 
    } else {
      playNote(notes[i], beats[i] * tempo);
    }
    delay(tempo / 2); 
  }
}


```

