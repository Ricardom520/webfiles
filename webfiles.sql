/*
 Navicat Premium Data Transfer

 Source Server         : Ricardom
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : localhost:3306
 Source Schema         : webfiles

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 23/03/2020 15:05:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for dustbin
-- ----------------------------
DROP TABLE IF EXISTS `dustbin`;
CREATE TABLE `dustbin`  (
  `systemid` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件id',
  `userid` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户id',
  `parentid` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件父文件id',
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `filename` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件名',
  `filetype` int(10) NULL DEFAULT NULL COMMENT '文件种类',
  `filetype_hz` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件种类中文',
  `filesize` double NULL DEFAULT NULL COMMENT '文件大小',
  `content` blob NULL COMMENT '文件内容',
  `createtime` datetime(0) NULL DEFAULT NULL COMMENT '文件创建时间',
  `deletetime` datetime(0) NULL DEFAULT NULL COMMENT '删除时间',
  `location` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件所在位置',
  `favour` tinyint(2) NULL DEFAULT 0 COMMENT '收藏字段，0为否，1为是'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for files
-- ----------------------------
DROP TABLE IF EXISTS `files`;
CREATE TABLE `files`  (
  `systemid` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件id',
  `userid` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户id',
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件用户名',
  `filename` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件名',
  `filetype` int(10) NULL DEFAULT NULL COMMENT '文件种类,0为文件夹，1为word，2为图片，3为音乐，4为视频，5为压缩包，6为其他7为excel，8为ppt，9为pdf',
  `filetype_hz` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件种类后缀',
  `filesize` double NULL DEFAULT NULL COMMENT '文件大小',
  `parentid` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '父文件id',
  `content` longblob NULL COMMENT '文件内容',
  `createtime` datetime(0) NULL DEFAULT NULL COMMENT '文件创建时间',
  `modifytime` datetime(0) NULL DEFAULT NULL COMMENT '文件修改时间',
  `favour` tinyint(1) NULL DEFAULT 0 COMMENT '收藏字段，0为否，1为是',
  `share` tinyint(1) NULL DEFAULT 0 COMMENT '分享字段，0为否，1为是',
  `sharetime` datetime(0) NULL DEFAULT NULL COMMENT '文件分享时间'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sharespdf
-- ----------------------------
DROP TABLE IF EXISTS `sharespdf`;
CREATE TABLE `sharespdf`  (
  `shareid` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件分享id',
  `systemid` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件id',
  `userid` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户id',
  `username` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `filename` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件名',
  `common` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '评论',
  `like` int(255) NULL DEFAULT NULL COMMENT '点赞数',
  `nc` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户昵称',
  `content` longblob NULL COMMENT '文件内容',
  `disc` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '文件描述',
  `sharetime` datetime(0) NULL DEFAULT NULL COMMENT '文件分享时间',
  `bc` longblob NULL COMMENT '分享文件的背景图',
  `visted` int(255) NULL DEFAULT 0 COMMENT '文件浏览量',
  PRIMARY KEY (`shareid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sharespic
-- ----------------------------
DROP TABLE IF EXISTS `sharespic`;
CREATE TABLE `sharespic`  (
  `shareid` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件分享id',
  `username` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户姓名',
  `userid` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户id',
  `filename` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件名',
  `disc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件描述',
  `content` longblob NULL COMMENT '文件内容',
  `sharetime` datetime(0) NULL DEFAULT NULL COMMENT '文件分享时间',
  `visted` int(255) NULL DEFAULT NULL COMMENT '文件浏览次数',
  `bc` longblob NULL COMMENT '文件背景',
  PRIMARY KEY (`shareid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for shareswjj
-- ----------------------------
DROP TABLE IF EXISTS `shareswjj`;
CREATE TABLE `shareswjj`  (
  `shareid` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分享文件id',
  `userid` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户id',
  `filename` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件名称',
  `disc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件描述',
  `visted` int(255) NULL DEFAULT 0 COMMENT '浏览次数',
  `liked` int(255) NULL DEFAULT 0 COMMENT '点赞次数',
  `sharetime` datetime(0) NULL DEFAULT NULL COMMENT '分享时间',
  `updatetime` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `systemid` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件id',
  `bc` longblob NULL COMMENT '背景图片',
  `content` longblob NULL COMMENT '文件内容',
  PRIMARY KEY (`shareid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for shareswz
-- ----------------------------
DROP TABLE IF EXISTS `shareswz`;
CREATE TABLE `shareswz`  (
  `shareid` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分享文章的id',
  `userid` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户id',
  `username` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户姓名',
  `content` blob NULL COMMENT '文件内容',
  `createtime` datetime(0) NULL DEFAULT NULL COMMENT '文章创建时间',
  `filename` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文章名字',
  `bc` blob NULL COMMENT '背景图片',
  `disc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件描述',
  `filetype` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件种类',
  `visted` int(255) NULL DEFAULT 0 COMMENT '观看次数',
  PRIMARY KEY (`shareid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `userid` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户id',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户密码',
  `nc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户昵称',
  `photo` blob NULL COMMENT '用户头像',
  `says` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户座右铭',
  `email` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户邮箱',
  `sex` int(5) NULL DEFAULT NULL COMMENT '用户性别，0为男，1为女',
  `createtime` datetime(0) NULL DEFAULT NULL COMMENT '用户创建时间',
  `bc` blob NULL COMMENT '用户背景',
  PRIMARY KEY (`userid`, `email`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
