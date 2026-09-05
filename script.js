/* =========================================================
   TEACHER'S DAY — ONE THANK YOU
   MAIN JAVASCRIPT
   ========================================================= */

"use strict";

/* =========================================================
   SITE DATA
   ========================================================= */

const DEFAULT_DATA = {
    teacher: {
        name: "Your Teacher",
        role: "Teacher",
        subject: "Your Subject",
        years: "A few unforgettable years",
        bio: "Some teachers teach a subject. Some teachers leave something behind that stays long after the classroom is gone."
    },

    hero: {
        eyebrow: "A Personal Thank You",
        title: "This Is For You.",
        subtitle:
            "Not a tribute. Not a formal speech. Just a small corner of the internet made to say something I should probably have said a long time ago."
    },

    greeting: {
        text:
            "Dear Teacher, there are some people we thank because it is polite to do so. And then there are people we thank because the words somehow never feel big enough."
    },

    lessons: [
        {
            title: "To Keep Going",
            text: "You taught me that progress does not always have to be loud to be real."
        },
        {
            title: "To Think Differently",
            text: "You made questions feel just as important as answers."
        },
        {
            title: "To Believe",
            text: "Sometimes someone's belief in you becomes the reason you begin believing in yourself."
        }
    ],

    littleThings: [
        "The way you explained something again without making anyone feel embarrassed for asking.",
        "The small encouragements that probably felt ordinary to you but never felt ordinary to me.",
        "The expressions, phrases and little habits that somehow became part of the classroom.",
        "The moments when you noticed that something was wrong without needing to be told.",
        "The patience you showed even on days when the class probably tested every bit of it.",
        "The way you made an ordinary school day feel a little less ordinary."
    ],

    person: {
        title: "The Person Behind The Lessons",
        text:
            "Behind every lesson, every assignment and every classroom conversation is a person who chose to spend their time helping someone else grow. That is the part I want to thank you for too."
    },

    letter: {
        title: "A Letter For You",
        text:
            "I wanted to say this properly. Thank you for everything you have taught me, not only through lessons, but through the way you teach, listen, encourage and care. Some things will stay with me far beyond the classroom."
    },

    specificThanks: [
        {
            label: "For Your Patience",
            title: "Thank you for explaining things one more time."
        },
        {
            label: "For Your Belief",
            title: "Thank you for seeing potential before I could always see it."
        },
        {
            label: "For Your Time",
            title: "Thank you for giving more of yourself than the timetable ever required."
        }
    ],

    quotes: [
        {
            text: "A good teacher leaves more than knowledge behind.",
            author: "A thought worth remembering"
        },
        {
            text: "The lessons that matter most are not always written on the board.",
            author: "For you"
        },
        {
            text: "Some classrooms become memories because of the person standing at the front of them.",
            author: "With gratitude"
        }
    ],

    unsaid: [
        "I noticed more than I ever said.",
        "Some of your words stayed with me longer than you probably realised.",
        "I may not have said thank you enough.",
        "I hope you know that your effort mattered."
    ],

    messages: [
        {
            text: "Thank you for making learning feel meaningful.",
            author: "With gratitude"
        },
        {
            text: "You made a difference in ways that cannot really be measured by marks.",
            author: "Always remembered"
        },
        {
            text: "Some teachers are remembered for what they taught. You will be remembered for how you made people feel.",
            author: "Thank you"
        }
    ],

    mainThankYou: {
        title: "So, Thank You.",
        highlight: "For more than you probably realise."
    },

    finalMessage: {
        small: "There is just one thing left to say.",
        title: "Thank",
        titleSecond: "You.",
        message:
            "For the lessons. For the patience. For the little things. For being the teacher you chose to be."
    },

    theme: {
        primary: "#ff2d8d",
        secondary: "#ff4fa3"
    },

    settings: {
        sound: false
    }
};


/* =========================================================
   LOAD / SAVE DATA
   ========================================================= */

let siteData = loadSiteData();

function loadSiteData() {
    try {
        const saved = localStorage.getItem("teacherDaySiteData");

        if (!saved) {
            return structuredClone(DEFAULT_DATA);
        }

        const parsed = JSON.parse(saved);

        return deepMerge(
            structuredClone(DEFAULT_DATA),
            parsed
        );
    } catch (error) {
        console.error("Could not load saved data:", error);

        return structuredClone(DEFAULT_DATA);
    }
}

function saveSiteData() {
    try {
        localStorage.setItem(
            "teacherDaySiteData",
            JSON.stringify(siteData)
        );

        showToast("Changes saved.");
    } catch (error) {
        console.error("Could not save data:", error);

        showToast("Could not save changes.");
    }
}

function deepMerge(target, source) {
    Object.keys(source || {}).forEach(key => {

        if (
            source[key] &&
            typeof source[key] === "object" &&
            !Array.isArray(source[key])
        ) {
            target[key] = deepMerge(
                target[key] || {},
                source[key]
            );
        } else {
            target[key] = source[key];
        }
    });

    return target;
}


/* =========================================================
   DOM HELPERS
   ========================================================= */

const $ = selector => document.querySelector(selector);

const $$ = selector =>
    Array.from(document.querySelectorAll(selector));

function setText(selector, value) {
    const element = $(selector);

    if (element) {
        element.textContent = value ?? "";
    }
}

function escapeHTML(value) {
    const div = document.createElement("div");

    div.textContent = value ?? "";

    return div.innerHTML;
}


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    applyTheme();

    renderSite();

    initializeNavigation();

    initializeScrollEffects();

    initializeLetter();

    initializeQuotes();

    initializeModals();

    initializeAdmin();

    initializeButtons();

    initializeKeyboardControls();

    initializeFinalReveal();

    initializeParallax();

    console.log(
        "Teacher's Day website initialized."
    );
});


/* =========================================================
   RENDER WEBSITE
   ========================================================= */

function renderSite() {

    /* Teacher */

    setText(
        "#teacher-name",
        siteData.teacher.name
    );

    setText(
        "#teacher-role",
        siteData.teacher.role
    );

    setText(
        "#teacher-subject",
        siteData.teacher.subject
    );

    setText(
        "#teacher-years",
        siteData.teacher.years
    );

    setText(
        "#teacher-bio",
        siteData.teacher.bio
    );


    /* Hero */

    setText(
        "#hero-eyebrow",
        siteData.hero.eyebrow
    );

    setText(
        "#hero-title",
        siteData.hero.title
    );

    setText(
        "#hero-subtitle",
        siteData.hero.subtitle
    );


    /* Greeting */

    setText(
        "#greeting-text",
        siteData.greeting.text
    );


    /* Person */

    setText(
        "#person-title",
        siteData.person.title
    );

    setText(
        "#person-text",
        siteData.person.text
    );


    /* Letter */

    setText(
        "#letter-title",
        siteData.letter.title
    );

    setText(
        "#letter-text",
        siteData.letter.text
    );


    /* Main thank you */

    setText(
        "#main-thankyou-title",
        siteData.mainThankYou.title
    );

    setText(
        "#thankyou-highlight",
        siteData.mainThankYou.highlight
    );


    /* Final */

    setText(
        "#final-small",
        siteData.finalMessage.small
    );

    setText(
        "#final-title",
        siteData.finalMessage.title
    );

    setText(
        "#final-title-second",
        siteData.finalMessage.titleSecond
    );

    setText(
        "#final-message",
        siteData.finalMessage.message
    );


    renderLessons();

    renderLittleThings();

    renderSpecificThanks();

    renderUnsaid();

    renderMessages();

    renderQuotes();
}


/* =========================================================
   LESSONS
   ========================================================= */

function renderLessons() {

    const container = $("#lessons-grid");

    if (!container) return;

    container.innerHTML = "";

    siteData.lessons.forEach((lesson, index) => {

        const card = document.createElement("article");

        card.className = "lesson-card reveal";

        card.innerHTML = `
            <span class="lesson-number">
                ${String(index + 1).padStart(2, "0")}
            </span>

            <div class="lesson-icon">
                ${index === 0 ? "↗" : index === 1 ? "✦" : "♡"}
            </div>

            <div>
                <h3>${escapeHTML(lesson.title)}</h3>

                <p>
                    ${escapeHTML(lesson.text)}
                </p>
            </div>
        `;

        container.appendChild(card);
    });

    observeNewElements();
}


/* =========================================================
   LITTLE THINGS
   ========================================================= */

function renderLittleThings() {

    const container = $("#little-grid");

    if (!container) return;

    container.innerHTML = "";

    siteData.littleThings.forEach(item => {

        const element = document.createElement("div");

        element.className = "little-item reveal";

        element.innerHTML = `
            <span class="little-dot"></span>

            <p>
                ${escapeHTML(item)}
            </p>
        `;

        container.appendChild(element);
    });

    observeNewElements();
}


/* =========================================================
   SPECIFIC THANKS
   ========================================================= */

function renderSpecificThanks() {

    const container = $("#thanks-grid");

    if (!container) return;

    container.innerHTML = "";

    siteData.specificThanks.forEach(item => {

        const card = document.createElement("article");

        card.className = "thanks-card reveal";

        card.innerHTML = `
            <span>
                ${escapeHTML(item.label)}
            </span>

            <h3>
                ${escapeHTML(item.title)}
            </h3>
        `;

        container.appendChild(card);
    });

    observeNewElements();
}


/* =========================================================
   THINGS NEVER SAID
   ========================================================= */

function renderUnsaid() {

    const container = $("#unsaid-grid");

    if (!container) return;

    container.innerHTML = "";

    siteData.unsaid.forEach(item => {

        const card = document.createElement("article");

        card.className = "unsaid-card reveal";

        card.innerHTML = `
            <p>
                ${escapeHTML(item)}
            </p>
        `;

        container.appendChild(card);
    });

    observeNewElements();
}


/* =========================================================
   MESSAGES
   ========================================================= */

function renderMessages() {

    const container = $("#messages-grid");

    if (!container) return;

    container.innerHTML = "";

    siteData.messages.forEach(item => {

        const card = document.createElement("article");

        card.className = "message-card reveal";

        card.innerHTML = `
            <p>
                ${escapeHTML(item.text)}
            </p>

            <div class="message-author">
                ${escapeHTML(item.author)}
            </div>
        `;

        container.appendChild(card);
    });

    observeNewElements();
}


/* =========================================================
   NAVIGATION
   ========================================================= */

function initializeNavigation() {

    const navbar = $(".navbar");

    const menuToggle = $(".menu-toggle");

    const navLinks = $(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener(
            "click",
            () => {

                navLinks.classList.toggle("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    navLinks.classList.contains("open")
                );
            }
        );

        $$(".nav-links a").forEach(link => {

            link.addEventListener(
                "click",
                () => {
                    navLinks.classList.remove("open");
                }
            );
        });
    }

    window.addEventListener(
        "scroll",
        () => {

            if (!navbar) return;

            navbar.classList.toggle(
                "scrolled",
                window.scrollY > 30
            );
        },
        { passive: true }
    );


    /* Active navigation */

    const sections = $$("section[id]");

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const id = entry.target.id;

                $$(".nav-links a").forEach(link => {

                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${id}`
                    );
                });
            });

        },
        {
            rootMargin: "-30% 0px -60% 0px"
        }
    );

    sections.forEach(section => {
        observer.observe(section);
    });
}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

let revealObserver;

function initializeScrollEffects() {

    revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );
                }
            });

        },
        {
            threshold: 0.12
        }
    );

    observeNewElements();
}

function observeNewElements() {

    if (!revealObserver) return;

    $$(".reveal, .reveal-left, .reveal-right, .stagger")
        .forEach(element => {

            if (!element.dataset.observed) {

                element.dataset.observed = "true";

                revealObserver.observe(element);
            }
        });
}


/* =========================================================
   LETTER INTERACTION
   ========================================================= */

function initializeLetter() {

    const envelope = $(".envelope");

    if (!envelope) return;

    envelope.addEventListener(
        "click",
        () => {

            envelope.classList.toggle("open");

            const isOpen =
                envelope.classList.contains("open");

            envelope.setAttribute(
                "aria-expanded",
                isOpen
            );

            if (isOpen) {
                showToast("Letter opened.");
            }
        }
    );
}


/* =========================================================
   QUOTES
   ========================================================= */

let currentQuote = 0;

function renderQuotes() {

    if (!siteData.quotes.length) return;

    const quote = siteData.quotes[currentQuote];

    setText(
        "#quote-text",
        quote.text
    );

    setText(
        "#quote-author",
        quote.author
    );
}

function initializeQuotes() {

    renderQuotes();

    const next =
        $("#quote-next");

    const previous =
        $("#quote-prev");

    if (next) {

        next.addEventListener(
            "click",
            () => {

                currentQuote++;

                if (
                    currentQuote >=
                    siteData.quotes.length
                ) {
                    currentQuote = 0;
                }

                animateQuote();
            }
        );
    }

    if (previous) {

        previous.addEventListener(
            "click",
            () => {

                currentQuote--;

                if (currentQuote < 0) {
                    currentQuote =
                        siteData.quotes.length - 1;
                }

                animateQuote();
            }
        );
    }
}

function animateQuote() {

    const text = $("#quote-text");

    const author = $("#quote-author");

    if (!text || !author) return;

    text.style.opacity = "0";
    text.style.transform = "translateY(15px)";

    author.style.opacity = "0";

    setTimeout(() => {

        renderQuotes();

        text.style.transition =
            "opacity .5s ease, transform .5s ease";

        author.style.transition =
            "opacity .5s ease";

        requestAnimationFrame(() => {

            text.style.opacity = "1";
            text.style.transform = "translateY(0)";

            author.style.opacity = "1";
        });

    }, 250);
}


/* =========================================================
   MODALS
   ========================================================= */

function initializeModals() {

    $$(".modal").forEach(modal => {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {
                    closeModal(modal);
                }
            }
        );
    });

    $$(".modal-close").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const modal =
                    button.closest(".modal");

                if (modal) {
                    closeModal(modal);
                }
            }
        );
    });
}

function openModal(id) {

    const modal =
        typeof id === "string"
            ? document.getElementById(id)
            : id;

    if (!modal) return;

    modal.classList.add("active");

    document.body.classList.add("modal-open");
}

function closeModal(id) {

    const modal =
        typeof id === "string"
            ? document.getElementById(id)
            : id;

    if (!modal) return;

    modal.classList.remove("active");

    document.body.classList.remove("modal-open");
}


/* =========================================================
   ADMIN SYSTEM
   ========================================================= */

function initializeAdmin() {

    const adminButton =
        $("#admin-open");

    const adminOverlay =
        $("#admin-overlay");

    const adminClose =
        $("#admin-close");

    const saveButton =
        $("#admin-save");

    const resetButton =
        $("#admin-reset");

    if (adminButton && adminOverlay) {

        adminButton.addEventListener(
            "click",
            () => {

                openAdmin();

            }
        );
    }

    if (adminClose) {

        adminClose.addEventListener(
            "click",
            () => {

                closeAdmin();

            }
        );
    }

    if (saveButton) {

        saveButton.addEventListener(
            "click",
            saveAdminChanges
        );
    }

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            resetSite
        );
    }

    populateAdminFields();

    initializeColorControls();
}

function openAdmin() {

    const overlay =
        $("#admin-overlay");

    if (!overlay) return;

    populateAdminFields();

    overlay.classList.add("active");

    document.body.classList.add("modal-open");
}

function closeAdmin() {

    const overlay =
        $("#admin-overlay");

    if (!overlay) return;

    overlay.classList.remove("active");

    document.body.classList.remove("modal-open");
}


/* =========================================================
   ADMIN FIELD HELPERS
   ========================================================= */

function setAdminValue(id, value) {

    const field =
        document.getElementById(id);

    if (field) {
        field.value = value ?? "";
    }
}

function getAdminValue(id) {

    const field =
        document.getElementById(id);

    return field
        ? field.value.trim()
        : "";
}

function populateAdminFields() {

    setAdminValue(
        "admin-teacher-name",
        siteData.teacher.name
    );

    setAdminValue(
        "admin-teacher-role",
        siteData.teacher.role
    );

    setAdminValue(
        "admin-teacher-subject",
        siteData.teacher.subject
    );

    setAdminValue(
        "admin-teacher-years",
        siteData.teacher.years
    );

    setAdminValue(
        "admin-teacher-bio",
        siteData.teacher.bio
    );

    setAdminValue(
        "admin-hero-eyebrow",
        siteData.hero.eyebrow
    );

    setAdminValue(
        "admin-hero-title",
        siteData.hero.title
    );

    setAdminValue(
        "admin-hero-subtitle",
        siteData.hero.subtitle
    );

    setAdminValue(
        "admin-greeting",
        siteData.greeting.text
    );

    setAdminValue(
        "admin-letter-title",
        siteData.letter.title
    );

    setAdminValue(
        "admin-letter",
        siteData.letter.text
    );

    setAdminValue(
        "admin-final-small",
        siteData.finalMessage.small
    );

    setAdminValue(
        "admin-final-title",
        siteData.finalMessage.title
    );

    setAdminValue(
        "admin-final-second",
        siteData.finalMessage.titleSecond
    );

    setAdminValue(
        "admin-final-message",
        siteData.finalMessage.message
    );


    const primary =
        $("#admin-primary");

    const secondary =
        $("#admin-secondary");

    if (primary) {
        primary.value =
            siteData.theme.primary;
    }

    if (secondary) {
        secondary.value =
            siteData.theme.secondary;
    }
}


/* =========================================================
   SAVE ADMIN CHANGES
   ========================================================= */

function saveAdminChanges() {

    siteData.teacher.name =
        getAdminValue("admin-teacher-name");

    siteData.teacher.role =
        getAdminValue("admin-teacher-role");

    siteData.teacher.subject =
        getAdminValue("admin-teacher-subject");

    siteData.teacher.years =
        getAdminValue("admin-teacher-years");

    siteData.teacher.bio =
        getAdminValue("admin-teacher-bio");


    siteData.hero.eyebrow =
        getAdminValue("admin-hero-eyebrow");

    siteData.hero.title =
        getAdminValue("admin-hero-title");

    siteData.hero.subtitle =
        getAdminValue("admin-hero-subtitle");


    siteData.greeting.text =
        getAdminValue("admin-greeting");


    siteData.letter.title =
        getAdminValue("admin-letter-title");

    siteData.letter.text =
        getAdminValue("admin-letter");


    siteData.finalMessage.small =
        getAdminValue("admin-final-small");

    siteData.finalMessage.title =
        getAdminValue("admin-final-title");

    siteData.finalMessage.titleSecond =
        getAdminValue("admin-final-second");

    siteData.finalMessage.message =
        getAdminValue("admin-final-message");


    const primary =
        $("#admin-primary");

    const secondary =
        $("#admin-secondary");

    if (primary) {
        siteData.theme.primary =
            primary.value;
    }

    if (secondary) {
        siteData.theme.secondary =
            secondary.value;
    }


    applyTheme();

    saveSiteData();

    renderSite();

    closeAdmin();

    showToast(
        "Website updated successfully."
    );
}


/* =========================================================
   RESET WEBSITE
   ========================================================= */

function resetSite() {

    const confirmed =
        confirm(
            "Reset the website to its original content?"
        );

    if (!confirmed) return;

    siteData =
        structuredClone(DEFAULT_DATA);

    localStorage.removeItem(
        "teacherDaySiteData"
    );

    applyTheme();

    renderSite();

    populateAdminFields();

    showToast(
        "Website has been reset."
    );
}


/* =========================================================
   THEME SYSTEM
   ========================================================= */

function applyTheme() {

    const root =
        document.documentElement;

    root.style.setProperty(
        "--primary",
        siteData.theme.primary
    );

    root.style.setProperty(
        "--secondary",
        siteData.theme.secondary
    );

    const themeColor =
        document.querySelector(
            'meta[name="theme-color"]'
        );

    if (themeColor) {

        themeColor.setAttribute(
            "content",
            siteData.theme.primary
        );
    }
}


/* =========================================================
   COLOR CONTROLS
   ========================================================= */

function initializeColorControls() {

    const primary =
        $("#admin-primary");

    const secondary =
        $("#admin-secondary");

    if (primary) {

        primary.addEventListener(
            "input",
            event => {

                siteData.theme.primary =
                    event.target.value;

                applyTheme();
            }
        );
    }

    if (secondary) {

        secondary.addEventListener(
            "input",
            event => {

                siteData.theme.secondary =
                    event.target.value;

                applyTheme();
            }
        );
    }
}


/* =========================================================
   BUTTONS
   ========================================================= */

function initializeButtons() {

    /* Open admin */

    $$("[data-admin]").forEach(button => {

        button.addEventListener(
            "click",
            openAdmin
        );
    });


    /* Open modal */

    $$("[data-modal]").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    button.dataset.modal;

                openModal(id);
            }
        );
    });


    /* Scroll buttons */

    $$("[data-scroll]").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const target =
                    document.querySelector(
                        button.dataset.scroll
                    );

                if (target) {

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        );
    });
}


/* =========================================================
   KEYBOARD CONTROLS
   ========================================================= */

function initializeKeyboardControls() {

    document.addEventListener(
        "keydown",
        event => {

            /* ESC */

            if (event.key === "Escape") {

                closeAllOverlays();
            }


            /* Letter keyboard interaction */

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                const active =
                    document.activeElement;

                if (
                    active &&
                    active.classList.contains(
                        "envelope"
                    )
                ) {

                    event.preventDefault();

                    active.click();
                }
            }
        }
    );
}

function closeAllOverlays() {

    $$(".modal.active").forEach(
        closeModal
    );

    closeAdmin();
}


/* =========================================================
   FINAL REVEAL
   ========================================================= */

function initializeFinalReveal() {

    const final =
        $(".final-section");

    if (!final) return;

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        final.classList.add(
                            "final-visible"
                        );
                    }
                });

            },
            {
                threshold: 0.35
            }
        );

    observer.observe(final);
}


/* =========================================================
   PARALLAX
   ========================================================= */

function initializeParallax() {

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {
        return;
    }

    const hero =
        $(".hero-content");

    if (!hero) return;

    window.addEventListener(
        "scroll",
        () => {

            const scroll =
                window.scrollY;

            if (scroll > window.innerHeight) {
                return;
            }

            hero.style.transform =
                `translateY(${scroll * 0.12}px)`;

            hero.style.opacity =
                `${Math.max(
                    0,
                    1 - scroll / 650
                )}`;
        },
        { passive: true }
    );
}


/* =========================================================
   TOAST
   ========================================================= */

let toastTimeout;

function showToast(message) {

    let toast =
        $(".toast");

    if (!toast) {

        toast =
            document.createElement("div");

        toast.className = "toast";

        document.body.appendChild(toast);
    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );
}


/* =========================================================
   OPTIONAL SOUND SYSTEM
   ========================================================= */

let audioContext = null;

function initializeAudio() {

    if (audioContext) return;

    try {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    } catch (error) {

        console.warn(
            "Web Audio API unavailable."
        );
    }
}

function playSoftClick() {

    if (
        !siteData.settings.sound
    ) {
        return;
    }

    initializeAudio();

    if (!audioContext) return;

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();

    oscillator.frequency.value =
        520;

    oscillator.type =
        "sine";

    gain.gain.setValueAtTime(
        0.0001,
        audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.025,
        audioContext.currentTime + 0.01
    );

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 0.08
    );

    oscillator.connect(gain);

    gain.connect(
        audioContext.destination
    );

    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + 0.09
    );
}


/* =========================================================
   CLICK SOUND HOOK
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            event.target.closest(
                "button, .btn, .envelope, a"
            )
        ) {

            playSoftClick();
        }
    }
);


/* =========================================================
   ADMIN SHORTCUT
   ========================================================= */

/*
   Ctrl + Shift + A
   Opens the admin panel.
*/

document.addEventListener(
    "keydown",
    event => {

        if (
            event.ctrlKey &&
            event.shiftKey &&
            event.key.toLowerCase() === "a"
        ) {

            event.preventDefault();

            openAdmin();
        }
    }
);


/* =========================================================
   EXPORT / IMPORT SUPPORT
   ========================================================= */

function exportSiteData() {

    const json =
        JSON.stringify(
            siteData,
            null,
            2
        );

    const blob =
        new Blob(
            [json],
            {
                type:
                    "application/json"
            }
        );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "teachers-day-site-data.json";

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);

    showToast(
        "Site data exported."
    );
}

function importSiteData(file) {

    if (!file) return;

    const reader =
        new FileReader();

    reader.onload = event => {

        try {

            const imported =
                JSON.parse(
                    event.target.result
                );

            siteData =
                deepMerge(
                    structuredClone(
                        DEFAULT_DATA
                    ),
                    imported
                );

            applyTheme();

            renderSite();

            populateAdminFields();

            localStorage.setItem(
                "teacherDaySiteData",
                JSON.stringify(siteData)
            );

            showToast(
                "Site data imported."
            );

        } catch (error) {

            console.error(error);

            showToast(
                "Invalid site data file."
            );
        }
    };

    reader.readAsText(file);
}


/* =========================================================
   IMAGE PREVIEW SYSTEM
   ========================================================= */

function previewImage(
    input,
    targetSelector
) {

    const file =
        input.files?.[0];

    if (!file) return;

    if (
        !file.type.startsWith("image/")
    ) {

        showToast(
            "Please choose an image."
        );

        return;
    }

    const reader =
        new FileReader();

    reader.onload = event => {

        const target =
            $(targetSelector);

        if (!target) return;

        target.src =
            event.target.result;

        target.classList.add(
            "image-loaded"
        );
    };

    reader.readAsDataURL(file);
}


/* =========================================================
   IMAGE STORAGE
   ========================================================= */

function saveImageToStorage(
    file,
    storageKey
) {

    if (!file) return;

    const reader =
        new FileReader();

    reader.onload = event => {

        try {

            localStorage.setItem(
                storageKey,
                event.target.result
            );

            showToast(
                "Image saved."
            );

        } catch (error) {

            showToast(
                "Image is too large for browser storage."
            );
        }
    };

    reader.readAsDataURL(file);
}

function loadStoredImage(
    storageKey,
    targetSelector
) {

    const image =
        localStorage.getItem(
            storageKey
        );

    if (!image) return;

    const target =
        $(targetSelector);

    if (target) {
        target.src = image;
    }
}


/* =========================================================
   FORM AUTOSAVE SUPPORT
   ========================================================= */

function initializeAutosave() {

    $$(
        "#admin-overlay input, #admin-overlay textarea"
    ).forEach(field => {

        field.addEventListener(
            "change",
            () => {

                field.classList.add(
                    "changed"
                );
            }
        );
    });
}


/* =========================================================
   VISIBILITY HELPERS
   ========================================================= */

function toggleElement(
    selector,
    visible
) {

    const element =
        $(selector);

    if (!element) return;

    element.classList.toggle(
        "hidden",
        !visible
    );
}


/* =========================================================
   DYNAMIC SECTION ORDER
   ========================================================= */

function moveSection(
    sectionId,
    direction
) {

    const section =
        document.getElementById(
            sectionId
        );

    if (!section) return;

    const sibling =
        direction === "up"
            ? section.previousElementSibling
            : section.nextElementSibling;

    if (!sibling) return;

    if (direction === "up") {

        section.parentNode.insertBefore(
            section,
            sibling
        );

    } else {

        section.parentNode.insertBefore(
            sibling,
            section
        );
    }

    showToast(
        "Section order updated."
    );
}


/* =========================================================
   SECTION VISIBILITY
   ========================================================= */

function setSectionVisibility(
    sectionId,
    visible
) {

    const section =
        document.getElementById(
            sectionId
        );

    if (!section) return;

    section.style.display =
        visible ? "" : "none";

    showToast(
        visible
            ? "Section shown."
            : "Section hidden."
    );
}


/* =========================================================
   DEBUG / DEVELOPMENT
   ========================================================= */

window.TeacherDay = {

    getData() {
        return siteData;
    },

    save() {
        saveSiteData();
    },

    render() {
        renderSite();
    },

    reset() {
        resetSite();
    },

    export() {
        exportSiteData();
    },

    import(file) {
        importSiteData(file);
    },

    theme() {
        applyTheme();
    }
};


/* =========================================================
   FINAL INITIALIZATION
   ========================================================= */

initializeAutosave();


/* =========================================================
   FLOWER CURSOR
   ========================================================= */

const flowerCursor =
    document.getElementById("flower-cursor");

const cursorTrail =
    document.getElementById("cursor-trail");

let cursorX = 0;
let cursorY = 0;

let trailX = 0;
let trailY = 0;

if (flowerCursor && cursorTrail) {

    document.addEventListener(
        "mousemove",
        event => {

            cursorX = event.clientX;
            cursorY = event.clientY;

            flowerCursor.style.transform =
                `translate(
                    ${cursorX}px,
                    ${cursorY}px
                ) translate(-50%, -50%)`;
        }
    );

    function animateCursorTrail() {

        trailX +=
            (cursorX - trailX) * 0.16;

        trailY +=
            (cursorY - trailY) * 0.16;

        cursorTrail.style.transform =
            `translate(
                ${trailX}px,
                ${trailY}px
            ) translate(-50%, -50%)`;

        requestAnimationFrame(
            animateCursorTrail
        );
    }

    animateCursorTrail();


    /* Flower grows when hovering interactive elements */

    const interactiveElements =
        document.querySelectorAll(
            "a, button, .btn, .envelope, " +
            ".lesson-card, .thanks-card, " +
            ".quote-control"
        );

    interactiveElements.forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {
                document.body.classList.add(
                    "cursor-hover"
                );
            }
        );

        element.addEventListener(
            "mouseleave",
            () => {
                document.body.classList.remove(
                    "cursor-hover"
                );
            }
        );
    });
}
initializeAutosave();
music: {
    fileName: "",
    data: "",
    volume: 0.35
},
theme: {
    primary: "#ff2d8d",
    secondary: "#ff4fa3"
},

music: {
    fileName: "",
    data: "",
    volume: 0.35
},

settings: {
    sound: false
}
/* =========================================================
   BACKGROUND MUSIC SYSTEM
   ADMIN UPLOAD + PLAYER
   ========================================================= */

let backgroundMusic =
    document.getElementById("background-music");

let musicToggle =
    document.getElementById("music-toggle");

let musicPlayer =
    document.getElementById("music-player");

let musicStatus =
    document.getElementById("music-status");

let adminMusicFile =
    document.getElementById("admin-music-file");

let adminMusicName =
    document.getElementById("admin-music-name");

let adminMusicSize =
    document.getElementById("admin-music-size");

let adminMusicPreview =
    document.getElementById("admin-music-preview");

let adminMusicStop =
    document.getElementById("admin-music-stop");

let adminMusicRemove =
    document.getElementById("admin-music-remove");

let adminMusicVolume =
    document.getElementById("admin-music-volume");

let adminMusicVolumeValue =
    document.getElementById("admin-music-volume-value");


/* =========================================================
   LOAD MUSIC
   ========================================================= */

function loadBackgroundMusic() {

    if (!backgroundMusic) return;

    const savedMusic =
        siteData.music?.data || "";

    const savedFileName =
        siteData.music?.fileName || "";

    const savedVolume =
        typeof siteData.music?.volume === "number"
            ? siteData.music.volume
            : 0.35;


    backgroundMusic.pause();

    backgroundMusic.currentTime = 0;

    backgroundMusic.volume = savedVolume;


    if (savedMusic) {

        backgroundMusic.src =
            savedMusic;

        backgroundMusic.load();

        if (musicStatus) {

            musicStatus.textContent =
                "Music Off";

        }

    } else {

        backgroundMusic.removeAttribute(
            "src"
        );

        backgroundMusic.load();

        if (musicStatus) {

            musicStatus.textContent =
                "No Music";

        }

    }


    updateAdminMusicUI();

}


/* =========================================================
   ADMIN MUSIC UI
   ========================================================= */

function updateAdminMusicUI() {

    const fileName =
        siteData.music?.fileName || "";

    const volume =
        typeof siteData.music?.volume === "number"
            ? siteData.music.volume
            : 0.35;


    if (adminMusicName) {

        adminMusicName.textContent =
            fileName ||
            "No music selected";

    }


    if (adminMusicSize) {

        adminMusicSize.textContent =
            fileName
                ? "Music ready to play."
                : "Upload an MP3, WAV or OGG file.";

    }


    if (adminMusicVolume) {

        adminMusicVolume.value =
            volume;

    }


    if (adminMusicVolumeValue) {

        adminMusicVolumeValue.textContent =
            Math.round(volume * 100) + "%";

    }

}


/* =========================================================
   FORMAT FILE SIZE
   ========================================================= */

function formatMusicFileSize(bytes) {

    if (!bytes) return "";

    const units = [
        "Bytes",
        "KB",
        "MB",
        "GB"
    ];

    const index =
        Math.floor(
            Math.log(bytes) /
            Math.log(1024)
        );

    return (
        Math.round(
            bytes /
            Math.pow(1024, index) *
            100
        ) / 100
    ) + " " + units[index];

}


/* =========================================================
   UPLOAD MUSIC
   ========================================================= */

function handleMusicUpload(file) {

    if (!file) return;


    if (!file.type.startsWith("audio/")) {

        showToast(
            "Please select an audio file."
        );

        return;

    }


    /*
     * 15 MB safety limit.
     *
     * This prevents localStorage from
     * becoming unnecessarily large.
     */

    const MAX_SIZE =
        15 * 1024 * 1024;


    if (file.size > MAX_SIZE) {

        showToast(
            "Music file must be smaller than 15 MB."
        );

        return;

    }


    const reader =
        new FileReader();


    reader.onload = function(event) {

        siteData.music.data =
            event.target.result;

        siteData.music.fileName =
            file.name;


        /*
         * Keep existing volume.
         */

        if (
            typeof siteData.music.volume !==
            "number"
        ) {

            siteData.music.volume =
                0.35;

        }


        /*
         * Load immediately.
         */

        loadBackgroundMusic();


        /*
         * Mark admin field as changed.
         */

        if (adminMusicFile) {

            adminMusicFile.classList.add(
                "changed"
            );

        }


        showToast(
            "Music uploaded successfully."
        );

    };


    reader.onerror = function() {

        showToast(
            "Could not read the music file."
        );

    };


    reader.readAsDataURL(file);

}


/* =========================================================
   FILE INPUT
   ========================================================= */

if (adminMusicFile) {

    adminMusicFile.addEventListener(
        "change",
        function() {

            const file =
                this.files?.[0];

            if (file) {

                handleMusicUpload(file);

            }

        }
    );

}


/* =========================================================
   ADMIN PREVIEW
   ========================================================= */

if (adminMusicPreview) {

    adminMusicPreview.addEventListener(
        "click",
        async function() {

            if (
                !backgroundMusic ||
                !siteData.music?.data
            ) {

                showToast(
                    "Upload music first."
                );

                return;

            }


            try {

                backgroundMusic.volume =
                    siteData.music.volume;

                await backgroundMusic.play();

                musicPlayer?.classList.add(
                    "playing"
                );

                if (musicStatus) {

                    musicStatus.textContent =
                        "Music Playing";

                }

            } catch (error) {

                console.error(
                    "Preview failed:",
                    error
                );

                showToast(
                    "Music could not be played."
                );

            }

        }
    );

}


/* =========================================================
   ADMIN STOP
   ========================================================= */

if (adminMusicStop) {

    adminMusicStop.addEventListener(
        "click",
        function() {

            stopBackgroundMusic();

        }
    );

}


/* =========================================================
   STOP MUSIC
   ========================================================= */

function stopBackgroundMusic() {

    if (!backgroundMusic) return;

    backgroundMusic.pause();

    backgroundMusic.currentTime = 0;

    musicPlayer?.classList.remove(
        "playing"
    );

    if (musicStatus) {

        musicStatus.textContent =
            "Music Off";

    }

}


/* =========================================================
   REMOVE MUSIC
   ========================================================= */

if (adminMusicRemove) {

    adminMusicRemove.addEventListener(
        "click",
        function() {

            if (
                !siteData.music?.data
            ) {

                showToast(
                    "There is no music to remove."
                );

                return;

            }


            stopBackgroundMusic();


            siteData.music.data =
                "";

            siteData.music.fileName =
                "";


            if (adminMusicFile) {

                adminMusicFile.value =
                    "";

            }


            loadBackgroundMusic();


            showToast(
                "Music removed."
            );

        }
    );

}


/* =========================================================
   VOLUME CONTROL
   ========================================================= */

if (adminMusicVolume) {

    adminMusicVolume.addEventListener(
        "input",
        function() {

            const volume =
                Number(this.value);


            siteData.music.volume =
                volume;


            if (backgroundMusic) {

                backgroundMusic.volume =
                    volume;

            }


            if (adminMusicVolumeValue) {

                adminMusicVolumeValue.textContent =
                    Math.round(volume * 100) +
                    "%";

            }

        }
    );

}


/* =========================================================
   PUBLIC PLAY / PAUSE
   ========================================================= */

if (
    backgroundMusic &&
    musicToggle &&
    musicPlayer
) {

    musicToggle.addEventListener(
        "click",
        async function() {

            if (!siteData.music?.data) {

                showToast(
                    "No music has been uploaded yet."
                );

                return;

            }


            try {

                if (
                    backgroundMusic.paused
                ) {

                    backgroundMusic.volume =
                        siteData.music.volume;

                    await backgroundMusic.play();

                } else {

                    backgroundMusic.pause();

                }

            } catch (error) {

                console.error(
                    "Music could not be played:",
                    error
                );

                if (musicStatus) {

                    musicStatus.textContent =
                        "Tap to Play";

                }

            }

        }
    );


    backgroundMusic.addEventListener(
        "play",
        function() {

            musicPlayer.classList.add(
                "playing"
            );

            musicStatus.textContent =
                "Music Playing";

            musicToggle.setAttribute(
                "aria-label",
                "Pause music"
            );

        }
    );


    backgroundMusic.addEventListener(
        "pause",
        function() {

            musicPlayer.classList.remove(
                "playing"
            );

            musicStatus.textContent =
                "Music Off";

            musicToggle.setAttribute(
                "aria-label",
                "Play music"
            );

        }
    );


    backgroundMusic.addEventListener(
        "ended",
        function() {

            musicPlayer.classList.remove(
                "playing"
            );

            musicStatus.textContent =
                "Music Off";

            musicToggle.setAttribute(
                "aria-label",
                "Play music"
            );

        }
    );

}


/* =========================================================
   INITIALIZE MUSIC
   ========================================================= */

loadBackgroundMusic();