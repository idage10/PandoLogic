using JobTitlesData.Models;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;

namespace JobTitlesData
{
    public class JobsDataFromDB : IJobsData
    {
        private readonly PandoLogicDBContext _context;

        public JobsDataFromDB(PandoLogicDBContext context)
        {
            _context = context;
        }

        public IQueryable<string> GetJobTitlesFromDB()
        {
            return _context.TestJobTitles.Select(t => t.JobTitleName);
        }

        public IQueryable<Tuple<string, string, string>> GetFilteredJobsFromDB(string title)
        {
            var dbResult = _context.TestJobs.
                          Join(
                                _context.TestJobTitles,
                                testJobs => testJobs.JobTitleId,
                                jobTitles => jobTitles.JobTitleId,
                                (testJobs, jobTitles) => new { testJobs, jobTitles }
                              ).
                          Where(j => j.jobTitles.JobTitleName.Contains(title)).
                          Select(j => new Tuple<string, string, string>(j.jobTitles.JobTitleName, j.testJobs.City, j.testJobs.State)).
                          Distinct();

            return dbResult;
        }
    }
}
