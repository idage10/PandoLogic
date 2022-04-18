CREATE TABLE [Test_Jobs](
	[JobId] [int] NOT NULL,
	[JobTitleId] [int] NOT NULL,
	[CategoryId] [int] NOT NULL,
	[City] [nvarchar](max) NULL,
	[State] [nvarchar](3) NULL,
	[DescriptionLength] [int] NULL,
	[EducationLevel] [int] NULL,
	[Clicks] [int] NOT NULL,
	[Applicants] [int] NOT NULL,
 CONSTRAINT [TestJobs] PRIMARY KEY CLUSTERED 
(
	[JobId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]