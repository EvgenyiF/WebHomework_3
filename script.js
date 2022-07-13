
$(document).ready(function () {

    var mass = []; // массив всех занятых клеток
    var mass_x = []; // массив клеток с "х"
    var mass_o = []; // массив клеток с "0"
    var v = 0; // флаг, есть ли победитель (если да, то "1")

    $(".cell").on("click", function () {
        var cell_text = $(this).text();
        if (cell_text != "")
            alert("занято");
        else {
            $(this).text("x");
            var id_cell = $(this).attr('id');
            id_cell = parseInt(id_cell);
            mass.push(id_cell);
            mass_x.push(id_cell);
            mass_x.sort();
            // alert("Привет", id_cell)
            // console.log(ver$)
            var v = victory(mass_x, "Игрок");
            // alert(mass.length);
            if (mass_x.length != 0 && mass.length < 8)
                computer();
            if (mass.length == 9 && v != 1)
                noneVictory();

        }
    });

    // Проверка на победу
    function victory(metka, user) {

        var srt1 = 0; // переменная проверки первой строки
        var srt2 = 0; // переменная проверки второй строки
        var srt3 = 0; // переменная проверки третьей строки

        var st1 = 0; // переменная проверки первого столбца
        var st2 = 0; // переменная проверки второго столбца
        var st3 = 0; // переменная проверки третьего столбца

        var d1 = 0; // переменная проверки первой диагонали
        var d2 = 0; // переменная проверки второй диагонали


        for (var i = 0; i < metka.length; i++) {
            switch (metka[i]) {
                case 1: { srt1++; st1++; d1++; break; }
                case 2: { srt1++; st2++; break; }
                case 3: { srt1++; st3++; d2++; break; }
                case 4: { srt2++; st1++; break; }
                case 5: { srt2++; st2++; d1++; d2++; break; }
                case 6: { srt2++; st3++; break; }
                case 7: { srt3++; st1++; d2++; break; }
                case 8: { srt3++; st2++; break; }
                case 9: { srt3++; st3++; d1++; break; }
            }

            if (srt1 == 3 || srt2 == 3 || srt3 == 3) {
                $(".victory").text("Победил " + user);
                $(".victory").css("display", "block");
                victoryBegin(user);
            }
            if (st1 == 3 || st2 == 3 || st3 == 3) {
                $(".victory").text("Победил " + user);
                $(".victory").css("display", "block");
                victoryBegin(user);
            }
            if (d1 == 3 || d2 == 3) {
                $(".victory").text("Победил " + user);
                $(".victory").css("display", "block");
                victoryBegin(user);
            }
        }

        if (srt1 == 3 || srt2 == 3 || srt3 == 3 || st1 == 3 || st2 == 3 || st3 == 3 || d1 == 3 || d2 == 3)
            return 1;
    }

    // действия в случае победы
    function victoryBegin(user) {

        setTimeout(function () {
            $(".victory").css("display", "none");
            $(".cell").text("");

            var raund = $(".statistics span").text();
            raund++;
            $(".statistics span").text(raund);

            if (user == "Компьютер") {
                var num = $(".num_c").text();
                num++;
                $(".num_c").text(num);
            }
            else {
                var num = $(".num_u").text();
                num++;
                $(".num_u").text(num);
            }

            mass.length = 0;
            mass_x.length = 0;
            mass_o.length = 0;
        }, 2000);

    }

    // Ход Компьютера
    function computer() {

        var number;
        $flag = false;
        mass.sort();
        while (true) {
            if (mass.length == 9) {
                noneVictory();
            }
            number = getRandomInRange(1, 9);
            for (var i = 0; i < mass.length; i++) {
                if (number == mass[i])
                    $flag = true;
            }
            if ($flag == false)
                break;
            else {
                $flag = false;
                continue;
            }
        }

        $(".cell").eq(number - 1).text("o");

        mass.push(number);
        mass_o.push(number);
        victory(mass_o, "Компьютер");
    }

    // ничья
    function noneVictory() {
        setTimeout(function () {
            $(".victory").text("Ничья");
            $(".victory").css("display", "block");
        }, 2000);

        setTimeout(function () {
            $(".victory").css("display", "none");
            $(".cell").text("");

            var raund = $(".statistics span").text();
            raund++;
            $(".statistics span").text(raund);

            mass.length = 0;
            mass_x.length = 0;
            mass_o.length = 0;

        }, 500);
    }

    // Функция генерации случайного числа (возвращает число от 1-9)
    function getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
})