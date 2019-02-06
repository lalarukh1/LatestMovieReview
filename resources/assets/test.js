function changedays() {
    var f = new Array("", "31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31");
    var c = document.getElementById("monthyear").value;
    var a = c.split("_");
    if (a[0].substr(0, 1) == "0") {
        a[0] = a[0].substr(1, 1)
    }
    if (a[1] % 4 == 0) {
        f[2]++
    }
    box = document.getElementById("day");
    if (box) {
        var e = box.value;
        var b = box.options.length;
        for (i = b; i >= 1; i--) {
            box.options[i] = null
        }
        var d;
        for (i = 1; i <= f[a[0]]; i++) {
            if (i < 10) {
                d = "0" + i
            } else {
                d = i
            }
            option = new Option(d, d);
            box.options[box.length] = option;
            if (d == e) {
                box.options[box.length - 1].selected = true
            }
        }
    }
}

function choosetourfare(c, h, m) {
    var d = document.getElementsByName("hoteloption_" + m);
    var b = "";
    for (i = 0; i < d.length; i++) {
        var f = d[i].getAttribute("data-day");
        b += "&hotelselections=" + d[i].value
    }
    var g = document.getElementsByName("prepost_" + m);
    for (i = 0; i < g.length; i++) {
        if (g[i].value) {
            var e = g[i].getAttribute("data-type");
            b += "&" + e + "hotel=" + g[i].value
        }
    }
    var l = document.getElementsByName("pickupoption_" + m);
    for (i = 0; i < l.length; i++) {
        var f = l[i].getAttribute("data-day");
        b += "&pickup=" + l[i].value
    }
    var a = "/fusion/choosetourfare.pl?sessionkey=" + c + "&chosentour=" + h + "&fareno=" + m + b;
    document.location.href = a
}

function jsoncruisesearchupdate(p) {
    var b = p.getAttribute("data-key");
    var f = p.getAttribute("data-id");
    var m = $("searchbox").getAttribute("data-selectedregion");
    var d = $("searchbox").getAttribute("data-selectedport");
    var e = $("searchbox").getAttribute("data-selecteddate");
    var o = $("searchbox").getAttribute("data-selectednights");
    var q = $("searchbox").getAttribute("data-selectedline");
    var c = $("searchbox").getAttribute("data-selectedship");
    var a = $("searchbox").getAttribute("data-sid");
    if (p.type != "button") {
        p.setAttribute("class", "selected")
    }
    $("progressoverlay").toggle();
    if (b == "regions") {
        if (m == f) {
            $("searchbox").setAttribute("data-selectedregion", 0);
            m = 0
        } else {
            $("searchbox").setAttribute("data-selectedregion", f);
            m = f
        }
    } else {
        if (b == "startports") {
            if (d == f) {
                $("searchbox").setAttribute("data-selectedport", 0);
                d = 0
            } else {
                $("searchbox").setAttribute("data-selectedport", f);
                d = f
            }
        } else {
            if (b == "startdate") {
                if (e) {
                    var g = e.split("_");
                    if (g[0] == p.getAttribute("data-month") && g[1] == p.getAttribute("data-year")) {
                        $("searchbox").setAttribute("data-selecteddate", 0);
                        e = 0
                    } else {
                        var l = p.getAttribute("data-month") + "_" + p.getAttribute("data-year");
                        $("searchbox").setAttribute("data-selecteddate", l);
                        e = l
                    }
                } else {
                    var l = p.getAttribute("data-month") + "_" + p.getAttribute("data-year");
                    $("searchbox").setAttribute("data-selecteddate", l);
                    e = l
                }
            } else {
                if (b == "nights") {
                    if (o == f) {
                        $("searchbox").setAttribute("data-selectednights", 0);
                        o = 0
                    } else {
                        $("searchbox").setAttribute("data-selectednights", f);
                        o = f
                    }
                } else {
                    if (b == "lines") {
                        if (q == f) {
                            $("searchbox").setAttribute("data-selectedline", 0);
                            q = 0
                        } else {
                            $("searchbox").setAttribute("data-selectedline", f);
                            q = f
                        }
                    } else {
                        if (b == "ships") {
                            console.log(c);
                            if (c == f) {
                                $("searchbox").setAttribute("data-selectedship", 0);
                                c = 0
                            } else {
                                $("searchbox").setAttribute("data-selectedship", f);
                                c = f
                            }
                        }
                    }
                }
            }
        }
    }
    var h = "action=updateform";
    if (m > 0) {
        h += "&selectedregion=" + m
    }
    if (d > 0) {
        h += "&selectedport=" + d
    }
    if (isNaN(e)) {
        h += "&selecteddate=" + e
    }
    if (o > 0) {
        h += "&selectednights=" + o
    }
    if (q > 0) {
        h += "&selectedline=" + q
    }
    if (c > 0) {
        h += "&selectedship=" + c
    }
    h += "&sid=" + a;
    new Ajax.Request("/fusion/jsoncruisesearch.pl", {
        method: "POST",
        parameters: h,
        onSuccess: function(t) {
            var r = t.responseText;
            var s = t.responseJSON;
            if (s.success == 1) {
                $("count").innerHTML = s.count;
                $("lines").innerHTML = s.boxes.lines;
                $("regions").innerHTML = s.boxes.regions;
                $("ships").innerHTML = s.boxes.ships;
                $("startports").innerHTML = s.boxes.startports;
                $("startdate").innerHTML = s.boxes.startdate;
                $("nights").innerHTML = s.boxes.nights;
                $("progressoverlay").toggle()
            } else {
                $("progressoverlay").toggle()
            }
        },
    })
}

function jsoncruisesearchstart() {
    var b = $("searchbox").getAttribute("data-selectedregion");
    var f = $("searchbox").getAttribute("data-selectedport");
    var g = $("searchbox").getAttribute("data-selecteddate");
    var d = $("searchbox").getAttribute("data-selectednights");
    var e = $("searchbox").getAttribute("data-selectedline");
    var a = $("searchbox").getAttribute("data-selectedship");
    var c = $("searchbox").getAttribute("data-sid");
    var h = "action=dosearch";
    if (b > 0) {
        h += "&regionid=" + b
    }
    if (f > 0) {
        h += "&startport=" + f
    }
    if (isNaN(g)) {
        h += "&monthyear=" + g
    }
    if (d > 0) {
        h += "&spreadnights=" + d
    }
    if (e > 0) {
        h += "&lineid=" + e
    }
    if (a > 0) {
        h += "&shipid=" + a
    }
    if (c > 0) {
        h += "&sid=" + c
    }
    h += "&product=cruise";
    new Ajax.Request("/fusion/jsoncruisesearch.pl", {
        method: "POST",
        parameters: h,
        onSuccess: function(o) {
            var l = o.responseText;
            var m = o.responseJSON;
            console.log(m);
            if (m.success == 1) {
                document.location.href = m.url
            } else {
                $("searchboxerrormsg").innerHTML = m.error
            }
        },
    })
}

function csi_gotopackage_allocation(g, h, e, d, f) {
    var a = "";
    var b = "";
    if (window.parent.document.getElementById("airport" + g)) {
        a = window.parent.document.getElementById("airport" + g).value
    }
    if (window.parent.document.getElementById("inarriveairport" + g)) {
        b = window.parent.document.getElementById("inarriveairport" + g).value
    }
    var c = "/fusion/searchcabingrades3.pl?sessionkey=" + f + "&chosencruise=" + e + "&cid=" + h + "&packageid=" + g + "&packagedepair=" + a + "&packageinarriveair=" + b + "&allocation=" + d;
    parent.document.location.href = c;
    return false
}

function updatefsconfirm() {
    var v = $("roomcount").value;
    var r = 0;
    var f = 0;
    var l = 0;
    for (i = 0; i < v; i++) {
        if ($("adults-" + (i + 1))) {
            r += Number($("adults-" + (i + 1)).value)
        }
        if ($("children-" + (i + 1))) {
            f += Number($("children-" + (i + 1)).value)
        }
        if ($("infants-" + (i + 1))) {
            l += Number($("infants-" + (i + 1)).value)
        }
    }
    var c = $("confirmbox").getAttribute("data-maxocc");
    var y = $("confirmbox").getAttribute("data-minadults");
    var s = $("confirmbox").getAttribute("data-maxadults");
    var o = $("confirmbox").getAttribute("data-maxchildren");
    var d = $("confirmbox").getAttribute("data-maxinfants");
    var a = $("confirmbox").getAttribute("data-duration");
    var q = 0;
    if ((r + f + l) <= (c * v)) {
        if ((r <= s * v) && (f <= o * v) && (l <= d * v)) {
            var h = $("confirmbox").getAttribute("data-singleprice");
            var e = $("confirmbox").getAttribute("data-adultprice");
            var u = $("confirmbox").getAttribute("data-childprice");
            var b = $("confirmbox").getAttribute("data-infantprice");
            var x = 0;
            for (i = 0; i < v; i++) {
                var p = 0;
                var g = 0;
                var m = 0;
                if ($("adults-" + (i + 1))) {
                    p += Number($("adults-" + (i + 1)).value)
                }
                if ($("children-" + (i + 1))) {
                    g += Number($("children-" + (i + 1)).value)
                }
                if ($("infants-" + (i + 1))) {
                    m += Number($("infants-" + (i + 1)).value)
                }
                if (p < y) {
                    q = 1
                }
                if ((p + g) == 1) {
                    adultrate = h
                } else {
                    adultrate = e
                }
                x += (adultrate * p) + (u * g) + (b * m)
            }
            if (q == 1) {
                $("fromprice").style.display = "none";
                $("finalprice").style.display = "none";
                $("confirmbutton").style.display = "none";
                $("invalidprice").style.display = "block"
            } else {
                var w = $("confirmbox").getAttribute("data-depositprice");
                var t = w * (r + f + l);
                if ($("fsextraluggage").checked) {
                    x += 45 * (r + f);
                    t += 45 * (r + f)
                }
                if ($("fsextratransfer1-3").checked) {
                    x += 89
                }
                if ($("fsextratransfer4-5").checked) {
                    x += 129
                }
                if ($("fsextratransfer6-10").checked) {
                    x += 199
                }
                if ($("fsextrafbupgrade").checked) {
                    x += (30 * (r + f)) * a
                }
                $("fromprice").style.display = "none";
                $("invalidprice").style.display = "none";
                $("finalprice").style.display = "block";
                $("confirmbutton").style.display = "block";
                $("finalpricevalue").innerHTML = parseFloat(x).toFixed(2);
                if ($("depositpricevalue")) {
                    $("depositpricevalue").innerHTML = parseFloat(t).toFixed(2)
                }
            }
        }
    } else {
        $("fromprice").style.display = "none";
        $("finalprice").style.display = "none";
        $("confirmbutton").style.display = "none";
        $("invalidprice").style.display = "block"
    }
}

function confirmfs(b) {
    var d = "action=confirm";
    var a = "{ ";
    var c = $("roomcount").value;
    d += "&rooms=" + c;
    for (i = 0; i < c; i++) {
        if ($("adults-" + (i + 1))) {
            d += "&adults-" + Number(i + 1) + "=" + Number($("adults-" + (i + 1)).value)
        }
        if ($("children-" + (i + 1))) {
            d += "&children-" + Number(i + 1) + "=" + Number($("children-" + (i + 1)).value);
            for (j = 0; j < $("children-" + (i + 1)).value; j++) {
                d += "&childage-" + Number(i + 1) + "-" + Number(j + 1) + "=" + Number($("childage-" + (i + 1) + "-" + (j + 1)).value)
            }
        }
        if ($("infants-" + (i + 1))) {
            d += "&infants-" + Number(i + 1) + "=" + Number($("infants-" + (i + 1)).value)
        }
    }
    d += "&offerid=" + $("confirmbox").getAttribute("data-offerid");
    d += "&priceid=" + $("confirmbox").getAttribute("data-priceid");
    d += "&optionid=" + $("confirmbox").getAttribute("data-optionid");
    d += "&pricecheck=" + $("finalpricevalue").innerHTML;
    if ($("fsextraluggage").checked) {
        d += "&luggage=1"
    }
    if ($("fsextracarhire").checked) {
        d += "&carhire=1"
    }
    if ($("fsextratransfer1-3").checked) {
        d += "&transfer1-3=1"
    }
    if ($("fsextratransfer4-5").checked) {
        d += "&transfer4-5=1"
    }
    if ($("fsextratransfer6-10").checked) {
        d += "&transfer6-10=1"
    }
    if ($("fsextrafbupgrade").checked) {
        d += "&fbupgrade=1"
    }
    new Ajax.Request("confirmflashsale.pl", {
        method: "POST",
        parameters: d,
        onSuccess: function(g) {
            var e = g.responseText;
            var f = g.responseJSON;
            if (f.success == 1) {
                document.location.href = "/fusion/bookingform.pl?sessionkey=" + f.sessionkey
            } else {
                $("finalprice").style.display = "none";
                $("depositprice").style.display = "none";
                $("invalidprice").innerHTML = f.reasons.reason;
                $("invalidprice").style.display = "block"
            }
        },
    })
}

function updatefsselectbox(a) {
    var b = "action=updatefsselectbox";
    b += "&airport=" + a.getAttribute("data-airport");
    b += "&priceid=" + a.getAttribute("data-priceid");
    b += "&optionid=" + a.getAttribute("data-optionid");
    b += "&offerid=" + $("flashsales-details").getAttribute("data-offerid");
    new Ajax.Request("detailflashsales.pl", {
        method: "POST",
        parameters: b,
        onSuccess: function(e) {
            var c = e.responseText;
            var d = e.responseJSON;
            $("selectbox-container").innerHTML = d.output;
            $("selectbox-container").style.display = "block";
            jQuery("html, body").animate({
                scrollTop: jQuery("#selectbox-container").offset().top
            }, 500)
        },
    })
}

function updatefscalendar(d, c, b, f) {
    var e = "action=updatefscalendar";
    if (c > 0) {
        e += "&optionid=" + c
    } else {
        $("selectbox-container").style.display = "none";
        c = d.getAttribute("data-optionid");
        e += "&optionid=" + c
    }
    if (d.id == "airports") {
        f = d.value;
        b = d.getAttribute("data-date");
        e += "&airport=" + f
    } else {
        if ($("airports")) {
            e += "&airport=" + $("airports").value
        }
    }
    if (b) {
        e += "&date=" + b
    }
    var a = $("flashsales-details").getAttribute("data-offerid");
    e += "&offerid=" + a;
    new Ajax.Request("detailflashsales.pl", {
        method: "POST",
        parameters: e,
        onSuccess: function(l) {
            var g = l.responseText;
            var h = l.responseJSON;
            $("calendar").outerHTML = h.output
        },
    })
}

function updatefsfilter(g) {
    var h = document.getElementsByName("destination");
    var a = document.getElementsByName("monthyear");
    var c = document.getElementsByName("attributes");
    var p = document.getElementsByClassName("offerrow");
    var o = [];
    var f = [];
    var l = [];
    var q = [];
    for (i = 0; i < h.length; i++) {
        if (h[i].checked == true) {
            q.push(h[i].id)
        }
    }
    for (i = 0; i < c.length; i++) {
        if (c[i].checked == true) {
            l.push(c[i].id)
        }
    }
    for (i = 0; i < a.length; i++) {
        if (a[i].checked == true) {
            o.push(a[i].id)
        } else {
            f.push(a[i].id)
        }
    }
    for (i = 0; i < p.length; i++) {
        var e = 1;
        var m = p[i].getAttribute("data-monthyear").split(",");
        if (o.length > 0) {
            var r = 0;
            for (j = 0; j < o.length; j++) {
                for (k = 0; k < m.length; k++) {
                    if (o[j] == m[k]) {
                        r = 1
                    }
                }
            }
            if (r == 0) {
                e = 0
            }
        }
        var b = p[i].getAttribute("data-attributes").split(",");
        if (l.length > 0) {
            for (j = 0; j < l.length; j++) {
                var r = 0;
                for (k = 0; k < b.length; k++) {
                    if (l[j] == b[k]) {
                        r = 1
                    }
                }
                if (r == 0) {
                    e = 0
                }
            }
        }
        var d = p[i].getAttribute("data-destination").split(",");
        if (q.length > 0) {
            var r = 0;
            for (j = 0; j < q.length; j++) {
                for (k = 0; k < d.length; k++) {
                    if (q[j] == d[k]) {
                        r = 1
                    }
                }
            }
            if (r == 0) {
                e = 0
            }
        }
        if (e == 0) {
            p[i].style.display = "none"
        } else {
            p[i].style.display = "block"
        }
    }
}

function emptyList(b, d) {
    if (b) {
        if (b.options) {
            var a = b.options.length;
            var c = b.value;
            for (i = a; i >= d; i--) {
                b.options[i] = null
            }
            return c
        }
    }
}

function fillList(b, a, c) {
    for (i = 0; i < a[0].length; i++) {
        option = new Option(a[0][i], a[1][i]);
        b.options[b.length] = option
    }
    if (c) {
        b.value = c
    } else {
        b.value = ""
    }
}

function updateships(b, c) {
    var a;
    if (!c) {
        if (document.all) {
            a = document.getElementById("shipid").selectedIndex
        } else {
            c = document.getElementById("shipid").value
        }
    }
    if (b.value == "") {
        list = allships[0];
        emptyList(document.getElementById("shipid"), 1);
        fillList(document.getElementById("shipid"), list, c)
    } else {
        list = ships[b.options[b.selectedIndex].value];
        emptyList(document.getElementById("shipid"), 1);
        fillList(document.getElementById("shipid"), list, c)
    }
    if (!c) {
        document.getElementById("shipid").selectedIndex = a
    }
    if (document.getElementById("regionid")) {
        updateregions(b, document.getElementById("regionid").value)
    }
}

function updatecruises(a, b) {
    if (a.value != "") {
        list = cruises[a.options[a.selectedIndex].value];
        emptyList(document.getElementById("cruiseid"), 1);
        fillList(document.getElementById("cruiseid"), list, b)
    }
}

function updateregions(a, b) {
    if (!b) {
        b = ""
    }
    if (a.value == "") {
        list = allregions[0];
        emptyList(document.getElementById("regionid"), 1);
        fillList(document.getElementById("regionid"), list, b)
    } else {
        if (a.id == "lineid") {
            list = lineregions[a.options[a.selectedIndex].value];
            emptyList(document.getElementById("regionid"), 1);
            if (list) {
                fillList(document.getElementById("regionid"), list, b)
            }
        } else {
            list = shipregions[a.options[a.selectedIndex].value];
            emptyList(document.getElementById("regionid"), 1);
            if (list) {
                fillList(document.getElementById("regionid"), list, b)
            }
        }
    }
}

function getTimeRemaining(d) {
    var c = Date.parse(d) - Date.parse(new Date());
    var e = Math.floor((c / 1000) % 60);
    var b = Math.floor((c / 1000 / 60) % 60);
    var a = Math.floor((c / (1000 * 60 * 60)) % 24);
    var f = Math.floor(c / (1000 * 60 * 60 * 24));
    return {
        total: c,
        days: f,
        hours: a,
        minutes: b,
        seconds: e
    }
}

function initializeClock(b, e, a) {
    var d = document.getElementById(b);
    var f = d.querySelector(".minutes");
    var g = d.querySelector(".seconds");
    $(a).hide();

    function h() {
        var l = getTimeRemaining(e);
        f.innerHTML = ("0" + l.minutes).slice(-2);
        g.innerHTML = ("0" + l.seconds).slice(-2);
        if (l.total <= 0) {
            clearInterval(c);
            $(b).hide();
            $(a).show()
        }
    }
    h();
    var c = setInterval(h, 1000)
}

function zeroPad(a, b) {
    return (Array(b + 1).join("0") + a).slice(-b)
}

function cabinHoldTimer(c, g, f) {
    var h = moment(g).tz("Europe/London");
    var d = document.getElementById(c);
    var m = document.getElementById(f);
    var b = d.querySelector(".minutes");
    var l = d.querySelector(".seconds");

    function e() {
        var o = moment();
        o.add(h.utcOffset() - o.utcOffset(), "minutes");
        var p = h.diff(o, "minutes");
        var q = h.diff(o, "seconds") % (p * 60);
        if (p > 0 || q > 0) {
            b.innerHTML = zeroPad(p, 2);
            l.innerHTML = zeroPad(q, 2)
        } else {
            $(c).hide();
            $(f).show();
            clearInterval(a)
        }
    }
    e.call(this);
    var a = setInterval(e.bind(this), 1000)
}

function changelineorder() {
    if (sortedlines != null) {
        var a = $("lineid");
        var b = $("lineid").value;
        emptyList(document.getElementById("lineid"), 1);
        sortedlines.each(function(d) {
            var c = document.createElement("option");
            c.text = d.name;
            c.value = d.id;
            a.options.add(c)
        });
        if (b != null) {
            $("lineid").value = b
        }
    }
}

function showhide(a) {
    if (document.getElementById(a).checked == true) {
        document.getElementById(a + "div").style.display = "block"
    } else {
        document.getElementById(a + "div").style.display = "none"
    }
}

function togglessoption(c, a, b) {
    if ($(c).checked === true) {
        $(a).enable();
        if ($(b)) {
            $(b).enable()
        }
    } else {
        $(a).disable();
        if ($(b)) {
            $(b).disable()
        }
    }
}

function showhidecruise(a) {
    if (document.getElementById(a).checked == true) {
        document.getElementById(a + "div").style.display = "block"
    } else {
        document.getElementById(a + "div").style.display = "none"
    }
}

function hideflightdates() {
    var b = false;
    var a = false;
    if ($("prehotel")) {
        b = $("prehotel").checked
    } else {
        if ($("prehotelholder")) {
            b = $("prehotelholder").value;
            if (b == 1) {
                b = true
            }
        }
    }
    if ($("posthotel")) {
        a = $("posthotel").checked
    } else {
        if ($("posthotelholder")) {
            a = $("posthotelholder").value;
            if (a == 1) {
                a = true
            }
        }
    }
    if (b == true && a == false) {
        if ($("flightdepdivout")) {
            $("flightdepdivout").style.display = "none"
        }
        if ($("flightdepdivouttext")) {
            $("flightdepdivouttext").style.display = "block"
        }
        if ($("flightdepdivin")) {
            $("flightdepdivin").style.display = "block"
        }
        if ($("flightdepdivintext")) {
            $("flightdepdivintext").style.display = "none"
        }
        if ($("flightdepdivout2")) {
            $("flightdepdivout2").style.display = "none"
        }
        if ($("flightdepdivouttext2")) {
            $("flightdepdivouttext2").style.display = "block"
        }
        if ($("flightdepdivin2")) {
            $("flightdepdivin2").style.display = "block"
        }
        if ($("flightdepdivintext2")) {
            $("flightdepdivintext2").style.display = "none"
        }
    } else {
        if (b == false && a == true) {
            if ($("flightdepdivout")) {
                $("flightdepdivout").style.display = "block"
            }
            if ($("flightdepdivouttext")) {
                $("flightdepdivouttext").style.display = "none"
            }
            if ($("flightdepdivin")) {
                $("flightdepdivin").style.display = "none"
            }
            if ($("flightdepdivintext")) {
                $("flightdepdivintext").style.display = "block"
            }
            if ($("flightdepdivout2")) {
                $("flightdepdivout2").style.display = "block"
            }
            if ($("flightdepdivouttext2")) {
                $("flightdepdivouttext2").style.display = "none"
            }
            if ($("flightdepdivin2")) {
                $("flightdepdivin2").style.display = "none"
            }
            if ($("flightdepdivintext2")) {
                $("flightdepdivintext2").style.display = "block"
            }
        } else {
            if (b == false && a == false) {
                if ($("flightdepdivout")) {
                    $("flightdepdivout").style.display = "block"
                }
                if ($("flightdepdivouttext")) {
                    $("flightdepdivouttext").style.display = "none"
                }
                if ($("flightdepdivin")) {
                    $("flightdepdivin").style.display = "block"
                }
                if ($("flightdepdivintext")) {
                    $("flightdepdivintext").style.display = "none"
                }
                if ($("flightdepdivout2")) {
                    $("flightdepdivout2").style.display = "block"
                }
                if ($("flightdepdivouttext2")) {
                    $("flightdepdivouttext2").style.display = "none"
                }
                if ($("flightdepdivin2")) {
                    $("flightdepdivin2").style.display = "block"
                }
                if ($("flightdepdivintext2")) {
                    $("flightdepdivintext2").style.display = "none"
                }
            } else {
                if (b == true && a == true) {
                    if ($("flightdepdivout")) {
                        $("flightdepdivout").style.display = "none"
                    }
                    if ($("flightdepdivouttext")) {
                        $("flightdepdivouttext").style.display = "block"
                    }
                    if ($("flightdepdivin")) {
                        $("flightdepdivin").style.display = "none"
                    }
                    if ($("flightdepdivintext")) {
                        $("flightdepdivintext").style.display = "block"
                    }
                    if ($("flightdepdivout2")) {
                        $("flightdepdivout2").style.display = "none"
                    }
                    if ($("flightdepdivouttext2")) {
                        $("flightdepdivouttext2").style.display = "block"
                    }
                    if ($("flightdepdivin2")) {
                        $("flightdepdivin2").style.display = "none"
                    }
                    if ($("flightdepdivintext2")) {
                        $("flightdepdivintext2").style.display = "block"
                    }
                }
            }
        }
    }
}

function updatewholesaleusers(e, d, c) {
    var b = e.value;
    var a = new Array();
    for (var f = 0; f < users[b][0].length; f++) {
        var g = new Element("option", {
            value: users[b][1][f]
        }).update(users[b][0][f]);
        a.push(g)
    }
    d.update();
    a.each(function(h) {
        d.insert({
            bottom: h
        })
    });
    if (value) {
        d.value = c
    }
}
var currentimage = 0;

function initimagebrowser() {
    if (images) {
        document.getElementById("image").src = images[currentimage];
        document.getElementById("imagelink").href = bigimages[currentimage];
        document.getElementById("currentimage").innerHTML = currentimage + 1;
        document.getElementById("totalimages").innerHTML = images.length;
        if (captions) {
            document.getElementById("caption").innerHTML = captions[currentimage];
            document.getElementById("imagelink").title = captions[currentimage]
        }
    }
}

function nextimage() {
    if (images) {
        currentimage++;
        if (currentimage > images.length - 1) {
            currentimage = 0
        }
        document.getElementById("image").src = images[currentimage];
        document.getElementById("imagelink").href = bigimages[currentimage];
        document.getElementById("currentimage").innerHTML = currentimage + 1;
        document.getElementById("totalimages").innerHTML = images.length;
        if (captions) {
            document.getElementById("caption").innerHTML = captions[currentimage];
            document.getElementById("imagelink").title = captions[currentimage]
        }
    }
}

function previmage() {
    if (images) {
        currentimage--;
        if (currentimage < 0) {
            currentimage = images.length - 1
        }
        document.getElementById("image").src = images[currentimage];
        document.getElementById("imagelink").href = bigimages[currentimage];
        document.getElementById("currentimage").innerHTML = currentimage + 1;
        document.getElementById("totalimages").innerHTML = images.length;
        if (captions) {
            document.getElementById("caption").innerHTML = captions[currentimage];
            document.getElementById("imagelink").title = captions[currentimage]
        }
    }
}

function initgeneralimagebrowser(c, e, d, b) {
    var a = 0;
    if (c) {
        document.getElementById(d).src = c[a];
        document.getElementById(b + "link").href = e[a];
        document.getElementById(d + "current").innerHTML = a + 1;
        document.getElementById(d + "total").innerHTML = c.length
    }
}

function nextgeneralimage(b, d, c, a) {
    if (b) {
        currentimage++;
        if (currentimage > b.length - 1) {
            currentimage = 0
        }
        document.getElementById(c).src = b[currentimage];
        document.getElementById(a + "link").href = d[currentimage];
        document.getElementById(c + "current").innerHTML = currentimage + 1;
        document.getElementById(c + "total").innerHTML = b.length
    }
}

function prevgeneralimage(b, d, c, a) {
    if (b) {
        currentimage--;
        if (currentimage < 0) {
            currentimage = b.length - 1
        }
        document.getElementById(c).src = b[currentimage];
        document.getElementById(a + "link").href = d[currentimage];
        document.getElementById(c + "current").innerHTML = currentimage + 1;
        document.getElementById(c + "total").innerHTML = b.length
    }
}

function changeplan(b, c, a) {
    document.getElementById("deckplan").src = "/fusion/displaydeckplan.pl?sessionkey=" + b + "&image=" + c + "&caption=" + a
}

function switchtab(a) {
    if (a == "cabingrades") {
        document.getElementById("cabingrades").style.display = "block";
        document.getElementById("descrip").style.display = "none";
        document.getElementById("itinerary").style.display = "none";
        document.getElementById("shipreviews").style.display = "none";
        document.getElementById("userimages").style.display = "none";
        document.getElementById("cabingradesli").className = "tabon";
        document.getElementById("descripli").className = "";
        document.getElementById("itineraryli").className = "";
        document.getElementById("shipreviewsli").className = "";
        document.getElementById("userimagesli").className = ""
    } else {
        if (a == "descrip") {
            document.getElementById("cabingrades").style.display = "none";
            document.getElementById("descrip").style.display = "block";
            document.getElementById("itinerary").style.display = "none";
            document.getElementById("shipreviews").style.display = "none";
            document.getElementById("userimages").style.display = "none";
            document.getElementById("cabingradesli").className = "";
            document.getElementById("descripli").className = "tabon";
            document.getElementById("itineraryli").className = "";
            document.getElementById("shipreviewsli").className = "";
            document.getElementById("userimagesli").className = ""
        } else {
            if (a == "itinerary") {
                document.getElementById("cabingrades").style.display = "none";
                document.getElementById("descrip").style.display = "none";
                document.getElementById("itinerary").style.display = "block";
                document.getElementById("shipreviews").style.display = "none";
                document.getElementById("userimages").style.display = "none";
                document.getElementById("cabingradesli").className = "";
                document.getElementById("descripli").className = "";
                document.getElementById("itineraryli").className = "tabon";
                document.getElementById("shipreviewsli").className = "";
                document.getElementById("userimagesli").className = ""
            } else {
                if (a == "shipreviews") {
                    document.getElementById("cabingrades").style.display = "none";
                    document.getElementById("descrip").style.display = "none";
                    document.getElementById("itinerary").style.display = "none";
                    document.getElementById("shipreviews").style.display = "block";
                    document.getElementById("userimages").style.display = "none";
                    document.getElementById("cabingradesli").className = "";
                    document.getElementById("descripli").className = "";
                    document.getElementById("itineraryli").className = "";
                    document.getElementById("shipreviewsli").className = "tabon";
                    document.getElementById("userimagesli").className = ""
                } else {
                    if (a == "userimages") {
                        document.getElementById("cabingrades").style.display = "none";
                        document.getElementById("descrip").style.display = "none";
                        document.getElementById("itinerary").style.display = "none";
                        document.getElementById("shipreviews").style.display = "none";
                        document.getElementById("userimages").style.display = "block";
                        document.getElementById("cabingradesli").className = "";
                        document.getElementById("descripli").className = "";
                        document.getElementById("itineraryli").className = "";
                        document.getElementById("shipreviewsli").className = "";
                        document.getElementById("userimagesli").className = "tabon"
                    }
                }
            }
        }
    }
}

function switchtab2(a) {
    if (a == "cabingrades") {
        if (document.getElementById("cabingrades")) {
            document.getElementById("cabingrades").style.display = "block"
        }
        if (document.getElementById("descrip")) {
            document.getElementById("descrip").style.display = "none"
        }
        if (document.getElementById("itinerary")) {
            document.getElementById("itinerary").style.display = "none"
        }
        if (document.getElementById("shipreviews")) {
            document.getElementById("shipreviews").style.display = "none"
        }
        if (document.getElementById("userimages")) {
            document.getElementById("userimages").style.display = "none"
        }
        if (document.getElementById("searchdates")) {
            document.getElementById("searchdates").style.display = "none"
        }
        if (document.getElementById("flyer")) {
            document.getElementById("flyer").style.display = "none"
        }
        if (document.getElementById("childreninfo")) {
            document.getElementById("childreninfo").style.display = "none"
        }
        if (document.getElementById("monthviewgrid")) {
            document.getElementById("monthviewgrid").style.display = "none"
        }
        if (document.getElementById("cabingradesli")) {
            document.getElementById("cabingradesli").className = "tabon"
        }
        if (document.getElementById("descripli")) {
            document.getElementById("descripli").className = ""
        }
        if (document.getElementById("itineraryli")) {
            document.getElementById("itineraryli").className = ""
        }
        if (document.getElementById("shipreviewsli")) {
            document.getElementById("shipreviewsli").className = ""
        }
        if (document.getElementById("userimagesli")) {
            document.getElementById("userimagesli").className = ""
        }
        if (document.getElementById("searchdatesli")) {
            document.getElementById("searchdatesli").className = ""
        }
        if (document.getElementById("flyerli")) {
            document.getElementById("flyerli").className = ""
        }
        if (document.getElementById("childreninfoli")) {
            document.getElementById("childreninfoli").className = ""
        }
        if (document.getElementById("monthviewgridli")) {
            document.getElementById("monthviewgridli").className = ""
        }
        document.location.hash = "#cabingrades-tab"
    } else {
        if (a == "descrip") {
            if (document.getElementById("cabingrades")) {
                document.getElementById("cabingrades").style.display = "none"
            }
            if (document.getElementById("descrip")) {
                document.getElementById("descrip").style.display = "block"
            }
            if (document.getElementById("itinerary")) {
                document.getElementById("itinerary").style.display = "none"
            }
            if (document.getElementById("shipreviews")) {
                document.getElementById("shipreviews").style.display = "none"
            }
            if (document.getElementById("userimages")) {
                document.getElementById("userimages").style.display = "none"
            }
            if (document.getElementById("searchdates")) {
                document.getElementById("searchdates").style.display = "none"
            }
            if (document.getElementById("flyer")) {
                document.getElementById("flyer").style.display = "none"
            }
            if (document.getElementById("childreninfo")) {
                document.getElementById("childreninfo").style.display = "none"
            }
            if (document.getElementById("monthviewgrid")) {
                document.getElementById("monthviewgrid").style.display = "none"
            }
            if (document.getElementById("cabingradesli")) {
                document.getElementById("cabingradesli").className = ""
            }
            if (document.getElementById("descripli")) {
                document.getElementById("descripli").className = "tabon"
            }
            if (document.getElementById("itineraryli")) {
                document.getElementById("itineraryli").className = ""
            }
            if (document.getElementById("shipreviewsli")) {
                document.getElementById("shipreviewsli").className = ""
            }
            if (document.getElementById("userimagesli")) {
                document.getElementById("userimagesli").className = ""
            }
            if (document.getElementById("searchdatesli")) {
                document.getElementById("searchdatesli").className = ""
            }
            if (document.getElementById("flyerli")) {
                document.getElementById("flyerli").className = ""
            }
            if (document.getElementById("childreninfoli")) {
                document.getElementById("childreninfoli").className = ""
            }
            if (document.getElementById("monthviewgridli")) {
                document.getElementById("monthviewgridli").className = ""
            }
            document.location.hash = "#descrip-tab"
        } else {
            if (a == "itinerary") {
                if (document.getElementById("cabingrades")) {
                    document.getElementById("cabingrades").style.display = "none"
                }
                if (document.getElementById("descrip")) {
                    document.getElementById("descrip").style.display = "none"
                }
                if (document.getElementById("itinerary")) {
                    document.getElementById("itinerary").style.display = "block"
                }
                if (document.getElementById("shipreviews")) {
                    document.getElementById("shipreviews").style.display = "none"
                }
                if (document.getElementById("userimages")) {
                    document.getElementById("userimages").style.display = "none"
                }
                if (document.getElementById("searchdates")) {
                    document.getElementById("searchdates").style.display = "none"
                }
                if (document.getElementById("flyer")) {
                    document.getElementById("flyer").style.display = "none"
                }
                if (document.getElementById("childreninfo")) {
                    document.getElementById("childreninfo").style.display = "none"
                }
                if (document.getElementById("monthviewgrid")) {
                    document.getElementById("monthviewgrid").style.display = "none"
                }
                if (document.getElementById("cabingradesli")) {
                    document.getElementById("cabingradesli").className = ""
                }
                if (document.getElementById("descripli")) {
                    document.getElementById("descripli").className = ""
                }
                if (document.getElementById("itineraryli")) {
                    document.getElementById("itineraryli").className = "tabon"
                }
                if (document.getElementById("shipreviewsli")) {
                    document.getElementById("shipreviewsli").className = ""
                }
                if (document.getElementById("userimagesli")) {
                    document.getElementById("userimagesli").className = ""
                }
                if (document.getElementById("searchdatesli")) {
                    document.getElementById("searchdatesli").className = ""
                }
                if (document.getElementById("flyerli")) {
                    document.getElementById("flyerli").className = ""
                }
                if (document.getElementById("childreninfoli")) {
                    document.getElementById("childreninfoli").className = ""
                }
                if (document.getElementById("monthviewgridli")) {
                    document.getElementById("monthviewgridli").className = ""
                }
                document.location.hash = "#itinerary-tab"
            } else {
                if (a == "shipreviews") {
                    if (document.getElementById("cabingrades")) {
                        document.getElementById("cabingrades").style.display = "none"
                    }
                    if (document.getElementById("descrip")) {
                        document.getElementById("descrip").style.display = "none"
                    }
                    if (document.getElementById("itinerary")) {
                        document.getElementById("itinerary").style.display = "none"
                    }
                    if (document.getElementById("shipreviews")) {
                        document.getElementById("shipreviews").style.display = "block"
                    }
                    if (document.getElementById("userimages")) {
                        document.getElementById("userimages").style.display = "none"
                    }
                    if (document.getElementById("searchdates")) {
                        document.getElementById("searchdates").style.display = "none"
                    }
                    if (document.getElementById("flyer")) {
                        document.getElementById("flyer").style.display = "none"
                    }
                    if (document.getElementById("childreninfo")) {
                        document.getElementById("childreninfo").style.display = "none"
                    }
                    if (document.getElementById("monthviewgrid")) {
                        document.getElementById("monthviewgrid").style.display = "none"
                    }
                    if (document.getElementById("cabingradesli")) {
                        document.getElementById("cabingradesli").className = ""
                    }
                    if (document.getElementById("descripli")) {
                        document.getElementById("descripli").className = ""
                    }
                    if (document.getElementById("itineraryli")) {
                        document.getElementById("itineraryli").className = ""
                    }
                    if (document.getElementById("shipreviewsli")) {
                        document.getElementById("shipreviewsli").className = "tabon"
                    }
                    if (document.getElementById("userimagesli")) {
                        document.getElementById("userimagesli").className = ""
                    }
                    if (document.getElementById("searchdatesli")) {
                        document.getElementById("searchdatesli").className = ""
                    }
                    if (document.getElementById("flyerli")) {
                        document.getElementById("flyerli").className = ""
                    }
                    if (document.getElementById("childreninfoli")) {
                        document.getElementById("childreninfoli").className = ""
                    }
                    if (document.getElementById("monthviewgridli")) {
                        document.getElementById("monthviewgridli").className = ""
                    }
                    document.location.hash = "#shipreviews-tab"
                } else {
                    if (a == "userimages") {
                        if (document.getElementById("cabingrades")) {
                            document.getElementById("cabingrades").style.display = "none"
                        }
                        if (document.getElementById("descrip")) {
                            document.getElementById("descrip").style.display = "none"
                        }
                        if (document.getElementById("itinerary")) {
                            document.getElementById("itinerary").style.display = "none"
                        }
                        if (document.getElementById("shipreviews")) {
                            document.getElementById("shipreviews").style.display = "none"
                        }
                        if (document.getElementById("userimages")) {
                            document.getElementById("userimages").style.display = "block"
                        }
                        if (document.getElementById("searchdates")) {
                            document.getElementById("searchdates").style.display = "none"
                        }
                        if (document.getElementById("flyer")) {
                            document.getElementById("flyer").style.display = "none"
                        }
                        if (document.getElementById("childreninfo")) {
                            document.getElementById("childreninfo").style.display = "none"
                        }
                        if (document.getElementById("monthviewgrid")) {
                            document.getElementById("monthviewgrid").style.display = "none"
                        }
                        if (document.getElementById("cabingradesli")) {
                            document.getElementById("cabingradesli").className = ""
                        }
                        if (document.getElementById("descripli")) {
                            document.getElementById("descripli").className = ""
                        }
                        if (document.getElementById("itineraryli")) {
                            document.getElementById("itineraryli").className = ""
                        }
                        if (document.getElementById("shipreviewsli")) {
                            document.getElementById("shipreviewsli").className = ""
                        }
                        if (document.getElementById("userimagesli")) {
                            document.getElementById("userimagesli").className = "tabon"
                        }
                        if (document.getElementById("searchdatesli")) {
                            document.getElementById("searchdatesli").className = ""
                        }
                        if (document.getElementById("flyerli")) {
                            document.getElementById("flyerli").className = ""
                        }
                        if (document.getElementById("childreninfoli")) {
                            document.getElementById("childreninfoli").className = ""
                        }
                        if (document.getElementById("monthviewgridli")) {
                            document.getElementById("monthviewgridli").className = ""
                        }
                        document.location.hash = "#userimages-tab"
                    } else {
                        if (a == "searchdates") {
                            if (document.getElementById("cabingrades")) {
                                document.getElementById("cabingrades").style.display = "none"
                            }
                            if (document.getElementById("descrip")) {
                                document.getElementById("descrip").style.display = "none"
                            }
                            if (document.getElementById("itinerary")) {
                                document.getElementById("itinerary").style.display = "none"
                            }
                            if (document.getElementById("shipreviews")) {
                                document.getElementById("shipreviews").style.display = "none"
                            }
                            if (document.getElementById("userimages")) {
                                document.getElementById("userimages").style.display = "none"
                            }
                            if (document.getElementById("searchdates")) {
                                document.getElementById("searchdates").style.display = "block"
                            }
                            if (document.getElementById("flyer")) {
                                document.getElementById("flyer").style.display = "none"
                            }
                            if (document.getElementById("childreninfo")) {
                                document.getElementById("childreninfo").style.display = "none"
                            }
                            if (document.getElementById("monthviewgrid")) {
                                document.getElementById("monthviewgrid").style.display = "none"
                            }
                            if (document.getElementById("cabingradesli")) {
                                document.getElementById("cabingradesli").className = ""
                            }
                            if (document.getElementById("descripli")) {
                                document.getElementById("descripli").className = ""
                            }
                            if (document.getElementById("itineraryli")) {
                                document.getElementById("itineraryli").className = ""
                            }
                            if (document.getElementById("shipreviewsli")) {
                                document.getElementById("shipreviewsli").className = ""
                            }
                            if (document.getElementById("userimagesli")) {
                                document.getElementById("userimagesli").className = ""
                            }
                            if (document.getElementById("searchdatesli")) {
                                document.getElementById("searchdatesli").className = "tabon"
                            }
                            if (document.getElementById("flyerli")) {
                                document.getElementById("flyerli").className = ""
                            }
                            if (document.getElementById("childreninfoli")) {
                                document.getElementById("childreninfoli").className = ""
                            }
                            if (document.getElementById("monthviewgridli")) {
                                document.getElementById("monthviewgridli").className = ""
                            }
                            document.location.hash = "#searchdates-tab"
                        } else {
                            if (a == "flyer") {
                                if (document.getElementById("cabingrades")) {
                                    document.getElementById("cabingrades").style.display = "none"
                                }
                                if (document.getElementById("descrip")) {
                                    document.getElementById("descrip").style.display = "none"
                                }
                                if (document.getElementById("itinerary")) {
                                    document.getElementById("itinerary").style.display = "none"
                                }
                                if (document.getElementById("shipreviews")) {
                                    document.getElementById("shipreviews").style.display = "none"
                                }
                                if (document.getElementById("userimages")) {
                                    document.getElementById("userimages").style.display = "none"
                                }
                                if (document.getElementById("searchdates")) {
                                    document.getElementById("searchdates").style.display = "none"
                                }
                                if (document.getElementById("flyer")) {
                                    document.getElementById("flyer").style.display = "block"
                                }
                                if (document.getElementById("childreninfo")) {
                                    document.getElementById("childreninfo").style.display = "none"
                                }
                                if (document.getElementById("monthviewgrid")) {
                                    document.getElementById("monthviewgrid").style.display = "none"
                                }
                                if (document.getElementById("cabingradesli")) {
                                    document.getElementById("cabingradesli").className = ""
                                }
                                if (document.getElementById("descripli")) {
                                    document.getElementById("descripli").className = ""
                                }
                                if (document.getElementById("itineraryli")) {
                                    document.getElementById("itineraryli").className = ""
                                }
                                if (document.getElementById("shipreviewsli")) {
                                    document.getElementById("shipreviewsli").className = ""
                                }
                                if (document.getElementById("userimagesli")) {
                                    document.getElementById("userimagesli").className = ""
                                }
                                if (document.getElementById("searchdatesli")) {
                                    document.getElementById("searchdatesli").className = ""
                                }
                                if (document.getElementById("flyerli")) {
                                    document.getElementById("flyerli").className = "tabon"
                                }
                                if (document.getElementById("childreninfoli")) {
                                    document.getElementById("childreninfoli").className = ""
                                }
                                if (document.getElementById("monthviewgridli")) {
                                    document.getElementById("monthviewgridli").className = ""
                                }
                                document.location.hash = "#flyer-tab"
                            } else {
                                if (a == "childreninfo") {
                                    if (document.getElementById("cabingrades")) {
                                        document.getElementById("cabingrades").style.display = "none"
                                    }
                                    if (document.getElementById("descrip")) {
                                        document.getElementById("descrip").style.display = "none"
                                    }
                                    if (document.getElementById("itinerary")) {
                                        document.getElementById("itinerary").style.display = "none"
                                    }
                                    if (document.getElementById("shipreviews")) {
                                        document.getElementById("shipreviews").style.display = "none"
                                    }
                                    if (document.getElementById("userimages")) {
                                        document.getElementById("userimages").style.display = "none"
                                    }
                                    if (document.getElementById("searchdates")) {
                                        document.getElementById("searchdates").style.display = "none"
                                    }
                                    if (document.getElementById("flyer")) {
                                        document.getElementById("flyer").style.display = "none"
                                    }
                                    if (document.getElementById("childreninfo")) {
                                        document.getElementById("childreninfo").style.display = "block"
                                    }
                                    if (document.getElementById("monthviewgrid")) {
                                        document.getElementById("monthviewgrid").style.display = "block"
                                    }
                                    if (document.getElementById("cabingradesli")) {
                                        document.getElementById("cabingradesli").className = ""
                                    }
                                    if (document.getElementById("descripli")) {
                                        document.getElementById("descripli").className = ""
                                    }
                                    if (document.getElementById("itineraryli")) {
                                        document.getElementById("itineraryli").className = ""
                                    }
                                    if (document.getElementById("shipreviewsli")) {
                                        document.getElementById("shipreviewsli").className = ""
                                    }
                                    if (document.getElementById("userimagesli")) {
                                        document.getElementById("userimagesli").className = ""
                                    }
                                    if (document.getElementById("searchdatesli")) {
                                        document.getElementById("searchdatesli").className = ""
                                    }
                                    if (document.getElementById("flyerli")) {
                                        document.getElementById("flyerli").className = "tabon"
                                    }
                                    if (document.getElementById("childreninfoli")) {
                                        document.getElementById("childreninfoli").className = "tabon"
                                    }
                                    if (document.getElementById("monthviewgridli")) {
                                        document.getElementById("monthviewgridli").className = "tabon"
                                    }
                                    document.location.hash = "#childreninfo-tab"
                                } else {
                                    if (a == "monthviewgrid") {
                                        if (document.getElementById("cabingrades")) {
                                            document.getElementById("cabingrades").style.display = "none"
                                        }
                                        if (document.getElementById("descrip")) {
                                            document.getElementById("descrip").style.display = "none"
                                        }
                                        if (document.getElementById("itinerary")) {
                                            document.getElementById("itinerary").style.display = "none"
                                        }
                                        if (document.getElementById("shipreviews")) {
                                            document.getElementById("shipreviews").style.display = "none"
                                        }
                                        if (document.getElementById("userimages")) {
                                            document.getElementById("userimages").style.display = "none"
                                        }
                                        if (document.getElementById("searchdates")) {
                                            document.getElementById("searchdates").style.display = "none"
                                        }
                                        if (document.getElementById("flyer")) {
                                            document.getElementById("flyer").style.display = "none"
                                        }
                                        if (document.getElementById("childreninfo")) {
                                            document.getElementById("childreninfo").style.display = "none"
                                        }
                                        if (document.getElementById("monthviewgrid")) {
                                            document.getElementById("monthviewgrid").style.display = "block"
                                        }
                                        if (document.getElementById("cabingradesli")) {
                                            document.getElementById("cabingradesli").className = ""
                                        }
                                        if (document.getElementById("descripli")) {
                                            document.getElementById("descripli").className = ""
                                        }
                                        if (document.getElementById("itineraryli")) {
                                            document.getElementById("itineraryli").className = ""
                                        }
                                        if (document.getElementById("shipreviewsli")) {
                                            document.getElementById("shipreviewsli").className = ""
                                        }
                                        if (document.getElementById("userimagesli")) {
                                            document.getElementById("userimagesli").className = ""
                                        }
                                        if (document.getElementById("searchdatesli")) {
                                            document.getElementById("searchdatesli").className = ""
                                        }
                                        if (document.getElementById("flyerli")) {
                                            document.getElementById("flyerli").className = ""
                                        }
                                        if (document.getElementById("childreninfoli")) {
                                            document.getElementById("childreninfoli").className = ""
                                        }
                                        if (document.getElementById("monthviewgridli")) {
                                            document.getElementById("monthviewgridli").className = "tabon"
                                        }
                                        document.location.hash = "#monthviewgrid-tab"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function switchcabingradetab(d) {
    if (d != "" && d != null) {
        var a = document.getElementsByClassName("taboff");
        var c = document.getElementsByClassName("tabon");
        if (document.getElementById("cabingrades")) {
            document.getElementById("cabingrades").style.display = "none"
        }
        if (document.getElementById("descrip")) {
            document.getElementById("descrip").style.display = "none"
        }
        if (a != null) {
            var g = d + "li";
            for ($i = 0; $i < a.length; $i++) {
                var f = a[$i].id;
                var e = f.replace(/li$/, "");
                if (document.getElementById(e)) {
                    document.getElementById(e).style.display = "none"
                }
                if (document.getElementById(f)) {
                    document.getElementById(f).className = "taboff"
                }
            }
            if (c != null && c.length > 1) {
                var b = c[1].id.replace(/li$/, "");
                if (document.getElementById(b)) {
                    document.getElementById(b).style.display = "none"
                }
                if (document.getElementById(c[1].id)) {
                    document.getElementById(c[1].id).className = "taboff"
                }
            }
            if (document.getElementById(d)) {
                document.getElementById(d).style.display = "block"
            }
            if (document.getElementById(g)) {
                document.getElementById(g).className = "tabon"
            }
            document.location.hash = "#" + d + "-tab"
        }
    }
}

function changedeckplan(a) {
    document.getElementById("deckplanimage").src = deckplans[a];
    document.getElementById("deckplanname").innerHTML = decknames[a]
}

function changedeckplan2(b, a) {
    document.getElementById("deckplanimage").src = a;
    document.getElementById("deckplanname").innerHTML = b
}

function switchshiptab(a) {
    if (a == "descrip") {
        document.getElementById("descrip").style.display = "block";
        document.getElementById("cabintypes").style.display = "none";
        document.getElementById("facilities").style.display = "none";
        document.getElementById("shipdecks").style.display = "none";
        document.getElementById("cruises").style.display = "none";
        document.getElementById("reviews").style.display = "none";
        document.getElementById("userphotos").style.display = "none";
        document.getElementById("descripli").className = "tabon";
        document.getElementById("cabintypesli").className = "";
        document.getElementById("facilitiesli").className = "";
        document.getElementById("shipdecksli").className = "";
        document.getElementById("cruisesli").className = "";
        document.getElementById("userphotosli").className = ""
    } else {
        if (a == "cabintypes") {
            document.getElementById("descrip").style.display = "none";
            document.getElementById("cabintypes").style.display = "block";
            document.getElementById("facilities").style.display = "none";
            document.getElementById("shipdecks").style.display = "none";
            document.getElementById("cruises").style.display = "none";
            document.getElementById("reviews").style.display = "none";
            document.getElementById("userphotos").style.display = "none";
            document.getElementById("descripli").className = "";
            document.getElementById("cabintypesli").className = "tabon";
            document.getElementById("facilitiesli").className = "";
            document.getElementById("shipdecksli").className = "";
            document.getElementById("cruisesli").className = "";
            document.getElementById("reviewsli").className = "";
            document.getElementById("userphotosli").className = ""
        } else {
            if (a == "facilities") {
                document.getElementById("descrip").style.display = "none";
                document.getElementById("cabintypes").style.display = "none";
                document.getElementById("facilities").style.display = "block";
                document.getElementById("shipdecks").style.display = "none";
                document.getElementById("cruises").style.display = "none";
                document.getElementById("reviews").style.display = "none";
                document.getElementById("userphotos").style.display = "none";
                document.getElementById("descripli").className = "";
                document.getElementById("cabintypesli").className = "";
                document.getElementById("facilitiesli").className = "tabon";
                document.getElementById("shipdecksli").className = "";
                document.getElementById("cruisesli").className = "";
                document.getElementById("reviewsli").className = "";
                document.getElementById("userphotosli").className = ""
            } else {
                if (a == "shipdecks") {
                    document.getElementById("descrip").style.display = "none";
                    document.getElementById("cabintypes").style.display = "none";
                    document.getElementById("facilities").style.display = "none";
                    document.getElementById("shipdecks").style.display = "block";
                    document.getElementById("cruises").style.display = "none";
                    document.getElementById("reviews").style.display = "none";
                    document.getElementById("userphotos").style.display = "none";
                    document.getElementById("descripli").className = "";
                    document.getElementById("cabintypesli").className = "";
                    document.getElementById("facilitiesli").className = "";
                    document.getElementById("shipdecksli").className = "tabon";
                    document.getElementById("cruisesli").className = "";
                    document.getElementById("reviewsli").className = "";
                    document.getElementById("userphotosli").className = ""
                } else {
                    if (a == "cruises") {
                        document.getElementById("descrip").style.display = "none";
                        document.getElementById("cabintypes").style.display = "none";
                        document.getElementById("facilities").style.display = "none";
                        document.getElementById("shipdecks").style.display = "none";
                        document.getElementById("cruises").style.display = "block";
                        document.getElementById("reviews").style.display = "none";
                        document.getElementById("userphotos").style.display = "none";
                        document.getElementById("descripli").className = "";
                        document.getElementById("cabintypesli").className = "";
                        document.getElementById("facilitiesli").className = "";
                        document.getElementById("shipdecksli").className = "";
                        document.getElementById("cruisesli").className = "tabon";
                        document.getElementById("reviewsli").className = "";
                        document.getElementById("userphotosli").className = ""
                    } else {
                        if (a == "reviews") {
                            document.getElementById("descrip").style.display = "none";
                            document.getElementById("cabintypes").style.display = "none";
                            document.getElementById("facilities").style.display = "none";
                            document.getElementById("shipdecks").style.display = "none";
                            document.getElementById("cruises").style.display = "none";
                            document.getElementById("reviews").style.display = "block";
                            document.getElementById("userphotos").style.display = "none";
                            document.getElementById("descripli").className = "";
                            document.getElementById("cabintypesli").className = "";
                            document.getElementById("facilitiesli").className = "";
                            document.getElementById("shipdecksli").className = "";
                            document.getElementById("cruisesli").className = "";
                            document.getElementById("reviewsli").className = "tabon";
                            document.getElementById("userphotosli").className = ""
                        } else {
                            if (a == "userphotos") {
                                document.getElementById("descrip").style.display = "none";
                                document.getElementById("cabintypes").style.display = "none";
                                document.getElementById("facilities").style.display = "none";
                                document.getElementById("shipdecks").style.display = "none";
                                document.getElementById("cruises").style.display = "none";
                                document.getElementById("reviews").style.display = "none";
                                document.getElementById("userphotos").style.display = "block";
                                document.getElementById("descripli").className = "";
                                document.getElementById("cabintypesli").className = "";
                                document.getElementById("facilitiesli").className = "";
                                document.getElementById("shipdecksli").className = "";
                                document.getElementById("cruisesli").className = "";
                                document.getElementById("reviewsli").className = "";
                                document.getElementById("userphotosli").className = "tabon"
                            }
                        }
                    }
                }
            }
        }
    }
}

function switchshiptab2(a) {
    if (a == "descrip") {
        document.getElementById("descrip").style.display = "block";
        document.getElementById("cabintypes").style.display = "none";
        document.getElementById("facilities").style.display = "none";
        document.getElementById("shipdecks").style.display = "none";
        document.getElementById("cruises").style.display = "none";
        document.getElementById("reviews").style.display = "none";
        document.getElementById("userphotos").style.display = "none";
        document.getElementById("descripli").className = "tabon";
        document.getElementById("cabintypesli").className = "";
        document.getElementById("facilitiesli").className = "";
        document.getElementById("shipdecksli").className = "";
        document.getElementById("cruisesli").className = "";
        document.getElementById("userphotosli").className = "";
        document.location.hash = "#descrip-tab"
    } else {
        if (a == "cabintypes") {
            document.getElementById("descrip").style.display = "none";
            document.getElementById("cabintypes").style.display = "block";
            document.getElementById("facilities").style.display = "none";
            document.getElementById("shipdecks").style.display = "none";
            document.getElementById("cruises").style.display = "none";
            document.getElementById("reviews").style.display = "none";
            document.getElementById("userphotos").style.display = "none";
            document.getElementById("descripli").className = "";
            document.getElementById("cabintypesli").className = "tabon";
            document.getElementById("facilitiesli").className = "";
            document.getElementById("shipdecksli").className = "";
            document.getElementById("cruisesli").className = "";
            document.getElementById("reviewsli").className = "";
            document.getElementById("userphotosli").className = "";
            document.location.hash = "#cabintypes-tab"
        } else {
            if (a == "facilities") {
                document.getElementById("descrip").style.display = "none";
                document.getElementById("cabintypes").style.display = "none";
                document.getElementById("facilities").style.display = "block";
                document.getElementById("shipdecks").style.display = "none";
                document.getElementById("cruises").style.display = "none";
                document.getElementById("reviews").style.display = "none";
                document.getElementById("userphotos").style.display = "none";
                document.getElementById("descripli").className = "";
                document.getElementById("cabintypesli").className = "";
                document.getElementById("facilitiesli").className = "tabon";
                document.getElementById("shipdecksli").className = "";
                document.getElementById("cruisesli").className = "";
                document.getElementById("reviewsli").className = "";
                document.getElementById("userphotosli").className = "";
                document.location.hash = "#facilities-tab"
            } else {
                if (a == "shipdecks") {
                    document.getElementById("descrip").style.display = "none";
                    document.getElementById("cabintypes").style.display = "none";
                    document.getElementById("facilities").style.display = "none";
                    document.getElementById("shipdecks").style.display = "block";
                    document.getElementById("cruises").style.display = "none";
                    document.getElementById("reviews").style.display = "none";
                    document.getElementById("userphotos").style.display = "none";
                    document.getElementById("descripli").className = "";
                    document.getElementById("cabintypesli").className = "";
                    document.getElementById("facilitiesli").className = "";
                    document.getElementById("shipdecksli").className = "tabon";
                    document.getElementById("cruisesli").className = "";
                    document.getElementById("reviewsli").className = "";
                    document.getElementById("userphotosli").className = "";
                    document.location.hash = "#shipdecks-tab"
                } else {
                    if (a == "cruises") {
                        document.getElementById("descrip").style.display = "none";
                        document.getElementById("cabintypes").style.display = "none";
                        document.getElementById("facilities").style.display = "none";
                        document.getElementById("shipdecks").style.display = "none";
                        document.getElementById("cruises").style.display = "block";
                        document.getElementById("reviews").style.display = "none";
                        document.getElementById("userphotos").style.display = "none";
                        document.getElementById("descripli").className = "";
                        document.getElementById("cabintypesli").className = "";
                        document.getElementById("facilitiesli").className = "";
                        document.getElementById("shipdecksli").className = "";
                        document.getElementById("cruisesli").className = "tabon";
                        document.getElementById("reviewsli").className = "";
                        document.getElementById("userphotosli").className = "";
                        document.location.hash = "#cruises-tab"
                    } else {
                        if (a == "reviews") {
                            document.getElementById("descrip").style.display = "none";
                            document.getElementById("cabintypes").style.display = "none";
                            document.getElementById("facilities").style.display = "none";
                            document.getElementById("shipdecks").style.display = "none";
                            document.getElementById("cruises").style.display = "none";
                            document.getElementById("reviews").style.display = "block";
                            document.getElementById("userphotos").style.display = "none";
                            document.getElementById("descripli").className = "";
                            document.getElementById("cabintypesli").className = "";
                            document.getElementById("facilitiesli").className = "";
                            document.getElementById("shipdecksli").className = "";
                            document.getElementById("cruisesli").className = "";
                            document.getElementById("reviewsli").className = "tabon";
                            document.getElementById("userphotosli").className = "";
                            document.location.hash = "#reviews-tab"
                        } else {
                            if (a == "userphotos") {
                                document.getElementById("descrip").style.display = "none";
                                document.getElementById("cabintypes").style.display = "none";
                                document.getElementById("facilities").style.display = "none";
                                document.getElementById("shipdecks").style.display = "none";
                                document.getElementById("cruises").style.display = "none";
                                document.getElementById("reviews").style.display = "none";
                                document.getElementById("userphotos").style.display = "block";
                                document.getElementById("descripli").className = "";
                                document.getElementById("cabintypesli").className = "";
                                document.getElementById("facilitiesli").className = "";
                                document.getElementById("shipdecksli").className = "";
                                document.getElementById("cruisesli").className = "";
                                document.getElementById("reviewsli").className = "";
                                document.getElementById("userphotosli").className = "tabon";
                                document.location.hash = "#userphotos-tab"
                            }
                        }
                    }
                }
            }
        }
    }
}

function switchlinetab(a) {
    if (a == "descrip") {
        document.getElementById("descrip").style.display = "block";
        document.getElementById("ships").style.display = "none";
        document.getElementById("furtherinfo").style.display = "none";
        document.getElementById("cruises").style.display = "none";
        document.getElementById("descripli").className = "tabon";
        document.getElementById("shipsli").className = "";
        document.getElementById("furtherinfoli").className = "";
        document.getElementById("cruisesli").className = ""
    } else {
        if (a == "ships") {
            document.getElementById("descrip").style.display = "none";
            document.getElementById("ships").style.display = "block";
            document.getElementById("furtherinfo").style.display = "none";
            document.getElementById("cruises").style.display = "none";
            document.getElementById("descripli").className = "";
            document.getElementById("shipsli").className = "tabon";
            document.getElementById("furtherinfoli").className = "";
            document.getElementById("cruisesli").className = ""
        } else {
            if (a == "furtherinfo") {
                document.getElementById("descrip").style.display = "none";
                document.getElementById("ships").style.display = "none";
                document.getElementById("furtherinfo").style.display = "block";
                document.getElementById("cruises").style.display = "none";
                document.getElementById("descripli").className = "";
                document.getElementById("shipsli").className = "";
                document.getElementById("furtherinfoli").className = "tabon";
                document.getElementById("cruisesli").className = ""
            } else {
                if (a == "cruises") {
                    document.getElementById("descrip").style.display = "none";
                    document.getElementById("ships").style.display = "none";
                    document.getElementById("furtherinfo").style.display = "none";
                    document.getElementById("cruises").style.display = "block";
                    document.getElementById("descripli").className = "";
                    document.getElementById("shipsli").className = "";
                    document.getElementById("furtherinfoli").className = "";
                    document.getElementById("cruisesli").className = "tabon"
                }
            }
        }
    }
}

function switchlinetab2(a) {
    if (a == "descrip") {
        document.getElementById("descrip").style.display = "block";
        document.getElementById("ships").style.display = "none";
        document.getElementById("furtherinfo").style.display = "none";
        document.getElementById("cruises").style.display = "none";
        document.getElementById("descripli").className = "tabon";
        document.getElementById("shipsli").className = "";
        document.getElementById("furtherinfoli").className = "";
        document.getElementById("cruisesli").className = "";
        document.location.hash = "#descrip-tab"
    } else {
        if (a == "ships") {
            document.getElementById("descrip").style.display = "none";
            document.getElementById("ships").style.display = "block";
            document.getElementById("furtherinfo").style.display = "none";
            document.getElementById("cruises").style.display = "none";
            document.getElementById("descripli").className = "";
            document.getElementById("shipsli").className = "tabon";
            document.getElementById("furtherinfoli").className = "";
            document.getElementById("cruisesli").className = "";
            document.location.hash = "#ships-tab"
        } else {
            if (a == "furtherinfo") {
                document.getElementById("descrip").style.display = "none";
                document.getElementById("ships").style.display = "none";
                document.getElementById("furtherinfo").style.display = "block";
                document.getElementById("cruises").style.display = "none";
                document.getElementById("descripli").className = "";
                document.getElementById("shipsli").className = "";
                document.getElementById("furtherinfoli").className = "tabon";
                document.getElementById("cruisesli").className = "";
                document.location.hash = "#furtherinfo-tab"
            } else {
                if (a == "cruises") {
                    document.getElementById("descrip").style.display = "none";
                    document.getElementById("ships").style.display = "none";
                    document.getElementById("furtherinfo").style.display = "none";
                    document.getElementById("cruises").style.display = "block";
                    document.getElementById("descripli").className = "";
                    document.getElementById("shipsli").className = "";
                    document.getElementById("furtherinfoli").className = "";
                    document.getElementById("cruisesli").className = "tabon";
                    document.location.hash = "#cruises-tab"
                }
            }
        }
    }
}

function showcruisechildren(d, a) {
    var c;
    var b;
    if (d == "" || d == null) {
        d = "child";
        a = "children"
    }
    if (b == null) {
        b = 5
    }
    if (document.getElementById("custommaxchildren")) {
        b = document.getElementById("custommaxchildren").value
    }
    if (document.getElementById(d + "line")) {
        document.getElementById(d + "line").style.display = "none";
        for (c = 2; c <= b; c++) {
            if (document.getElementById(d + "text-" + c)) {
                document.getElementById(d + "text-" + c).style.display = "none";
                document.getElementById(d + "drop-" + c).style.display = "none"
            }
        }
    }
    if (document.getElementById(d + "line")) {
        if (document.getElementById(a).value > 0) {
            document.getElementById(d + "line").style.display = "block";
            document.getElementById(d + "ages").style.display = "block";
            for (c = 1; c <= document.getElementById(a).value; c++) {
                if (c > 1) {
                    if (document.getElementById(d + "text-" + c)) {
                        document.getElementById(d + "text-" + c).style.display = "block";
                        document.getElementById(d + "drop-" + c).style.display = "block"
                    }
                }
            }
        } else {
            if (document.getElementById(d + "ages")) {
                document.getElementById(d + "ages").style.display = "none"
            }
        }
    }
}

function itinerarycontinue(b) {
    if (b == "1" && (parseFloat(document.getElementById("profit").innerHTML) < 0)) {
        alert("The basket profit is less than 0.")
    } else {
        if (b == "2" && (parseFloat(document.getElementById("manualprice").innerHTML)) < (parseFloat(document.getElementById("totalprice").innerHTML))) {
            alert("The basket price is less than selling price.")
        } else {
            var a = document.getElementById("itineraryform");
            if (a.onsubmit == null || a.onsubmit()) {
                a.submit()
            }
        }
    }
}

function DPCruiseWrapper(e, a, d) {
    if (a == "flycruise") {
        if ($("flycruise-depair") && $("cruiseflight")) {
            $("cruisedepair").value = $("flycruise-depair").value
        }
        if ($("flycruise-destair") && $("cruisedestair")) {
            $("cruisedestair").value = $("flycruise-destair").value
        }
        if ($("flycruise-flightclass") && $("flightclass")) {
            $("flightclass").value = $("flycruise-flightclass").value
        }
        if ($("cruiseflight")) {
            $("cruiseflight").value = "Y"
        }
        if ($("cruiseprehotel") && $("flycruise-cruiseprehotel")) {
            var c = $("flycruise-cruiseprehotel").value;
            if (c == "Y" && d == "1") {
                $("cruiseprehotel").value = "N"
            } else {
                $("cruiseprehotel").value = c
            }
        }
        if ($("cruisepredays") && $("flycruise-cruisepredays")) {
            $("cruisepredays").value = $("flycruise-cruisepredays").value
        }
        if ($("cruisepredest") && $("flycruise-cruisepredest")) {
            $("cruisepredest").value = $("flycruise-cruisepredest").value
        }
        if ($("cruiseflightout") && $("flycruise-cruiseflightout")) {
            $("cruiseflightout").value = $("flycruise-cruiseflightout").value
        }
        if ($("cruiseflightin")) {
            $("cruiseflightin").value = 0
        }
    } else {
        if (a == "custompackage") {
            if ($("cruisepackage-depair") && $("cruiseflight")) {
                $("cruisedepair").value = $("cruisepackage-depair").value;
                if ($("cruiseflight") && $("cruisedepair").value != "") {
                    $("cruiseflight").value = "Y"
                } else {
                    $("cruiseflight").value = "N"
                }
            } else {
                if ($("cruiseflight")) {
                    $("cruiseflight").value = "N"
                }
            }
            if ($("cruisepackage-destair") && $("cruisedestair")) {
                $("cruisedestair").value = $("cruisepackage-destair").value
            }
            if ($("cruisepackage-flightclass") && $("flightclass")) {
                $("flightclass").value = $("cruisepackage-flightclass").value
            }
            if ($("cruisepackage-flightclass") && $("flightclass")) {
                $("flightclass").value = $("cruisepackage-flightclass").value
            }
            if ($("cruisepackage-flightout") && $("cruiseflightout")) {
                $("cruiseflightout").value = $("cruisepackage-flightout").value
            }
            if ($("cruisepackage-flightin") && $("cruiseflightin")) {
                $("cruiseflightin").value = $("cruisepackage-flightin").value
            }
            if ($("cruisepackage-cruiseprehotel")) {
                var b = $("cruisepackage-cruiseprehotel").checked;
                if ($("cruisepackage-cruisepredays") && $("cruisepredays")) {
                    $("cruisepredays").value = (b == true ? $("cruisepackage-cruisepredays").value : "");
                    if ($("cruiseprehotel")) {
                        $("cruiseprehotel").value = (b == true ? "Y" : "")
                    }
                } else {
                    if (b == false) {
                        $("cruiseprehotel").value = ""
                    }
                }
                if ($("cruisepackage-cruisepredest") && $("cruisepredest")) {
                    $("cruisepredest").value = (b == true ? $("cruisepackage-cruisepredest").value : "")
                }
            }
            if ($("cruisepackage-cruiseposthotel")) {
                var b = $("cruisepackage-cruiseposthotel").checked;
                if ($("cruisepackage-cruisepostdays") && $("cruisepostdays")) {
                    $("cruisepostdays").value = (b == true ? $("cruisepackage-cruisepostdays").value : "");
                    if ($("cruiseposthotel")) {
                        $("cruiseposthotel").value = (b == true ? "Y" : "")
                    }
                } else {
                    if (b == false) {
                        $("cruiseposthotel").value = ""
                    }
                }
                if ($("cruisepackage-cruisepostdest") && $("cruisepostdest")) {
                    $("cruisepostdest").value = (b == true ? $("cruisepackage-cruisepostdest").value : "")
                }
            }
        } else {
            if ($("cruiseflight")) {
                $("cruiseflight").value = "N"
            }
            if ($("cruisepackage-prehotel")) {
                $("cruisepackage-prehotel") = "N"
            }
            if ($("cruisepackage-posthotel")) {
                $("cruisepackage-posthotel") = "N"
            }
        }
    }
    itinerarycontinue(e)
}

function DPCruiseFlights(a) {
    if (a) {
        if (a.checked == true) {
            if (a.name == "cruisepackage-cruiseprehotel") {
                if ($("cruisepackage-flightout-option")) {
                    $("cruisepackage-flightout-option").style.display = "none"
                }
                if ($("cruisepackage-flightout-text")) {
                    $("cruisepackage-flightout-text").style.display = "block"
                }
            }
            if (a.name == "cruisepackage-cruiseposthotel") {
                if ($("cruisepackage-flightin-option")) {
                    $("cruisepackage-flightin-option").style.display = "none"
                }
                if ($("cruisepackage-flightin-text")) {
                    $("cruisepackage-flightin-text").style.display = "block"
                }
            }
        } else {
            if (a.name == "cruisepackage-cruiseprehotel") {
                if ($("cruisepackage-flightout-option")) {
                    $("cruisepackage-flightout-option").style.display = "block"
                }
                if ($("cruisepackage-flightout-text")) {
                    $("cruisepackage-flightout-text").style.display = "none"
                }
            }
            if (a.name == "cruisepackage-cruiseposthotel") {
                if ($("cruisepackage-flightin-option")) {
                    $("cruisepackage-flightin-option").style.display = "block"
                }
                if ($("cruisepackage-flightin-text")) {
                    $("cruisepackage-flightin-text").style.display = "none"
                }
            }
        }
    }
}

function dpinitlists(e, a, b, m, h, d, c, g, l) {
    var f = document.getElementById("noinitlists");
    if (f) {
        return
    }
    if (document.getElementById("country")) {
        if (document.getElementById("country").options) {
            dpfillcountry(e)
        }
    }
    if (document.getElementById("destair")) {
        dpfilldestination(e || document.getElementById("country").value, a)
    }
    if (document.getElementById("resort")) {
        dpfillresort(a || document.getElementById("destair").value, b)
    }
    if (document.getElementById("depair")) {
        dpfilldepart(a || document.getElementById("destair").value, m)
    }
    if (document.getElementById("skidepartparent")) {
        if (typeof(skidepartureparentlist) != "undefined") {
            filllmdropdowns("skidepartparent", skidepartureparentlist, "skidepartchild", skideparturechildlist, h)
        } else {
            filllmdropdowns("skidepartparent", departureparentlist, "skidepartchild", departurechildlist, h)
        }
    } else {
        if (document.getElementById("departparent")) {
            dpfillparent("departparent", h || document.getElementById("departparent").value)
        }
    }
    if (document.getElementById("departchild") && !document.getElementById("skidepartchild")) {
        dpfillchild("departchild", c || document.getElementById("departparent").value, "departparent", h)
    }
    if (document.getElementById("skidestinationparent")) {
        if (typeof(skidestinationparentlist) != "undefined") {
            filllmdropdowns("skidestinationparent", skidestinationparentlist, "skidestinationchild", skidestinationchildlist, d)
        } else {
            filllmdropdowns("skidestinationparent", destinationparentlist, "skidestinationchild", destinationchildlist, d)
        }
    } else {
        if (document.getElementById("destinationparent")) {
            dpfillparent("destinationparent", d || document.getElementById("destinationparent").value)
        }
    }
    if (document.getElementById("destinationchild") && !document.getElementById("skidestinationchild")) {
        dpfillchild("destinationchild", g || document.getElementById("destinationchild").value, "destinationparent", d, l)
    }
    if (document.getElementById("lmdepartparent")) {
        filllmdropdowns("lmdepartparent", lmdepartureparentlist, "lmdepartchild", lmdeparturechildlist, h)
    }
    if (document.getElementById("lmdestinationparent")) {
        filllmdropdowns("lmdestinationparent", lmdestinationparentlist, "lmdestinationchild", lmdestinationchildlist, d)
    }
}

function filllmdropdowns(b, d, g, l, e) {
    var m = document.getElementById(b);
    m.length = 0;
    var f = new Array();
    f = d;
    var a = emptyList(m, 0);
    for (var c = 0; c < f.length; c++) {
        var h = f[c].split(":");
        m.options.add(new Option(h[1], h[0]))
    }
    setfield(b, e || a);
    lmfillchild(g, "", b, m.options[m.selectedIndex].value, l)
}

function lmfillchild(h, e, b, l, f) {
    var d = document.getElementById(h);
    if (d) {
        if (!d.options) {
            return
        }
    }
    if (l == "") {
        l = document.getElementById(b).options[0].value
    }
    var a = emptyList(d, 0);
    if (b.match("departparent")) {
        option = new Option("[Any Airport]", "");
        if (typeof(f[l]) == "undefined") {
            f = skideparturechildlist
        }
    } else {
        option = new Option("[Any Resort]", "");
        if (typeof(f[l]) == "undefined") {
            f = skidestinationchildlist
        }
    }
    d.options[d.length] = option;
    for (var c = 0; c < f[l].length; c++) {
        var g = f[l][c].split(":");
        if (g[1]) {
            option = new Option(g[1], g[0])
        } else {
            option = new Option(g[0], g[0])
        }
        d.options[d.length] = option
    }
    setfield(h, e || a)
}

function displaydiv(b, a) {
    if (typeof(a) == "object" && (a instanceof Array)) {
        for (i = 0; i < a.length; i++) {
            hidediv(a[i])
        }
    } else {
        hidediv(a)
    }
    document.getElementById(b.value + "search").style.display = ""
}

function hidediv(a) {
    document.getElementById(a + "search").style.display = "none"
}

function updatesearchform(b, a) {
    document.getElementById("skipackage").value = b + "on";
    if (b == "package") {
        b = ""
    } else {
        b = b + "search"
    }
    document.getElementById("referrer").value = b;
    document.getElementById("searchby").value = a
}

function dpfillparent(d, a) {
    var f = new Array();
    if (d == "departparent") {
        f = departureparentlist
    } else {
        f = destinationparentlist
    }
    var e = document.getElementById(d);
    if (e) {
        if (!e.options) {
            return
        }
    }
    var g = emptyList(e, 0);
    for (var c = 0; c < f.length; c++) {
        var b = f[c].split(":");
        if (b[1]) {
            option = new Option(b[1], b[0])
        } else {
            option = new Option(b[0], b[0])
        }
        e.options[e.length] = option
    }
    setfield(d, a || g)
}

function dpfillchild(l, f, c, m, a) {
    var g = new Array();
    if (c == "departparent") {
        g = departurechildlist
    } else {
        g = destinationchildlist
    }
    var e = document.getElementById(l);
    if (e) {
        if (!e.options) {
            return
        }
    }
    if (m == "") {
        m = document.getElementById(c).options[0].value
    }
    var b = emptyList(e, 0);
    if (c == "departparent") {
        option = new Option("[Any Airport]", "");
        e.options[e.length] = option
    } else {
        if (a != "1") {
            option = new Option("[Any Resort]", "");
            e.options[e.length] = option
        }
    }
    for (var d = 0; d < g[m].length; d++) {
        var h = g[m][d].split(":");
        if (h[1]) {
            option = new Option(h[1], h[0])
        } else {
            option = new Option(h[0], h[0])
        }
        e.options[e.length] = option
    }
    setfield(l, f || b)
}

function dpchangecountry(a, c, b) {
    if (c == "resort") {
        dpfillcountryresort(a || document.getElementById("country").value, b)
    } else {
        dpfilldestination(a || document.getElementById("country").value);
        dpchangedestination()
    }
}

function dpchangedestination() {
    dpfillresort(document.getElementById("destair").value);
    dpfilldepart(document.getElementById("destair").value)
}

function dpchangedepair() {
    if (document.getElementById("from") && document.getElementById("depair")) {
        document.getElementById("from").value = document.getElementById("depair").value
    }
}

function dpchangefrom() {
    if (document.getElementById("from") && document.getElementById("depair")) {
        document.getElementById("depair").value = document.getElementById("from").value
    }
}

function dpfillcountry(a, c) {
    var d = document.getElementById("country");
    if (d) {
        if (!d.options) {
            return
        }
    }
    var e = emptyList(d, 0);
    if (c) {
        for (var b = 0; b < ferrycountrylist[c].length; b++) {
            option = new Option(ferrycountrylist[c][b], ferrycountrylist[c][b]);
            d.options[d.length] = option
        }
    } else {
        for (var b = 0; b < countrylist.length; b++) {
            option = new Option(countrylist[b], countrylist[b]);
            d.options[d.length] = option
        }
    }
    setfield("country", a || e)
}

function dpfilldestination(a, b) {
    var e = document.getElementById("destair");
    if (e) {
        if (!e.options) {
            return
        }
    }
    var f = emptyList(e, 0);
    if (!inlist(a, "country")) {
        a = document.getElementById("country").value || document.getElementById("country").options[0].value
    }
    for (var d = 0; d < destinationlist[a].length; d++) {
        var c = destinationlist[a][d].split(":");
        if (c[1]) {
            option = new Option(c[1], c[0])
        } else {
            option = new Option(c[0], c[0])
        }
        e.options[e.length] = option
    }
    setfield("destair", b || f)
}

function dpfillresort(b, e, a) {
    var f = document.getElementById("resort");
    if (f) {
        if (!f.options) {
            return
        }
    }
    if (!inlist(b, "destair") && a == null) {
        b = document.getElementById("destair").value || document.getElementById("destair").options[0].value
    }
    if (f) {
        var g = emptyList(f, 0);
        option = new Option("[Any Resort]", "");
        f.options[f.length] = option;
        for (var d = 0; d < resortlist[b].length; d++) {
            var c = resortlist[b][d].split(":");
            if (c[1]) {
                option = new Option(c[1], c[0])
            } else {
                option = new Option(c[0], c[0])
            }
            f.options[f.length] = option
        }
        setfield("resort", e || g)
    }
}

function dpfillcountryresort(a, d) {
    var e = document.getElementById("resort");
    if (e) {
        if (!e.options) {
            return
        }
    }
    if (e) {
        var f = emptyList(e, 0);
        option = new Option("[Any Resort]", "");
        e.options[e.length] = option;
        if (countryresortlist[a]) {
            for (var c = 0; c < countryresortlist[a].length; c++) {
                var b = countryresortlist[a][c].split(":");
                if (b[1]) {
                    option = new Option(b[1], b[0])
                } else {}
                e.options[e.length] = option
            }
            setfield("resort", d || f)
        }
    }
}

function dpsetcountryfromresort(a) {
    if (a != null) {
        for (var d = 0; d < countrylist.length; d++) {
            var e = countrylist[d];
            for (var b = 0; b < destinationlist[e].length; b++) {
                var c = destinationlist[e][b].split(":");
                if (c[0] == a) {
                    document.getElementById("country").value = e
                }
            }
        }
    }
    return
}

function dpfilldepart(c, g) {
    var f = document.getElementById("depair");
    if (f) {
        if (!f.options) {
            return
        }
    }
    var b = document.getElementById("destair");
    if (!b) {
        return
    }
    var a = document.getElementById("from");
    var h = emptyList(f, 0);
    if (!inlist(c, "destair")) {
        c = document.getElementById("destair").value || document.getElementById("destair").options[0].value
    }
    if (f) {
        for (var e = 0; e < departlist[c].length; e++) {
            var d = departlist[c][e].split(":");
            if (d[1]) {
                option = new Option(d[1], d[0])
            } else {
                option = new Option(d[0], d[0])
            }
            f.options[f.length] = option
        }
        setfield("depair", g || h);
        if (document.getElementById("from")) {
            setfield("from", g || h)
        }
    }
}

function dpsearchtype(c) {
    var a = document.getElementById("bytext");
    var b = document.getElementById("bydest");
    if (a && b) {
        if (c == "text") {
            if (b) {
                b.style.display = "none"
            }
            if (a) {
                a.style.display = "block"
            }
            if (document.getElementById("searchby")) {
                document.getElementById("searchby").value = "text"
            }
        } else {
            if (c == "dest") {
                if (b) {
                    b.style.display = "block"
                }
                if (a) {
                    a.style.display = "none"
                }
                if (document.getElementById("searchby")) {
                    document.getElementById("searchby").value = "dest"
                }
            }
        }
    }
}

function dpshowmoreoptions() {
    document.getElementById("extraoptionslink").style.display = "none";
    document.getElementById("extraoptions").style.display = "block"
}

function setfield(a, b) {
    if (document.getElementById(a)) {
        if (document.getElementById(a).options) {
            if (b) {
                if (inlist(b, a)) {
                    document.getElementById(a).value = b
                } else {
                    if (document.getElementById(a).options[0]) {
                        document.getElementById(a).value = document.getElementById(a).options[0].value
                    }
                }
            } else {
                document.getElementById(a).value = document.getElementById(a).options[0].value
            }
        } else {
            if (document.getElementById(a).type === "checkbox") {
                if (document.getElementById(a).value == b) {
                    document.getElementById(a).checked = true
                }
            } else {
                document.getElementById(a).value = b
            }
        }
    } else {
        if (document.getElementById("" + a + b)) {
            document.getElementById("" + a + b).checked = true
        }
    }
}

function inlist(e, d) {
    var c = document.getElementById(d);
    var a = 0;
    if (c) {
        for (var b = 0; b < c.length; b++) {
            if (c.options[b].value == e) {
                a = 1
            }
        }
    }
    return a
}

function roomchange() {
    var a = document.getElementById("roomcount");
    if (a) {
        if (document.getElementById("roomcount").value == 1) {
            if (document.getElementById("room2label")) {
                document.getElementById("room2label").style.display = "none"
            }
            if (document.getElementById("room2select")) {
                document.getElementById("room2select").style.display = "none"
            }
            if (document.getElementById("room2select2")) {
                document.getElementById("room2select2").style.display = "none"
            }
            if (document.getElementById("room2select3")) {
                document.getElementById("room2select3").style.display = "none"
            }
            if (document.getElementsByName("roomtype2").length > 0) {
                document.getElementsByName("roomtype2")[0].required = false
            }
            if (document.getElementById("room3label")) {
                document.getElementById("room3label").style.display = "none"
            }
            if (document.getElementById("room3select")) {
                document.getElementById("room3select").style.display = "none"
            }
            if (document.getElementById("room3select2")) {
                document.getElementById("room3select2").style.display = "none"
            }
            if (document.getElementById("room3select3")) {
                document.getElementById("room3select3").style.display = "none"
            }
            if (document.getElementsByName("roomtype3").length > 0) {
                document.getElementsByName("roomtype3")[0].required = false
            }
            if (document.getElementById("room4label")) {
                document.getElementById("room4label").style.display = "none"
            }
            if (document.getElementById("room4select")) {
                document.getElementById("room4select").style.display = "none"
            }
            if (document.getElementById("room4select2")) {
                document.getElementById("room4select2").style.display = "none"
            }
            if (document.getElementById("room4select3")) {
                document.getElementById("room4select3").style.display = "none"
            }
            if (document.getElementsByName("roomtype4").length > 0) {
                document.getElementsByName("roomtype4")[0].required = false
            }
            if (document.getElementById("room5label")) {
                document.getElementById("room5label").style.display = "none"
            }
            if (document.getElementById("room5select")) {
                document.getElementById("room5select").style.display = "none"
            }
            if (document.getElementById("room5select2")) {
                document.getElementById("room5select2").style.display = "none"
            }
            if (document.getElementById("room5select3")) {
                document.getElementById("room5select3").style.display = "none"
            }
            if (document.getElementsByName("roomtype5").length > 0) {
                document.getElementsByName("roomtype5")[0].required = false
            }
        } else {
            if (document.getElementById("roomcount").value == 2) {
                if (document.getElementById("room2label")) {
                    document.getElementById("room2label").style.display = "block"
                }
                if (document.getElementById("room2select")) {
                    document.getElementById("room2select").style.display = "block"
                }
                if (document.getElementById("room2select2")) {
                    document.getElementById("room2select2").style.display = "block"
                }
                if (document.getElementById("room2select3")) {
                    document.getElementById("room2select3").style.display = "block"
                }
                if (document.getElementsByName("roomtype2").length > 0) {
                    document.getElementsByName("roomtype2")[0].required = true
                }
                if (document.getElementById("room3label")) {
                    document.getElementById("room3label").style.display = "none"
                }
                if (document.getElementById("room3select")) {
                    document.getElementById("room3select").style.display = "none"
                }
                if (document.getElementById("room3select2")) {
                    document.getElementById("room3select2").style.display = "none"
                }
                if (document.getElementById("room3select3")) {
                    document.getElementById("room3select3").style.display = "none"
                }
                if (document.getElementsByName("roomtype3").length > 0) {
                    document.getElementsByName("roomtype3")[0].required = false
                }
                if (document.getElementById("room4label")) {
                    document.getElementById("room4label").style.display = "none"
                }
                if (document.getElementById("room4select")) {
                    document.getElementById("room4select").style.display = "none"
                }
                if (document.getElementById("room4select2")) {
                    document.getElementById("room4select2").style.display = "none"
                }
                if (document.getElementById("room4select3")) {
                    document.getElementById("room4select3").style.display = "none"
                }
                if (document.getElementsByName("roomtype4").length > 0) {
                    document.getElementsByName("roomtype4")[0].required = false
                }
                if (document.getElementById("room5label")) {
                    document.getElementById("room5label").style.display = "none"
                }
                if (document.getElementById("room5select")) {
                    document.getElementById("room5select").style.display = "none"
                }
                if (document.getElementById("room5select2")) {
                    document.getElementById("room5select2").style.display = "none"
                }
                if (document.getElementById("room5select3")) {
                    document.getElementById("room5select3").style.display = "none"
                }
                if (document.getElementsByName("roomtype5").length > 0) {
                    document.getElementsByName("roomtype5")[0].required = false
                }
            } else {
                if (document.getElementById("roomcount").value == 3) {
                    if (document.getElementById("room2label")) {
                        document.getElementById("room2label").style.display = "block"
                    }
                    if (document.getElementById("room2select")) {
                        document.getElementById("room2select").style.display = "block"
                    }
                    if (document.getElementById("room2select2")) {
                        document.getElementById("room2select2").style.display = "block"
                    }
                    if (document.getElementById("room2select3")) {
                        document.getElementById("room2select3").style.display = "block"
                    }
                    if (document.getElementsByName("roomtype2").length > 0) {
                        document.getElementsByName("roomtype2")[0].required = true
                    }
                    if (document.getElementById("room3label")) {
                        document.getElementById("room3label").style.display = "block"
                    }
                    if (document.getElementById("room3select")) {
                        document.getElementById("room3select").style.display = "block"
                    }
                    if (document.getElementById("room3select2")) {
                        document.getElementById("room3select2").style.display = "block"
                    }
                    if (document.getElementById("room3select3")) {
                        document.getElementById("room3select3").style.display = "block"
                    }
                    if (document.getElementsByName("roomtype3").length > 0) {
                        document.getElementsByName("roomtype3")[0].required = true
                    }
                    if (document.getElementById("room4label")) {
                        document.getElementById("room4label").style.display = "none"
                    }
                    if (document.getElementById("room4select")) {
                        document.getElementById("room4select").style.display = "none"
                    }
                    if (document.getElementById("room4select2")) {
                        document.getElementById("room4select2").style.display = "none"
                    }
                    if (document.getElementById("room4select3")) {
                        document.getElementById("room4select3").style.display = "none"
                    }
                    if (document.getElementsByName("roomtype4").length > 0) {
                        document.getElementsByName("roomtype4")[0].required = false
                    }
                    if (document.getElementById("room5label")) {
                        document.getElementById("room5label").style.display = "none"
                    }
                    if (document.getElementById("room5select")) {
                        document.getElementById("room5select").style.display = "none"
                    }
                    if (document.getElementById("room5select2")) {
                        document.getElementById("room5select2").style.display = "none"
                    }
                    if (document.getElementById("room5select3")) {
                        document.getElementById("room5select3").style.display = "none"
                    }
                    if (document.getElementsByName("roomtype5").length > 0) {
                        document.getElementsByName("roomtype5")[0].required = false
                    }
                } else {
                    if (document.getElementById("roomcount").value == 4) {
                        if (document.getElementById("room2label")) {
                            document.getElementById("room2label").style.display = "block"
                        }
                        if (document.getElementById("room2select")) {
                            document.getElementById("room2select").style.display = "block"
                        }
                        if (document.getElementById("room2select2")) {
                            document.getElementById("room2select2").style.display = "block"
                        }
                        if (document.getElementById("room2select3")) {
                            document.getElementById("room2select3").style.display = "block"
                        }
                        if (document.getElementsByName("roomtype2").length > 0) {
                            document.getElementsByName("roomtype2")[0].required = true
                        }
                        if (document.getElementById("room3label")) {
                            document.getElementById("room3label").style.display = "block"
                        }
                        if (document.getElementById("room3select")) {
                            document.getElementById("room3select").style.display = "block"
                        }
                        if (document.getElementById("room3select2")) {
                            document.getElementById("room3select2").style.display = "block"
                        }
                        if (document.getElementById("room3select3")) {
                            document.getElementById("room3select3").style.display = "block"
                        }
                        if (document.getElementsByName("roomtype3").length > 0) {
                            document.getElementsByName("roomtype3")[0].required = true
                        }
                        if (document.getElementById("room4label")) {
                            document.getElementById("room4label").style.display = "block"
                        }
                        if (document.getElementById("room4select")) {
                            document.getElementById("room4select").style.display = "block"
                        }
                        if (document.getElementById("room4select2")) {
                            document.getElementById("room4select2").style.display = "block"
                        }
                        if (document.getElementById("room4select3")) {
                            document.getElementById("room4select3").style.display = "block"
                        }
                        if (document.getElementsByName("roomtype4").length > 0) {
                            document.getElementsByName("roomtype4")[0].required = true
                        }
                        if (document.getElementById("room5label")) {
                            document.getElementById("room5label").style.display = "none"
                        }
                        if (document.getElementById("room5select")) {
                            document.getElementById("room5select").style.display = "none"
                        }
                        if (document.getElementById("room5select2")) {
                            document.getElementById("room5select2").style.display = "none"
                        }
                        if (document.getElementById("room5select3")) {
                            document.getElementById("room5select3").style.display = "none"
                        }
                        if (document.getElementsByName("roomtype5").length > 0) {
                            document.getElementsByName("roomtype5")[0].required = false
                        }
                    } else {
                        if (document.getElementById("roomcount").value == 5) {
                            if (document.getElementById("room2label")) {
                                document.getElementById("room2label").style.display = "block"
                            }
                            if (document.getElementById("room2select")) {
                                document.getElementById("room2select").style.display = "block"
                            }
                            if (document.getElementById("room2select2")) {
                                document.getElementById("room2select2").style.display = "block"
                            }
                            if (document.getElementById("room2select3")) {
                                document.getElementById("room2select3").style.display = "block"
                            }
                            if (document.getElementsByName("roomtype2").length > 0) {
                                document.getElementsByName("roomtype2")[0].required = true
                            }
                            if (document.getElementById("room3label")) {
                                document.getElementById("room3label").style.display = "block"
                            }
                            if (document.getElementById("room3select")) {
                                document.getElementById("room3select").style.display = "block"
                            }
                            if (document.getElementById("room3select2")) {
                                document.getElementById("room3select2").style.display = "block"
                            }
                            if (document.getElementById("room3select3")) {
                                document.getElementById("room3select3").style.display = "block"
                            }
                            if (document.getElementsByName("roomtype3").length > 0) {
                                document.getElementsByName("roomtype3")[0].required = true
                            }
                            if (document.getElementById("room4label")) {
                                document.getElementById("room4label").style.display = "block"
                            }
                            if (document.getElementById("room4select")) {
                                document.getElementById("room4select").style.display = "block"
                            }
                            if (document.getElementById("room4select2")) {
                                document.getElementById("room4select2").style.display = "block"
                            }
                            if (document.getElementById("room4select3")) {
                                document.getElementById("room4select3").style.display = "block"
                            }
                            if (document.getElementsByName("roomtype4").length > 0) {
                                document.getElementsByName("roomtype4")[0].required = true
                            }
                            if (document.getElementById("room5label")) {
                                document.getElementById("room5label").style.display = "block"
                            }
                            if (document.getElementById("room5select")) {
                                document.getElementById("room5select").style.display = "block"
                            }
                            if (document.getElementById("room5select2")) {
                                document.getElementById("room5select2").style.display = "block"
                            }
                            if (document.getElementById("room5select3")) {
                                document.getElementById("room5select3").style.display = "block"
                            }
                            if (document.getElementsByName("roomtype5").length > 0) {
                                document.getElementsByName("roomtype5")[0].required = true
                            }
                        }
                    }
                }
            }
        }
        if (document.getElementById("childline-1")) {
            showchildren()
        }
    }
}

function showchildren(a) {
    if (a == null) {
        a = 5
    }
    if (document.getElementById("custommaxchildren")) {
        a = document.getElementById("custommaxchildren").value
    }
    if (document.getElementById("childline-1")) {
        var c;
        var b = 0;
        for (c = 1; c <= a; c++) {
            if (document.getElementById("childline-" + c)) {
                document.getElementById("childline-" + c).style.display = "none";
                for (i = 2; i <= a; i++) {
                    if (document.getElementById("childtext-" + c + "-" + i)) {
                        document.getElementById("childtext-" + c + "-" + i).style.display = "none";
                        document.getElementById("childdrop-" + c + "-" + i).style.display = "none"
                    }
                }
            }
        }
        for (c = 1; c <= document.getElementById("roomcount").value; c++) {
            if (document.getElementById("children-" + c)) {
                if (document.getElementById("children-" + c).value > 0) {
                    document.getElementById("childline-" + c).style.display = "block";
                    document.getElementById("childages").style.display = "block";
                    for (i = 1; i <= document.getElementById("children-" + c).value; i++) {
                        if (i > 1) {
                            document.getElementById("childtext-" + c + "-" + i).style.display = "block";
                            document.getElementById("childdrop-" + c + "-" + i).style.display = "block"
                        }
                    }
                    b = 1
                }
            }
        }
        if (b == 0) {
            document.getElementById("childages").style.display = "none";
            if (document.getElementById("freechild1")) {
                document.getElementById("freechild1").checked = false
            }
        }
    }
    if (document.getElementById("childline")) {
        for (i = 2; i <= a; i++) {
            document.getElementById("childtext-" + i).style.display = "none";
            document.getElementById("childdrop-" + i).style.display = "none"
        }
        for (i = 1; i <= document.getElementById("children").value; i++) {
            if (i > 1) {
                document.getElementById("childtext-" + i).style.display = "block";
                document.getElementById("childdrop-" + i).style.display = "block"
            }
        }
        if (document.getElementById("children").value > 0) {
            document.getElementById("childages").style.display = "block"
        } else {
            document.getElementById("childages").style.display = "none"
        }
    }
}

function warningsubmit(b, c) {
    var a = parseInt(b.readAttribute("data-submissions"));
    if (!a) {
        a = 0
    }
    a++;
    b.writeAttribute("data-submissions", a);
    console.log(b.readAttribute("data-submissions"));
    if (parseInt(b.readAttribute("data-submissions")) === 1) {
        if (typeof(c) === "function") {
            c(b)
        } else {
            alert(c)
        }
        return false
    } else {
        if (parseInt(b.readAttribute("data-submissions")) == 2) {
            setcookie("vmb-detailsupdated", 1, "/", 1000, 1, 1);
            return true
        }
    }
    return true
}

function showadults(b) {
    if (b == null) {
        b = 5
    }
    if (document.getElementById("adultline-1")) {
        var a;
        for (a = 1; a <= b; a++) {
            if (document.getElementById("adultline-" + a)) {
                document.getElementById("adultline-" + a).style.display = "none";
                for (i = 2; i <= b; i++) {
                    document.getElementById("adulttext-" + a + "-" + i).style.display = "none";
                    document.getElementById("adultdrop-" + a + "-" + i).style.display = "none"
                }
            }
        }
    }
    if (document.getElementById("adultline")) {
        for (i = 2; i <= b; i++) {
            document.getElementById("adulttext-" + i).style.display = "none";
            document.getElementById("adultdrop-" + i).style.display = "none"
        }
        for (i = 1; i <= document.getElementById("adults").value; i++) {
            if (i > 1) {
                document.getElementById("adulttext-" + i).style.display = "block";
                document.getElementById("adultdrop-" + i).style.display = "block"
            }
        }
        if (document.getElementById("adults").value > 0) {
            document.getElementById("adultages").style.display = "table-row"
        } else {
            document.getElementById("adultages").style.display = "none"
        }
    }
}

function displayflights(b) {
    if (!b) {
        b = "price"
    }
    if (document.getElementById("flightresults")) {
        var a = "";
        var d;
        for (d = 0; d < flightlist[b].length; d++) {
            if (document.getElementById("flight" + flightlist[b][d])) {
                a += document.getElementById("flight" + flightlist[b][d]).innerHTML
            }
        }
        document.getElementById("flightresults").innerHTML = a
    }
    if (document.getElementById("altflightresults")) {
        var c = "";
        var d;
        for (d = 0; d < altflightlist[b].length; d++) {
            if (document.getElementById("flight" + altflightlist[b][d])) {
                c += document.getElementById("flight" + altflightlist[b][d]).innerHTML
            }
        }
        document.getElementById("altflightresults").innerHTML = c
    }
}

function changeflightsort(b) {
    if (!b) {
        b = "price"
    }
    if (document.getElementById("flightsortlist")) {
        var a = "";
        if (b == "price") {
            a += document.getElementById("sortpricehigh").innerHTML
        } else {
            a += document.getElementById("sortprice").innerHTML
        }
        if (b == "stops") {
            a += document.getElementById("sortstopshigh").innerHTML
        } else {
            a += document.getElementById("sortstops").innerHTML
        }
        if (b == "journeytime") {
            a += document.getElementById("sortjourneytimehigh").innerHTML
        } else {
            a += document.getElementById("sortjourneytime").innerHTML
        }
        displayflights(b);
        document.getElementById("flightsortlist").innerHTML = a
    }
}

function showsmallimages() {
    document.getElementById("smallimages").style.display = "block";
    document.getElementById("largeimages").style.display = "none"
}

function showlargeimages() {
    document.getElementById("smallimages").style.display = "none";
    document.getElementById("largeimages").style.display = "block"
}
var bookingstarted = 0;

function submitbooking() {
    var a = document.getElementById("bookbutton");
    if (a) {
        if (bookingstarted) {
            alert("You've already clicked the Make Booking button. Please be patient as we complete the process.");
            return false
        } else {
            bookingstarted = 1;
            return true
        }
    }
    return true
}

function submitimportbooking() {
    var a = document.getElementById("continueform");
    $("continuebutton").disable();
    a.submit()
}
var linklocked = false;

function locklink() {
    if (linklocked) {
        return false
    }
    linklocked = true;
    return true
}

function format(expr, decplaces) {
    var str = "" + Math.round(eval(expr) * Math.pow(10, decplaces));
    while (str.length <= decplaces) {
        str = "0" + str
    }
    var decpoint = str.length - decplaces;
    return str.substring(0, decpoint) + "." + str.substring(decpoint, str.length)
}

function updateprice(h, a, d, e, o, g, q, m) {
    var p = 0;
    var c = 0;
    if ((h.value == "AMX" || h.value == "VIS" || h.value == "MSC") && d != 0) {
        if (g == "addition") {
            p = d;
            displaytotal = parseFloat(a) + +p;
            if (o != 0) {
                c = p;
                displaydeposit = parseFloat(o) + +p;
                displaytotaldeposit = parseFloat(a) + +p
            }
        } else {
            p = ((a / 100) * d);
            displaytotal = parseFloat(a) + p;
            if (o != 0) {
                c = ((o / 100) * d);
                displaydeposit = parseFloat(o) + c;
                displaytotaldeposit = parseFloat(a) + +c
            }
        }
    } else {
        if ((h.value == "DEL" || h.value == "MAE" || h.value == "SOL" || h.value == "ELC" || h.value == "MCD") && e != 0) {
            if (q == "addition") {
                p = e;
                displaytotal = parseFloat(a) + +p;
                if (o != 0) {
                    c = p;
                    displaydeposit = parseFloat(o) + +p;
                    displaytotaldeposit = parseFloat(a) + +p
                }
            } else {
                p = ((a / 100) * e);
                displaytotal = parseFloat(a) + p;
                if (o != 0) {
                    c = ((o / 100) * e);
                    displaydeposit = parseFloat(o) + c;
                    displaytotaldeposit = parseFloat(a) + +c
                }
            }
        } else {
            displaytotal = a;
            displaytotaldeposit = a;
            if (o != 0) {
                displaydeposit = o
            }
        }
    }
    document.getElementById("totalprice").innerHTML = format(displaytotal, 2);
    if (document.getElementById("depositprice")) {
        document.getElementById("depositprice").innerHTML = format(displaydeposit, 2)
    }
    if (document.getElementById("cardcharge") && p != 0) {
        document.getElementById("cardcharge").innerHTML = format(p, 2)
    }
    if (document.getElementById("depositcardcharge") && c != 0) {
        document.getElementById("depositcardcharge").innerHTML = format(c, 2)
    }
    if ($("totalpricebottom")) {
        $("totalpricebottom").update(format(displaytotal, 2))
    }
    if ($("totalpricepp") && m != undefined) {
        var f = displaytotal / m;
        $("totalpricepp").update(format(f, 2))
    }
    if ($("totalpriceppbottom") && m != undefined) {
        var f = displaytotal / m;
        $("totalpriceppbottom").update(format(f, 2))
    }
    if ($("chargedescription")) {
        $("chargedescription").show()
    }
    var l = $$("input[type=radio][name=depositoption]:checked");
    if (l.length > 0 && $("onechargevalue")) {
        var b = l[0].value;
        if (b == "1" && c != 0) {
            $("onechargevalue").update(format(c, 2));
            if (window.alternatetotalprice) {
                document.getElementById("totalprice").innerHTML = format(displaytotaldeposit, 2)
            }
        } else {
            if (b == "0" && p != 0) {
                $("onechargevalue").update(format(p, 2))
            } else {
                $("onechargevalue").update("");
                if ($("chargedescription")) {
                    $("chargedescription").hide()
                }
            }
        }
    } else {
        if ($("onechargevalue")) {
            if (p != 0) {
                $("onechargevalue").update(format(p, 2))
            } else {
                $("onechargevalue").update("0.00")
            }
        }
    }
}

function updateoneway(c) {
    var b;
    var a;
    var d = document.getElementById("onewayyes");
    if (!c) {
        if (document.getElementById("onewayyes")) {
            if (document.getElementById("onewayyes").checked) {
                c = "Y"
            } else {
                c = "N"
            }
        }
    }
    if (d) {
        if (!a && !b) {
            if (c == "Y") {
                document.getElementById("onewayyes").checked = true;
                document.getElementById("onewayno").checked = false;
                a = 0;
                b = 1
            } else {
                if (c == "N") {
                    document.getElementById("onewayyes").checked = false;
                    document.getElementById("onewayno").checked = true;
                    a = 1;
                    b = 0
                } else {
                    if (document.getElementById("onewayno")) {
                        document.getElementById("onewayno").checked = true
                    }
                    if (document.getElementById("onewayyes")) {
                        document.getElementById("onewayyes").checked = false
                    }
                    a = 1;
                    b = 0
                }
            }
        }
        if (a) {
            document.getElementById("returndate").style.display = "block";
            document.getElementById("returndatetext").style.display = "none"
        } else {
            document.getElementById("returndate").style.display = "none";
            document.getElementById("returndatetext").style.display = "block"
        }
    }
}

function updatejourneyoption(b) {
    if (!b) {
        b = "return";
        if (document.getElementById("journeyoneway")) {
            if (document.getElementById("journeyoneway").checked) {
                b = "oneway"
            }
        }
        if (document.getElementById("journeymulti")) {
            if (document.getElementById("journeymulti").checked) {
                b = "multi"
            }
        }
        if (document.getElementById("journeymultidest")) {
            if (document.getElementById("journeymultidest").checked) {
                b = "multidest"
            }
        }
    }
    if (b == "multidest") {
        removemultidest()
    }
    if (document.getElementById("journeyoneway")) {
        if (b == "multi") {
            if (document.getElementById("journeymulti")) {
                document.getElementById("journeymulti").checked = true
            }
            if (document.getElementById("journeyreturn")) {
                document.getElementById("journeyreturn").checked = false
            }
            if (document.getElementById("journeyoneway")) {
                document.getElementById("journeyoneway").checked = false
            }
            if (document.getElementById("journeymultidest")) {
                document.getElementById("journeymultidest").checked = false
            }
            if (document.getElementById("outdepartlabel")) {
                document.getElementById("outdepartlabel").style.display = "inline"
            }
            if (document.getElementById("outarrivelabel")) {
                document.getElementById("outarrivelabel").style.display = "inline"
            }
            if (document.getElementById("inbookingclass")) {
                document.getElementById("inbookingclass").style.display = "inline"
            }
            if (document.getElementById("inbookingclasslabel")) {
                document.getElementById("inbookingclasslabel").style.display = "inline"
            }
            if (document.getElementById("from")) {
                document.getElementById("from").style.display = "inline"
            }
            if (document.getElementById("to")) {
                document.getElementById("to").style.display = "inline"
            }
            if (document.getElementById("departlabel")) {
                document.getElementById("departlabel").style.display = "inline"
            }
            if (document.getElementById("arrivelabel")) {
                document.getElementById("arrivelabel").parentNode.parentNode.style.display = null
            }
            if (document.getElementById("arrivelabel")) {
                document.getElementById("arrivelabel").style.display = "inline"
            }
            if (document.getElementById("standarddates")) {
                document.getElementById("standarddates").style.display = "inline"
            }
            if (document.getElementById("multidest")) {
                document.getElementById("multidest").value = "0"
            }
        } else {
            if (b == "oneway") {
                if (document.getElementById("journeymulti")) {
                    document.getElementById("journeymulti").checked = false
                }
                if (document.getElementById("journeyreturn")) {
                    document.getElementById("journeyreturn").checked = false
                }
                if (document.getElementById("journeyoneway")) {
                    document.getElementById("journeyoneway").checked = true
                }
                if (document.getElementById("journeymultidest")) {
                    document.getElementById("journeymultidest").checked = false
                }
                if (document.getElementById("outdepartlabel")) {
                    document.getElementById("outdepartlabel").style.display = "none"
                }
                if (document.getElementById("outarrivelabel")) {
                    document.getElementById("outarrivelabel").style.display = "none"
                }
                if (document.getElementById("inbookingclass")) {
                    document.getElementById("inbookingclass").style.display = "none"
                }
                if (document.getElementById("inbookingclasslabel")) {
                    document.getElementById("inbookingclasslabel").style.display = "none"
                }
                if (document.getElementById("from")) {
                    document.getElementById("from").style.display = "inline"
                }
                if (document.getElementById("to")) {
                    document.getElementById("to").style.display = "inline"
                }
                if (document.getElementById("departlabel")) {
                    document.getElementById("departlabel").style.display = "inline"
                }
                if (document.getElementById("arrivelabel")) {
                    document.getElementById("arrivelabel").parentNode.parentNode.style.display = null
                }
                if (document.getElementById("arrivelabel")) {
                    document.getElementById("arrivelabel").style.display = "inline"
                }
                if (document.getElementById("standarddates")) {
                    document.getElementById("standarddates").style.display = "inline"
                }
                if (document.getElementById("multidest")) {
                    document.getElementById("multidest").value = "0"
                }
            } else {
                if (b == "multidest") {
                    if (document.getElementById("journeymultidest")) {
                        document.getElementById("journeymultidest").checked = true
                    }
                    if (document.getElementById("journeymulti")) {
                        document.getElementById("journeymulti").checked = false
                    }
                    if (document.getElementById("journeyreturn")) {
                        document.getElementById("journeyreturn").checked = false
                    }
                    if (document.getElementById("journeyoneway")) {
                        document.getElementById("journeyoneway").checked = false
                    }
                    if (document.getElementById("outdepartlabel")) {
                        document.getElementById("outdepartlabel").style.display = "none"
                    }
                    if (document.getElementById("outarrivelabel")) {
                        document.getElementById("outarrivelabel").style.display = "none"
                    }
                    if (document.getElementById("inbookingclass")) {
                        document.getElementById("inbookingclass").style.display = "inline"
                    }
                    if (document.getElementById("inbookingclasslabel")) {
                        document.getElementById("inbookingclasslabel").style.display = "inline"
                    }
                    if (document.getElementById("from")) {
                        document.getElementById("from").style.display = "none"
                    }
                    if (document.getElementById("to")) {
                        document.getElementById("to").style.display = "none"
                    }
                    if (document.getElementById("departlabel")) {
                        document.getElementById("departlabel").style.display = "none"
                    }
                    if (document.getElementById("arrivelabel")) {
                        document.getElementById("arrivelabel").parentNode.parentNode.style.display = "none"
                    }
                    if (document.getElementById("arrivelabel")) {
                        document.getElementById("arrivelabel").style.display = "none"
                    }
                    if (document.getElementById("standarddates")) {
                        document.getElementById("standarddates").style.display = "none"
                    }
                    if (document.getElementById("multidest")) {
                        document.getElementById("multidest").value = "1"
                    }
                    var c = ["direction", "airline", "flightclass", "nights", "destair", "depair", "arr-dayofweek", "arrdate", "arrdate-minute", "arrdate-hour", "arrdate-year", "arrdate-month", "arrdate-day", "dep-dayofweek", "calendar", "depdate", "depdate-minute", "depdate-hour", "depdate-year", "depdate-month", "depdate-day"];
                    c.forEach(function(e) {
                        e = $(e);
                        if (e) {
                            e.writeAttribute("id", e.id + "1").writeAttribute("name", e.name + "1")
                        }
                    });
                    $$('[name^="depdate-hour"]', '[name^="depdate-minute"]', '[name^="arrdate-hour"]', '[name^="arrdate-minute"]', '[name="retdate-hour"]', '[name="retdate-minute"]').forEach(function(e) {
                        $(e).show()
                    });
                    updatemultidestdatesfromnights();
                    updatemultidestcalendars();
                    var d = $$('[name^="flightclass"]');
                    for (var a = 1; a < (d.length + 1); a++) {
                        d[(a - 1)].writeAttribute("id", "flightclass" + a).writeAttribute("name", "flightclass" + a)
                    }
                } else {
                    if (document.getElementById("journeymulti")) {
                        document.getElementById("journeymulti").checked = false
                    }
                    if (document.getElementById("journeyreturn")) {
                        document.getElementById("journeyreturn").checked = true
                    }
                    if (document.getElementById("journeyoneway")) {
                        document.getElementById("journeyoneway").checked = false
                    }
                    if (document.getElementById("journeymultidest")) {
                        document.getElementById("journeymultidest").checked = false
                    }
                    if (document.getElementById("outdepartlabel")) {
                        document.getElementById("outdepartlabel").style.display = "none"
                    }
                    if (document.getElementById("outarrivelabel")) {
                        document.getElementById("outarrivelabel").style.display = "none"
                    }
                    if (document.getElementById("inbookingclass")) {
                        document.getElementById("inbookingclass").style.display = "inline"
                    }
                    if (document.getElementById("inbookingclasslabel")) {
                        document.getElementById("inbookingclasslabel").style.display = "inline"
                    }
                    if (document.getElementById("from")) {
                        document.getElementById("from").style.display = "inline"
                    }
                    if (document.getElementById("to")) {
                        document.getElementById("to").style.display = "inline"
                    }
                    if (document.getElementById("departlabel")) {
                        document.getElementById("departlabel").style.display = "inline"
                    }
                    if (document.getElementById("arrivelabel")) {
                        document.getElementById("arrivelabel").parentNode.parentNode.style.display = null
                    }
                    if (document.getElementById("arrivelabel")) {
                        document.getElementById("arrivelabel").style.display = "inline"
                    }
                    if (document.getElementById("standarddates")) {
                        document.getElementById("standarddates").style.display = "inline"
                    }
                    if (document.getElementById("multidest")) {
                        document.getElementById("multidest").value = "0"
                    }
                }
            }
        }
        if (b == "oneway") {
            document.getElementById("returndate").style.display = "none";
            document.getElementById("returndatetext").style.display = "block"
        } else {
            document.getElementById("returndate").style.display = "block";
            document.getElementById("returndatetext").style.display = "none"
        }
        if (document.getElementById("openjawjourney")) {
            if (b == "multi") {
                document.getElementById("openjawjourney").style.display = "block"
            } else {
                document.getElementById("openjawjourney").style.display = "none"
            }
        }
        if (document.getElementById("multidestjourney")) {
            if (b == "multidest") {
                document.getElementById("multidestjourney").style.display = "block"
            } else {
                document.getElementById("multidestjourney").style.display = "none"
            }
        }
    }
}

function updatescheduledextras() {
    var a;
    if (document.getElementById("includescheduled")) {
        a = document.getElementById("includescheduled").value
    }
    var b = document.getElementById("scheduledextraoptions");
    if (a == "yes") {
        if (b) {
            b.style.display = "block"
        }
    } else {
        if (a == "no") {
            if (b) {
                b.style.display = "none"
            }
        }
    }
}

function updatescheduled(e) {
    var f = document.getElementById("scheduledon");
    var c = e;
    if (!e) {
        if (document.getElementById("scheduledon")) {
            if (document.getElementById("scheduledon").checked) {
                e = "Y"
            } else {
                e = "N"
            }
        }
    }
    var a = location.search.substring(1).toQueryParams();
    if (a.sid === undefined) {
        a = location.search.substring(1).toQueryParams(";")
    }
    if (a.flexisearch === "1" && c === undefined) {
        var b = a.sid;
        var d = a.sessionkey;
        if (e === "Y") {
            document.location.href = "?action=search&sid=" + b + "&carriertype=scheduled&sessionkey=" + d
        } else {
            document.location.href = "?action=search&sid=" + b + "&carriertype=other&sessionkey=" + d
        }
    }
    if (f) {
        if (e == "Y") {
            document.getElementById("scheduledon").checked = true;
            document.getElementById("scheduledoff").checked = false;
            document.getElementById("onewayoptions").style.display = "block";
            document.getElementById("scheduledoptions").style.display = "block";
            document.getElementById("includescheduledoption").style.display = "none";
            if (document.getElementById("openjawradio")) {
                document.getElementById("openjawradio").style.display = "inline"
            }
            if (document.getElementById("openjawoption")) {
                document.getElementById("openjawoption").style.display = "inline"
            }
            if (document.getElementById("multidestoption")) {
                document.getElementById("multidestoption").style.display = "inline"
            }
        } else {
            if (e == "N") {
                document.getElementById("scheduledon").checked = false;
                document.getElementById("scheduledoff").checked = true;
                updatejourneyoption("return");
                document.getElementById("onewayoptions").style.display = "block";
                document.getElementById("scheduledoptions").style.display = "none";
                document.getElementById("includescheduledoption").style.display = "block";
                if (document.getElementById("openjawradio")) {
                    document.getElementById("openjawradio").style.display = "none"
                }
                if (document.getElementById("openjawoption")) {
                    document.getElementById("openjawoption").style.display = "none"
                }
                if (document.getElementById("multidestoption")) {
                    document.getElementById("multidestoption").style.display = "none"
                }
            }
        }
    }
}

function updatedayofweek() {
    var a = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
    $$('[id^="dep-dayofweek"], [id^="arr-dayofweek"], [id^="ret-dayofweek"]').forEach(function(h) {
        var d = h.id.match(/^(dep|arr|ret)/)[0],
            f = h.id.match(/(\d*)$/)[0];
        var b = $F(d + "date-day" + f),
            g = $F(d + "date-month" + f),
            e = $F(d + "date-year" + f);
        var c = new Date(e + "-" + g + "-" + b),
            b = a[c.getDay()];
        $(d + "-dayofweek" + f).update(b)
    })
}

function addmultideststopover(d) {
    if ($("addmultideststopover").hasAttribute("disabled")) {
        return
    }
    var a = ["direction2", "airline2", "flightclass2", "nights2", "destair2", "depair2", "arrdate-day2", "depdate-day2"],
        c = ["arr-dayofweek", "arrdate", "arrdate-minute", "arrdate-hour", "arrdate-year", "arrdate-month", "arrdate-day", "dep-dayofweek", "depdate", "depdate-minute", "depdate-hour", "depdate-year", "depdate-month", "depdate-day"],
        b = ($$('[name^="depair"]').length - 2);
    a.forEach(function(g) {
        var h = Element.clone($(g).up(1), true),
            e = g.replace(/^([^\d]+)\d+$/, "$1"),
            f = (b + 2);
        if ($(e + f)) {
            $(e + f).writeAttribute("id", e + (f + 1)).writeAttribute("name", e + (f + 1))
        }
        if (e.match(/^(dep|arr)date-day$/)) {
            c.forEach(function(m) {
                var l = $(h).down('[id="' + m + '2"]');
                if (l != null) {
                    if ($(m + f)) {
                        $(m + f).writeAttribute("id", m + (f + 1)).writeAttribute("name", m + (f + 1))
                    }
                    $(l).writeAttribute("id", m + f).writeAttribute("name", m + f);
                    $(l).addEventListener("change", function(o) {
                        updatemultidestnightsfromdates();
                        updatedayofweek()
                    })
                }
            })
        } else {
            $(h).down(1).down().writeAttribute("id", e + f).writeAttribute("name", e + f).setValue("")
        }
        if (e == "nights") {
            $(h).down(1).down().setValue("7").addEventListener("change", function(l) {
                updatemultidestdatesfromnights();
                updatemultidestcalendars()
            })
        }
        $("direction" + (f - 1)).up(1).insert({
            after: h
        })
    });
    $("direction" + (b + 1)).up(1).insert({
        after: Element.clone($$('[name="separator"]')[0], true)
    });
    updatemultidestdatesfromnights();
    updatemultidestnightsfromdates();
    updatemultidestcalendars();
    if ((b + 1) >= d) {
        $("addmultideststopover").setAttribute("disabled", true)
    }
}

function updatemultidestdatesfromnights() {
    var c = ($$('[name^="depair"]').length - 1);
    for (var e = 1; e <= c; e++) {
        var d = new Date();
        var f = $("arrdate-year" + e);
        var b = $("arrdate-month" + e);
        var a = $("arrdate-day" + e);
        if (f.options[f.selectedIndex].value && b.options[b.selectedIndex].value && a.options[a.selectedIndex].value) {
            d.setFullYear($F("arrdate-year" + e), ($F("arrdate-month" + e) - 1), $F("arrdate-day" + e));
            d.setTime((d.getTime() + ($F("nights" + e) * 86400000)))
        } else {
            d.setFullYear($F("depdate-year" + e), ($F("depdate-month" + e) - 1), $F("depdate-day" + e));
            d.setTime((d.getTime() + ($F("nights" + e) * 86400000)))
        }
        if ($("depdate-year" + (e + 1))) {
            $("depdate-year" + (e + 1)).value = d.getFullYear();
            $("depdate-month" + (e + 1)).value = (d.getMonth() + 1);
            $("depdate-day" + (e + 1)).value = d.getDate()
        }
        if ($("arrdate-year" + (e + 1)) && $("arrdate-year" + (e + 1)).selectedIndex && $("arrdate-month" + (e + 1)) && $("arrdate-month" + (e + 1)).selectedIndex && $("arrdate-month" + (e + 1)) && $("arrdate-day" + (e + 1)).selectedIndex) {
            var g = new Date(d);
            g.setTime((d.getTime() + ($F("nights" + (e + 1)) * 86400000)));
            $("arrdate-year" + (e + 1)).value = g.getFullYear();
            $("arrdate-month" + (e + 1)).value = (g.getMonth() + 1);
            $("arrdate-day" + (e + 1)).value = g.getDate()
        }
    }
    updatemultidestretdate()
}

function updatemultidestnightsfromdates() {
    var d = ($$('[name^="depair"]').length - 1);
    for (var f = 1; f <= d; f++) {
        var c = new Date();
        var p = $("arrdate-year" + f);
        var b = $("arrdate-month" + f);
        var a = $("arrdate-day" + f);
        if (p.options[p.selectedIndex].value && b.options[b.selectedIndex].value && a.options[a.selectedIndex].value) {
            c.setFullYear($F("arrdate-year" + f), ($F("arrdate-month" + f) - 1), $F("arrdate-day" + f))
        } else {
            c.setFullYear($F("depdate-year" + f), ($F("depdate-month" + f) - 1), $F("depdate-day" + f))
        }
        if (f > 1) {
            var l = new Date();
            var e = $("arrdate-year" + (f - 1));
            var h = $("arrdate-month" + (f - 1));
            var g = $("arrdate-day" + (f - 1));
            if (e.options[e.selectedIndex].value && h.options[h.selectedIndex].value && g.options[g.selectedIndex].value) {
                l.setFullYear($F("arrdate-year" + (f - 1)), ($F("arrdate-month" + (f - 1)) - 1), $F("arrdate-day" + (f - 1)))
            } else {
                l.setFullYear($F("depdate-year" + (f - 1)), ($F("depdate-month" + (f - 1)) - 1), $F("depdate-day" + (f - 1)));
                var o = Math.round((c - l) / 86400000);
                $("nights" + (f - 1)).value = o
            }
        }
    }
    var m = new Date();
    m.setFullYear($F("retdate-year"), ($F("retdate-month") - 1), $F("retdate-day"));
    var l = new Date();
    var p = $("arrdate-year" + d);
    var b = $("arrdate-month" + d);
    var a = $("arrdate-day" + d);
    if (p.options[p.selectedIndex].value && b.options[b.selectedIndex].value && a.options[a.selectedIndex].value) {
        l.setFullYear($F("arrdate-year" + d), ($F("arrdate-month" + d) - 1), $F("arrdate-day" + d))
    } else {
        l.setFullYear($F("depdate-year" + d), ($F("depdate-month" + d) - 1), $F("depdate-day" + d));
        var o = Math.round((m - l) / 86400000);
        $("nights" + d).value = o
    }
    updatemultidestretdate()
}

function updatemultidestretdate() {
    var d = ($$('[name^="depair"]').length - 1);
    var f = new Date();
    var g = new Date();
    var a = $("nights" + d).value;
    var e = $("arrdate-year" + d);
    var c = $("arrdate-month" + d);
    var b = $("arrdate-day" + d);
    if (e.options[e.selectedIndex].value && c.options[c.selectedIndex].value && b.options[b.selectedIndex].value) {
        f.setFullYear($F("arrdate-year" + d), ($F("arrdate-month" + d) - 1), $F("arrdate-day" + d))
    } else {
        f.setFullYear($F("depdate-year" + d), ($F("depdate-month" + d) - 1), $F("depdate-day" + d))
    }
    g.setTime((f.getTime() + (a * 86400000)));
    $("retdate-year").value = g.getFullYear();
    $("retdate-month").value = (g.getMonth() + 1);
    $("retdate-day").value = g.getDate();
    updatedayofweek()
}

function updatemultidestcalendars() {
    var b = $$('[id^="calendar"], [id^="arrcalendar"]');
    for (var a = 0; a < b.length; a++) {
        b[a].writeAttribute("id", "calendar" + (a + 1)).writeAttribute("name", "calendar" + (a + 1))
    }
}

function removemultidest() {
    var a = ["direction", "airline", "flightclass", "nights", "destair", "depair", "arr-dayofweek", "arrdate", "arrdate-minute", "arrdate-hour", "arrdate-year", "arrdate-month", "arrdate-day", "dep-dayofweek", "calendar", "depdate", "depdate-minute", "depdate-hour", "depdate-year", "depdate-month", "depdate-day"];
    a.forEach(function(b) {
        b = $(b + "1");
        if (b) {
            b.name = (b.name ? b.name : b.id);
            b.writeAttribute("id", b.id.replace(/1$/, "")).writeAttribute("name", b.name.replace(/1$/, ""))
        }
    });
    updatemultidestcalendars()
}

function updatemultidest(a) {
    if (a === "multi") {
        document.getElementById("singledestformfields").style.display = "none";
        document.getElementById("multidestformfields").style.display = "block"
    } else {
        if (a === "single") {
            document.getElementById("singledestformfields").style.display = "block";
            document.getElementById("multidestformfields").style.display = "none"
        }
    }
}

function updatemanualprice(g) {
    var h = document.getElementById("manualprice");
    if (h) {
        var s = 0;
        var o = 0;
        var B = 0;
        var r;
        var u = document.getElementById("itinitems").value;
        var y = 0;
        var e = 0;
        var z = 0;
        var b = {};
        for (r = 0; r < u; r++) {
            if (document.getElementById("item-" + r)) {
                var l = parseFloat(document.getElementById("change-" + r).value);
                var t = parseFloat(document.getElementById("originalprice-" + r).value);
                var p = document.getElementById("originalprice-" + r).name;
                if (isNaN(l) || !l) {
                    l = 0
                }
                s += l + t;
                B += t;
                if (document.getElementById("profitprice-" + r)) {
                    if (!b[p]) {
                        var q = document.getElementById("profitprice-" + r).value;
                        if (isNaN(q)) {
                            q = document.getElementById("nettprice-" + r).value;
                            if (isNaN(q)) {
                                next
                            }
                        } else {
                            q = parseFloat(q)
                        }
                        o += l + q;
                        if ($("subtractfromdiff-" + r)) {
                            var c = document.getElementById("subtractfromdiff-" + r).value;
                            if (c == "1") {
                                z += t
                            }
                        }
                        b[p] = 1
                    }
                }
                document.getElementById("item-" + r).value = l + t;
                if ($("nettprice-" + r)) {
                    var x = l + t;
                    var w = l + q;
                    var f = properrounding(w - parseFloat(document.getElementById("nettprice-" + r).innerHTML), 2, undefined, "");
                    var m = properrounding((f / x) * 100, 2);
                    if ($("profit-" + r)) {
                        document.getElementById("profit-" + r).innerHTML = f + " (" + m + "%)"
                    }
                }
                y = 1
            }
        }
        if (y) {
            h.innerHTML = properrounding(s, 2);
            if ($("manualpricepp")) {
                document.getElementById("manualpricepp").innerHTML = formatnumber(s / parseInt(document.getElementById("totalguests").value), 2)
            }
            if ($("nettprice")) {
                if (document.getElementById("commissionprice")) {
                    var a = 0;
                    if (document.getElementById("commissionprice").tagName == "INPUT") {
                        a = Number(document.getElementById("commissionprice").value)
                    } else {
                        a = Number(document.getElementById("commissionprice").innerHTML)
                    }
                    e = parseFloat(a)
                }
                var d = 0;
                if (document.getElementsByClassName("vatcommamount") && window.excludevatfromprofit == 1) {
                    for (var v = 0; v < document.getElementsByClassName("vatcommamount").length; v++) {
                        if (document.getElementsByClassName("vatcommamount")[v].innerHTML) {
                            d += parseFloat(document.getElementsByClassName("vatcommamount")[v].innerHTML)
                        }
                    }
                }
                var f = 0;
                if (document.getElementById("totalprofit")) {
                    f = properrounding(o - parseFloat(document.getElementById("nettprice").innerHTML) - e - d, 2, undefined, "")
                } else {
                    f = properrounding(s - parseFloat(document.getElementById("nettprice").innerHTML) - e - d, 2, undefined, "")
                }
                var m = properrounding((f / s) * 100, 2);
                if ($("profit")) {
                    if (removeprofitpercentage) {
                        document.getElementById("profit").innerHTML = f
                    } else {
                        document.getElementById("profit").innerHTML = f + " (" + m + "%)"
                    }
                }
                if ($("manualprice")) {
                    document.getElementById("manualprice").title = "Profit: " + f + " (" + m + "%)"
                }
            }
            var A = parseFloat(document.getElementById("totalprice").innerHTML);
            if (document.getElementById("totalprofit")) {
                A = parseFloat(document.getElementById("totalprofit").innerHTML)
            }
            if (g == 1) {
                document.getElementById("manualdiff").innerHTML = properrounding(s - A - z - e, 2)
            } else {
                document.getElementById("manualdiff").innerHTML = properrounding(s - A - z, 2)
            }
        }
    }
}

function formatnumber(expr, decplaces) {
    var str = "" + Math.round(eval(expr) * Math.pow(10, decplaces));
    while (str.length <= decplaces) {
        str = "0" + str
    }
    var decpoint = str.length - decplaces;
    return str.substring(0, decpoint) + "." + str.substring(decpoint, str.length)
}

function popupwindow(d, c, e, b) {
    var a;
    a = window.open(d, c, "status=yes,scrollbars=yes,resizable=yes,width=" + e + ",height=" + b);
    a.focus()
}
var transfers = null;

function transferinitlists(c, a, f, e, g, b) {
    if (document.getElementById("noinitlists")) {
        return
    }
    if (transfers == null) {
        return
    }
    transferfilltransfertypes(c);
    var d = (c || document.getElementById("transfertype").value || document.getElementById("valuedropdown_0").value).split(":");
    transferfillpickupcountry(d[0], d[1], a, b);
    transferfillpickup(d[0], d[1], f, b);
    transferfilldropoffcountry(d[0], d[1], e, b);
    transferfilldropoff(d[0], d[1], g, b)
}

function updatetransfers() {
    var a;
    if (document.getElementById("transfertype")) {
        a = document.getElementById("transfertype").value.split(":")
    }
    transferfillpickupcountry(a[0], a[1]);
    transferfillpickup(a[0], a[1]);
    transferfilldropoffcountry(a[0], a[1]);
    transferfilldropoff(a[0], a[1])
}

function updatetransferscsi() {
    var a;
    if (document.getElementById("valuedropdown_0")) {
        a = document.getElementById("valuedropdown_0").value.split(":")
    }
    transferfillpickupcountry(a[0], a[1], "", 1);
    transferfillpickup(a[0], a[1], "", 1);
    transferfilldropoffcountry(a[0], a[1], "", 1);
    transferfilldropoff(a[0], a[1], "", 1)
}
changetransfertype = updatetransfers;
transferchangepickupcountry = updatetransfers;
transferchangepickup = updatetransfers;
transferchangedropoffcountry = updatetransfers;

function transferfilldropoff(e, m, h, p) {
    if (p) {
        var d = document.getElementById("valuedropdown_5")
    } else {
        var d = document.getElementById("dropoff")
    }
    if (!(d && d.options)) {
        return
    }
    var b = emptyList(d, 0);
    if (p) {
        var a = document.getElementById("valuedropdown_3").value;
        var g = document.getElementById("valuedropdown_4").value
    } else {
        var a = document.getElementById("pickup").value;
        var g = document.getElementById("dropoffcountry").value
    }
    var o = e + ":" + m;
    var f = transfers.c.d;
    for (var c = 0; c < f.length; c++) {
        if (transfers.cid[f[c].n] == g) {
            f = f[c].v[o];
            for (var l = 0; l < f.length; l++) {
                if (transfers.journey[e] && transfers.journey[e][a] && transfers.journey[e][a][m] && transfers.journey[e][a][m][f[l]]) {
                    d[d.length] = new Option(transfers.cid[transfers.journey[e][a][m][f[l]].n], transfers.journey[e][a][m][f[l]].c)
                }
            }
            break
        }
    }
    if (p) {
        setfield("valuedropdown_5", h || b || d.options[0].value)
    } else {
        setfield("dropoff", h || b || d.options[0].value)
    }
}

function transferfilldropoffcountry(e, h, c, m) {
    if (m) {
        var d = document.getElementById("valuedropdown_4")
    } else {
        var d = document.getElementById("dropoffcountry")
    }
    if (!(d && d.options)) {
        return
    }
    var a = emptyList(d, 0);
    var b = e + ":" + h;
    if (m) {
        var o = document.getElementById("valuedropdown_3").value
    } else {
        var o = document.getElementById("pickup").value
    }
    var l = e + ":" + h;
    var f = transfers.c.d;
    for (var g = 0; g < f.length; g++) {
        if (f[g].v[b] && transfers.journey[e] && transfers.journey[e][o].d[f[g].n]) {
            d.options[d.length] = new Option(transfers.cid[f[g].n], transfers.cid[f[g].n])
        }
    }
    if (m) {
        setfield("valuedropdown_4", c || a)
    } else {
        setfield("dropoffcountry", c || a)
    }
}

function transferfillpickup(d, l, f, o) {
    if (o) {
        var c = document.getElementById("valuedropdown_3")
    } else {
        var c = document.getElementById("pickup")
    }
    if (!(c && c.options)) {
        return
    }
    var a = emptyList(c, 0);
    if (o) {
        var g = document.getElementById("valuedropdown_2").value
    } else {
        var g = document.getElementById("pickupcountry").value
    }
    var m = d + ":" + l;
    var e = transfers.c.p;
    for (var b = 0; b < e.length; b++) {
        if (transfers.cid[e[b].n] == g) {
            e = e[b].v[m];
            for (var h = 0; h < e.length; h++) {
                if (transfers.journey[d] && transfers.journey[d][e[h]]) {
                    c[c.length] = new Option(transfers.cid[transfers.journey[d][e[h]].n], transfers.journey[d][e[h]].c)
                }
            }
            break
        }
    }
    if (o) {
        setfield("valuedropdown_3", f || a || c.options[0].value)
    } else {
        setfield("pickup", f || a || c.options[0].value)
    }
}

function transferfillpickupcountry(e, h, c, l) {
    var d = document.getElementById("pickupcountry") || document.getElementById("valuedropdown_2");
    if (!(d && d.options)) {
        return
    }
    var a = emptyList(d, 0);
    var b = e + ":" + h;
    var f = transfers.c.p;
    for (var g = 0; g < f.length; g++) {
        if (f[g].v[b]) {
            d.options[d.length] = new Option(transfers.cid[f[g].n], transfers.cid[f[g].n])
        }
    }
    if (l) {
        setfield("valuedropdown_2", c || a)
    } else {
        setfield("pickupcountry", c || a)
    }
}

function transferfilltransfertypes(b) {
    var c = document.getElementById("transfertype");
    if (!(c && c.options)) {
        return
    }
    var d = emptyList(c, 0);
    for (var a = 0; a < transfers.routes.length; a++) {
        c.options[c.length] = new Option(transfers.routes[a][0], transfers.routes[a][1])
    }
    setfield("transfertype", b || d || c.options[0].value)
}
var carhires = null;

function carhireinitlists(a, c, b, d) {
    if (document.getElementById("noinitlists")) {
        return
    }
    if (carhires == null) {
        return
    }
    carhirefillpickupcountry(a);
    carhirefillpickup(c);
    carhirefilldropoffcountry(b);
    carhirefilldropoff(d)
}

function updatecarhireswithdepots() {
    carhirefillpickupcountry();
    carhirefilldropoffcountry();
    carhirefillpickup();
    carhirefilldropoff();
    updatedropoffdepot();
    updatepickupdepot()
}

function updatedropoffdepot() {
    if (carhires == null) {
        return
    }
    carhires.each(function(a) {
        if (a.country == $("dropoffcountry").value) {
            a.points.each(function(b) {
                if (b.resortid == $("dropoff").value) {
                    box = document.getElementById("dropoffdepot");
                    emptyList(box, 0);
                    b.depots.each(function(c) {
                        box[box.length] = new Option(c.name + " " + c.address, c.resortid)
                    })
                }
            })
        }
    })
}

function updatepickupdepot() {
    if (carhires == null) {
        return
    }
    carhires.each(function(a) {
        if (a.country == $("pickupcountry").value) {
            a.points.each(function(b) {
                if (b.resortid == $("dropoff").value) {
                    box = document.getElementById("pickupdepot");
                    emptyList(box, 0);
                    b.depots.each(function(c) {
                        box[box.length] = new Option(c.name + " " + c.address, c.resortid)
                    })
                }
            })
        }
    });
    updatedropoffdepot()
}

function updatecarhires() {
    carhirefillpickupcountry();
    carhirefillpickup();
    carhirefilldropoffcountry();
    carhirefilldropoff()
}

function carhirefilldropoff(e) {
    var d = document.getElementById("dropoff");
    if (!(d && d.options)) {
        return
    }
    var f = emptyList(d, 0);
    var a = document.getElementById("dropoffcountry").value;
    for (var c = 0; c < carhires.length; c++) {
        if (carhires[c].country == a) {
            for (var b = 0; b < carhires[c].points.length; b++) {
                d[d.length] = new Option(carhires[c].points[b].name, carhires[c].points[b].resortid)
            }
            break
        }
    }
    setfield("dropoff", e || f || d.options[0].value)
}

function carhirefilldropoffcountry(b) {
    var d = document.getElementById("dropoffcountry");
    if (!(d && d.options)) {
        return
    }
    var e = emptyList(d, 0);
    var c = document.getElementById("pickup").value;
    for (var a = 0; a < carhires.length; a++) {
        d.options[d.length] = new Option(carhires[a].country, carhires[a].country)
    }
    setfield("dropoffcountry", b || e)
}

function carhirefillpickup(e) {
    var d = document.getElementById("pickup");
    if (!(d && d.options)) {
        return
    }
    var f = emptyList(d, 0);
    var a = document.getElementById("pickupcountry").value;
    for (var c = 0; c < carhires.length; c++) {
        if (carhires[c].country == a) {
            for (var b = 0; b < carhires[c].points.length; b++) {
                d[d.length] = new Option(carhires[c].points[b].name, carhires[c].points[b].resortid)
            }
            break
        }
    }
    setfield("pickup", e || f || d.options[0].value)
}

function carhirefillpickupcountry(b) {
    var c = document.getElementById("pickupcountry");
    if (!(c && c.options)) {
        return
    }
    var d = emptyList(c, 0);
    for (var a = 0; a < carhires.length; a++) {
        c.options[c.length] = new Option(carhires[a].country, carhires[a].country)
    }
    setfield("pickupcountry", b || d)
}

function updatefaretype(d) {
    var b;
    var c;
    var e = document.getElementById("returndate");
    if (!d) {
        if (document.getElementById("faretypesingle")) {
            if (document.getElementById("faretypesingle").checked) {
                d = "single"
            } else {
                d = "return"
            }
        }
    }
    if (e) {
        if (!c && !b) {
            if (d == "single") {
                if (document.getElementById("faretypesingle")) {
                    document.getElementById("faretypesingle").checked = true
                }
                if (document.getElementById("faretypereturn")) {
                    document.getElementById("faretypereturn").checked = false
                }
                c = 0;
                b = 1
            } else {
                if (d == "return") {
                    if (document.getElementById("faretypesingle")) {
                        document.getElementById("faretypesingle").checked = false
                    }
                    if (document.getElementById("faretypereturn")) {
                        document.getElementById("faretypereturn").checked = true
                    }
                    c = 1;
                    b = 0
                } else {
                    if (document.getElementById("faretypereturn")) {
                        document.getElementById("faretypereturn").checked = true
                    }
                    if (document.getElementById("faretypesingle")) {
                        document.getElementById("faretypesingle").checked = false
                    }
                    c = 1;
                    b = 0
                }
            }
        }
        var a = document.getElementById("returntime");
        if (c) {
            document.getElementById("returndate").style.display = "block";
            document.getElementById("returndatetext").style.display = "none";
            if (a) {
                document.getElementById("returntime").style.display = "block"
            }
        } else {
            document.getElementById("returndate").style.display = "none";
            document.getElementById("returndatetext").style.display = "block";
            if (a) {
                document.getElementById("returntime").style.display = "none"
            }
        }
    }
}

function readcookie(b) {
    var e = b + "=";
    var a = document.cookie.split(";");
    for (var d = 0; d < a.length; d++) {
        var f = a[d];
        while (f.charAt(0) == " ") {
            f = f.substring(1, f.length)
        }
        if (f.indexOf(e) == 0) {
            return f.substring(e.length, f.length)
        }
    }
    return null
}

function setcookie(e, d, q, o, m, g) {
    var l = new Date();
    var a = new Date();
    var b = "";
    if (o != null && m != null && g != null) {
        g = parseInt(g);
        m = parseInt(m);
        o = parseInt(o);
        if (o == null || o == NaN) {
            o = 0
        }
        if (m == null || m == NaN) {
            m = 0
        }
        if (g == null || g == NaN) {
            g = 0
        }
        var f = ((g) + (m * 3600) + (o * 86400)) * 1000;
        var p = parseInt(l.getTime());
        a.setTime(l.getTime() + f);
        b = ";expires=" + a.toGMTString()
    }
    if (q == null) {
        q = "/"
    }
    var h = e + "=" + escape(d) + b + "; path=" + q;
    document.cookie = h
}

function escapeiframe(a) {
    if (parent.location.href != document.location.href) {
        parent.location.href = document.location.href
    }
}
var numb = "0123456789-.";
var lwr = "abcdefghijklmnopqrstuvwxyz";
var upr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function isValid(b, a) {
    if (b == "") {
        return true
    }
    for (i = 0; i < b.length; i++) {
        if (a.indexOf(b.charAt(i), 0) == -1) {
            return false
        }
    }
    return true
}

function isNum(a) {
    return isValid(a, numb)
}

function greypage(a, m) {
    var m = m || {};
    var l = m.zindex || 50;
    var f = m.opacity || 70;
    var e = (f / 100);
    var o = m.bgcolor || "#000000";
    var g = document.getElementById("greyfilter");
    if (!g) {
        var d = document.getElementsByTagName("body")[0];
        var b = document.createElement("div");
        b.style.position = "absolute";
        b.style.top = "0px";
        b.style.left = "0px";
        b.style.overflow = "hidden";
        b.style.display = "none";
        b.id = "greyfilter";
        d.appendChild(b);
        g = document.getElementById("greyfilter")
    }
    if (a) {
        if (document.body && (document.body.scrollWidth || document.body.scrollHeight)) {
            var h = document.body.scrollWidth + "px";
            var c = document.body.scrollHeight + "px"
        } else {
            if (document.body.offsetWidth) {
                var h = document.body.offsetWidth + "px";
                var c = document.body.offsetHeight + "px"
            } else {
                var h = "100%";
                var c = "100%"
            }
        }
        g.style.opacity = e;
        g.style.MozOpacity = e;
        g.style.filter = "alpha(opacity=" + f + ")";
        g.style.zIndex = l;
        g.style.backgroundColor = o;
        g.style.width = h;
        g.style.height = c;
        g.style.display = "block"
    } else {
        g.style.display = "none"
    }
}
var gPopupContainer = null;
var gPopupIsShown = false;

function showpackageflights(a) {
    $("changeflightbox").select("a.flightchoicelink").each(function(c) {
        var b = $H(c.href.toQueryParams());
        b.set("chosenhotel", a);
        c.href = "?" + b.toQueryString()
    });
    document.getElementById("changeflightarea_" + a).appendChild(document.getElementById("changeflightbox"));
    $("changeflightbox").show();
    changepage();
    document.getElementById("flightlist").style.display = "block";
    Effect.ScrollTo("hotelid-" + a)
}

function hidepackageflights() {
    greypage(false);
    document.getElementById("changeflightbox").style.display = "none";
    gPopupIsShown = false
}
var gi = 0;

function centerPopWin(f, a) {
    if (gPopupIsShown == true) {
        if (f == null || isNaN(f)) {
            f = gPopupContainer.offsetWidth
        }
        if (a == null) {
            a = gPopupContainer.offsetHeight
        }
        var e = getViewportHeight();
        var g = getViewportWidth();
        var d, b;
        if (self.pageYOffset) {
            d = self.pageXOffset;
            b = self.pageYOffset
        } else {
            if (document.documentElement && document.documentElement.scrollTop) {
                d = document.documentElement.scrollLeft;
                b = document.documentElement.scrollTop
            } else {
                if (document.body) {
                    d = document.body.scrollLeft;
                    b = document.body.scrollTop
                }
            }
        }
        var c = b + ((e - a) / 2);
        if (c < 0) {
            c = 0
        }
        gPopupContainer.style.top = c + "px";
        gPopupContainer.style.left = (d + ((g - f) / 2)) + "px"
    }
}

function addEvent(d, c, a) {
    if (d.addEventListener) {
        d.addEventListener(c, a, false);
        return true
    } else {
        if (d.attachEvent) {
            var b = d.attachEvent("on" + c, a);
            return b
        } else {
            return false
        }
    }
}

function getViewportHeight() {
    if (window.innerHeight != window.undefined) {
        return window.innerHeight
    }
    if (document.compatMode == "CSS1Compat") {
        return document.documentElement.clientHeight
    }
    if (document.body) {
        return document.body.clientHeight
    }
    return window.undefined
}

function getViewportWidth() {
    if (window.innerWidth != window.undefined) {
        return window.innerWidth
    }
    if (document.compatMode == "CSS1Compat") {
        return document.documentElement.clientWidth
    }
    if (document.body) {
        return document.body.clientWidth
    }
    return window.undefined
}

function selectpackageflight(a) {
    var b = document.getElementById("fromhotel").value;
    a = a + "#hotel-" + b;
    document.location.href = a
}

function changeuserimage(a) {
    if (a) {
        var b = document.getElementById("userimage-" + a);
        if (b) {
            if (document.getElementById("userimage-caption")) {
                document.getElementById("userimage-caption").innerHTML = b.title
            }
            if (document.getElementById("userimage-author")) {
                document.getElementById("userimage-author").innerHTML = b.name
            }
            document.getElementById("userimage-large").src = b.src;
            document.getElementById("userimage-large").title = b.title
        }
        if ($("prevuserimage") && $("nextuserimage") && $("prevphotopage") && $("nextphotopage")) {
            if (currentimage <= 1 && currentpage == 1) {
                document.getElementById("prevuserimage").className = "userphotonavoff"
            } else {
                document.getElementById("prevuserimage").className = "userphotonavon"
            }
            if ((totalimages - ((currentpage - 1) * imagesperpage) <= 1) || (currentimage >= totalimages)) {
                document.getElementById("nextuserimage").className = "userphotonavoff"
            } else {
                document.getElementById("nextuserimage").className = "userphotonavon"
            }
            if (currentpage <= 1) {
                document.getElementById("prevphotopage").className = "userphotonavoff"
            } else {
                document.getElementById("prevphotopage").className = "userphotonavon"
            }
            if ((imagesperpage * currentpage) > totalimages) {
                document.getElementById("nextphotopage").className = "userphotonavoff"
            } else {
                document.getElementById("nextphotopage").className = "userphotonavon"
            }
        }
    }
}

function prevuserimage() {
    if (currentimage - 1 >= 1) {
        currentimage = currentimage - 1;
        changeuserimage(currentimage)
    } else {
        if (currentpage > 1) {
            prevphotopage()
        }
    }
}

function nextuserimage() {
    var a = (totalimages % imagesperpage);
    var b = 0;
    if (currentimage + 1 <= imagesperpage) {
        currentimage = currentimage + 1;
        changeuserimage(currentimage)
    } else {
        if (a > 0) {
            b = (totalimages / imagesperpage) + 1
        } else {
            b = (totalimages / imagesperpage)
        }
        if (currentpage < b) {
            nextphotopage()
        }
    }
}

function prevphotopage() {
    if (currentpage - 1 >= 1) {
        currentpage = currentpage - 1;
        changephotopage()
    }
}

function nextphotopage() {
    var a = (totalimages % imagesperpage);
    var b = 0;
    if (a > 0) {
        b = (totalimages / imagesperpage) + 1
    } else {
        b = (totalimages / imagesperpage)
    }
    if (currentpage + 1 <= b) {
        currentpage = currentpage + 1;
        changephotopage()
    }
}

function changephotopage() {
    var a = document.location.href;
    if (a.match("start")) {
        a = a.replace(/start\=\d+/, "start=" + ((currentpage * imagesperpage) - imagesperpage))
    } else {
        if (a.match("/?/")) {
            a = a + "&start=" + ((currentpage * imagesperpage) - imagesperpage)
        } else {
            a = a + "?start=" + ((currentpage * imagesperpage) - imagesperpage)
        }
    }
    if (a.match("detailship")) {
        if (a.match("userphotos") == null) {
            a = a + "&tab=userphotos"
        }
    }
    document.location.href = a
}

function showhotelflights() {
    changepage();
    document.getElementById("flightlist").style.display = "block";
    document.getElementById("flightless").style.display = "block";
    document.getElementById("flightmore").style.display = "none"
}

function hidehotelflights() {
    document.getElementById("flightlist").style.display = "none";
    document.getElementById("flightless").style.display = "none";
    document.getElementById("flightmore").style.display = "block"
}
var flightpageno = 1;
var prevlink = "";
var nextlink = "";

function changepage(e) {
    var d = "";
    var g;
    var b;
    if (!prevlink) {
        if (document.getElementById("prevflightpage")) {
            prevlink = document.getElementById("prevflightpage").innerHTML
        } else {
            prevlink = ""
        }
    }
    if (!nextlink) {
        if (document.getElementById("nextflightpage")) {
            nextlink = document.getElementById("nextflightpage").innerHTML
        } else {
            nextlink = ""
        }
    }
    if (e == "next") {
        flightpageno = flightpageno + 1
    } else {
        if (e == "prev") {
            flightpageno = flightpageno - 1
        }
    }
    var c = document.getElementById("totalresults").value;
    var a;
    if ((c / 5) == parseInt(c / 5)) {
        a = c / 5
    } else {
        a = parseInt(c / 5) + 1
    }
    if (a > 1) {
        if (document.getElementById("pageflights")) {
            document.getElementById("pageflights").innerHTML = "Page " + flightpageno + " of " + a
        }
        if (flightpageno > 1) {
            document.getElementById("prevflightpage").innerHTML = '<a href="#" onclick="changepage(\'prev\');return false">' + prevlink + "</a>"
        } else {
            document.getElementById("prevflightpage").innerHTML = prevlink
        }
        if (flightpageno < a) {
            document.getElementById("nextflightpage").innerHTML = '<a href="#" onclick="changepage(\'next\');return false">' + nextlink + "</a>"
        } else {
            document.getElementById("nextflightpage").innerHTML = nextlink
        }
        var f = (flightpageno - 1) * 5
    } else {
        var f = 0
    }
    for (g = f; g <= f + 4; g++) {
        if (document.getElementById("flightchoice_" + g)) {
            b = document.getElementById("flightchoice_" + g).innerHTML;
            d = d + b
        }
    }
    document.getElementById("flightlistchoices").innerHTML = d
}

function bfsetfield(b, c) {
    var a = b.split(":");
    for (i = 0; i <= a.length; i++) {
        if (a[i] == "address") {
            if (document.getElementById(a[i])) {
                document.getElementById(a[i]).innerHTML = c
            }
        } else {
            setfield(a[i], c)
        }
    }
}

function stripetable(h, f) {
    f = f ? f : "row_";
    var d = document.getElementById(h);
    if (d && d.nodeName == "TABLE") {
        var e = d.getElementsByTagName("TR");
        for (var b = 0, a; a = e[b]; b++) {
            var g = a.className ? a.classname + " " + f : f;
            a.className = g + (b % 2 ? 2 : 1)
        }
    }
}

function forcehotelopen(c) {
    var a = $("shortrow_" + c);
    var b = $("longrow_" + c);
    if (a && b) {
        $("hotelid-" + c).addClassName("hoteldesctableon");
        $("expandimage_" + c).src = "/images/extranet/list-remove.png";
        b.show()
    }
}

function forcehotelclose(c) {
    var a = $("shortrow_" + c);
    var b = $("longrow_" + c);
    if (a && b) {
        $("hotelid-" + c).removeClassName("hoteldesctableon");
        $("expandimage_" + c).src = "/images/extranet/list-add.png";
        b.hide()
    }
}

function expandallhotelrows(a) {
    var c = $$('img[alt="Expand/Collapse"]');
    for (var b = 0; b < c.length; b++) {
        var d = c[b];
        if (a == 1) {
            forcehotelopen(d.name)
        } else {
            if (a == 2) {
                forcehotelclose(d.name)
            } else {
                expandhotelrow(d.name)
            }
        }
    }
}

function expandhotelrow(h, e, c, d, g) {
    var a = $("shortrow_" + h);
    var f = $("longrow_" + h);
    d = (typeof(d) !== "undefined" ? d : 0);
    if (a && f) {
        if (f.style.display == "none") {
            $("hotelid-" + h).addClassName("hoteldesctableon");
            $("expandimage_" + h).src = "/images/extranet/list-remove.png";
            f.show()
        } else {
            if (d === 0) {
                $("hotelid-" + h).removeClassName("hoteldesctableon");
                $("expandimage_" + h).src = "/images/extranet/list-add.png";
                f.hide()
            }
        }
    }
    if ($("description_" + h)) {
        if ($("description_" + h).innerHTML == "") {
            new Ajax.Request("/fusion/contentlookup.pl?supplier=" + escape(e) + "&accommcode=" + escape(c) + "&ski=" + g, {
                method: "get",
                onSuccess: function(m) {
                    var l = m.responseText.evalJSON(true);
                    $("description_" + h).update(l.description);
                    $("image_" + h).src = l.image
                }
            })
        }
    }
    if ($("roomdisplay_" + h)) {
        if ($("roomdisplay_" + h).innerHTML == "") {
            $("roomdisplay_" + h).update("Loading rooms...");
            var b = document.location.search.substring(1).toQueryParams().sessionkey;
            if (b.length !== 36) {
                b = document.location.search.substring(1).toQueryParams(";").sessionkey
            }
            new Ajax.Updater("roomdisplay_" + h, "/fusion/detailhotel.pl", {
                parameters: {
                    sessionkey: b,
                    chosenhotel: h,
                    roomselectiononly: 1,
                    popup: 1,
                    ajax: 1
                }
            })
        }
    }
}

function expandflightrow(b) {
    var a = $("flightoptions_" + b);
    if (a) {
        if (a.style.display == "none") {
            $("expandimage_" + b).src = "/images/extranet/list-remove.png";
            a.show()
        } else {
            $("expandimage_" + b).src = "/images/extranet/list-add.png";
            a.hide()
        }
    }
}

function expandcruiserow(c) {
    var a = $("leadrow_" + c);
    var b = $("gradedesc_" + c);
    if (a && b) {
        if (b.style.display == "none") {
            $("cruiseid-" + c).addClassName("cruisedesctableon");
            $("expandimage_" + c).src = "/images/extranet/list-remove.png";
            b.show()
        } else {
            $("cruiseid-" + c).removeClassName("cruisedesctableon");
            $("expandimage_" + c).src = "/images/extranet/list-add.png";
            b.hide()
        }
    }
}

function expandcruiseitinrow(c) {
    var b = $("headrow_" + c);
    var a = $("descrow_" + c);
    if (b && a) {
        if (a.style.display == "none") {
            $("expandimage_" + c).src = "/images/extranet/list-remove.png";
            a.show()
        } else {
            $("expandimage_" + c).src = "/images/extranet/list-add.png";
            a.hide()
        }
    }
}

function alternatetablerows(e, f) {
    if (!f) {
        f = "hoteldesctablealt"
    }
    var g = 0;
    var c = $$('table[alt="' + e + '"]');
    var a = new Array();
    for (var b = 0; b < c.length; b++) {
        var d = c[b];
        a = $(d).id.split(/-/);
        if ($("shortrow_" + a[1])) {
            if ($("shortrow_" + a[1]).visible() == false) {
                continue
            }
        }
        if (g == 1) {
            d.addClassName(f)
        } else {
            d.removeClassName(f)
        }
        g++;
        if (g == 2) {
            g = 0
        }
    }
}

function cruisealternaterows(e, f) {
    if (!f) {
        f = "cruisedesctablealt"
    }
    var g = 0;
    var c = $$('table[alt="' + e + '"]');
    var a = new Array();
    for (var b = 0; b < c.length; b++) {
        var d = c[b];
        a = $(d).id.split(/-/);
        if ($("leadrow_" + a[1])) {
            if ($("leadrow_" + a[1]).visible() == false) {
                continue
            }
        }
        if (g == 1) {
            d.addClassName(f)
        } else {
            d.removeClassName(f)
        }
        g++;
        if (g == 2) {
            g = 0
        }
    }
}

function togglefilter(a) {
    if ($(a + "image")) {
        $(a).toggle();
        if ($(a + "togglers")) {
            $(a + "togglers").toggle()
        }
        if ($(a).visible()) {
            $(a + "image").src = "/images/extranet/threadcollapse.png"
        } else {
            $(a + "image").src = "/images/extranet/threadexpand.png";
            if ($("filterbuttonarea")) {
                $("filterbuttonarea").appendChild($("filterbutton"))
            }
        }
    }
}

function filtercheck(a, b) {
    if (a == "all") {
        $$("#" + b + " input").each(function(c) {
            c.checked = true
        })
    } else {
        $$("#" + b + " input").each(function(c) {
            c.checked = false
        })
    }
}

function togglecompare(c, o, f, m) {
    var l = new Date();
    var b = l.getTime();
    var h;
    if ($("persistentcompare")) {
        h = $("persistentcompare").value
    } else {
        h = 0
    }
    var a = "/fusion/compare.pl?resultno=" + escape($(c).id) + "&type=" + escape(o) + "&sessionkey=" + escape(f) + "&persist=" + h + "&cachebuster=" + b;
    if ($(c).checked) {
        a += "&action=addcompare"
    } else {
        a += "&action=removecompare"
    }
    var g = document.location.href;
    var e = new Hash(g.toQueryParams());
    if (e.get("compare") == "1") {
        var q = $(c).id.split(/-/);
        Effect.Fade($("shortrow_" + q[1]), {
            afterFinish: function() {
                alternatetablerows("tablerow")
            }
        });
        Effect.Fade($("longrow_" + q[1]))
    }
    var p = g.replace("&compare=1", "");
    new Ajax.Request(a, {
        method: "get",
        onSuccess: function(d) {
            if (m == 1) {
                window.location.reload()
            }
            if (d.responseText == "1") {
                if ($("compareavailable")) {
                    $("compareavailable").show()
                }
            } else {
                if (d.responseText == "2") {
                    alert("Your shortlist is full. Please remove something before adding any more.");
                    c.checked = false
                } else {
                    if ($("compareavailable")) {
                        $("compareavailable").hide()
                    }
                    if (e.get("compare") == "1") {
                        document.location.href = p
                    }
                }
            }
        }
    })
}

function flexigroupchange(a) {
    if ($(a + "group")) {
        if ($F(a + "group") != "") {
            $(a).disable()
        } else {
            $(a).enable()
        }
    }
}

function removeresortdest(a, b) {
    if ($("resortfilters_" + a)) {
        if ($(b).checked) {
            $("resortfilters_" + a).show()
        } else {
            $("resortfilters_" + a).hide()
        }
    }
}

function settransferhotel(b, c, a) {
    document.getElementById("manualhotel-" + b).style.display = "none";
    document.getElementById("hotelname-" + b).value = c
}

function settransferdropoffhotel(b, c, a) {
    document.getElementById("manualdropoffhotel-" + b).style.display = "none";
    document.getElementById("dropoffhotelname-" + b).value = c
}

function settransfercruise(a, c, f, h, l, g, b) {
    document.getElementById("manualcruise-" + a).style.display = "none";
    document.getElementById("shipname-" + a).value = c;
    if (f && h) {
        var e = f.split(/-/);
        document.getElementById("outdepartyear-" + a).value = e[0];
        document.getElementById("outdepartmonth-" + a).value = e[1];
        document.getElementById("outdepartday-" + a).value = e[2];
        var d = h.split(/:/);
        document.getElementById("outdeparthour-" + a).value = d[0];
        document.getElementById("outdepartminute-" + a).value = d[1]
    }
    if (l && g) {
        var o = l.split(/-/);
        document.getElementById("inarriveyear-" + a).value = o[0];
        document.getElementById("inarrivemonth-" + a).value = o[1];
        document.getElementById("inarriveday-" + a).value = o[2];
        var m = g.split(/:/);
        document.getElementById("inarrivehour-" + a).value = m[0];
        document.getElementById("inarriveminute-" + a).value = d[1]
    }
}

function settransferflight(a, q, s, u, t, p, r, c, o, m, g, f, b) {
    document.getElementById("manualflight-" + a).style.display = "none";
    document.getElementById("outdepartcode-" + a).value = s;
    document.getElementById("outflightno-" + a).value = q;
    document.getElementById("inflightno-" + a).value = c;
    var l = u.split(/-/);
    document.getElementById("outdepartyear-" + a).value = l[0];
    document.getElementById("outdepartmonth-" + a).value = l[1];
    document.getElementById("outdepartday-" + a).value = l[2];
    var h = t.split(/:/);
    document.getElementById("outdeparthour-" + a).value = h[0];
    document.getElementById("outdepartminute-" + a).value = h[1];
    var e = p.split(/-/);
    document.getElementById("outarriveyear-" + a).value = e[0];
    document.getElementById("outarrivemonth-" + a).value = e[1];
    document.getElementById("outarriveday-" + a).value = e[2];
    var d = r.split(/:/);
    document.getElementById("outarrivehour-" + a).value = d[0];
    document.getElementById("outarriveminute-" + a).value = d[1];
    var l = o.split(/-/);
    document.getElementById("indepartyear-" + a).value = l[0];
    document.getElementById("indepartmonth-" + a).value = l[1];
    document.getElementById("indepartday-" + a).value = l[2];
    var h = m.split(/:/);
    document.getElementById("indeparthour-" + a).value = h[0];
    document.getElementById("indepartminute-" + a).value = h[1];
    var e = g.split(/-/);
    document.getElementById("inarriveyear-" + a).value = e[0];
    document.getElementById("inarrivemonth-" + a).value = e[1];
    document.getElementById("inarriveday-" + a).value = e[2];
    var d = f.split(/:/);
    document.getElementById("inarrivehour-" + a).value = d[0];
    document.getElementById("inarriveminute-" + a).value = d[1]
}

function hoverfilteron(c) {
    var b = c.element();
    var a = $(b).up("div");
    if (!a.id) {
        a = b
    }
    if (a.id.match(/ticks/)) {
        $(a).appendChild($("filterbutton"))
    }
}

function enablehovers() {
    $$("div").each(function(a) {
        if (a.id.match(/ticks/)) {
            a.observe("mouseover", hoverfilteron)
        }
    })
}

function redirect(a) {
    document.location.href = "/fusion/gotocruise.pl?cid=" + a
}

function updatedatefromnights() {
    var a = new Date();
    a.setFullYear($F("depdate-year"), $F("depdate-month") - 1, $F("depdate-day"));
    var b = a.getTime() / 1000;
    b += parseInt(($F("helpernights") || 0)) * 86400;
    a.setTime(b * 1000);
    $("retdate-year").value = a.getFullYear();
    $("retdate-month").value = a.getMonth() + 1;
    $("retdate-day").value = a.getDate()
}

function updatenightsfromdate() {
    var a = new Date();
    a.setFullYear($F("depdate-year"), $F("depdate-month") - 1, $F("depdate-day"));
    var d = new Date();
    d.setFullYear($F("retdate-year"), $F("retdate-month") - 1, $F("retdate-day"));
    var e = a.getTime() / 1000;
    var c = d.getTime() / 1000;
    var b = parseInt((c - e) / 86400);
    $("helpernights").value = b
}

function updateretdate() {
    var b = new Date();
    b.setFullYear($F("depdate-year"), $F("depdate-month") - 1, $F("depdate-day"));
    var e = b.getTime() / 1000;
    e += 2629743;
    b.setTime(e * 1000);
    $("retdate-year").value = b.getFullYear();
    $("retdate-day").value = b.getDate();
    var d = b.getMonth() + 1;
    var a = document.getElementById("retdate-month");
    var c = /^0/;
    if (a.toString().match(c)) {
        if (d <= 9) {
            d = "0" + d
        }
    }
    $("retdate-month").value = d
}

function updatetraveldates(b, f, c) {
    var a = new Date();
    if (b == "month" && f < a.getMonth() + 1 && $("depdate-year").value == a.getFullYear()) {
        $("depdate-year").value = a.getFullYear() + 1
    } else {
        if (b == "day" && f < a.getDate() && $("depdate-month").value == a.getMonth() + 1) {
            $("depdate-month").value = a.getMonth() + 2
        } else {
            if (b == "year" && f == a.getFullYear() && $("depdate-month").value < a.getMonth() + 1) {
                $("depdate-year").value = a.getFullYear() + 1
            }
        }
    }
    a.setFullYear($F("depdate-year"), $F("depdate-month") - 1, $F("depdate-day"));
    var g = a.getTime() / 1000;
    g += c;
    a.setTime(g * 1000);
    $("retdate-year").value = a.getFullYear();
    var e = a.getMonth() + 1;
    $("retdate-month").value = e;
    $("retdate-day").value = a.getDate()
}

function disablecreditcard() {
    var c = /creditcard/;
    var a = /-(staffprompt|dep(due|payment)|disablecc|tradingnameid|atolbonding|mcpnonflight|(book|cruise)asoption|addtoportfolio|traderetail|fundtransfer|schedule(amount|duedate))/;
    if ($F("disablecc") == 1) {
        for (i = 0; i < document.bookingform.elements.length; i++) {
            var b = document.bookingform.elements[i].name;
            if (b.match(c) && !(b.match(a))) {
                document.bookingform.elements[i].disabled = true
            }
        }
    } else {
        for (i = 0; i < document.bookingform.elements.length; i++) {
            var b = document.bookingform.elements[i].name;
            if (b.match(c) && !(b.match(a))) {
                document.bookingform.elements[i].disabled = false
            }
        }
    }
}

function switchaltdiv(b, a) {
    if (document.getElementById(b)) {
        if (document.getElementById(a).checked == true) {
            document.getElementById(b).style.display = "block"
        } else {
            document.getElementById(b).style.display = "none"
        }
    }
}

function clearcruisedepair() {
    if ($("cruisedepair")) {
        $("cruisedepair").value = ""
    }
}

function setcruisedepair(b, a) {
    if ($("cruisedepair")) {
        $("cruisedepair").value = a.id
    }
}
var rotatebanners = {
    banners: [],
    interval: null,
    speed: 3,
    add: function(g, d) {
        var c = rotatebanners;
        var e = document.getElementById(g);
        if (!e) {
            return
        }
        for (var b = 0; b < d.length; b++) {
            var a = d[b];
            if (!a) {
                continue
            }
            var f = document.createElement("DIV");
            f.style.position = "absolute";
            f.style.top = "0px";
            f.style.left = "0px";
            f.style.display = "none";
            f.innerHTML = a;
            e.appendChild(f)
        }
        c.banners.push({
            target: e,
            current: 0,
            length: e.childNodes.length
        });
        e.childNodes[0].style.display = "block"
    },
    update: function() {
        var b = rotatebanners;
        for (var a = 0, c; c = b.banners[a]; a++) {
            if (c.target.childNodes.length < 2) {
                continue
            }
            $(c.target.childNodes[c.current]).fade(b.speed);
            c.current = c.current + 1 >= c.length ? 0 : c.current + 1;
            $(c.target.childNodes[c.current]).appear(b.speed)
        }
    },
    start: function(c, b) {
        var a = rotatebanners;
        a.stop();
        a.speed = b ? b : a.speed;
        a.interval = setInterval(rotatebanners.update, c * 1000)
    },
    stop: function() {
        var a = rotatebanners;
        if (a.interval) {
            clearInterval(a.interval)
        }
        a.interval = null
    }
};

function updateBasketCountdown() {
    var e = $$(".basketwarning")[0];
    var d = $$(".basketwarning b")[0];
    e.hide();
    var a = new Date().getTime();
    var b = Math.floor((a - sessionTimer) / 1000 / 60);
    var c = 10 - b;
    $$(timerMatch)[0].innerHTML = c + " minute" + (c != 1 ? "s" : "");
    if (b > 10) {
        $$(timerMatch)[0].up().hide();
        e.show();
        d.innerHTML = b + " minute" + (b != 1 ? "s" : "")
    } else {
        e.hide();
        $$(timerMatch)[0].up().show()
    }
}

function updateBasketTimer() {
    var a = new Date().getTime();
    var b = Math.floor((a - sessionTimer) / 1000 / 60);
    $$(timerMatch)[0].innerHTML = b + " minute" + (b != 1 ? "s" : "")
}

function setupBasketTimer(a) {
    if (!a) {
        a = ".sessiontimer b"
    }
    if ($$(a)) {
        window.timerMatch = a;
        var b = $$(a)[0].innerHTML;
        b = b.replace(/[^0-9]+/, "");
        window.sessionTimer = new Date().getTime() - (b * 1000 * 60);
        updateBasketTimer();
        setInterval(updateBasketTimer, 3000)
    }
}

function setupBasketCountdown(a) {
    if (!a) {
        a = ".baskettimer b"
    }
    if ($$(a)) {
        window.timerMatch = a;
        var b = $$(a)[0].innerHTML;
        b = b.replace(/[^0-9]+/, "");
        window.sessionTimer = new Date().getTime() - (b * 1000 * 60);
        updateBasketCountdown();
        setInterval(updateBasketCountdown, 3000)
    }
}

function setupdestination(g, c) {
    var f = $(g);
    if (!f) {
        return
    }
    c = c ? c : "Cant find a match for '%SEARCH%'";
    var a = f.form.elements.sid.value;
    var m = f.form.elements.product.value;
    if (!a || !m) {
        return
    }
    var l = document.createElement("INPUT");
    l.name = "locationid";
    l.type = "hidden";
    f.form.appendChild(l);
    var d = $(f).getDimensions();
    var h = $(f).cumulativeOffset();
    var b = document.createElement("IFRAME");
    b.className = "autocomplete";
    b.style.width = d.width + "px";
    b.style.top = (h.top + d.height) + "px";
    b.style.left = h.left + "px";
    b.style.border = "0px";
    b.tabIndex = -1;
    document.body.appendChild(b);
    var e = document.createElement("DIV");
    e.className = "autocomplete";
    e.style.width = d.width + "px";
    e.style.top = (h.top + d.height) + "px";
    e.style.left = h.left + "px";
    document.body.appendChild(e);
    f.dest = {
        sid: a,
        product: m,
        locationid: l,
        options: [],
        dropdown: e,
        dropdownback: b,
        cache: {},
        messagetext: c,
        fail: false,
        index: 0,
        maxlength: 6,
        clear: false,
        set: true,
        active: false,
        waitingfor: ""
    };
    f.setvalue = function() {
        if (this.dest.active) {
            if (this.dest.options.length > 0 && this.dest.options[this.dest.index] != null) {
                this.value = this.dest.options[this.dest.index].name;
                this.dest.waitingfor = this.value;
                this.dest.locationid.value = this.dest.options[this.dest.index].id;
                this.dest.clear = false;
                this.dest.set = true
            } else {
                if (this.value) {
                    message = this.dest.messagetext.replace(/%SEARCH%/, this.value);
                    this.value = message
                }
                this.dest.locationid.value = "";
                this.dest.clear = true;
                this.dest.set = false
            }
        }
    };
    f.checkvalue = function() {
        if (this.dest.options.length) {
            this.value = this.dest.options[this.dest.index].name;
            this.dest.waitingfor = this.value;
            this.dest.locationid.value = this.dest.options[this.dest.index].id;
            this.dest.clear = false;
            this.dest.set = true
        } else {
            if (this.dest.cache[this.dest.waitingfor.toUpperCase()]) {
                var p = "";
                var s = 0;
                for (var r, q = 0; r = this.dest.cache[this.dest.waitingfor.toUpperCase()].results[q]; q++) {
                    if (r.name.toUpperCase() == this.dest.waitingfor.toUpperCase()) {
                        p = r.name;
                        s = r.id;
                        break
                    }
                }
                if (p) {
                    this.value = p;
                    this.dest.waitingfor = p;
                    this.dest.locationid.value = s;
                    this.dest.clear = false;
                    this.dest.set = true
                } else {
                    if (this.dest.waitingfor) {
                        message = this.dest.messagetext.replace(/%SEARCH%/, this.dest.waitingfor);
                        this.value = message
                    }
                    this.dest.locationid.value = "";
                    this.dest.clear = true;
                    this.dest.set = false
                }
            } else {
                if (!this.dest.locationid.value) {
                    this.value = "Checking " + this.dest.waitingfor;
                    this.dest.locationid.value = ""
                }
            }
        }
    };
    f.setlist = function(o) {
        if (o != null && o.search == this.value) {
            if (!!o.fail) {
                this.dest.options.length = 0;
                this.dest.fail = true
            } else {
                this.dest.options = [].concat(o.results);
                this.dest.fail = false
            }
        } else {
            if (o == null) {
                this.dest.options.length = 0;
                this.dest.fail = false
            }
        }
    };
    f.drawlist = function() {
        if (this.dest.options.length) {
            this.dest.dropdown.innerHTML = "";
            var p = 0;
            this.dest.dropdown.style.display = "block";
            this.dest.dropdownback.style.display = "block";
            for (var s, q = 0; s = this.dest.options[q]; q++) {
                var t = document.createElement("DIV");
                t.appendChild(document.createTextNode(s.name));
                this.dest.dropdown.appendChild(t);
                if (q < this.dest.maxlength) {
                    var r = $(t).getDimensions();
                    p += r.height
                }
                $(t).observe("click", function(u, o) {
                    return function(v) {
                        Event.stop(v);
                        u.setindex(o);
                        u.setvalue();
                        u.setlist();
                        u.drawlist();
                        u.dest.active = false
                    }
                }(this, q));
                $(t).observe("mouseover", function(u, o) {
                    return function() {
                        u.setindex(o, false)
                    }
                }(this, q))
            }
            this.setindex(0);
            this.dest.dropdown.style.height = p + "px";
            this.dest.dropdownback.style.height = p + "px"
        } else {
            if (this.dest.fail) {
                this.dest.dropdown.innerHTML = "";
                message = this.dest.messagetext.replace(/%SEARCH%/, f.value);
                var t = document.createElement("DIV");
                t.appendChild(document.createTextNode(message));
                this.dest.dropdown.appendChild(t);
                this.dest.dropdown.style.display = "block";
                var r = $(t).getDimensions();
                this.dest.dropdown.style.height = r.height + "px";
                this.dest.dropdownback.style.display = "block";
                this.dest.dropdownback.style.height = r.height + "px"
            } else {
                this.dest.dropdown.style.display = "none";
                this.dest.dropdownback.style.display = "none"
            }
        }
    };
    f.setindex = function(p, o) {
        if (this.dest.fail) {
            return
        }
        for (var s, q = 0; s = this.dest.dropdown.childNodes[q]; q++) {
            s.className = q == p ? "selected" : "";
            if (q == p && o) {
                var r = $(s).getDimensions();
                s.parentNode.scrollTop = p >= this.dest.maxlength ? ((p - this.dest.maxlength + 1) * r.height) : 0
            }
        }
        this.dest.index = p
    };
    f.changedest = function() {
        this.dest.options.length = 0;
        if (this.dest.clear) {
            this.value = "";
            this.dest.clear = false
        }
        this.dest.set = false;
        this.drawlist();
        this.dest.waitingfor = this.value;
        this.dest.locationid.value = "";
        if (this.dest.cache[this.value.toUpperCase()]) {
            this.setlist({
                search: this.value,
                results: this.dest.cache[this.value.toUpperCase()].results,
                fail: this.dest.cache[this.value.toUpperCase()].fail
            });
            this.drawlist()
        } else {
            var o = "/fusion/destinationautocomplete.pl?sid=" + this.dest.sid + "&product=" + this.dest.product + "&search=" + this.value;
            new Ajax.Request(o, {
                method: "get",
                evalJSON: true,
                onSuccess: function(p) {
                    return function(r) {
                        var q = r.responseJSON;
                        if (q != null && q.search != null && q.results != null) {
                            p.dest.cache[q.search.toUpperCase()] = q;
                            p.setlist(q)
                        } else {
                            p.setlist()
                        }
                        if (!p.dest.active) {
                            p.checkvalue(q.search)
                        } else {
                            p.drawlist()
                        }
                    }
                }(this),
                onFailure: function(p) {
                    return function() {
                        p.setlist();
                        p.drawlist()
                    }
                }(this)
            })
        }
    };
    f.checkpress = function(q, p) {
        var o = q.keyCode;
        if (o == 38) {
            if ((this.dest.index > 0) && !p) {
                this.setindex(this.dest.index - 1, true)
            }
            Event.stop(q);
            return false
        } else {
            if (o == 40) {
                if ((this.dest.index < this.dest.dropdown.childNodes.length - 1) && !p) {
                    this.setindex(this.dest.index + 1, true)
                }
                Event.stop(q);
                return false
            } else {
                if (o == 13) {
                    if (p) {
                        this.setvalue();
                        this.deactivate()
                    }
                    Event.stop(q);
                    return false
                } else {
                    if (!this.dest.active) {
                        this.activate()
                    }
                    if (p) {
                        this.changedest()
                    }
                    return true
                }
            }
        }
    };
    f.activate = function(o) {
        if (!this.active) {
            this.dest.active = true;
            this.value = this.dest.waitingfor;
            if (o) {
                this.select()
            }
            this.changedest()
        }
    };
    f.deactivate = function() {
        if (this.dest.active) {
            this.dest.active = false;
            this.checkvalue();
            this.setlist();
            this.drawlist()
        }
    };
    $(f).observe("keydown", function(o) {
        return function(p) {
            return o.checkpress(p, false)
        }
    }(f));
    $(f).observe("keyup", function(o) {
        return function(p) {
            return o.checkpress(p, true)
        }
    }(f));
    $(f).observe("focus", function(o) {
        return function() {
            o.activate(true)
        }
    }(f));
    $(f).observe("click", function(o) {
        return function() {
            o.activate(false)
        }
    }(f));
    $(f).observe("blur", function(o) {
        return function() {
            setTimeout(function() {
                o.deactivate()
            }, 100)
        }
    }(f));
    if (f.value) {
        f.changedest()
    } else {
        if (f.dest.locationsid.value) {
            f.activate();
            f.deactivate()
        }
    }
}

function updatefield(b, a) {
    if (document.getElementById(b)) {
        if (document.getElementById(b).value == "") {
            setfield(b, a)
        }
    }
}

function setsearchfromenquiry(d) {
    var e = 0;
    var f = {};
    if (!d) {
        var g = document.cookie;
        var b = g.split("; ");
        var c = new Array();
        for (var a = 0; a < b.length; a++) {
            c = b[a].split("=");
            if (c[0] == "activeenquiry") {
                e = c[1]
            }
        }
    } else {
        e = d
    }
    f.id = e;
    new Ajax.Request("/extranet/enquiryjson.pl", {
        parameters: f,
        evalJSON: true,
        onSuccess: function(l) {
            var h = l.responseJSON;
            if ($("railpassradio") && h.railpasses === "Y") {
                $("railpassradio").checked = true;
                togglerail(2)
            }
            if ($("lineid") && h.lineid > 0 && h.lineid.match(/^\d+$/)) {
                $("lineid").value = h.lineid;
                updateships($("lineid"))
            }
            if ($("shipid") && h.shipid > 0 && h.shipid.match(/^\d+$/)) {
                $("shipid").value = h.shipid
            }
            if ($("regionid") && h.regionid > 0 && h.regionid.match(/^\d+$/)) {
                $("regionid").value = h.regionid
            }
            if ($("day") && h.day.match(/^\d+$/)) {
                $("day").value = h.day;
                if ($("daysplusminus")) {
                    $("daysplusminus").value = 2
                }
            }
            if ($("monthyear") && h.monthyear) {
                $("monthyear").value = h.monthyear
            }
            if ($("childage-1") && h.childage1.match(/^\d+$/)) {
                $("childage-1").value = h.childage1
            }
            if ($("childage-2") && h.childage2.match(/^\d+$/)) {
                $("childage-2").value = h.childage2
            }
            if ($("childage-3") && h.childage3.match(/^\d+$/)) {
                $("childage-3").value = h.childage3
            }
            if ($("childage-4") && h.childage4.match(/^\d+$/)) {
                $("childage-4").value = h.childage4
            }
            if ($("fromgroup") && h.departure.match(/^\d+$/)) {
                $("fromgroup").value = h.departure
            } else {
                if ($("from")) {
                    $("from").value = h.departure
                }
            }
            if ($("togroup") && h.destination.match(/^\d+$/)) {
                $("togroup").value = h.destination
            } else {
                if ($("to")) {
                    if (document.getElementsByName("product")[0]) {
                        if (document.getElementsByName("product")[0].value == "carpark") {
                            $("to").value = h.departure
                        } else {
                            $("to").value = h.destination
                        }
                    } else {
                        $("to").value = h.destination
                    }
                }
            }
            if ($("depdate-day") && $("depdate-month") && $("depdate-year")) {
                $("depdate-day").value = parseInt(h.fromdateday);
                $("depdate-month").value = h.fromdatemonth;
                $("depdate-year").value = h.fromdateyear
            }
            if ($("retdate-day") && $("retdate-month") && $("retdate-year")) {
                $("retdate-day").value = parseInt(h.todateday);
                $("retdate-month").value = h.todatemonth;
                $("retdate-year").value = h.todateyear
            }
            if ($("passdepdate-day") && $("passdepdate-month") && $("passdepdate-year")) {
                $("passdepdate-day").value = parseInt(h.fromdateday);
                $("passdepdate-month").value = h.fromdatemonth;
                $("passdepdate-year").value = h.fromdateyear
            }
            if ($("nightsfrom") && $("nightsto")) {
                $("nightsfrom").value = h.nights;
                $("nightsto").value = h.nights
            } else {
                if ($("helpernights")) {
                    $("helpernights").value = h.nights;
                    updatedatefromnights()
                } else {
                    if ($("nights")) {
                        $("nights").value = h.nights
                    }
                }
            }
            if ($("adults-1")) {
                $("adults-1").value = h.adults
            } else {
                if ($("adults")) {
                    $("adults").value = h.adults
                }
            }
            if ($("passadults")) {
                $("passadults").value = h.adults;
                showpassadults()
            }
            if ($("passchildren")) {
                $("passchildren").value = h.children
            }
            if ($("passinfants")) {
                $("passinfants").value = h.infants
            }
            if ($("children-1")) {
                $("children-1").value = h.children
            } else {
                if ($("children")) {
                    $("children").value = h.children
                }
            }
            if ($("infants-1")) {
                $("infants-1").value = h.infants
            } else {
                if ($("infants")) {
                    $("infants").value = h.infants
                }
            }
            if ($("roomcount")) {
                $("roomcount").value = 1
            }
            if ($("plusminus")) {
                $("plusminus").value = h.plusminus
            }
            if ($("childage-1-1")) {
                $("childage-1-1").value = h.childage1
            }
            if ($("childage-1-2")) {
                $("childage-1-2").value = h.childage2
            }
            if ($("childage-1-3")) {
                $("childage-1-3").value = h.childage3
            }
            if ($("childage-1-4")) {
                $("childage-1-4").value = h.childage4
            }
            if ($("childage-1-5")) {
                $("childage-1-5").value = h.childage5
            }
            if ($("childage-1")) {
                $("childage-1").value = h.childage1
            }
            if ($("childage-2")) {
                $("childage-2").value = h.childage2
            }
            if ($("childage-3")) {
                $("childage-3").value = h.childage3
            }
            if ($("childage-4")) {
                $("childage-4").value = h.childage4
            }
            if ($("childage-5")) {
                $("childage-5").value = h.childage5
            }
            if ($("youths") && h.youths) {
                $("youths").value = h.youths
            }
            if ($("seniors") && h.seniors) {
                $("seniors").value = h.seniors
            }
            if (h.enquirytype == "rail" && h.railpasses !== "Y") {
                if (h.journeytype != "return") {
                    setCheckedValue(document.forms.railsearch.elements["return"], "0");
                    singlefare(0)
                } else {
                    setCheckedValue(document.forms.railsearch.elements["return"], "1");
                    singlefare(1)
                }
                document.getElementById("railpassform").elements["depdate-day"].value = parseInt(h.fromdateday);
                document.getElementById("railpassform").elements["depdate-month"].value = h.fromdatemonth;
                document.getElementById("railpassform").elements["depdate-year"].value = h.fromdateyear;
                showages("child", "children");
                showages("adult", "adults");
                showages("youth", "youths")
            }
            roomchange();
            showchildren();
            cruiseformjs()
        }
    })
}

function cruiseformjs() {
    if (document.getElementById("pastpassenger")) {
        $("lineid").observe("change", function(a) {
            updatepastpassenger()
        });
        updatepastpassenger()
    }
    if (document.getElementById("newpastpassenger1")) {
        $("lineid").observe("change", function(a) {
            updatenewpastpassenger()
        });
        $("adults").observe("change", function(a) {
            updatenewpastpassenger()
        });
        updatenewpastpassenger()
    }
    if (document.getElementById("homecity")) {
        $("lineid").observe("change", function(a) {
            updatehomecity()
        });
        updatehomecity()
    }
    if (document.getElementById("includesenior")) {
        $("lineid").observe("change", function(a) {
            updatesenior()
        });
        updatesenior()
    }
    if (document.getElementById("military")) {
        $("lineid").observe("change", function(a) {
            updatemilitary()
        });
        updatemilitary()
    }
    if ($("supplierpromocode")) {
        $("lineid").observe("change", function(a) {
            updatesupplierpromocode()
        });
        updatesupplierpromocode()
    }
}

function updatesupplierpromocode() {
    if ($("lineid").value == "3" || $("lineid").value == "22" || $("lineid").value == "66") {
        $("supplierpromocode").disabled = false
    } else {
        $("supplierpromocode").disabled = true
    }
}

function updatepastpassenger() {
    if ($("lineid").value === "86" || $("lineid").value === "5" || $("lineid").value === "20" || $("lineid").value === "1" || $("lineid").value === "8" || $("lineid").value === "15" || $("lineid").value === "24" || $("lineid").value === "299" || $("lineid").value == "3" || $("lineid").value == "22" || $("lineid").value == "66") {
        $("pastpassenger").disabled = false
    } else {
        $("pastpassenger").disabled = true
    }
}

function updatehomecity() {
    if ($("lineid").value == "86" || $("lineid").value == "5" || $("lineid").value == "20" || $("lineid").value == "1" || $("lineid").value == "8" || $("lineid").value === "15" || $("lineid").value === "24" || $("lineid").value === "299") {
        $("homecity").disabled = false
    } else {
        $("homecity").disabled = true;
        $("homecity").value = ""
    }
}

function updatemilitary() {
    if ($("lineid").value == "17" || $("lineid").value == "3" || $("lineid").value == "22" || $("lineid").value == "66" || $("lineid").value == "" || $("lineid").value == "8") {
        $("military").disabled = false
    } else {
        $("military").disabled = true
    }
}

function updatesenior() {
    if ($("lineid").value == "3" || $("lineid").value == "22" || $("lineid").value == "66" || $("lineid").value == "" || $("lineid").value == "8" || $("lineid").value == "16") {
        $("includesenior").disabled = false
    } else {
        $("includesenior").disabled = true
    }
}

function updatenewpastpassenger() {
    if ($("lineid").value === "13" || $("lineid").value === "5" || $("lineid").value === "20" || $("lineid").value === "86" || $("lineid").value === "299") {
        for (var a = 1; a <= 5; a++) {
            if ($("adults").value >= a) {
                $("newpastpassenger" + a + "div").show();
                $("newpastpassenger" + a).disabled = false
            } else {
                $("newpastpassenger" + a + "div").hide();
                $("newpastpassenger" + a).value = ""
            }
        }
    } else {
        for (var a = 1; a <= 5; a++) {
            if ($("adults").value >= a) {
                $("newpastpassenger" + a + "div").show();
                $("newpastpassenger" + a).disabled = true;
                $("newpastpassenger" + a).value = ""
            } else {
                $("newpastpassenger" + a + "div").hide();
                $("newpastpassenger" + a).value = ""
            }
        }
    }
}

function savequoteforagent(a) {
    myLightWindow.activateWindow({
        href: "/fusion/itinerary.pl?action=savequote&sessionkey=" + a,
        type: "external",
        width: 400,
        height: 200,
        loadingAnimation: "false"
    })
}

function updatecustomerquote(a, b) {
    var c = {};
    c.sessionkey = a;
    c.saveagentquote = 1;
    c.archivequoteid = b;
    new Ajax.Request("/fusion/addtoquotes.pl", {
        parameters: c,
        method: "get",
        onComplete: function(e) {
            var d = e.responseJSON;
            if (d.success == "1") {
                myLightWindow.activateWindow({
                    href: "/fusion/itinerary.pl?action=savequote&msg=quoteupdated&sessionkey=" + a,
                    type: "external",
                    width: 400,
                    height: 200,
                    loadingAnimation: "false"
                })
            } else {
                myLightWindow.activateWindow({
                    href: "/fusion/itinerary.pl?action=savequote&msg=quoteupdatefailed&sessionkey=" + a,
                    type: "external",
                    width: 400,
                    height: 200,
                    loadingAnimation: "false"
                })
            }
        },
        evalJS: "true"
    })
}

function setmanualprices(f, g) {
    var b;
    var l = document.getElementById("itinitems").value;
    var e = document.getElementById("sessionkey").value;
    var d = {};
    d.sessionkey = e;
    d.action = "setmanualprice";
    var m = 0;
    for (b = 0; b < l; b++) {
        if (document.getElementById("change-" + b)) {
            if (document.getElementById("item-" + b)) {
                var a = document.getElementById("item-" + b).name.replace("pricebox-", "")
            }
            var h = parseFloat(document.getElementById("change-" + b).value);
            if (isNaN(h) || !h) {
                h = 0
            }
            if (h != 0) {
                d["manualadjust-" + a] = h;
                m = 1
            }
        }
    }
    var c = 0;
    if ($("depositprice") && (f === "quote" || f === "quoteandempty")) {
        c = $("depositprice").value
    }
    if (m == 1) {
        new Ajax.Request("/fusion/itinerary.pl", {
            parameters: d,
            method: "get",
            onComplete: function(o) {
                if (f == "agent") {
                    document.location.href = "/fusion/itinerary.pl?sessionkey=" + e + "&agentview=1"
                } else {
                    if (f == "quote") {
                        document.location.href = "/fusion/addtoquotes.pl?sessionkey=" + e + "&depositamount=" + c
                    } else {
                        if (f == "quoteandempty") {
                            document.location.href = "/fusion/addtoquotes.pl?sessionkey=" + e + "&depositamount=" + c + "&empty=1"
                        } else {
                            if (f == "email") {
                                myLightWindow.activateWindow({
                                    href: "/fusion/emailbasket.pl?sessionkey=" + e,
                                    type: "external",
                                    width: 800,
                                    height: 500,
                                    loadingAnimation: "false"
                                })
                            } else {
                                if (f == "enquiryandquote") {
                                    document.location.href = "/extranet/crm.pl?action=newenquiry&amp;autoquote=1"
                                }
                            }
                        }
                    }
                }
            },
            evalJS: "false"
        })
    } else {
        if (f == "agent") {
            document.location.href = "/fusion/itinerary.pl?sessionkey=" + e + "&agentview=1"
        } else {
            if (f == "quote") {
                document.location.href = "/fusion/addtoquotes.pl?sessionkey=" + e + "&depositamount=" + c
            } else {
                if (f == "quoteandempty") {
                    document.location.href = "/fusion/addtoquotes.pl?sessionkey=" + e + "&depositamount=" + c + "&empty=1"
                } else {
                    if (f == "email") {
                        myLightWindow.activateWindow({
                            href: "/fusion/emailbasket.pl?sessionkey=" + e,
                            type: "external",
                            width: 800,
                            height: 500,
                            loadingAnimation: "false"
                        })
                    } else {
                        if (f == "enquiryandquote") {
                            document.location.href = "/extranet/crm.pl?action=newenquiry&amp;autoquote=1"
                        }
                    }
                }
            }
        }
    }
}

function showhayssupplier() {
    if ($F("suppliername") == "5195" || $F("suppliername") == "5199") {
        $("hbsupplier").disabled = false
    } else {
        if ($("hbsupplier")) {
            $("hbsupplier").disabled = true
        }
    }
}

function showsectors(b) {
    if (b == "out") {
        for (var a = 2; a <= 4; a++) {
            if (a <= $F("outsectors")) {
                $("outbound" + a).style.display = "block"
            } else {
                if (a > $F("outsectors")) {
                    $("outbound" + a).style.display = "none"
                }
            }
        }
    } else {
        if (b == "in") {
            for (var a = 1; a <= 4; a++) {
                if (a <= $F("insectors")) {
                    $("inbound" + a).style.display = "block"
                } else {
                    if (a > $F("insectors")) {
                        $("inbound" + a).style.display = "none"
                    }
                }
            }
        }
    }
}

function showinbound() {
    if ($("onewayno").checked == true) {
        $("inbound1").style.display = "block";
        $("inboundhead").style.display = "inline"
    } else {
        if ($("onewayyes").checked == true) {
            $("inbound1").style.display = "none";
            $("inboundhead").style.display = "none"
        }
    }
}

function addsinglepricechanger(c, h) {
    if (h) {
        $("adddiscount_button").disabled = true;
        $("pricechanger_button").disabled = true;
        if (c == 1) {
            if (insurancediscounts) {
                if (parseFloat($("discountamount").value) < parseFloat($("total_insurance").value)) {
                    if (insurancediscounts.indexOf(parseInt(insurancediscounts[0])) != -1) {
                        myLightWindow.activateWindow({
                            href: "/fusion/itinerary.pl?action=chooseinsurance&sessionkey=" + $F("pricechanger_sessionkey") + "&ibosid=" + insurancediscounts[0] + "&price=" + $F("discountamount") + "&discount=1&profit=N",
                            lightwindow_type: "external",
                            lightwindow_width: 800,
                            lightwindow_height: 500,
                            lightwindow_loading_animation: false
                        })
                    } else {
                        document.location.href = "/fusion/itinerary.pl?action=addpricechanger&sessionkey=" + $F("pricechanger_sessionkey") + "&price=" + $F("discountamount") + "&discount=1&profit=N"
                    }
                } else {
                    document.location.href = "/fusion/itinerary.pl?action=addpricechanger&sessionkey=" + $F("pricechanger_sessionkey") + "&price=" + $F("discountamount") + "&discount=1&profit=N"
                }
            }
        }
    } else {
        if (c == 1) {
            var g = 0;
            if (insurancediscounts && insurancediscounts.size() > 0) {
                if (insurancediscounts.indexOf(parseInt($("pricechanger_ibosid").value)) != -1) {
                    g = 1;
                    myLightWindow.activateWindow({
                        href: "/fusion/itinerary.pl?action=chooseinsurance&sessionkey=" + $F("pricechanger_sessionkey") + "&ibosid=" + $F("pricechanger_ibosid") + "&price=" + $F("pricechanger_price") + "&profit=" + $F("pricechanger_profit"),
                        lightwindow_type: "external",
                        lightwindow_width: 800,
                        lightwindow_height: 500,
                        lightwindow_loading_animation: false
                    })
                }
            } else {
                if (elementsupps) {
                    var f = $("itinelements").value;
                    if (f != "1") {
                        var b = 0;
                        if (typeof(attachonlydiscounts) != "undefined" && attachonlydiscounts == 1 && typeof(discountsupplements) == "object") {
                            var e = false;
                            discountsupplements.forEach(function(o, l, m) {
                                if (o == $F("pricechanger_ibosid")) {
                                    e = true
                                }
                            });
                            if (!e) {
                                b = 1
                            }
                        }
                        if (!b) {
                            g = 1;
                            myLightWindow.activateWindow({
                                href: "/fusion/itinerary.pl?action=chooseelements&sessionkey=" + $F("pricechanger_sessionkey") + "&ibosid=" + $F("pricechanger_ibosid") + "&price=" + $F("pricechanger_price") + "&profit=" + $F("pricechanger_profit"),
                                lightwindow_type: "external",
                                lightwindow_width: 800,
                                lightwindow_height: 500,
                                lightwindow_loading_animation: false
                            })
                        }
                    }
                }
            }
            if (g === 0) {
                $("pricechanger_button").disabled = true;
                var d = $("parentreasoncodes") == undefined || $F("parentreasoncodes") == null ? "" : $F("parentreasoncodes");
                var a = $("childreasoncodes") == undefined || $F("childreasoncodes") == null ? "" : $F("childreasoncodes");
                if ($("pricechanger_profit")) {
                    document.location.href = "/fusion/itinerary.pl?action=addpricechanger&sessionkey=" + $F("pricechanger_sessionkey") + "&ibosid=" + $F("pricechanger_ibosid") + "&price=" + $F("pricechanger_price") + "&profit=" + $F("pricechanger_profit") + "&parentreasoncode=" + d + "&childreasoncode=" + a
                } else {
                    document.location.href = "/fusion/itinerary.pl?action=addpricechanger&sessionkey=" + $F("pricechanger_sessionkey") + "&ibosid=" + $F("pricechanger_ibosid") + "&price=" + $F("pricechanger_price") + "&parentreasoncode=" + d + "&childreasoncode=" + a
                }
            }
        } else {
            $("pricechanger_button").disabled = true;
            if ($("pricechanger_profit")) {
                document.location.href = "/fusion/itinerary.pl?action=addpricechanger&sessionkey=" + $F("pricechanger_sessionkey") + "&name=" + $F("pricechanger_name") + "&code=" + $F("pricechanger_code") + "&price=" + $F("pricechanger_price") + "&profit=" + $F("pricechanger_profit")
            } else {
                document.location.href = "/fusion/itinerary.pl?action=addpricechanger&sessionkey=" + $F("pricechanger_sessionkey") + "&name=" + $F("pricechanger_name") + "&code=" + $F("pricechanger_code") + "&price=" + $F("pricechanger_price")
            }
        }
    }
}

function addpromocode() {
    document.location.href = "/fusion/itinerary.pl?action=addpromocode&sessionkey=" + $F("promocode_sessionkey") + "&code=" + $F("promocode_code") + "&type=" + $F("promocode_type")
}

function setprice() {
    document.location.href = "/fusion/itinerary.pl?action=setprice&sessionkey=" + $F("priceset_sessionkey") + "&priceset=" + $F("priceset_value")
}

function convertbasketcurrency() {
    var b = $$("#lightwindow_contents #converttocurrency");
    var a = $$("#lightwindow_contents #convertcurrency_sessionkey");
    document.location.href = "/fusion/itinerary.pl?sessionkey=" + a[0].getValue() + "&converttocurrency=" + b[0].getValue()
}

function replaceelement(c, b, a) {
    var d = confirm("If you want to replace this element with an item from the same search, click OK, otherwise click Cancel.");
    if (d) {
        new Ajax.Request("/fusion/replaceitem.pl", {
            parameters: {
                itemkey: b,
                sessionkey: c
            },
            evalJSON: true,
            onSuccess: function(f) {
                var e = f.responseJSON;
                document.location.href = e.redirecturl
            }
        })
    } else {
        document.location.href = a
    }
}

function toggler(b) {
    var a = $(b);
    if (a != null) {
        a.toggleon = $(b + "on");
        a.toggleoff = $(b + "off");
        if (a.toggleon != null && a.toggleoff != null) {
            a.toggleon.observe("click", function() {
                a.style.display = "block";
                a.toggleon.style.display = "none";
                a.toggleoff.style.display = "block";
                return false
            });
            a.toggleoff.observe("click", function() {
                a.style.display = "none";
                a.toggleon.style.display = "block";
                a.toggleoff.style.display = "none";
                return false
            });
            if (a.getStyle("display") == "block") {
                a.toggleon.style.display = "none";
                a.toggleoff.style.display = "block"
            } else {
                a.toggleon.style.display = "block";
                a.toggleoff.style.display = "none"
            }
        }
    }
}

function quicksearchfillcolumn(a, c, b) {
    $$("td.col" + a).each(function(o) {
        o.innerHTML = "&nbsp;";
        var l = o.lang;
        var p = data[l];
        if (p) {
            var h = p[c + "_" + b];
            if (h) {
                var m = h.price;
                var g = h.deeplink;
                if (b == "Any") {
                    o.innerHTML = '<a href="#" onclick="quicksearchpriceinfo(this,\'' + l + "','" + c + "','" + h.rating + "','any');return false;\">" + m + "</a>"
                } else {
                    o.innerHTML = '<a href="#" onclick="quicksearchpriceinfo(this,\'' + l + "','" + c + "','" + b + "');return false;\">" + m + "</a>"
                }
            }
        }
    });
    $("colhead" + a).innerHTML = "<b>" + c + " " + b + "*</b>";
    $("colhead" + a).lang = c + "_" + b;
    $("columnselector").style.display = "none";
    $("colhead" + a).up(0).removeClassName("qsselectedcell");
    for (var f = 1; f <= 5; f++) {
        $("col" + f + "sort").src = "/images/qs_sortoff.png"
    }
    var e = {};
    e.action = "storecolumn";
    e.col = a;
    e.board = c;
    e.rating = b;
    var d = new Ajax.Request("/fusion/quicksearch.pl", {
        parameters: e,
        method: "get",
        evalJS: "false"
    })
}

function quicksearchcolchanger(a, b) {
    quicksearchclosepanel();
    var d = $(a).up(0).cumulativeOffset();
    d[1] += $(a).up(0).getHeight();
    for (var e = 1; e <= 5; e++) {
        $("colhead" + e).up(0).removeClassName("qsselectedcell")
    }
    $(a).up(0).addClassName("qsselectedcell");
    $("columnselector").style.left = d[0] + "px";
    $("columnselector").style.top = d[1] + "px";
    $("columnselector").style.display = "block";
    $("selectedcol").value = b;
    var c = $("colhead" + b).lang.split(/_/);
    $("board").value = c[0];
    $("rating").value = c[1]
}

function quicksearchcolchangerclose() {
    for (n = 1; n <= 5; n++) {
        $("colhead" + n).up(0).removeClassName("qsselectedcell")
    }
    $("columnselector").style.display = "none";
    $("selectedcol").value = ""
}
var qslastselected;

function quicksearchpriceinfo(h, q, o, b, g) {
    quicksearchcolchangerclose();
    if (qslastselected) {
        if (qslastselected == $(h).up(0)) {
            quicksearchclosepanel();
            return
        }
        qslastselected.removeClassName("qsselectedcell")
    }
    var d = $(h).up(0).cumulativeOffset();
    d[1] += $(h).up(0).getHeight();
    $(h).up(0).addClassName("qsselectedcell");
    qslastselected = $(h).up(0);
    $("priceinfo").style.left = d[0] + "px";
    $("priceinfo").style.top = d[1] + "px";
    $("priceinfo").style.display = "block";
    var e = data[q];
    if (e) {
        var f = e[o + "_" + b];
        var m;
        if (f) {
            var p = f.deeplink;
            if (typeof g != "undefined" && g != 0) {
                m = "Any";
                p = p.replace(/rating=[0-9]*/g, "rating=")
            } else {
                m = b
            }
            var c = f.propertyname;
            var l = f.resort;
            var a = f.brand;
            $("hotelname").innerHTML = c + " (" + o + ", " + b + "*)";
            $("resort").innerHTML = l;
            $("operator").innerHTML = a;
            $("deeplink").href = p;
            $("addtoqueue").writeAttribute("data-key", q + "_" + o + "_" + m)
        }
    }
}

function quicksearchaddtoq() {
    if (typeof window.quicksearchqitems !== "object") {
        window.quicksearchqitems = {}
    }
    window.quicksearchqitems[$("addtoqueue").readAttribute("data-key")] = 1;
    quicksearchdrawq();
    quicksearchclosepanel()
}

function quicksearchdrawq() {
    var d = "";
    var a = $H();
    var m = $H();
    var l = $H();
    var o = $H();
    var b = $H();
    var c = $H();
    var f = $H();
    for (var h in window.quicksearchqitems) {
        if (window.quicksearchqitems.hasOwnProperty(h)) {
            var e = h.split(/_/);
            a.set(e[0], 1);
            m.set(e[1], 1);
            l.set(e[2], 1);
            o.set(e[3], 1);
            b.set(e[4], 1);
            c.set(e[5], 1);
            f.set(data[e[0] + "_" + e[1] + "_" + e[2] + "_" + e[3]]["date"], 1)
        }
    }
    var g = new Array();
    c.keys().each(function(p) {
        p = p.replace("Any", "");
        g.push(p)
    });
    g.join(",");
    $("qdeeplink").href = data.qjumper + "&amp;depdate=" + a.keys().join(",") + "&amp;from=" + m.keys().join(",") + "&amp;to=" + l.keys().join(",") + "&amp;nights=" + o.keys().join(",") + "&amp;board=" + b.keys().join(",") + "&amp;rating=" + g;
    d = "Dates: " + f.keys().join(", ") + "<br>";
    d += "Deps: " + m.keys().join(", ") + "<br>";
    d += "Dests: " + l.keys().join(", ") + "<br>";
    d += "Nights: " + o.keys().join(", ") + "<br>";
    d += "Boards: " + b.keys().join(", ") + "<br>";
    d += "Ratings: " + c.keys().join(", ");
    $("quicksearchqlist").update(d);
    $("quicksearchq").show()
}

function quicksearchemptyq() {
    window.quicksearchqitems = {};
    quicksearchdrawq();
    $("quicksearchq").hide()
}

function quicksearchclosepanel() {
    if (qslastselected) {
        qslastselected.removeClassName("qsselectedcell")
    }
    $("priceinfo").style.display = "none";
    qslastselected = undefined
}

function ugc_getships(b) {
    $("shipid").disabled = true;
    if (b > 0) {
        var a = new Ajax.Request("/system/ugc.pl?action=ajax&mode=getships&lineid=" + b, {
            method: "get",
            onSuccess: ugc_updateships,
            evalJS: "false"
        })
    } else {
        emptyList($("shipid"), 0)
    }
}

function ugc_updateships(c) {
    if ($("shipid")) {
        var b = c.responseText;
        var a = b.split(":");
        ugc_updatedropdown("shipid", a)
    }
}

function ugc_getresorts(a) {
    $("resortid").disabled = true;
    showspinner();
    if ($("propertyid")) {
        $("propertyid").disabled = true
    }
    if (a > 0) {
        var b = new Ajax.Request("/system/ugc.pl?action=ajax&mode=getresorts&countryid=" + a, {
            method: "get",
            onSuccess: ugc_updateresorts,
            evalJS: "false"
        })
    } else {
        emptyList($("resortid"), 0)
    }
}

function ugc_updateresorts(c) {
    if ($("resortid")) {
        var b = c.responseText;
        var a = b.split(":");
        ugc_updatedropdown("resortid", a)
    }
}

function ugc_getproperties(b) {
    $("propertyid").disabled = true;
    showspinner();
    if (b > 0) {
        var a = new Ajax.Request("/system/ugc.pl?action=ajax&mode=getproperties&resortid=" + b, {
            method: "get",
            onSuccess: ugc_updateproperties,
            evalJS: "false"
        })
    } else {
        emptyList($("propertid"), 0)
    }
}

function ugc_updateproperties(c) {
    if ($("propertyid")) {
        var b = c.responseText;
        var a = b.split(":");
        ugc_updatedropdown("propertyid", a)
    }
}

function ugc_updatedropdown(a, c) {
    if ($(a)) {
        emptyList($(a), 0);
        $(a).options[0] = new Option("Please Select", "");
        for (var d = 0; d < c.length; d++) {
            var b = c[d].split("|");
            if (b[1]) {
                $(a).options[d + 1] = new Option(b[1], b[0])
            }
        }
        if (c.length > 0) {
            $(a).disabled = false
        }
    }
    if ($("spinner")) {
        $("spinner").hide()
    }
    return
}

function showspinner() {
    if ($("spinner")) {
        $("spinner").show()
    }
}

function bookingchecknoemail() {
    if ($("email").value == "") {
        $("noemailreason").disabled = false
    } else {
        $("noemailreason").disabled = true
    }
}

function changetab(c, b) {
    if (c && b.length > 0) {
        for (i = 0; i < b.length; i++) {
            var a = b[i];
            if (c == a) {
                if ($(a + "-content") && $(a + "-tab")) {
                    $(a + "-content").style.display = "block";
                    $(a + "-tab").className = "tabon"
                }
            } else {
                if ($(a + "-content") && $(a + "-tab")) {
                    $(a + "-content").style.display = "none";
                    $(a + "-tab").className = ""
                }
            }
        }
    }
    return
}

function hiliteBestPriceHotels() {
    var h = {
        SC: 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        AI: 0
    };
    var e = {
        SC: null,
        "2": null,
        "3": null,
        "4": null,
        "5": null,
        AI: null
    };
    var f = ["SC", "2", "3", "4", "5", "AI"];
    var g = $("r0").parentNode.parentNode.getElementsByTagName("tr");
    for (var d = 1; d < g.length; d++) {
        var a = g[d].getElementsByTagName("td");
        for (var c = 5; c < 11; c++) {
            var b = c - 5;
            var l = Number(a[c].innerText);
            if (isNaN(l) || l == 0) {
                l = Number.MAX_VALUE
            }
            if ((h[f[b]] == 0 || h[f[b]] > l) && l < Number.MAX_VALUE) {
                h[f[b]] = l;
                e[f[b]] = a[c]
            }
        }
    }
    for (var d = 0; d < f.length; d++) {
        if (h[f[d]] > 0) {
            $(e[f[d]]).addClassName("bestprice")
        }
    }
}

function hiliteBestPriceCabins() {
    if ($("cabingrades")) {
        var h = {};
        var c = $("cabingrades").getElementsBySelector(".farecodeleadprice");
        $$(".bestprice").invoke("removeClassName", "bestprice");
        h.length = c.length;
        for (var b = 0; b < c.length; b++) {
            var g = c[b].getElementsByTagName("td");
            h[b] = {
                price: Number.MAX_VALUE,
                target: null
            };
            for (var a = 2; a < g.length; a++) {
                if (g[a].innerText) {
                    var d = new String(g[a].innerText);
                    d = d.replace(/[^0-9\.]/g, "");
                    if (Number(d)) {
                        if (Number(h[b].price) < Number.MAX_VALUE) {
                            if (h[b].price > d) {
                                h[b] = {
                                    price: Number(d),
                                    target: g[a].getElementsByTagName("a")[0]
                                }
                            }
                        } else {
                            h[b] = {
                                price: Number(d),
                                target: g[a].getElementsByTagName("a")[0]
                            }
                        }
                    }
                }
            }
        }
        try {
            for (var b = 0; b < h.length; b++) {
                $(h[b].target.parentNode.parentNode).addClassName("bestprice")
            }
        } catch (f) {}
    }
}

function changelanguage(c, a) {
    document.cookie = "languagecode=" + c + "; path=/;";
    if (a === "reload") {
        window.location.reload();
        return false
    } else {
        if (a === "followhref") {
            return true
        } else {
            if (a === "followhrefiflink") {
                if (event) {
                    Event.extend(event);
                    var b = Event.element(event);
                    if (b.tagName !== "A") {
                        b = Event.element(event).up("a")
                    }
                    if (b.href.substr(b.href.length - 1, 1) === "#") {
                        window.location.reload();
                        return false
                    } else {
                        return true
                    }
                }
            } else {
                if (a === "setonly") {} else {
                    window.location.reload()
                }
            }
        }
    }
}

function addcruiseitineraryline() {
    if ($("itineraryitems")) {
        var e = parseInt($("itineraryitems").value);
        e++;
        var l = new Element("tr");
        var d = new Element("td");
        d.insert(new Element("input", {
            type: "text",
            name: "itinday" + e,
            id: "itinday" + e,
            value: e,
            size: $("itinday1").readAttribute("size"),
            maxlength: $("itinday1").readAttribute("maxlength")
        }));
        l.insert(d);
        var c = new Element("td");
        c.insert(new Element("input", {
            type: "text",
            name: "itinname" + e,
            id: "itinname" + e,
            size: $("itinname1").readAttribute("size"),
            maxlength: $("itinname1").readAttribute("maxlength")
        }));
        l.insert(c);
        var g = new Element("td", {
            align: "right"
        });
        g.insert(new Element("input", {
            type: "text",
            name: "arrivetime" + e,
            id: "arrivetime" + e,
            size: $("arrivetime1").readAttribute("size"),
            maxlength: $("arrivetime1").readAttribute("maxlength"),
            style: $("arrivetime1").readAttribute("style")
        }));
        l.insert(g);
        var b = new Element("td", {
            align: "right"
        });
        b.insert(new Element("input", {
            type: "text",
            name: "departtime" + e,
            id: "departtime" + e,
            size: $("departtime1").readAttribute("size"),
            maxlength: $("departtime1").readAttribute("maxlength"),
            style: $("departtime1").readAttribute("style")
        }));
        l.insert(b);
        var a = new Element("td", {
            align: "right"
        });
        a.insert(new Element("input", {
            type: "hidden",
            name: "departdate" + e,
            id: "departdate" + e
        }));
        l.insert(a);
        var h = new Element("td", {
            align: "right"
        });
        h.insert(new Element("input", {
            type: "hidden",
            name: "arrivedate" + e,
            id: "arrivedate" + e
        }));
        l.insert(h);
        var f = new Element("td", {
            align: "right"
        });
        f.insert(new Element("input", {
            type: "hidden",
            name: "uniqueportid" + e,
            id: "uniqueportid" + e
        }));
        l.insert(f);
        $("addtoitineraryrow").insert({
            before: l
        });
        $("itineraryitems").value = e
    }
}

function addtouritineraryline() {
    if ($("itineraryitems")) {
        var f = parseInt($("itineraryitems").value);
        f++;
        var p = new Element("tr", {
            valign: "top"
        });
        var e = new Element("td");
        e.insert(new Element("input", {
            type: "text",
            name: "itinday" + f,
            id: "itinday" + f,
            value: f,
            size: $("itinday1").readAttribute("size"),
            maxlength: $("itinday1").readAttribute("maxlength")
        }));
        p.insert(e);
        var d = new Element("td");
        d.insert(new Element("input", {
            type: "text",
            name: "itinname" + f,
            id: "itinname" + f,
            size: $("itinname1").readAttribute("size"),
            maxlength: $("itinname1").readAttribute("maxlength")
        }));
        p.insert(d);
        var m = new Element("td");
        m.insert(new Element("textarea", {
            name: "itindescription" + f,
            id: "itindescription" + f,
            rows: $("itindescription1").readAttribute("rows"),
            cols: $("itindescription1").readAttribute("cols")
        }));
        p.insert(m);
        var d = new Element("td");
        d.insert(new Element("input", {
            type: "text",
            name: "itinstartcity" + f,
            id: "itinstartcity" + f,
            size: $("itinstartcity1").readAttribute("size"),
            maxlength: $("itinstartcity1").readAttribute("maxlength")
        }));
        p.insert(d);
        var d = new Element("td");
        d.insert(new Element("input", {
            type: "text",
            name: "itinendcity" + f,
            id: "itinendcity" + f,
            size: $("itinendcity1").readAttribute("size"),
            maxlength: $("itinendcity1").readAttribute("maxlength")
        }));
        p.insert(d);
        var o = new Element("td", {
            align: "left"
        });
        o.insert(new Element("select", {
            name: "arrivedate" + f + "-day",
            id: "arrivedate" + f + "-day"
        }));
        o.insert(new Element("select", {
            name: "arrivedate" + f + "-month",
            id: "arrivedate" + f + "-month"
        }));
        o.insert(new Element("select", {
            name: "arrivedate" + f + "-year",
            id: "arrivedate" + f + "-year"
        }));
        o.insert(" &nbsp ");
        o.insert(new Element("select", {
            name: "arrivedate" + f + "-hour",
            id: "arrivedate" + f + "-hour"
        }));
        o.insert(new Element("select", {
            name: "arrivedate" + f + "-minute",
            id: "arrivedate" + f + "-minute"
        }));
        p.insert(o);
        var c = new Element("td", {
            align: "left"
        });
        c.insert(new Element("select", {
            name: "departdate" + f + "-day",
            id: "departdate" + f + "-day"
        }));
        c.insert(new Element("select", {
            name: "departdate" + f + "-month",
            id: "departdate" + f + "-month"
        }));
        c.insert(new Element("select", {
            name: "departdate" + f + "-year",
            id: "departdate" + f + "-year"
        }));
        c.insert(" &nbsp ");
        c.insert(new Element("select", {
            name: "departdate" + f + "-hour",
            id: "departdate" + f + "-hour"
        }));
        c.insert(new Element("select", {
            name: "departdate" + f + "-minute",
            id: "departdate" + f + "-minute"
        }));
        p.insert(c);
        var h = new Element("td", {
            align: "center"
        });
        h.insert(new Element("input", {
            type: "checkbox",
            name: "breakfast" + f,
            value: "1",
            id: "breakfast" + f
        }));
        p.insert(h);
        var a = new Element("td", {
            align: "center"
        });
        a.insert(new Element("input", {
            type: "checkbox",
            name: "lunch" + f,
            value: "1",
            id: "lunch" + f
        }));
        p.insert(a);
        var g = new Element("td", {
            align: "center"
        });
        g.insert(new Element("input", {
            type: "checkbox",
            name: "dinner" + f,
            value: "1",
            id: "dinner" + f
        }));
        p.insert(g);
        var l = new Element("tr", {
            valign: "top"
        });
        var b = new Element("td", {
            colspan: "10"
        });
        b.insert(new Element("textarea", {
            name: "itinterms" + f,
            id: "itinterms" + f,
            rows: $("itinterms1").readAttribute("rows"),
            cols: $("itinterms1").readAttribute("cols")
        }));
        l.insert(b);
        $("addtoitineraryrow").insert({
            before: p
        });
        $("addtoitineraryrow").insert({
            before: l
        });
        ["arrive", "depart"].each(function(q) {
            ["day", "month", "year", "hour", "minute"].each(function(v) {
                var t = q + "date" + (f - 1) + "-" + v;
                var u = document.getElementById(t);
                var s = u.innerHTML;
                var r = q + "date" + f + "-" + v;
                document.getElementById(r).innerHTML = s;
                $(r).value = $("departdate" + (f - 1) + "-" + v).value
            })
        });
        $("itineraryitems").value = f
    }
}

function addtourserviceitineraryline() {
    if ($("itineraryitems")) {
        var g = parseInt($("serviceitineraryitems").value);
        g++;
        var o = new Element("tr", {
            valign: "top"
        });
        var d = new Element("td");
        d.insert(new Element("input", {
            type: "text",
            name: "serviceitinday" + g,
            id: "serviceitinday" + g,
            value: g,
            size: $("serviceitinday1").readAttribute("size"),
            maxlength: $("serviceitinday1").readAttribute("maxlength")
        }));
        o.insert(d);
        var e = new Element("td");
        e.insert(new Element("input", {
            type: "text",
            name: "serviceitinsequence" + g,
            id: "serviceitinsequence" + g,
            value: g,
            size: $("serviceitinsequence1").readAttribute("size"),
            maxlength: $("serviceitinsequence1").readAttribute("maxlength")
        }));
        o.insert(e);
        var c = new Element("td");
        c.insert(new Element("input", {
            type: "text",
            name: "serviceitinname" + g,
            id: "serviceitinname" + g,
            size: $("serviceitinname1").readAttribute("size"),
            maxlength: $("serviceitinname1").readAttribute("maxlength")
        }));
        o.insert(c);
        var m = new Element("td");
        m.insert(new Element("textarea", {
            name: "serviceitindescription" + g,
            id: "serviceitindescription" + g,
            rows: $("serviceitindescription1").readAttribute("rows"),
            cols: $("serviceitindescription1").readAttribute("cols")
        }));
        o.insert(m);
        var f = new Element("td");
        f.insert(new Element("input", {
            type: "text",
            name: "serviceitinregion" + g,
            id: "serviceitinregion" + g,
            size: $("serviceitinregion1").readAttribute("size"),
            maxlength: $("serviceitinregion1").readAttribute("maxlength")
        }));
        o.insert(f);
        var b = new Element("td");
        b.insert(new Element("input", {
            type: "text",
            name: "serviceitintype" + g,
            id: "serviceitintype" + g,
            size: $("serviceitintype1").readAttribute("size"),
            maxlength: $("serviceitintype1").readAttribute("maxlength")
        }));
        o.insert(b);
        var l = new Element("td");
        l.insert(new Element("input", {
            type: "text",
            name: "serviceitinroomtype" + g,
            id: "serviceitinroomtype" + g,
            size: $("serviceitinroomtype1").readAttribute("size"),
            maxlength: $("serviceitinroomtype1").readAttribute("maxlength")
        }));
        o.insert(l);
        var h = new Element("tr", {
            valign: "top"
        });
        var a = new Element("td", {
            colspan: "7"
        });
        a.insert(new Element("textarea", {
            name: "serviceitinterms" + g,
            id: "serviceitinterms" + g,
            rows: $("serviceitinterms1").readAttribute("rows"),
            cols: $("serviceitinterms1").readAttribute("cols")
        }));
        h.insert(a);
        $("addtoserviceitineraryrow").insert({
            before: o
        });
        $("addtoserviceitineraryrow").insert({
            before: h
        });
        $("serviceitineraryitems").value = g
    }
}

function addcruisebreakdownline() {
    if ($("breakdownitems")) {
        var e = parseInt($("breakdownitems").value);
        e++;
        var h = new Element("tr");
        var g = new Element("td");
        g.insert(new Element("input", {
            type: "text",
            name: "bdownquantity" + e,
            id: "bdownquantity" + e,
            value: $("bdownquantity1").readAttribute("value"),
            size: $("bdownquantity1").readAttribute("size"),
            maxlength: $("bdownquantity1").readAttribute("maxlength")
        }));
        h.insert(g);
        var c = new Element("td");
        c.insert(new Element("input", {
            type: "text",
            name: "bdowndescription" + e,
            id: "bdowndescription" + e,
            size: $("bdowndescription1").readAttribute("size"),
            maxlength: $("bdowndescription1").readAttribute("maxlength")
        }));
        h.insert(c);
        var f = new Element("td");
        f.insert(new Element("input", {
            type: "text",
            name: "bdowncategory" + e,
            id: "bdowncategory" + e,
            size: $("bdowncategory1").readAttribute("size"),
            maxlength: $("bdowncategory1").readAttribute("maxlength")
        }));
        h.insert(f);
        var d = new Element("td", {
            align: "right"
        });
        d.insert(new Element("input", {
            type: "text",
            name: "bdownitemcost" + e,
            id: "bdownitemcost" + e,
            value: "0.00",
            size: $("bdownitemcost1").readAttribute("size"),
            maxlength: $("bdownitemcost1").readAttribute("maxlength"),
            style: $("bdownitemcost1").readAttribute("style")
        }));
        h.insert(d);
        var a = new Element("td", {
            align: "right"
        });
        a.insert(new Element("input", {
            type: "text",
            name: "bdowntotalcost" + e,
            id: "bdowntotalcost" + e,
            value: "0.00",
            size: $("bdowntotalcost1").readAttribute("size"),
            maxlength: $("bdowntotalcost1").readAttribute("maxlength"),
            style: $("bdowntotalcost1").readAttribute("style")
        }));
        h.insert(a);
        var b = new Element("td", {
            align: "right"
        });
        b.insert(new Element("input", {
            type: "text",
            name: "bdowncommissionable" + e,
            id: "bdowncommissionable" + e,
            value: "0.00",
            size: $("bdowncommissionable1").readAttribute("size"),
            maxlength: $("bdowncommissionable1").readAttribute("maxlength"),
            style: $("bdowncommissionable1").readAttribute("style")
        }));
        h.insert(b);
        $("addtobreakdownrow").insert({
            before: h
        });
        $("breakdownitems").value = e
    }
}

function addcruisesubitineraryline() {
    if ($("subitinitems")) {
        var c = parseInt($("subitinitems").value);
        c++;
        var e = new Element("tr");
        var d = new Element("td");
        d.insert(new Element("input", {
            type: "text",
            name: "subitinquantity" + c,
            id: "subitinquantity" + c,
            value: $("subitinquantity1").readAttribute("value"),
            size: $("subitinquantity1").readAttribute("size"),
            maxlength: $("subitinquantity1").readAttribute("maxlength")
        }));
        e.insert(d);
        var a = new Element("td");
        a.insert(new Element("input", {
            type: "text",
            name: "subitinitem" + c,
            id: "subitinitem" + c,
            size: $("subitinitem1").readAttribute("size"),
            maxlength: $("subitinitem1").readAttribute("maxlength")
        }));
        e.insert(a);
        var b = new Element("td", {
            align: "right"
        });
        b.insert(new Element("input", {
            type: "text",
            name: "subitinprice" + c,
            id: "subitinprice" + c,
            value: "0.00",
            size: $("subitinprice1").readAttribute("size"),
            maxlength: $("subitinprice1").readAttribute("maxlength"),
            style: $("subitinprice1").readAttribute("style")
        }));
        e.insert(b);
        $("addtosubbreakdownrow").insert({
            before: e
        });
        $("subitinitems").value = c
    }
}

function cheapestcruiseprice(c, b, a) {
    var d = {};
    d.sessionkey = c;
    d.chosencruise = b;
    d.ctcid = a;
    new Ajax.Request("/fusion/cheapestcruiseprice.pl", {
        parameters: d,
        evalJSON: true,
        onSuccess: function(f) {
            var e = f.responseJSON;
            $("cheapestcruiseprice").update(e.cheapestblock);
            $("cheapestcruiseprice").innerHTML
        }
    })
}

function addpassenger(b) {
    var d = {};
    d.sessionkey = b;
    d.action = "validate";
    var c = /passenger/;
    for (i = 0; i < document.bookingform.elements.length; i++) {
        var a = document.bookingform.elements[i].name;
        if (a.match(c)) {
            if (a === "passengers-element") {
                if (d[a] === undefined) {
                    d[a] = []
                }
                if (document.bookingform.elements[i].checked === true) {
                    d[a].push(document.bookingform.elements[i].value)
                }
            } else {
                if (a.match(/specialservice/)) {
                    d[a] = document.bookingform.elements[i].value;
                    if (a.match(/-date-/) || a.match(/-year-/) || a.match(/-details-/)) {
                        if (d[a] === undefined) {
                            d[a] = ""
                        }
                    } else {
                        if (document.bookingform.elements[i].checked === false) {
                            d[a] = ""
                        }
                    }
                } else {
                    d[a] = document.bookingform.elements[i].value;
                    if (d[a] === undefined) {
                        d[a] = ""
                    }
                }
            }
        }
    }
    new Ajax.Request("/fusion/ajaxbookingform.pl", {
        parameters: d,
        evalJSON: true,
        onSuccess: function(h) {
            var e = h.responseJSON;
            if (e.success == "1") {
                clearpassenger(1);
                updatepassengerlist(b);
                checkpassengeramount(e.paxcount, e.allpassengersassigned);
                $("paxbutton").value = e.buttontext;
                $("errorlist").style.display = "none"
            } else {
                if (e.success == "0") {
                    var f;
                    for (var g = 0; g < e.errors.length; g++) {
                        if (f == undefined) {
                            f = "<li>" + e.errors[g] + "</li>"
                        } else {
                            f = f + "<li>" + e.errors[g] + "</li>"
                        }
                    }
                    $("errorlist").style.display = "block";
                    $("errorlist").update(f);
                    $("errorlist").innerHTML
                }
            }
            $("paxbutton").enable()
        },
        onFailure: function(e) {
            $("paxbutton").enable()
        }
    });
    $("paxbutton").disable()
}

function updatepassengerlist(a) {
    var b = {};
    b.sessionkey = a;
    b.action = "drawpax";
    new Ajax.Request("/fusion/ajaxbookingform.pl", {
        parameters: b,
        evalJSON: true,
        onSuccess: function(d) {
            var c = d.responseJSON;
            if ($("paxlist")) {
                $("paxlist").update(c.passengerlist)
            }
            if ($("elementlist")) {
                $("elementlist").update(c.elementlist)
            }
            fillpassenger(c.passenger);
            checkelementpassengers(c.allpassengersassigned, c.buttontext)
        }
    })
}

function retrievecompanion(a, c) {
    var b = {};
    b.action = "retrievecompanion";
    b.sessionkey = a;
    b.cid = c;
    new Ajax.Request("/fusion/ajaxbookingform.pl", {
        parameters: b,
        evalJSON: true,
        onSuccess: function(g) {
            var d = g.responseJSON;
            if (d.success == "1") {
                clearpassenger(0);
                fillpassenger(d.passenger);
                $("paxbutton").disabled = false;
                $("paxbutton").value = d.buttontext;
                $("errorlist").style.display = "none"
            } else {
                if (d.success == "0") {
                    var e;
                    for (var f = 0; f < d.errors.length; f++) {
                        if (e == undefined) {
                            e = "<li>" + d.errors[f] + "</li>"
                        } else {
                            e = e + "<li>" + d.errors[f] + "</li>"
                        }
                    }
                    $("errorlist").style.display = "block";
                    $("errorlist").update(e)
                }
            }
        }
    })
}

function retrievepassenger(a, c) {
    var b = {};
    b.action = "retrievepassenger";
    b.sessionkey = a;
    b.paxno = c;
    new Ajax.Request("/fusion/ajaxbookingform.pl", {
        parameters: b,
        evalJSON: true,
        onSuccess: function(g) {
            var d = g.responseJSON;
            if (d.success == "1") {
                clearpassenger(0);
                fillpassenger(d.passenger);
                if (d.fieldstodisable != undefined) {
                    disablepassengerfields(d.fieldstodisable)
                }
                $("paxbutton").disabled = false;
                $("paxbutton").value = d.buttontext;
                $("errorlist").style.display = "none"
            } else {
                if (d.success == "0") {
                    var e;
                    for (var f = 0; f < d.errors.length; f++) {
                        if (e == undefined) {
                            e = "<li>" + d.errors[f] + "</li>"
                        } else {
                            e = e + "<li>" + d.errors[f] + "</li>"
                        }
                    }
                    $("errorlist").style.display = "block";
                    $("errorlist").update(e)
                }
            }
        }
    })
}

function fillpassenger(a) {
    var b = $H(a);
    b.each(function(d) {
        if ($(d.key)) {
            if ($(d.key).hasClassName("elebox") || $(d.key).hasClassName("ssbox")) {
                $(d.key).checked = true
            } else {
                if ($(d.key).value !== undefined) {
                    $(d.key).value = d.value;
                    $(d.key).enable();
                    var c;
                    if (typeof(Event) === "function") {
                        var c = new Event("change")
                    } else {
                        var c = document.createEvent("HTMLEvents");
                        c.initEvent("change", false, true)
                    }
                    $(d.key).dispatchEvent(c)
                }
            }
        }
    })
}

function checkpassengeramount(a, b) {
    if ($("continuebutton")) {
        $("continuebutton").disabled = true;
        if ($("minpax").value <= a && b == "1") {
            $("continuebutton").disabled = false
        }
    }
}

function clearpassenger(e) {
    var c = $H({
        "passengers-title": 1,
        "passengers-firstname": 1,
        "passengers-lastname": 1,
        "passengers-middlename": 1,
        "passengers-dobday": 1,
        "passengers-dobmonth": 1,
        "passengers-dobyear": 1,
        "passengers-passport": 1,
        "passengers-passportauthority": 1,
        "passengers-passstartday": 1,
        "passengers-passstartmonth": 1,
        "passengers-passstartyear": 1,
        "passengers-passexpiryday": 1,
        "passengers-passexpirymonth": 1,
        "passengers-passexpiryyear": 1,
        "passengers-placeofbirth": 1,
        "passengers-paxno": 1,
        "passengers-redress": 1,
        "passengers-insurancecompany": 1,
        "passengers-insurancepolicynumber": 1,
        "passengers-insurancetelnumber": 1,
        "passengers-nokname": 1,
        "passengers-nokphone": 1,
        "passengers-nokrelationship": 1,
        "passengers-nokaddress1": 1,
        "passengers-nokaddress2": 1,
        "passengers-nokaddress3": 1,
        "passengers-nokaddress4": 1,
        "passengers-insuranceassistancecompany": 1,
    });
    var d = /passengers/;
    var g = /rewards/;
    for (i = 0; i < document.bookingform.elements.length; i++) {
        var a = document.bookingform.elements[i].name;
        if (a.match(d)) {
            document.bookingform.elements[i].disabled = false;
            if (a == "passengers-element") {
                document.bookingform.elements[i].checked = false
            } else {
                if (c.get(a) == 1) {
                    var b = document.bookingform.elements[i];
                    b.value = "";
                    if (typeof jQuery === "function" && jQuery(b).hasClass("nx-select")) {
                        jQuery(b).trigger("change")
                    }
                } else {
                    if (a.match(g)) {
                        if (e) {
                            var f = {};
                            f.action = "getpastpassengernumber";
                            f.fieldname = a;
                            f.sessionkey = document.getElementsByName("sessionkey")[0].value;
                            new Ajax.Request("/fusion/ajaxbookingform.pl", {
                                method: "POST",
                                parameters: f,
                                evalJSON: true,
                                onSuccess: function(l) {
                                    var h = l.responseJSON;
                                    if (!h.success) {
                                        document.getElementsByName(h.fieldname)[0].value = ""
                                    } else {
                                        document.getElementsByName(h.fieldname)[0].value = h.pastpassengerno
                                    }
                                }
                            })
                        } else {
                            document.bookingform.elements[i].value = ""
                        }
                    } else {
                        if (a.match(/specialservice/)) {
                            document.bookingform.elements[i].checked = false;
                            if (a.match(/-date-/) || a.match(/-year-/) || a.match(/-details-/)) {
                                if (a.match(/-details-/)) {
                                    document.bookingform.elements[i].value = ""
                                }
                                document.bookingform.elements[i].disabled = true
                            }
                        }
                    }
                }
            }
        }
    }
    changedfields = {}
}

function checkelementpassengers(b, a) {
    if ($("paxbutton")) {
        if (b == "1") {
            $("paxbutton").value = a;
            $("paxbutton").disabled = true
        }
    }
}

function showgender(a) {
    if ($("genderspan")) {
        if (a == "Inf" || a == "Dr") {
            $("genderspan").show()
        } else {
            $("genderspan").hide();
            if (a == "Mr" || a == "Mstr") {
                $("gender").value = "M"
            } else {
                $("gender").value = "F"
            }
        }
    }
}

function disablepassengerfields(a) {
    a.each(function(b) {
        if ($(b)) {
            $(b).disabled = true
        }
    })
}

function updateccamount(a) {
    if ($("amount")) {
        $("amount").value = a
    }
    if ($("giftcardamount")) {
        $("giftcardamount").value = a
    }
}

function setavailableondepositflags() {
    var b = document.getElementsByName("depositoption");
    if (b && !(typeof availableondepositflags === "undefined" || availableondepositflags === null)) {
        for (i = 0; i < availableondepositflags.length; i++) {
            var a = document.getElementsByName(availableondepositflags[i]);
            if (a) {
                for (j = 0; j < b.length; j++) {
                    if (b[j].type == "radio") {
                        a[j].checked = b[j].checked
                    }
                }
            }
        }
    }
}

function updatestagedpaymentschedule() {
    var d = document.getElementById("stagedpaymentschedule");
    var o = document.getElementById("creditcard-instalments");
    if (!d || !o) {
        return
    }
    var l = o.selectedIndex + 1;
    var h = Number($("totalamount").value);
    if (!isNaN(h)) {
        h = parseFloat(h)
    }
    var f = document.getElementById("chargeprice");
    if (f) {
        var a = Number(f.innerHTML);
        if (!isNaN(a)) {
            h = parseFloat(a)
        }
    }
    if (!isNaN(h) && h > 0 && d && l > 1) {
        var c = (h / l);
        c = properrounding(c, 2);
        for (i = 1; i <= 12; i++) {
            var e = document.getElementById("stagepayment" + i + "-amount");
            var m = document.getElementById("stagepaymentrow" + i);
            if (e && m) {
                if (i < l) {
                    e.update(c);
                    m.show()
                } else {
                    if (i == l) {
                        c = parseFloat(c.replace(",", ""));
                        var b = c * (l - 1);
                        var g = (h - b);
                        e.update(properrounding(g, 2));
                        m.show()
                    } else {
                        e.update("");
                        m.hide()
                    }
                }
            }
        }
        d.style.display = "block"
    } else {
        if (d) {
            d.style.display = "none"
        }
    }
}

function anytimecardcharges(l, m, b) {
    var d = 0;
    var a = 0;
    if (l !== undefined) {
        d = parseFloat(l)
    } else {
        var e = Number($("totalamount").value);
        if (!isNaN(e)) {
            d = parseFloat(e)
        } else {
            $("totalamount").value = ""
        }
    }
    if (m != undefined) {
        a = parseFloat(m)
    }
    var o = 0;
    var c = 0;
    var h = 0;
    if (b && (b.id === "overridecardcharge") && ($("overridecardcharge").value !== undefined)) {
        h = 1;
        o = $("overridecardcharge").value
    }
    if (h === 0 || h === undefined) {
        var g = $("cardtype").value;
        if (g !== "") {
            if (cardcharges[g].chargetype == "percentage") {
                o = ((d / 100) * cardcharges[g].chargevalue);
                if (a !== 0) {
                    c = ((a / 100) * cardcharges[g].chargevalue)
                }
            } else {
                o = cardcharges[g].chargevalue;
                if (a !== 0) {
                    c = o
                }
            }
            d += parseFloat(o);
            if (a !== 0) {
                a += parseFloat(c)
            }
        }
    } else {
        d += parseFloat(o)
    }
    if (d === "" || isNaN(d)) {
        d = 0
    }
    if (l !== undefined) {
        $("totalprice").update(properrounding(d, 2));
        if ($("totalpriceinfo")) {
            $("totalpriceinfo").update(properrounding(d, 2))
        }
        if ($("depositprice")) {
            $("depositprice").update(properrounding(a, 2));
            updateccpricetext()
        }
        if ($("cardcharge") && o !== 0) {
            $("cardcharge").update(properrounding(o, 2))
        }
        if ($("depositcardcharge") && c !== 0) {
            $("depositcardcharge").update(properrounding(c, 2))
        }
        if ($("overridecardcharge") && o !== 0 && (h === 0 || h === undefined)) {
            $("overridecardcharge").update(properrounding(o, 2))
        }
    } else {
        $("chargeprice").update(properrounding(d, 2));
        if ($("overridecardcharge") && (h === 0 || h === undefined)) {
            $("overridecardcharge").value = properrounding(o, 2)
        }
        if ($("overridecardcharge") && (h !== 0 || h !== undefined)) {
            var f = /^[0-9,]+\.[0-9][0-9][0-9]*$/;
            if (f.test(o) == true) {
                $("overridecardcharge").value = properrounding(o, 2)
            }
        }
    }
    if ($("cardtype").value == "") {
        if ($("depositcardcharge")) {
            $("depositcardcharge").style.display = "none"
        }
        if ($("cardcharge")) {
            $("cardcharge").style.display = "none"
        }
    } else {
        if ($("depositoptionon") && $("depositoptionon").checked == true) {
            if ($("depositcardcharge")) {
                $("depositcardcharge").style.display = "block"
            }
            if ($("cardcharge")) {
                $("cardcharge").style.display = "none";
                $("cardcharge").value = ""
            }
        } else {
            if ($("depositcardcharge")) {
                $("depositcardcharge").style.display = "none";
                $("depositcardcharge").value = ""
            }
            if ($("cardcharge")) {
                $("cardcharge").style.display = "block"
            }
        }
    }
}

function updateccpricetext() {
    if ($("depositoptionon")) {
        var a = document.getElementById("pricetext").parentNode;
        if ($("depositoptionon").checked == true) {
            $("pricetext").update($("depositprice").innerHTML);
            var b = a.innerHTML;
            b = b.replace("Full Payment", "Deposit Payment");
            a.innerHTML = b
        } else {
            if ($("depositoptionoff").checked == true) {
                $("pricetext").update($("totalprice").innerHTML);
                var b = a.innerHTML;
                b = b.replace("Deposit Payment", "Full Payment");
                a.innerHTML = b
            }
        }
    }
}

function UpdateExchangeRateFilers(a) {
    var b = parseInt(a.value);
    if (b == 1) {
        $("parentsite").disabled = true;
        $("sitename").disabled = true;
        $("branchid").disabled = true
    } else {
        if (b == 2) {
            $("parentsite").disabled = false;
            $("sitename").disabled = true;
            $("branchid").disabled = true
        } else {
            if (b == 3) {
                $("parentsite").disabled = true;
                $("sitename").disabled = false;
                $("branchid").disabled = true
            } else {
                if (b == 4) {
                    $("parentsite").disabled = false;
                    $("sitename").disabled = true;
                    if ($("branchid").options.length > 1) {
                        $("branchid").disabled = false
                    }
                    FindParentsiteBranches($("parentsite").value, "branchid")
                }
            }
        }
    }
    return
}

function FindParentsiteBranches(a, b) {
    var d = parseInt($("level").value);
    $(b).disabled = true;
    showspinner();
    if (a && b && d == 4) {
        emptyList($(b), 0);
        var c = new Ajax.Request("/system/exchangerates.pl?action=getbranches&parentsite=" + a, {
            method: "get",
            evalJS: "false",
            onSuccess: function(l) {
                var g = l.responseText;
                var f = g.split(":");
                $(b).options[0] = new Option("", "");
                for (var h = 0; h < f.length; h++) {
                    var e = f[h].split("|");
                    if (e[1]) {
                        $(b).options[h + 1] = new Option(e[1], e[0])
                    }
                }
                if (f.length > 1) {
                    $(b).disabled = false
                }
            }
        })
    }
    if ($("spinner")) {
        $("spinner").hide()
    }
    return
}
var ajaxselectedtransfer;

function choosetransferajax(e, c, b) {
    $("itinerarycontinuebutton").hide();
    $("itinerarycontinuebuttonnone").show();
    var f = new Date();
    var a = f.getTime();
    if (e == "") {
        new Ajax.Request("/fusion/removefromitinerary.pl", {
            method: "GET",
            parameters: {
                sessionkey: c,
                itemtype: "transfer",
                item: b,
                ajaxmode: "1",
                cache: a
            },
            onSuccess: function(g) {
                var d = g.responseJSON;
                if (d.failure) {
                    alert("There was a problem removing your transfer from the basket. Please try again.");
                    $$("input[type=radio][name='selectedtransfer'][value='" + e + "']")[0].checked = false;
                    $$("input[type=radio][name='selectedtransfer'][value='" + ajaxselectedtransfer + "']")[0].checked = true;
                    $("itinerarycontinuebutton").show();
                    $("itinerarycontinuebuttonnone").hide();
                    return false
                } else {
                    ajaxselectedtransfer = e;
                    choosetransferajax_updateitinerary(c);
                    return true
                }
            }
        })
    } else {
        new Ajax.Request("/fusion/choosetransfer.pl", {
            method: "GET",
            parameters: {
                sessionkey: c,
                resultno: e,
                ajaxmode: "1",
                cache: a
            },
            onSuccess: function(g) {
                var d = g.responseJSON;
                if (d.failure) {
                    alert("There was a problem adding your selected transfer to the basket. Please try again.");
                    $$("input[type=radio][name='selectedtransfer'][value='" + e + "']")[0].checked = false;
                    $$("input[type=radio][name='selectedtransfer'][value='" + ajaxselectedtransfer + "']")[0].checked = true;
                    $("itinerarycontinuebutton").show();
                    $("itinerarycontinuebuttonnone").hide();
                    return false
                } else {
                    ajaxselectedtransfer = e;
                    choosetransferajax_updateitinerary(c);
                    return true
                }
            }
        })
    }
}

function choosetransferajax_updateitinerary(b) {
    var c = new Date();
    var a = c.getTime();
    new Ajax.Request("/fusion/itineraryinsert.pl", {
        method: "GET",
        parameters: {
            sessionkey: b,
            cache: a
        },
        onSuccess: function(d) {
            $("itineraryside").innerHTML = d.responseText;
            $("itinerarycontinuebutton").show();
            $("itinerarycontinuebuttonnone").hide();
            copyidcontents("totalprice", "totalpricerg");
            copyidcontents("totalpricepp", "totalpricepprg")
        }
    })
}

function copyidcontents(b, a) {
    $(a).innerHTML = $(b).innerHTML
}

function properrounding(f, c, h, e) {
    f = (f + "").replace(/[^0-9+\-Ee.]/g, "");
    var b = !isFinite(+f) ? 0 : +f,
        a = !isFinite(+c) ? 0 : Math.abs(c),
        m = (typeof e === "undefined") ? "," : e,
        d = (typeof h === "undefined") ? "." : h,
        l = "",
        g = function(q, p) {
            var o = Math.pow(10, p);
            return "" + Math.round(q * o) / o
        };
    l = (a ? g(b, a) : "" + Math.round(b)).split(".");
    if (l[0].length > 3) {
        l[0] = l[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, m)
    }
    if ((l[1] || "").length < a) {
        l[1] = l[1] || "";
        l[1] += new Array(a - l[1].length + 1).join("0")
    }
    return l.join(d)
}

function updatecheapestdateprice(e, c, d, g, b, f, a) {
    $(e).update("wait...");
    var h = {};
    h.sessionkey = d;
    h.hotelsearchno = g;
    h.flightsearchno = b;
    h.type = f;
    h.date = c;
    h.modifier = a;
    new Ajax.Request("/fusion/cheapestdateprice.pl", {
        method: "GET",
        parameters: h,
        onSuccess: function(m) {
            var l = m.responseJSON;
            $(e).update(l.result)
        }
    })
}

function populatefromcontact(b) {
    var a = $H({
        contacttitle: "paxtitle",
        contactfirstname: "paxfirstname",
        contactlastname: "paxlastname",
        contactaddress1: "paxaddress",
        contactcity: "paxcity",
        contactpostcode: "paxpostcode",
        contacttelephone: "paxtelephone"
    });
    a.each(function(d) {
        var c = d.value + "-" + b;
        if ($(d.key) && $(c)) {
            if ($(d.key).value != "") {
                $(c).value = $(d.key).value;
                if (d.key == "contactaddress1") {
                    if ($("paxaddressstring-" + b)) {
                        $("paxaddressstring-" + b).update($(d.key).value)
                    }
                }
            }
        }
    })
}

function updateaddressstring(b, a) {
    if ($("paxaddressstring-" + b)) {
        $("paxaddressstring-" + b).update(a)
    }
}

function quicksearch_formsetup() {
    var a = new Date();
    $("nights").value = 7;
    $("depdate-day").value = a.getDate();
    $("depdate-monthyear").value = a.getFullYear() + "-" + ("0" + (a.getMonth() + 1)).slice(-2);
    $("quicksearchform").observe("submit", function() {
        setcookie("quicksearchcriteria", $("quicksearchform").serialize())
    });
    quicksearch_updateday();
    var b = readcookie("quicksearchcriteria");
    if (b !== "") {
        unserialize($("quicksearchform"), unescape(b))
    }
}

function unserialize(a, b) {
    if (!(a = $(a))) {
        return
    }
    b = Object.isString(b) ? b.toQueryParams() : b;
    a.getElements().each(function(d) {
        for (var c in b) {
            if (c == d.name) {
                d.setValue(b[c])
            }
        }
    });
    return
}

function findlocation(b) {
    var a = {};
    a.location = b;
    new Ajax.Request("/public/findlocations.pl", {
        method: "GET",
        parameters: a,
        evalJSON: true,
        onSuccess: function(c) {
            var d = c.responseJSON;
            if (d.found == 1) {
                var f = d.locations[0];
                createmarker(map, f.lat, f.lon, f.name, "", "", "", "", "", 1);
                var e = $("visitedplaces").select("div:first");
                if (e) {
                    $("visitedplaces").insert({
                        bottom: f.html
                    })
                }
            } else {
                if (d.found > 1) {
                    myLightWindow.activateWindow({
                        href: "/public/findlocations.pl?action=selector&location=" + b,
                        title: "Multiple Destinations Found",
                        type: "external",
                        width: 800,
                        height: 500,
                        loadingAnimation: "false"
                    })
                } else {
                    alert("No location found matching '" + b + "'")
                }
            }
        }
    })
}

function selectlocation(a) {
    var b = {};
    b.location = a;
    new Ajax.Request("/public/findlocations.pl", {
        method: "GET",
        parameters: b,
        evalJSON: true,
        onSuccess: function(c) {
            var d = c.responseJSON;
            if (d.found == 1) {
                var f = d.locations[0];
                parent.setparentmarker(f);
                var e = parent.$("visitedplaces").select("div:first");
                if (e) {
                    parent.$("visitedplaces").insert({
                        bottom: f.html
                    })
                }
            }
            parent.myLightWindow.deactivate()
        }
    })
}

function removelocation(a) {
    var b = {};
    b.location = a;
    b.action = "remove";
    new Ajax.Request("/public/findlocations.pl", {
        method: "GET",
        parameters: b,
        evalJSON: true,
        onSuccess: function(c) {
            var e = c.responseJSON;
            if (e.success == 1) {
                $("location-" + a).hide();
                if (mapmarkers) {
                    for (i in mapmarkers) {
                        var d = parseFloat(mapmarkers[i].position.lat()).toFixed(5);
                        var f = parseFloat(mapmarkers[i].position.lng()).toFixed(5);
                        var g = parseFloat(e.lat).toFixed(5);
                        var h = parseFloat(e.lon).toFixed(5);
                        if (d == g && f == h) {
                            mapmarkers[i].setMap(null)
                        }
                    }
                }
            }
        }
    })
}

function setparentmarker(a) {
    if (a) {
        createmarker(map, a.lat, a.lon, a.name, "", "", "", "", "", 1)
    }
}

function quicksearch_updateday() {
    var f = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    var l = $("depdate-day").getValue();
    var b = $("depdate-monthyear").getValue();
    if (b) {
        var d = b.split("-");
        var g = l + " " + f[parseInt(d[1]) - 1] + " " + d[0];
        var c = new Date(g);
        var h = c.getDay();
        var e = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
        var a = e[h];
        if ($("dayname")) {
            $("dayname").innerHTML = a
        }
    }
}

function getfarecodeprices(c, g, d, e, f, h, a) {
    var l = '<img src="/images/longspinner.gif" style="width: 16px; height: 11px;" class="leadprice-spinner-' + h + '">';
    var m = '<img src="/images/longspinner.gif" style="width: 16px; height: 11px;" class="leadprice-spinner-' + h + '">';
    $$(".leadprice-" + h).each(function(o) {
        o.update(l)
    });
    $$(".gradeprice-" + h).each(function(o) {
        o.update(m)
    });
    $$(".breakdownlink-" + h).each(function(o) {
        o.replace("")
    });
    $$(".experiencelink-" + h).each(function(o) {
        o.replace("")
    });
    $$(".bestprice").invoke("removeClassName", "bestprice");
    var b = {};
    b.sessionkey = c;
    b.searchno = g;
    b.codetocruiseid = d;
    b.chosencruise = e;
    b.farecode = f;
    b.columnno = h;
    b.depair = a;
    new Ajax.Request("/fusion/getcruisefarecodeprices.pl", {
        parameters: b,
        evalJSON: true,
        onSuccess: function(B) {
            var C = B.responseJSON;
            if (C.success == "Y") {
                try {
                    var y = {};
                    var x = ".fareheading-" + h + " a";
                    $$(x).each(function(t) {
                        t.update(C.farecode);
                        t.title = C.farecodename
                    });
                    for (var A in C.prices) {
                        var z = A + "-link";
                        var s = C.prices[A].symbol + C.prices[A].price;
                        var p = C.prices[A].url;
                        var q = C.prices[A].breakdown;
                        var v = C.prices[A].experience;
                        var r = C.prices[A].highlighted;
                        if (typeof q == "undefined") {
                            q = ""
                        }
                        if (typeof v === "undefined") {
                            v = ""
                        }
                        if ($(z)) {
                            if (C.prices[A].price > 0) {
                                if (C.cabinupgrade == "Y") {
                                    $($(z).parentNode).replace('<b><a href="' + p + '" id="' + z + '" class="lightwindow gradeprice-' + h + '" params="lightwindow_type=external,lightwindow_width=800,lightwindow_height=500,lightwindow_loading_animation=false">' + s + "</a>" + q + v + "</b>")
                                } else {
                                    $($(z).parentNode).replace('<b><a href="' + p + '" id="' + z + '" class="gradeprice-' + h + '">' + s + "</a>" + q + v + "</b>")
                                }
                                if (r === 1) {
                                    $($(z).up("td")).style.backgroundColor = "#afa"
                                }
                            } else {
                                $($(z).parentNode).replace('<b><span id="' + z + '" class=gradeprice-' + h + '">X</span></b>')
                            }
                        }
                        if (C.prices[A].cheapest == "Y") {
                            var o = C.prices[A].cabingroup + "-" + h;
                            var u = "leadbreak-" + o;
                            if ($(o)) {
                                if (C.prices[A].price > 0) {
                                    if (C.cabinupgrade == "Y") {
                                        $($(o).parentNode).replace('<b><a href="' + p + '" id="' + C.prices[A].cabingroup + "-" + h + '" class="lightwindow leadprice-' + h + '" params="lightwindow_type=external,lightwindow_width=800,lightwindow_height=500,lightwindow_loading_animation=false">' + s + "</a>" + q + v + "</b>")
                                    } else {
                                        $($(o).parentNode).replace('<b><a href="' + p + '" id="' + C.prices[A].cabingroup + "-" + h + '" class="leadprice-' + h + '">' + s + "</a>" + q + v + "</b>")
                                    }
                                    if (r === 1) {
                                        $($(o).up("td")).style.backgroundColor = "#afa";
                                        $($(o).up("td")).select("a").each(function(t) {
                                            t.style.color = "#00f"
                                        })
                                    }
                                }
                            }
                        }
                    }
                    $$(".leadprice-spinner-" + h).each(function(D) {
                        var t = D.parentNode;
                        if (t) {
                            t.replace('<span id="' + t.id + '" class="leadprice-' + h + '">X</span>')
                        }
                    });
                    $$(".gradeprice-spinner-" + h).each(function(D) {
                        var t = D.parentNode;
                        if (t) {
                            t.replace('<span id="' + t.id + '" class="gradeprice-' + h + '">X</span>')
                        }
                    });
                    if ($("fareinfo-" + h) !== null) {
                        $("fareinfo-" + h).title = C.farecodename
                    }
                    if ($("fareinfoa-" + h) !== null) {
                        $("fareinfoa-" + h).title = C.farecodename;
                        $("fareinfoa-" + h).href = $("fareinfoa-" + h).href.replace(/farecode=.*?[&|$]/, "farecode=" + C.farecode + "&")
                    }
                    hiliteBestPriceCabins();
                    myLightWindow._setupLinks()
                } catch (w) {}
            } else {
                try {
                    $$(".leadprice-" + h).each(function(D) {
                        var t = D.parentNode;
                        t.replace('<b><span id="' + D.id + '" class="leadprice-' + h + '">X</span></b>')
                    });
                    $$(".gradeprice-" + h).each(function(D) {
                        var t = D.parentNode;
                        t.replace('<b><span id="' + D.id + '" class="gradeprice-' + h + '">X</span></b>')
                    });
                    if ($("fareinfoa-" + h)) {
                        $("fareinfoa-" + h).title = "";
                        $("fareinfoa-" + h).href = $("fareinfoa-" + h).href.replace(/farecode=.*?[&|$]/, "farecode= &")
                    }
                    hiliteBestPriceCabins();
                    myLightWindow._setupLinks()
                } catch (w) {}
            }
        },
        onError: function(o) {
            alert("Could not update pricing")
        }
    })
}

function idealtextcolour(a) {
    var b = 105;
    var d = getrgbcomponents(a);
    var c = (d.R * 0.299) + (d.G * 0.587) + (d.B * 0.114);
    return ((255 - c) < b) ? "#000000" : "#ffffff"
}

function getrgbcomponents(c) {
    var e = c.substring(1, 3);
    var d = c.substring(3, 5);
    var a = c.substring(5, 7);
    return {
        R: parseInt(e, 16),
        G: parseInt(d, 16),
        B: parseInt(a, 16)
    }
}

function updatetransactions(a) {
    var b = {};
    b.action = "gettransactions";
    b.sessionkey = a;
    new Ajax.Request("/fusion/ajaxbookingform.pl", {
        parameters: b,
        evalJSON: true,
        onSuccess: function(d) {
            var c = d.responseJSON;
            if ($("enquirytransactions")) {
                $("enquirytransactions").update(c.translist);
                $("enquirytransactions").show()
            }
        }
    })
}

function getbranchaddress(b, a) {
    var c = {};
    c.action = "getbranchaddress";
    c.sessionkey = b;
    c.brid = a;
    new Ajax.Request("/fusion/ajaxbookingform.pl", {
        parameters: c,
        evalJSON: true,
        onSuccess: function(g) {
            var d = g.responseJSON;
            if (d.success == "1") {
                fillbranch(d.branch);
                $("errorlist").style.display = "none"
            } else {
                if (d.success == "0") {
                    var e;
                    for (var f = 0; f < d.errors.length; f++) {
                        if (e == undefined) {
                            e = "<li>" + d.errors[f] + "</li>"
                        } else {
                            e = e + "<li>" + d.errors[f] + "</li>"
                        }
                    }
                    $("errorlist").style.display = "block";
                    $("errorlist").update(e)
                }
            }
        }
    })
}

function fillbranch(c) {
    var a = $H(c);
    a.each(function(d) {
        var b = "contact" + d.key;
        if ($(b)) {
            $(b).value = d.value
        }
    })
}

function setupbookingvalidation() {
    document.monitor = new Array();
    $$(".v").each(function(c) {
        var b = $w(c.className);
        for (var d = 0; d < b.length; d++) {
            if (b[d].match(/^v_/)) {
                var a = b[d].split(/_/);
                if (a[1] && a[2]) {
                    c.insert({
                        after: '<span id="errorstatus_' + a[1] + "_" + a[2] + '"></span>'
                    });
                    document.monitor[c.name] = c.value
                }
            }
        }
    });
    $$(".vg").each(function(d) {
        var b = $w(d.className);
        var c;
        var e;
        for (var f = 0; f < b.length; f++) {
            if (b[f].match(/^v_/)) {
                var a = b[f].split(/_/);
                c = a[1];
                e = a[2]
            }
        }
        if (c && e) {
            for (var f = 0; f < b.length; f++) {
                if (b[f].match(/^vg_/)) {
                    var a = b[f].split(/_/);
                    if (a[1]) {
                        document.monitor[d.name] = d.value
                    }
                }
            }
        }
    });
    setTimeout(function() {
        monitorbookingfields()
    }, 1000)
}

function monitorbookingfields() {
    $$(".v").each(function(c) {
        var b = $w(c.className);
        for (var d = 0; d < b.length; d++) {
            if (b[d].match(/^v_/)) {
                var a = b[d].split(/_/);
                if (a[1] && a[2]) {
                    if (document.monitor[c.name] !== c.value && document.activeElement.name !== c.name) {
                        document.monitor[c.name] = c.value;
                        $("errorstatus_" + a[1] + "_" + a[2]).innerHTML = '<img src="/images/longspinner.gif" style="margin-left: 5px;">';
                        validatebookingfield(a[1], a[2], $F(c))
                    }
                }
            }
        }
    });
    $$(".vg").each(function(e) {
        var c = $w(e.className);
        var d;
        var f;
        for (var g = 0; g < c.length; g++) {
            if (c[g].match(/^v_/)) {
                var b = c[g].split(/_/);
                d = b[1];
                f = b[2]
            }
        }
        if (d && f) {
            for (var g = 0; g < c.length; g++) {
                if (c[g].match(/^vg_/)) {
                    var b = c[g].split(/_/);
                    if (b[1]) {
                        if (document.monitor[e.name] !== e.value && document.activeElement.name !== e.name) {
                            document.monitor[e.name] = e.value;
                            $("errorstatus_" + b[1]).innerHTML = '<img src="/images/longspinner.gif" style="margin-left: 5px;">';
                            var a = {};
                            $$(".vg_" + b[1]).each(function(h) {
                                a[h.name] = $F(h)
                            });
                            validatebookingfield(d, null, null, a, "errorstatus_" + b[1])
                        }
                    }
                }
            }
        }
    });
    setTimeout(function() {
        monitorbookingfields()
    }, 1000)
}

function validatebookingfield(c, e, d, b, g) {
    var f = {};
    var a = $$("form");
    f.action = "validatesinglefield";
    f.type = c;
    f.field = e;
    f.value = d;
    f.serial = Object.toJSON(a[0].serialize(true));
    f.values = Object.toJSON(b);
    new Ajax.Request("/fusion/ajaxbookingform.pl", {
        method: "POST",
        parameters: f,
        evalJSON: true,
        onSuccess: function(l) {
            var h = l.responseJSON;
            if (!g) {
                g = "errorstatus_" + c + "_" + e
            }
            if (!h.success) {
                $(g).innerHTML = '<img src="/images/www.bookings.co-operativetravel.co.uk/cross.png" width="18" height="18" alt="cross" style="margin-left: 5px; margin-bottom: -5px">'
            } else {
                $(g).innerHTML = '<img src="/images/www.bookings.co-operativetravel.co.uk/tick.png" width="18" height="18" alt="cross" style="margin-left: 5px; margin-bottom: -5px">'
            }
        }
    })
}

function toggleenquirysearch(a) {
    if (a === "customer") {
        setcookie("enquirysearch", "0");
        $$(".customersearch").each(function(b) {
            b.show()
        });
        $$(".enquirysearch").each(function(b) {
            b.hide()
        });
        $$(".searchtype-customer").each(function(b) {
            b.checked = true
        })
    } else {
        if (a === "enquiry") {
            setcookie("enquirysearch", "1");
            $$(".customersearch").each(function(b) {
                b.hide()
            });
            $$(".enquirysearch").each(function(b) {
                b.show()
            });
            $$(".searchtype-enquiry").each(function(b) {
                b.checked = true
            })
        }
    }
}

function showhideexpandlink(f, c, e, a) {
    var b = 0;
    var d = "#" + f + " ." + c;
    $$(d).each(function() {
        b++
    });
    if (b > a) {
        $(e).show()
    }
}

function scrollRequired() {
    var a = document.location.search;
    var c = a.match(/scrollto=(.*)$/);
    if (c != null) {
        var b = c[1];
        expandItem = b;
        expandItem = expandItem.replace(/^hotelid-/, "");
        expandhotelrow(expandItem);
        Effect.ScrollTo(b)
    }
}

function ccsonanylinemessage() {
    if ($("lineid")) {
        if ($("lineid").value == "") {
            if ($("ccsonanylinemessage")) {
                $("ccsonanylinemessage").show()
            } else {
                var a = document.createElement("ccsmessage");
                a.innerHTML = '<div class="formhelp" id="ccsonanylinemessage">A search for "Any" will not show WLCL or HAL product, click <a class="lightwindow" href="#anylinesearchrestrictions"><img width="15px" height="15px" src="/images/info.gif" /></a> for full information.</div>';
                $("lineid").parentNode.appendChild(a)
            }
        } else {
            if ($("ccsonanylinemessage")) {
                $("ccsonanylinemessage").hide()
            }
        }
    }
}

function updatecommissionprice() {
    if ($("commissionprice")) {
        var c = 0;
        var b = $A($$(".eleagentcomm"));
        b.each(function(f) {
            var g = parseFloat(f.value);
            if (isNaN(g) || !g) {
                g = 0
            }
            c += g
        });
        var e = $("totalprice").innerHTML;
        $("commissionprice").update(properrounding(c, 2));
        if ($("commissionpercentage")) {
            $("commissionpercentage").update(properrounding((c / e) * 100, 2))
        }
        var d = 0;
        if ($("vatrate")) {
            d = $("vatrate").innerHTML.replace("%", "")
        }
        var a = 0;
        if ($("commissionvat")) {
            a = c * d;
            $("commissionvat").update(properrounding(a, 2))
        }
        if ($("nettcommission")) {
            $("nettcommission").update(properrounding(e - c - a, 2))
        }
    }
}

function storecommissionprice(b, a) {
    var c = {};
    c.action = "storeagentcommission";
    c.sessionkey = b;
    c.itemkey = a;
    c.override = $("overridecomm_" + a).value;
    new Ajax.Request("/fusion/itinerary.pl", {
        parameters: c,
        evalJSON: true,
        onSuccess: function(e) {
            var d = e.responseJSON;
            if (d.success == "1") {
                updatecommissionprice();
                $("oacerror_" + a).style.display = "none"
            } else {
                if (d.success == "0") {
                    $("oacerror_" + a).style.display = "inline";
                    $("oacerror_" + a).update(d.errortext)
                }
            }
        }
    })
}

function tooglefixeddepositvalue() {
    if ($("showminfixedvalue_check0") && $("fixeddepositvalue")) {
        if ($("showminfixedvalue_check0").checked == true) {
            $("fixeddepositvalue").enable()
        } else {
            $("fixeddepositvalue").disable()
        }
    }
}

function jet2fields() {
    var a = document.getElementById("supplier");
    if (a) {
        if (document.getElementById("supplier").value == "Jet2Holidays") {
            if (document.getElementById("jet2surname")) {
                (document.getElementById("jet2surname").up()).up().style.display = ""
            }
            if (document.getElementById("jet2date-day")) {
                (document.getElementById("jet2date-day").up()).up().style.display = ""
            }
            if (document.getElementById("jet2msg")) {
                (document.getElementById("jet2msg").up()).up().style.display = ""
            }
        } else {
            if (document.getElementById("jet2surname")) {
                (document.getElementById("jet2surname").up()).up().style.display = "none"
            }
            if (document.getElementById("jet2date-day")) {
                (document.getElementById("jet2date-day").up()).up().style.display = "none"
            }
            if (document.getElementById("jet2msg")) {
                (document.getElementById("jet2msg").up()).up().style.display = "none"
            }
        }
    }
}

function makefieldsinvisible() {
    if (document.getElementById("jet2surname")) {
        (document.getElementById("jet2surname").up()).up().style.display = "none"
    }
    if (document.getElementById("jet2date-day")) {
        (document.getElementById("jet2date-day").up()).up().style.display = "none"
    }
    if (document.getElementById("jet2msg")) {
        (document.getElementById("jet2msg").up()).up().style.display = "none"
    }
};