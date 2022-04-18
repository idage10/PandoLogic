using System;
using System.Linq;

namespace JobTitlesData
{
    public interface IJobsData
    {
        IQueryable<string> GetJobTitlesFromDB();
        IQueryable<Tuple<string, string, string>> GetFilteredJobsFromDB(string title);
    }
}
