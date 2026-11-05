import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./supabase-config.js";

const initialState = {
  teams: [{ name: "FC Promashkov" }, { name: "FC Lionslav" }],
  matches: [],
  championships: { "0": 0, "1": 0 }
};

const TRANSLATIONS = {
  en: {
    authStatus: "Connecting to database…",
    authButton: "Sign in",
    eyebrow: "eFootball League",
    editTeams: "Teams",
    dbLink: "Card database",
    globalLink: "Team analytics",
    achievementsLink: "Achievements",
    communityEyebrow: "LEAGUE COMMUNITY",
    communityTitle: "Community",
    communityDesc: "Your profile, achievements and friends",
    communitySignIn: "Sign in to see your profile, achievements and friends.",
    messagesLink: "Messages",
    messagesDesc: "Private conversations with friends",
    friendsPageDesc: "Your football circle",
    chooseConversation: "Choose a friend to start chatting.",
    messagePlaceholder: "Write a message…",
    sendMessage: "Send",
    noMessagesYet: "No messages yet. Say hello!",
    messagesNeedMigration: "Messaging is not set up yet. Run the social messaging migration.",
    messagesEmptyFriends: "Add friends to start a conversation.",
    unreadMessages: "Unread messages",
    backToLeague: "← Back to league",
    achievementDetails: "ACHIEVEMENT DETAILS",
    progressLabel: "Progress",
    achievementTier: "Tier",
    bronzeTier: "Bronze",
    silverTier: "Silver",
    goldTier: "Gold",
    unlockedLabel: "Unlocked",
    notUnlockedLabel: "In progress",
    editPage: "Edit page",
    editPageDesc: "Make this page feel like yours.",
    profileBack: "Back to my page",
    achievementPageDesc: "{0} of {1} achievements unlocked. Select a badge to see what it takes.",
    friendsLink: "My friends",
    friendsDesc: "Open a player's profile",
    youTag: "You",
    friendRecord: "Played {0} · W {1} · D {2} · L {3} · {4} pts",
    friendBadges: "Achievements {0}/{1}",
    editProfile: "Edit page",
    avatarUpload: "Avatar",
    pinBadges: "Pinned badges",
    pinLimit: "You can pin up to 3 badges",
    noBadgesYet: "Earn achievements to pin them here.",
    favoritePlayer: "Favorite player",
    noFavorite: "— none —",
    saveProfile: "Save profile",
    profileSaved: "Profile saved",
    nicknameFailed: "This nickname is taken or invalid",
    friendsTabFriends: "Friends",
    friendsTabRequests: "Requests",
    friendsTabSearch: "Find players",
    friendSearchPlaceholder: "Nickname",
    friendSearchButton: "Search",
    friendsEmpty: "No friends yet. Use “Find players” to add some.",
    requestsEmpty: "No pending requests.",
    searchHint: "Type at least 2 characters of a nickname.",
    searchEmpty: "Nobody found.",
    friendsNeedSignIn: "Sign in to use friends",
    addFriend: "Add",
    requestSent: "Request sent",
    acceptFriend: "Accept",
    declineFriend: "Decline",
    cancelRequest: "Cancel",
    removeFriend: "Remove",
    alreadyFriend: "Friends",
    incomingTag: "wants to be friends",
    myProfile: "My page",
    nicknameLabel: "Nickname",
    saveNickname: "Save",
    nicknameSaved: "Nickname saved",
    profileLocked: "Team and achievements are visible to friends only. Send a friend request to see them.",
    noTeamLinked: "No team linked",
    mustBeInMatch: "You can only report matches of your own team",
    needTeam: "This account is not linked to a team",
    proposalsTitle: "Match results awaiting confirmation",
    proposalSent: "Result sent. It will be published once {0} confirms it.",
    proposalWaiting: "Waiting for {0} to confirm {1}",
    proposalIncoming: "{0} reports: {1}",
    proposalConfirm: "Confirm",
    proposalReject: "Reject",
    proposalCancel: "Cancel",
    proposalConfirmed: "Result confirmed and published",
    proposalRejected: "Result rejected",
    onlyOwnTeam: "You can edit only your own team",
    siteMenu: "Explore",
    addMatch: "Add match",
    championshipTitle: "Championship Race",
    liveSimulation: "LIVE SIMULATION",
    raceDisclaimer: "Live estimate from season results with simulated momentum. Not live-match odds.",
    raceChartLabel: "Live championship chance cardiogram",
    chance: "Chance",
    newSeason: "New Season",
    championships: "Championships",
    headToHead: "Head to Head",
    teamStatsTitle: "Team statistics",
    teamStatsDescription: "Detailed performance for a season or all seasons",
    teamStatsCompare: "Team comparison",
    teamStatsSingleMode: "One team",
    teamStatsCompareMode: "Compare teams",
    teamStatsView: "Statistics view",
    teamStatsBetter: "Leader",
    teamStatsTie: "Equal",
    teamStatsInsufficientData: "Not enough data to compare",
    teamStatsTeam: "Team",
    teamStatsPeriod: "Period",
    allSeasons: "All seasons",
    seasonOption: "Season {0}",
    statsRecord: "{0} matches · {1} W · {2} D · {3} L",
    statPlayed: "Matches played",
    statWinRate: "Win rate",
    statHomeWinRate: "Home win rate",
    statAwayWinRate: "Away win rate",
    statLocationWinsOutOf: "{0} wins from {1} matches",
    statGoals: "Goals scored",
    statGoalsPerMatch: "Goals per match",
    statPossession: "Average possession",
    statPasses: "Average passes",
    statShots: "Average shots",
    statShotsOnTarget: "Average shots on target",
    statShotConversion: "Shot conversion",
    statAllMatches: "All matches in period",
    statWinsOutOf: "{0} wins from {1} matches",
    statRecordedIn: "Recorded in {0} of {1} matches",
    teamStatsFootnote: "Averages use only matches where each statistic was recorded. Shot conversion = goals in matches with shot data divided by recorded shots.",
    noTeamStats: "No matches for this selection yet.",
    winsLabel: "W",
    drawsLabel: "D",
    lossesLabel: "L",
    goalsLabel: "Goals: {0} — {1}",
    totalMatches: "Total: {0} matches",
    tableTitle: "Table",
    updatedAfterMatch: "UPDATED AFTER EACH MATCH",
    halloween: "HAPPY HALLOWEEN",
    colPos: "#",
    colTeam: "Team",
    colForm: "Form",
    colPlayed: "Pld",
    colW: "W",
    colD: "D",
    colL: "L",
    colGD: "GD",
    colPts: "Pts",
    tableFooter: "Form: last five results (green — win · grey — draw · red — loss) · Pld — played · W — wins · D — draws · L — losses · GD — goal difference · Pts — points",
    latestMatches: "Latest matches",
    tipText: "A win earns <strong>3 points</strong>; a draw earns <strong>1</strong>. Sign in to save results to your shared league and keep them in sync.",
    leagueNews: "League news",
    newsSubtitle: "Stories, photos and updates from the league",
    addNews: "Add news",
    loadingNews: "Loading news…",
    footer1: "eFOOTBALL LEAGUE · YOUR CHAMPIONSHIP",
    footer2: "Every match counts.",
    upcomingMatchTitle: "Upcoming match",
    upcomingMatchSubtitle: "Match odds are separate from championship chances",
    upcomingMatchDisclaimer: "Historical match statistics with simulated movement. Not live-match data.",
    upcomingMatchSamples: "Previous matches used: {0}",
    forecastFiveTitle: "Next 5 match forecast",
    forecastFiveSubtitle: "Projects scoring rates and recent form trends from the latest 10 matches",
    forecastDataModel: "DATA MODEL",
    forecastMatch: "Match {0}",
    forecastHomeWin: "Home",
    forecastAwayWin: "Away",
    forecastDraw: "Draw",
    forecastHomeLabel: "H",
    forecastAwayLabel: "A",
    forecastScore: "Projected score",
    forecastDataNote: "Each forecast uses the latest 10 played matches. Projected form trends change with each forecast horizon.",
    forecastNoHistory: "No match history yet.",
    forecastNeedTen: "Forecasts will appear after 10 matches. Currently recorded: {0}.",
    forecastUnavailable: "No past match with this home/away setup — not enough data to forecast.",
    forecastDrawPick: "Draw is the most likely outcome",
    forecastWinnerPick: "{0} is the most likely winner",
    forecastUndecided: "No clear predicted outcome",
    upcomingMatchChartLabel: "{0} and {1} match outcome probabilities",
    versus: "VS",
    lastMatchTitle: "Last match",
    noLastMatch: "No matches have been played yet.",
    matchHistoryShow: "Show all match history ({0})",
    matchHistoryHide: "Show latest matches",
    noMatchStats: "No statistics were recorded for this match.",
    statEdge: "Statistical edge: {0}",
    statsEven: "Stats are even",
    matchDialogTitle: "Add match result",
    matchDialogDesc: "Enter the score for a match you played",
    predictionDraw: "Draw",
    predictionNoHistory: "No previous matches — equal starting estimate",
    homeTeam: "Home team",
    awayTeam: "Away team",
    swapTeams: "Swap home and away teams",
    goals: "Goals",
    matchStats: "Match statistics",
    statsOptional: "Leave any statistic blank if you do not have it.",
    statistic: "Statistic",
    shots: "Shots",
    shotsOnTarget: "Shots on target",
    possession: "Possession (%)",
    passes: "Passes",
    cancel: "Cancel",
    saveResult: "Save result",
    teamsDialogTitle: "Your teams",
    teamsDialogDesc: "Choose names for your league",
    addTeam: "+ Add team",
    cardUpload: "Upload player card",
    cardRemove: "Remove card",
    cardInvalid: "Choose an image up to 8 MB.",
    cardUploadError: "Could not upload the card: {0}",
    removeTeam: "Remove team",
    teamNamePlaceholder: "Team name",
    teamLogoPlaceholder: "Logo URL (https, optional)",
    teamStatsVersus: "Compare with",
    newsDialogTitle: "Publish league news",
    newsDialogDesc: "Add a photo and a story for everyone to see",
    headline: "Headline",
    description: "Description",
    photoLabel: "Photo (JPEG, PNG or WebP, up to 5 MB)",
    publishNews: "Publish news",
    authDialogTitle: "Sign in to your league",
    authDialogDesc: "Use an account created in Supabase",
    email: "Email",
    password: "Password",
    signIn: "Sign in",
    favorite: "Favorite: {0}",
    evenMatchup: "Even matchup",
    noData: "No data",
    noMatches: "No matches yet",
    newsDeleted: "News deleted",
    matchDeleted: "Match deleted",
    matchDeleteError: "Could not delete match: {0}",
    deleteNews: "Delete",
    favoriteLeads: "{0} leads the championship race.",
    newsPublished: "League news published",
    newsUploadError: "Could not upload the photo: {0}",
    newsInsertError: "Could not publish news: {0}",
    newsLoadError: "Could not load league news: {0}",
    newsDeleteError: "Could not delete news: {0}",
    matchSaveError: "Could not save the result: {0}",
    teamSaveError: "Could not save team names: {0}",
    seasonStartError: "Could not start new season: {0}",
    seasonLimit: "Season limit reached (36 matches). Start a new season to continue.",
    seasonStart: "New season started!",
    seasonStartBlocked: "Cannot start new season before 36 matches are played.",
    signInRequired: "Sign in to start a new season.",
    signInNews: "Sign in before publishing league news.",
    fillNews: "Enter a headline and description, and choose a photo.",
    invalidImage: "Choose a JPEG, PNG or WebP image up to 5 MB.",
    syncError: "Sync error",
    loadError: "Loading error",
    signInError: "Sign-in error",
    syncErrorToast: "Could not refresh the league: {0}",
    loadErrorToast: "Could not load the league: {0}",
    signOutError: "Could not sign out: {0}",
    signInCheckError: "Could not check sign-in: {0}",
    setupRequired: "Supabase setup required",
    signedOut: "Signed out",
    loadingLeague: "Loading league…",
    setup: "Setup",
    retry: "Retry",
    syncingPeriodically: "Syncing periodically",
    refreshNewsLabel: "News deleted",
    teamsInvalid: "The database has invalid team names. Check the league_settings table.",
    matchesInvalid: "The database contains a match with invalid data.",
    teamsSame: "Team names must be different.",
    teamsRequired: "Enter a name for every team.",
    teamsDiff: "Select two different teams.",
    scoreRange: "Enter a score between 0 and 99 goals.",
    statsWhole: "Enter whole numbers for match statistics.",
    sotLimit: "Shots on target cannot exceed total shots.",
    possessionRule: "Enter possession for both teams and make the total 100%.",
    matchSaved: "Match result saved to the server",
    teamsSaved: "Team names saved to the server",
    signInFailed: "Sign-in failed: {0}",
    imageSizeLimit: "The image must be 5 MB or smaller.",
    signInNews: "Sign in before publishing league news.",
    fillNews: "Enter a headline and description, and choose a photo.",
    invalidImageFile: "Choose a JPEG, PNG or WebP image up to 5 MB.",
    signOutError: "Could not sign out: {0}",
    signOut: "Sign out",
    seasonComplete: "Season Complete",
    addMatchBtn: "Add match",
    noMatchesPlayed: "No matches played yet. Add the first result to get your league started!",
    lineupsButton: "Lineups",
    lineupTitle: "Lineup settings",
    lineupNoSnapshot: "No lineup was saved with this match",
    matchLineupTitle: "Match lineups",
    lineupMatchBtn: "Lineups",
    matchTabResult: "Result",
    matchTabLineups: "Confirm lineups",
    lineupConfirmTitle: "Confirm lineups",
    lineupConfirmDesc: "The current lineups will be saved with this match so you can look back at them later.",
    lineupConfirmCheck: "I confirm both lineups for this match",
    lineupConfirmRequired: "Confirm the lineups on the “Confirm lineups” tab first.",
    lineupOpen: "Open lineup",
    lineupStartersCount: "{0}/11 starters",
    lineupAvg: "Avg OVR",
    lineupViewDesc: "Current formation and squad",
    lineupAsOf: "Current lineup as of {0}",
    lineupClose: "Close",
    lineupEditMode: "⚙ Edit lineup",
    lineupBack: "Back to lineup",
    lineupDesc: "Formation, players and substitutes",
    lineupFormation: "Formation",
    lineupCustom: "Custom",
    lineupPitchHint: "Drag players on the pitch to place them freely",
    lineupStarters: "Starting XI",
    lineupSubs: "Substitutes",
    lineupAddPlayer: "Add player",
    lineupName: "Name",
    lineupNumber: "No.",
    lineupRating: "OVR",
    lineupSub: "Sub",
    lineupRemove: "Remove",
    lineupSave: "Save lineup",
    lineupSaved: "Lineup saved",
    lineupSaveError: "Could not save the lineup: {0}. Run supabase-migration-lineups.sql.",
    lineupReset: "Reset",
    lineupMax: "A squad can have up to 30 players",
    lineupNeedSignIn: "Sign in to open lineups",
    lineupEmpty: "No players",
    teamLineup: "Team lineup",
    lineupPlayerDefault: "Player {0}",
    noNews: "No news yet. Check back soon for league updates."
  },
  ru: {
    authStatus: "Подключение к базе данных…",
    authButton: "Войти",
    eyebrow: "eFootball Лига",
    editTeams: "Команды",
    dbLink: "База карточек",
    globalLink: "Аналитика команд",
    achievementsLink: "Достижения",
    communityEyebrow: "СООБЩЕСТВО ЛИГИ",
    communityTitle: "Сообщество",
    communityDesc: "Ваш профиль, достижения и друзья",
    communitySignIn: "Войдите, чтобы увидеть свой профиль, достижения и друзей.",
    messagesLink: "Мои сообщения",
    messagesDesc: "Личные беседы с друзьями",
    friendsPageDesc: "Ваш круг футбольных друзей",
    chooseConversation: "Выберите друга, чтобы начать переписку.",
    messagePlaceholder: "Напишите сообщение…",
    sendMessage: "Отправить",
    noMessagesYet: "Сообщений пока нет. Напишите первым!",
    messagesNeedMigration: "Сообщения ещё не настроены. Выполните SQL-миграцию сообщений.",
    messagesEmptyFriends: "Добавьте друзей, чтобы начать переписку.",
    unreadMessages: "Непрочитанные сообщения",
    backToLeague: "← Назад в лигу",
    achievementDetails: "О ДОСТИЖЕНИИ",
    progressLabel: "Прогресс",
    achievementTier: "Уровень",
    bronzeTier: "Бронза",
    silverTier: "Серебро",
    goldTier: "Золото",
    unlockedLabel: "Получено",
    notUnlockedLabel: "В процессе",
    editPage: "Редактировать страницу",
    editPageDesc: "Сделайте эту страницу по-настоящему своей.",
    profileBack: "Назад к моей странице",
    achievementPageDesc: "Получено достижений: {0} из {1}. Нажмите на значок, чтобы узнать условие.",
    friendsLink: "Мои друзья",
    friendsDesc: "Откройте профиль игрока",
    youTag: "Вы",
    friendRecord: "Матчей {0} · В {1} · Н {2} · П {3} · {4} очк.",
    friendBadges: "Достижения {0}/{1}",
    editProfile: "Редактировать страницу",
    avatarUpload: "Аватарка",
    pinBadges: "Закреплённые значки",
    pinLimit: "Можно закрепить до 3 значков",
    noBadgesYet: "Получите достижения, чтобы закрепить их здесь.",
    favoritePlayer: "Любимый игрок",
    noFavorite: "— не выбран —",
    saveProfile: "Сохранить профиль",
    profileSaved: "Профиль сохранён",
    nicknameFailed: "Этот никнейм занят или некорректен",
    friendsTabFriends: "Друзья",
    friendsTabRequests: "Заявки",
    friendsTabSearch: "Поиск игроков",
    friendSearchPlaceholder: "Никнейм",
    friendSearchButton: "Найти",
    friendsEmpty: "Друзей пока нет. Найдите игроков во вкладке «Поиск игроков».",
    requestsEmpty: "Заявок нет.",
    searchHint: "Введите минимум 2 символа никнейма.",
    searchEmpty: "Никого не найдено.",
    friendsNeedSignIn: "Войдите, чтобы пользоваться друзьями",
    addFriend: "Добавить",
    requestSent: "Заявка отправлена",
    acceptFriend: "Принять",
    declineFriend: "Отклонить",
    cancelRequest: "Отменить",
    removeFriend: "Удалить",
    alreadyFriend: "В друзьях",
    incomingTag: "хочет дружить",
    myProfile: "Моя страница",
    nicknameLabel: "Никнейм",
    saveNickname: "Сохранить",
    nicknameSaved: "Никнейм сохранён",
    profileLocked: "Команда и достижения видны только друзьям. Отправьте заявку, чтобы увидеть их.",
    noTeamLinked: "Команда не привязана",
    mustBeInMatch: "Вы можете вносить только матчи своей команды",
    needTeam: "Этот аккаунт не привязан к команде",
    proposalsTitle: "Результаты матчей, ожидающие подтверждения",
    proposalSent: "Результат отправлен. Он появится после подтверждения от {0}.",
    proposalWaiting: "Ждём подтверждения от {0}: {1}",
    proposalIncoming: "{0} вносит результат: {1}",
    proposalConfirm: "Подтвердить",
    proposalReject: "Отклонить",
    proposalCancel: "Отменить",
    proposalConfirmed: "Результат подтверждён и опубликован",
    proposalRejected: "Результат отклонён",
    onlyOwnTeam: "Вы можете редактировать только свою команду",
    siteMenu: "Разделы",
    addMatch: "Добавить матч",
    championshipTitle: "Гонка за чемпионством",
    liveSimulation: "ЖИВАЯ СИМУЛЯЦИЯ",
    raceDisclaimer: "Оценка по результатам сезона с моделируемой динамикой. Это не шансы во время матча.",
    raceChartLabel: "Кардиограмма шансов на чемпионство в реальном времени",
    chance: "Шанс",
    newSeason: "Новый сезон",
    championships: "Чемпионства",
    headToHead: "История встреч",
    teamStatsTitle: "Статистика команды",
    teamStatsDescription: "Подробные показатели за сезон или за все сезоны",
    teamStatsCompare: "Сравнение команд",
    teamStatsSingleMode: "Одна команда",
    teamStatsCompareMode: "Сравнить команды",
    teamStatsView: "Режим статистики",
    teamStatsBetter: "Лидер",
    teamStatsTie: "Равенство",
    teamStatsInsufficientData: "Недостаточно данных для сравнения",
    teamStatsTeam: "Команда",
    teamStatsPeriod: "Период",
    allSeasons: "Все сезоны",
    seasonOption: "Сезон {0}",
    statsRecord: "{0} матчей · {1} В · {2} Н · {3} П",
    statPlayed: "Сыграно матчей",
    statWinRate: "Процент побед",
    statHomeWinRate: "Процент побед дома",
    statAwayWinRate: "Процент побед в гостях",
    statLocationWinsOutOf: "{0} побед из {1} матчей",
    statGoals: "Забито голов",
    statGoalsPerMatch: "Голов за матч",
    statPossession: "Среднее владение",
    statPasses: "Среднее количество пасов",
    statShots: "Среднее количество ударов",
    statShotsOnTarget: "Удары в створ в среднем",
    statShotConversion: "Реализация ударов",
    statAllMatches: "Все матчи периода",
    statWinsOutOf: "{0} побед из {1} матчей",
    statRecordedIn: "Статистика есть в {0} из {1} матчей",
    teamStatsFootnote: "Средние значения учитывают только матчи, где показатель был записан. Реализация = голы в матчах со статистикой ударов / общее число записанных ударов.",
    noTeamStats: "За выбранный период матчей пока нет.",
    winsLabel: "П",
    drawsLabel: "Н",
    lossesLabel: "П",
    goalsLabel: "Голы: {0} — {1}",
    totalMatches: "Всего матчей: {0}",
    tableTitle: "Таблица",
    updatedAfterMatch: "ОБНОВЛЯЕТСЯ ПОСЛЕ КАЖДОГО МАТЧА",
    halloween: "СЧАСТЛИВОГО ХЭЛЛОУИНА",
    colPos: "#",
    colTeam: "Команда",
    colForm: "Форма",
    colPlayed: "И",
    colW: "В",
    colD: "Н",
    colL: "П",
    colGD: "РМ",
    colPts: "О",
    tableFooter: "Форма: последние 5 матчей (зелёный — победа · серый — ничья · красный — поражение) · И — сыграно · В — победы · Н — ничьи · П — поражения · РМ — разница мячей · О — очки",
    latestMatches: "Последние матчи",
    tipText: "Победа приносит <strong>3 очка</strong>; ничья приносит <strong>1</strong>. Войдите, чтобы сохранять результаты в общей лиге и синхронизировать их.",
    leagueNews: "Новости лиги",
    newsSubtitle: "Истории, фото и обновления из лиги",
    addNews: "Добавить новость",
    loadingNews: "Загрузка новостей…",
    footer1: "eFOOTBALL ЛИГА · ВАШ ЧЕМПИОНАТ",
    footer2: "Каждый матч имеет значение.",
    upcomingMatchTitle: "Предстоящий матч",
    upcomingMatchSubtitle: "Шансы на матч рассчитываются отдельно от чемпионства",
    upcomingMatchDisclaimer: "История матчей и симуляция колебаний. Это не данные матча в реальном времени.",
    upcomingMatchSamples: "Учтено предыдущих матчей: {0}",
    forecastFiveTitle: "Прогноз на следующие 5 матчей",
    forecastFiveSubtitle: "Прогноз по результативности и динамике формы за последние 10 матчей",
    forecastDataModel: "РАСЧЁТ ПО ДАННЫМ",
    forecastMatch: "Матч {0}",
    forecastHomeWin: "Хозяева",
    forecastAwayWin: "Гости",
    forecastDraw: "Ничья",
    forecastHomeLabel: "Д",
    forecastAwayLabel: "Г",
    forecastScore: "Прогноз счёта",
    forecastDataNote: "Каждый прогноз использует последние 10 матчей. Динамика формы учитывается отдельно для каждого горизонта.",
    forecastNoHistory: "Истории матчей пока нет.",
    forecastNeedTen: "Прогноз появится после 10 матчей. Сейчас записано: {0}.",
    forecastUnavailable: "Матчей с таким распределением ролей хозяев и гостей не было — данных для прогноза недостаточно.",
    forecastDrawPick: "Наиболее вероятный исход — ничья",
    forecastWinnerPick: "Наиболее вероятная победа команды {0}",
    forecastUndecided: "Нет однозначного прогноза исхода",
    upcomingMatchChartLabel: "Вероятности исхода матча {0} и {1}",
    versus: "ПРОТИВ",
    lastMatchTitle: "Последний матч",
    noLastMatch: "Матчи ещё не сыграны.",
    matchHistoryShow: "Вся история матчей ({0})",
    matchHistoryHide: "Показать последние матчи",
    noMatchStats: "Статистика этого матча не записана.",
    statEdge: "Статистическое преимущество: {0}",
    statsEven: "По статистике равенство",
    matchDialogTitle: "Добавить результат матча",
    matchDialogDesc: "Введите счёт сыгранного матча",
    predictionDraw: "Ничья",
    predictionNoHistory: "Предыдущих матчей нет — начальная оценка поровну",
    homeTeam: "Хозяева",
    awayTeam: "Гости",
    swapTeams: "Поменять хозяев и гостей местами",
    goals: "Голы",
    matchStats: "Статистика матча",
    statsOptional: "Оставьте любую статистику пустой, если у вас её нет.",
    statistic: "Статистика",
    shots: "Удары",
    shotsOnTarget: "Удары в створ",
    possession: "Владение мячом (%)",
    passes: "Пасы",
    cancel: "Отмена",
    saveResult: "Сохранить результат",
    teamsDialogTitle: "Ваши команды",
    teamsDialogDesc: "Выберите названия для вашей лиги",
    addTeam: "+ Добавить команду",
    cardUpload: "Загрузить карту игрока",
    cardRemove: "Убрать карту",
    cardInvalid: "Выберите изображение до 8 МБ.",
    cardUploadError: "Не удалось загрузить карту: {0}",
    removeTeam: "Удалить команду",
    teamNamePlaceholder: "Название команды",
    teamLogoPlaceholder: "URL логотипа (https, необязательно)",
    teamStatsVersus: "Сравнить с",
    newsDialogTitle: "Опубликовать новость лиги",
    newsDialogDesc: "Добавьте фото и историю для всех",
    headline: "Заголовок",
    description: "Описание",
    photoLabel: "Фото (JPEG, PNG или WebP, до 5 МБ)",
    publishNews: "Опубликовать",
    authDialogTitle: "Войти в свою лигу",
    authDialogDesc: "Используйте аккаунт, созданный в Supabase",
    email: "Электронная почта",
    password: "Пароль",
    signIn: "Войти",
    favorite: "Фаворит: {0}",
    evenMatchup: "Равные шансы",
    noData: "Нет данных",
    noMatches: "Ещё нет матчей",
    newsDeleted: "Новость удалена",
    matchDeleted: "Матч удалён",
    matchDeleteError: "Не удалось удалить матч: {0}",
    newsPublished: "Новость лиги опубликована",
    newsUploadError: "Не удалось загрузить фото: {0}",
    newsInsertError: "Не удалось опубликовать новость: {0}",
    newsLoadError: "Не удалось загрузить новости лиги: {0}",
    newsDeleteError: "Не удалось удалить новость: {0}",
    matchSaveError: "Не удалось сохранить результат: {0}",
    teamSaveError: "Не удалось сохранить названия команд: {0}",
    seasonStartError: "Не удалось начать новый сезон: {0}",
    seasonLimit: "Лимит сезона достигнут (36 матчей). Начните новый сезон для продолжения.",
    seasonStart: "Новый сезон начат!",
    seasonStartBlocked: "Нельзя начать новый сезон до сыграния 36 матчей.",
    signInRequired: "Войдите, чтобы начать новый сезон.",
    signInNews: "Войдите перед публикацией новости лиги.",
    fillNews: "Введите заголовок и описание, и выберите фото.",
    invalidImage: "Выберите фото JPEG, PNG или WebP до 5 МБ.",
    syncError: "Ошибка синхронизации",
    loadError: "Ошибка загрузки",
    signInError: "Ошибка входа",
    syncErrorToast: "Не удалось обновить лигу: {0}",
    loadErrorToast: "Не удалось загрузить лигу: {0}",
    signOutError: "Не удалось выйти: {0}",
    signOut: "Выйти",
    signInCheckError: "Не удалось проверить вход: {0}",
    setupRequired: "Требуется настройка Supabase",
    signedOut: "Вы вышли",
    loadingLeague: "Загрузка лиги…",
    setup: "Настройка",
    retry: "Повторить",
    syncingPeriodically: "Синхронизация…",
    refreshNewsLabel: "Новость удалена",
    teamsInvalid: "В базе данных неверные названия команд. Проверьте таблицу league_settings.",
    matchesInvalid: "В базе данных содержится матч с неверными данными.",
    teamsSame: "Названия команд должны быть разными.",
    teamsRequired: "Введите название для каждой команды.",
    teamsDiff: "Выберите две разные команды.",
    scoreRange: "Введите счёт от 0 до 99 голов.",
    statsWhole: "Введите целые числа для статистики матча.",
    sotLimit: "Удары в створ не могут превышать общее количество ударов.",
    possessionRule: "Введите владение для обеих команд и сделайте сумму 100%.",
    matchSaved: "Результат матча сохранён на сервер",
    teamsSaved: "Названия команд сохранены на сервер",
    signInFailed: "Ошибка входа: {0}",
    imageSizeLimit: "Изображение должно быть не более 5 МБ.",
    signInNews: "Войдите перед публикацией новости лиги.",
    fillNews: "Введите заголовок и описание, и выберите фото.",
    invalidImageFile: "Выберите фото JPEG, PNG или WebP до 5 МБ.",
    deleteNews: "Удалить",
    favoriteLeads: "{0} лидирует в гонке за чемпионством",
    seasonComplete: "Сезон завершён",
    addMatchBtn: "Добавить матч",
    noMatchesPlayed: "Ещё нет матчей. Добавьте первый результат, чтобы начать лигу!",
    lineupsButton: "Составы",
    lineupTitle: "Настройки состава",
    lineupNoSnapshot: "Для этого матча состав не сохранялся",
    matchLineupTitle: "Составы на матч",
    lineupMatchBtn: "Составы",
    matchTabResult: "Результат",
    matchTabLineups: "Подтвердить состав",
    lineupConfirmTitle: "Подтверждение составов",
    lineupConfirmDesc: "Текущие составы сохранятся вместе с матчем, чтобы потом можно было посмотреть, какими они были.",
    lineupConfirmCheck: "Подтверждаю составы обеих команд на этот матч",
    lineupConfirmRequired: "Сначала подтвердите составы на вкладке «Подтвердить состав».",
    lineupOpen: "Открыть состав",
    lineupStartersCount: "{0}/11 в старте",
    lineupAvg: "Средний рейт.",
    lineupViewDesc: "Актуальная схема и состав",
    lineupAsOf: "Актуальный состав на {0}",
    lineupClose: "Закрыть",
    lineupEditMode: "⚙ Редактировать состав",
    lineupBack: "К составу",
    lineupDesc: "Схема, игроки и запасные",
    lineupFormation: "Схема",
    lineupCustom: "Своя",
    lineupPitchHint: "Перетаскивайте игроков по полю, чтобы расставить их свободно",
    lineupStarters: "Основной состав",
    lineupSubs: "Запасные",
    lineupAddPlayer: "Добавить игрока",
    lineupName: "Имя",
    lineupNumber: "№",
    lineupRating: "Рейт.",
    lineupSub: "Запас",
    lineupRemove: "Удалить",
    lineupSave: "Сохранить состав",
    lineupSaved: "Состав сохранён",
    lineupSaveError: "Не удалось сохранить состав: {0}. Выполните supabase-migration-lineups.sql.",
    lineupReset: "Сбросить",
    lineupMax: "В составе может быть до 30 игроков",
    lineupNeedSignIn: "Войдите, чтобы открыть составы",
    lineupEmpty: "Нет игроков",
    teamLineup: "Состав команды",
    lineupPlayerDefault: "Игрок {0}",
    noNews: "Пока новостей нет. Заглядывайте позже за обновлениями лиги."
  }
};
const TEAM_PHOTOS = [
  "assets/img/logo-promashkov.webp",
  "assets/img/logo-lionslav.webp"
];
const MAX_TEAMS = 20;
const getTeamPhoto = index => TEAM_PHOTOS[index] || state.teams[index]?.logo || null;
const teamTone = index => index === 0 ? "one" : index === 1 ? "two" : "other";
const getTeamInitials = name => String(name || "?").trim().split(/\s+/)
  .map(word => word[0]).join("").slice(0, 2).toUpperCase() || "?";
const configReady = SUPABASE_URL.startsWith("https://") &&
  SUPABASE_ANON_KEY.length > 20 &&
  !SUPABASE_URL.includes("YOUR-PROJECT") &&
  !SUPABASE_ANON_KEY.includes("YOUR-ANON-KEY");
const supabase = configReady ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

let state = structuredClone(initialState);
let session = null;
let dataReady = false;
let myTeamIndex = null;
let myProfile = null;
let pendingProposals = [];
let sessionGeneration = 0;
let realtimeChannel = null;
let newsRealtimeChannel = null;
let pollTimer = null;
let toastTimer;
let newsPreviewUrl = null;
let newsItems = [];
let currentSeason = 1;
let currentLang = localStorage.getItem("leagueLang") || "en";
let showAllMatches = false;
let teamStatsMode = "single";

const standingsBody = document.getElementById("standingsBody");
const matchList = document.getElementById("matchList");
const matchDialog = document.getElementById("matchDialog");
const teamsDialog = document.getElementById("teamsDialog");
const authDialog = document.getElementById("authDialog");
const authButton = document.getElementById("authButton");
const authStatus = document.getElementById("authStatus");
const matchButton = document.getElementById("addMatchButton");
const editTeamsButton = document.getElementById("editTeamsButton");
const addNewsButton = document.getElementById("addNewsButton");
const newsDialog = document.getElementById("newsDialog");
const newsViewDialog = document.getElementById("newsViewDialog");
const newsList = document.getElementById("newsList");
const raceChartCanvas = document.getElementById("raceChart");
const matchOddsChartCanvas = document.getElementById("matchOddsChart");
const seasonInfo = document.getElementById("seasonInfo");
const seasonBadge = document.getElementById("seasonBadge");
const matchCounter = document.getElementById("matchCounter");
const championshipList = document.getElementById("championshipList");
const h2hList = document.getElementById("h2hList");
const newSeasonBtn = document.getElementById("newSeasonBtn");

let championshipHistory = [];
let championshipRace = null;
let championshipBaseOdds = 50;
let liveOddsOne = 50;
let targetOddsOne = 50;
let nextOddsTick = 0;
let nextHistorySample = 0;
let nextRaceDraw = 0;
let lastRaceFrame = 0;
let nextOddsDelay = 1000;
let upcomingMatchOdds = null;
let upcomingBaseProbabilities = [1 / 3, 1 / 3, 1 / 3];
let liveUpcomingProbabilities = [1 / 3, 1 / 3, 1 / 3];
let targetUpcomingProbabilities = [1 / 3, 1 / 3, 1 / 3];
let upcomingMatchHistory = [];
let upcomingMatchSignature = "";
let nextUpcomingOddsTick = 0;
let nextUpcomingSample = 0;
let nextUpcomingDraw = 0;
let lastUpcomingFrame = 0;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function render() {
  renderStandings();
  renderMatches();
  renderLastMatch();
  renderNews();
  renderChampionshipRace();
  renderUpcomingMatch();
  renderFiveMatchForecast();
  renderSeasonInfo();
  renderTeamStats();
}

const RELEASE_NEWS = [
  {
    id: "release-carddb",
    created_at: "2026-11-03T16:00:00+02:00",
    image: "assets/base/Yamal.png",
    imagePos: "50% 22%",
    en: {
      title: "Card Database is live: Kane 110, Mbapp\u00e9 108, Yamal 108",
      summary: "A new **Card Database** page with eFootball cards, full stats and **level boosts**. First cards: **Kane, Mbapp\u00e9, Yamal**.",
      body: [
        "**What's new**",
        "• **New page** — open **Card database** in the top menu of the home page.",
        "• **First cards** — **Harry Kane 110**, **Kylian Mbapp\u00e9 108** and **Lamine Yamal 108**, shown as full eFootball cards.",
        "• **Full player stats** — click a card to see **Attacking, Defending and Strength** attributes, colour-coded by value (**90+ cyan**, 80+ green, 70+ yellow, below 70 red).",
        "• **Level boosts** — upgraded attributes show a green **+N** badge, just like in the game.",
        "• **Search and filters** — search by name, club or nation, filter by **position**, sort by rating, name or newest, and switch between **Cards** and **Table** view.",
        "• **Always growing** — new cards are added with updates, so check back often."
      ].join("\n")
    },
    ru: {
      title: "База карточек: Кейн 110, Мбаппе 108, Ямаль 108",
      summary: "Новая страница **База карточек** eFootball с полными статами и **прокачкой уровней**. Первые карточки: **Кейн, Мбаппе, Ямаль**.",
      body: [
        "**Что нового**",
        "• **Новая страница** — откройте **«База карточек»** в верхнем меню главной страницы.",
        "• **Первые карточки** — **Гарри Кейн 110**, **Килиан Мбаппе 108** и **Ламин Ямаль 108** в виде полноценных карточек eFootball.",
        "• **Полные показатели** — нажмите на карточку, чтобы увидеть параметры **Атаки, Защиты и Силы** с цветом по значению (**90+ бирюзовый**, 80+ зелёный, 70+ жёлтый, ниже 70 красный).",
        "• **Прокачка уровней** — улучшенные параметры отмечены зелёным значком **+N**, как в игре.",
        "• **Поиск и фильтры** — поиск по имени, клубу или стране, фильтр по **позиции**, сортировка по рейтингу, имени или новизне, переключение **Карточки / Таблица**.",
        "• **База растёт** — новые карточки добавляются с обновлениями, заглядывайте почаще."
      ].join("\n")
    }
  },
  {
    id: "release-squads",
    created_at: "2026-11-03T15:00:00+02:00",
    image: "assets/img/squad.jpeg",
    en: {
      title: "Team lineups are now on the home page",
      summary: "You can now **view the squad of every team** right from the home page: formation, starting XI and substitutes.",
      body: [
        "**What's new**",
        "• **Open any team's lineup** — click the **team name in the standings table** on the home page and its current **formation, starting XI and substitutes** open in one window.",
        "• **Pitch view** — all starters are shown on the pitch in their positions, colour-coded by line: **goalkeeper, defenders, midfielders, attackers**.",
        "• **Player details** — every player has a **number, position and OVR rating**, and you can see the **average OVR** of the team.",
        "• **Lineups for every match** — when a match is saved, **both lineups are saved with it**. Open the **Lineups** button in the match history to look back at who played.",
        "• **Edit mode** — signed-in players can change the formation, drag players around the pitch, add players and move them between the starting XI and the bench."
      ].join("\n")
    },
    ru: {
      title: "Составы команд теперь на главной странице",
      summary: "Теперь можно **смотреть составы всех команд** прямо на главной странице: схема, стартовая одиннадцать и запасные.",
      body: [
        "**Что нового**",
        "• **Состав любой команды** — нажмите на **название команды в таблице** на главной странице, и откроется текущая **схема, стартовый состав и запасные** в одном окне.",
        "• **Поле** — все игроки стартового состава стоят на поле на своих позициях, а цвет показывает линию: **вратарь, защитники, полузащитники, нападающие**.",
        "• **Данные игроков** — у каждого игрока есть **номер, позиция и рейтинг OVR**, а также видно **средний OVR** команды.",
        "• **Составы для каждого матча** — при сохранении матча **оба состава сохраняются вместе с ним**. Нажмите кнопку **«Составы»** в истории матчей, чтобы посмотреть, кто играл.",
        "• **Режим редактирования** — вошедшие игроки могут менять схему, перетаскивать игроков по полю, добавлять игроков и переносить их между основой и скамейкой."
      ].join("\n")
    }
  },
  {
    id: "release-display",
    created_at: "2026-11-03T12:00:00+02:00",
    image: "assets/img/second-background.jpg",
    en: {
      title: "Display update: Halloween theme, new banner and coins",
      summary: "A **Halloween theme** with a spooky look, a **new league banner**, a bloody running line and **coins in your profile**.",
      body: [
        "**What's new on the site**",
        "• **Halloween theme** — press the pumpkin button next to the language switch. The whole site turns into a dark, spooky night: glowing orange accents, drifting fog, flying bats, rising embers, lightning flashes and a pulsing vignette. Headings switch to a horror font. Press it again to go back. **Your choice is remembered.**",
        "• **New league banner** — a night scene with a huge glowing moon, bats, fog, a cobweb, blinking red eyes in the dark and embers. The title is bright and readable.",
        "• **Bloody running line** — at the bottom of the banner **HAPPY HALLOWEEN** runs non-stop with dripping blood. It switches to Russian together with the site language.",
        "• **Coins in your profile** — after you sign in, a gold badge with **your coin balance** appears next to your email in the top bar."
      ].join("\n")
    },
    ru: {
      title: "Обновление дизайна: Хэллоуин-тема, новый баннер и монеты",
      summary: "**Хэллоуин-тема** в жутком стиле, **новый баннер лиги**, бегущая строка с кровью и **монеты в профиле**.",
      body: [
        "**Что нового на сайте**",
        "• **Хэллоуин-тема** — нажмите кнопку-тыкву рядом с переключателем языка. Весь сайт превращается в тёмную жуткую ночь: светящиеся оранжевые акценты, плывущий туман, летающие летучие мыши, поднимающиеся угольки, вспышки молний и пульсирующая виньетка. Заголовки меняют шрифт на хоррор. Повторное нажатие возвращает обычный вид. **Ваш выбор запоминается.**",
        "• **Новый баннер лиги** — ночная сцена с огромной светящейся луной, летучими мышами, туманом, паутиной, моргающими красными глазами в темноте и углями. Заголовок яркий и читаемый.",
        "• **Бегущая строка с кровью** — внизу баннера без остановки бежит **СЧАСТЛИВОГО ХЭЛЛОУИНА** с капающей кровью. Язык меняется вместе с языком сайта.",
        "• **Монеты в профиле** — после входа в аккаунт в верхней панели рядом с почтой появляется золотой значок с **вашим количеством монет**."
      ].join("\n")
    }
  },
];

// Renders "**bold**" segments as <strong> without using innerHTML.
function appendRichInline(parent, text) {
  text.split("**").forEach((part, index) => {
    if (!part) return;
    if (index % 2 === 1) {
      const strong = document.createElement("strong");
      strong.textContent = part;
      parent.append(strong);
    } else {
      parent.append(part);
    }
  });
}

function renderRichBody(container, body) {
  container.replaceChildren();
  let list = null;
  body.split("\n").forEach(line => {
    if (line.startsWith("• ")) {
      if (!list) {
        list = document.createElement("ul");
        container.append(list);
      }
      const li = document.createElement("li");
      appendRichInline(li, line.slice(2));
      list.append(li);
      return;
    }
    list = null;
    if (!line) return;
    const p = document.createElement("p");
    appendRichInline(p, line);
    container.append(p);
  });
}

function releaseNewsCard(item) {
  const copy = item[currentLang] || item.en;
  const card = document.createElement("article");
  card.className = "news-card news-card-release";
  const image = document.createElement("img");
  image.className = "news-card-image";
  image.src = item.image;
  if (item.imagePos) image.style.objectPosition = item.imagePos;
  image.alt = copy.title;
  image.loading = "lazy";
  const content = document.createElement("div");
  content.className = "news-card-content";
  const date = document.createElement("p");
  date.className = "news-card-date";
  date.textContent = new Date(item.created_at).toLocaleDateString(currentLang === "ru" ? "ru-RU" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
  const title = document.createElement("h3");
  title.className = "news-card-title";
  title.textContent = copy.title;
  const description = document.createElement("p");
  description.className = "news-card-description";
  appendRichInline(description, copy.summary);
  content.append(date, title, description);
  card.append(image, content);
  card.addEventListener("click", () => openNewsView({ ...item, title: copy.title, body: copy.body }));
  return card;
}

function renderNews() {
  newsList.replaceChildren();
  RELEASE_NEWS.forEach(item => newsList.append(releaseNewsCard(item)));
  newsItems.forEach(item => {
    const card = document.createElement("article");
    card.className = "news-card";
    const image = document.createElement("img");
    image.className = "news-card-image";
    image.src = supabase.storage.from("news-images").getPublicUrl(item.image_path).data.publicUrl;
    image.alt = item.title;
    image.loading = "lazy";
    image.addEventListener("error", () => {
      image.alt = `Photo unavailable: ${item.title}`;
      image.classList.add("news-image-unavailable");
    }, { once: true });
    const content = document.createElement("div");
    content.className = "news-card-content";
    const date = document.createElement("p");
    date.className = "news-card-date";
    const parsedDate = new Date(item.created_at);
    date.textContent = Number.isNaN(parsedDate.getTime()) ? "" :
      parsedDate.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    const title = document.createElement("h3");
    title.className = "news-card-title";
    title.textContent = item.title;
    const description = document.createElement("p");
    description.className = "news-card-description";
    description.textContent = item.description;
    content.append(date, title, description);
    card.append(image, content);
    const deleteButton = document.createElement("button");
    deleteButton.className = "button button-quiet news-delete";
    deleteButton.textContent = t("deleteNews");
    deleteButton.addEventListener("click", () => {
      if (confirm(`Удалить новость "${item.title}"?`)) {
        void deleteNews(item.id, item.image_path);
      }
    });
    card.append(deleteButton);
    card.addEventListener("click", event => {
      if (event.target.closest(".news-delete")) return;
      void openNewsView(item);
    });
    newsList.append(card);
  });
}

async function refreshNews() {
  try {
    const { data, error } = await supabase.from("league_news")
      .select("id, title, description, image_path, created_at")
      .order("created_at", { ascending: false });
    if (error) throw error;
    newsItems = data;
    renderNews();
  } catch (error) {
    console.error("Failed to load league news:", error);
    const message = document.createElement("p");
    message.className = "news-empty";
    message.textContent = t("newsLoadError", error.message);
    newsList.replaceChildren(message);
  }
}

async function deleteNews(id, imagePath) {
  try {
    const { error } = await supabase.from("league_news").delete().eq("id", id);
    if (error) throw error;
    if (imagePath) {
      const { error: storageError } = await supabase.storage.from("news-images").remove([imagePath]);
      if (storageError) console.error("Could not remove the news photo:", storageError);
    }
    await refreshNews();
    showToast(t("newsDeleted"));
  } catch (error) {
    console.error("Failed to delete league news:", error);
    showToast(t("newsDeleteError", error.message));
  }
}

function openNewsView(item) {
  const titleEl = document.getElementById("newsViewTitle");
  const descEl = document.getElementById("newsViewDescription");
  const dateEl = document.getElementById("newsViewDialog").querySelector(".news-view-date");
  const imgEl = document.getElementById("newsViewImage");
  titleEl.textContent = item.title;
  if (item.body) renderRichBody(descEl, item.body);
  else descEl.replaceChildren(item.description);
  const parsedDate = new Date(item.created_at);
  dateEl.textContent = Number.isNaN(parsedDate.getTime()) ? "" :
    parsedDate.toLocaleDateString(currentLang === "ru" ? "ru-RU" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
  imgEl.style.objectPosition = item.imagePos || "";
  imgEl.src = item.image || supabase.storage.from("news-images").getPublicUrl(item.image_path).data.publicUrl;
  imgEl.alt = item.title;
  newsViewDialog.showModal();
}

function calculateChampionshipOdds() {
  const matches = state.matches;
  const leaders = getStandings().slice(0, 2).map(team => team.index);
  const teams = leaders.map(idx => {
    const name = state.teams[idx].name;
    let points = 0;
    let goalsFor = 0;
    let goalsAgainst = 0;
    let shotsFor = 0;
    let shotsAgainst = 0;
    let sotFor = 0;
    let sotAgainst = 0;
    let possSum = 0;
    let possCount = 0;
    let passesFor = 0;
    let passesAgainst = 0;
    let games = 0;
    matches.forEach(m => {
      if (m.home !== idx && m.away !== idx) return;
      const isHome = m.home === idx;
      const myGoals = isHome ? m.homeGoals : m.awayGoals;
      const oppGoals = isHome ? m.awayGoals : m.homeGoals;
      games++;
      if (myGoals > oppGoals) points += 3;
      else if (myGoals === oppGoals) points += 1;
      goalsFor += myGoals;
      goalsAgainst += oppGoals;
      const st = m.stats;
      if (st && st.home && st.away) {
        const mySt = isHome ? st.home : st.away;
        const oppSt = isHome ? st.away : st.home;
        if (mySt.shots != null) shotsFor += mySt.shots;
        if (oppSt.shots != null) shotsAgainst += oppSt.shots;
        if (mySt.shotsOnTarget != null) sotFor += mySt.shotsOnTarget;
        if (oppSt.shotsOnTarget != null) sotAgainst += oppSt.shotsOnTarget;
        if (mySt.possession != null && oppSt.possession != null) {
          possSum += mySt.possession;
          possCount++;
        }
        if (mySt.passes != null) passesFor += mySt.passes;
        if (oppSt.passes != null) passesAgainst += oppSt.passes;
      }
    });
    const gd = goalsFor - goalsAgainst;
    const gdPerGame = games ? gd / games : 0;
    const ptsPerGame = games ? points / games : 0;
    const shotDiff = shotsFor - shotsAgainst;
    const shotRatio = (shotsFor + shotsAgainst) ? shotsFor / (shotsFor + shotsAgainst) : 0.5;
    const sotRatio = (sotFor + sotAgainst) ? sotFor / (sotFor + sotAgainst) : 0.5;
    const avgPoss = possCount ? possSum / possCount : 50;
    const passRatio = (passesFor + passesAgainst) ? passesFor / (passesFor + passesAgainst) : 0.5;
    return { index: idx, name, points, games, gd, gdPerGame, ptsPerGame, shotDiff, shotRatio, sotRatio, avgPoss, passRatio };
  });
  const t0 = teams[0];
  const t1 = teams[1];
  const allGd = Math.max(Math.abs(t0.gdPerGame), Math.abs(t1.gdPerGame)) || 1;
  const allPts = Math.max(t0.ptsPerGame, t1.ptsPerGame) || 1;
  const score = t => {
    const ptsScore = (t.ptsPerGame / allPts) * 100;
    const gdScore = 50 + (t.gdPerGame / allGd) * 25;
    const shotScore = t.shotRatio * 100;
    const sotScore = t.sotRatio * 100;
    const possScore = t.avgPoss;
    const passScore = t.passRatio * 100;
    return ptsScore * 0.35 + gdScore * 0.20 + shotScore * 0.15 + sotScore * 0.10 + possScore * 0.10 + passScore * 0.10;
  };
  const s0 = score(t0);
  const s1 = score(t1);
  const total = s0 + s1;
  let oddsOne, oddsTwo;
  if (total === 0) {
    oddsOne = 50;
    oddsTwo = 50;
  } else {
    oddsOne = Math.round((s0 / total) * 100);
    oddsTwo = Math.round((s1 / total) * 100);
    if (oddsOne + oddsTwo !== 100) {
      if (s0 > s1) oddsOne = 100 - oddsTwo;
      else oddsTwo = 100 - oddsOne;
    }
  }
  let favorite = null;
  let statusText = "";
  if (matches.length === 0) {
    statusText = "No matches yet";
  } else {
    const diff = Math.abs(s0 - s1);
    if (s0 > s1 + 2) {
      favorite = t0;
      statusText = `Favorite: ${t0.name}`;
    } else if (s1 > s0 + 2) {
      favorite = t1;
      statusText = `Favorite: ${t1.name}`;
    } else {
      favorite = null;
      statusText = "Even matchup";
    }
  }
  return { one: { ...t0, score: s0 }, two: { ...t1, score: s1 }, oddsOne, oddsTwo, favorite, statusText };
}

function renderChampionshipRace() {
  const race = calculateChampionshipOdds();
  const raceGrid = document.getElementById("raceGrid");
  const raceStatus = document.getElementById("raceStatus");
  const raceFooter = document.getElementById("raceFooter");
  if (!race) {
    raceGrid.replaceChildren();
    raceStatus.textContent = t("noData");
    raceFooter.textContent = "";
    return;
  }
  championshipRace = race;
  championshipBaseOdds = race.oddsOne;
  if (championshipHistory.length === 0) {
    liveOddsOne = targetOddsOne = championshipBaseOdds;
    const now = performance.now();
    championshipHistory.push(
      { t: now - 60000, one: liveOddsOne, two: 100 - liveOddsOne },
      { t: now, one: liveOddsOne, two: 100 - liveOddsOne }
    );
  }
  raceChartCanvas.setAttribute("aria-label", t("raceChartLabel"));
  const badgeOne = document.getElementById("raceTeamOneBadge");
  const badgeTwo = document.getElementById("raceTeamTwoBadge");
  document.getElementById("raceTeamOneName").textContent = race.one.name;
  document.getElementById("raceTeamTwoName").textContent = race.two.name;
  document.getElementById("raceTeamOnePts").textContent = `${race.one.points} pts`;
  document.getElementById("raceTeamTwoPts").textContent = `${race.two.points} pts`;
  const photoOne = getTeamPhoto(race.one.index);
  const photoTwo = getTeamPhoto(race.two.index);
  setRaceBadge(badgeOne, race.one.index, photoOne);
  setRaceBadge(badgeTwo, race.two.index, photoTwo);
  updateRaceOddsDisplay();
}

function updateRaceOddsDisplay() {
  if (!championshipRace) return;
  const displayedOddsOne = Math.round(liveOddsOne * 10) / 10;
  const displayedOddsTwo = Math.round((100 - liveOddsOne) * 10) / 10;
  const displayedFavorite = state.matches.length === 0
    ? null
    : displayedOddsOne - displayedOddsTwo > 4
      ? championshipRace.one
      : displayedOddsTwo - displayedOddsOne > 4
        ? championshipRace.two
        : null;
  document.getElementById("raceTeamOneOdds").textContent = `${displayedOddsOne.toFixed(1)}%`;
  document.getElementById("raceTeamTwoOdds").textContent = `${displayedOddsTwo.toFixed(1)}%`;
  document.getElementById("raceTeamOneOdds").className =
    displayedFavorite?.index === championshipRace.one.index ? "race-odds-value favorite" : "race-odds-value";
  document.getElementById("raceTeamTwoOdds").className =
    displayedFavorite?.index === championshipRace.two.index ? "race-odds-value favorite" : "race-odds-value";
  const raceStatus = document.getElementById("raceStatus");
  const raceFooter = document.getElementById("raceFooter");
  raceStatus.textContent = state.matches.length === 0
    ? t("noMatches")
    : displayedFavorite
      ? t("favorite", displayedFavorite.name)
      : t("evenMatchup");
  if (displayedFavorite) {
    raceStatus.className = "race-status race-favorite";
    raceFooter.textContent = t("favoriteLeads", displayedFavorite.name);
  } else {
    raceStatus.className = "race-status";
    raceFooter.textContent = state.matches.length === 0 ? t("noMatches") : t("evenMatchup");
  }
}

function animateChampionshipRace(now) {
  const elapsed = lastRaceFrame ? Math.min(now - lastRaceFrame, 100) : 16;
  lastRaceFrame = now;
  if (championshipRace && state.matches.length > 0 && !prefersReducedMotion) {
    if (now >= nextOddsTick) {
      const currentOdds = liveOddsOne;
      const marketNoise = (Math.random() - 0.5) * 2.4;
      const meanReversion = (championshipBaseOdds - currentOdds) * 0.12;
      const maxDeviation = 9;
      const minOdds = Math.max(0, championshipBaseOdds - maxDeviation);
      const maxOdds = Math.min(100, championshipBaseOdds + maxDeviation);
      targetOddsOne = Math.max(
        minOdds,
        Math.min(maxOdds, currentOdds + marketNoise + meanReversion)
      );
      nextOddsDelay = 650 + Math.random() * 850;
      nextOddsTick = now + nextOddsDelay;
    }
    liveOddsOne += (targetOddsOne - liveOddsOne) * (1 - Math.exp(-elapsed / 650));
  } else if (championshipRace) {
    liveOddsOne = targetOddsOne = championshipBaseOdds;
  }

  if (championshipRace && now >= nextHistorySample) {
    championshipHistory.push({ t: now, one: liveOddsOne, two: 100 - liveOddsOne });
    const cutoff = now - 60000;
    while (championshipHistory.length > 2 && championshipHistory[1].t < cutoff) {
      championshipHistory.shift();
    }
    nextHistorySample = now + 100;
    updateRaceOddsDisplay();
  }
  if (championshipRace && now >= nextRaceDraw) {
    drawRaceChart(now);
    nextRaceDraw = now + 33;
  }
  animateUpcomingMatch(now);
  window.requestAnimationFrame(animateChampionshipRace);
}

function setRaceBadge(badge, teamIndex, photo) {
  const signature = `${photo ?? ""}|${teamIndex}|${state.teams[teamIndex]?.name ?? ""}`;
  if (badge.dataset.photo === signature) return;
  badge.dataset.photo = signature;
  badge.replaceChildren();
  if (!photo) {
    badge.textContent = getTeamInitials(state.teams[teamIndex]?.name);
    return;
  }
  const image = document.createElement("img");
  image.src = photo;
  image.alt = "";
  badge.append(image);
}

function drawRaceChart(now = performance.now()) {
  const ctx = raceChartCanvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = raceChartCanvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const pixelWidth = Math.round(rect.width * dpr);
  const pixelHeight = Math.round(rect.height * dpr);
  if (raceChartCanvas.width !== pixelWidth || raceChartCanvas.height !== pixelHeight) {
    raceChartCanvas.width = pixelWidth;
    raceChartCanvas.height = pixelHeight;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const w = rect.width;
  const h = rect.height;
  ctx.clearRect(0, 0, w, h);
  const left = 34;
  const right = 12;
  const top = 12;
  const bottom = 20;
  const innerW = Math.max(1, w - left - right);
  const innerH = Math.max(1, h - top - bottom);
  const startTime = now - 60000;
  for (let y = 0; y <= 100; y += 25) {
    const yy = top + innerH - (y / 100) * innerH;
    ctx.beginPath();
    ctx.moveTo(left, yy);
    ctx.lineTo(w - right, yy);
    ctx.strokeStyle = y === 50 ? "rgba(255,255,255,.12)" : "rgba(255,255,255,.055)";
    ctx.lineWidth = 1;
    ctx.setLineDash(y === 50 ? [4, 5] : []);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(255,255,255,.45)";
    ctx.font = "9px Inter, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`${y}%`, 5, yy + 3);
  }

  ctx.fillStyle = "rgba(255,255,255,.4)";
  ctx.font = "9px Inter, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("-60s", left, h - 5);
  ctx.textAlign = "center";
  ctx.fillText("-30s", left + innerW / 2, h - 5);
  ctx.textAlign = "right";
  ctx.fillText("now", w - right, h - 5);

  const history = championshipHistory.length
    ? championshipHistory
    : [{ t: now - 60000, one: 50, two: 50 }];
  const traces = [
    { key: "one", color: "#d3ff57" },
    { key: "two", color: "#9c78ff" }
  ];
  traces.forEach(trace => {
    ctx.beginPath();
    history.forEach((point, index) => {
      const x = left + ((point.t - startTime) / 60000) * innerW;
      const y = top + innerH - (point[trace.key] / 100) * innerH;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    const currentY = top + innerH - ((trace.key === "one" ? liveOddsOne : 100 - liveOddsOne) / 100) * innerH;
    ctx.lineTo(w - right, currentY);
    ctx.strokeStyle = trace.color;
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.shadowColor = trace.color;
    ctx.shadowBlur = 9;
    ctx.stroke();
    ctx.shadowBlur = 0;
  });

}

function getMatchesInSeason(season) {
  return state.matches.filter(m => m.season === season);
}

function getChampionships() {
  return state.championships || { "0": 0, "1": 0 };
}

function getHeadToHead() {
  const matches = state.matches.filter(m =>
    (m.home === 0 && m.away === 1) || (m.home === 1 && m.away === 0)
  );
  let t0Wins = 0, t0Draws = 0, t0Losses = 0;
  let t0GoalsFor = 0, t0GoalsAgainst = 0;
  matches.forEach(m => {
    const isHome0 = m.home === 0;
    const myGoals = isHome0 ? m.homeGoals : m.awayGoals;
    const oppGoals = isHome0 ? m.awayGoals : m.homeGoals;
    t0GoalsFor += myGoals;
    t0GoalsAgainst += oppGoals;
    if (myGoals > oppGoals) t0Wins++;
    else if (myGoals === oppGoals) t0Draws++;
    else t0Losses++;
  });
  return {
    team0Wins: t0Wins,
    team0Draws: t0Draws,
    team0Losses: t0Losses,
    team0GoalsFor: t0GoalsFor,
    team0GoalsAgainst: t0GoalsAgainst,
    team1Wins: t0Losses,
    team1Draws: t0Draws,
    team1Losses: t0Wins,
    team1GoalsFor: t0GoalsAgainst,
    team1GoalsAgainst: t0GoalsFor,
    total: matches.length
  };
}

async function startNewSeason() {
  if (!session) {
    showToast(t("signInRequired"));
    return;
  }
  const matchesInSeason = getMatchesInSeason(currentSeason);
  if (matchesInSeason.length < 36) {
    showToast(t("seasonStartBlocked"));
    return;
  }
  const standings = getStandings();
  const winnerIdx = standings[0].index;
  const championships = { ...getChampionships() };
  championships[String(winnerIdx)] = (championships[String(winnerIdx)] || 0) + 1;
  try {
    const { error } = await supabase.from("league_settings")
      .update({ season: currentSeason + 1, championships })
      .eq("id", true);
    if (error) throw error;
    currentSeason++;
    showToast(t("seasonStart"));
    await refreshFromServer();
  } catch (error) {
    console.error("Failed to start new season:", error);
    showToast(t("seasonStartError", error.message));
  }
}

function renderSeasonInfo() {
  if (!seasonBadge || !matchCounter) return;
  const matchesInSeason = getMatchesInSeason(currentSeason);
  const seasonLimit = 36;
  const remaining = Math.max(0, seasonLimit - matchesInSeason.length);
  const seasonComplete = matchesInSeason.length >= seasonLimit;
  const champs = getChampionships();
  const h2h = getHeadToHead();

  seasonBadge.textContent = `Season ${currentSeason}`;
  matchCounter.textContent = `${matchesInSeason.length}/${seasonLimit}`;

  if (seasonComplete) {
    matchButton.disabled = true;
    matchButton.textContent = t("seasonComplete");
    if (newSeasonBtn) {
      newSeasonBtn.disabled = false;
      newSeasonBtn.style.display = "inline-flex";
    }
  } else {
    matchButton.disabled = !configReady || !session || !dataReady || myTeamIndex === null;
    matchButton.textContent = t("addMatchBtn");
    if (newSeasonBtn) {
      newSeasonBtn.style.display = "none";
    }
  }

  const champList = document.getElementById("champList");
  if (champList) {
    const ranked = state.teams
      .map((team, index) => ({ name: team.name, count: champs[String(index)] || 0 }))
      .sort((a, b) => b.count - a.count);
    const shown = ranked.filter(item => item.count > 0);
    champList.replaceChildren(...(shown.length ? shown : ranked.slice(0, 2)).map(item => {
      const row = document.createElement("div");
      row.className = "champ-row";
      const name = document.createElement("span");
      name.className = "champ-name";
      name.textContent = item.name;
      const count = document.createElement("span");
      count.className = "champ-count";
      count.textContent = String(item.count);
      row.append(name, count);
      return row;
    }));
  }

  const h2hTeam0Wins = document.getElementById("h2hTeam0Wins");
  const h2hTeam0Draws = document.getElementById("h2hTeam0Draws");
  const h2hTeam0Losses = document.getElementById("h2hTeam0Losses");
  const h2hTeam1Wins = document.getElementById("h2hTeam1Wins");
  const h2hTeam1Draws = document.getElementById("h2hTeam1Draws");
  const h2hTeam1Losses = document.getElementById("h2hTeam1Losses");
  const h2hTeam0Name = document.getElementById("h2hTeam0Name");
  const h2hTeam1Name = document.getElementById("h2hTeam1Name");
  const h2hGoalsSummary = document.getElementById("h2hGoalsSummary");
  const h2hMatchesSummary = document.getElementById("h2hMatchesSummary");
  if (h2hTeam0Name) h2hTeam0Name.textContent = state.teams[0]?.name || "Team 1";
  if (h2hTeam1Name) h2hTeam1Name.textContent = state.teams[1]?.name || "Team 2";
  if (h2hTeam0Wins) h2hTeam0Wins.textContent = h2h.team0Wins;
  if (h2hTeam0Draws) h2hTeam0Draws.textContent = h2h.team0Draws;
  if (h2hTeam0Losses) h2hTeam0Losses.textContent = h2h.team0Losses;
  if (h2hTeam1Wins) h2hTeam1Wins.textContent = h2h.team1Wins;
  if (h2hTeam1Draws) h2hTeam1Draws.textContent = h2h.team1Draws;
  if (h2hTeam1Losses) h2hTeam1Losses.textContent = h2h.team1Losses;
  if (h2hGoalsSummary) {
    h2hGoalsSummary.textContent = t("goalsLabel", h2h.team0GoalsFor, h2h.team1GoalsFor);
  }
  if (h2hMatchesSummary) {
    h2hMatchesSummary.textContent = t("totalMatches", h2h.total);
  }
}

function calculateTeamSeasonStats(teamIndex, selectedSeason) {
  const matches = state.matches.filter(match =>
    (match.home === teamIndex || match.away === teamIndex) &&
    (selectedSeason === "all" || (match.season ?? 1) === Number(selectedSeason))
  );
  const stats = {
    played: matches.length,
    wins: 0,
    homePlayed: 0,
    homeWins: 0,
    awayPlayed: 0,
    awayWins: 0,
    draws: 0,
    losses: 0,
    goals: 0,
    possessionTotal: 0,
    possessionMatches: 0,
    passesTotal: 0,
    passesMatches: 0,
    shotsTotal: 0,
    shotsMatches: 0,
    shotsOnTargetTotal: 0,
    shotsOnTargetMatches: 0,
    goalsInShotMatches: 0
  };

  matches.forEach(match => {
    const isHome = match.home === teamIndex;
    const goalsFor = isHome ? match.homeGoals : match.awayGoals;
    const goalsAgainst = isHome ? match.awayGoals : match.homeGoals;
    const teamMatchStats = match.stats?.[isHome ? "home" : "away"] ?? {};
    stats.goals += goalsFor;
    if (isHome) stats.homePlayed++;
    else stats.awayPlayed++;
    if (goalsFor > goalsAgainst) {
      stats.wins++;
      if (isHome) stats.homeWins++;
      else stats.awayWins++;
    } else if (goalsFor === goalsAgainst) stats.draws++;
    else stats.losses++;

    if (Number.isFinite(teamMatchStats.possession)) {
      stats.possessionTotal += teamMatchStats.possession;
      stats.possessionMatches++;
    }
    if (Number.isFinite(teamMatchStats.passes)) {
      stats.passesTotal += teamMatchStats.passes;
      stats.passesMatches++;
    }
    if (Number.isFinite(teamMatchStats.shots)) {
      stats.shotsTotal += teamMatchStats.shots;
      stats.shotsMatches++;
      stats.goalsInShotMatches += goalsFor;
    }
    if (Number.isFinite(teamMatchStats.shotsOnTarget)) {
      stats.shotsOnTargetTotal += teamMatchStats.shotsOnTarget;
      stats.shotsOnTargetMatches++;
    }
  });

  return stats;
}

function formatTeamStat(value) {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString(currentLang === "ru" ? "ru-RU" : "en-GB", {
    maximumFractionDigits: 1
  });
}

function renderTeamStats() {
  const seasonSelect = document.getElementById("teamStatsSeasonSelect");
  const teamSelect = document.getElementById("teamStatsTeamSelect");
  if (!seasonSelect || !teamSelect) return;

  const previousSeason = seasonSelect.value || String(currentSeason);
  const teamSelect2 = document.getElementById("teamStatsTeamSelect2");
  const previousTeam = teamSelect.value || "0";
  const previousTeam2 = teamSelect2.value || "1";
  [teamSelect, teamSelect2].forEach(select => {
    select.replaceChildren();
    state.teams.forEach((team, index) => {
      const option = document.createElement("option");
      option.value = String(index);
      option.textContent = team.name;
      select.append(option);
    });
  });
  teamSelect.value = state.teams[Number(previousTeam)] ? previousTeam : "0";
  teamSelect2.value = state.teams[Number(previousTeam2)] ? previousTeam2 : "1";
  if (teamSelect2.value === teamSelect.value) {
    teamSelect2.value = teamSelect.value === "0" ? "1" : "0";
  }

  const seasons = [...new Set([
    Number.isInteger(currentSeason) && currentSeason >= 1 ? currentSeason : 1,
    ...state.matches.map(match => Number.isInteger(match.season) && match.season >= 1 ? match.season : 1)
  ])].sort((a, b) => a - b);
  seasonSelect.replaceChildren();
  const allSeasonsOption = document.createElement("option");
  allSeasonsOption.value = "all";
  allSeasonsOption.textContent = t("allSeasons");
  seasonSelect.append(allSeasonsOption);
  seasons.forEach(season => {
    const option = document.createElement("option");
    option.value = String(season);
    option.textContent = t("seasonOption", season);
    seasonSelect.append(option);
  });
  seasonSelect.value = previousSeason === "all" || seasons.includes(Number(previousSeason))
    ? previousSeason
    : String(currentSeason);

  const allTeamStats = state.teams.map((team, index) => ({
    team,
    index,
    stats: calculateTeamSeasonStats(index, seasonSelect.value)
  }));
  const selectedTeamIndex = Number(teamSelect.value);
  const comparedTeamIndex = Number(teamSelect2.value);
  const teamStats = teamStatsMode === "compare"
    ? [allTeamStats[selectedTeamIndex], allTeamStats[comparedTeamIndex]]
    : [allTeamStats[selectedTeamIndex]];
  document.getElementById("teamStatsTeamFilter").hidden = false;
  document.getElementById("teamStatsTeamFilter2").hidden = teamStatsMode !== "compare";
  document.querySelector(".team-stats-compare-label").hidden = teamStatsMode !== "compare";
  document.querySelectorAll(".team-stats-mode-button").forEach(button => {
    const active = button.dataset.statsMode === teamStatsMode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  const clubs = document.getElementById("teamStatsClubs");
  clubs.replaceChildren();
  clubs.classList.toggle("single", teamStatsMode !== "compare");
  teamStats.forEach(({ team, index, stats }, slot) =>
    clubs.append(createTeamStatsClub(team, index, stats, slot))
  );

  const cardsByTeam = teamStats.map(({ stats }) => createTeamStatCards(stats));
  const cards = teamStatsMode === "compare"
    ? cardsByTeam[0].map((card, index) => ({
      ...card,
      values: [card, cardsByTeam[1][index]]
    }))
    : cardsByTeam[0].map(card => ({ ...card, values: [card] }));
  const grid = document.getElementById("teamStatsGrid");
  grid.replaceChildren();
  grid.classList.toggle("single", teamStatsMode !== "compare");
  cards.forEach(card => {
    const element = document.createElement("article");
    element.className = "team-stat-card";
    element.dataset.tone = card.tone;
    const label = document.createElement("span");
    label.className = "team-stat-label";
    label.textContent = t(card.label);
    const comparison = document.createElement("div");
    comparison.className = "team-stat-comparison";
    const availableValues = card.values.map(item => item.numeric).filter(Number.isFinite);
    const max = Math.max(...availableValues, 0);
    const winner = teamStatsMode !== "compare"
      ? -2
      : card.values[0].numeric === null || card.values[1].numeric === null
        ? -2
        : Math.abs(card.values[0].numeric - card.values[1].numeric) < 0.0001
          ? -1
          : card.values[0].numeric > card.values[1].numeric ? 0 : 1;
    card.values.forEach((valueInfo, teamIndex) => {
      const side = document.createElement("div");
      side.className = `team-stat-side ${teamIndex === 0 ? "one" : "two"}${winner === teamIndex ? " winner" : ""}`;
      const value = document.createElement("strong");
      value.className = "team-stat-value";
      value.textContent = valueInfo.value;
      const note = document.createElement("span");
      note.className = "team-stat-note";
      note.textContent = valueInfo.note;
      const track = document.createElement("span");
      track.className = "team-stat-track";
      const fill = document.createElement("span");
      fill.className = "team-stat-fill";
      fill.style.width = valueInfo.numeric === null
        ? "0%"
        : `${max === 0 ? 50 : valueInfo.numeric / max * 100}%`;
      track.append(fill);
      side.append(value, note, track);
      comparison.append(side);
    });
    const verdict = document.createElement("span");
    verdict.className = "team-stat-verdict";
    if (teamStatsMode !== "compare") {
      verdict.hidden = true;
    } else if (winner === -2) {
      verdict.textContent = "—";
      verdict.setAttribute("aria-label", t("teamStatsInsufficientData"));
    } else if (winner === -1) {
      verdict.textContent = t("teamStatsTie");
    } else {
      const winnerIndex = teamStats[winner].index;
      const badge = document.createElement("img");
      badge.src = getTeamPhoto(winnerIndex) || "";
      badge.alt = "";
      badge.className = "team-stat-winner-badge";
      badge.hidden = !getTeamPhoto(winnerIndex);
      const winnerName = document.createElement("span");
      winnerName.textContent = state.teams[winnerIndex].name;
      const winnerLabel = document.createElement("small");
      winnerLabel.textContent = t("teamStatsBetter");
      verdict.append(badge, winnerName, winnerLabel);
      verdict.classList.add(winner === 0 ? "one" : "two");
    }
    element.append(label, comparison, verdict);
    grid.append(element);
  });
  document.getElementById("teamStatsEmpty").hidden = teamStats.some(({ stats }) => stats.played > 0);
}

function createTeamStatsClub(team, index, stats, slot = index) {
  const club = document.createElement("div");
  club.className = `team-stats-club ${slot === 0 ? "one" : "two"}`;
  const badge = document.createElement("span");
  badge.className = "team-stats-club-badge";
  const photo = getTeamPhoto(index);
  if (photo) {
    const image = document.createElement("img");
    image.src = photo;
    image.alt = "";
    image.loading = "lazy";
    badge.append(image);
  } else {
    badge.textContent = getTeamInitials(team.name);
  }
  const name = document.createElement("strong");
  name.textContent = team.name;
  const record = document.createElement("span");
  record.textContent = t("statsRecord", stats.played, stats.wins, stats.draws, stats.losses);
  club.append(badge, name, record);
  return club;
}

function createTeamStatCards(stats) {
  const recordedNote = count => t("statRecordedIn", count, stats.played);
  return [
    { label: "statPlayed", value: String(stats.played), numeric: null, note: t("statAllMatches"), tone: "results" },
    {
      label: "statWinRate",
      value: stats.played ? `${formatTeamStat(stats.wins / stats.played * 100)}%` : "—",
      numeric: stats.played ? stats.wins / stats.played * 100 : null,
      note: t("statWinsOutOf", stats.wins, stats.played),
      tone: "results"
    },
    {
      label: "statHomeWinRate",
      value: stats.homePlayed ? `${formatTeamStat(stats.homeWins / stats.homePlayed * 100)}%` : "—",
      numeric: stats.homePlayed ? stats.homeWins / stats.homePlayed * 100 : null,
      note: t("statLocationWinsOutOf", stats.homeWins, stats.homePlayed),
      tone: "results"
    },
    {
      label: "statAwayWinRate",
      value: stats.awayPlayed ? `${formatTeamStat(stats.awayWins / stats.awayPlayed * 100)}%` : "—",
      numeric: stats.awayPlayed ? stats.awayWins / stats.awayPlayed * 100 : null,
      note: t("statLocationWinsOutOf", stats.awayWins, stats.awayPlayed),
      tone: "results"
    },
    { label: "statGoals", value: String(stats.goals), numeric: stats.goals, note: t("statAllMatches"), tone: "goals" },
    {
      label: "statGoalsPerMatch",
      value: stats.played ? formatTeamStat(stats.goals / stats.played) : "—",
      numeric: stats.played ? stats.goals / stats.played : null,
      note: t("statAllMatches"),
      tone: "goals"
    },
    {
      label: "statPossession",
      value: stats.possessionMatches
        ? `${formatTeamStat(stats.possessionTotal / stats.possessionMatches)}%`
        : "—",
      numeric: stats.possessionMatches ? stats.possessionTotal / stats.possessionMatches : null,
      note: recordedNote(stats.possessionMatches),
      tone: "possession"
    },
    {
      label: "statPasses",
      value: stats.passesMatches ? formatTeamStat(stats.passesTotal / stats.passesMatches) : "—",
      numeric: stats.passesMatches ? stats.passesTotal / stats.passesMatches : null,
      note: recordedNote(stats.passesMatches),
      tone: "possession"
    },
    {
      label: "statShots",
      value: stats.shotsMatches ? formatTeamStat(stats.shotsTotal / stats.shotsMatches) : "—",
      numeric: stats.shotsMatches ? stats.shotsTotal / stats.shotsMatches : null,
      note: recordedNote(stats.shotsMatches),
      tone: "shots"
    },
    {
      label: "statShotsOnTarget",
      value: stats.shotsOnTargetMatches
        ? formatTeamStat(stats.shotsOnTargetTotal / stats.shotsOnTargetMatches)
        : "—",
      numeric: stats.shotsOnTargetMatches ? stats.shotsOnTargetTotal / stats.shotsOnTargetMatches : null,
      note: recordedNote(stats.shotsOnTargetMatches),
      tone: "shots"
    },
    {
      label: "statShotConversion",
      value: stats.shotsTotal
        ? `${formatTeamStat(stats.goalsInShotMatches / stats.shotsTotal * 100)}%`
        : "—",
      numeric: stats.shotsTotal ? stats.goalsInShotMatches / stats.shotsTotal * 100 : null,
      note: recordedNote(stats.shotsMatches),
      tone: "goals"
    }
  ];
}
async function deleteMatch(id) {
  try {
    const { error } = await supabase.from("league_matches").delete().eq("id", id);
    if (error) throw error;
    await refreshFromServer();
    showToast(t("matchDeleted"));
  } catch (error) {
    console.error("Failed to delete match:", error);
    showToast(t("matchDeleteError", error.message));
  }
}

function subscribeToNews() {
  if (newsRealtimeChannel) void supabase.removeChannel(newsRealtimeChannel);
  newsRealtimeChannel = supabase.channel("public-league-news")
    .on("postgres_changes", { event: "*", schema: "public", table: "league_news" }, () => {
      void refreshNews();
    })
    .subscribe(status => {
      if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
        console.error(`League news Realtime is unavailable: ${status}`);
      }
    });
}

function getStandings() {
  const stats = state.teams.map((team, index) => ({
    index, name: team.name, played: 0, wins: 0, draws: 0, losses: 0,
    goalsFor: 0, goalsAgainst: 0, points: 0
  }));
  state.matches.forEach(match => {
    const home = stats[match.home];
    const away = stats[match.away];
    home.played++;
    away.played++;
    home.goalsFor += match.homeGoals;
    home.goalsAgainst += match.awayGoals;
    away.goalsFor += match.awayGoals;
    away.goalsAgainst += match.homeGoals;
    if (match.homeGoals > match.awayGoals) {
      home.wins++; home.points += 3; away.losses++;
    } else if (match.homeGoals < match.awayGoals) {
      away.wins++; away.points += 3; home.losses++;
    } else {
      home.draws++; away.draws++; home.points++; away.points++;
    }
  });
  return stats.sort((a, b) => b.points - a.points ||
    (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst) ||
    b.goalsFor - a.goalsFor || a.index - b.index);
}

function renderStandings() {
  standingsBody.replaceChildren();
  getStandings().forEach((team, position) => {
    const row = document.createElement("tr");
    const difference = team.goalsFor - team.goalsAgainst;
    const values = [
      { text: String(position + 1), className: "position" },
      { team: true },
      { form: team.index },
      { text: String(team.played) }, { text: String(team.wins) },
      { text: String(team.draws) }, { text: String(team.losses) },
      {
        text: difference > 0 ? `+${difference}` : String(difference),
        className: difference > 0 ? "positive" : difference < 0 ? "negative" : ""
      },
      { text: String(team.points), className: "points" }
    ];
    values.forEach((value, cellIndex) => {
      const cell = document.createElement("td");
      if (value.team) {
        const teamCell = document.createElement("div");
        teamCell.className = "team-cell";
        const badge = document.createElement("span");
        badge.className = `team-badge ${teamTone(team.index)}`;
        const photo = getTeamPhoto(team.index);
        if (photo) {
          const image = document.createElement("img");
          image.className = "team-badge-image";
          image.src = photo;
          image.alt = "";
          image.width = 35;
          image.height = 35;
          badge.append(image);
        } else {
          badge.textContent = getTeamInitials(team.name);
        }
        const name = document.createElement("span");
        name.textContent = team.name;
        teamCell.classList.add("team-cell-link");
        teamCell.tabIndex = 0;
        teamCell.setAttribute("role", "button");
        teamCell.title = t("teamLineup");
        teamCell.addEventListener("click", () => openLineup(team.index));
        teamCell.append(badge, name);
        teamCell.addEventListener("keydown", event => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openLineup(team.index);
          }
        });
        cell.append(teamCell);
      } else if (value.form !== undefined) {
        cell.className = "form-cell";
        const form = getTeamForm(value.form);
        const formList = document.createElement("div");
        formList.className = "team-form";
        formList.setAttribute("aria-label", form.length
          ? `Last ${form.length} matches: ${form.map(result => result.label).join(", ")}`
          : "No match results yet");
        form.forEach((result, index) => {
          const marker = document.createElement("span");
          marker.className = `form-marker form-${result.outcome}${index === form.length - 1 ? " latest" : ""}`;
          marker.textContent = result.symbol;
          marker.title = result.label;
          marker.setAttribute("aria-hidden", "true");
          formList.append(marker);
        });
        cell.append(formList);
      } else {
        cell.textContent = value.text;
        if (value.className) cell.className = value.className;
      }
      if (cellIndex === 0) cell.setAttribute("aria-label", `Position ${position + 1}`);
      row.append(cell);
    });
    standingsBody.append(row);
  });
}

function getTeamForm(teamIndex) {
  return state.matches
    .filter(match => match.home === teamIndex || match.away === teamIndex)
    .slice(-5)
    .map(match => {
      const teamGoals = match.home === teamIndex ? match.homeGoals : match.awayGoals;
      const opponentGoals = match.home === teamIndex ? match.awayGoals : match.homeGoals;
      if (teamGoals === opponentGoals) return { outcome: "draw", symbol: "–", label: "Draw" };
      return teamGoals > opponentGoals
        ? { outcome: "win", symbol: "✓", label: "Win" }
        : { outcome: "loss", symbol: "×", label: "Loss" };
    });
}

function renderMatches() {
  matchList.replaceChildren();
  const historyToggle = document.getElementById("matchHistoryToggle");
  document.getElementById("matchesCount").textContent =
    `${state.matches.length} ${pluralize(state.matches.length, "match", "matches")}`;
  if (state.matches.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-matches";
    empty.textContent = t("noMatchesPlayed");
    matchList.append(empty);
    historyToggle.hidden = true;
    historyToggle.setAttribute("aria-expanded", "false");
    return;
  }
  const matches = state.matches.slice().reverse();
  const visibleMatches = showAllMatches ? matches : matches.slice(0, 6);
  historyToggle.hidden = matches.length <= 6;
  historyToggle.setAttribute("aria-expanded", String(showAllMatches));
  historyToggle.textContent = showAllMatches
    ? t("matchHistoryHide")
    : t("matchHistoryShow", matches.length);
  visibleMatches.forEach(match => {
    const item = document.createElement("details");
    item.className = "match-item match-item-details";
    const teams = document.createElement("div");
    teams.className = "match-teams";
    const first = createMatchTeamDisplay(match.home);
    const second = createMatchTeamDisplay(match.away);
    const date = document.createElement("span");
    date.className = "match-date";
    const parsedDate = new Date(match.date);
    date.textContent = Number.isNaN(parsedDate.getTime()) ? "" :
      parsedDate.toLocaleDateString(currentLang === "ru" ? "ru-RU" : "en-GB", {
        day: "numeric",
        month: "short"
      });
    teams.append(first, second, date);
    const score = document.createElement("span");
    score.className = "match-score";
    const scoreHome = document.createElement("span");
    scoreHome.textContent = String(match.homeGoals);
    const scoreSeparator = document.createElement("span");
    scoreSeparator.className = "match-score-separator";
    scoreSeparator.textContent = ":";
    const scoreAway = document.createElement("span");
    scoreAway.textContent = String(match.awayGoals);
    score.append(scoreHome, scoreSeparator, scoreAway);
    score.setAttribute("aria-label", `Score ${match.homeGoals} to ${match.awayGoals}`);
    const summary = document.createElement("summary");
    summary.className = "match-summary";
    summary.append(teams, score);
    item.append(summary, renderMatchStats(match));
    const deleteButton = document.createElement("button");
    deleteButton.className = "button button-quiet match-delete";
    deleteButton.textContent = t("deleteNews");
    deleteButton.addEventListener("click", () => {
      if (confirm("Удалить этот матч?")) {
        void deleteMatch(match.id);
      }
    });
    item.append(createMatchLineupButton(match), deleteButton);
    matchList.append(item);
  });
}

function createMatchTeamDisplay(teamIndex) {
  const team = document.createElement("span");
  team.className = "match-team";
  const badge = document.createElement("span");
  badge.className = `match-team-badge ${teamTone(teamIndex)}`;
  const photo = getTeamPhoto(teamIndex);
  if (photo) {
    const image = document.createElement("img");
    image.src = photo;
    image.alt = "";
    image.loading = "lazy";
    badge.append(image);
  } else {
    badge.textContent = getTeamInitials(state.teams[teamIndex]?.name);
  }
  const name = document.createElement("span");
  name.className = "match-team-name";
  name.textContent = state.teams[teamIndex]?.name ?? `Team ${teamIndex + 1}`;
  team.append(badge, name);
  return team;
}

function renderLastMatch() {
  const panel = document.getElementById("lastMatchPanel");
  const result = document.getElementById("lastMatchResult");
  const stats = document.getElementById("lastMatchStats");
  const dateLabel = document.getElementById("lastMatchDate");
  panel.hidden = false;
  panel.classList.toggle("has-match", state.matches.length > 0);
  if (!state.matches.length) {
    result.replaceChildren();
    const empty = document.createElement("p");
    empty.className = "last-match-empty";
    empty.textContent = t("noLastMatch");
    result.append(empty);
    dateLabel.textContent = "";
    stats.replaceChildren();
    return;
  }
  const lastMatch = state.matches.reduce((latest, match) =>
    new Date(match.date) > new Date(latest.date) ? match : latest
  );
  const parsedDate = new Date(lastMatch.date);
  dateLabel.textContent = Number.isNaN(parsedDate.getTime())
    ? ""
    : parsedDate.toLocaleDateString(currentLang === "ru" ? "ru-RU" : "en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  result.replaceChildren();
  const homeTeam = createMatchTeamDisplay(lastMatch.home);
  homeTeam.classList.add("last-match-team");
  const awayTeam = createMatchTeamDisplay(lastMatch.away);
  awayTeam.classList.add("last-match-team");
  const score = document.createElement("strong");
  score.className = "last-match-score";
  score.textContent = `${lastMatch.homeGoals} : ${lastMatch.awayGoals}`;
  result.append(homeTeam, score, awayTeam);
  stats.replaceChildren(renderMatchStats(lastMatch), createMatchLineupButton(lastMatch));
}

function renderMatchStats(match) {
  const section = document.createElement("div");
  section.className = "match-stats";
  const rows = [
    ["shotsOnTarget", 4, ""],
    ["shots", 2.5, ""],
    ["possession", 1.5, "%"],
    ["passes", 0.5, ""]
  ];
  let visibleRows = 0;
  let homeEdge = 0;
  let awayEdge = 0;
  rows.forEach(([key, weight, suffix]) => {
    const rawValues = [match.stats?.home?.[key], match.stats?.away?.[key]];
    const values = rawValues.map(value => {
      if (value === null || value === undefined || value === "") return null;
      const number = Number(value);
      return Number.isFinite(number) ? number : null;
    });
    if (values.some(value => value === null)) return;
    visibleRows += 1;
    const total = values[0] + values[1];
    if (total > 0) {
      homeEdge += weight * values[0] / total;
      awayEdge += weight * values[1] / total;
    }
    const row = document.createElement("div");
    row.className = "match-stat-row";
    row.setAttribute("role", "group");
    row.setAttribute("aria-label", `${t(key)}: ${values[0] ?? "—"}${values[0] === null ? "" : suffix} – ${values[1] ?? "—"}${values[1] === null ? "" : suffix}`);
    const valueLine = document.createElement("div");
    valueLine.className = "match-stat-values";
    const homeValue = document.createElement("strong");
    homeValue.textContent = values[0] === null ? "—" : `${values[0]}${suffix}`;
    const label = document.createElement("span");
    label.textContent = t(key);
    const awayValue = document.createElement("strong");
    awayValue.textContent = values[1] === null ? "—" : `${values[1]}${suffix}`;
    valueLine.append(homeValue, label, awayValue);

    const max = Math.max(...values.filter(value => value !== null), 0);
    const makeTrack = (value, side) => {
      const track = document.createElement("span");
      track.className = `match-stat-track ${side}`;
      const fill = document.createElement("span");
      fill.className = `match-stat-fill ${side}`;
      fill.style.width = value === null ? "0%" : `${max === 0 ? 50 : value / max * 100}%`;
      track.append(fill);
      return track;
    };
    const bars = document.createElement("div");
    bars.className = "match-stat-bars";
    bars.setAttribute("aria-hidden", "true");
    bars.append(makeTrack(values[0], "home"), makeTrack(values[1], "away"));
    row.append(valueLine, bars);
    section.append(row);
  });
  if (visibleRows === 0) {
    const empty = document.createElement("p");
    empty.className = "match-stats-empty";
    empty.textContent = t("noMatchStats");
    section.append(empty);
  } else {
    const edge = document.createElement("p");
    edge.className = "match-stat-edge";
    if (Math.abs(homeEdge - awayEdge) < 0.0001) {
      edge.textContent = t("statsEven");
    } else {
      const strongerTeam = homeEdge > awayEdge ? match.home : match.away;
      edge.textContent = t("statEdge", state.teams[strongerTeam]?.name ?? `Team ${strongerTeam + 1}`);
    }
    section.append(edge);
  }
  return section;
}

function pluralize(count, singular, plural) {
  return count === 1 ? singular : plural;
}

function t(key, ...args) {
  const dict = TRANSLATIONS[currentLang];
  let text = dict && dict[key] ? dict[key] : TRANSLATIONS.en[key] || key;
  if (args.length) {
    args.forEach((arg, i) => {
      text = text.replace(`{${i}}`, arg);
    });
  }
  return text;
}

function applyLang() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.innerHTML = t(key);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.placeholder = t(key);
  });
  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    el.title = t(el.getAttribute("data-i18n-title"));
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach(el => {
    el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria-label")));
  });
  document.getElementById("authStatus").textContent = t("authStatus");
  const langBtns = document.querySelectorAll(".lang-btn");
  langBtns.forEach(btn => {
    btn.classList.toggle("lang-active", btn.getAttribute("data-lang") === currentLang);
  });
  document.documentElement.lang = currentLang;
  render();
  if (document.body.classList.contains("community-mode")) {
    setCommunityView(communityPage, false);
    renderFriendsMe();
  }
  renderProposals();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2800);
}

function updateAuthUi() {
  const enabled = configReady && Boolean(session) && dataReady && myTeamIndex !== null;
  matchButton.disabled = !enabled;
  editTeamsButton.disabled = !enabled;
  addNewsButton.disabled = !configReady || !session;
  document.body.classList.toggle("read-only", !session);
  if (!configReady) {
    authStatus.textContent = t("setupRequired");
    authButton.textContent = t("setup");
    authButton.disabled = true;
  } else if (!session) {
    authStatus.textContent = t("signedOut");
    authButton.textContent = t("signIn");
    authButton.disabled = false;
  } else if (!dataReady) {
    authStatus.textContent = t("loadingLeague");
    authButton.textContent = t("retry");
    authButton.disabled = false;
  } else {
    authStatus.textContent = myTeamIndex !== null && state.teams[myTeamIndex]
      ? state.teams[myTeamIndex].name
      : t("noTeamLinked");
    authButton.textContent = t("signOut");
    authButton.disabled = false;
  }
}

function mapMatch(row) {
  return {
    id: row.id,
    home: row.home_team,
    away: row.away_team,
    homeGoals: row.home_goals,
    awayGoals: row.away_goals,
    date: row.played_at,
    stats: row.stats ?? { home: {}, away: {} },
    season: row.season ?? 1
  };
}

function isValidMatchStats(stats) {
  if (stats === null || stats === undefined) return true;
  if (typeof stats !== "object" || Array.isArray(stats)) return false;
  const keys = ["shots", "shotsOnTarget", "possession", "passes"];
  for (const team of ["home", "away"]) {
    const teamStats = stats[team] ?? {};
    if (typeof teamStats !== "object" || Array.isArray(teamStats)) return false;
    for (const key of keys) {
      const value = teamStats[key];
      const maximum = key === "possession" ? 100 : key === "passes" ? 9999 : 999;
      if (value !== undefined && value !== null &&
        (!Number.isInteger(value) || value < 0 || value > maximum)) return false;
    }
    if (teamStats.shotsOnTarget != null && teamStats.shots != null &&
      teamStats.shotsOnTarget > teamStats.shots) return false;
  }
  const homePossession = stats.home?.possession;
  const awayPossession = stats.away?.possession;
  return (homePossession == null && awayPossession == null) ||
    (homePossession != null && awayPossession != null && homePossession + awayPossession === 100);
}

function validateServerState(settings, matchRows) {
  if (!settings || !Array.isArray(settings.teams) ||   settings.teams.length < 2 ||
      settings.teams.length > MAX_TEAMS ||
      !settings.teams.every(team => team && typeof team.name === "string")) {
      throw new Error("The database has invalid team names. Check the league_settings table.");
    }
    const teamCount = settings.teams.length;
    if (!Array.isArray(matchRows) || !matchRows.every(match =>
      Number.isInteger(match.home_team) && match.home_team >= 0 && match.home_team < teamCount &&
      Number.isInteger(match.away_team) && match.away_team >= 0 && match.away_team < teamCount &&
    match.home_team !== match.away_team &&
    Number.isInteger(match.home_goals) && match.home_goals >= 0 &&
    Number.isInteger(match.away_goals) && match.away_goals >= 0 &&
    isValidMatchStats(match.stats) &&
    typeof match.played_at === "string")) {
    throw new Error("The database contains a match with invalid data.");
  }
}

async function fetchServerState() {
  const [settingsResponse, matchesResponse] = await Promise.all([
    supabase.from("league_settings").select("*").eq("id", true).maybeSingle(),
    supabase.from("league_matches")
      .select("*")
      .order("played_at", { ascending: true })
  ]);
  if (settingsResponse.error) throw settingsResponse.error;
  if (matchesResponse.error) throw matchesResponse.error;
  if (!settingsResponse.data) {
    throw new Error("League settings were not found. Run the SQL in supabase.sql.");
  }
  const settings = settingsResponse.data;
  validateServerState(settings, matchesResponse.data);
  currentSeason = settings.season || 1;
  state = {
    teams: settings.teams,
    matches: matchesResponse.data.map(mapMatch),
    championships: settings.championships || { "0": 0, "1": 0 },
    lineups: settings.lineups && typeof settings.lineups === "object" ? settings.lineups : {}
  };
  pendingProposals = [];
  messagesUnavailable = false;
  activeMessageFriend = null;
  if (session) {
    const proposals = await supabase.from("league_match_proposals").select("*").eq("status", "pending");
    if (!proposals.error) pendingProposals = proposals.data || [];
  }
  dataReady = true;
  render();
  updateAuthUi();
  renderProposals();
}

async function refreshFromServer() {
  if (!configReady) return;
  try {
    await fetchServerState();
    await refreshNews();
  } catch (error) {
    console.error("Failed to refresh the league from the server:", error);
    authStatus.textContent = t("syncError");
    showToast(t("syncErrorToast", error.message));
  }
}

function subscribeToChanges(generation) {
  if (realtimeChannel) supabase.removeChannel(realtimeChannel);
  realtimeChannel = supabase.channel("liga-druzei-updates")
    .on("postgres_changes", { event: "*", schema: "public", table: "league_settings" }, () => {
      if (generation === sessionGeneration) void refreshFromServer();
    })
    .on("postgres_changes", { event: "*", schema: "public", table: "league_matches" }, () => {
      if (generation === sessionGeneration) void refreshFromServer();
    })
    .on("postgres_changes", { event: "*", schema: "public", table: "league_match_proposals" }, () => {
      if (generation === sessionGeneration) void refreshFromServer();
    })
    .subscribe(status => {
      if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
        console.error(`Supabase Realtime is unavailable: ${status}`);
        if (session && dataReady) authStatus.textContent = t("syncingPeriodically");
      }
    });
}

async function handleSession(nextSession) {
  const generation = ++sessionGeneration;
  session = nextSession;
  myTeamIndex = null;
  myProfile = null;
  pendingProposals = [];
  if (messageRefreshTimer) clearInterval(messageRefreshTimer);
  messageRefreshTimer = null;
  dataReady = false;
  if (pollTimer) clearInterval(pollTimer);
  if (realtimeChannel) {
    await supabase.removeChannel(realtimeChannel);
    realtimeChannel = null;
  }
  updateAuthUi();
  if (!configReady) {
    state = structuredClone(initialState);
    render();
    return;
  }
  try {
    await fetchServerState();
    if (generation !== sessionGeneration) return;
    if (session) {
      const { data } = await supabase.rpc("get_my_team");
      if (generation !== sessionGeneration) return;
      myTeamIndex = Number.isInteger(data) ? data : null;
      const profile = await supabase.rpc("ensure_my_profile");
      myProfile = profile.error ? null : profile.data;
      render();
      updateAuthUi();
      renderProposals();
      renderFriendsMe();
    }
    renderFriendsMe();
    if (document.body.classList.contains("community-mode")) {
      await openCommunityPage(communityPage, false);
    }
    await refreshNews();
    subscribeToNews();
    subscribeToChanges(generation);
    pollTimer = setInterval(() => {
      if (generation === sessionGeneration) void refreshFromServer();
    }, 15000);
  } catch (error) {
    if (generation !== sessionGeneration) return;
    console.error("Failed to load the league from the server:", error);
    authStatus.textContent = t("loadError");
    authButton.textContent = t("retry");
    authButton.disabled = false;
    showToast(t("loadErrorToast", error.message));
  }
}

function populateTeamSelects() {
  ["homeTeam", "awayTeam"].forEach(id => {
    const select = document.getElementById(id);
    select.replaceChildren();
    state.teams.forEach((team, index) => {
      const option = document.createElement("option");
      option.value = String(index);
      option.textContent = team.name;
      select.append(option);
    });
  });
  const opponent = state.teams.findIndex((_, index) => index !== myTeamIndex);
  document.getElementById("homeTeam").value = String(myTeamIndex ?? 0);
  document.getElementById("awayTeam").value = String(opponent === -1 ? 1 : opponent);
  updateStatsTeamLabels();
}

function updateStatsTeamLabels() {
  const home = Number(document.getElementById("homeTeam").value);
  const away = Number(document.getElementById("awayTeam").value);
  document.getElementById("homeStatsTeam").textContent = state.teams[home]?.name ?? "Home";
  document.getElementById("awayStatsTeam").textContent = state.teams[away]?.name ?? "Away";
  updateMatchTeamBadges();
}

function updateMatchTeamBadges() {
  [["homeTeam", "homeTeamBadge"], ["awayTeam", "awayTeamBadge"]].forEach(([selectId, badgeId]) => {
    const teamIndex = Number(document.getElementById(selectId).value);
    const badge = document.getElementById(badgeId);
    badge.replaceChildren();
    badge.className = `match-team-picker-badge ${teamTone(teamIndex)}`;
    const photo = getTeamPhoto(teamIndex);
    if (photo) {
      const image = document.createElement("img");
      image.src = photo;
      image.alt = "";
      badge.append(image);
    } else {
      badge.textContent = getTeamInitials(state.teams[teamIndex]?.name);
    }
  });
}

function calculateUpcomingMatchOdds() {
  const history = state.matches
    .filter(match =>
      (match.home === 0 && match.away === 1) ||
      (match.home === 1 && match.away === 0)
    )
    .filter(match =>
      match.homeGoals != null && match.awayGoals != null &&
      Number.isFinite(Number(match.homeGoals)) &&
      Number.isFinite(Number(match.awayGoals))
    )
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-10);
  if (!history.length) return { probabilities: [1 / 3, 1 / 3, 1 / 3], count: 0 };

  const forecast = calculateForecastFromRecentMatches(history, 0, 1, 1);
  return { probabilities: forecast.probabilities, count: forecast.sampleSize };
}

function renderUpcomingMatch() {
  const prediction = calculateUpcomingMatchOdds();
  upcomingMatchOdds = prediction;
  upcomingBaseProbabilities = prediction.probabilities;
  const homeName = state.teams[0]?.name ?? t("homeTeam");
  const awayName = state.teams[1]?.name ?? t("awayTeam");
  document.getElementById("upcomingHomeName").textContent = homeName;
  document.getElementById("upcomingAwayName").textContent = awayName;
  document.getElementById("upcomingHomeLabel").textContent = homeName;
  document.getElementById("upcomingAwayLabel").textContent = awayName;
  setRaceBadge(document.getElementById("upcomingHomeBadge"), 0, TEAM_PHOTOS[0]);
  setRaceBadge(document.getElementById("upcomingAwayBadge"), 1, TEAM_PHOTOS[1]);
  matchOddsChartCanvas.setAttribute("aria-label", t("upcomingMatchChartLabel", homeName, awayName));
  document.getElementById("upcomingMatchNote").textContent = prediction.count === 0
    ? t("predictionNoHistory")
    : t("upcomingMatchSamples", prediction.count);

  const signature = JSON.stringify(state.matches.map(match => [
    match.id, match.home, match.away, match.homeGoals, match.awayGoals, match.stats
  ]));
  if (signature !== upcomingMatchSignature) {
    upcomingMatchSignature = signature;
    liveUpcomingProbabilities = [...upcomingBaseProbabilities];
    targetUpcomingProbabilities = [...upcomingBaseProbabilities];
    const now = performance.now();
    upcomingMatchHistory = [
      { t: now - 60000, probabilities: [...liveUpcomingProbabilities] },
      { t: now, probabilities: [...liveUpcomingProbabilities] }
    ];
  }
  updateUpcomingOddsDisplay();
}

function getFiveMatchForecast() {
  const history = state.matches
    .filter(match => (match.home === 0 || match.home === 1) &&
      match.away === 1 - match.home &&
      match.homeGoals != null && match.awayGoals != null &&
      match.homeGoals !== "" && match.awayGoals !== "" &&
      Number.isFinite(Number(match.homeGoals)) &&
      Number.isFinite(Number(match.awayGoals)))
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const lastMatch = history[history.length - 1];
  const knownFixtures = new Map();
  history.forEach(match => {
    knownFixtures.set(`${match.home}:${match.away}`, { homeTeam: match.home, awayTeam: match.away });
  });
  const fixtures = [...knownFixtures.values()];
  if (!fixtures.length) return [];
  const recentMatches = history.slice(-10);
  if (recentMatches.length < 10) return [];

  const nextHomeTeam = lastMatch && (lastMatch.home === 0 || lastMatch.home === 1)
    ? 1 - lastMatch.home
    : fixtures[0].homeTeam;
  let fixtureIndex = fixtures.findIndex(fixture => fixture.homeTeam === nextHomeTeam);
  if (fixtureIndex < 0) fixtureIndex = 0;

  return Array.from({ length: 5 }, (_, index) => {
    const fixture = fixtures[fixtureIndex];
    const prediction = calculateForecastFromRecentMatches(
      recentMatches,
      fixture.homeTeam,
      fixture.awayTeam,
      index + 1
    );
    fixtureIndex = (fixtureIndex + 1) % fixtures.length;
    return {
      number: index + 1,
      ...fixture,
      available: true,
      ...prediction
    };
  });
}

function calculateForecastFromRecentMatches(matches, homeTeam, awayTeam, forecastHorizon) {
  let homeScoredTotal = 0;
  let homeConcededTotal = 0;
  let awayScoredTotal = 0;
  let awayConcededTotal = 0;
  const goalDifferences = matches.map(match => {
    const homeGoals = Number(match.homeGoals);
    const awayGoals = Number(match.awayGoals);
    const homeTeamGoals = match.home === homeTeam
      ? homeGoals
      : awayGoals;
    const awayTeamGoals = match.home === awayTeam
      ? homeGoals
      : awayGoals;
    homeScoredTotal += homeTeamGoals;
    homeConcededTotal += awayTeamGoals;
    awayScoredTotal += awayTeamGoals;
    awayConcededTotal += homeTeamGoals;
    return homeTeamGoals - awayTeamGoals;
  });

  const sampleSize = matches.length;
  const homeAverage = (homeScoredTotal + awayConcededTotal) / (2 * sampleSize);
  const awayAverage = (awayScoredTotal + homeConcededTotal) / (2 * sampleSize);
  const meanIndex = (sampleSize - 1) / 2;
  const meanDifference = goalDifferences.reduce((sum, value) => sum + value, 0) / sampleSize;
  const covariance = goalDifferences.reduce((sum, value, index) =>
    sum + (index - meanIndex) * (value - meanDifference), 0);
  const variance = goalDifferences.reduce((sum, _, index) =>
    sum + (index - meanIndex) ** 2, 0);
  const formTrend = variance ? covariance / variance : 0;
  const forecastMargin = meanDifference + formTrend * Math.min(forecastHorizon, 5) * 0.35;
  const marginAdjustment = (forecastMargin - (homeAverage - awayAverage)) / 2;
  const homeExpectedGoals = Math.max(0.05, Math.min(8, homeAverage + marginAdjustment));
  const awayExpectedGoals = Math.max(0.05, Math.min(8, awayAverage - marginAdjustment));
  const probabilities = getPoissonMatchProbabilities(homeExpectedGoals, awayExpectedGoals);
  const maxProbability = Math.max(...probabilities);
  const leaders = probabilities
    .map((probability, index) => probability === maxProbability ? index : -1)
    .filter(index => index >= 0);

  return {
    homeGoals: Math.round(homeExpectedGoals),
    awayGoals: Math.round(awayExpectedGoals),
    probabilities,
    predictedOutcome: leaders.length === 1 ? leaders[0] : null,
    sampleSize
  };
}

function getPoissonMatchProbabilities(homeExpectedGoals, awayExpectedGoals) {
  const getPoissonDistribution = expectedGoals => {
    const probabilities = [Math.exp(-expectedGoals)];
    for (let goals = 1; goals <= 12; goals++) {
      probabilities.push(probabilities[goals - 1] * expectedGoals / goals);
    }
    return probabilities;
  };
  const homeScoreProbabilities = getPoissonDistribution(homeExpectedGoals);
  const awayScoreProbabilities = getPoissonDistribution(awayExpectedGoals);
  const outcomes = [0, 0, 0];

  homeScoreProbabilities.forEach((homeProbability, homeGoals) => {
    awayScoreProbabilities.forEach((awayProbability, awayGoals) => {
      const outcome = homeGoals > awayGoals ? 0 : homeGoals === awayGoals ? 1 : 2;
      outcomes[outcome] += homeProbability * awayProbability;
    });
  });

  const totalProbability = outcomes.reduce((sum, probability) => sum + probability, 0);
  return outcomes.map(probability => probability / totalProbability);
}

function renderFiveMatchForecast() {
  const list = document.getElementById("forecastFiveList");
  if (!list) return;
  list.replaceChildren();
  const forecasts = getFiveMatchForecast();
  forecasts.forEach(forecast => {
    const item = document.createElement("article");
    item.className = "forecast-five-item";

    const number = document.createElement("span");
    number.className = "forecast-five-number";
    number.textContent = String(forecast.number).padStart(2, "0");

    const fixture = document.createElement("div");
    fixture.className = "forecast-five-fixture";
    [forecast.homeTeam, forecast.awayTeam].forEach(teamIndex => {
      const team = document.createElement("span");
      team.className = `forecast-five-team ${teamIndex === 0 ? "one" : "two"}`;
      const badge = document.createElement("img");
      badge.src = TEAM_PHOTOS[teamIndex];
      badge.alt = "";
      badge.loading = "lazy";
      const venue = document.createElement("span");
      venue.className = "forecast-five-venue";
      venue.textContent = t(teamIndex === forecast.homeTeam ? "forecastHomeLabel" : "forecastAwayLabel");
      venue.setAttribute("aria-label", teamIndex === forecast.homeTeam ? t("homeTeam") : t("awayTeam"));
      const name = document.createElement("span");
      name.className = "forecast-five-name";
      name.textContent = state.teams[teamIndex]?.name ?? `Team ${teamIndex + 1}`;
      team.append(badge, venue, name);
      if (forecast.available && forecast.predictedOutcome === (teamIndex === forecast.homeTeam ? 0 : 2)) {
        const favorite = document.createElement("span");
        favorite.className = "forecast-five-favorite";
        favorite.setAttribute("aria-label", t("forecastWinnerPick", name.textContent));
        favorite.setAttribute("title", t("forecastWinnerPick", name.textContent));
        team.append(favorite);
      }
      fixture.append(team);
    });

    const pick = document.createElement("div");
    pick.className = "forecast-five-pick";
    if (!forecast.available) {
      pick.textContent = t("forecastUnavailable");
    } else if (forecast.predictedOutcome === 1) {
      const drawMark = document.createElement("span");
      drawMark.className = "forecast-five-draw";
      drawMark.textContent = "X";
      drawMark.setAttribute("aria-label", t("forecastDrawPick"));
      pick.append(drawMark, document.createTextNode(t("forecastDrawPick")));
    } else if (forecast.predictedOutcome === 0 || forecast.predictedOutcome === 2) {
      const winnerIndex = forecast.predictedOutcome === 0
        ? forecast.homeTeam
        : forecast.awayTeam;
      pick.textContent = t("forecastWinnerPick", state.teams[winnerIndex]?.name ?? `Team ${winnerIndex + 1}`);
    } else {
      pick.textContent = t("forecastUndecided");
    }

    if (forecast.available) {
      const outcomes = document.createElement("div");
      outcomes.className = "forecast-five-outcomes";
      const labels = ["forecastHomeWin", "forecastDraw", "forecastAwayWin"];
      const displayedProbabilities = getRoundedForecastProbabilities(forecast.probabilities);
      displayedProbabilities.forEach((percentValue, index) => {
        const outcome = document.createElement("div");
        outcome.className = `forecast-five-outcome outcome-${index}`;
        const label = document.createElement("span");
        label.textContent = t(labels[index]);
        const percent = document.createElement("strong");
        percent.textContent = `${percentValue}%`;
        outcome.append(label, percent);
        outcomes.append(outcome);
      });

      const bar = document.createElement("div");
      bar.className = "forecast-five-bar";
      forecast.probabilities.forEach((probability, index) => {
        const segment = document.createElement("span");
        segment.className = `forecast-five-segment outcome-${index}`;
        segment.style.width = `${probability * 100}%`;
        bar.append(segment);
      });
      item.append(number, fixture, pick, outcomes, bar);
    } else {
      item.append(number, fixture, pick);
    }
    list.append(item);
  });
  document.getElementById("forecastFiveNote").textContent =
    forecasts.length
      ? t("forecastDataNote")
      : state.matches.length
        ? t("forecastNeedTen", Math.min(state.matches.length, 10))
        : t("forecastNoHistory");
}

function getRoundedForecastProbabilities(probabilities) {
  const percentages = probabilities.map(probability => probability * 100);
  const rounded = percentages.map(Math.floor);
  let remainder = 100 - rounded.reduce((sum, value) => sum + value, 0);
  const order = percentages
    .map((value, index) => ({ index, fraction: value - rounded[index] }))
    .sort((a, b) => b.fraction - a.fraction);
  for (let index = 0; index < remainder; index++) {
    rounded[order[index].index]++;
  }
  return rounded;
}

function getDisplayedMatchProbabilities(probabilities) {
  const totalTenths = 1000;
  const exactTenths = probabilities.map(probability => probability * totalTenths);
  const displayedTenths = exactTenths.map(Math.floor);
  let remainder = totalTenths - displayedTenths.reduce((sum, value) => sum + value, 0);
  const order = exactTenths
    .map((value, index) => ({ index, fraction: value - displayedTenths[index] }))
    .sort((a, b) => b.fraction - a.fraction);
  for (let index = 0; index < remainder; index++) {
    displayedTenths[order[index].index]++;
  }
  return displayedTenths.map(value => value / 10);
}

function updateUpcomingOddsDisplay() {
  if (!upcomingMatchOdds) return;
  const percentages = getDisplayedMatchProbabilities(liveUpcomingProbabilities);
  ["upcomingHomeOdds", "upcomingDrawOdds", "upcomingAwayOdds"].forEach((id, index) => {
    document.getElementById(id).textContent = `${percentages[index].toFixed(1)}%`;
  });
}

function animateUpcomingMatch(now) {
  const elapsed = lastUpcomingFrame ? Math.min(now - lastUpcomingFrame, 100) : 16;
  lastUpcomingFrame = now;
  if (upcomingMatchOdds && upcomingMatchOdds.count > 0 && !prefersReducedMotion) {
    if (now >= nextUpcomingOddsTick) {
      const maxDeviation = 0.06;
      const homeTarget = Math.max(
        Math.max(0.02, upcomingBaseProbabilities[0] - maxDeviation),
        Math.min(Math.min(0.96, upcomingBaseProbabilities[0] + maxDeviation), liveUpcomingProbabilities[0] +
          (Math.random() - 0.5) * 0.08 +
          (upcomingBaseProbabilities[0] - liveUpcomingProbabilities[0]) * 0.16)
      );
      const maxDrawTarget = Math.min(0.75, 0.98 - homeTarget, upcomingBaseProbabilities[1] + maxDeviation);
      const drawTarget = Math.max(Math.min(0.02, maxDrawTarget),
        Math.min(maxDrawTarget, liveUpcomingProbabilities[1] +
          (Math.random() - 0.5) * 0.05 +
          (upcomingBaseProbabilities[1] - liveUpcomingProbabilities[1]) * 0.16)
      );
      targetUpcomingProbabilities = [homeTarget, drawTarget, 1 - homeTarget - drawTarget];
      nextUpcomingOddsTick = now + 700 + Math.random() * 900;
    }
    const easing = 1 - Math.exp(-elapsed / 700);
    liveUpcomingProbabilities = liveUpcomingProbabilities.map((value, index) =>
      value + (targetUpcomingProbabilities[index] - value) * easing
    );
    const total = liveUpcomingProbabilities.reduce((sum, value) => sum + value, 0);
    liveUpcomingProbabilities = liveUpcomingProbabilities.map(value => value / total);
  } else if (upcomingMatchOdds) {
    liveUpcomingProbabilities = [...upcomingBaseProbabilities];
    targetUpcomingProbabilities = [...upcomingBaseProbabilities];
  }

  if (upcomingMatchOdds && now >= nextUpcomingSample) {
    upcomingMatchHistory.push({ t: now, probabilities: [...liveUpcomingProbabilities] });
    const cutoff = now - 60000;
    while (upcomingMatchHistory.length > 2 && upcomingMatchHistory[1].t < cutoff) {
      upcomingMatchHistory.shift();
    }
    nextUpcomingSample = now + 100;
    updateUpcomingOddsDisplay();
  }
  if (upcomingMatchOdds && now >= nextUpcomingDraw) {
    drawMatchOddsChart(now);
    nextUpcomingDraw = now + 50;
  }
}

function drawMatchOddsChart(now = performance.now()) {
  const ctx = matchOddsChartCanvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = matchOddsChartCanvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const pixelWidth = Math.round(rect.width * dpr);
  const pixelHeight = Math.round(rect.height * dpr);
  if (matchOddsChartCanvas.width !== pixelWidth || matchOddsChartCanvas.height !== pixelHeight) {
    matchOddsChartCanvas.width = pixelWidth;
    matchOddsChartCanvas.height = pixelHeight;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const width = rect.width;
  const height = rect.height;
  ctx.clearRect(0, 0, width, height);
  const left = 34;
  const right = 12;
  const top = 8;
  const bottom = 18;
  const chartWidth = Math.max(1, width - left - right);
  const chartHeight = Math.max(1, height - top - bottom);
  const startTime = now - 60000;

  [0, 50, 100].forEach(value => {
    const y = top + chartHeight - (value / 100) * chartHeight;
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(width - right, y);
    ctx.strokeStyle = value === 50 ? "rgba(255,255,255,.13)" : "rgba(255,255,255,.06)";
    ctx.lineWidth = 1;
    ctx.setLineDash(value === 50 ? [3, 4] : []);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(255,255,255,.42)";
    ctx.font = "9px Inter, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`${value}%`, 3, y + 3);
  });
  ctx.fillStyle = "rgba(255,255,255,.4)";
  ctx.font = "9px Inter, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("-60s", left, height - 4);
  ctx.textAlign = "center";
  ctx.fillText("-30s", left + chartWidth / 2, height - 4);
  ctx.textAlign = "right";
  ctx.fillText("now", width - right, height - 4);

  const traces = [
    { index: 0, color: "#d3ff57" },
    { index: 1, color: "#9c78ff" },
    { index: 2, color: "#55c5ff" }
  ];
  traces.forEach(trace => {
    ctx.beginPath();
    upcomingMatchHistory.forEach((point, index) => {
      const x = left + ((point.t - startTime) / 60000) * chartWidth;
      const y = top + chartHeight - point.probabilities[trace.index] * chartHeight;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    const currentY = top + chartHeight -
      liveUpcomingProbabilities[trace.index] * chartHeight;
    ctx.lineTo(width - right, currentY);
    ctx.strokeStyle = trace.color;
    ctx.lineWidth = 1.8;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.shadowColor = trace.color;
    ctx.shadowBlur = 7;
    ctx.stroke();
    ctx.shadowBlur = 0;
  });
}

authButton.addEventListener("click", async () => {
  if (session && !dataReady) {
    await handleSession(session);
    return;
  }
  if (session) {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Failed to sign out:", error);
      showToast(t("signOutError", error.message));
    }
    return;
  }
  document.getElementById("authError").textContent = "";
  authDialog.showModal();
});

document.getElementById("authForm").addEventListener("submit", async event => {
  event.preventDefault();
  const errorElement = document.getElementById("authError");
  const email = document.getElementById("authEmail").value.trim();
  const password = document.getElementById("authPassword").value;
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    console.error("Sign-in failed:", error);
    errorElement.textContent = t("signInFailed", error.message);
    return;
  }
  authDialog.close();
  document.getElementById("authForm").reset();
});

matchButton.addEventListener("click", () => {
  if (!dataReady) return;
  populateTeamSelects();
  document.getElementById("matchError").textContent = "";
  document.getElementById("homeGoals").value = "";
  document.getElementById("awayGoals").value = "";
  ["homeShots", "awayShots", "homeShotsOnTarget", "awayShotsOnTarget",
    "homePossession", "awayPossession", "homePasses", "awayPasses"]
    .forEach(id => { document.getElementById(id).value = ""; });
  document.getElementById("lineupConfirmCheck").checked = false;
  setMatchTab("result");
  matchDialog.showModal();
});

addNewsButton.addEventListener("click", () => {
  if (!session) return;
  document.getElementById("newsError").textContent = "";
  document.getElementById("newsForm").reset();
  clearNewsPreview();
  newsDialog.showModal();
});

if (newSeasonBtn) {
  newSeasonBtn.addEventListener("click", () => {
    void startNewSeason();
  });
}

document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentLang = btn.getAttribute("data-lang");
    localStorage.setItem("leagueLang", currentLang);
    applyLang();
  });
});

document.getElementById("teamStatsTeamSelect").addEventListener("change", renderTeamStats);
document.getElementById("teamStatsTeamSelect2").addEventListener("change", renderTeamStats);
document.getElementById("teamStatsSeasonSelect").addEventListener("change", renderTeamStats);
document.querySelectorAll(".team-stats-mode-button").forEach(button => {
  button.addEventListener("click", () => {
    teamStatsMode = button.dataset.statsMode;
    renderTeamStats();
  });
});
document.getElementById("matchHistoryToggle").addEventListener("click", () => {
  showAllMatches = !showAllMatches;
  renderMatches();
});

function clearNewsPreview() {
  if (newsPreviewUrl) URL.revokeObjectURL(newsPreviewUrl);
  newsPreviewUrl = null;
  const preview = document.getElementById("newsImagePreview");
  preview.removeAttribute("src");
  preview.hidden = true;
}

document.getElementById("newsImageInput").addEventListener("change", event => {
  const file = event.target.files[0];
  const errorElement = document.getElementById("newsError");
  errorElement.textContent = "";
  clearNewsPreview();
  if (!file) return;
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    errorElement.textContent = t("invalidImage");
    event.target.value = "";
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    errorElement.textContent = t("imageSizeLimit");
    event.target.value = "";
    return;
  }
  newsPreviewUrl = URL.createObjectURL(file);
  const preview = document.getElementById("newsImagePreview");
  preview.src = newsPreviewUrl;
  preview.hidden = false;
});

document.getElementById("newsForm").addEventListener("submit", async event => {
  event.preventDefault();
  const errorElement = document.getElementById("newsError");
  const publishButton = document.getElementById("publishNewsButton");
  const title = document.getElementById("newsTitleInput").value.trim();
  const description = document.getElementById("newsDescriptionInput").value.trim();
  const file = document.getElementById("newsImageInput").files[0];
  if (!session) {
    errorElement.textContent = t("signInNews");
    return;
  }
  if (!title || !description || !file) {
    errorElement.textContent = t("fillNews");
    return;
  }
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
    file.size > 5 * 1024 * 1024) {
    errorElement.textContent = t("invalidImageFile");
    return;
  }

  publishButton.disabled = true;
  const extension = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" }[file.type];
  const imagePath = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
  let photoUploaded = false;
  try {
    const { error: uploadError } = await supabase.storage.from("news-images")
      .upload(imagePath, file, { contentType: file.type, cacheControl: "3600", upsert: false });
    if (uploadError) throw new Error(t("newsUploadError", uploadError.message));
    photoUploaded = true;
    const { error: insertError } = await supabase.from("league_news").insert({
      title,
      description,
      image_path: imagePath
    });
    if (insertError) throw new Error(t("newsInsertError", insertError.message));
  } catch (error) {
    console.error("Failed to publish league news:", error);
    if (photoUploaded) {
      try {
        const { error: cleanupError } = await supabase.storage.from("news-images").remove([imagePath]);
        if (cleanupError) console.error("Could not remove the unused news photo:", cleanupError);
      } catch (cleanupError) {
        console.error("Could not remove the unused news photo:", cleanupError);
      }
    }
    errorElement.textContent = error.message;
    publishButton.disabled = false;
    return;
  }

  publishButton.disabled = false;
  clearNewsPreview();
  document.getElementById("newsForm").reset();
  newsDialog.close();
  await refreshNews();
  showToast(t("newsPublished"));
});

["homeTeam", "awayTeam"].forEach(id => {
  document.getElementById(id).addEventListener("change", updateStatsTeamLabels);
});

document.getElementById("swapMatchTeams").addEventListener("click", () => {
  const homeSelect = document.getElementById("homeTeam");
  const awaySelect = document.getElementById("awayTeam");
  const previousHome = homeSelect.value;
  homeSelect.value = awaySelect.value;
  awaySelect.value = previousHome;
  [
    ["homeGoals", "awayGoals"],
    ["homeShots", "awayShots"],
    ["homeShotsOnTarget", "awayShotsOnTarget"],
    ["homePossession", "awayPossession"],
    ["homePasses", "awayPasses"]
  ].forEach(([homeId, awayId]) => {
    const homeInput = document.getElementById(homeId);
    const previousValue = homeInput.value;
    homeInput.value = document.getElementById(awayId).value;
    document.getElementById(awayId).value = previousValue;
  });
  updateStatsTeamLabels();
});

editTeamsButton.addEventListener("click", () => {
  if (!dataReady || !session) return;
  teamsDraft = state.teams.map(team => ({ ...team }));
  renderTeamsEditor();
  document.getElementById("teamsError").textContent = "";
  teamsDialog.showModal();
});

document.getElementById("matchForm").addEventListener("submit", async event => {
  event.preventDefault();
  const home = Number(document.getElementById("homeTeam").value);
  const away = Number(document.getElementById("awayTeam").value);
  const homeGoals = Number(document.getElementById("homeGoals").value);
  const awayGoals = Number(document.getElementById("awayGoals").value);
  const errorElement = document.getElementById("matchError");
  if (home === away) {
    errorElement.textContent = t("teamsDiff");
    return;
  }
  if (!Number.isInteger(homeGoals) || !Number.isInteger(awayGoals) ||
    homeGoals < 0 || awayGoals < 0 || homeGoals > 99 || awayGoals > 99) {
    errorElement.textContent = t("scoreRange");
    return;
  }
  if (!document.getElementById("lineupConfirmCheck").checked) {
    setMatchTab("lineups");
    errorElement.textContent = t("lineupConfirmRequired");
    return;
  }
  const readStat = id => {
    const value = document.getElementById(id).value;
    return value === "" ? null : Number(value);
  };
  const stats = {
    home: {
      shots: readStat("homeShots"),
      shotsOnTarget: readStat("homeShotsOnTarget"),
      possession: readStat("homePossession"),
      passes: readStat("homePasses")
    },
    away: {
      shots: readStat("awayShots"),
      shotsOnTarget: readStat("awayShotsOnTarget"),
      possession: readStat("awayPossession"),
      passes: readStat("awayPasses")
    },
    lineups: {
      0: sanitizeLineup(state.lineups?.[0]),
      1: sanitizeLineup(state.lineups?.[1])
    }
  };
  if ([...Object.values(stats.home), ...Object.values(stats.away)]
    .some(value => value !== null && !Number.isInteger(value))) {
    errorElement.textContent = t("statsWhole");
    return;
  }
  if (stats.home.shotsOnTarget !== null && stats.home.shots !== null &&
    stats.home.shotsOnTarget > stats.home.shots ||
    stats.away.shotsOnTarget !== null && stats.away.shots !== null &&
    stats.away.shotsOnTarget > stats.away.shots) {
    errorElement.textContent = t("sotLimit");
    return;
  }
  const hasHomePossession = stats.home.possession !== null;
  const hasAwayPossession = stats.away.possession !== null;
  if (hasHomePossession !== hasAwayPossession ||
    hasHomePossession && stats.home.possession + stats.away.possession !== 100) {
    errorElement.textContent = t("possessionRule");
    return;
  }
  const matchesInSeason = state.matches.filter(m => m.season === currentSeason);
  if (matchesInSeason.length >= 36) {
    errorElement.textContent = t("seasonLimit");
    return;
  }
  if (home !== myTeamIndex && away !== myTeamIndex) {
    errorElement.textContent = t("mustBeInMatch");
    return;
  }
  const { error } = await supabase.rpc("propose_league_match", {
    p_home: home,
    p_away: away,
    p_home_goals: homeGoals,
    p_away_goals: awayGoals,
    p_stats: stats,
    p_season: currentSeason
  });
  if (error) {
    console.error("Failed to send the result for confirmation:", error);
    errorElement.textContent = t("matchSaveError", error.message);
    return;
  }
  await refreshFromServer();
  matchDialog.close();
  showToast(t("proposalSent", state.teams[home === myTeamIndex ? away : home]?.name ?? ""));
});

function matchSummaryText(proposal) {
  const home = state.teams[proposal.home_team]?.name ?? "?";
  const away = state.teams[proposal.away_team]?.name ?? "?";
  return `${home} ${proposal.home_goals}:${proposal.away_goals} ${away}`;
}

function renderProposals() {
  const panel = document.getElementById("proposalsPanel");
  const list = document.getElementById("proposalsList");
  const mine = myTeamIndex === null ? [] : pendingProposals.filter(proposal =>
    proposal.home_team === myTeamIndex || proposal.away_team === myTeamIndex);
  panel.hidden = mine.length === 0;
  list.replaceChildren();
  mine.forEach(proposal => {
    const row = document.createElement("div");
    row.className = "proposal-row";
    const summary = matchSummaryText(proposal);
    const opponentIndex = proposal.home_team === myTeamIndex ? proposal.away_team : proposal.home_team;
    const own = proposal.proposer_team === myTeamIndex;
    const text = document.createElement("span");
    text.textContent = own
      ? t("proposalWaiting", state.teams[opponentIndex]?.name ?? "?", summary)
      : t("proposalIncoming", state.teams[proposal.proposer_team]?.name ?? "?", summary);
    const actions = document.createElement("div");
    actions.className = "proposal-actions";
    const decline = document.createElement("button");
    decline.type = "button";
    decline.className = "button button-quiet";
    decline.textContent = t(own ? "proposalCancel" : "proposalReject");
    decline.addEventListener("click", async () => {
      const { error } = await supabase.rpc("decline_league_match", { p_id: proposal.id });
      if (error) showToast(error.message);
      else showToast(t("proposalRejected"));
      await refreshFromServer();
    });
    if (!own) {
      const confirm = document.createElement("button");
      confirm.type = "button";
      confirm.className = "button button-primary";
      confirm.textContent = t("proposalConfirm");
      confirm.addEventListener("click", async () => {
        confirm.disabled = true;
        const { error } = await supabase.rpc("confirm_league_match", { p_id: proposal.id });
        if (error) showToast(error.message);
        else showToast(t("proposalConfirmed"));
        await refreshFromServer();
      });
      actions.append(confirm);
    }
    actions.append(decline);
    row.append(text, actions);
    list.append(row);
  });
}

let teamsDraft = [];

function renderTeamsEditor() {
  const list = document.getElementById("teamsList");
  list.replaceChildren();
  teamsDraft.forEach((team, index) => {
    const row = document.createElement("div");
    row.className = "team-edit-row";
    const badge = document.createElement("span");
    badge.className = `team-badge ${teamTone(index)}`;
    badge.textContent = String(index + 1).padStart(2, "0");
    const name = document.createElement("input");
    name.maxLength = 24;
    name.value = team.name;
    name.placeholder = t("teamNamePlaceholder");
    name.setAttribute("aria-label", t("teamNamePlaceholder"));
    name.addEventListener("input", () => { team.name = name.value; });
    name.disabled = index !== myTeamIndex;
    row.append(badge, name);
    if (index >= 2) {
      const logo = document.createElement("input");
      logo.disabled = true;
      logo.type = "url";
      logo.maxLength = 300;
      logo.value = team.logo || "";
      logo.placeholder = t("teamLogoPlaceholder");
      logo.className = "team-logo-input";
      logo.addEventListener("input", () => { team.logo = logo.value.trim(); });
      row.append(logo);
    }
    list.append(row);
  });
  document.getElementById("addTeamButton").hidden = true;
}

document.getElementById("addTeamButton").addEventListener("click", () => {
  if (teamsDraft.length >= MAX_TEAMS) return;
  teamsDraft.push({ name: "" });
  renderTeamsEditor();
  const inputs = document.querySelectorAll("#teamsList .team-edit-row > input:first-of-type");
  inputs[inputs.length - 1]?.focus();
});

document.getElementById("teamsForm").addEventListener("submit", async event => {
  event.preventDefault();
  const errorElement = document.getElementById("teamsError");
  const names = teamsDraft.map(team => team.name.trim());
  if (names.some(name => !name)) {
    errorElement.textContent = t("teamsRequired");
    return;
  }
  const unique = new Set(names.map(name => name.toLowerCase()));
  if (unique.size !== names.length) {
    errorElement.textContent = t("teamsSame");
    return;
  }
  const teams = teamsDraft.map((team, index) => {
    const saved = { name: names[index] };
    if (index >= 2 && /^https:\/\//i.test(team.logo || "")) saved.logo = team.logo;
    return saved;
  });
  const { error } = await supabase.from("league_settings")
    .update({ teams }).eq("id", true).select("teams").single();
  if (error) {
    console.error("Failed to save team names to the server:", error);
    errorElement.textContent = t("teamSaveError", error.message);
    return;
  }
  state.teams = teams;
  render();
  teamsDialog.close();
  showToast(t("teamsSaved"));
});

const LINEUP_FORMATIONS = ["4-3-3", "4-4-2", "4-2-3-1", "3-5-2", "3-4-3", "4-1-4-1", "4-5-1", "5-3-2", "5-4-1"];
const LINEUP_POSITIONS = ["GK", "CB", "LB", "RB", "CDM", "CM", "CAM", "LM", "RM", "LW", "RW", "CF", "ST"];
const LINEUP_MAX_PLAYERS = 30;
const LINEUP_MAX_RATING = 112;
const lineupDialog = document.getElementById("lineupDialog");
let lineupTeam = 0;
let lineupDraft = null;

function getFormationSlots(formation) {
  const lines = formation.split("-").map(Number);
  const slots = [{ x: 50, y: 90, pos: "GK" }];
  lines.forEach((count, lineIndex) => {
    const y = lines.length === 1 ? 45 : 72 - lineIndex * (56 / (lines.length - 1));
    for (let i = 0; i < count; i += 1) {
      const isEdge = count >= 4 && (i === 0 || i === count - 1);
      const isLast = lineIndex === lines.length - 1;
      let pos = "CM";
      if (lineIndex === 0 && lines.length > 1) pos = isEdge ? (i === 0 ? "LB" : "RB") : "CB";
      else if (isLast) pos = count === 3 ? ["LW", "ST", "RW"][i] : "ST";
      slots.push({ x: Math.round((i + 1) / (count + 1) * 100), y: Math.round(y), pos });
    }
  });
  return slots;
}

function createDefaultLineup() {
  const slots = getFormationSlots("4-3-3");
  return {
    formation: "4-3-3",
    players: slots.map((slot, index) => ({
      id: `p${index + 1}`,
      name: t("lineupPlayerDefault", index + 1),
      number: index + 1,
      pos: slot.pos,
      rating: 75,
      sub: false,
      x: slot.x,
      y: slot.y
    }))
  };
}

function sanitizeLineup(raw) {
  if (!raw || !Array.isArray(raw.players)) return createDefaultLineup();
  const clamp = (value, min, max, fallback) =>
    Number.isFinite(Number(value)) ? Math.min(max, Math.max(min, Number(value))) : fallback;
  return {
    formation: raw.formation === "custom" || LINEUP_FORMATIONS.includes(raw.formation) ? raw.formation : "custom",
    players: raw.players.slice(0, LINEUP_MAX_PLAYERS).map((player, index) => ({
      id: String(player.id || `p${index + 1}`),
      name: String(player.name || "").slice(0, 24),
      number: Math.round(clamp(player.number, 0, 99, 0)),
      pos: LINEUP_POSITIONS.includes(player.pos) ? player.pos : "CM",
      rating: Math.round(clamp(player.rating, 0, LINEUP_MAX_RATING, 75)),
      sub: Boolean(player.sub),
      card: typeof player.card === "string" && /^https:\/\//i.test(player.card) && player.card.length <= 400
        ? player.card : "",
      x: clamp(player.x, 4, 96, 50),
      y: clamp(player.y, 4, 96, 50)
    }))
  };
}

function applyFormationToDraft() {
  if (!lineupDraft || lineupDraft.formation === "custom") return;
  const slots = getFormationSlots(lineupDraft.formation);
  lineupDraft.players.filter(player => !player.sub).slice(0, slots.length).forEach((player, index) => {
    player.x = slots[index].x;
    player.y = slots[index].y;
  });
}

let lineupMode = "view";

const CARD_WIDTH = 240;
const CARD_HEIGHT = 336;

function createPlayerVisual(player) {
  const shirt = document.createElement("span");
  if (player.card) {
    shirt.className = "lineup-card";
    const image = document.createElement("img");
    image.src = player.card;
    image.alt = player.name || "";
    image.loading = "lazy";
    image.draggable = false;
    shirt.append(image);
    return shirt;
  }
  shirt.className = "lineup-shirt";
  shirt.textContent = String(player.number);
  const rating = document.createElement("span");
  rating.className = "lineup-shirt-rating";
  rating.textContent = String(player.rating);
  shirt.append(rating);
  return shirt;
}

function resizeCardImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      canvas.width = CARD_WIDTH;
      canvas.height = CARD_HEIGHT;
      const ctx = canvas.getContext("2d");
      const scale = Math.max(CARD_WIDTH / image.width, CARD_HEIGHT / image.height);
      const width = image.width * scale;
      const height = image.height * scale;
      ctx.drawImage(image, (CARD_WIDTH - width) / 2, (CARD_HEIGHT - height) / 2, width, height);
      canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("Could not process image")), "image/webp", 0.88);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Not a valid image"));
    };
    image.src = url;
  });
}

async function uploadPlayerCard(player, file) {
  const errorElement = document.getElementById("lineupError");
  errorElement.textContent = "";
  if (!file || !file.type.startsWith("image/") || file.size > 8 * 1024 * 1024) {
    errorElement.textContent = t("cardInvalid");
    return;
  }
  try {
    const blob = await resizeCardImage(file);
    const path = `cards/${crypto.randomUUID()}.webp`;
    const { error } = await supabase.storage.from("player-cards")
      .upload(path, blob, { contentType: "image/webp", cacheControl: "31536000" });
    if (error) throw error;
    player.card = supabase.storage.from("player-cards").getPublicUrl(path).data.publicUrl;
    renderLineupPitch();
    renderLineupRoster();
  } catch (error) {
    console.error("Failed to upload the player card:", error);
    errorElement.textContent = t("cardUploadError", error.message);
  }
}

function openLineup(teamIndex, mode = "view") {
  if (!dataReady) {
    showToast(t("lineupNeedSignIn"));
    return;
  }
  if (mode === "edit" && teamIndex !== myTeamIndex) {
    showToast(t("onlyOwnTeam"));
    mode = "view";
  }
  lineupTeam = teamIndex;
  lineupMode = mode;
  lineupDraft = sanitizeLineup(state.lineups?.[teamIndex]);
  document.getElementById("lineupError").textContent = "";
  renderLineupEditor();
  if (!lineupDialog.open) lineupDialog.showModal();
}

function createStaticPitch(lineup) {
  const pitch = document.createElement("div");
  pitch.className = "lineup-pitch";
  const markings = document.createElement("div");
  markings.className = "lineup-pitch-lines";
  markings.innerHTML = '<i class="lp-center"></i><i class="lp-circle"></i><i class="lp-box lp-box-top"></i><i class="lp-box lp-box-bottom"></i>';
  pitch.append(markings);
  lineup.players.filter(player => !player.sub).forEach(player => {
    const marker = document.createElement("div");
    marker.className = "lineup-player static";
    marker.dataset.group = lineupGroup(player.pos);
    marker.style.left = `${player.x}%`;
    marker.style.top = `${player.y}%`;
    const shirt = createPlayerVisual(player);
    const name = document.createElement("span");
    name.className = "lineup-player-name";
    name.textContent = player.name || player.pos;
    marker.append(shirt, name);
    pitch.append(marker);
  });
  return pitch;
}

function openMatchLineup(match) {
  const saved = match.stats?.lineups;
  if (!saved?.[match.home] || !saved?.[match.away]) {
    showToast(t("lineupNoSnapshot"));
    return;
  }
  const dialog = document.getElementById("matchLineupDialog");
  const parsedDate = new Date(match.date);
  document.getElementById("matchLineupDate").textContent = Number.isNaN(parsedDate.getTime()) ? "" :
    parsedDate.toLocaleDateString(currentLang === "ru" ? "ru-RU" : "en-GB",
      { day: "numeric", month: "long", year: "numeric" });
  const scoreboard = document.getElementById("matchLineupScoreboard");
  const home = createMatchTeamDisplay(match.home);
  const away = createMatchTeamDisplay(match.away);
  const score = document.createElement("strong");
  score.className = "match-lineup-score";
  score.textContent = `${match.homeGoals} : ${match.awayGoals}`;
  scoreboard.replaceChildren(home, score, away);

  const body = document.getElementById("matchLineupBody");
  body.replaceChildren();
  [match.home, match.away].forEach((teamIndex, slot) => {
    const lineup = sanitizeLineup(saved[teamIndex]);
    const starters = lineup.players.filter(player => !player.sub);
    const subs = lineup.players.filter(player => player.sub);
    const average = starters.length
      ? Math.round(starters.reduce((sum, player) => sum + player.rating, 0) / starters.length)
      : 0;
    const column = document.createElement("section");
    column.className = "match-lineup-team";
    const head = document.createElement("header");
    head.className = "match-lineup-team-head";
    const title = document.createElement("div");
    title.className = "match-lineup-team-title";
    const name = document.createElement("strong");
    name.textContent = state.teams[teamIndex]?.name ?? `Team ${teamIndex + 1}`;
    const side = document.createElement("span");
    side.textContent = slot === 0 ? t("homeTeam") : t("awayTeam");
    title.append(name, side);
    const meta = document.createElement("div");
    meta.className = "match-lineup-meta";
    [[t("lineupFormation"), lineup.formation === "custom" ? t("lineupCustom") : lineup.formation],
      [t("lineupAvg"), String(average)]].forEach(([label, value]) => {
      const item = document.createElement("span");
      const small = document.createElement("small");
      small.textContent = label;
      const strong = document.createElement("b");
      strong.textContent = value;
      item.append(small, strong);
      meta.append(item);
    });
    head.append(title, meta);
    column.append(head, createStaticPitch(lineup));
    [[starters, "lineupStarters"], [subs, "lineupSubs"]].forEach(([players, key]) => {
      if (!players.length) return;
      const heading = document.createElement("h3");
      heading.textContent = `${t(key)} (${players.length})`;
      const list = document.createElement("div");
      list.className = "match-lineup-list";
      players.forEach(player => list.append(createLineupViewRow(player)));
      column.append(heading, list);
    });
    body.append(column);
  });
  if (!dialog.open) dialog.showModal();
}

function createMatchLineupButton(match) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "button button-quiet match-lineup-button";
  button.textContent = `⚽ ${t("lineupMatchBtn")}`;
  button.addEventListener("click", () => openMatchLineup(match));
  return button;
}

function renderLineupTicker() {
  const date = new Date();
  const formatted = date.toLocaleDateString(currentLang === "ru" ? "ru-RU" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" });
  const message = `${t("lineupAsOf", formatted)} · ${state.teams[lineupTeam].name}`;
  const track = document.getElementById("lineupTicker");
  track.replaceChildren();
  for (let i = 0; i < 8; i += 1) {
    const item = document.createElement("span");
    item.textContent = message;
    track.append(item);
  }
}

function renderLineupEditor() {
  lineupDialog.dataset.mode = lineupMode;
  document.getElementById("lineupEdit").hidden = lineupTeam !== myTeamIndex;
  const isEdit = lineupMode === "edit";
  document.getElementById("lineupDialogTitle").textContent = t(isEdit ? "lineupTitle" : "teamLineup");
  document.getElementById("lineupDialogDesc").textContent = t(isEdit ? "lineupDesc" : "lineupViewDesc");
  document.getElementById("lineupFormationBadge").textContent =
    `${t("lineupFormation")}: ${lineupDraft.formation === "custom" ? t("lineupCustom") : lineupDraft.formation}`;
  renderLineupTicker();
  const tabs = document.getElementById("lineupTabs");
  tabs.replaceChildren();
  state.teams.forEach((team, index) => {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.className = `lineup-tab${index === lineupTeam ? " active" : ""}`;
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", String(index === lineupTeam));
    if (getTeamPhoto(index)) {
      const logo = document.createElement("img");
      logo.src = getTeamPhoto(index);
      logo.alt = "";
      tab.append(logo);
    }
    tab.append(team.name);
    tab.addEventListener("click", () => openLineup(index, lineupMode));
    tabs.append(tab);
  });
  const select = document.getElementById("lineupFormation");
  select.replaceChildren();
  [...LINEUP_FORMATIONS, "custom"].forEach(value => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value === "custom" ? t("lineupCustom") : value;
    select.append(option);
  });
  select.value = lineupDraft.formation;
  renderLineupPitch();
  renderLineupRoster();
}

const LINEUP_GROUPS = { GK: "gk", CB: "def", LB: "def", RB: "def", CDM: "mid", CM: "mid", CAM: "mid", LM: "mid", RM: "mid", LW: "att", RW: "att", CF: "att", ST: "att" };
const lineupGroup = pos => LINEUP_GROUPS[pos] || "mid";

function renderLineupPitch() {
  const pitch = document.getElementById("lineupPitch");
  pitch.replaceChildren();
  const markings = document.createElement("div");
  markings.className = "lineup-pitch-lines";
  markings.innerHTML = '<i class="lp-center"></i><i class="lp-circle"></i><i class="lp-box lp-box-top"></i><i class="lp-box lp-box-bottom"></i>';
  pitch.append(markings);
  lineupDraft.players.filter(player => !player.sub).forEach(player => {
    const marker = document.createElement("div");
    marker.className = "lineup-player";
    marker.dataset.id = player.id;
    marker.dataset.group = lineupGroup(player.pos);
    marker.style.left = `${player.x}%`;
    marker.style.top = `${player.y}%`;
    const shirt = createPlayerVisual(player);
    const name = document.createElement("span");
    name.className = "lineup-player-name";
    name.textContent = player.name || player.pos;
    marker.append(shirt, name);
    if (lineupMode === "edit") {
      marker.addEventListener("pointerdown", event => startLineupDrag(event, marker, player));
    } else {
      marker.classList.add("static");
    }
    pitch.append(marker);
  });
}

function startLineupDrag(event, marker, player) {
  event.preventDefault();
  const pitch = document.getElementById("lineupPitch");
  marker.setPointerCapture(event.pointerId);
  marker.classList.add("dragging");
  const move = moveEvent => {
    const rect = pitch.getBoundingClientRect();
    player.x = Math.min(96, Math.max(4, Math.round((moveEvent.clientX - rect.left) / rect.width * 100)));
    player.y = Math.min(96, Math.max(4, Math.round((moveEvent.clientY - rect.top) / rect.height * 100)));
    marker.style.left = `${player.x}%`;
    marker.style.top = `${player.y}%`;
  };
  const end = () => {
    marker.classList.remove("dragging");
    marker.removeEventListener("pointermove", move);
    marker.removeEventListener("pointerup", end);
    marker.removeEventListener("pointercancel", end);
    lineupDraft.formation = "custom";
    document.getElementById("lineupFormation").value = "custom";
  };
  marker.addEventListener("pointermove", move);
  marker.addEventListener("pointerup", end);
  marker.addEventListener("pointercancel", end);
}

function renderLineupRoster() {
  const roster = document.getElementById("lineupRoster");
  roster.replaceChildren();
  [[false, "lineupStarters"], [true, "lineupSubs"]].forEach(([isSub, titleKey]) => {
    const players = lineupDraft.players.filter(player => player.sub === isSub);
    const heading = document.createElement("h3");
    heading.textContent = `${t(titleKey)} (${players.length})`;
    roster.append(heading);
    if (!players.length) {
      const empty = document.createElement("p");
      empty.className = "lineup-empty";
      empty.textContent = t("lineupEmpty");
      roster.append(empty);
    }
    players.forEach(player => roster.append(lineupMode === "edit" ? createLineupRow(player) : createLineupViewRow(player)));
  });
}

function createLineupViewRow(player) {
  const row = document.createElement("div");
  row.className = "lineup-view-row";
  row.dataset.group = lineupGroup(player.pos);
  const parts = [
    ["lineup-view-number", String(player.number)],
    ["lineup-view-name", player.name || "—"],
    ["lineup-view-pos", player.pos],
    ["lineup-view-rating", String(player.rating)]
  ];
  parts.forEach(([className, text]) => {
    const cell = document.createElement("span");
    cell.className = className;
    cell.textContent = text;
    row.append(cell);
  });
  return row;
}

function createLineupRow(player) {
  const row = document.createElement("div");
  row.className = "lineup-row";
  row.dataset.group = lineupGroup(player.pos);
  const field = (type, value, label, onInput, attrs = {}) => {
    const input = document.createElement("input");
    input.type = type;
    input.value = value;
    input.setAttribute("aria-label", label);
    Object.entries(attrs).forEach(([key, attr]) => input.setAttribute(key, attr));
    input.addEventListener("input", () => onInput(input.value));
    return input;
  };
  const number = field("number", player.number, t("lineupNumber"), value => {
    player.number = Math.min(99, Math.max(0, Math.round(Number(value) || 0)));
    renderLineupPitch();
  }, { min: 0, max: 99, class: "lineup-number" });
  const name = field("text", player.name, t("lineupName"), value => {
    player.name = value.slice(0, 24);
    renderLineupPitch();
  }, { maxlength: 24, class: "lineup-name" });
  const position = document.createElement("select");
  position.setAttribute("aria-label", "Position");
  LINEUP_POSITIONS.forEach(pos => {
    const option = document.createElement("option");
    option.value = pos;
    option.textContent = pos;
    position.append(option);
  });
  position.value = player.pos;
  position.addEventListener("change", () => {
    player.pos = position.value;
    row.dataset.group = lineupGroup(player.pos);
    renderLineupPitch();
  });
  const rating = field("number", player.rating, t("lineupRating"), value => {
    player.rating = Math.min(LINEUP_MAX_RATING, Math.max(0, Math.round(Number(value) || 0)));
    renderLineupPitch();
  }, { min: 0, max: LINEUP_MAX_RATING, class: "lineup-rating", title: t("lineupRating") });
  const subLabel = document.createElement("label");
  subLabel.className = "lineup-sub-toggle";
  const subBox = document.createElement("input");
  subBox.type = "checkbox";
  subBox.checked = player.sub;
  subBox.addEventListener("change", () => {
    player.sub = subBox.checked;
    applyFormationToDraft();
    renderLineupPitch();
    renderLineupRoster();
  });
  subLabel.append(subBox, t("lineupSub"));
  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "lineup-remove";
  remove.title = t("lineupRemove");
  remove.setAttribute("aria-label", t("lineupRemove"));
  remove.textContent = "×";
  remove.addEventListener("click", () => {
    lineupDraft.players = lineupDraft.players.filter(item => item !== player);
    applyFormationToDraft();
    renderLineupPitch();
    renderLineupRoster();
  });
  const cardLabel = document.createElement("label");
  cardLabel.className = "lineup-card-upload";
  cardLabel.title = t("cardUpload");
  cardLabel.textContent = player.card ? "🃏✓" : "🃏";
  const cardInput = document.createElement("input");
  cardInput.type = "file";
  cardInput.accept = "image/*";
  cardInput.hidden = true;
  cardInput.addEventListener("change", () => {
    void uploadPlayerCard(player, cardInput.files[0]);
  });
  cardLabel.append(cardInput);
  const cardClear = document.createElement("button");
  cardClear.type = "button";
  cardClear.className = "lineup-remove";
  cardClear.title = t("cardRemove");
  cardClear.setAttribute("aria-label", t("cardRemove"));
  cardClear.textContent = "⌫";
  cardClear.hidden = !player.card;
  cardClear.addEventListener("click", () => {
    player.card = "";
    renderLineupPitch();
    renderLineupRoster();
  });
  row.append(number, name, position, rating, subLabel, cardLabel, cardClear, remove);
  return row;
}

document.getElementById("lineupFormation").addEventListener("change", event => {
  lineupDraft.formation = event.target.value;
  applyFormationToDraft();
  renderLineupPitch();
});

document.getElementById("lineupAddPlayer").addEventListener("click", () => {
  if (lineupDraft.players.length >= LINEUP_MAX_PLAYERS) {
    document.getElementById("lineupError").textContent = t("lineupMax");
    return;
  }
  document.getElementById("lineupError").textContent = "";
  const used = new Set(lineupDraft.players.map(player => player.number));
  let number = 1;
  while (used.has(number) && number < 99) number += 1;
  const starters = lineupDraft.players.filter(player => !player.sub).length;
  lineupDraft.players.push({
    id: `p${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`,
    name: t("lineupPlayerDefault", lineupDraft.players.length + 1),
    number,
    pos: "CM",
    rating: 75,
    sub: starters >= 11,
    x: 50,
    y: 50
  });
  applyFormationToDraft();
  renderLineupPitch();
  renderLineupRoster();
});

document.getElementById("lineupReset").addEventListener("click", () => {
  lineupDraft = createDefaultLineup();
  renderLineupEditor();
});

document.getElementById("lineupSave").addEventListener("click", async () => {
  const errorElement = document.getElementById("lineupError");
  const lineups = { ...(state.lineups || {}), [lineupTeam]: lineupDraft };
  const { error } = await supabase.from("league_settings")
    .update({ lineups }).eq("id", true).select("lineups").single();
  if (error) {
    console.error("Failed to save the lineup:", error);
    errorElement.textContent = t("lineupSaveError", error.message);
    return;
  }
  state.lineups = lineups;
  showToast(t("lineupSaved"));
  openLineup(lineupTeam, "view");
});

document.getElementById("lineupEdit").addEventListener("click", () => openLineup(lineupTeam, "edit"));
document.getElementById("lineupBack").addEventListener("click", () => openLineup(lineupTeam, "view"));

document.getElementById("upcomingLineupsButton").addEventListener("click", () => openLineup(0));

function setMatchTab(tab) {
  const isLineups = tab === "lineups";
  document.getElementById("matchPanelResult").hidden = isLineups;
  document.getElementById("matchPanelLineups").hidden = !isLineups;
  document.getElementById("matchTabResult").classList.toggle("active", !isLineups);
  document.getElementById("matchTabLineups").classList.toggle("active", isLineups);
  document.getElementById("matchTabResult").setAttribute("aria-selected", String(!isLineups));
  document.getElementById("matchTabLineups").setAttribute("aria-selected", String(isLineups));
  if (isLineups) renderLineupConfirm();
  else updateMatchTabStatus();
}

function updateMatchTabStatus() {
  const confirmed = document.getElementById("lineupConfirmCheck").checked;
  const status = document.getElementById("matchTabStatus");
  status.textContent = confirmed ? "✓" : "!";
  status.classList.toggle("confirmed", confirmed);
}

function renderLineupConfirm() {
  const cards = document.getElementById("lineupConfirmCards");
  cards.replaceChildren();
  [Number(document.getElementById("homeTeam").value), Number(document.getElementById("awayTeam").value)]
    .forEach((teamIndex, slot) => {
      if (!state.teams[teamIndex]) return;
      const lineup = sanitizeLineup(state.lineups?.[teamIndex]);
      const starters = lineup.players.filter(player => !player.sub);
      const average = starters.length
        ? Math.round(starters.reduce((sum, player) => sum + player.rating, 0) / starters.length)
        : 0;
      const card = document.createElement("div");
      card.className = "lineup-confirm-card";
      const head = createMatchTeamDisplay(teamIndex);
      const side = document.createElement("span");
      side.className = "lineup-confirm-side";
      side.textContent = slot === 0 ? t("homeTeam") : t("awayTeam");
      const meta = document.createElement("div");
      meta.className = "lineup-confirm-meta";
      [
        [t("lineupFormation"), lineup.formation === "custom" ? t("lineupCustom") : lineup.formation],
        [t("lineupAvg"), String(average)],
        [t("lineupSubs"), String(lineup.players.length - starters.length)]
      ].forEach(([label, value]) => {
        const item = document.createElement("span");
        item.innerHTML = `<small></small><strong></strong>`;
        item.querySelector("small").textContent = label;
        item.querySelector("strong").textContent = value;
        meta.append(item);
      });
      const warning = document.createElement("p");
      warning.className = `lineup-confirm-count${starters.length === 11 ? " ok" : ""}`;
      warning.textContent = t("lineupStartersCount", starters.length);
      const open = document.createElement("button");
      open.type = "button";
      open.className = "button button-quiet";
      open.textContent = t("lineupOpen");
      open.addEventListener("click", () => openLineup(teamIndex));
      card.append(head, side, meta, warning, open);
      cards.append(card);
    });
  updateMatchTabStatus();
}

document.getElementById("matchTabResult").addEventListener("click", () => setMatchTab("result"));
document.getElementById("matchTabLineups").addEventListener("click", () => setMatchTab("lineups"));
document.getElementById("lineupConfirmCheck").addEventListener("change", () => {
  updateMatchTabStatus();
  document.getElementById("matchError").textContent = "";
});
["homeTeam", "awayTeam"].forEach(id => document.getElementById(id).addEventListener("change", () => {
  document.getElementById("lineupConfirmCheck").checked = false;
  renderLineupConfirm();
}));
document.getElementById("swapMatchTeams").addEventListener("click", () => {
  document.getElementById("lineupConfirmCheck").checked = false;
  renderLineupConfirm();
});
lineupDialog.addEventListener("close", () => {
  if (matchDialog.open) renderLineupConfirm();
});
document.getElementById("teamStatsLineupButton").addEventListener("click", () => {
  openLineup(Number(document.getElementById("teamStatsTeamSelect").value) || 0);
});

document.querySelectorAll("[data-close]").forEach(button => {
  button.addEventListener("click", () => document.getElementById(button.dataset.close).close());
});

[matchDialog, teamsDialog, authDialog, newsDialog, newsViewDialog, lineupDialog, document.getElementById("matchLineupDialog")].forEach(dialog => {
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
});

newsDialog.addEventListener("close", clearNewsPreview);
const siteMenu = document.getElementById("siteMenu");
siteMenu.addEventListener("click", event => {
  if (event.target.closest("a")) siteMenu.open = false;
});
document.addEventListener("click", event => {
  if (!siteMenu.contains(event.target)) siteMenu.open = false;
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && siteMenu.open) {
    siteMenu.open = false;
    siteMenu.querySelector("summary").focus();
  }
});

const friendsList = document.getElementById("friendsList");
const friendProfile = document.getElementById("friendProfile");
const friendSearchForm = document.getElementById("friendSearchForm");
const communitySection = document.getElementById("communitySection");
const communityProfileView = document.getElementById("communityProfileView");
const communityFriendsView = document.getElementById("communityFriendsView");
const communityEditView = document.getElementById("communityEditView");
const communityAchievementsView = document.getElementById("communityAchievementsView");
const communityMessagesView = document.getElementById("communityMessagesView");
const messagesPeople = document.getElementById("messagesPeople");
const messagesChat = document.getElementById("messagesChat");
let achievementsModule = null;
let friendsTab = "friends";
let communityPage = "profile";
let activeMessageFriend = null;
let messageRefreshTimer = null;

function setCommunityView(view, updateHash = true) {
  const allowed = ["profile", "friends", "messages", "achievements", "edit"];
  communityPage = allowed.includes(view) ? view : "profile";
  communitySection.hidden = false;
  document.body.classList.add("community-mode");
  communityProfileView.hidden = communityPage !== "profile";
  communityFriendsView.hidden = communityPage !== "friends";
  communityMessagesView.hidden = communityPage !== "messages";
  communityAchievementsView.hidden = communityPage !== "achievements";
  communityEditView.hidden = communityPage !== "edit";
  const titles = {
    profile: t("myProfile"),
    friends: t("friendsLink"),
    messages: t("messagesLink"),
    achievements: t("achievementsLink"),
    edit: t("editPage")
  };
  document.getElementById("communityTitle").textContent = titles[communityPage];
  document.querySelectorAll(".community-side-nav [data-community-page]").forEach(button => {
    button.classList.toggle("is-active", button.dataset.communityPage === communityPage);
    button.setAttribute("aria-current", button.dataset.communityPage === communityPage ? "page" : "false");
  });
  if (messageRefreshTimer) {
    clearInterval(messageRefreshTimer);
    messageRefreshTimer = null;
  }
  if (updateHash && location.hash !== `#community/${communityPage}`) {
    history.pushState(null, "", `#community/${communityPage}`);
  }
}

async function openCommunityPage(page, updateHash = true) {
  setCommunityView(page, updateHash);
  renderFriendsMe();
  if (!session) {
    const prompt = document.createElement("div");
    prompt.className = "community-signin-card";
    prompt.append(document.createTextNode(t("communitySignIn")),
      friendButton(t("signIn"), "button-primary", () => authDialog.showModal()));
    if (page === "profile") communityProfileView.replaceChildren(prompt);
    if (page === "friends") friendsList.replaceChildren(prompt);
    if (page === "messages") {
      messagesPeople.replaceChildren(prompt);
      messagesChat.replaceChildren();
    }
    if (page === "achievements") communityAchievementsView.replaceChildren(prompt);
    if (page === "edit") document.getElementById("communityEditContent").replaceChildren(prompt);
    return;
  }
  if (page === "profile" || page === "achievements") {
    if (page === "profile" && myProfile) await showProfile(myProfile.user_id);
    if (page === "achievements") {
      await renderAllAchievements();
      setCommunityView("achievements", false);
    }
  } else if (page === "friends") {
    void renderFriendsTab();
  } else if (page === "edit" && myProfile) {
    await showProfileEditor(myProfile.user_id);
  } else if (page === "messages") {
    void loadMessageInbox();
    if (!messageRefreshTimer) messageRefreshTimer = setInterval(() => void loadMessageInbox(), 12000);
  }
}

async function callRpc(name, args) {
  const { data, error } = await supabase.rpc(name, args);
  if (error) {
    showToast(error.message);
    return { ok: false, data: null };
  }
  return { ok: true, data };
}

function friendButton(label, className, handler) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `button ${className}`;
  button.textContent = label;
  button.addEventListener("click", handler);
  return button;
}

const avatarUrl = path => path
  ? supabase.storage.from("avatars").getPublicUrl(path).data.publicUrl
  : null;

function avatarEl(path, nickname, className = "") {
  const box = document.createElement("span");
  box.className = `avatar ${className}`.trim();
  const url = avatarUrl(path);
  if (url) {
    const img = document.createElement("img");
    img.src = url;
    img.alt = "";
    img.loading = "lazy";
    box.append(img);
  } else {
    box.textContent = getTeamInitials(nickname);
  }
  return box;
}

let cardCatalog = null;
async function loadCardCatalog() {
  if (cardCatalog) return cardCatalog;
  const map = new Map((window.EF_CARDS || []).map(card => [card.id, { ...card }]));
  const { data } = await supabase.from("efootball_cards").select("id,data,photo_path");
  (data || []).forEach(row => {
    const merged = { ...(map.get(row.id) || {}), ...row.data, id: row.id };
    if (row.photo_path) merged.photo = supabase.storage.from("card-images").getPublicUrl(row.photo_path).data.publicUrl;
    map.set(row.id, merged);
  });
  cardCatalog = [...map.values()].filter(card => !card.deleted && card.name)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0));
  return cardCatalog;
}

function achievementBadge(achievement, unlocked, extra = "", result = null) {
  const badge = document.createElement(result ? "button" : "div");
  badge.className = `friend-badge tier-${achievement.tier}${unlocked ? " is-unlocked" : ""} ${extra}`.trim();
  if (result) {
    badge.type = "button";
    badge.setAttribute("aria-label", `${(currentLang === "ru" ? achievement.ru : achievement.en)[0]} — ${t("progressLabel")}: ${result.value}/${result.target}`);
    badge.addEventListener("click", () => showAchievementDetails(achievement, result));
  }
  const icon = document.createElement("span");
  icon.className = "friend-badge-icon";
  icon.innerHTML = achievement.icon;
  const label = document.createElement("span");
  label.textContent = (currentLang === "ru" ? achievement.ru : achievement.en)[0];
  badge.append(icon, label);
  return badge;
}

function favoriteCardEl(card) {
  const box = document.createElement("div");
  box.className = "friend-favorite";
  if (card.photo) {
    const img = document.createElement("img");
    img.src = card.photo;
    img.alt = "";
    box.append(img);
  }
  const info = document.createElement("div");
  const name = document.createElement("b");
  name.textContent = card.name;
  const meta = document.createElement("span");
  meta.textContent = [card.rating, card.pos, card.club].filter(Boolean).join(" · ");
  info.append(name, meta);
  box.append(info);
  return box;
}

function showAchievementDetails(achievement, result) {
  const [title, description] = currentLang === "ru" ? achievement.ru : achievement.en;
  const tier = t(`${achievement.tier}Tier`);
  const dialog = document.getElementById("achievementDialog");
  const content = document.getElementById("achievementDialogContent");
  const icon = document.createElement("div");
  icon.className = `achievement-detail-icon tier-${achievement.tier}${result.unlocked ? " is-unlocked" : ""}`;
  icon.innerHTML = achievement.icon;
  const copy = document.createElement("div");
  copy.className = "achievement-detail-copy";
  const desc = document.createElement("p");
  desc.textContent = description;
  const status = document.createElement("strong");
  status.className = result.unlocked ? "achievement-status is-unlocked" : "achievement-status";
  status.textContent = result.unlocked ? t("unlockedLabel") : t("notUnlockedLabel");
  const progressHead = document.createElement("div");
  progressHead.className = "achievement-progress-head";
  const progressLabel = document.createElement("span");
  progressLabel.textContent = `${t("progressLabel")} · ${result.value}/${result.target}`;
  const percent = document.createElement("b");
  percent.textContent = `${Math.round(result.value / result.target * 100)}%`;
  progressHead.append(progressLabel, percent);
  const bar = document.createElement("div");
  bar.className = "achievement-progress";
  bar.setAttribute("role", "progressbar");
  bar.setAttribute("aria-valuemin", "0");
  bar.setAttribute("aria-valuemax", String(result.target));
  bar.setAttribute("aria-valuenow", String(result.value));
  const fill = document.createElement("i");
  fill.style.width = `${Math.min(100, result.value / result.target * 100)}%`;
  bar.append(fill);
  const tierLine = document.createElement("small");
  tierLine.textContent = `${t("achievementTier")}: ${tier}`;
  copy.append(desc, status, progressHead, bar, tierLine);
  document.getElementById("achievementDialogTitle").textContent = title;
  content.replaceChildren(icon, copy);
  dialog.showModal();
}

async function resizeAvatar(file) {
  const bitmap = await createImageBitmap(file);
  const size = 256;
  const side = Math.min(bitmap.width, bitmap.height);
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  canvas.getContext("2d").drawImage(
    bitmap, (bitmap.width - side) / 2, (bitmap.height - side) / 2, side, side, 0, 0, size, size
  );
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("Image error")), "image/webp", 0.85);
  });
}

async function showProfile(userId) {
  setCommunityView("profile");
  const { ok, data: profile } = await callRpc("get_league_profile", { p_user: userId });
  if (!ok || !profile) return;
  achievementsModule ??= await import("../global/achievements.js");
  const { ACHIEVEMENTS, evaluateAchievements } = achievementsModule;
  const cards = await loadCardCatalog();
  const results = evaluateAchievements(state.matches, profile.team_index);
  const unlockedIds = new Set(ACHIEVEMENTS.filter((_, i) => results[i]?.unlocked).map(a => a.id));
  const head = document.createElement("div");
  head.className = "profile-head";
  const title = document.createElement("h3");
  title.textContent = profile.nickname;
  head.append(avatarEl(profile.avatar_path, profile.nickname, "avatar-lg"), title);
  const parts = [head];
  const team = profile.team_index === null ? null : state.teams[profile.team_index];
  if (!team) {
    const locked = document.createElement("p");
    locked.className = "friend-locked";
    locked.textContent = t("profileLocked");
    friendProfile.replaceChildren(...parts, locked);
    friendProfile.hidden = false;
    return;
  }
  const row = getStandings().find(item => item.index === profile.team_index);
  const actions = document.createElement("div");
  actions.className = "profile-actions";
  if (profile.is_self) {
    actions.append(friendButton(t("editPage"), "button-primary", () => void showProfileEditor(profile.user_id)));
  } else if (profile.is_friend) {
    actions.append(friendButton(t("sendMessage"), "button-primary", async () => {
      const { ok, data } = await callRpc("list_friends");
      const friend = ok ? data.find(item => item.user_id === profile.user_id) : null;
      if (friend) void openMessageConversation(friend);
    }));
  }
  const friendsShortcut = friendButton(t("friendsLink"), "button-quiet", () => openFriends());
  actions.append(friendsShortcut);
  parts.push(actions);
  const teamLine = document.createElement("p");
  teamLine.className = "friend-team";
  const photo = getTeamPhoto(profile.team_index);
  if (photo) {
    const img = document.createElement("img");
    img.src = photo;
    img.alt = "";
    teamLine.append(img);
  }
  teamLine.append(team.name);
  parts.push(teamLine);

  const pinned = (profile.featured_badges || [])
    .filter(id => unlockedIds.has(id))
    .map(id => ACHIEVEMENTS.find(a => a.id === id));
  if (pinned.length) {
    const strip = document.createElement("div");
    strip.className = "friend-pinned";
    pinned.forEach(achievement => {
      const result = results.find(item => item.id === achievement.id);
      if (result) strip.append(achievementBadge(achievement, true, "is-pinned", result));
    });
    parts.push(strip);
  }
  const favorite = cards.find(card => card.id === profile.favorite_card);
  if (favorite) parts.push(favoriteCardEl(favorite));

  const record = document.createElement("ul");
  record.className = "friend-record";
  [t("friendRecord", row.played, row.wins, row.draws, row.losses, row.points),
    t("friendBadges", unlockedIds.size, ACHIEVEMENTS.length)].forEach(text => {
    const item = document.createElement("li");
    item.textContent = text;
    record.append(item);
  });
  const grid = document.createElement("div");
  grid.className = "friend-badges profile-achievements-grid";
  [...ACHIEVEMENTS]
    .sort((a, b) => Number(unlockedIds.has(b.id)) - Number(unlockedIds.has(a.id)))
    .forEach(achievement => {
      const result = results.find(item => item.id === achievement.id);
      if (result) grid.append(achievementBadge(achievement, unlockedIds.has(achievement.id), "", result));
    });
  parts.push(record, grid);
  friendProfile.replaceChildren(...parts);
  friendProfile.hidden = false;
  renderCommunitySideUser();
}

function buildProfileEditor(profile, achievements, unlockedIds, cards) {
  const form = document.createElement("form");
  form.className = "profile-editor";
  const draft = {
    avatarPath: profile.avatar_path || null,
    badges: (profile.featured_badges || []).filter(id => unlockedIds.has(id)).slice(0, 3),
    card: profile.favorite_card || "",
    file: null
  };

  const nickLabel = document.createElement("label");
  nickLabel.textContent = t("nicknameLabel");
  const nick = document.createElement("input");
  nick.value = profile.nickname;
  nick.minLength = 3;
  nick.maxLength = 24;
  nick.required = true;
  nickLabel.append(nick);

  const avatarRow = document.createElement("div");
  avatarRow.className = "profile-avatar-row";
  let preview = avatarEl(draft.avatarPath, profile.nickname, "avatar-lg");
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "image/png,image/jpeg,image/webp";
  file.setAttribute("aria-label", t("avatarUpload"));
  file.addEventListener("change", () => {
    const picked = file.files?.[0];
    if (!picked) return;
    draft.file = picked;
    const next = document.createElement("span");
    next.className = "avatar avatar-lg";
    const img = document.createElement("img");
    img.src = URL.createObjectURL(picked);
    img.alt = "";
    next.append(img);
    preview.replaceWith(next);
    preview = next;
  });
  avatarRow.append(preview, file);

  const badgesTitle = document.createElement("p");
  badgesTitle.className = "profile-label";
  const badgePicker = document.createElement("div");
  badgePicker.className = "friend-badges badge-picker";
  const updateBadgesTitle = () => {
    badgesTitle.textContent = `${t("pinBadges")} (${draft.badges.length}/3)`;
  };
  const unlockedList = achievements.filter(a => unlockedIds.has(a.id));
  if (!unlockedList.length) {
    const none = document.createElement("p");
    none.className = "friends-empty";
    none.textContent = t("noBadgesYet");
    badgePicker.append(none);
  }
  unlockedList.forEach(achievement => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "badge-choice";
    const sync = () => button.setAttribute("aria-pressed", String(draft.badges.includes(achievement.id)));
    button.append(achievementBadge(achievement, true));
    button.addEventListener("click", () => {
      if (draft.badges.includes(achievement.id)) draft.badges = draft.badges.filter(id => id !== achievement.id);
      else if (draft.badges.length < 3) draft.badges.push(achievement.id);
      else showToast(t("pinLimit"));
      badgePicker.querySelectorAll(".badge-choice").forEach(item => item.dispatchEvent(new Event("sync")));
      updateBadgesTitle();
    });
    button.addEventListener("sync", sync);
    sync();
    badgePicker.append(button);
  });
  updateBadgesTitle();

  const cardLabel = document.createElement("label");
  cardLabel.textContent = t("favoritePlayer");
  const cardSelect = document.createElement("select");
  const none = document.createElement("option");
  none.value = "";
  none.textContent = t("noFavorite");
  cardSelect.append(none);
  cards.forEach(card => {
    const option = document.createElement("option");
    option.value = card.id;
    option.textContent = `${card.name} · ${card.rating ?? ""} ${card.pos ?? ""}`.trim();
    cardSelect.append(option);
  });
  cardSelect.value = draft.card;
  cardLabel.append(cardSelect);

  const save = document.createElement("button");
  save.type = "submit";
  save.className = "button button-primary";
  save.textContent = t("saveProfile");

  form.addEventListener("submit", async event => {
    event.preventDefault();
    save.disabled = true;
    try {
      let avatarPath = draft.avatarPath;
      let uploadedPath = null;
      if (draft.file) {
        const blob = await resizeAvatar(draft.file);
        uploadedPath = `${session.user.id}/avatar-${Date.now()}.webp`;
        const { error } = await supabase.storage.from("avatars")
          .upload(uploadedPath, blob, { contentType: "image/webp", cacheControl: "31536000" });
        if (error) throw error;
        avatarPath = uploadedPath;
      }
      if (nick.value.trim() !== profile.nickname) {
        const renamed = await callRpc("set_my_nickname", { p_nickname: nick.value });
        if (!renamed.ok) throw new Error(t("nicknameFailed"));
      }
      const { error } = await supabase.rpc("update_my_profile", {
        p_avatar_path: avatarPath, p_badges: draft.badges, p_card: cardSelect.value || null
      });
      if (error) {
        if (uploadedPath) await supabase.storage.from("avatars").remove([uploadedPath]);
        throw error;
      }
      if (uploadedPath && profile.avatar_path) await supabase.storage.from("avatars").remove([profile.avatar_path]);
      const refreshed = await supabase.rpc("ensure_my_profile");
      if (!refreshed.error) myProfile = refreshed.data;
      showToast(t("profileSaved"));
      renderFriendsMe();
      setCommunityView("profile");
      await showProfile(profile.user_id);
    } catch (error) {
      showToast(error.message || String(error));
    } finally {
      save.disabled = false;
    }
  });
  form.append(nickLabel, avatarRow, badgesTitle, badgePicker, cardLabel, save);
  return form;
}

function renderFriendsMe() {
  const box = document.getElementById("communitySideUser");
  box.replaceChildren();
  if (!session) {
    box.append(friendButton(t("signIn"), "button-primary", () => authDialog.showModal()));
    return;
  }
  if (!myProfile) {
    const loading = document.createElement("small");
    loading.textContent = t("loadingLeague");
    box.append(loading);
    return;
  }
  const info = document.createElement("div");
  info.className = "friends-me-info";
  const text = document.createElement("div");
  const name = document.createElement("b");
  name.textContent = myProfile.nickname;
  const label = document.createElement("small");
  label.textContent = myTeamIndex !== null ? state.teams[myTeamIndex]?.name ?? "" : t("noTeamLinked");
  text.append(name, label);
  info.append(avatarEl(myProfile.avatar_path, myProfile.nickname), text);
  box.append(info);
}

async function showProfileEditor(userId) {
  const { ok, data: profile } = await callRpc("get_league_profile", { p_user: userId });
  if (!ok || !profile?.is_self) return;
  achievementsModule ??= await import("../global/achievements.js");
  const { ACHIEVEMENTS, evaluateAchievements } = achievementsModule;
  const cards = await loadCardCatalog();
  const results = evaluateAchievements(state.matches, profile.team_index);
  const unlockedIds = new Set(ACHIEVEMENTS.filter((_, i) => results[i]?.unlocked).map(a => a.id));
  const content = document.getElementById("communityEditContent");
  const heading = document.createElement("div");
  heading.className = "community-page-heading";
  const title = document.createElement("h2");
  title.textContent = t("editPage");
  const description = document.createElement("p");
  description.textContent = t("editPageDesc");
  const back = friendButton(t("profileBack"), "button-quiet", () => {
    setCommunityView("profile");
    void showProfile(userId);
  });
  heading.append(title, description, back);
  content.replaceChildren(heading, buildProfileEditor(profile, ACHIEVEMENTS, unlockedIds, cards));
  setCommunityView("edit");
}

async function renderAllAchievements() {
  if (!myProfile || myTeamIndex === null) return;
  achievementsModule ??= await import("../global/achievements.js");
  const { ACHIEVEMENTS, evaluateAchievements } = achievementsModule;
  const results = evaluateAchievements(state.matches, myTeamIndex);
  const unlocked = results.filter(result => result.unlocked).length;
  const heading = document.createElement("div");
  heading.className = "community-page-heading";
  const title = document.createElement("h2");
  title.textContent = t("achievementsLink");
  const description = document.createElement("p");
  description.textContent = t("achievementPageDesc", unlocked, ACHIEVEMENTS.length);
  heading.append(title, description);
  const grid = document.createElement("div");
  grid.className = "friend-badges profile-achievements-grid";
  ACHIEVEMENTS.forEach(achievement => {
    const result = results.find(item => item.id === achievement.id);
    if (result) grid.append(achievementBadge(achievement, result.unlocked, "", result));
  });
  communityAchievementsView.replaceChildren(heading, grid);
}

let messagesUnavailable = false;

function updateMessageUnread(count) {
  for (const id of ["messageUnread", "messageUnreadTop"]) {
    const badge = document.getElementById(id);
    badge.hidden = count < 1;
    badge.textContent = count > 99 ? "99+" : String(count);
  }
}

async function loadMessageInbox() {
  if (!session || communityPage !== "messages" || messagesUnavailable) return;
  const { data: friends, error: friendsError } = await supabase.rpc("list_friends");
  if (friendsError) {
    console.error("Could not load friends for messages:", friendsError);
    messagesPeople.replaceChildren();
    return;
  }
  if (!friends?.length) {
    updateMessageUnread(0);
    activeMessageFriend = null;
    messagesPeople.replaceChildren();
    const empty = document.createElement("p");
    empty.className = "friends-empty";
    empty.textContent = t("messagesEmptyFriends");
    messagesPeople.append(empty);
    messagesChat.replaceChildren();
    return;
  }
  const userId = session.user.id;
  const { data: messages, error } = await supabase.from("league_messages")
    .select("id,sender,recipient,body,sent_at,read_at")
    .or(`sender.eq.${userId},recipient.eq.${userId}`)
    .order("sent_at", { ascending: true });
  if (error) {
    messagesUnavailable = true;
    console.error("Could not load private messages:", error);
    const notice = document.createElement("p");
    notice.className = "friends-empty";
    notice.textContent = t("messagesNeedMigration");
    messagesPeople.replaceChildren(notice);
    messagesChat.replaceChildren(notice.cloneNode(true));
    return;
  }
  const rows = messages || [];
  const unread = rows.filter(message => message.recipient === userId && !message.read_at).length;
  updateMessageUnread(unread);
  messagesPeople.replaceChildren(...friends.filter(person => person.relation === "friend").map(person => {
    const conversation = rows.filter(message =>
      (message.sender === userId && message.recipient === person.user_id) ||
      (message.recipient === userId && message.sender === person.user_id));
    const latest = conversation[conversation.length - 1];
    const item = document.createElement("button");
    item.type = "button";
    item.className = `message-person${activeMessageFriend?.user_id === person.user_id ? " is-active" : ""}`;
    item.append(avatarEl(person.avatar_path, person.nickname));
    const details = document.createElement("span");
    details.className = "message-person-copy";
    const name = document.createElement("b");
    name.textContent = person.nickname;
    const preview = document.createElement("small");
    preview.textContent = latest ? latest.body : t("noMessagesYet");
    details.append(name, preview);
    item.append(details);
    if (conversation.some(message => message.recipient === userId && !message.read_at)) {
      const unreadDot = document.createElement("i");
      unreadDot.className = "message-unread-dot";
      unreadDot.setAttribute("aria-label", t("unreadMessages"));
      item.append(unreadDot);
    }
    item.addEventListener("click", () => void openMessageConversation(person, rows));
    return item;
  }));
  if (activeMessageFriend && friends.some(friend => friend.user_id === activeMessageFriend.user_id)) {
    renderMessageConversation(activeMessageFriend, rows);
  } else if (activeMessageFriend) {
    activeMessageFriend = null;
    messagesChat.replaceChildren();
    const empty = document.createElement("p");
    empty.className = "friends-empty";
    empty.textContent = t("chooseConversation");
    messagesChat.append(empty);
  }
}

function renderMessageConversation(person, messages) {
  const userId = session.user.id;
  const conversation = messages.filter(message =>
    (message.sender === userId && message.recipient === person.user_id) ||
    (message.recipient === userId && message.sender === person.user_id));
  const header = document.createElement("div");
  header.className = "message-chat-header";
  header.append(avatarEl(person.avatar_path, person.nickname));
  const name = document.createElement("b");
  name.textContent = person.nickname;
  header.append(name);
  const thread = document.createElement("div");
  thread.className = "message-thread";
  if (!conversation.length) {
    const empty = document.createElement("p");
    empty.className = "friends-empty";
    empty.textContent = t("noMessagesYet");
    thread.append(empty);
  }
  conversation.forEach(message => {
    const bubble = document.createElement("article");
    bubble.className = `message-bubble${message.sender === userId ? " is-mine" : ""}`;
    const body = document.createElement("p");
    body.textContent = message.body;
    const time = document.createElement("time");
    time.dateTime = message.sent_at;
    time.textContent = new Date(message.sent_at).toLocaleString(currentLang === "ru" ? "ru-RU" : "en-GB", {
      day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
    });
    bubble.append(body, time);
    thread.append(bubble);
  });
  const form = document.createElement("form");
  form.className = "message-compose";
  const input = document.createElement("textarea");
  input.maxLength = 2000;
  input.required = true;
  input.rows = 2;
  input.placeholder = t("messagePlaceholder");
  const send = document.createElement("button");
  send.type = "submit";
  send.className = "button button-primary";
  send.textContent = t("sendMessage");
  form.append(input, send);
  form.addEventListener("submit", async event => {
    event.preventDefault();
    send.disabled = true;
    const { error } = await supabase.rpc("send_league_message", {
      p_recipient: person.user_id,
      p_body: input.value.trim()
    });
    send.disabled = false;
    if (error) {
      showToast(error.message);
      return;
    }
    input.value = "";
    await loadMessageInbox();
  });
  messagesChat.replaceChildren(header, thread, form);
  thread.scrollTop = thread.scrollHeight;
}

async function openMessageConversation(person, cachedMessages = null) {
  activeMessageFriend = person;
  setCommunityView("messages", true);
  if (!messageRefreshTimer) messageRefreshTimer = setInterval(() => void loadMessageInbox(), 12000);
  if (cachedMessages) renderMessageConversation(person, cachedMessages);
  const { error } = await supabase.rpc("mark_league_messages_read", { p_sender: person.user_id });
  if (error) console.error("Could not mark messages read:", error);
  await loadMessageInbox();
}

function friendRow(person, actions) {
  const row = document.createElement("div");
  row.className = "friend-row";
  const name = document.createElement("button");
  name.type = "button";
  name.className = "friend-name";
  name.textContent = person.nickname;
  name.addEventListener("click", () => void showProfile(person.user_id));
  row.append(avatarEl(person.avatar_path, person.nickname), name, ...actions);
  return row;
}

function setFriendsMessage(key) {
  const message = document.createElement("p");
  message.className = "friends-empty";
  message.textContent = t(key);
  friendsList.replaceChildren(message);
}

async function renderFriendsTab(searchResults = null) {
  document.querySelectorAll(".friends-tab").forEach(tab => {
    tab.setAttribute("aria-selected", String(tab.dataset.tab === friendsTab));
  });
  friendSearchForm.hidden = friendsTab !== "search";
  const refresh = () => renderFriendsTab(searchResults);
  if (friendsTab === "search") {
    if (!searchResults) return setFriendsMessage("searchHint");
    if (!searchResults.length) return setFriendsMessage("searchEmpty");
    friendsList.replaceChildren(...searchResults.map(person => {
      const actions = [];
      if (person.relation === "none") {
        actions.push(friendButton(t("addFriend"), "button-primary", async () => {
          const { ok } = await callRpc("send_friend_request", { p_user: person.user_id });
          if (ok) {
            person.relation = "outgoing";
            showToast(t("requestSent"));
            void refresh();
          }
        }));
      } else {
        const tag = document.createElement("small");
        tag.textContent = person.relation === "friend" ? t("alreadyFriend")
          : person.relation === "outgoing" ? t("requestSent") : t("incomingTag");
        actions.push(tag);
      }
      return friendRow(person, actions);
    }));
    return;
  }
  const { ok, data } = await callRpc("list_friends");
  if (!ok) return;
  const wanted = friendsTab === "friends" ? ["friend"] : ["incoming", "outgoing"];
  const people = (data || []).filter(person => wanted.includes(person.relation));
  const dot = document.getElementById("friendsButton");
  dot.classList.toggle("has-requests", (data || []).some(person => person.relation === "incoming"));
  if (!people.length) return setFriendsMessage(friendsTab === "friends" ? "friendsEmpty" : "requestsEmpty");
  friendsList.replaceChildren(...people.map(person => {
    const reload = () => renderFriendsTab();
    if (person.relation === "friend") {
      return friendRow(person, [friendButton(t("removeFriend"), "button-quiet", async () => {
        if ((await callRpc("remove_friend", { p_user: person.user_id })).ok) void reload();
      })]);
    }
    if (person.relation === "incoming") {
      return friendRow(person, [
        friendButton(t("acceptFriend"), "button-primary", async () => {
          if ((await callRpc("respond_friend_request", { p_user: person.user_id, p_accept: true })).ok) void reload();
        }),
        friendButton(t("declineFriend"), "button-quiet", async () => {
          if ((await callRpc("respond_friend_request", { p_user: person.user_id, p_accept: false })).ok) void reload();
        })
      ]);
    }
    return friendRow(person, [friendButton(t("cancelRequest"), "button-quiet", async () => {
      if ((await callRpc("remove_friend", { p_user: person.user_id })).ok) void reload();
    })]);
  }));
}

function openFriends() {
  friendsTab = "friends";
  void openCommunityPage("friends");
}

document.querySelectorAll(".friends-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    friendsTab = tab.dataset.tab;
    void renderFriendsTab();
  });
});
friendSearchForm.addEventListener("submit", async event => {
  event.preventDefault();
  const query = document.getElementById("friendSearchInput").value.trim();
  if (query.length < 2) return setFriendsMessage("searchHint");
  const { ok, data } = await callRpc("search_league_profiles", { p_query: query });
  if (ok) void renderFriendsTab(data || []);
});

function navigateCommunity(page) {
  siteMenu.open = false;
  void openCommunityPage(page);
}

document.getElementById("friendsButton").addEventListener("click", () => navigateCommunity("friends"));
document.getElementById("myProfileButton").addEventListener("click", () => navigateCommunity("profile"));
document.querySelectorAll("[data-community-page]").forEach(button => {
  button.addEventListener("click", () => navigateCommunity(button.dataset.communityPage));
});
window.addEventListener("hashchange", () => {
  const match = location.hash.match(/^#community(?:\/(profile|friends|messages|achievements|edit))?$/);
  if (match) void openCommunityPage(match[1] || "profile", false);
  else {
    document.body.classList.remove("community-mode");
    communitySection.hidden = true;
  }
});
const initialCommunityMatch = location.hash.match(/^#community(?:\/(profile|friends|messages|achievements|edit))?$/);
if (initialCommunityMatch) void openCommunityPage(initialCommunityMatch[1] || "profile", false);

updateAuthUi();
try {
  applyLang();
} catch (error) {
  console.error("Language initialization error:", error);
}

window.requestAnimationFrame(animateChampionshipRace);
window.addEventListener("resize", () => {
  const now = performance.now();
  drawRaceChart(now);
  drawMatchOddsChart(now);
});

if (configReady) {
  void refreshNews();
  subscribeToNews();
  window.setInterval(() => void refreshNews(), 30000);
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Failed to check the Supabase session:", error);
    authStatus.textContent = t("signInError");
    showToast(t("signInCheckError", error.message));
  } else {
    await handleSession(data.session);
    supabase.auth.onAuthStateChange((_event, nextSession) => {
      window.setTimeout(() => void handleSession(nextSession), 0);
    });
  }
} else {
  authStatus.textContent = t("setupRequired");
}
