using Microsoft.EntityFrameworkCore;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace JobTitlesData.Models
{
    public partial class PandoLogicDBContext : DbContext
    {
        public PandoLogicDBContext()
        {
        }

        public PandoLogicDBContext(DbContextOptions<PandoLogicDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TestJobTitles> TestJobTitles { get; set; }
        public virtual DbSet<TestJobs> TestJobs { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            /*if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=(localdb)\\ProjectsV13;Database=PandoLogicDB;Trusted_Connection=True;");
            }*/
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TestJobTitles>(entity =>
            {
                entity.HasKey(e => e.JobTitleId);

                entity.ToTable("Test_JobTitles");

                entity.Property(e => e.JobTitleId).ValueGeneratedNever();

                entity.Property(e => e.JobTitleName).IsRequired();
            });

            modelBuilder.Entity<TestJobs>(entity =>
            {
                entity.HasKey(e => e.JobId)
                    .HasName("TestJobs");

                entity.ToTable("Test_Jobs");

                entity.Property(e => e.JobId).ValueGeneratedNever();

                entity.Property(e => e.State).HasMaxLength(3);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
