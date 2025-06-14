const userService = require("../controllers/users/userService");
const {
  Task,
  User,
  PlanInfo,
  Pricing,
  Tag,
  TaskTag,
  UserTask,
} = require("../models");

const tasksData = [
  {
    artist: "iron maiden",
    titlePl: "ulalala",
    titleEn: "ulalala",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 1,
    filename: "arutw.pdf",
  },
  {
    artist: "Scorpions",
    titlePl: "Ma bebe",
    titleEn: "Ma bebe",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 1,
  },
  {
    artist: "Justin Bieber",
    titlePl: "Taylor Swift",
    titleEn: "Taylor Swift",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 1,
  },
  {
    artist: "Doda Elektroda",
    titlePl: "U klocucha",
    titleEn: "U klocucha",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 1,
  },
  {
    artist: "Lady Pank",
    titlePl: "Sufler z budki",
    titleEn: "Sufler z budki",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 1,
  },
  {
    artist: "Nirvana",
    titlePl: "Life is great",
    titleEn: "Life is great",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 1,
  },
  {
    artist: "Behemoth",
    titlePl: "Allelujah",
    titleEn: "Allelujah",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 1,
  },
  {
    artist: "Vivaldi",
    titlePl: "at the club",
    titleEn: "at the club",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 1,
  },
  {
    artist: "Blink 1500",
    titlePl: "black sorrows",
    titleEn: "black sorrows",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 1,
  },
  {
    artist: "Taylor Swift",
    titlePl: "Justin Bieber",
    titleEn: "Justin Bieber",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 1,
  },
  {
    artist: "Dream Theather",
    titlePl: "Christmas time",
    titleEn: "Christmas time",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 3,
  },
  {
    artist: "Slayer",
    titlePl: "Whe two souls meet",
    titleEn: "Whe two souls meet",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 3,
  },
  {
    artist: "Sciu",
    titlePl: "alternate picking",
    titleEn: "alternate picking",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 3,
  },
  {
    artist: "Sciu",
    titlePl: "alternate picking part 2",
    titleEn: "alternate picking part 2",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 3,
  },
  {
    artist: "Sciu",
    titlePl: "alternate picking part 3",
    titleEn: "alternate picking part 3",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 3,
  },
  {
    artist: "Sciu",
    titlePl: "alternate picking part 4",
    titleEn: "alternate picking part 4",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 3,
  },
  {
    artist: "Sciu",
    titlePl: "sweep picking part 1",
    titleEn: "sweep picking part 1",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 3,
  },
  {
    artist: "Sciu",
    titlePl: "sweep picking part 2",
    titleEn: "sweep picking part 2",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 3,
  },
  {
    artist: "Sciu",
    titlePl: "sweep picking part 3",
    titleEn: "sweep picking part 3",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 3,
  },
  {
    artist: "Sciu",
    titlePl: "sweep picking part 4",
    titleEn: "sweep picking part 4",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 3,
  },
  {
    artist: "Sciu",
    titlePl: "sweep picking part 5",
    titleEn: "sweep picking part 5",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 3,
  },
  {
    artist: "Blink 1500",
    titlePl: "Black Sorrows",
    titleEn: "Black Sorrows",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 1,
  },
  {
    artist: "Echo Drift",
    titlePl: "Lost Echoes",
    titleEn: "Lost Echoes",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 2,
  },
  {
    artist: "Neon Shadows",
    titlePl: "Fading Neon",
    titleEn: "Fading Neon",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 3,
  },
  {
    artist: "Solar Flare",
    titlePl: "Burning Sky",
    titleEn: "Burning Sky",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 4,
  },
  {
    artist: "Midnight Pulse",
    titlePl: "Night Whispers",
    titleEn: "Night Whispers",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 5,
  },
  {
    artist: "Cyber Nova",
    titlePl: "Electric Dreams",
    titleEn: "Electric Dreams",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 2,
  },
  {
    artist: "Astral Tide",
    titlePl: "Celestial Waves",
    titleEn: "Celestial Waves",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 3,
  },
  {
    artist: "Urban Mirage",
    titlePl: "Concrete Jungle",
    titleEn: "Concrete Jungle",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 4,
  },
  {
    artist: "Vortex Echo",
    titlePl: "Resonant Frequencies",
    titleEn: "Resonant Frequencies",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 5,
  },
  {
    artist: "Horizon Line",
    titlePl: "Vanishing Point",
    titleEn: "Vanishing Point",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 1,
  },
  {
    artist: "Aurora Fade",
    titlePl: "Distant Glow",
    titleEn: "Distant Glow",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 2,
  },
  {
    artist: "Lunar Echo",
    titlePl: "Moonlit Waves",
    titleEn: "Moonlit Waves",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 3,
  },
  {
    artist: "Solar Eclipse",
    titlePl: "Darkened Sun",
    titleEn: "Darkened Sun",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 4,
  },
  {
    artist: "Crimson Mist",
    titlePl: "Scarlet Fog",
    titleEn: "Scarlet Fog",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 5,
  },
  {
    artist: "Dystopian Wave",
    titlePl: "Digital Horizon",
    titleEn: "Digital Horizon",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 2,
  },
  {
    artist: "Nebula Drift",
    titlePl: "Cosmic Flow",
    titleEn: "Cosmic Flow",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 3,
  },
  {
    artist: "Zenith Pulse",
    titlePl: "Summit Echo",
    titleEn: "Summit Echo",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 4,
  },
  {
    artist: "Echo Storm",
    titlePl: "Sound Surge",
    titleEn: "Sound Surge",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 5,
  },
  {
    artist: "Velocity Beat",
    titlePl: "Racing Heart",
    titleEn: "Racing Heart",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 1,
  },
  {
    artist: "Timeless Rift",
    titlePl: "Frozen Moments",
    titleEn: "Frozen Moments",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 2,
  },
];

const usersData = [
  {
    username: "admin",
    email: "robert.sciu@gmail.com",
    password: "admin1234",
    role: "admin",
    difficultyClearanceLevel: 999,
    minimumTaskLevelToDisplay: 1,
    isVerified: true,
    isActive: true,
    planInfo: {
      lessonBalance: 5,
      lessonCount: 223,
      cancelledLessonCount: 0,
      rescheduledLessonCount: 0,
      discount: 10,
    },
  },
  {
    username: "robert",
    email: "gitara.rs@gmail.com",
    password: "user1234",
    role: "user",
    difficultyClearanceLevel: 44,
    minimumTaskLevelToDisplay: 1,
    isVerified: true,
    isActive: true,
    planInfo: {
      lessonBalance: 10,
      lessonCount: 223,
      cancelledLessonCount: 0,
      rescheduledLessonCount: 0,
      discount: 10,
    },
  },
  {
    username: "miżord",
    email: "sciubilecki.robert@gmail.com",
    password: "user1234",
    role: "user",
    difficultyClearanceLevel: 4,
    minimumTaskLevelToDisplay: 1,
    isVerified: false,
    isActive: false,
    planInfo: {
      lessonBalance: 7,
      lessonCount: 0,
      cancelledLessonCount: 0,
      rescheduledLessonCount: 0,
      discount: 10,
    },
  },
  {
    username: "kwasar",
    email: "robert.sciu.data@gmail.com",
    password: "user1234",
    role: "user",
    difficultyClearanceLevel: 3,
    minimumTaskLevelToDisplay: 1,
    isVerified: true,
    isActive: true,
    planInfo: {
      lessonBalance: 10,
      lessonCount: 223,
      cancelledLessonCount: 0,
      rescheduledLessonCount: 0,
      discount: 10,
    },
  },
  // {
  //   username: "pikar",
  //   email: "robert.sciu.photos@gmail.com",
  //   password: "user1234",
  //   role: "user",
  //   difficultyClearanceLevel: 1,
  //   minimumTaskLevelToDisplay: 1,
  //   isVerified: true,
  //   isActive: true,
  //   planInfo: {
  //     lessonBalance: 10,
  //     lessonCount: 223,
  //     cancelledLessonCount: 0,
  //     rescheduledLessonCount: 0,
  //   },
  // },
];

const tagsData = [
  { tagName: "metal" },
  { tagName: "acoustic guitar" },
  { tagName: "exercise" },
  { tagName: "rock" },
  { tagName: "jazz" },
  { tagName: "blues" },
  { tagName: "classical" },
  { tagName: "pop" },
  { tagName: "indie" },
  { tagName: "electronic" },
  { tagName: "hip hop" },
];

const taskTagData = [
  { taskId: 10, tagId: 5 },
  { taskId: 2, tagId: 10 },
  { taskId: 29, tagId: 1 },
  { taskId: 14, tagId: 10 },
  { taskId: 9, tagId: 4 },
  { taskId: 21, tagId: 2 },
  { taskId: 14, tagId: 2 },
  { taskId: 13, tagId: 11 },
  { taskId: 5, tagId: 2 },
  { taskId: 1, tagId: 9 },
  { taskId: 27, tagId: 11 },
  { taskId: 20, tagId: 2 },
  { taskId: 2, tagId: 7 },
  { taskId: 5, tagId: 3 },
  { taskId: 28, tagId: 10 },
  { taskId: 34, tagId: 4 },
  { taskId: 3, tagId: 2 },
  { taskId: 36, tagId: 1 },
  { taskId: 35, tagId: 6 },
  { taskId: 21, tagId: 7 },
  { taskId: 23, tagId: 10 },
  { taskId: 36, tagId: 7 },
  { taskId: 26, tagId: 8 },
  { taskId: 3, tagId: 1 },
  { taskId: 27, tagId: 7 },
  { taskId: 1, tagId: 10 },
  { taskId: 30, tagId: 10 },
  { taskId: 31, tagId: 2 },
  { taskId: 2, tagId: 1 },
  { taskId: 35, tagId: 7 },
  { taskId: 14, tagId: 9 },
  { taskId: 15, tagId: 10 },
  { taskId: 16, tagId: 2 },
  { taskId: 1, tagId: 4 },
  { taskId: 1, tagId: 8 },
  { taskId: 3, tagId: 11 },
  { taskId: 7, tagId: 7 },
  { taskId: 38, tagId: 11 },
  { taskId: 3, tagId: 8 },
  { taskId: 37, tagId: 10 },
  { taskId: 40, tagId: 4 },
  { taskId: 22, tagId: 1 },
  { taskId: 33, tagId: 2 },
  { taskId: 12, tagId: 6 },
  { taskId: 32, tagId: 4 },
  { taskId: 24, tagId: 10 },
  { taskId: 9, tagId: 5 },
  { taskId: 38, tagId: 4 },
  { taskId: 25, tagId: 5 },
  { taskId: 30, tagId: 5 },
  { taskId: 3, tagId: 9 },
  { taskId: 7, tagId: 11 },
  { taskId: 39, tagId: 6 },
  { taskId: 3, tagId: 3 },
  { taskId: 19, tagId: 3 },
  { taskId: 4, tagId: 4 },
  { taskId: 41, tagId: 11 },
  { taskId: 5, tagId: 4 },
  { taskId: 18, tagId: 11 },
  { taskId: 28, tagId: 1 },
  { taskId: 18, tagId: 10 },
  { taskId: 25, tagId: 10 },
  { taskId: 11, tagId: 7 },
  { taskId: 6, tagId: 3 },
  { taskId: 14, tagId: 8 },
  { taskId: 20, tagId: 3 },
  { taskId: 6, tagId: 11 },
  { taskId: 37, tagId: 4 },
  { taskId: 5, tagId: 9 },
  { taskId: 31, tagId: 11 },
  { taskId: 41, tagId: 7 },
  { taskId: 2, tagId: 5 },
  { taskId: 22, tagId: 4 },
  { taskId: 22, tagId: 6 },
  { taskId: 19, tagId: 11 },
  { taskId: 21, tagId: 4 },
  { taskId: 9, tagId: 9 },
  { taskId: 14, tagId: 7 },
  { taskId: 18, tagId: 4 },
  { taskId: 39, tagId: 7 },
  { taskId: 34, tagId: 9 },
  { taskId: 1, tagId: 7 },
  { taskId: 17, tagId: 10 },
  { taskId: 32, tagId: 6 },
  { taskId: 39, tagId: 3 },
  { taskId: 3, tagId: 6 },
  { taskId: 8, tagId: 7 },
  { taskId: 37, tagId: 8 },
  { taskId: 10, tagId: 2 },
];

const userTasksData = [
  { userId: 1, taskId: 1, userNotes: "admin" },
  { userId: 2, taskId: 1, userNotes: "robert" },
  { userId: 2, taskId: 2 },
  { userId: 3, taskId: 1, userNotes: "miżord" },
  { userId: 3, taskId: 4 },
  { userId: 3, taskId: 5 },
  { userId: 3, taskId: 6 },
  { userId: 4, taskId: 1, userNotes: "kwasar" },
  { userId: 4, taskId: 3 },
  { userId: 4, taskId: 4 },
  { userId: 4, taskId: 11 },
  { userId: 4, taskId: 6 },
  { userId: 4, taskId: 7 },
  { userId: 4, taskId: 8 },
];

async function insertSampleData() {
  try {
    for (const user of usersData) {
      user.password = await userService.hashPassword(user.password);
      const newUser = await User.create(user);
      await PlanInfo.create({ ...user.planInfo, userId: newUser.id });
    }
    for (const task of tasksData) {
      await Task.create(task);
    }

    for (const userTask of userTasksData) {
      await UserTask.create(userTask);
    }

    for (const tag of tagsData) {
      await Tag.create(tag);
    }

    for (const taskTag of taskTagData) {
      await TaskTag.create(taskTag);
    }

    // await Pricing.create(pricing);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { insertSampleData };
