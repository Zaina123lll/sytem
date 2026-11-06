// 1. هيكلة بيانات الطالب (Class & Constructor)
class Student {
  constructor(id, name, grades, attendance) {
    this.id = id;
    this.name = name;
    this.grades = grades; // مصفوفة درجات 3 مواد
    this.attendance = attendance; // نسبة الحضور
  }

  // 2. دوال التحليل الأكاديمي (Methods)

  // أ. دالة حساب المتوسط باستخدام reduce
  calculateAverage() {
    const sum = this.grades.reduce((acc, curr) => acc + curr, 0);
    return sum / this.grades.length;
  }

  // ب. دالة التقدير بناءً على المتوسط
  getGradeLetter(avg) {
    if (avg >= 90) return "A";
    if (avg >= 80) return "B";
    if (avg >= 70) return "C";
    if (avg >= 60) return "D";
    if (avg >= 50) return "E";
    return "F";
  }

  // ج. دالة النتيجة النهائية
  getFinalStatus() {
    const avg = this.calculateAverage();
    // شرطين باستخدام (&&): المتوسط 50 فأكثر، والحضور 75 فأكثر
    if (avg >= 50 && this.attendance >= 75) {
      return "ناجح";
    } else {
      return "يحتاج مراجعة";
    }
  }
}

// 3. نظام تشغيل الجامعة (Objects Array)
const studentsList = [
  new Student(1, "أحمد محمد", [85, 90, 88], 85),
  new Student(2, "سارة علي", [42, 45, 44], 80), // طالب متعثر (متوسطه 43.66)
  new Student(3, "محمود خالد", [70, 75, 72], 90),
  new Student(4, "منى حسن", [46, 48, 47], 70), // طالب متعثر (متوسطه 47)
];

console.log("========================================");
console.log(" تقرير الأداء الأكاديمي الشامل للطلاب ");
console.log("========================================");

studentsList.forEach((student) => {
  const avg = student.calculateAverage();
  const letter = student.getGradeLetter(avg);
  const status = student.getFinalStatus();
  console.log(
    `الاسم: ${student.name} | المتوسط: ${avg.toFixed(2)} | التقدير: ${letter} | النتيجة: ${status}`,
  );
});

// 4. لجنة الرأفة (Array Methods)

// أ. الاستخراج: استخراج الطلاب الذين تتراوح متوسطاتهم بين 40 و 49
const strugglingStudents = studentsList.filter((student) => {
  const avg = student.calculateAverage();
  return avg >= 40 && avg < 50;
});

// ب. المعالجة: استخدام map لإضافة 5 درجات رأفة كدعم لمتوسط هؤلاء الطلاب
const compassionedStudents = strugglingStudents.map((student) => {
  const currentAvg = student.calculateAverage();
  return {
    id: student.id,
    name: student.name,
    originalAverage: currentAvg.toFixed(2),
    adjustedAverage: (currentAvg + 5).toFixed(2), // إضافة 5 درجات رأفة
    attendance: student.attendance,
  };
});

// ج. التحليل: استخدام reduce لجمع المتوسطات الجديدة بعد التعديل
const totalAdjustedAverages = compassionedStudents.reduce((acc, student) => {
  return acc + parseFloat(student.adjustedAverage);
}, 0);

// د. متوسط الرأفة (مع درع حماية لمنع القسمة على صفر)
const finalCompassionAverage =
  compassionedStudents.length > 0
    ? totalAdjustedAverages / compassionedStudents.length
    : 0;

// 5. المخرجات النهائية عبر الـ Console
console.log("\n========================================");
console.log("      قائمة الطلاب المتعثرين (لجنة الرأفة)      ");
console.log("========================================");
console.log(compassionedStudents);

console.log("\n========================================");
console.log(" متوسط درجات الطلاب المتعثرين بعد تعديل الرأفة ");
console.log("========================================");
console.log(`${finalCompassionAverage.toFixed(2)} درجه`);
