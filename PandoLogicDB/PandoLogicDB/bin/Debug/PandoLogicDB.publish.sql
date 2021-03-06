/*
Deployment script for PandoLogicDB

This code was generated by a tool.
Changes to this file may cause incorrect behavior and will be lost if
the code is regenerated.
*/

GO
SET ANSI_NULLS, ANSI_PADDING, ANSI_WARNINGS, ARITHABORT, CONCAT_NULL_YIELDS_NULL, QUOTED_IDENTIFIER ON;

SET NUMERIC_ROUNDABORT OFF;


GO
:setvar DatabaseName "PandoLogicDB"
:setvar DefaultFilePrefix "PandoLogicDB"
:setvar DefaultDataPath "C:\Users\idan\AppData\Local\Microsoft\VisualStudio\SSDT"
:setvar DefaultLogPath "C:\Users\idan\AppData\Local\Microsoft\VisualStudio\SSDT"

GO
:on error exit
GO
/*
Detect SQLCMD mode and disable script execution if SQLCMD mode is not supported.
To re-enable the script after enabling SQLCMD mode, execute the following:
SET NOEXEC OFF; 
*/
:setvar __IsSqlCmdEnabled "True"
GO
IF N'$(__IsSqlCmdEnabled)' NOT LIKE N'True'
    BEGIN
        PRINT N'SQLCMD mode must be enabled to successfully execute this script.';
        SET NOEXEC ON;
    END


GO
USE [$(DatabaseName)];


GO
PRINT N'Creating [dbo].[Test_Jobs]...';


GO
CREATE TABLE [dbo].[Test_Jobs] (
    [JobId]             INT            NOT NULL,
    [JobTitleId]        INT            NOT NULL,
    [CategoryId]        INT            NOT NULL,
    [City]              NVARCHAR (MAX) NULL,
    [State]             NVARCHAR (3)   NULL,
    [DescriptionLength] INT            NULL,
    [EducationLevel]    INT            NULL,
    [Clicks]            INT            NOT NULL,
    [Applicants]        INT            NOT NULL,
    CONSTRAINT [TestJobs] PRIMARY KEY CLUSTERED ([JobId] ASC) ON [PRIMARY]
) ON [PRIMARY];


GO
PRINT N'Creating [dbo].[Test_JobTitles]...';


GO
CREATE TABLE [dbo].[Test_JobTitles] (
    [JobTitleId]   INT            NOT NULL,
    [JobTitleName] NVARCHAR (MAX) NOT NULL,
    [CategoryId]   INT            NOT NULL,
    CONSTRAINT [PK_Test_JobTitles] PRIMARY KEY CLUSTERED ([JobTitleId] ASC) ON [PRIMARY]
) ON [PRIMARY];


GO
PRINT N'Update complete.';


GO
